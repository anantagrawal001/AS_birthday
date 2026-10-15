import React, { useState } from 'react';
import { BIRTHDAY } from '../content/config';
import { PhotoPicture } from '../components/PhotoPicture';
import { audioService } from '../services/audioService';
import { hapticsService } from '../services/hapticsService';
import { RotateCcw, Sparkles } from 'lucide-react';

export const Chapter08LoveLetter: React.FC = () => {
  // Starts visibly folded in retro envelope as requested
  const [isFolded, setIsFolded] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleOpenLetter = () => {
    if (isAnimating) return;
    hapticsService.medium();
    audioService.playEnvelopeOpen();
    setIsAnimating(true);
    setTimeout(() => {
      setIsFolded(false);
      setIsAnimating(false);
    }, 700);
  };

  const handleFoldBack = () => {
    hapticsService.light();
    audioService.playEnvelopeOpen();
    setIsFolded(true);
  };

  const letter = BIRTHDAY.story.ch08.letter;

  return (
    <section
      id="chapter-08"
      aria-label="The love letter"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: isFolded ? '#151117' : '#FAF6EE',
        transition: 'background-color 0.8s ease'
      }}
    >
      {/* Background Ambience */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isFolded
            ? 'radial-gradient(ellipse at 50% 50%, rgba(139, 71, 87, 0.2) 0%, rgba(21, 17, 23, 0.95) 75%)'
            : 'radial-gradient(circle at 50% 30%, rgba(212, 175, 142, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          transition: 'all 0.8s ease'
        }}
      />

      <div
        style={{
          maxWidth: '820px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* ========================================================
            1. VINTAGE RETRO ENVELOPE (FOLDED STATE)
            ======================================================== */}
        {isFolded && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
              animation: 'blurToFocus 0.6s ease'
            }}
          >
            {/* Header Title */}
            <div style={{ textAlign: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--blush)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '0.5rem'
                }}
              >
                <Sparkles size={14} color="var(--gold)" />
                <span>A Hand-Written Letter</span>
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-3xl)',
                  color: 'var(--light)',
                  fontWeight: 400
                }}
              >
                From Anant with all my love
              </h2>
            </div>

            {/* Vintage Airmail Envelope Physical Card */}
            <div
              className={`airmail-border hover-card-tilt ${isAnimating ? 'flap-opening' : ''}`}
              style={{
                width: 'clamp(300px, 86vw, 560px)',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={handleOpenLetter}
              role="button"
              tabIndex={0}
              aria-label="Open your birthday love letter"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleOpenLetter();
              }}
            >
              <div
                style={{
                  backgroundColor: '#F7F1E5', // Warm vintage parchment
                  borderRadius: '4px',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.06)',
                  position: 'relative',
                  minHeight: 'clamp(220px, 40vw, 320px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  overflow: 'hidden'
                }}
              >
                {/* Vintage Postage Stamp (Top Right) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  {/* Postmark cancellation stamp */}
                  <div className="postmark-stamp">
                    <span style={{ fontSize: '0.55rem', fontWeight: 600, letterSpacing: '0.08em' }}>AIRMAIL</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, margin: '2px 0' }}>17 OCT 2026</span>
                    <span style={{ fontSize: '0.5rem', letterSpacing: '0.05em' }}>NEW DELHI</span>
                  </div>

                  {/* Stamp */}
                  <div
                    style={{
                      width: '65px',
                      height: '80px',
                      backgroundColor: '#FFFFFF',
                      border: '2px dotted #8B4757',
                      padding: '4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ fontSize: '0.55rem', color: '#8B4757', fontWeight: 600 }}>AANYA 23</span>
                    <span style={{ fontSize: '1.4rem' }}>🌹</span>
                    <span style={{ fontSize: '0.5rem', color: '#8B4757' }}>SPECIAL ISSUE</span>
                  </div>
                </div>

                {/* Sender Top Left */}
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.85rem',
                      color: 'var(--burgundy)',
                      letterSpacing: '0.05em',
                      margin: 0
                    }}
                  >
                    By Air Mail • Par Avion
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.75rem',
                      color: 'var(--ink-muted)',
                      margin: '2px 0 0 0'
                    }}
                  >
                    Sender: Anant Agrawal
                  </p>
                </div>

                {/* Addressed To (Handwritten Calligraphy) */}
                <div style={{ margin: 'auto 0', padding: '1rem 0 3.8rem 0' }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.85rem',
                      color: 'var(--ink-soft)',
                      fontStyle: 'italic',
                      margin: 0
                    }}
                  >
                    Delivered with all my heart to:
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-hand)',
                      fontSize: 'clamp(2rem, 5vw, 3rem)',
                      color: 'var(--burgundy)',
                      lineHeight: 1.1,
                      margin: '0.25rem 0 0 0'
                    }}
                  >
                    Aanya Sharma
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.95rem',
                      color: 'var(--ink-soft)',
                      fontStyle: 'italic',
                      margin: 0
                    }}
                  >
                    The love of my life • Happy 23rd Birthday
                  </p>
                </div>

                {/* Wax Seal Center Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                    zIndex: 10
                  }}
                >
                  {/* Crimson Wax Seal */}
                  <div
                    className="wax-seal-pulse"
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: '#7A1C2C', // Deep crimson wax
                      border: '3px solid #5A121F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.25)',
                      cursor: 'pointer'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        color: '#E8C59A', // Embossed gold monogram "A"
                        textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
                        userSelect: 'none'
                      }}
                    >
                      A
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.8rem',
                      letterSpacing: '0.06em',
                      color: 'var(--burgundy)',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}
                  >
                    Tap to open letter
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            2. UNFOLDED KEEPSAKE LETTER (OPEN STATE)
            ======================================================== */}
        {!isFolded && (
          <div
            className="parchment-unfold"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}
          >
            {/* Top Toolbar: Refold Option */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleFoldBack}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.4rem',
                  backgroundColor: '#FFFDF9',
                  color: 'var(--burgundy)',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(139, 71, 87, 0.35)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <RotateCcw size={14} color="var(--burgundy)" />
                <span>Fold letter back into envelope</span>
              </button>
            </div>

            {/* Parchment Paper Keepsake */}
            <article
              style={{
                width: '100%',
                backgroundColor: '#FFFDF9',
                borderRadius: '4px',
                padding: 'clamp(2rem, 5vw, 4.5rem)',
                boxShadow: '0 25px 70px rgba(0,0,0,0.15), 0 0 35px rgba(212, 175, 142, 0.25)',
                border: '1px solid rgba(212, 175, 142, 0.4)',
                position: 'relative'
              }}
            >
              {/* Subtle Embossed Inner Border */}
              <div
                style={{
                  position: 'absolute',
                  inset: '12px',
                  border: '1px solid rgba(139, 71, 87, 0.15)',
                  pointerEvents: 'none'
                }}
              />

              {/* Decorative Wax Seal Monogram in Corner */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '25px',
                  opacity: 0.15,
                  fontSize: '3rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--burgundy)',
                  userSelect: 'none'
                }}
              >
                A
              </div>

              {/* Top Greeting with Side Portrait */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                  marginBottom: '2.5rem',
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
                    width: '95px',
                    height: '120px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-warm-md)',
                    border: '1px solid rgba(139, 71, 87, 0.2)',
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
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                  color: 'var(--ink)',
                  lineHeight: 1.9,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.4rem',
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
                  marginTop: '3.5rem',
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
                    width: '90px',
                    height: '110px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-warm-sm)',
                    border: '1px solid rgba(139, 71, 87, 0.2)',
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
                      marginBottom: '0.35rem'
                    }}
                  >
                    {letter.closing}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-hand)',
                      fontSize: '2.8rem',
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
          </div>
        )}
      </div>
    </section>
  );
};

