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

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.toggleMute();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={muted ? 'Unmute music and sound effects' : 'Mute music and sound effects'}
      title={muted ? 'Unmute sound' : 'Mute sound'}
      className={`audio-toggle-btn ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.6rem 0.9rem',
        borderRadius: 'var(--radius-pill)',
        backgroundColor: 'rgba(21, 19, 22, 0.75)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(212, 175, 142, 0.25)',
        color: 'var(--ivory)',
        fontSize: 'var(--text-xs)',
        transition: 'all 0.25s ease',
        cursor: 'pointer'
      }}
    >
      {muted ? (
        <>
          <VolumeX size={16} color="var(--blush)" />
          <span style={{ opacity: 0.85 }}>Music Muted</span>
        </>
      ) : (
        <>
          <Volume2 size={16} color="var(--gold)" />
          <span style={{ color: 'var(--gold)' }}>Sound On</span>
        </>
      )}
    </button>
  );
};
