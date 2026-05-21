// Modal — Ունiversal Modal Barchratsol (Universal Modal Wrapper)
import { useEffect } from 'react';

export default function Modal({ batsKa, vercnel, anagir, nshani, children, lajox = false }) {
  // Ստeghnel ESC-ov modal-y vercnel (Close on ESC)
  useEffect(() => {
    const kochakutyun = (iraradzaynutyun) => {
      if (iraradzaynutyun.key === 'Escape') vercnel();
    };
    if (batsKa) {
      document.addEventListener('keydown', kochakutyun);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', kochakutyun);
      document.body.style.overflow = '';
    };
  }, [batsKa, vercnel]);

  if (!batsKa) return null;

  // Shat lajox modal-ner (Wide modals)
  const lajoxMejberd = lajox ? { maxWidth: '720px' } : {};

  return (
    <div className="modal-arka" onClick={(e) => e.target === e.currentTarget && vercnel()} role="dialog" aria-modal="true">
      <div className="modal-barek" style={lajoxMejberd}>
        {/* Vernagrutyun (Header) */}
        <div className="modal-vercnagrutyun">
          <div className="modal-anagir">
            {nshani && <span>{nshani}</span>}
            {anagir}
          </div>
          <button className="modal-muten-knop" onClick={vercnel} aria-label="Փակել" id="modal-muten-knop">
            ✕
          </button>
        </div>
        {/* Marmin (Body) */}
        <div className="modal-marmni">
          {children}
        </div>
      </div>
    </div>
  );
}
