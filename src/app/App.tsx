import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Chapter00Invitation } from '../scenes/Chapter00Invitation';
import { Chapter01Hero } from '../scenes/Chapter01Hero';
import { Chapter02LetterIntro } from '../scenes/Chapter02LetterIntro';
import { Chapter03LoveLines } from '../scenes/Chapter03LoveLines';
import { Chapter04FairyLights } from '../scenes/Chapter04FairyLights';
import { Chapter05Photobooth } from '../scenes/Chapter05Photobooth';
import { Chapter06OrdinaryDays } from '../scenes/Chapter06OrdinaryDays';
import { Chapter07BirthdayCake } from '../scenes/Chapter07BirthdayCake';
import { Chapter08LoveLetter } from '../scenes/Chapter08LoveLetter';
import { Chapter09MagazineInvite } from '../scenes/Chapter09MagazineInvite';
import { Chapter10Finale } from '../scenes/Chapter10Finale';
import { AudioToggle } from '../components/AudioToggle';

// Dynamic code-split lazy import of Magazine - zero bundle cost on initial page load!
const MagazineEntry = lazy(() => import('../magazine/MagazineEntry'));

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isMagazineOpen, setIsMagazineOpen] = useState<boolean>(false);
  const savedScrollOffset = useRef<number>(0);
  const triggerButtonRef = useRef<HTMLElement | null>(null);

  // Check URL hash for direct deep-link to magazine (#magazine)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#magazine' || window.location.hash === '#/magazine') {
        setIsMagazineOpen(true);
      } else {
        setIsMagazineOpen(false);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Open Magazine Handler
  const handleOpenMagazine = () => {
    savedScrollOffset.current = window.scrollY;
    triggerButtonRef.current = document.activeElement as HTMLElement;
    setIsMagazineOpen(true);
    window.location.hash = 'magazine';
  };

  // Close Magazine Handler & Restore Scroll
  const handleCloseMagazine = () => {
    setIsMagazineOpen(false);
    if (window.location.hash === '#magazine' || window.location.hash === '#/magazine') {
      history.pushState(null, '', window.location.pathname);
    }
    // Restore scroll position precisely
    setTimeout(() => {
      window.scrollTo({
        top: savedScrollOffset.current,
        behavior: 'instant'
      });
      triggerButtonRef.current?.focus();
    }, 50);
  };

  // Scroll to scene helpers
  const scrollToChapter = (chapterId: string) => {
    const el = document.getElementById(chapterId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Subtle Film Grain Texture */}
      <div className="film-grain" />

      {/* Floating Audio Controller */}
      <div
        style={{
          position: 'fixed',
          bottom: 'clamp(1rem, 2.5vw, 2rem)',
          right: 'clamp(1rem, 2.5vw, 2rem)',
          zIndex: 900
        }}
      >
        <AudioToggle />
      </div>

      {/* Chapter 00: Initial Soft Invitation Screen */}
      {!hasEntered && (
        <Chapter00Invitation
          onEnter={() => {
            setHasEntered(true);
            setTimeout(() => scrollToChapter('chapter-01'), 50);
          }}
        />
      )}

      {/* Main Birthday Story Experience */}
      {hasEntered && (
        <main id="main-birthday-story" style={{ position: 'relative' }}>
          {/* Chapter 01: Hero */}
          <Chapter01Hero onNext={() => scrollToChapter('chapter-02')} />

          {/* Chapter 02: A Letter Begins */}
          <Chapter02LetterIntro onNext={() => scrollToChapter('chapter-03')} />

          {/* Chapter 03: Love Lines */}
          <Chapter03LoveLines />

          {/* Chapter 04: Signature Fairy Lights Memory Wall */}
          <Chapter04FairyLights />

          {/* Chapter 05: Our Little Photobooth Strip */}
          <Chapter05Photobooth />

          {/* Chapter 06: Ordinary Days */}
          <Chapter06OrdinaryDays />

          {/* Chapter 07: Interactive Birthday Cake Ritual */}
          <Chapter07BirthdayCake onContinue={() => scrollToChapter('chapter-08')} />

          {/* Chapter 08: Full Love Letter */}
          <Chapter08LoveLetter />

          {/* Chapter 09: Magazine Invitation */}
          <Chapter09MagazineInvite
            onOpenMagazine={handleOpenMagazine}
            onSkip={() => scrollToChapter('chapter-10')}
          />

          {/* Chapter 10: Finale */}
          <Chapter10Finale
            onRereadLetter={() => scrollToChapter('chapter-08')}
            onOpenMagazine={handleOpenMagazine}
            onRestart={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      )}

      {/* Lazy Loaded Luxury Magazine Overlay */}
      {isMagazineOpen && (
        <Suspense
          fallback={
            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                backgroundColor: '#0F0D10',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gold)',
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-lg)'
              }}
            >
              Opening your keepsake magazine...
            </div>
          }
        >
          <MagazineEntry onClose={handleCloseMagazine} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
