// DeleteModal — Jnjelu Hashtvarel Modal (Delete Confirmation Modal)
import Modal from './Modal';
import { Trash2, AlertTriangle } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, title, description, onConfirm, isLoading }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Հաստատել Ջնջումը" icon={<Trash2 size={20} />}>
      <div className="jnjelu-modal-barek">
        <div className="jnjelu-modal-nshani"><AlertTriangle size={32} color="#f59e0b" /></div>
        <div className="jnjelu-modal-anagir">{title || 'Վստա՞հ եք, որ ուզում եք ջնջել'}</div>
        <div className="jnjelu-modal-nkaragrutyun">
          {description || 'Այս գործողությունը անդառնալի է: Տվյալները լրիվ կկորչեն:'}
        </div>
      </div>

      <div className="modal-kolutyun">
        <button
          className="kochumn-knop khnamelu-knop"
          onClick={onClose}
          disabled={isLoading}
          id="delete-modal-veradardal"
        >
          Վերադառնալ
        </button>
        <button
          className="kochumn-knop jnjelu-knop"
          onClick={onConfirm}
          disabled={isLoading}
          id="delete-modal-hashtvarel"
        >
          {isLoading ? (
            <><span className="barcracum-shrjanag" style={{ width: 16, height: 16, borderWidth: 2 }} /> Ջնջվում է...</>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Trash2 size={16} /> Ջնջել</span>
          )}
        </button>
      </div>
    </Modal>
  );
}
