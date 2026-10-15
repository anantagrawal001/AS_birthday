import React from 'react';
import { MagazinePageFace } from '../content/magazinePages';
import { PhotoPicture } from '../components/PhotoPicture';
import { BIRTHDAY } from '../content/config';
import { DESIGNED_MAGAZINE_PAGES } from '../content/magazineDesignedPages';

interface MagazinePageDOMProps {
  page: MagazinePageFace;
  isSpread?: boolean;
}

export const MagazinePageDOM: React.FC<MagazinePageDOMProps> = ({ page, isSpread = false }) => {
  const isVerso = page.side === 'verso';

  // 0. CUSTOM DESIGNED EDITORIAL PAGES (From user's print-ready pages)
  const designedPage = DESIGNED_MAGAZINE_PAGES.find((p) => p.page === page.pageNumber);
  if (designedPage) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: page.isCover || page.isBackCover ? '#171317' : '#FAF6F0',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none'
        }}
      >
        <picture style={{ width: '100%', height: '100%', display: 'block' }}>
          <source srcSet={designedPage.webp} type="image/webp" />
          <img
            src={designedPage.jpg}
            alt={designedPage.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block'
            }}
            loading={page.pageNumber <= 2 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </picture>

        {/* Subtle paper grain texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(0,0,0,0.035) 1px, transparent 0)',
            backgroundSize: '12px 12px',
            pointerEvents: 'none',
            opacity: 0.7
          }}
        />

        {/* Realistic Book Spine Shadow for 2-page spread */}
        {isSpread && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              pointerEvents: 'none',
              zIndex: 4,
              ...(isVerso
                ? {
                    right: 0,
                    width: '32px',
                    background:
                      'linear-gradient(to left, rgba(0, 0, 0, 0.35) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)'
                  }
                : {
                    left: 0,
                    width: '32px',
                    background:
                      'linear-gradient(to right, rgba(0, 0, 0, 0.35) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)'
                  })
            }}
          />
        )}

        {/* Outer edge subtle shading */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 4,
            ...(isVerso
              ? {
                  left: 0,
                  width: '14px',
                  background:
                    'linear-gradient(to right, rgba(0, 0, 0, 0.16) 0%, transparent 100%)'
                }
              : {
                  right: 0,
                  width: '14px',
                  background:
                    'linear-gradient(to left, rgba(0, 0, 0, 0.16) 0%, transparent 100%)'
                })
          }}
        />

        {/* Soft Light Sheen / Gloss reflection */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 45%, rgba(0, 0, 0, 0.05) 100%)',
            pointerEvents: 'none',
            zIndex: 3
          }}
        />

        {/* Hidden screen-reader transcript */}
        <div className="sr-only">
          <h2>{page.title}</h2>
          {page.pullQuote && <p>{page.pullQuote}</p>}
          {page.bodyText && <p>{page.bodyText}</p>}
        </div>
      </div>
    );
  }

  // Base page style (Fallback)
  const pageContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: page.isCover || page.isBackCover ? '#1A1418' : '#FAF6F0',
    color: page.isCover || page.isBackCover ? 'var(--ivory)' : 'var(--ink)',
    boxSizing: 'border-box',
    padding: 'clamp(1rem, 3.5vw, 2.5rem)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
    userSelect: 'text',
    boxShadow: isSpread
      ? isVerso
        ? 'inset -15px 0 25px rgba(0,0,0,0.12)' // Spine shadow on right of verso
        : 'inset 15px 0 25px rgba(0,0,0,0.12)'  // Spine shadow on left of recto
      : 'none'
  };

  // 1. FRONT COVER (Page 1)
  if (page.isCover) {
    return (
      <div style={pageContainerStyle}>
        {/* Background Decorative Photo (PHOTO_01) */}
        {page.decorativePhotoTag && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <PhotoPicture
              photoTag={page.decorativePhotoTag}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.62) contrast(1.1)'
              }}
            />
          </div>
        )}

        {/* Soft Vignette / Tint */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(21, 19, 22, 0.7) 0%, transparent 40%, rgba(21, 19, 22, 0.85) 100%)',
            zIndex: 1
          }}
        />

        {/* Cover Spine Shadow on left */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '18px',
            background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent)',
            zIndex: 3
          }}
        />

        {/* Cover Top Header */}
        <header style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.7rem, 1.8vw, 0.95rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--blush)',
              marginBottom: '0.35rem'
            }}
          >
            A Birthday Keepsake
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              letterSpacing: '0.25em',
              fontWeight: 400,
              color: 'var(--ivory)',
              lineHeight: 1,
              margin: 0
            }}
          >
            {BIRTHDAY.recipient.displayName.toUpperCase()}
          </h1>
          <div
            style={{
              width: '45px',
              height: '1px',
              backgroundColor: 'var(--gold)',
              margin: '0.75rem auto'
            }}
          />
        </header>

        {/* Cover Center Title */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', margin: 'auto 0' }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 3.2vw, 2.2rem)',
              letterSpacing: '0.12em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              lineHeight: 1.25,
              fontWeight: 400,
              margin: 0
            }}
          >
            {page.title}
          </p>
        </div>

        {/* Cover Bottom Credit */}
        <footer style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: 'clamp(1.25rem, 3vw, 1.85rem)',
              color: 'var(--light)',
              margin: 0
            }}
          >
            {page.bodyText}
          </p>
        </footer>
      </div>
    );
  }

  // 12. BACK COVER (Page 12)
  if (page.isBackCover) {
    return (
      <div
        style={{
          ...pageContainerStyle,
          backgroundColor: '#1E161B',
          border: '1px solid rgba(212, 175, 142, 0.25)',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        {/* Soft Embossed Border */}
        <div
          style={{
            position: 'absolute',
            inset: '16px',
            border: '1px solid rgba(212, 175, 142, 0.2)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              color: 'var(--light)',
              fontWeight: 400,
              lineHeight: 1.2
            }}
          >
            {page.title}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              color: 'var(--gold)',
              fontStyle: 'italic',
              margin: 0
            }}
          >
            "{page.pullQuote}"
          </p>

          <p
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '2.5rem',
              color: 'var(--blush)',
              marginTop: '1.5rem',
              lineHeight: 1
            }}
          >
            {page.bodyText}
          </p>
        </div>
      </div>
    );
  }

  // INTERIOR PAGES (Pages 2 through 11)
  return (
    <div style={pageContainerStyle}>
      {/* Header Running Folio */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(139, 71, 87, 0.15)',
          paddingBottom: '0.5rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-sans)',
          color: 'var(--ink-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}
      >
        <span>{isVerso ? `Aanya Sharma • 23` : page.title}</span>
        <span>{isVerso ? page.title : `Keepsake Issue`}</span>
      </header>

      {/* Main Page Editorial Layouts */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'clamp(0.75rem, 2vw, 1.5rem)',
          padding: 'clamp(0.5rem, 1.5vw, 1rem) 0'
        }}
      >
        {/* Page 2: Editorial Lead */}
        {page.layoutVariant === 'editorial-lead' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', justifyContent: 'space-around' }}>
            <div style={{ flex: '1 1 55%', maxHeight: '55%', overflow: 'hidden', borderRadius: '2px' }}>
              <PhotoPicture
                photoTag={page.primaryPhotoTags[0]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <blockquote
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  color: 'var(--burgundy)',
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                  borderLeft: '2px solid var(--gold)',
                  paddingLeft: '0.85rem',
                  margin: 0
                }}
              >
                "{page.pullQuote}"
              </blockquote>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)',
                  color: 'var(--ink-soft)',
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                {page.bodyText}
              </p>
            </div>
          </div>
        )}

        {/* Page 3, 6: Single Full Height */}
        {page.layoutVariant === 'single-full' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.75rem' }}>
            <div style={{ flex: 1, overflow: 'hidden', borderRadius: '2px' }}>
              <PhotoPicture
                photoTag={page.primaryPhotoTags[0]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            {page.caption && (
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)',
                  color: 'var(--ink-soft)',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  margin: 0
                }}
              >
                {page.caption}
              </p>
            )}
            {page.pullQuote && (
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
                  color: 'var(--burgundy)',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  margin: 0
                }}
              >
                "{page.pullQuote}"
              </p>
            )}
          </div>
        )}

        {/* Page 4: Single Landscape Photo */}
        {page.layoutVariant === 'single-landscape' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: '1.25rem' }}>
            <div style={{ aspectRatio: '4/3', width: '100%', overflow: 'hidden', borderRadius: '2px' }}>
              <PhotoPicture
                photoTag={page.primaryPhotoTags[0]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)',
                color: 'var(--burgundy)',
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: 1.4,
                margin: 0
              }}
            >
              "{page.pullQuote}"
            </p>
          </div>
        )}

        {/* Page 5: Portrait with gutter */}
        {page.layoutVariant === 'portrait-gutter' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.85rem' }}>
            <div style={{ flex: 1, overflow: 'hidden', borderRadius: '2px' }}>
              <PhotoPicture
                photoTag={page.primaryPhotoTags[0]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                color: 'var(--ink-soft)',
                fontStyle: 'italic',
                textAlign: 'center',
                margin: 0
              }}
            >
              "{page.pullQuote}"
            </p>
          </div>
        )}

        {/* Page 7: Two-Photo Festive Spread (PHOTO_20 & PHOTO_24) */}
        {page.layoutVariant === 'two-photo-festive' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '0.75rem', flex: 1 }}>
              <div style={{ overflow: 'hidden', borderRadius: '2px' }}>
                <PhotoPicture
                  photoTag={page.primaryPhotoTags[0]}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ overflow: 'hidden', borderRadius: '2px' }}>
                <PhotoPicture
                  photoTag={page.primaryPhotoTags[1]}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
                color: 'var(--burgundy)',
                fontStyle: 'italic',
                textAlign: 'center',
                margin: 0
              }}
            >
              "{page.pullQuote}"
            </p>
          </div>
        )}

        {/* Page 8: Outdoor Candid (PHOTO_26) */}
        {page.layoutVariant === 'outdoor-candid' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, overflow: 'hidden', borderRadius: '2px' }}>
              <PhotoPicture
                photoTag={page.primaryPhotoTags[0]}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                color: 'var(--burgundy)',
                fontStyle: 'italic',
                textAlign: 'center',
                margin: 0
              }}
            >
              "{page.pullQuote}"
            </p>
          </div>
        )}

        {/* Page 9: Swing Peace (PHOTO_27) */}
        {page.layoutVariant === 'swing-peace' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, overflow: 'hidden', borderRadius: '2px' }}>
              <PhotoPicture
                photoTag={page.primaryPhotoTags[0]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                color: 'var(--ink-soft)',
                fontStyle: 'italic',
                textAlign: 'center',
                margin: 0
              }}
            >
              "{page.pullQuote}"
            </p>
          </div>
        )}

        {/* Page 10: Playful Split (PHOTO_29) */}
        {page.layoutVariant === 'playful-split' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, overflow: 'hidden', borderRadius: '2px' }}>
              <PhotoPicture
                photoTag={page.primaryPhotoTags[0]}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                color: 'var(--burgundy)',
                fontStyle: 'italic',
                textAlign: 'center',
                margin: 0
              }}
            >
              "{page.pullQuote}"
            </p>
          </div>
        )}

        {/* Page 11: Emotional Climax Duo (PHOTO_31 & PHOTO_35) */}
        {page.layoutVariant === 'climax-duo' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '0.75rem', justifyContent: 'space-between' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', flex: '1 1 50%', maxHeight: '50%' }}>
              <div style={{ overflow: 'hidden', borderRadius: '2px' }}>
                <PhotoPicture
                  photoTag={page.primaryPhotoTags[0]}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ overflow: 'hidden', borderRadius: '2px' }}>
                <PhotoPicture
                  photoTag={page.primaryPhotoTags[1]}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(0.75rem, 1.6vw, 0.95rem)',
                lineHeight: 1.6,
                color: 'var(--ink)',
                backgroundColor: 'rgba(255,255,255,0.7)',
                padding: '0.85rem',
                borderRadius: '2px',
                border: '1px solid rgba(139, 71, 87, 0.15)'
              }}
            >
              {page.bodyText?.split('\n').map((line, idx) => (
                <p key={idx} style={{ margin: '0.2rem 0' }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer Page Number */}
      <footer
        style={{
          display: 'flex',
          justifyContent: isVerso ? 'flex-start' : 'flex-end',
          alignItems: 'center',
          borderTop: '1px solid rgba(139, 71, 87, 0.15)',
          paddingTop: '0.5rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-serif)',
          color: 'var(--ink-muted)'
        }}
      >
        <span>
          {isVerso ? `${page.pageNumber} • The Aanya Keepsake` : `The Aanya Keepsake • ${page.pageNumber}`}
        </span>
      </footer>
    </div>
  );
};
