import React from 'react';
import { BIRTHDAY } from '../content/config';
import { audioService } from '../services/audioService';
import { hapticsService } from '../services/hapticsService';
import { Sparkles } from 'lucide-react';

interface Chapter00Props {
  onEnter: () => void;
}

export const Chapter00Invitation: React.FC<Chapter00Props> = ({ onEnter }) => {
  const handleOpen = () => {
    hapticsService.light();
    audioService.userGestureActivate();
    audioService.setMuted(false); // Enable warm sound on deliberate user opening gesture
    onEnter();
  };

  const handleOpenSilent = () => {
    hapticsService.light();
    audioService.userGestureActivate();
    // keeps muted
    onEnter();
  };

  return (
    <section
      id="chapter-00"
      aria-label="Invitation"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--night)',
        color: 'var(--ivory)',
        textAlign: 'center',
        padding: '2rem 1.5rem',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem'
        }}
      >
        {/* Monogram / Glimmer */}
        <div
          style={{
            position: 'relative',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 175, 142, 0.2) 0%, transparent 70%)',
            border: '1px solid rgba(212, 175, 142, 0.35)',
            boxShadow: '0 0 25px rgba(212, 175, 142, 0.2)'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.5rem',
              color: 'var(--gold)',
              lineHeight: 1
            }}
          >
            A
          </span>
          <Sparkles
            size={16}
            color="var(--gold)"
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              opacity: 0.85
            }}
          />
        </div>

        <div>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--blush)',
              marginBottom: '0.5rem'
            }}
          >
            {BIRTHDAY.recipient.fullName}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-sm)',
              color: 'rgba(245, 239, 231, 0.7)',
              letterSpacing: '0.04em'
            }}
          >
            {BIRTHDAY.story.ch00.tagline}
          </p>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', maxWidth: '280px' }}>
          <button
            type="button"
            onClick={handleOpen}
            style={{
              padding: '1rem 1.8rem',
              backgroundColor: 'var(--burgundy)',
              color: 'var(--light)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-base)',
              letterSpacing: '0.04em',
              boxShadow: '0 8px 24px rgba(139, 71, 87, 0.35)',
              transition: 'all 0.25s ease',
              border: '1px solid rgba(212, 175, 142, 0.3)',
              cursor: 'pointer'
            }}
          >
            {BIRTHDAY.story.ch00.ctaText}
          </button>

          <button
            type="button"
            onClick={handleOpenSilent}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(245, 239, 231, 0.55)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              padding: '0.25rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Open quietly without sound
          </button>
        </div>
      </div>
    </section>
  );
};
