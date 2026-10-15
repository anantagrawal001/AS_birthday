import React, { Suspense } from 'react';
import { MagazineReader } from './MagazineReader';

interface MagazineEntryProps {
  onClose: () => void;
}

export const MagazineEntry: React.FC<MagazineEntryProps> = ({ onClose }) => {
  return (
    <Suspense
      fallback={
        <div
          role="dialog"
          aria-label="Loading magazine"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: '#0F0D10',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ivory)',
            gap: '1.25rem'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid rgba(212, 175, 142, 0.2)',
              borderTopColor: 'var(--gold)',
              animation: 'spin 0.8s linear infinite'
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-base)',
              color: 'var(--gold)',
              letterSpacing: '0.05em'
            }}
          >
            Opening your keepsake magazine...
          </p>
        </div>
      }
    >
      <MagazineReader onClose={onClose} />
    </Suspense>
  );
};

export default MagazineEntry;
