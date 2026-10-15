// Safe Haptics Service with feature detection and duration limits
// Guaranteed never to crash on iOS Safari or unsupported platforms.

class HapticsService {
  private enabled: boolean = true;

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'navigator' in window && typeof navigator.vibrate === 'function';
  }

  // Light pulse (15ms) - for button clicks, card expansions
  public light() {
    if (!this.enabled || !this.isSupported()) return;
    try {
      navigator.vibrate(15);
    } catch {
      // Quiet fallback
    }
  }

  // Medium pulse (25ms) - for page turn completion, envelope opening
  public medium() {
    if (!this.enabled || !this.isSupported()) return;
    try {
      navigator.vibrate(25);
    } catch {
      // Quiet fallback
    }
  }

  // Double pulse - for candle extinguished ritual
  public success() {
    if (!this.enabled || !this.isSupported()) return;
    try {
      navigator.vibrate([20, 40, 20]);
    } catch {
      // Quiet fallback
    }
  }
}

export const hapticsService = new HapticsService();
