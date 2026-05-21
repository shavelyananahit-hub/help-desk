// DeleteModal — Jnjelu Hashtvarel Modal (Delete Confirmation Modal)
import Modal from './Modal';

export default function DeleteModal({ batsKa, vercnel, anagir, nkaragrutyun, hashtvarel, barcracumKa }) {
  return (
    <Modal batsKa={batsKa} vercnel={vercnel} anagir="Հաստատել Ջնջումը" nshani="🗑️">
      <div className="jnjelu-modal-barek">
        <div className="jnjelu-modal-nshani">⚠️</div>
        <div className="jnjelu-modal-anagir">{anagir || 'Վստա՞հ եք, որ ուզում եք ջնջել'}</div>
        <div className="jnjelu-modal-nkaragrutyun">
          {nkaragrutyun || 'Այս գործողությունը անդառնալի է: Տվյալները լրիվ կկորչեն:'}
        </div>
      </div>

      <div className="modal-kolutyun">
        <button
          className="kochumn-knop khnamelu-knop"
          onClick={vercnel}
          disabled={barcracumKa}
          id="delete-modal-veradardal"
        >
          Վերադառնալ
        </button>
        <button
          className="kochumn-knop jnjelu-knop"
          onClick={hashtvarel}
          disabled={barcracumKa}
          id="delete-modal-hashtvarel"
        >
          {barcracumKa ? (
            <><span className="barcracum-shrjanag" style={{ width: 16, height: 16, borderWidth: 2 }} /> Ջնջվում է...</>
          ) : (
            <><span>🗑️</span> Ջնջել</>
          )}
        </button>
      </div>
    </Modal>
  );
}
