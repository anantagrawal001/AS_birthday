import React from 'react';
import { BIRTHDAY } from '../content/config';
import { PhotoPicture } from '../components/PhotoPicture';
import { hapticsService } from '../services/hapticsService';
import { BookOpen, Mail, RotateCcw } from 'lucide-react';

interface Chapter10Props {
  onRereadLetter: () => void;
  onOpenMagazine: () => void;
  onRestart: () => void;
}

export const Chapter10Finale: React.FC<Chapter10Props> = ({
  onRereadLetter,
  onOpenMagazine,
  onRestart
}) => {
  return (
    <footer
      id="chapter-10"
      aria-label="Finale: Birthday love and blessings"
      style={{
        backgroundColor: '#0D0B0E',
        color: 'var(--ivory)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Subtle Warm Lighting */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 35%, rgba(212, 175, 142, 0.1) 0%, transparent 75%)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '850px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(2rem, 5vw, 3.5rem)',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}
      >
        {/* Main Formal Portrait (PHOTO_35) */}
        <div
          className="photo-card-hover shimmer-gleam"
          style={{
            position: 'relative',
            width: 'clamp(220px, 45vw, 300px)',
            aspectRatio: '9/16',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow:
              '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 142, 0.2)',
            border: '1px solid rgba(212, 175, 142, 0.3)',
            backgroundColor: '#1E1B1F'
          }}
        >
          <PhotoPicture
            photoTag={BIRTHDAY.story.ch10.portraitPhotoTag}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 25%'
            }}
          />
        </div>

        {/* Finale Heartfelt Copy */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            maxWidth: '620px'
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-hero)',
              color: 'var(--light)',
              fontWeight: 400,
              lineHeight: 1.15
            }}
          >
            {BIRTHDAY.story.ch10.headline}
          </h2>

          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-xl)',
              color: 'var(--ivory)',
              lineHeight: 1.7,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            {BIRTHDAY.story.ch10.lines.map((line, idx) => (
              <p
                key={idx}
                style={{
                  margin: 0,
                  color: line.includes('I love you') ? 'var(--gold)' : 'var(--ivory)',
                  fontStyle: line.includes('I love you') ? 'italic' : 'normal'
                }}
              >
                {line}
              </p>
            ))}
          </div>

          <div style={{ marginTop: '1rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-base)',
                color: 'var(--blush)',
                fontStyle: 'italic',
                marginBottom: '0.2rem'
              }}
            >
              {BIRTHDAY.story.ch10.closingTitle}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '2.5rem',
                color: 'var(--gold)',
                margin: 0,
                lineHeight: 1
              }}
            >
              {BIRTHDAY.story.ch10.closingSignature}
            </p>
          </div>
        </div>

        {/* Small Optional Illustrated Art Interlude (PHOTO_28) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '1rem',
            borderTop: '1px solid rgba(212, 175, 142, 0.15)',
            borderBottom: '1px solid rgba(212, 175, 142, 0.15)',
            maxWidth: '280px'
          }}
        >
          <div
            className="photobooth-cell-hover"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1px solid rgba(212, 175, 142, 0.3)',
              backgroundColor: '#1E1B1F'
            }}
          >
            <PhotoPicture
              photoTag={BIRTHDAY.story.ch10.illustratedArtTag}
              useThumb={true}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              color: 'rgba(245, 239, 231, 0.5)',
              letterSpacing: '0.04em'
            }}
          >
            (Artistic illustration)
          </span>
        </div>

        {/* Interactive Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1rem'
          }}
        >
          <button
            type="button"
            className="btn-romantic-hover"
            onClick={() => {
              hapticsService.light();
              onRereadLetter();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.6rem',
              backgroundColor: 'rgba(21, 19, 22, 0.7)',
              color: 'var(--ivory)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-sm)',
              border: '1px solid rgba(212, 175, 142, 0.3)',
              cursor: 'pointer'
            }}
          >
            <Mail size={16} color="var(--blush)" />
            <span>{BIRTHDAY.story.ch10.buttonRereadLetter}</span>
          </button>

          <button
            type="button"
            className="btn-romantic-hover shimmer-gleam"
            onClick={() => {
              hapticsService.medium();
              onOpenMagazine();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.6rem',
              backgroundColor: 'var(--burgundy)',
              color: 'var(--light)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-sm)',
              border: '1px solid rgba(212, 175, 142, 0.4)',
              boxShadow: '0 4px 15px rgba(139, 71, 87, 0.35)',
              cursor: 'pointer'
            }}
          >
            <BookOpen size={16} color="var(--gold)" />
            <span>{BIRTHDAY.story.ch10.buttonOpenMagazine}</span>
          </button>

          <button
            type="button"
            className="btn-romantic-hover"
            onClick={() => {
              hapticsService.light();
              onRestart();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.85rem 1.4rem',
              backgroundColor: 'transparent',
              color: 'rgba(245, 239, 231, 0.65)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-xs)',
              border: '1px solid rgba(245, 239, 231, 0.2)',
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={14} />
            <span>{BIRTHDAY.story.ch10.buttonStartAgain}</span>
          </button>
        </div>
      </div>

      {/* Quiet Legal and Privacy Footer */}
      <div
        style={{
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(245, 239, 231, 0.4)',
            margin: 0
          }}
        >
          A private birthday celebration crafted by {BIRTHDAY.sender.name} for {BIRTHDAY.recipient.fullName}
        </p>
        <div style={{ display: 'flex', gap: '1rem', fontSize: 'var(--text-xs)' }}>
          <a
            href="./privacy.html"
            style={{ color: 'rgba(212, 175, 142, 0.6)', textDecoration: 'none' }}
          >
            Privacy Notice
          </a>
          <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
          <a
            href="./terms.html"
            style={{ color: 'rgba(212, 175, 142, 0.6)', textDecoration: 'none' }}
          >
            Terms of Use
          </a>
        </div>
      </div>
    </footer>
  );
};
