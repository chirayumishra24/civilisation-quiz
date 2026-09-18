class SoundManager {
  private audioCtx: AudioContext | null = null;
  private enabled = true;

  private getCtx(): AudioContext {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
    }
    return this.audioCtx;
  }

  setEnabled(v: boolean) {
    this.enabled = v;
  }

  isEnabled() {
    return this.enabled;
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', gain = 0.15) {
    if (!this.enabled) return;
    try {
      const ctx = this.getCtx();
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      g.gain.setValueAtTime(gain, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context not available
    }
  }

  playClickSound() {
    this.playTone(800, 0.08, 'sine', 0.1);
  }

  playCorrectSound() {
    this.playTone(523, 0.15, 'sine', 0.15);
    setTimeout(() => this.playTone(659, 0.15, 'sine', 0.15), 100);
    setTimeout(() => this.playTone(784, 0.2, 'sine', 0.15), 200);
  }

  playWrongSound() {
    this.playTone(200, 0.3, 'triangle', 0.12);
    setTimeout(() => this.playTone(180, 0.3, 'triangle', 0.1), 150);
  }

  playBuildSound() {
    this.playTone(392, 0.1, 'square', 0.08);
    setTimeout(() => this.playTone(440, 0.1, 'square', 0.08), 80);
    setTimeout(() => this.playTone(523, 0.15, 'square', 0.1), 160);
    setTimeout(() => this.playTone(659, 0.2, 'sine', 0.12), 260);
  }

  playStreakSound() {
    [523, 659, 784, 880, 1047].forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.15, 'sine', 0.12), i * 80);
    });
  }

  playRushSound() {
    this.playTone(440, 0.1, 'sawtooth', 0.08);
    setTimeout(() => this.playTone(554, 0.1, 'sawtooth', 0.08), 100);
    setTimeout(() => this.playTone(659, 0.15, 'sawtooth', 0.1), 200);
  }

  playVictorySound() {
    const notes = [523, 659, 784, 880, 1047, 880, 1047];
    notes.forEach((f, i) => {
      setTimeout(() => this.playTone(f, 0.25, 'sine', 0.15), i * 120);
    });
  }

  playStartSound() {
    this.playTone(440, 0.15, 'sine', 0.12);
    setTimeout(() => this.playTone(554, 0.15, 'sine', 0.12), 150);
    setTimeout(() => this.playTone(659, 0.2, 'sine', 0.15), 300);
  }
}

export const soundManager = new SoundManager();
