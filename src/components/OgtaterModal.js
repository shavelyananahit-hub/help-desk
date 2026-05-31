// OgtaterModal — Ogtateri Ստեղծել/Խմբագրել Modal (User Create/Edit Modal)
import { useState, useEffect } from 'react';
import { Pencil, User, Eye, AlertTriangle } from 'lucide-react';
import Modal from './Modal';

// Deri enthrutyunner (Role options)
const dereriEnthrutyunner = ['Ադմինիստրատոր', 'Հաճախորդ', 'Աշխատակից'];

const datarkNakhnayin = {
  anun: '',
  azganun: '',
  elektronerayin_hasce: '',
  herakhosahamer: '',
  der: 'Հաճախորդ',
  gtnayin_bard: '',
};

export default function OgtaterModal({ isOpen, onClose, xmbagrvogOgtater, onSubmit, isViewMode = false }) {
  const [formData, setFormData] = useState(datarkNakhnayin);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isEditMode = !!xmbagrvogOgtater && !isViewMode;

  useEffect(() => {
    if (xmbagrvogOgtater) {
      setFormData({
        anun: xmbagrvogOgtater.anun || '',
        azganun: xmbagrvogOgtater.azganun || '',
        elektronerayin_hasce: xmbagrvogOgtater.elektronerayin_hasce || '',
        herakhosahamer: xmbagrvogOgtater.herakhosahamer || '',
        der: xmbagrvogOgtater.der || 'Հաճախորդ',
        gtnayin_bard: '',
      });
    } else {
      setFormData(datarkNakhnayin);
    }
    setErrors({});
  }, [xmbagrvogOgtater, isOpen]);

  const nkaragrel = (anun, arjanekh) => {
    setFormData(prev => ({ ...prev, [anun]: arjanekh }));
    if (errors[anun]) setErrors(prev => ({ ...prev, [anun]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewMode) return;

    let norSkhalter = {};
    if (!formData.anun.trim()) norSkhalter.anun = 'Անունը պարտադիր է';
    if (!formData.azganun.trim()) norSkhalter.azganun = 'Ազգանունը պարտադիր է';
    if (!formData.elektronerayin_hasce.trim() || !/\S+@\S+\.\S+/.test(formData.elektronerayin_hasce)) {
      norSkhalter.elektronerayin_hasce = 'Վավեր էլ. հասցե պարտադիր է';
    }
    if (!isEditMode && !formData.gtnayin_bard) norSkhalter.gtnayin_bard = 'Գաղտնաբառը պարտադիր է';

    if (Object.keys(norSkhalter).length > 0) {
      setErrors(norSkhalter);
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (սխալ) {
      setErrors({ global: սխալ.message || 'Սխալ տեղի ունեցավ' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isViewMode ? 'Դիտել Օգտատիրոջը' : isEditMode ? 'Խմբագրել Օգտատիրոջը' : 'Ստեղծել Նոր Օգտատեր'}
      icon={isViewMode ? <Eye size={20} /> : isEditMode ? <Pencil size={20} /> : <User size={20} />}
      isWide
    >
      <form className="dzevakert-khumb" onSubmit={handleSubmit} id="ogtater-dzevakert">
        {errors.global && (
          <div style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 10, padding: '12px 16px', color: '#f43f5e', fontSize: '0.9rem' }}>
            <AlertTriangle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> {errors.global}
          </div>
        )}

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="ogtater-anun">Անուն</label>
            <input
              id="ogtater-anun"
              className={`dzevakert-muts ${errors.anun ? 'skhalt' : ''}`}
              type="text"
              value={formData.anun}
              onChange={(e) => nkaragrel('anun', e.target.value)}
              placeholder="Արամ"
              disabled={isViewMode}
            />
            {errors.anun && <span className="dzevakert-skhalt">{errors.anun}</span>}
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="ogtater-azganun">Ազգանուն</label>
            <input
              id="ogtater-azganun"
              className={`dzevakert-muts ${errors.azganun ? 'skhalt' : ''}`}
              type="text"
              value={formData.azganun}
              onChange={(e) => nkaragrel('azganun', e.target.value)}
              placeholder="Պետրոսյան"
              disabled={isViewMode}
            />
            {errors.azganun && <span className="dzevakert-skhalt">{errors.azganun}</span>}
          </div>
        </div>

        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir pahanjvats" htmlFor="ogtater-email">Էլ. Հասցե</label>
          <input
            id="ogtater-email"
            className={`dzevakert-muts ${errors.elektronerayin_hasce ? 'skhalt' : ''}`}
            type="email"
            value={formData.elektronerayin_hasce}
            onChange={(e) => nkaragrel('elektronerayin_hasce', e.target.value)}
            placeholder="aram@helpdesk.am"
            disabled={isViewMode}
          />
          {errors.elektronerayin_hasce && <span className="dzevakert-skhalt">{errors.elektronerayin_hasce}</span>}
        </div>

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ogtater-herakhosahamer">Հեռախոս</label>
            <input
              id="ogtater-herakhosahamer"
              className="dzevakert-muts"
              type="tel"
              value={formData.herakhosahamer}
              onChange={(e) => nkaragrel('herakhosahamer', e.target.value)}
              placeholder="+374 91 123456"
              disabled={isViewMode}
            />
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="ogtater-der">Դեր</label>
            <select
              id="ogtater-der"
              className="dzevakert-mintchev"
              value={formData.der}
              onChange={(e) => nkaragrel('der', e.target.value)}
              disabled={isViewMode}
            >
              {dereriEnthrutyunner.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir pahanjvats" htmlFor="ogtater-gtnayin">
            Գաղտնաբառ {isEditMode && '(թողնել դատարկ՝ չխմբագրելու համար)'}
          </label>
          <input
            id="ogtater-gtnayin"
            className={`dzevakert-muts ${errors.gtnayin_bard ? 'skhalt' : ''}`}
            type="password"
            value={formData.gtnayin_bard}
            onChange={(e) => nkaragrel('gtnayin_bard', e.target.value)}
            placeholder={isEditMode ? '••••••••' : 'Առնվազն 8 նիշ'}
            disabled={isViewMode}
          />
          {errors.gtnayin_bard && <span className="dzevakert-skhalt">{errors.gtnayin_bard}</span>}
        </div>

        <div className="modal-kolutyun" style={{ padding: '20px 0 0', marginTop: 4 }}>
          <button type="button" className="kochumn-knop khnamelu-knop" onClick={onClose} disabled={isLoading} id="ogtater-modal-veradardal">
            {isViewMode ? 'Փակել' : 'Վերադառնալ'}
          </button>
          {!isViewMode && (
            <button type="submit" className="kochumn-knop hsnakan-knop" disabled={isLoading} id="ogtater-modal-pahanel">
              {isLoading
                ? <><span className="barcracum-shrjanag" style={{ width: 16, height: 16, borderWidth: 2 }} /> Պահպանվում է...</>
                : <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>{isEditMode ? <Pencil size={16} /> : <User size={16} />} {isEditMode ? 'Պահպանել' : 'Ստեղծել'}</span>
              }
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
