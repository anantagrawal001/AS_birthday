import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BookStateMachine, BookState, ReadingMode } from './BookStateMachine';
import { PageModel } from './PageModel';
import { MagazinePageDOM } from './MagazinePageDOM';
import { MagazineAudio } from './MagazineAudio';
import { qualityManager, QualityTier } from './QualityManager';
import { audioService } from '../services/audioService';
import { hapticsService } from '../services/hapticsService';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  FileText,
  RotateCcw,
  Sliders,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface MagazineReaderProps {
  onClose: () => void;
}

export const MagazineReader: React.FC<MagazineReaderProps> = ({ onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);

  // Responsive mode detection: < 768px width is single page mode, >= 768px is 2-page spread
  const [readingMode, setReadingMode] = useState<ReadingMode>(
    typeof window !== 'undefined' && window.innerWidth >= 820 ? 'spread' : 'single'
  );

  const stateMachineRef = useRef<BookStateMachine>(
    new BookStateMachine(12, typeof window !== 'undefined' && window.innerWidth >= 820 ? 'spread' : 'single')
  );

  const [bookState, setBookState] = useState<BookState>('CLOSED');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [quality, setQuality] = useState<QualityTier>(qualityManager.getQuality());
  const [isMuted, setIsMuted] = useState<boolean>(audioService.getMuted());
  const [hapticsOn, setHapticsOn] = useState<boolean>(hapticsService.isEnabled());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showTextModal, setShowTextModal] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [dragProgress, setDragProgress] = useState<number>(0);
  const [dragDirection, setDragDirection] = useState<'next' | 'prev'>('next');

  // Handle Resize and Orientation change
  useEffect(() => {
    const handleResize = () => {
      const isSpread = window.innerWidth >= 820;
      const newMode = isSpread ? 'spread' : 'single';
      setReadingMode(newMode);
      stateMachineRef.current.setMode(newMode);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subscribe to book state changes
  useEffect(() => {
    const sm = stateMachineRef.current;
    const unsub = sm.subscribe((st, page) => {
      setBookState(st);
      setCurrentPage(page);
    });

    const unsubQuality = qualityManager.subscribe((q) => setQuality(q));
    const unsubAudio = audioService.subscribe((m) => setIsMuted(m));

    // Duck story music while magazine is active
    audioService.duckMusic(true);

    // Trap focus inside reader dialog
    containerRef.current?.focus();

    return () => {
      unsub();
      unsubQuality();
      unsubAudio();
      audioService.duckMusic(false);
    };
  }, []);

  // Reset zoom on page turn
  useEffect(() => {
    setZoomLevel(1);
  }, [currentPage]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showTextModal) {
        if (e.key === 'Escape') setShowTextModal(false);
        return;
      }
      if (showSettings) {
        if (e.key === 'Escape') setShowSettings(false);
        return;
      }

      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTextModal, showSettings]);

  // Actions
  const handleOpenCover = () => {
    hapticsService.medium();
    MagazineAudio.playCoverOpen();
    stateMachineRef.current.openBook();
  };

  const handleNext = useCallback(() => {
    const sm = stateMachineRef.current;
    if (sm.getState() === 'CLOSED') {
      handleOpenCover();
      return;
    }
    if (sm.canGoNext()) {
      hapticsService.light();
      MagazineAudio.playPageTurn();
      sm.nextPage();
      setTimeout(() => MagazineAudio.playPageSettle(), 300);
    }
  }, []);

  const handlePrev = useCallback(() => {
    const sm = stateMachineRef.current;
    if (sm.canGoPrev()) {
      hapticsService.light();
      MagazineAudio.playPageTurn();
      sm.prevPage();
      setTimeout(() => MagazineAudio.playPageSettle(), 300);
    }
  }, []);

  const handleRestart = () => {
    hapticsService.medium();
    MagazineAudio.playCoverClose();
    stateMachineRef.current.reset();
  };

  const handleClose = () => {
    hapticsService.light();
    onClose();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Pointer / Touch Drag gesture support
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag on book container
    touchStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now()
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.clientX - touchStartRef.current.x;
    const direction = deltaX < 0 ? 'next' : 'prev';
    const containerWidth = bookContainerRef.current?.clientWidth || 400;
    const progress = Math.min(1, Math.abs(deltaX) / (containerWidth * 0.7));

    setDragProgress(progress);
    setDragDirection(direction);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.clientX - touchStartRef.current.x;
    const deltaTime = performance.now() - touchStartRef.current.time;
    const velocity = deltaX / Math.max(1, deltaTime);

    touchStartRef.current = null;
    setDragProgress(0);

    // If dragged enough or flicked with velocity
    if (Math.abs(deltaX) > 40 || Math.abs(velocity) > 0.4) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Resolve pages for current view
  const isClosed = bookState === 'CLOSED' || currentPage === 1;
  const isOpening = bookState === 'OPENING';
  const isBackCover = currentPage === 12;
  const isSpreadView = readingMode === 'spread' && !isClosed && !isBackCover;
  const spread = PageModel.getSpreadPages(currentPage);
  const leftPageFace = spread.left ? PageModel.getPage(spread.left) : null;
  const rightPageFace = spread.right ? PageModel.getPage(spread.right) : null;
  const singlePageFace = PageModel.getPage(currentPage);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label="Aanya Birthday Luxury Magazine"
      tabIndex={-1}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: '#0F0D10',
        color: 'var(--ivory)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'env(safe-area-inset-top, 0.75rem) 1rem env(safe-area-inset-bottom, 0.75rem) 1rem',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Top Utility Bar */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0.5rem',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          zIndex: 10002
        }}
      >
        {/* Left: Back to Birthday Story CTA */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Back to birthday story"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(212, 175, 142, 0.3)',
            borderRadius: 'var(--radius-pill)',
            color: 'var(--ivory)',
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.04em',
            cursor: 'pointer'
          }}
        >
          <X size={15} color="var(--blush)" />
          <span>Back to birthday story</span>
        </button>

        {/* Center: Page indicator */}
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-sm)',
            color: 'var(--gold)',
            letterSpacing: '0.08em'
          }}
        >
          {isClosed
            ? 'Cover'
            : isBackCover
            ? 'Back Cover'
            : isSpreadView && leftPageFace && rightPageFace
            ? `Pages ${leftPageFace.pageNumber}–${rightPageFace.pageNumber} of 12`
            : `Page ${currentPage} of 12`}
        </div>

        {/* Right Utility Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Zoom In / Zoom Out Toggle */}
          <button
            type="button"
            onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.4 : 1))}
            aria-label={zoomLevel === 1 ? 'Zoom in' : 'Zoom out'}
            title={zoomLevel === 1 ? 'Zoom in (1.4x)' : 'Zoom out (Fit screen)'}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: zoomLevel > 1 ? 'rgba(212, 175, 142, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(212, 175, 142, 0.25)',
              color: zoomLevel > 1 ? 'var(--gold)' : 'var(--ivory)',
              cursor: 'pointer'
            }}
          >
            {zoomLevel === 1 ? <ZoomIn size={16} /> : <ZoomOut size={16} />}
          </button>

          {/* Read Page Text accessibility button */}
          <button
            type="button"
            onClick={() => setShowTextModal(true)}
            aria-label="Read accessible page text"
            title="Read accessible text"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(212, 175, 142, 0.25)',
              color: 'var(--ivory)',
              cursor: 'pointer'
            }}
          >
            <FileText size={16} />
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => audioService.toggleMute()}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(212, 175, 142, 0.25)',
              color: 'var(--ivory)',
              cursor: 'pointer'
            }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Settings button */}
          <button
            type="button"
            onClick={() => setShowSettings((prev) => !prev)}
            aria-label="Reader settings"
            title="Settings"
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(212, 175, 142, 0.25)',
              color: 'var(--ivory)',
              cursor: 'pointer'
            }}
          >
            <Sliders size={16} />
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(212, 175, 142, 0.25)',
              color: 'var(--ivory)',
              cursor: 'pointer',
              display: 'none' // hidden on mobile if unsupported
            }}
            className="desktop-only"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* Settings Popover */}
      {showSettings && (
        <div
          role="dialog"
          aria-label="Reader settings"
          style={{
            position: 'absolute',
            top: '4rem',
            right: '1.5rem',
            zIndex: 10005,
            backgroundColor: '#1C181D',
            border: '1px solid rgba(212, 175, 142, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            width: '260px',
            boxShadow: 'var(--shadow-warm-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
              Quality Mode
            </span>
            <select
              value={quality}
              onChange={(e) => qualityManager.setQuality(e.target.value as QualityTier)}
              style={{
                backgroundColor: '#2A242C',
                color: 'var(--ivory)',
                border: '1px solid rgba(212, 175, 142, 0.25)',
                borderRadius: '4px',
                padding: '0.2rem 0.5rem',
                fontSize: '0.75rem'
              }}
            >
              <option value="high">High (Curved Mesh)</option>
              <option value="balanced">Balanced</option>
              <option value="lightweight">Lightweight</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
              Haptic feedback
            </span>
            <button
              type="button"
              onClick={() => {
                const next = !hapticsOn;
                setHapticsOn(next);
                hapticsService.setEnabled(next);
              }}
              style={{
                fontSize: '0.75rem',
                color: hapticsOn ? 'var(--gold)' : 'var(--ink-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {hapticsOn ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          <button
            type="button"
            onClick={handleRestart}
            style={{
              padding: '0.5rem',
              backgroundColor: 'rgba(139, 71, 87, 0.25)',
              color: 'var(--blush)',
              border: '1px solid rgba(139, 71, 87, 0.35)',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              marginTop: '0.25rem'
            }}
          >
            <RotateCcw size={12} />
            <span>Restart from cover</span>
          </button>
        </div>
      )}

      {/* Main Bound Magazine Center Stage */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '1rem 0'
        }}
      >
        {/* Previous page click / tap target (Desktop only - mobile uses bottom thumb bar) */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={!stateMachineRef.current.canGoPrev()}
          aria-label="Previous page"
          className="desktop-only"
          style={{
            position: 'absolute',
            left: 'clamp(0.5rem, 2vw, 1.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10001,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(212, 175, 142, 0.3)',
            color: 'var(--ivory)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: stateMachineRef.current.canGoPrev() ? 'pointer' : 'default',
            opacity: stateMachineRef.current.canGoPrev() ? 1 : 0.2,
            transition: 'all 0.2s ease'
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Bound Magazine Physical Object */}
        <div
          ref={bookContainerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            position: 'relative',
            width: isSpreadView ? 'min(94vw, 1100px)' : 'min(90vw, 480px)',
            maxWidth: isSpreadView ? '1100px' : '480px',
            maxHeight: 'min(78vh, 740px)',
            aspectRatio: isSpreadView ? '2110 / 1491' : '1055 / 1491',
            height: 'auto',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.25s ease, width 0.35s ease',
            display: 'flex',
            boxShadow:
              '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 45px rgba(212, 175, 142, 0.15)',
            borderRadius: '4px',
            perspective: '1500px',
            touchAction: zoomLevel > 1 ? 'auto' : 'pan-y'
          }}
        >
          {/* Stacking Paper Edges Thickness on sides */}
          <div
            style={{
              position: 'absolute',
              top: '4px',
              bottom: '4px',
              right: '-6px',
              width: '6px',
              background: 'repeating-linear-gradient(to right, #DFD6CB, #FAF6F0 2px)',
              boxShadow: '2px 0 5px rgba(0,0,0,0.5)',
              borderRadius: '0 2px 2px 0',
              pointerEvents: 'none'
            }}
          />

          {/* CLOSED COVER MODE */}
          {isClosed && (
            <div
              onClick={handleOpenCover}
              style={{
                width: '100%',
                height: '100%',
                cursor: 'pointer',
                position: 'relative',
                transformOrigin: 'left center',
                transform: isOpening
                  ? 'rotateY(-60deg)'
                  : dragProgress > 0 && dragDirection === 'next'
                  ? `rotateY(-${dragProgress * 45}deg)`
                  : 'none',
                transition: isOpening ? 'transform 0.45s ease-out' : 'none'
              }}
            >
              {singlePageFace && <MagazinePageDOM page={singlePageFace} />}
              {/* Subtle Tap to Open Invitation */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '0.6rem 1.4rem',
                  backgroundColor: 'rgba(21, 19, 22, 0.85)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(212, 175, 142, 0.4)',
                  borderRadius: 'var(--radius-pill)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--gold)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                }}
              >
                Tap to open
              </div>
            </div>
          )}

          {/* OPEN SPREAD MODE (Desktop/Tablet for interior pages 2 through 11) */}
          {isSpreadView && (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                backgroundColor: '#FAF6F0',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Central Spine Gutter Crease */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: '50%',
                  width: '2px',
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  boxShadow: '0 0 16px rgba(0, 0, 0, 0.5)',
                  zIndex: 10,
                  transform: 'translateX(-50%)'
                }}
              />

              {/* Verso (Left Page) */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                {leftPageFace ? (
                  <MagazinePageDOM page={leftPageFace} isSpread={true} />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#FAF6F0' }} />
                )}
              </div>

              {/* Recto (Right Page) */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformOrigin: 'left center',
                  transform:
                    dragProgress > 0 && dragDirection === 'next'
                      ? `rotateY(-${dragProgress * 35}deg)`
                      : 'none',
                  transition: dragProgress === 0 ? 'transform 0.25s ease' : 'none'
                }}
              >
                {rightPageFace ? (
                  <MagazinePageDOM page={rightPageFace} isSpread={true} />
                ) : (
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#FAF6F0' }} />
                )}
              </div>
            </div>
          )}

          {/* BACK COVER MODE (Single Centered Page, identical in luxury finish to front cover) */}
          {isBackCover && (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#171317',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {singlePageFace && <MagazinePageDOM page={singlePageFace} />}
            </div>
          )}

          {/* OPEN SINGLE PAGE MODE (Mobile Portrait for interior pages 2 through 11) */}
          {!isClosed && !isBackCover && readingMode === 'single' && (
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#FAF6F0',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
                transformOrigin: 'left center',
                transform:
                  dragProgress > 0 && dragDirection === 'next'
                    ? `rotateY(-${dragProgress * 30}deg)`
                    : 'none',
                transition: dragProgress === 0 ? 'transform 0.25s ease' : 'none'
              }}
            >
              {singlePageFace && <MagazinePageDOM page={singlePageFace} />}
            </div>
          )}
        </div>

        {/* Next page click / tap target (Desktop only - mobile uses bottom thumb bar) */}
        <button
          type="button"
          onClick={handleNext}
          disabled={!stateMachineRef.current.canGoNext() && !isClosed}
          aria-label="Next page"
          className="desktop-only"
          style={{
            position: 'absolute',
            right: 'clamp(0.5rem, 2vw, 1.5rem)',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10001,
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(212, 175, 142, 0.3)',
            color: 'var(--ivory)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: stateMachineRef.current.canGoNext() || isClosed ? 'pointer' : 'default',
            opacity: stateMachineRef.current.canGoNext() || isClosed ? 1 : 0.2,
            transition: 'all 0.2s ease'
          }}
        >
          <ChevronRight size={24} />
        </button>
      </main>

      {/* Bottom Navigation Bar */}
      <footer
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.4rem 1rem',
          zIndex: 10002,
          maxWidth: '500px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        <button
          type="button"
          onClick={handlePrev}
          disabled={!stateMachineRef.current.canGoPrev()}
          aria-label="Previous page"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.45rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(212, 175, 142, 0.25)',
            borderRadius: 'var(--radius-pill)',
            color: 'var(--ivory)',
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xs)',
            cursor: stateMachineRef.current.canGoPrev() ? 'pointer' : 'default',
            opacity: stateMachineRef.current.canGoPrev() ? 1 : 0.3
          }}
        >
          <ChevronLeft size={16} />
          <span>Prev</span>
        </button>

        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xs)',
            color: 'var(--blush)',
            letterSpacing: '0.06em'
          }}
        >
          {isClosed
            ? 'Cover'
            : isBackCover
            ? 'Back Cover'
            : `Page ${currentPage} of 12`}
        </span>

        <button
          type="button"
          onClick={isBackCover ? handleRestart : handleNext}
          disabled={!stateMachineRef.current.canGoNext() && !isClosed && !isBackCover}
          aria-label={isBackCover ? 'Restart magazine' : 'Next page'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.45rem 1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(212, 175, 142, 0.25)',
            borderRadius: 'var(--radius-pill)',
            color: 'var(--ivory)',
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-xs)',
            cursor: stateMachineRef.current.canGoNext() || isClosed || isBackCover ? 'pointer' : 'default',
            opacity: stateMachineRef.current.canGoNext() || isClosed || isBackCover ? 1 : 0.3
          }}
        >
          <span>{isBackCover ? 'Restart' : 'Next'}</span>
          {isBackCover ? <RotateCcw size={14} /> : <ChevronRight size={16} />}
        </button>
      </footer>

      {/* Accessible Text Panel Modal */}
      {showTextModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Accessible Magazine Text"
          onClick={() => setShowTextModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10010,
            backgroundColor: 'rgba(15, 13, 16, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              backgroundColor: '#1E1B1F',
              border: '1px solid rgba(212, 175, 142, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              overflowY: 'auto',
              color: 'var(--ivory)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', color: 'var(--gold)', margin: 0 }}>
                Accessible Page Transcript
              </h3>
              <button
                type="button"
                onClick={() => setShowTextModal(false)}
                aria-label="Close transcript"
                style={{ background: 'none', border: 'none', color: 'var(--ivory)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.8,
                whiteSpace: 'pre-line'
              }}
            >
              {PageModel.getAccessiblePageText(currentPage)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
