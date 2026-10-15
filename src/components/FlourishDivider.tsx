import React, { useEffect, useRef, useState } from 'react';

interface FlourishDividerProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FlourishDivider: React.FC<FlourishDividerProps> = ({ className = '', style = {} }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flourish-divider-wrap ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        margin: '0 auto',
        maxWidth: '520px',
        width: '100%',
        pointerEvents: 'none',
        ...style
      }}
    >
      <svg
        viewBox="0 0 400 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', overflow: 'visible' }}
      >
        {/* Left flourish swirl */}
        <path
          d="M 10 15 Q 80 5, 140 15 T 180 15"
          stroke="url(#goldGradientLeft)"
          strokeWidth="1.2"
          strokeLinecap="round"
          className={isVisible ? 'drawn-flourish-line' : ''}
          style={{ strokeDasharray: 300, strokeDashoffset: isVisible ? 0 : 300, transition: 'stroke-dashoffset 1.4s ease' }}
        />

        {/* Central Romantic Heart Emblem */}
        <g
          style={{
            transformOrigin: '200px 15px',
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s',
            opacity: isVisible ? 1 : 0
          }}
        >
          {/* Subtle Golden Diamond */}
          <polygon points="200,9 206,15 200,21 194,15" fill="var(--gold)" opacity="0.85" />
          <circle cx="188" cy="15" r="2" fill="var(--blush)" opacity="0.7" />
          <circle cx="212" cy="15" r="2" fill="var(--blush)" opacity="0.7" />
        </g>

        {/* Right flourish swirl */}
        <path
          d="M 390 15 Q 320 25, 260 15 T 220 15"
          stroke="url(#goldGradientRight)"
          strokeWidth="1.2"
          strokeLinecap="round"
          className={isVisible ? 'drawn-flourish-line' : ''}
          style={{ strokeDasharray: 300, strokeDashoffset: isVisible ? 0 : 300, transition: 'stroke-dashoffset 1.4s ease' }}
        />

        <defs>
          <linearGradient id="goldGradientLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="goldGradientRight" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="60%" stopColor="var(--gold)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
