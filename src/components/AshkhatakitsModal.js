// AshkhatakitsModal — Ashkhatakitsi Ստեղծել/Խմբագրել Modal
import { useState, useEffect } from 'react';
import { Pencil, Briefcase, Eye, Loader2, AlertTriangle } from 'lucide-react';
import Modal from './Modal';

const datarkNakhnayin = {
  anun: '',
  azganun: '',
  bakhum: '',
  pashton: '',
  elektronerayin_hasce: '',
  herakhosahamer: '',
  aktiv: true,
};

export default function AshkhatakitsModal({ isOpen, onClose, xmbagrvogAshkhatakits, onSubmit, isViewMode = false }) {
  const [formData, setFormData] = useState(datarkNakhnayin);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isEditMode = !!xmbagrvogAshkhatakits && !isViewMode;

  useEffect(() => {
    if (xmbagrvogAshkhatakits) {
      setFormData({
        anun: xmbagrvogAshkhatakits.anun || '',
        azganun: xmbagrvogAshkhatakits.azganun || '',
        elektronerayin_hasce: xmbagrvogAshkhatakits.elektronerayin_hasce || '',
        herakhosahamer: xmbagrvogAshkhatakits.herakhosahamer || '',
        pashton: xmbagrvogAshkhatakits.pashton || '',
        aktiv: xmbagrvogAshkhatakits.aktiv !== undefined ? xmbagrvogAshkhatakits.aktiv : true,
      });
    } else {
      setFormData(datarkNakhnayin);
    }
    setErrors({});
  }, [xmbagrvogAshkhatakits, isOpen]);

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
    <Modal isOpen={isOpen} onClose={onClose} title={isViewMode ? 'Դիտել Աշխատակցին' : isEditMode ? 'Խմբագրել Աշխատակցին' : 'Ստեղծել Նոր Աշխատակից'} icon={isViewMode ? <Eye size={20} /> : isEditMode ? <Pencil size={20} /> : <Briefcase size={20} />}>
      <form className="dzevakert-khumb" onSubmit={handleSubmit} id="ashkhatakits-dzevakert">
        {errors.global && (
          <div style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 10, padding: '12px 16px', color: '#f43f5e', fontSize: '0.9rem' }}>
            <AlertTriangle size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> {errors.global}
          </div>
        )}

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="ash-anun">Անուն</label>
            <input id="ash-anun" className={`dzevakert-muts ${errors.anun ? 'skhalt' : ''}`} value={formData.anun} onChange={(e) => nkaragrel('anun', e.target.value)} placeholder="Օրինակ՝ Կարեն" disabled={isViewMode} />
            {errors.anun && <span className="dzevakert-skhalt">{errors.anun}</span>}
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="ash-azganun">Ազգանուն</label>
            <input id="ash-azganun" className={`dzevakert-muts ${errors.azganun ? 'skhalt' : ''}`} value={formData.azganun} onChange={(e) => nkaragrel('azganun', e.target.value)} placeholder="Օրինակ՝ Մկրտչյան" disabled={isViewMode} />
            {errors.azganun && <span className="dzevakert-skhalt">{errors.azganun}</span>}
          </div>
        </div>
        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir pahanjvats" htmlFor="ash-email">Էլ. Փոստ</label>
          <input id="ash-email" type="email" className={`dzevakert-muts ${errors.elektronerayin_hasce ? 'skhalt' : ''}`} value={formData.elektronerayin_hasce} onChange={(e) => nkaragrel('elektronerayin_hasce', e.target.value)} placeholder="karen@company.am" disabled={isViewMode} />
          {errors.elektronerayin_hasce && <span className="dzevakert-skhalt">{errors.elektronerayin_hasce}</span>}
        </div>
        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ash-herakhos">Հեռախոսահամար</label>
            <input id="ash-herakhos" className="dzevakert-muts" value={formData.herakhosahamer} onChange={(e) => nkaragrel('herakhosahamer', e.target.value)} placeholder="+374 00 000000" disabled={isViewMode} />
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ash-pashton">Պաշտոն / Բաժին</label>
            <input id="ash-pashton" className="dzevakert-muts" value={formData.pashton} onChange={(e) => nkaragrel('pashton', e.target.value)} placeholder="Օրինակ՝ ՏՏ Բաժնի Ղեկավար" disabled={isViewMode} />
          </div>
        </div>
        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir" htmlFor="ash-aktiv">Կարգավիճակ</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: isViewMode ? 'default' : 'pointer' }}>
              <input type="radio" name="ash-aktiv" value="true" checked={formData.aktiv === true} onChange={() => nkaragrel('aktiv', true)} disabled={isViewMode} />
              <span style={{ color: '#f0f0ff' }}>Ակտիվ (աշխատում է)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: isViewMode ? 'default' : 'pointer' }}>
              <input type="radio" name="ash-aktiv" value="false" checked={formData.aktiv === false} onChange={() => nkaragrel('aktiv', false)} disabled={isViewMode} />
              <span style={{ color: '#94a3b8' }}>Ոչ ակտիվ (ազատված/արձակուրդ)</span>
            </label>
          </div>
        </div>

        <div className="modal-kolutyun" style={{ padding: '20px 0 0' }}>
          <button type="button" className="kochumn-knop khnamelu-knop" onClick={onClose} disabled={isLoading} id="ash-modal-veradardal">{isViewMode ? 'Փակել' : 'Վերադառնալ'}</button>
          {!isViewMode && (
            <button type="submit" className="kochumn-knop hsnakan-knop" disabled={isLoading} id="ash-modal-pahanel">
              {isLoading ? <><Loader2 className="animate-spin" size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Պահպանվում է...</> : isEditMode ? <><Pencil size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Պահպանել</> : <><Briefcase size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} /> Ստեղծել</>}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}
