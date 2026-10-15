import React from 'react';
import { BIRTHDAY } from '../content/config';
import { PhotoPicture } from '../components/PhotoPicture';
import { hapticsService } from '../services/hapticsService';
import { BookOpen, ArrowRight } from 'lucide-react';

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
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            A Secret Keepsake
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
            backgroundColor: '#262024',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow:
              '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(212, 175, 142, 0.25), inset 4px 0 10px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(212, 175, 142, 0.3)',
            cursor: 'pointer',
            padding: 0,
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Cover Photo Backdrop (PHOTO_01) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <PhotoPicture
              photoTag={BIRTHDAY.story.ch09.coverThumbnailTag}
              useThumb={true}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.65)'
              }}
            />
          </div>

          {/* Book Spine Texture on Left Edge */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '14px',
              background:
                'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3) 60%, transparent)',
              zIndex: 3,
              pointerEvents: 'none'
            }}
          />

          {/* Cover Editorial Typography */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '1.5rem',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center',
              backgroundColor: 'rgba(21, 19, 22, 0.45)'
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  letterSpacing: '0.2em',
                  color: 'var(--light)',
                  margin: 0
                }}
              >
                {BIRTHDAY.recipient.displayName.toUpperCase()}
              </p>
              <div
                style={{
                  width: '24px',
                  height: '1px',
                  backgroundColor: 'var(--gold)',
                  margin: '0.4rem auto'
                }}
              />
            </div>

            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.1em',
                  color: 'var(--gold)',
                  textTransform: 'uppercase',
                  lineHeight: 1.3,
                  margin: '0 0 0.5rem 0'
                }}
              >
                {BIRTHDAY.magazine.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'var(--blush)',
                  textTransform: 'uppercase',
                  margin: 0
                }}
              >
                {BIRTHDAY.magazine.subtitle}
              </p>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.25rem',
                color: 'var(--light)'
              }}
            >
              {BIRTHDAY.magazine.credit}
            </div>
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
