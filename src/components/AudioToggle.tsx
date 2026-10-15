import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Music, Upload, X } from 'lucide-react';
import { audioService } from '../services/audioService';

interface AudioToggleProps {
  className?: string;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ className = '' }) => {
  const [muted, setMuted] = useState(audioService.getMuted());
  const [currentTrack, setCurrentTrack] = useState(audioService.getCurrentTrack());
  const [showMenu, setShowMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      audioService.loadCustomTrack(file);
      setCurrentTrack(audioService.getCurrentTrack());
      setShowMenu(false);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      {/* Mini Music Details Popover */}
      {showMenu && (
        <div
          role="dialog"
          aria-label="Bollywood Music Options"
          style={{
            position: 'absolute',
            bottom: '125%',
            right: 0,
            width: 'clamp(260px, 80vw, 320px)',
            backgroundColor: '#1E1920',
            border: '1px solid rgba(212, 175, 142, 0.35)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            zIndex: 1000
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.9rem',
                color: 'var(--gold)',
                fontWeight: 600
              }}
            >
              Romantic Background Music
            </span>
            <button
              type="button"
              onClick={() => setShowMenu(false)}
              aria-label="Close music settings"
              style={{ background: 'none', border: 'none', color: 'var(--ivory)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>

          <div
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: 'rgba(212, 175, 142, 0.08)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(212, 175, 142, 0.15)'
            }}
          >
            <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--blush)', textTransform: 'uppercase' }}>
              Current Track
            </p>
            <p
              style={{
                margin: '0.2rem 0 0 0',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--light)',
                fontWeight: 500
              }}
            >
              🎶 {currentTrack}
            </p>
          </div>

          {/* Upload Custom Bollywood MP3 */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1rem',
              backgroundColor: 'var(--burgundy)',
              color: 'var(--light)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
              border: 'none',
              transition: 'background-color 0.2s ease'
            }}
          >
            <Upload size={14} />
            <span>Choose your own song (MP3)</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Main Sound Toggle Button */}
      <button
        type="button"
        onClick={handleToggle}
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
          backgroundColor: 'rgba(21, 19, 22, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(212, 175, 142, 0.3)',
          color: 'var(--ivory)',
          fontSize: 'var(--text-xs)',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
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
            <span style={{ color: 'var(--gold)' }}>Bollywood BGM On</span>
          </>
        )}
      </button>

      {/* Track Info & Switcher Button */}
      <button
        type="button"
        onClick={() => setShowMenu((prev) => !prev)}
        aria-label="Open Bollywood music options"
        title="Change Bollywood romantic track"
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          backgroundColor: 'rgba(21, 19, 22, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(212, 175, 142, 0.3)',
          color: 'var(--gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          transition: 'all 0.2s ease'
        }}
      >
        <Music size={15} />
      </button>
    </div>
  );
};

