import React from 'react';
import { BIRTHDAY } from '../content/config';
import { DESIGNED_MAGAZINE_PAGES } from '../content/magazineDesignedPages';
import { hapticsService } from '../services/hapticsService';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';

interface Chapter09Props {
  onOpenMagazine: () => void;
  onSkip: () => void;
}

export const Chapter09MagazineInvite: React.FC<Chapter09Props> = ({
  onOpenMagazine,
  onSkip
}) => {
  const handleLaunch = () => {
    hapticsService.medium();
    onOpenMagazine();
  };

  const cover = DESIGNED_MAGAZINE_PAGES[0];

  return (
    <section
      id="chapter-09"
      aria-label="Secret gift: Magazine invitation"
      style={{
        backgroundColor: '#19151A',
        color: 'var(--ivory)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(139, 71, 87, 0.18) 0%, rgba(212, 175, 142, 0.08) 40%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '850px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(2rem, 4vw, 3rem)',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}
      >
        {/* Copy */}
        <div style={{ maxWidth: '580px' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-sm)',
              color: 'var(--blush)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '0.5rem'
            }}
          >
            <Sparkles size={14} color="var(--gold)" />
            <span>A Secret Keepsake</span>
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-3xl)',
              color: 'var(--light)',
              marginBottom: '1rem'
            }}
          >
            {BIRTHDAY.story.ch09.title}
          </h2>

          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              color: 'var(--ivory)',
              lineHeight: 1.6
            }}
          >
            {BIRTHDAY.story.ch09.body.map((line, idx) => (
              <p key={idx} style={{ margin: '0.25rem 0' }}>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Bound Magazine Cover Mockup / Interactive Invitation */}
        <button
          type="button"
          onClick={handleLaunch}
          aria-label="Open your magazine"
          style={{
            position: 'relative',
            width: 'clamp(240px, 45vw, 320px)',
            aspectRatio: '1 / 1.414', // Classic A4 ratio
            backgroundColor: '#1E1920',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow:
              '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 45px rgba(212, 175, 142, 0.3), inset 3px 0 8px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(212, 175, 142, 0.35)',
            cursor: 'pointer',
            padding: 0,
            transition: 'transform 0.35s var(--ease-cinematic), box-shadow 0.35s ease',
            display: 'flex',
            flexDirection: 'column'
          }}
          className="hover-card-tilt"
        >
          {/* Cover Photo Backdrop (User's Custom Designed Cover) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <picture style={{ width: '100%', height: '100%', display: 'block' }}>
              <source srcSet={cover.webp} type="image/webp" />
              <img
                src={cover.jpg}
                alt={cover.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
                loading="eager"
              />
            </picture>
          </div>

          {/* Book Spine Texture on Left Edge */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '16px',
              background:
                'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3) 60%, transparent)',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          />

          {/* Paper Sheen Reflection */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 40%, rgba(0, 0, 0, 0.1) 100%)',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          />

          {/* Floating Tap to Read Pill Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 4,
              backgroundColor: 'rgba(21, 19, 22, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(212, 175, 142, 0.45)',
              color: 'var(--gold)',
              fontFamily: 'var(--font-serif)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
            }}
          >
            Tap to open magazine
          </div>
        </button>


        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.85rem',
            width: '100%',
            maxWidth: '320px'
          }}
        >
          <button
            type="button"
            onClick={handleLaunch}
            style={{
              width: '100%',
              padding: '1rem 2rem',
              backgroundColor: 'var(--burgundy)',
              color: 'var(--light)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-base)',
              letterSpacing: '0.04em',
              boxShadow: '0 8px 24px rgba(139, 71, 87, 0.4)',
              border: '1px solid rgba(212, 175, 142, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            <BookOpen size={18} color="var(--gold)" />
            <span>{BIRTHDAY.story.ch09.primaryButtonText}</span>
          </button>

          <button
            type="button"
            onClick={onSkip}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              color: 'rgba(245, 239, 231, 0.65)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem'
            }}
          >
            <span>{BIRTHDAY.story.ch09.secondaryButtonText}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
