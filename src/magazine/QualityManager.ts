export type QualityTier = 'high' | 'balanced' | 'lightweight';

export class QualityManager {
  private currentQuality: QualityTier = 'high';
  private webglAvailable: boolean = true;
  private listeners: Set<(quality: QualityTier) => void> = new Set();

  constructor() {
    this.detectHardware();
  }

  private detectHardware() {
    if (typeof window === 'undefined') return;

    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
      if (!gl) {
        this.webglAvailable = false;
        this.currentQuality = 'lightweight';
        return;
      }

      // Check mobile vs desktop capabilities
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        this.currentQuality = 'balanced';
      } else {
        this.currentQuality = 'high';
      }
    } catch {
      this.webglAvailable = false;
      this.currentQuality = 'lightweight';
    }
  }

  public getQuality(): QualityTier {
    return this.currentQuality;
  }

  public setQuality(quality: QualityTier) {
    this.currentQuality = quality;
    this.notify();
  }

  public isWebGLSupported(): boolean {
    return this.webglAvailable;
  }

  public handleContextLoss() {
    console.warn('WebGL context lost, falling back to lightweight curved rendering mode.');
    this.currentQuality = 'lightweight';
    this.notify();
  }

  public subscribe(fn: (quality: QualityTier) => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.currentQuality));
  }
}

export const qualityManager = new QualityManager();
