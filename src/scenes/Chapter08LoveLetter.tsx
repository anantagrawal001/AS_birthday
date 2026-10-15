import React, { useState } from 'react';
import { BIRTHDAY } from '../content/config';
import { PhotoPicture } from '../components/PhotoPicture';
import { audioService } from '../services/audioService';
import { hapticsService } from '../services/hapticsService';
import { Mail, MailOpen } from 'lucide-react';

export const Chapter08LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true); // Open by default for immediate reading / accessibility, with fold toggle

  const toggleLetter = () => {
    hapticsService.medium();
    audioService.playEnvelopeOpen();
    setIsOpen((prev) => !prev);
  };

  const letter = BIRTHDAY.story.ch08.letter;

  return (
    <section
      id="chapter-08"
      aria-label="The love letter"
      className="paper-surface"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        borderTop: '1px solid var(--paper-border)',
        borderBottom: '1px solid var(--paper-border)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '820px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        {/* Toggle Button / Envelope Affordance */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={toggleLetter}
            aria-expanded={isOpen}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.75rem 1.6rem',
              backgroundColor: 'var(--burgundy-soft)',
              color: 'var(--burgundy)',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(139, 71, 87, 0.3)',
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isOpen ? <MailOpen size={18} /> : <Mail size={18} />}
            <span>{isOpen ? 'Fold letter' : 'Open your letter'}</span>
          </button>
        </div>

        {/* Parchment Keepsake Letter */}
        {isOpen && (
          <article
            style={{
              width: '100%',
              backgroundColor: '#FFFDF9',
              borderRadius: '4px',
              padding: 'clamp(2rem, 5vw, 4.5rem)',
              boxShadow: 'var(--shadow-warm-lg), 0 0 35px rgba(212, 175, 142, 0.2)',
              border: '1px solid rgba(212, 175, 142, 0.35)',
              position: 'relative',
              animation: 'fadeIn 0.4s ease'
            }}
          >
            {/* Subtle Embossed Inner Border */}
            <div
              style={{
                position: 'absolute',
                inset: '12px',
                border: '1px solid rgba(139, 71, 87, 0.12)',
                pointerEvents: 'none'
              }}
            />

            {/* Top Greeting with Side Portrait */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginBottom: '2rem',
                position: 'relative',
                zIndex: 2
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-3xl)',
                    color: 'var(--burgundy)',
                    fontWeight: 400,
                    marginBottom: '0.25rem'
                  }}
                >
                  {letter.greeting}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-xl)',
                    color: 'var(--ink-soft)',
                    fontStyle: 'italic',
                    margin: 0
                  }}
                >
                  {letter.subgreeting}
                </p>
              </div>

              {/* Side Tender Portrait (PHOTO_31) */}
              <div
                style={{
                  width: '90px',
                  height: '115px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-warm-sm)',
                  border: '1px solid rgba(139, 71, 87, 0.15)',
                  backgroundColor: '#FFFFFF',
                  padding: '4px'
                }}
              >
                <PhotoPicture
                  photoTag={BIRTHDAY.story.ch08.photoTag}
                  useThumb={true}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Letter Body Paragraphs */}
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-lg)',
                color: 'var(--ink)',
                lineHeight: 1.85,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                position: 'relative',
                zIndex: 2
              }}
            >
              {letter.paragraphs.map((p, idx) => (
                <p key={idx} style={{ margin: 0, textIndent: idx === 0 ? '0' : '1.5rem' }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Signoff and Footer Photo */}
            <div
              style={{
                marginTop: '3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '1.5rem',
                position: 'relative',
                zIndex: 2
              }}
            >
              {/* Footer Quiet Photo (PHOTO_33) */}
              <div
                style={{
                  width: '85px',
                  height: '105px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-warm-sm)',
                  border: '1px solid rgba(139, 71, 87, 0.15)',
                  backgroundColor: '#FFFFFF',
                  padding: '4px'
                }}
              >
                <PhotoPicture
                  photoTag={BIRTHDAY.story.ch08.footerPhotoTag}
                  useThumb={true}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Signature */}
              <div style={{ textAlign: 'right' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--ink-soft)',
                    fontStyle: 'italic',
                    marginBottom: '0.25rem'
                  }}
                >
                  {letter.closing}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-hand)',
                    fontSize: '2.4rem',
                    color: 'var(--burgundy)',
                    lineHeight: 1,
                    margin: 0
                  }}
                >
                  {letter.signature}
                </p>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};
