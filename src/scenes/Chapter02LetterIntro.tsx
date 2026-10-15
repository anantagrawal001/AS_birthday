import React from 'react';
import { BIRTHDAY } from '../content/config';
import { PhotoPicture } from '../components/PhotoPicture';
import { ArrowDown } from 'lucide-react';

interface Chapter02Props {
  onNext: () => void;
}

export const Chapter02LetterIntro: React.FC<Chapter02Props> = ({ onNext }) => {
  return (
    <section
      id="chapter-02"
      aria-label="A letter begins"
      className="paper-surface"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.25rem, 5vw, 4rem)',
        borderTop: '1px solid var(--paper-border)',
        borderBottom: '1px solid var(--paper-border)'
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: 'clamp(2rem, 5vw, 4.5rem)',
          alignItems: 'center'
        }}
      >
        {/* Tender Corner Photograph (PHOTO_31) */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            order: 1
          }}
        >
          <div
            style={{
              position: 'relative',
              padding: '12px 12px 28px 12px',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-warm-md)',
              borderRadius: '2px',
              transform: 'rotate(-2deg)',
              border: '1px solid rgba(139, 71, 87, 0.12)',
              maxWidth: '360px',
              width: '100%'
            }}
          >
            <div
              style={{
                aspectRatio: '9/14',
                overflow: 'hidden',
                backgroundColor: 'var(--night)'
              }}
            >
              <PhotoPicture
                photoTag={BIRTHDAY.story.ch02.photoTag}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 30%'
                }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.25rem',
                color: 'var(--ink-muted)',
                textAlign: 'center',
                marginTop: '10px',
                marginBottom: 0
              }}
            >
              a quiet moment
            </p>
          </div>
        </div>

        {/* Letterpress Warm Editorial Prose */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            order: 2
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              fontStyle: 'italic',
              color: 'var(--burgundy)',
              display: 'block'
            }}
          >
            {BIRTHDAY.story.ch02.greeting}
          </span>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              color: 'var(--ink)',
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-xl)',
              lineHeight: 1.6
            }}
          >
            {BIRTHDAY.story.ch02.paragraphs.map((para, idx) => (
              <p key={idx} style={{ margin: 0 }}>
                {para}
              </p>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              onClick={onNext}
              aria-label={BIRTHDAY.story.ch02.actionText}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.4rem',
                backgroundColor: 'var(--burgundy-soft)',
                color: 'var(--burgundy)',
                borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                border: '1px solid rgba(139, 71, 87, 0.25)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{BIRTHDAY.story.ch02.actionText}</span>
              <ArrowDown size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
