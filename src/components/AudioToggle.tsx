import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioService } from '../services/audioService';

interface AudioToggleProps {
  className?: string;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ className = '' }) => {
  const [muted, setMuted] = useState(audioService.getMuted());

  useEffect(() => {
    const unsub = audioService.subscribe((isMuted) => setMuted(isMuted));
    return () => {
      unsub();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.toggleMute();
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={muted ? 'Unmute music' : 'Mute music'}
      title={muted ? 'Unmute music' : 'Mute music'}
      className={`audio-toggle-btn btn-romantic-hover ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem',
        padding: '0.38rem 0.75rem',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: 'rgba(21, 19, 22, 0.85)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(212, 175, 142, 0.3)',
        color: 'var(--ivory)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.04em',
        fontWeight: 500,
        transition: 'all 0.25s ease',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
      }}
    >
      {muted ? (
        <>
          <VolumeX size={14} color="var(--blush)" />
          <span style={{ opacity: 0.85 }}>Muted</span>
        </>
      ) : (
        <>
          <Volume2 size={14} color="var(--gold)" />
          <span style={{ color: 'var(--gold)' }}>Music</span>
        </>
      )}
    </button>
  );
};
