import React, { useState, useEffect, useRef } from 'react';
import { BIRTHDAY } from '../content/config';
import { audioService } from '../services/audioService';
import { hapticsService } from '../services/hapticsService';
import { microphoneService, MicBlowState } from '../services/microphoneService';
import { Wind, Mic, RotateCcw, ArrowDown } from 'lucide-react';

type CakeState =
  | 'UNLIT_INTRO'
  | 'LIT_READY'
  | 'BLOWING'
  | 'EXTINGUISHING'
  | 'REVEAL'
  | 'COMPLETE';

interface Chapter07Props {
  onContinue: () => void;
}

export const Chapter07BirthdayCake: React.FC<Chapter07Props> = ({ onContinue }) => {
  const [cakeState, setCakeState] = useState<CakeState>('UNLIT_INTRO');
  const [micState, setMicState] = useState<MicBlowState>({
    listening: false,
    permissionDenied: false,
    unsupported: false,
    confidence: 0
  });
  const [micNotice, setMicNotice] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Transition from UNLIT_INTRO to LIT_READY shortly after entering
  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setCakeState('LIT_READY');
    }, 1200);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      microphoneService.stopListening();
    };
  }, []);

  // Universal TAP/CLICK blow action
  const handleBlowTap = () => {
    if (cakeState !== 'LIT_READY') return;
    executeBlowSequence();
  };

  // Execute extinguishing sequence with audio, haptics, and smoke
  const executeBlowSequence = () => {
    microphoneService.stopListening();
    setCakeState('BLOWING');
    audioService.duckMusic(true);
    audioService.playCandleBlow();
    hapticsService.light();

    // After brief breath gust, extinguish flames
    setTimeout(() => {
      setCakeState('EXTINGUISHING');
      audioService.playCandleExtinguish();
      hapticsService.success();

      // Soft reveal after 1.2s
      setTimeout(() => {
        setCakeState('REVEAL');
        audioService.duckMusic(false);

        setTimeout(() => {
          setCakeState('COMPLETE');
        }, 1000);
      }, 1200);
    }, 600);
  };

  // Microphone route (visible by default)
  const handleToggleMic = async () => {
    if (!microphoneService.isSupported()) {
      hapticsService.light();
      setMicNotice(
        typeof window !== 'undefined' && !window.isSecureContext
          ? 'Microphone requires HTTPS on mobile. Blowing candles for you now!'
          : 'Microphone is not supported in this browser. Blowing candles now!'
      );
      setTimeout(() => {
        executeBlowSequence();
      }, 700);
      return;
    }

    if (micState.listening) {
      microphoneService.stopListening();
      setMicState((prev) => ({ ...prev, listening: false }));
      return;
    }

    setMicNotice(null);
    const started = await microphoneService.startListening(
      () => {
        executeBlowSequence();
      },
      (state) => {
        setMicState(state);
      }
    );

    if (!started) {
      // Microphone unsupported or denied, fallback safely
    }
  };

  // Relight candles
  const handleRelight = () => {
    hapticsService.light();
    setCakeState('LIT_READY');
    setMicNotice(null);
    setMicState({
      listening: false,
      permissionDenied: false,
      unsupported: false,
      confidence: 0
    });
  };

  const isFlamesLit = cakeState === 'LIT_READY' || cakeState === 'BLOWING';
  const isBlowingGust = cakeState === 'BLOWING';
  const isExtinguished =
    cakeState === 'EXTINGUISHING' || cakeState === 'REVEAL' || cakeState === 'COMPLETE';

  return (
    <section
      id="chapter-07"
      aria-label="Birthday cake and candle ritual"
      style={{
        backgroundColor: '#100E12',
        color: 'var(--ivory)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 6vw, 6rem) clamp(1.25rem, 4vw, 3rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Candlelit Room Atmosphere */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: isFlamesLit
            ? 'radial-gradient(ellipse at 50% 55%, rgba(212, 175, 142, 0.22) 0%, rgba(139, 71, 87, 0.08) 45%, #100E12 80%)'
            : 'radial-gradient(ellipse at 50% 55%, rgba(212, 175, 142, 0.05) 0%, #100E12 75%)',
          transition: 'background 1.2s ease',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '680px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center'
        }}
      >
        {/* Step-by-step Story Instructions */}
        <div style={{ minHeight: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {cakeState === 'UNLIT_INTRO' && (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                color: 'var(--blush)',
                fontStyle: 'italic',
                animation: 'fadeIn 0.6s ease'
              }}
            >
              {BIRTHDAY.story.ch07.introText}
            </p>
          )}

          {cakeState === 'LIT_READY' && (
            <div style={{ animation: 'fadeIn 0.8s ease' }}>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-sm)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  display: 'block',
                  marginBottom: '0.25rem'
                }}
              >
                Birthday Ritual
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-2xl)',
                  color: 'var(--light)',
                  margin: 0
                }}
              >
                {BIRTHDAY.story.ch07.promptText}
              </h2>
            </div>
          )}

          {cakeState === 'BLOWING' && (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-xl)',
                color: 'var(--gold)',
                fontStyle: 'italic'
              }}
            >
              Making your wish...
            </p>
          )}

          {(cakeState === 'REVEAL' || cakeState === 'COMPLETE') && (
            <div style={{ animation: 'fadeIn 1s ease' }}>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-2xl)',
                  color: 'var(--gold)',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  margin: 0
                }}
              >
                "{BIRTHDAY.story.ch07.revealText}"
              </p>
            </div>
          )}
        </div>

        {/* Tangible Crafted Birthday Cake Graphic */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(280px, 65vw, 420px)',
            height: 'clamp(260px, 50vw, 340px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Tabletop Shadow & Warm Plate Trim */}
          <div
            style={{
              position: 'absolute',
              bottom: '15px',
              width: '85%',
              height: '35px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.65)',
              filter: 'blur(8px)',
              zIndex: 1
            }}
          />

          <svg
            viewBox="0 0 400 320"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
              zIndex: 2
            }}
          >
            <defs>
              {/* Cake Fondant Frosting Gradient */}
              <linearGradient id="frostingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E8DFD5" />
                <stop offset="50%" stopColor="#FFF9F2" />
                <stop offset="100%" stopColor="#DFD6CB" />
              </linearGradient>

              {/* Burgundy Glaze Drip Gradient */}
              <linearGradient id="glazeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8B4757" />
                <stop offset="100%" stopColor="#5E2B37" />
              </linearGradient>

              {/* Gold Plate Gradient */}
              <linearGradient id="goldPlateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A88B70" />
                <stop offset="50%" stopColor="#F3E5D5" />
                <stop offset="100%" stopColor="#9C7F64" />
              </linearGradient>

              {/* Candle Wax Gradient */}
              <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C4A69D" />
                <stop offset="50%" stopColor="#F5EFE7" />
                <stop offset="100%" stopColor="#A3857C" />
              </linearGradient>

              {/* Flame Gradient */}
              <radialGradient id="flameGrad" cx="50%" cy="80%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FFF59D" />
                <stop offset="60%" stopColor="#FFA726" />
                <stop offset="100%" stopColor="rgba(239, 83, 80, 0)" />
              </radialGradient>
            </defs>

            {/* Stand / Plate */}
            <ellipse cx="200" cy="275" rx="170" ry="25" fill="url(#goldPlateGrad)" />
            <ellipse cx="200" cy="272" rx="160" ry="20" fill="#2B2625" />

            {/* Bottom Tier Cake */}
            <path
              d="M 65,210 C 65,245 335,245 335,210 L 335,255 C 335,285 65,285 65,255 Z"
              fill="url(#frostingGrad)"
            />
            <ellipse cx="200" cy="210" rx="135" ry="22" fill="#FBF5ED" />

            {/* Bottom Tier Burgundy Dripping Glaze */}
            <path
              d="M 65,210 C 100,225 120,238 140,218 C 160,240 190,242 210,215 C 230,235 260,240 280,218 C 300,235 320,225 335,210 C 335,214 65,214 65,210 Z"
              fill="url(#glazeGrad)"
            />

            {/* Top Tier Cake */}
            <path
              d="M 105,150 C 105,180 295,180 295,150 L 295,190 C 295,215 105,215 105,190 Z"
              fill="url(#frostingGrad)"
            />
            <ellipse cx="200" cy="150" rx="95" ry="18" fill="#FFFBF5" />

            {/* Top Tier Burgundy Glaze */}
            <path
              d="M 105,150 C 130,165 150,172 170,155 C 190,170 215,172 235,154 C 255,168 280,165 295,150 C 295,154 105,154 105,150 Z"
              fill="url(#glazeGrad)"
            />

            {/* 3 Birthday Taper Candles */}
            {[
              { x: 165, y: 105, h: 45, tilt: -1.5 },
              { x: 200, y: 95, h: 55, tilt: 0 },
              { x: 235, y: 105, h: 45, tilt: 1.5 }
            ].map((candle, idx) => (
              <g key={idx}>
                {/* Candle body */}
                <rect
                  x={candle.x - 4}
                  y={candle.y}
                  width="8"
                  height={candle.h}
                  fill="url(#candleGrad)"
                  rx="1"
                  transform={`rotate(${candle.tilt} ${candle.x} ${candle.y + candle.h})`}
                />
                {/* Wick */}
                <line
                  x1={candle.x}
                  y1={candle.y}
                  x2={candle.x}
                  y2={candle.y - 7}
                  stroke="#3E2723"
                  strokeWidth="1.5"
                />

                {/* Physically Flickering Flame if lit */}
                {isFlamesLit && (
                  <g
                    style={{
                      transformOrigin: `${candle.x}px ${candle.y - 7}px`,
                      transform: isBlowingGust ? 'rotate(35deg) scaleX(0.7)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    {/* Flame Halo */}
                    <circle
                      cx={candle.x}
                      cy={candle.y - 18}
                      r="16"
                      fill="rgba(255, 179, 0, 0.25)"
                      filter="blur(4px)"
                    />
                    {/* Main Flame teardrop */}
                    <path
                      d={`M ${candle.x},${candle.y - 30} C ${candle.x + 8},${candle.y - 20} ${candle.x + 7},${candle.y - 8} ${candle.x},${candle.y - 7} C ${candle.x - 7},${candle.y - 8} ${candle.x - 8},${candle.y - 20} ${candle.x},${candle.y - 30} Z`}
                      fill="url(#flameGrad)"
                      style={{
                        animation: `flameFlicker ${1.8 + idx * 0.4}s ease-in-out infinite alternate`
                      }}
                    />
                  </g>
                )}

                {/* Delicate Rising Smoke Curls when extinguished */}
                {isExtinguished && (
                  <path
                    d={`M ${candle.x},${candle.y - 7} Q ${candle.x - 10},${candle.y - 25} ${candle.x + 8},${candle.y - 45} T ${candle.x - 4},${candle.y - 70}`}
                    fill="none"
                    stroke="rgba(245, 239, 231, 0.45)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    style={{
                      animation: 'smokeRise 1.8s ease-out forwards',
                      filter: 'blur(1px)'
                    }}
                  />
                )}
              </g>
            ))}

            {/* Edible Wafer Rose Petals on Cake Top */}
            <circle cx="140" cy="154" r="5" fill="#8B4757" opacity="0.85" />
            <circle cx="260" cy="154" r="5" fill="#8B4757" opacity="0.85" />
            <circle cx="190" cy="158" r="4" fill="#D4AF8E" opacity="0.9" />
            <circle cx="210" cy="158" r="4" fill="#D4AF8E" opacity="0.9" />
          </svg>
        </div>

        {/* Interactive Controls Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '380px' }}>
          {cakeState === 'LIT_READY' && (
            <>
              {/* Primary Universal Blow Button */}
              <button
                type="button"
                className="btn-romantic-hover shimmer-gleam"
                onClick={handleBlowTap}
                aria-label={BIRTHDAY.story.ch07.blowTapText}
                style={{
                  width: '100%',
                  padding: '1rem 1.8rem',
                  backgroundColor: 'var(--burgundy)',
                  color: 'var(--light)',
                  borderRadius: 'var(--radius-pill)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-base)',
                  letterSpacing: '0.04em',
                  boxShadow: '0 8px 24px rgba(139, 71, 87, 0.4)',
                  border: '1px solid rgba(212, 175, 142, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                <Wind size={20} color="var(--gold)" />
                <span>{BIRTHDAY.story.ch07.blowTapText}</span>
              </button>

              {/* Microphone Blow Button (Visible by default) */}
              <div style={{ width: '100%' }}>
                <button
                  type="button"
                  onClick={handleToggleMic}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-xs)',
                    color: micState.listening ? 'var(--gold)' : 'rgba(245, 239, 231, 0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.4rem',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.4rem'
                  }}
                >
                  <Mic size={14} color={micState.listening ? 'var(--gold)' : 'currentColor'} />
                  <span>
                    {micState.listening
                      ? 'Listening for breath... (blow gently into mic)'
                      : 'Or use your microphone to blow'}
                  </span>
                </button>

                {/* Mic blow energy feedback meter */}
                {micState.listening && (
                  <div
                    style={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '2px',
                      marginTop: '0.4rem',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.round(micState.confidence * 100)}%`,
                        height: '100%',
                        backgroundColor: 'var(--gold)',
                        transition: 'width 0.08s linear'
                      }}
                    />
                  </div>
                )}

                {micNotice && (
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--gold)', marginTop: '0.4rem' }}>
                    {micNotice}
                  </p>
                )}

                {micState.permissionDenied && (
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--blush)', marginTop: '0.4rem' }}>
                    Microphone permission was not granted. Tap above to blow!
                  </p>
                )}
              </div>
            </>
          )}

          {/* Extinguished State Controls */}
          {cakeState === 'COMPLETE' && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn-romantic-hover shimmer-gleam"
                onClick={onContinue}
                style={{
                  padding: '0.85rem 1.8rem',
                  backgroundColor: 'var(--burgundy)',
                  color: 'var(--light)',
                  borderRadius: 'var(--radius-pill)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'var(--text-sm)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(212, 175, 142, 0.3)',
                  boxShadow: '0 8px 24px rgba(139, 71, 87, 0.35)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{BIRTHDAY.story.ch07.continueText}</span>
                <ArrowDown size={16} />
              </button>

              <button
                type="button"
                className="btn-romantic-hover"
                onClick={handleRelight}
                style={{
                  padding: '0.85rem 1.4rem',
                  backgroundColor: 'rgba(21, 19, 22, 0.6)',
                  color: 'var(--blush)',
                  borderRadius: 'var(--radius-pill)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  border: '1px solid rgba(212, 175, 142, 0.2)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <RotateCcw size={14} />
                <span>{BIRTHDAY.story.ch07.relightText}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
