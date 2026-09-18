import confetti from 'canvas-confetti';

export function triggerConstructionBurst(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 40,
    spread: 55,
    origin: { x, y },
    colors: ['#C4956A', '#B87333', '#8B7355', '#22C55E', '#F59E0B'],
    gravity: 1.2,
    scalar: 0.8,
    ticks: 150,
  });
}

export function triggerStreakBurst() {
  const defaults = {
    spread: 360,
    ticks: 80,
    gravity: 0,
    decay: 0.94,
    startVelocity: 20,
    colors: ['#F59E0B', '#FBBF24', '#FCD34D', '#FDE68A'],
    scalar: 1.2,
  };

  confetti({ ...defaults, particleCount: 30, origin: { x: 0.3, y: 0.4 } });
  confetti({ ...defaults, particleCount: 30, origin: { x: 0.7, y: 0.4 } });
}

export function triggerVictoryConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;
  const colors = ['#3B82F6', '#F97316', '#22C55E', '#F59E0B', '#C4956A'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
