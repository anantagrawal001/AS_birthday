// Global Audio Service using Web Audio API
// Synthesizes warm, intimate acoustic/piano harmonics and physical tactile cues.
// Strictly respects user gesture activation, global mute, ducking, and visibility pauses.

class AudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // starts muted by default per policy
  private isPlayingAmbience: boolean = false;
  private ambientTimer: number | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private listeners: Set<(muted: boolean) => void> = new Set();

  private bgmAudio: HTMLAudioElement | null = null;
  private currentTrackName: string = 'Tum Se Hi (Romantic Instrumental)';

  constructor() {
    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pauseAll();
        } else if (!this.isMuted && this.isPlayingAmbience) {
          this.resumeAll();
        }
      });
    }
  }

  private initContext() {
    if (typeof window !== 'undefined' && !this.bgmAudio) {
      this.bgmAudio = new Audio('assets/audio/romantic-bgm.mp3');
      this.bgmAudio.loop = true;
      this.bgmAudio.preload = 'auto';
      this.bgmAudio.volume = this.isMuted ? 0 : 0.65;
    }

    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        this.musicGain.connect(this.masterGain);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.6, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public subscribe(fn: (muted: boolean) => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach(fn => fn(this.isMuted));
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentTrack(): string {
    return this.currentTrackName;
  }

  public loadCustomTrack(file: File) {
    this.initContext();
    if (!this.bgmAudio) return;
    const url = URL.createObjectURL(file);
    this.bgmAudio.src = url;
    this.currentTrackName = file.name.replace(/\.[^/.]+$/, '');
    if (!this.isMuted) {
      this.bgmAudio.play().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.8, now + 0.1);
    }

    if (this.bgmAudio) {
      if (!this.isMuted) {
        this.bgmAudio.volume = 0.65;
        this.bgmAudio.play().catch(() => {
          // Fallback to synthesized romantic ambience if browser blocks audio element
          if (!this.isPlayingAmbience) this.startAmbience();
        });
      } else {
        this.bgmAudio.pause();
      }
    } else if (!this.isMuted && !this.isPlayingAmbience) {
      this.startAmbience();
    }

    this.notify();
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    if (this.isMuted === muted) return;
    this.toggleMute();
  }

  public userGestureActivate() {
    this.initContext();
  }

  public duckMusic(duck: boolean) {
    if (this.bgmAudio) {
      this.bgmAudio.volume = duck ? 0.15 : (this.isMuted ? 0 : 0.65);
    }
    if (!this.musicGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    const target = duck ? 0.15 : 0.5;
    this.musicGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.linearRampToValueAtTime(target, now + 0.4);
  }

  private pauseAll() {
    if (this.bgmAudio && !this.bgmAudio.paused) {
      this.bgmAudio.pause();
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  private resumeAll() {
    if (this.bgmAudio && !this.isMuted) {
      this.bgmAudio.play().catch(() => {});
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Synthesize an intimate warm acoustic piano chord sequence (Fallback)
  public startAmbience() {
    this.initContext();
    if (this.isPlayingAmbience) return;
    this.isPlayingAmbience = true;

    // Chord progression: Fmaj9 -> Am7 -> Bbmaj7 -> C6 (warm, romantic, gentle)
    const chords = [
      [174.61, 220.00, 261.63, 329.63, 392.00], // F3, A3, C4, E4, G4
      [220.00, 261.63, 329.63, 392.00, 440.00], // A3, C4, E4, G4, A4
      [233.08, 293.66, 349.23, 440.00, 523.25], // Bb3, D4, F4, A4, C5
      [261.63, 329.63, 392.00, 440.00, 523.25]  // C4, E4, G4, A4, C5
    ];

    let chordIdx = 0;
    const playChordStep = () => {
      if (!this.isPlayingAmbience) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      currentChord.forEach((freq, i) => {
        setTimeout(() => {
          if (!this.isPlayingAmbience) return;
          this.playPianoTone(freq, 3.8, 0.12);
        }, i * 350 + Math.random() * 80);
      });

      this.ambientTimer = window.setTimeout(playChordStep, 4500);
    };

    playChordStep();
  }

  public stopAmbience() {
    this.isPlayingAmbience = false;
    if (this.ambientTimer) {
      clearTimeout(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  private playPianoTone(freq: number, duration: number, volume: number) {
    if (!this.ctx || !this.musicGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Filter to simulate warm felt piano hammer
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, now);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, now + duration);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  // Tactile SFX: Light tap (silenced to preserve uninterrupted soundtrack)
  public playLightTap() {
    // Intentionally silent: removes high-pitched chirps/clicks during image and card interactions
  }

  // Tactile SFX: Letter opening paper unfold
  public playEnvelopeOpen() {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.12));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(1.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
  }

  // Tactile SFX: Gentle breath for candle blow
  public playCandleBlow() {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.linearRampToValueAtTime(700, now + 0.3);
    filter.frequency.linearRampToValueAtTime(300, now + 0.6);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
    gain.gain.linearRampToValueAtTime(0.0001, now + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
  }

  // Tactile SFX: Candle extinguish wick sizzle
  public playCandleExtinguish() {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.4);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  // Tactile SFX: Magazine page turn paper bend
  public playPageTurn() {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.28;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + 0.28);
    filter.Q.setValueAtTime(2.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
  }

  // Tactile SFX: Sheet settle
  public playPageSettle() {
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.2);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.25);
  }
}

export const audioService = new AudioService();
