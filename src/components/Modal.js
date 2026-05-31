// Modal — Ունiversal Modal Barchratsol (Universal Modal Wrapper)
import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, icon, children, isWide = false }) {
  // Ստeghnel ESC-ov modal-y vercnel (Close on ESC)
  useEffect(() => {
    const kochakutyun = (iraradzaynutyun) => {
      if (iraradzaynutyun.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', kochakutyun);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', kochakutyun);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Shat lajox modal-ner (Wide modals)
  const lajoxMejberd = isWide ? { maxWidth: '720px' } : {};

  return (
    <div className="modal-arka" onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true">
      <div className="modal-barek" style={lajoxMejberd}>
        {/* Vernagrutyun (Header) */}
        <div className="modal-vercnagrutyun">
          <div className="modal-anagir">
            {icon && <span>{icon}</span>}
            {title}
          </div>
          <button className="modal-muten-knop" onClick={onClose} aria-label="Փակել" id="modal-muten-knop">
            <X size={20} />
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
