// TiketModal — Tiketi Ստեղծել/Խմբագրել Modal
import { useState, useEffect } from 'react';
import { Pencil, Ticket, Eye, Loader2, AlertTriangle } from 'lucide-react';
import Modal from './Modal';

const datarkNakhnayin = {
  vernagir: '',
  nkaragrutyun: '',
  kargnish: 'Միջին',
  kargavichak: 'Բաց',
  kategoria: '',
  steghtsoghogtater_id: '',
  handnvatsAshkhatakits_id: '',
};

const KARGAVICHAK_ENTHRUTYUNNER = ['Բաց', 'Ընթացիկ', 'Փակված'];
const KARGNISH_ENTHRUTYUNNER = ['Ցածր', 'Միջին', 'Բարձր'];

export default function TiketModal({ isOpen, onClose, xmbagrvogTiket, pahanel, ogtaterneр = [], ashkhatakitsner = [], isViewMode = false }) {
  const [formData, setFormData] = useState(datarkNakhnayin);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isEditMode = !!xmbagrvogTiket && !isViewMode;

  useEffect(() => {
    if (xmbagrvogTiket) {
      setFormData({
        vernagir: xmbagrvogTiket.vernagir || '',
        nkaragrutyun: xmbagrvogTiket.nkaragrutyun || '',
        kargavichak: xmbagrvogTiket.kargavichak || 'Բաց',
        kargnish: xmbagrvogTiket.kargnish || 'Միջին',
        kategoria: xmbagrvogTiket.kategoria || '',
        steghtsoghogtater_id: xmbagrvogTiket.steghtsoghogtater_id || '',
        handnvatsAshkhatakits_id: xmbagrvogTiket.handnvatsAshkhatakits_id || '',
      });
    } else {
      setFormData(datarkNakhnayin);
    }
    setErrors({});
  }, [xmbagrvogTiket, isOpen]);

  const nkaragrel = (anun, arjanekh) => {
    setFormData(prev => ({ ...prev, [anun]: arjanekh }));
    if (errors[anun]) setErrors(prev => ({ ...prev, [anun]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewMode) return;
    
    let norSkhalter = {};
    if (!formData.vernagir.trim()) norSkhalter.vernagir = 'Վերնագիրը պարտադիր է';
    if (!formData.kategoria.trim()) norSkhalter.kategoria = 'Կատեգորիան պարտադիր է';
    if (!formData.steghtsoghogtater_id) norSkhalter.steghtsoghogtater_id = 'Օգտատերը պարտադիր է';

    if (Object.keys(norSkhalter).length > 0) {
      setErrors(norSkhalter);
      return;
    }

    setIsLoading(true);
    try {
      await pahanel(formData);
      onClose();
    } catch (սխալ) {
      setErrors({ global: սխալ.message || 'Սխալ տեղի ունեցավ' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isViewMode ? 'Դիտել Տոմսը' : isEditMode ? 'Խմբագրել Տոմսը' : 'Ստեղծել Նոր Տոմս'} icon={isViewMode ? <Eye size={20} /> : isEditMode ? <Pencil size={20} /> : <Ticket size={20} />} isWide>
      <form className="dzevakert-khumb" onSubmit={handleSubmit} id="tiket-dzevakert">
        {errors.global && (
          <div style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 10, padding: '12px 16px', color: '#f43f5e', fontSize: '0.9rem' }}>
            <AlertTriangle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> {errors.global}
          </div>
        )}
        <div className="dzevakert-shor">
          <div className="dzevakert-dasht" style={{ flex: 2 }}>
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="tiket-vernagir">Վերնագիր</label>
            <input id="tiket-vernagir" className={`dzevakert-muts ${errors.vernagir ? 'skhalt' : ''}`} value={formData.vernagir} onChange={(e) => nkaragrel('vernagir', e.target.value)} placeholder="Խնդրի հակիրճ նկարագրություն..." disabled={isViewMode} />
            {errors.vernagir && <span className="dzevakert-skhalt">{errors.vernagir}</span>}
          </div>
          <div className="dzevakert-dasht" style={{ flex: 1 }}>
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="tiket-kategoria">Կատեգորիա</label>
            <input id="tiket-kategoria" className={`dzevakert-muts ${errors.kategoria ? 'skhalt' : ''}`} value={formData.kategoria} onChange={(e) => nkaragrel('kategoria', e.target.value)} placeholder="Օրինակ՝ Սարքավորում" disabled={isViewMode} />
            {errors.kategoria && <span className="dzevakert-skhalt">{errors.kategoria}</span>}
          </div>
        </div>

        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir" htmlFor="tiket-nkaragrutyun">Մանրամասն Նկարագրություն</label>
          <textarea id="tiket-nkaragrutyun" className="dzevakert-muts" value={formData.nkaragrutyun} onChange={(e) => nkaragrel('nkaragrutyun', e.target.value)} placeholder="Նկարագրեք խնդիրը մանրամասնորեն..." rows={4} disabled={isViewMode} />
        </div>

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="tiket-kargavichak">Կարգավիճակ</label>
            <select id="tiket-kargavichak" className="dzevakert-mintchev" value={formData.kargavichak} onChange={(e) => nkaragrel('kargavichak', e.target.value)} disabled={isViewMode}>
              {KARGAVICHAK_ENTHRUTYUNNER.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="tiket-kargnish">Առաջնահերթություն</label>
            <select id="tiket-kargnish" className="dzevakert-mintchev" value={formData.kargnish} onChange={(e) => nkaragrel('kargnish', e.target.value)} disabled={isViewMode}>
              {KARGNISH_ENTHRUTYUNNER.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        </div>

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="tiket-ogtater">Հայտատու (Օգտատեր)</label>
            <select id="tiket-ogtater" className={`dzevakert-mintchev ${errors.steghtsoghogtater_id ? 'skhalt' : ''}`} value={formData.steghtsoghogtater_id || ''} onChange={(e) => nkaragrel('steghtsoghogtater_id', e.target.value ? parseInt(e.target.value) : '')} disabled={isViewMode}>
              <option value="">-- Ընտրել Օգտատեր --</option>
              {ogtaterneр.map(o => <option key={o.id} value={o.id}>{o.anun} {o.azganun} ({o.elektronerayin_hasce})</option>)}
            </select>
            {errors.steghtsoghogtater_id && <span className="dzevakert-skhalt">{errors.steghtsoghogtater_id}</span>}
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="tiket-ashkhatakits">Պատասխանատու Աշխատակից</label>
            <select id="tiket-ashkhatakits" className="dzevakert-mintchev" value={formData.handnvatsAshkhatakits_id || ''} onChange={(e) => nkaragrel('handnvatsAshkhatakits_id', e.target.value ? parseInt(e.target.value) : null)} disabled={isViewMode}>
              <option value="">-- Չհանձնված --</option>
              {ashkhatakitsner.map(a => <option key={a.id} value={a.id}>{a.anun} {a.azganun} ({a.pashton})</option>)}
            </select>
          </div>
        </div>

        <div className="modal-kolutyun" style={{ padding: '20px 0 0' }}>
          <button type="button" className="kochumn-knop khnamelu-knop" onClick={onClose} disabled={isLoading} id="tiket-modal-veradardal">{isViewMode ? 'Փակել' : 'Վերադառնալ'}</button>
          {!isViewMode && (
            <button type="submit" className="kochumn-knop hsnakan-knop" disabled={isLoading} id="tiket-modal-pahanel">
              {isLoading ? <><Loader2 className="animate-spin" size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Պահպանվում է...</> : isEditMode ? <><Pencil size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Պահպանել</> : <><Ticket size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Ստեղծել</>}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
