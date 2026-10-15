import React, { useState } from 'react';
import { BIRTHDAY } from '../content/config';
import { PhotoPicture } from '../components/PhotoPicture';
import { PhotoLightbox } from '../components/PhotoLightbox';
import { hapticsService } from '../services/hapticsService';
import { audioService } from '../services/audioService';

export const Chapter05Photobooth: React.FC = () => {
  const [activePhotoTag, setActivePhotoTag] = useState<string | null>(null);

  const tags = BIRTHDAY.story.ch05.photoTags; // PHOTO_03 to PHOTO_10
  const stripA = tags.slice(0, 4); // PHOTO_03, 04, 05, 06
  const stripB = tags.slice(4, 8); // PHOTO_07, 08, 09, 10

  const handleCellClick = (tag: string) => {
    hapticsService.light();
    audioService.playLightTap();
    setActivePhotoTag(tag);
  };

  const handleNext = () => {
    if (!activePhotoTag) return;
    const idx = tags.indexOf(activePhotoTag);
    setActivePhotoTag(tags[(idx + 1) % tags.length]);
  };

  const handlePrev = () => {
    if (!activePhotoTag) return;
    const idx = tags.indexOf(activePhotoTag);
    setActivePhotoTag(tags[(idx - 1 + tags.length) % tags.length]);
  };

  const renderStrip = (cellTags: string[], angle: number, label: string) => {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '16px 14px 28px 14px',
          boxShadow: 'var(--shadow-warm-lg), 0 0 20px rgba(0,0,0,0.2)',
          borderRadius: '4px',
          border: '1px solid rgba(139, 71, 87, 0.15)',
          transform: `rotate(${angle}deg)`,
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          width: 'clamp(240px, 45vw, 320px)'
        }}
      >
        {cellTags.map((tag, idx) => (
          <button
            key={tag}
            type="button"
            onClick={() => handleCellClick(tag)}
            aria-label={`Open photobooth cell ${idx + 1}`}
            style={{
              width: '100%',
              aspectRatio: '360/268',
              overflow: 'hidden',
              backgroundColor: '#1E1B1F',
              borderRadius: '2px',
              padding: 0,
              cursor: 'pointer',
              border: 'none',
              display: 'block'
            }}
          >
            <PhotoPicture
              photoTag={tag}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </button>
        ))}

        <div
          style={{
            fontFamily: 'var(--font-hand)',
            fontSize: '1.25rem',
            color: 'var(--ink-muted)',
            marginTop: '8px',
            textAlign: 'center'
          }}
        >
          {label}
        </div>
      </div>
    );
  };

  return (
    <section
      id="chapter-05"
      aria-label="Our little photobooth"
      className="paper-surface"
      style={{
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
        borderTop: '1px solid var(--paper-border)',
        borderBottom: '1px solid var(--paper-border)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(2rem, 5vw, 3.5rem)'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '580px' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-sm)',
              color: 'var(--burgundy)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            Look at us
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-3xl)',
              color: 'var(--ink)',
              marginBottom: '0.75rem'
            }}
          >
            {BIRTHDAY.story.ch05.title}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-lg)',
              fontStyle: 'italic',
              color: 'var(--ink-soft)'
            }}
          >
            "{BIRTHDAY.story.ch05.caption}"
          </p>
        </div>

        {/* Photobooth Strips Container */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 'clamp(1.5rem, 4vw, 3rem)'
          }}
        >
          {renderStrip(stripA, -1.8, 'take one • us')}
          {renderStrip(stripB, 1.8, 'take two • smiles')}
        </div>
      </div>

      <PhotoLightbox
        photoTag={activePhotoTag}
        onClose={() => setActivePhotoTag(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
