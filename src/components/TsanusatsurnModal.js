// TsanusatsurnModal — Tsanusatsurni Ստեղծել/Խմբագրել Modal
import { useState, useEffect } from 'react';
import { Pencil, Bell, Eye, Loader2, AlertTriangle, Info, XCircle, CheckCircle2 } from 'lucide-react';
import Modal from './Modal';

const datarkNakhnayin = {
  haghordagutyun: '',
  tesak: 'Տեղեկություն',
  kardatsvatsd: false,
  ogtater_id: '',
  tiket_id: '',
};


export default function TsanusatsurnModal({ isOpen, onClose, xmbagrvogTsanusatsurn, onSubmit, ogtaterneр = [], tiketer = [], isViewMode = false }) {
  const [formData, setFormData] = useState(datarkNakhnayin);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isEditMode = !!xmbagrvogTsanusatsurn && !isViewMode;

  useEffect(() => {
    if (xmbagrvogTsanusatsurn) {
      setFormData({
        haghordagutyun: xmbagrvogTsanusatsurn.haghordagutyun || '',
        tesak: xmbagrvogTsanusatsurn.tesak || 'Տեղեկություն',
        kardatsvatsd: !!xmbagrvogTsanusatsurn.kardatsvatsd,
        ogtater_id: xmbagrvogTsanusatsurn.ogtater_id || '',
        tiket_id: xmbagrvogTsanusatsurn.tiket_id || '',
      });
    } else {
      setFormData(datarkNakhnayin);
    }
    setErrors({});
  }, [xmbagrvogTsanusatsurn, isOpen]);

  const nkaragrel = (anun, arjanekh) => {
    setFormData(prev => ({ ...prev, [anun]: arjanekh }));
    if (errors[anun]) setErrors(prev => ({ ...prev, [anun]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewMode) return;

    if (!formData.haghordagutyun.trim()) {
      setErrors({ haghordagutyun: 'Հաղորդագրությունը պարտադիր է' });
      return;
    }
    setIsLoading(true);
    try {
      await onSubmit({
        ...formData,
        ogtater_id: formData.ogtater_id || null,
        tiket_id: formData.tiket_id || null,
      });
      onClose();
    } catch (սխալ) {
      setErrors({ global: սխալ.message || 'Սխալ տեղի ունեցավ' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isViewMode ? 'Դիտել Ծանուցումը' : isEditMode ? 'Խմբագրել Ծանուցումը' : 'Ստեղծել Նոր Ծանուցում'} icon={isViewMode ? <Eye size={20} /> : isEditMode ? <Pencil size={20} /> : <Bell size={20} />}>
      <form className="dzevakert-khumb" onSubmit={handleSubmit} id="tsanusatsurn-dzevakert">
        {errors.global && (
          <div style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 10, padding: '12px 16px', color: '#f43f5e', fontSize: '0.9rem' }}>
            <AlertTriangle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> {errors.global}
          </div>
        )}

        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir pahanjvats" htmlFor="ts-haghordagutyun">Հաղորդագրություն</label>
          <textarea id="ts-haghordagutyun" className={`dzevakert-muts ${errors.haghordagutyun ? 'skhalt' : ''}`} value={formData.haghordagutyun}
            onChange={(e) => nkaragrel('haghordagutyun', e.target.value)}
            placeholder="Ծանուցման հաղորդագրությունը..." rows={3} disabled={isViewMode} />
          {errors.haghordagutyun && <span className="dzevakert-skhalt">{errors.haghordagutyun}</span>}
        </div>

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ts-tesak">Տեսակ</label>
            <select id="ts-tesak" className="dzevakert-mintchev" value={formData.tesak}
              onChange={(e) => nkaragrel('tesak', e.target.value)} disabled={isViewMode}>
              <option value="Տեղեկություն">Տեղեկություն</option>
              <option value="Զգուշացում">Զգուշացում</option>
              <option value="Սխալ">Սխալ</option>
              <option value="Հաջողություն">Հաջողություն</option>
            </select>
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ts-kardatsvatsd">Կարդացվա՞ծ է</label>
            <select id="ts-kardatsvatsd" className="dzevakert-mintchev" value={formData.kardatsvatsd ? 'true' : 'false'}
              onChange={(e) => nkaragrel('kardatsvatsd', e.target.value === 'true')} disabled={isViewMode}>
              <option value="false">Չկարդացված</option>
              <option value="true">Կարդացված</option>
            </select>
          </div>
        </div>

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ts-ogtater">Ստացող օգտատեր</label>
            <select id="ts-ogtater" className="dzevakert-mintchev" value={formData.ogtater_id || ''}
              onChange={(e) => nkaragrel('ogtater_id', e.target.value ? parseInt(e.target.value) : '')} disabled={isViewMode}>
              <option value="">— Ընտրել Օգտատեր —</option>
              {ogtaterneр.map((o) => <option key={o.id} value={o.id}>{o.anun} {o.azganun}</option>)}
            </select>
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ts-tiket">Կապված Տոմս</label>
            <select id="ts-tiket" className="dzevakert-mintchev" value={formData.tiket_id || ''}
              onChange={(e) => nkaragrel('tiket_id', e.target.value ? parseInt(e.target.value) : '')} disabled={isViewMode}>
              <option value="">— Ընտրել Տոմս —</option>
              {tiketer.map((t) => <option key={t.id} value={t.id}>#{t.id} {t.vernagir}</option>)}
            </select>
          </div>
        </div>

        <div className="modal-kolutyun" style={{ padding: '20px 0 0' }}>
          <button type="button" className="kochumn-knop khnamelu-knop" onClick={onClose} disabled={isLoading} id="ts-modal-veradardal">{isViewMode ? 'Փակել' : 'Վերադառնալ'}</button>
          {!isViewMode && (
            <button type="submit" className="kochumn-knop hsnakan-knop" disabled={isLoading} id="ts-modal-pahanel">
              {isLoading ? <><Loader2 className="animate-spin" size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Պահպանվում է...</> : isEditMode ? <><Pencil size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Պահպանել</> : <><Bell size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Ստեղծել</>}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
