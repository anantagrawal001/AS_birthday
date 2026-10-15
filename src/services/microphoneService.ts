// Microphone Blowing Detection Service
// Explicit user opt-in only. Zero recording, zero network transmission.
// Immediate track cleanup on finish, cancel, visibilitychange, or error.

export interface MicBlowState {
  listening: boolean;
  permissionDenied: boolean;
  unsupported: boolean;
  confidence: number; // 0 to 1
}

class MicrophoneService {
  private mediaStream: MediaStream | null = null;
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;
  private onBlowDetected: (() => void) | null = null;
  private onStateChange: ((state: MicBlowState) => void) | null = null;
  private isListening: boolean = false;
  private consecutiveHighFrames: number = 0;

  public isSupported(): boolean {
    return (
      typeof window !== 'undefined' &&
      !!navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function'
    );
  }

  public async startListening(
    onBlow: () => void,
    onState: (state: MicBlowState) => void
  ): Promise<boolean> {
    this.stopListening();
    this.onBlowDetected = onBlow;
    this.onStateChange = onState;

    if (!this.isSupported()) {
      onState({
        listening: false,
        permissionDenied: false,
        unsupported: true,
        confidence: 0
      });
      return false;
    }

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.audioCtx = new AudioCtx();
      const source = this.audioCtx.createMediaStreamSource(this.mediaStream);

      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.2;
      source.connect(this.analyser);

      this.isListening = true;
      this.consecutiveHighFrames = 0;

      onState({
        listening: true,
        permissionDenied: false,
        unsupported: false,
        confidence: 0
      });

      this.monitorLoop();
      return true;
    } catch (err) {
      console.warn('Microphone permission denied or failed:', err);
      this.stopListening();
      onState({
        listening: false,
        permissionDenied: true,
        unsupported: false,
        confidence: 0
      });
      return false;
    }
  }

  private monitorLoop = () => {
    if (!this.isListening || !this.analyser) return;

    const buffer = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(buffer);

    // Wind / breath blowing generates broad low-to-mid frequency turbulence (50Hz - 800Hz)
    // with high RMS amplitude across the lower bins
    const lowBins = buffer.slice(2, 28);
    let sum = 0;
    for (let i = 0; i < lowBins.length; i++) {
      sum += lowBins[i];
    }
    const avgEnergy = sum / lowBins.length;
    const normalizedEnergy = Math.min(1, avgEnergy / 140);

    this.onStateChange?.({
      listening: true,
      permissionDenied: false,
      unsupported: false,
      confidence: normalizedEnergy
    });

    // Sustained blowing threshold (at least 4 consecutive frames above 0.72)
    if (normalizedEnergy > 0.72) {
      this.consecutiveHighFrames++;
      if (this.consecutiveHighFrames >= 4) {
        this.onBlowDetected?.();
        this.stopListening();
        return;
      }
    } else {
      this.consecutiveHighFrames = Math.max(0, this.consecutiveHighFrames - 1);
    }

    this.animFrameId = requestAnimationFrame(this.monitorLoop);
  };

  public stopListening() {
    this.isListening = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
    this.analyser = null;
    this.onBlowDetected = null;
  }
}

export const microphoneService = new MicrophoneService();
