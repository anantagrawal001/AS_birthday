import React, { useState } from 'react';
import { BIRTHDAY } from '../content/config';
import { PhotoPicture } from '../components/PhotoPicture';
import { PhotoLightbox } from '../components/PhotoLightbox';
import { getPhotoByTag } from '../content/photoManifest';
import { hapticsService } from '../services/hapticsService';
import { audioService } from '../services/audioService';

export const Chapter04FairyLights: React.FC = () => {
  const [selectedPhotoTag, setSelectedPhotoTag] = useState<string | null>(null);

  const photoTags = BIRTHDAY.story.ch04.photoTags;

  // Split the 10 photos across 3 sagging string tiers (3 on tier 1, 4 on tier 2, 3 on tier 3)
  const tier1Photos = photoTags.slice(0, 3);
  const tier2Photos = photoTags.slice(3, 7);
  const tier3Photos = photoTags.slice(7, 10);

  const handlePhotoClick = (tag: string) => {
    hapticsService.light();
    audioService.playLightTap();
    setSelectedPhotoTag(tag);
  };

  const handleNextPhoto = () => {
    if (!selectedPhotoTag) return;
    const currentIndex = photoTags.indexOf(selectedPhotoTag);
    const nextIndex = (currentIndex + 1) % photoTags.length;
    setSelectedPhotoTag(photoTags[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!selectedPhotoTag) return;
    const currentIndex = photoTags.indexOf(selectedPhotoTag);
    const prevIndex = (currentIndex - 1 + photoTags.length) % photoTags.length;
    setSelectedPhotoTag(photoTags[prevIndex]);
  };

  const renderPhotoCard = (tag: string, angle: number, delay: number) => {
    const photo = getPhotoByTag(tag);

    return (
      <div
        key={tag}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '18px',
          transform: `rotate(${angle}deg)`,
          transition: 'transform 0.3s ease, filter 0.3s ease',
          animation: `subtleSway ${4 + delay}s ease-in-out infinite alternate`
        }}
      >
        {/* Clip (clothes pin / metallic clip graphic) */}
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            zIndex: 3,
            width: '12px',
            height: '24px',
            backgroundColor: '#A88D77',
            borderRadius: '2px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
            border: '1px solid #7D6450'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '2px',
              right: '2px',
              height: '3px',
              backgroundColor: '#5C4736',
              borderRadius: '1px'
            }}
          />
        </div>

        {/* Hanging Photo Frame Button */}
        <button
          type="button"
          onClick={() => handlePhotoClick(tag)}
          aria-label={`View photograph: ${photo.alt}`}
          style={{
            padding: '8px 8px 22px 8px',
            backgroundColor: '#FFFFFF',
            borderRadius: '2px',
            boxShadow:
              '0 8px 20px rgba(0, 0, 0, 0.45), 0 0 15px rgba(212, 175, 142, 0.25)',
            cursor: 'pointer',
            border: '1px solid rgba(212, 175, 142, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 'clamp(140px, 22vw, 210px)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '3/4',
              overflow: 'hidden',
              backgroundColor: '#1E1B1F'
            }}
          >
            <PhotoPicture
              photoTag={tag}
              useThumb={true}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '1rem',
              color: '#5C5454',
              marginTop: '6px',
              lineHeight: 1
            }}
          >
            forever
          </span>
        </button>
      </div>
    );
  };

  const renderStringWire = (photos: string[], seed: number) => {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '2.5rem'
        }}
      >
        {/* Sagging String Wire SVG */}
        <svg
          viewBox="0 0 1000 70"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '70px',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {/* Wire Shadow */}
          <path
            d="M 0,25 Q 500,65 1000,25"
            fill="none"
            stroke="rgba(0, 0, 0, 0.5)"
            strokeWidth="3"
            filter="blur(2px)"
          />
          {/* Main Wire */}
          <path
            d="M 0,22 Q 500,62 1000,22"
            fill="none"
            stroke="#5A4E46"
            strokeWidth="2"
          />

          {/* Warm Amber Bulbs along the wire */}
          {[100, 220, 360, 500, 640, 780, 900].map((cx, idx) => {
            // Calculate y position on quadratic bezier curve: y = 22 + 40 * (1 - ((x-500)/500)^2)
            const normX = (cx - 500) / 500;
            const cy = 22 + 40 * (1 - normX * normX);

            return (
              <g key={idx}>
                {/* Bulb socket */}
                <rect
                  x={cx - 3}
                  y={cy - 2}
                  width="6"
                  height="4"
                  fill="#332B25"
                  rx="1"
                />
                {/* Outer Glow */}
                <circle
                  cx={cx}
                  cy={cy + 7}
                  r="14"
                  fill="rgba(255, 204, 128, 0.28)"
                  filter="blur(4px)"
                />
                {/* Bulb Glass */}
                <circle
                  cx={cx}
                  cy={cy + 7}
                  r="5"
                  fill="#FFE082"
                  stroke="#FFD54F"
                  strokeWidth="0.8"
                />
              </g>
            );
          })}
        </svg>

        {/* Clipped Photos Container along the string */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '20px',
            paddingLeft: '1rem',
            paddingRight: '1rem'
          }}
        >
          {photos.map((tag, idx) => {
            const angles = [-2.5, 2, -1.5, 3];
            const angle = angles[(idx + seed) % angles.length];
            return renderPhotoCard(tag, angle, idx * 0.8);
          })}
        </div>
      </div>
    );
  };

  return (
    <section
      id="chapter-04"
      aria-label="Fairy lights memory wall"
      style={{
        backgroundColor: '#121013',
        color: 'var(--ivory)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Ambience / Dim Room Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(212, 175, 142, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      {/* Header and Story Copy */}
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto clamp(2rem, 5vw, 4rem) auto',
          textAlign: 'center',
          padding: '0 1.5rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-sm)',
            color: 'var(--gold)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.5rem'
          }}
        >
          Curated Wall
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-3xl)',
            color: 'var(--light)',
            marginBottom: '1rem'
          }}
        >
          {BIRTHDAY.story.ch04.title}
        </h2>

        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            color: 'var(--blush)',
            fontStyle: 'italic',
            lineHeight: 1.6
          }}
        >
          {BIRTHDAY.story.ch04.lines.map((line, idx) => (
            <p key={idx} style={{ margin: '0.2rem 0' }}>
              {line}
            </p>
          ))}
        </div>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(245, 239, 231, 0.5)',
            marginTop: '1rem'
          }}
        >
          Tap any photograph to view up close
        </p>
      </div>

      {/* The 3 Sagging Fairy Light Strings */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(2rem, 4vw, 4rem)'
        }}
      >
        {renderStringWire(tier1Photos, 0)}
        {renderStringWire(tier2Photos, 1)}
        {renderStringWire(tier3Photos, 2)}
      </div>

      {/* Lightbox Modal */}
      <PhotoLightbox
        photoTag={selectedPhotoTag}
        onClose={() => setSelectedPhotoTag(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </section>
  );
};
