import React from 'react';
import { BIRTHDAY } from '../content/config';
import { PhotoPicture } from '../components/PhotoPicture';
import { ChevronDown } from 'lucide-react';

interface Chapter01Props {
  onNext: () => void;
}

export const Chapter01Hero: React.FC<Chapter01Props> = ({ onNext }) => {
  return (
    <section
      id="chapter-01"
      aria-label="Happy Birthday Aanya"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1.25rem, 4vw, 3rem)',
        overflow: 'hidden',
        backgroundColor: 'var(--night)'
      }}
    >
      {/* Background Hero Photo (PHOTO_01) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <PhotoPicture
          photoTag={BIRTHDAY.story.ch01.heroTag}
          priority={true}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 28%',
            filter: 'brightness(0.68) contrast(1.05)',
            transform: 'scale(1.02)'
          }}
        />
        {/* Soft Vignette Overlay ensuring typography contrast while keeping faces illuminated */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 30%, transparent 20%, rgba(21, 19, 22, 0.5) 60%, rgba(21, 19, 22, 0.95) 100%), linear-gradient(to bottom, rgba(21, 19, 22, 0.6) 0%, transparent 40%, rgba(21, 19, 22, 0.85) 85%, var(--night) 100%)'
          }}
        />
      </div>

      {/* Top Bar / Header */}
      <header
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-sm)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--blush)'
          }}
        >
          {BIRTHDAY.recipient.formattedBirthday}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(245, 239, 231, 0.7)'
          }}
        >
          For You
        </span>
      </header>

      {/* Main Emotional Typography Center */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '680px',
          width: '100%',
          margin: 'auto auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem'
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-hero)',
            fontWeight: 400,
            letterSpacing: '0.18em',
            color: 'var(--ivory)',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
            lineHeight: 1
          }}
        >
          {BIRTHDAY.story.ch01.headline}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xl)',
            color: 'var(--gold)',
            letterSpacing: '0.04em',
            fontStyle: 'italic',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)'
          }}
        >
          {BIRTHDAY.story.ch01.subline}
        </p>

        <div
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: 'var(--gold)',
            opacity: 0.6,
            margin: '0.5rem auto'
          }}
        />

        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-base)',
            color: 'var(--light)',
            lineHeight: 1.8,
            maxWidth: '480px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}
        >
          {BIRTHDAY.story.ch01.leadText.map((line, idx) => (
            <p key={idx} style={{ margin: '0.2rem 0' }}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom Action Affordance */}
      <footer
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          margin: '0 auto',
          width: '100%'
        }}
      >
        <button
          type="button"
          onClick={onNext}
          aria-label={BIRTHDAY.story.ch01.actionText}
          className="btn-romantic-hover shimmer-gleam"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.85rem 1.8rem',
            backgroundColor: 'rgba(21, 19, 22, 0.75)',
            backdropFilter: 'blur(8px)',
            color: 'var(--ivory)',
            border: '1px solid rgba(212, 175, 142, 0.4)',
            borderRadius: 'var(--radius-pill)',
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-sm)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
        >
          <span>{BIRTHDAY.story.ch01.actionText}</span>
          <ChevronDown size={18} color="var(--gold)" />
        </button>
      </footer>
    </section>
  );
};
