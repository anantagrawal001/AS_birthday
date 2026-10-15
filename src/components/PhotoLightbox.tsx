import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPhotoByTag } from '../content/photoManifest';
import { audioService } from '../services/audioService';

interface PhotoLightboxProps {
  photoTag: string | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  caption?: string;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photoTag,
  onClose,
  onNext,
  onPrev,
  caption
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (photoTag) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      audioService.playLightTap();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'ArrowRight' && onNext) {
          onNext();
        } else if (e.key === 'ArrowLeft' && onPrev) {
          onPrev();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      // Focus close button on open
      const closeBtn = modalRef.current?.querySelector('button') as HTMLButtonElement;
      closeBtn?.focus();

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previouslyFocusedElement.current?.focus();
      };
    }
  }, [photoTag, onClose, onNext, onPrev]);

  if (!photoTag) return null;

  const photo = getPhotoByTag(photoTag);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Expanded photograph view"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(15, 13, 16, 0.94)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        animation: 'fadeIn 0.25s ease forwards'
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo view"
        style={{
          position: 'absolute',
          top: 'clamp(1rem, 2.5vw, 2rem)',
          right: 'clamp(1rem, 2.5vw, 2rem)',
          zIndex: 10000,
          background: 'rgba(255, 249, 242, 0.1)',
          border: '1px solid rgba(212, 175, 142, 0.3)',
          color: 'var(--ivory)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <X size={22} />
      </button>

      {/* Main Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: 'min(90vw, 1100px)',
          maxHeight: 'min(82vh, 850px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(212, 175, 142, 0.15)',
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: '#1E1B1F',
          border: '1px solid rgba(212, 175, 142, 0.2)'
        }}
      >
        <picture style={{ display: 'flex', justifyContent: 'center', maxHeight: '72vh' }}>
          <source srcSet={photo.derivatives.webp} type="image/webp" />
          <img
            src={photo.derivatives.jpg}
            alt={photo.alt}
            style={{
              maxWidth: '100%',
              maxHeight: '72vh',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </picture>

        {/* Caption bar */}
        <div
          style={{
            width: '100%',
            padding: '0.85rem 1.25rem',
            backgroundColor: 'rgba(21, 19, 22, 0.95)',
            borderTop: '1px solid rgba(212, 175, 142, 0.15)',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-base)',
              color: 'var(--ivory)',
              margin: 0,
              fontStyle: 'italic'
            }}
          >
            {caption || photo.alt}
          </p>
        </div>
      </div>

      {/* Navigation Buttons if provided */}
      {onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous photograph"
          style={{
            position: 'absolute',
            left: 'clamp(0.75rem, 2vw, 2rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 249, 242, 0.1)',
            border: '1px solid rgba(212, 175, 142, 0.3)',
            color: 'var(--ivory)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next photograph"
          style={{
            position: 'absolute',
            right: 'clamp(0.75rem, 2vw, 2rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 249, 242, 0.1)',
            border: '1px solid rgba(212, 175, 142, 0.3)',
            color: 'var(--ivory)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  );
};
