import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: string;
  delay: string;
}

export const AtmosphericParticles: React.FC = () => {
  // Generate a modest set of 18 floating golden light motes (optimized for mobile 60fps)
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.5 + Math.sin(i) * 3 + 4) % 94}%`,
      top: `${(i * 7.3 + Math.cos(i) * 5) % 92}%`,
      size: 3 + (i % 4) * 2,
      duration: `${4.5 + (i % 5) * 1.2}s`,
      delay: `${(i * 0.4) % 3.5}s`
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'hidden'
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="floating-mote"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: p.duration,
            animationDelay: p.delay
          }}
        />
      ))}
    </div>
  );
};
