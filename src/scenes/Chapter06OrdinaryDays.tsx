import React, { useState } from 'react';
import { BIRTHDAY } from '../content/config';
import { PhotoPicture } from '../components/PhotoPicture';
import { PhotoLightbox } from '../components/PhotoLightbox';
import { hapticsService } from '../services/hapticsService';
import { audioService } from '../services/audioService';

export const Chapter06OrdinaryDays: React.FC = () => {
  const [activePhotoTag, setActivePhotoTag] = useState<string | null>(null);

  const handlePhotoClick = (tag: string) => {
    hapticsService.light();
    audioService.playLightTap();
    setActivePhotoTag(tag);
  };

  const memories = BIRTHDAY.story.ch06.memories;

  return (
    <section
      id="chapter-06"
      aria-label="Ordinary days and precious memories"
      style={{
        backgroundColor: 'var(--night)',
        color: 'var(--ivory)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(3rem, 6vw, 5rem)'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
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
            The Days Between
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-3xl)',
              color: 'var(--light)',
              marginBottom: '1.25rem'
            }}
          >
            {BIRTHDAY.story.ch06.title}
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              fontStyle: 'italic',
              color: 'var(--gold)'
            }}
          >
            {BIRTHDAY.story.ch06.shortTexts.map((text, idx) => (
              <p key={idx} style={{ margin: 0 }}>
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Editorial Photo Compositions */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(3.5rem, 7vw, 6rem)'
          }}
        >
          {memories.map((mem, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={mem.id}
                className={`chapter06-card ${isReversed ? 'reversed' : ''}`}
              >
                {/* Main Photo Card */}
                <div
                  className="chapter06-photo"
                  style={{
                    position: 'relative'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handlePhotoClick(mem.primaryTag)}
                    aria-label={`View ${mem.title}`}
                    style={{
                      width: '100%',
                      padding: 0,
                      border: '1px solid rgba(212, 175, 142, 0.25)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-warm-md)',
                      backgroundColor: '#1E1B1F',
                      cursor: 'pointer',
                      display: 'block'
                    }}
                  >
                    <div style={{ aspectRatio: '4/3', width: '100%', overflow: 'hidden' }}>
                      <PhotoPicture
                        photoTag={mem.primaryTag}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  </button>

                  {/* Supporting Thumbnail insets if any */}
                  {mem.supportingTags.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.75rem',
                        marginTop: '0.75rem',
                        justifyContent: isReversed ? 'flex-end' : 'flex-start'
                      }}
                    >
                      {mem.supportingTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handlePhotoClick(tag)}
                          aria-label={`View alternate photo ${tag}`}
                          style={{
                            width: 'clamp(70px, 15vw, 100px)',
                            aspectRatio: '4/3',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            border: '1px solid rgba(212, 175, 142, 0.3)',
                            padding: 0,
                            cursor: 'pointer'
                          }}
                        >
                          <PhotoPicture
                            photoTag={tag}
                            useThumb={true}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Editorial Caption Side */}
                <div
                  className="chapter06-caption"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    padding: '0 0.5rem'
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-2xl)',
                      color: 'var(--light)'
                    }}
                  >
                    {mem.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'var(--text-lg)',
                      color: 'var(--blush)',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      margin: 0
                    }}
                  >
                    "{mem.caption}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PhotoLightbox
        photoTag={activePhotoTag}
        onClose={() => setActivePhotoTag(null)}
      />
    </section>
  );
};
