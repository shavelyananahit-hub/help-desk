// DeleteModal — Jnjelu Hashtvarel Modal (Delete Confirmation Modal)
import Modal from './Modal';

export default function DeleteModal({ batsKa, vercnel, anagir, nkaragrutyun, hashtvarel, barcracumKa }) {
  return (
    <Modal batsKa={batsKa} vercnel={vercnel} anagir="Hashtvarel Jnjumы" nshani="🗑️">
      <div className="jnjelu-modal-barek">
        <div className="jnjelu-modal-nshani">⚠️</div>
        <div className="jnjelu-modal-anagir">{anagir || 'Vstahe՞q, vor uccum eq jnjel'}</div>
        <div className="jnjelu-modal-nkaragrutyun">
          {nkaragrutyun || 'Ayd gortsolutyuny vervakan chи karoq linel: Am tvalyalnery lriv kkorcven:'}
        </div>
      </div>

      <div className="modal-kolutyun">
        <button
          className="kochumn-knop khnamelu-knop"
          onClick={vercnel}
          disabled={barcracumKa}
          id="delete-modal-veradardal"
        >
          Veradardal
        </button>
        <button
          className="kochumn-knop jnjelu-knop"
          onClick={hashtvarel}
          disabled={barcracumKa}
          id="delete-modal-hashtvarel"
        >
          {barcracumKa ? (
            <><span className="barcracum-shrjanag" style={{ width: 16, height: 16, borderWidth: 2 }} /> Jnjvum e...</>
          ) : (
            <><span>🗑️</span> Jnjel</>
          )}
        </button>
      </div>
    </Modal>
  );
}
