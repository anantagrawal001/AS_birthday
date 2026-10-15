import React, { useState } from 'react';
import { BIRTHDAY } from '../content/config';
import { PhotoPicture } from '../components/PhotoPicture';
import { hapticsService } from '../services/hapticsService';
import { audioService } from '../services/audioService';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Chapter03LoveLines: React.FC = () => {
  // Support individual tap reveal as well as an "Expand all" button
  const [revealedIds, setRevealedIds] = useState<number[]>([1]); // first card open by default for immediate affordance

  const toggleCard = (id: number) => {
    hapticsService.light();
    audioService.playLightTap();
    setRevealedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allExpanded = revealedIds.length === BIRTHDAY.story.ch03.cards.length;

  const toggleAll = () => {
    hapticsService.light();
    audioService.playLightTap();
    if (allExpanded) {
      setRevealedIds([]);
    } else {
      setRevealedIds(BIRTHDAY.story.ch03.cards.map((c) => c.id));
    }
  };

  return (
    <section
      id="chapter-03"
      aria-label="A few things I do not say enough"
      style={{
        backgroundColor: 'var(--night)',
        color: 'var(--ivory)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(2rem, 4vw, 3rem)'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-sm)',
              color: 'var(--blush)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            Memories in words
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-3xl)',
              color: 'var(--light)',
              fontWeight: 400
            }}
          >
            {BIRTHDAY.story.ch03.title}
          </h2>

          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                color: 'rgba(245, 239, 231, 0.6)'
              }}
            >
              {BIRTHDAY.story.ch03.subtitle}
            </span>
            <button
              type="button"
              onClick={toggleAll}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                color: 'var(--gold)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {allExpanded ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {BIRTHDAY.story.ch03.cards.map((card) => {
            const isRevealed = revealedIds.includes(card.id);

            return (
              <div
                key={card.id}
                className="photo-card-hover shimmer-gleam"
                style={{
                  backgroundColor: 'rgba(32, 28, 33, 0.75)',
                  border: '1px solid rgba(212, 175, 142, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  boxShadow: isRevealed ? 'var(--shadow-warm-sm)' : 'none'
                }}
              >
                {/* Clickable Header Button */}
                <button
                  type="button"
                  onClick={() => toggleCard(card.id)}
                  aria-expanded={isRevealed}
                  aria-controls={`love-line-content-${card.id}`}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: 'var(--ivory)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, paddingRight: '0.5rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'var(--text-lg)',
                        color: 'var(--gold)',
                        width: '28px',
                        display: 'inline-block',
                        fontWeight: 500
                      }}
                    >
                      {String(card.id).padStart(2, '0')}.
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                          letterSpacing: '0.02em',
                          color: isRevealed ? 'var(--gold)' : 'var(--light)',
                          fontWeight: isRevealed ? 500 : 400,
                          transition: 'color 0.2s ease'
                        }}
                      >
                        {card.teaser}
                      </span>
                      {!isRevealed && (
                        <span
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.75rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            color: 'rgba(212, 175, 142, 0.6)'
                          }}
                        >
                          Tap to open
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: isRevealed ? 'rgba(212, 175, 142, 0.2)' : 'rgba(212, 175, 142, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {isRevealed ? (
                      <ChevronUp size={18} color="var(--gold)" />
                    ) : (
                      <ChevronDown size={18} color="var(--blush)" />
                    )}
                  </div>
                </button>

                {/* Expanded Card Body */}
                {isRevealed && (
                  <div
                    id={`love-line-content-${card.id}`}
                    style={{
                      padding: '0 1.5rem 1.6rem 1.5rem',
                      display: 'grid',
                      gridTemplateColumns: card.photoTag ? '1fr auto' : '1fr',
                      gap: '1.5rem',
                      alignItems: 'center',
                      borderTop: '1px solid rgba(212, 175, 142, 0.12)'
                    }}
                  >
                    <div style={{ paddingTop: '1.1rem' }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.15rem, 2.3vw, 1.45rem)',
                          color: 'var(--light)',
                          lineHeight: 1.7,
                          fontStyle: 'italic',
                          margin: 0
                        }}
                      >
                        "{card.text}"
                      </p>
                    </div>

                    {card.photoTag && (
                      <div
                        style={{
                          paddingTop: '1rem',
                          width: 'clamp(90px, 18vw, 120px)',
                          height: 'clamp(90px, 18vw, 120px)',
                          borderRadius: 'var(--radius-md)',
                          overflow: 'hidden',
                          border: '1px solid rgba(212, 175, 142, 0.35)',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                          flexShrink: 0
                        }}
                      >
                        <PhotoPicture
                          photoTag={card.photoTag}
                          useThumb={true}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
