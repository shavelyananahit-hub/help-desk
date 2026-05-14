// AshkhatakitsModal — Ashkhatakitsi Steghcel/Xmbagrel Modal
import { useState, useEffect } from 'react';
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

export default function AshkhatakitsModal({ batsKa, vercnel, xmbagrvogAshkhatakits, pahanel }) {
  const [dzevakertTvyalner, setDzevakertTvyalner] = useState(datarkNakhnayin);
  const [barcracumKa, setBarcracumKa] = useState(false);
  const [skhalter, setSkhalter] = useState({});
  const norsogum = !!xmbagrvogAshkhatakits;

  useEffect(() => {
    if (xmbagrvogAshkhatakits) {
      setDzevakertTvyalner({
        anun: xmbagrvogAshkhatakits.anun || '',
        azganun: xmbagrvogAshkhatakits.azganun || '',
        bakhum: xmbagrvogAshkhatakits.bakhum || '',
        pashton: xmbagrvogAshkhatakits.pashton || '',
        elektronerayin_hasce: xmbagrvogAshkhatakits.elektronerayin_hasce || '',
        herakhosahamer: xmbagrvogAshkhatakits.herakhosahamer || '',
        aktiv: xmbagrvogAshkhatakits.aktiv !== false,
      });
    } else {
      setDzevakertTvyalner(datarkNakhnayin);
    }
    setSkhalter({});
  }, [xmbagrvogAshkhatakits, batsKa]);

  const nkaragrel = (anun, arjanekh) => {
    setDzevakertTvyalner(prev => ({ ...prev, [anun]: arjanekh }));
    if (skhalter[anun]) setSkhalter(prev => ({ ...prev, [anun]: '' }));
  };

  const pahanel_submit = async (e) => {
    e.preventDefault();
    const norSkhalter = {};
    if (!dzevakertTvyalner.anun.trim()) norSkhalter.anun = 'Anunы pahanjvats e';
    if (!dzevakertTvyalner.azganun.trim()) norSkhalter.azganun = 'Azganunы pahanjvats e';
    if (!dzevakertTvyalner.elektronerayin_hasce.trim()) norSkhalter.elektronerayin_hasce = 'El. hascen pahanjvats e';
    if (Object.keys(norSkhalter).length > 0) { setSkhalter(norSkhalter); return; }

    setBarcracumKa(true);
    try {
      await pahanel(dzevakertTvyalner);
      vercnel();
    } catch (skhalt) {
      setSkhalter({ global: skhalt.message || 'Skhalt tegi unesal' });
    } finally {
      setBarcracumKa(false);
    }
  };

  return (
    <Modal batsKa={batsKa} vercnel={vercnel} anagir={norsogum ? 'Ashkhatakits Xmbagrel' : 'Nor Ashkhatakits Steghcel'} nshani={norsogum ? '✏️' : '👨‍💼'}>
      <form className="dzevakert-khumb" onSubmit={pahanel_submit} id="ashkhatakits-dzevakert">
        {skhalter.global && (
          <div style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 10, padding: '12px 16px', color: '#f43f5e', fontSize: '0.9rem' }}>
            ⚠️ {skhalter.global}
          </div>
        )}

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="ash-anun">Anun</label>
            <input id="ash-anun" className="dzevakert-muts" value={dzevakertTvyalner.anun}
              onChange={(e) => nkaragrel('anun', e.target.value)} placeholder="Karen" />
            {skhalter.anun && <span className="dzevakert-skhalt">{skhalter.anun}</span>}
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="ash-azganun">Azganun</label>
            <input id="ash-azganun" className="dzevakert-muts" value={dzevakertTvyalner.azganun}
              onChange={(e) => nkaragrel('azganun', e.target.value)} placeholder="Mkrtchyan" />
            {skhalter.azganun && <span className="dzevakert-skhalt">{skhalter.azganun}</span>}
          </div>
        </div>

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ash-bakhum">Bakhum (Bаjin)</label>
            <input id="ash-bakhum" className="dzevakert-muts" value={dzevakertTvyalner.bakhum}
              onChange={(e) => nkaragrel('bakhum', e.target.value)} placeholder="IT, HR, Tsarayutyun..." />
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ash-pashton">Pashton</label>
            <input id="ash-pashton" className="dzevakert-muts" value={dzevakertTvyalner.pashton}
              onChange={(e) => nkaragrel('pashton', e.target.value)} placeholder="Tzragravоrоgh, Karavarich..." />
          </div>
        </div>

        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir pahanjvats" htmlFor="ash-email">El. Hasce</label>
          <input id="ash-email" className="dzevakert-muts" type="email" value={dzevakertTvyalner.elektronerayin_hasce}
            onChange={(e) => nkaragrel('elektronerayin_hasce', e.target.value)} placeholder="karen@helpdesk.am" />
          {skhalter.elektronerayin_hasce && <span className="dzevakert-skhalt">{skhalter.elektronerayin_hasce}</span>}
        </div>

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ash-herakhosahamer">Herakhos</label>
            <input id="ash-herakhosahamer" className="dzevakert-muts" type="tel" value={dzevakertTvyalner.herakhosahamer}
              onChange={(e) => nkaragrel('herakhosahamer', e.target.value)} placeholder="+374 91 123456" />
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ash-aktiv">Vichak</label>
            <select id="ash-aktiv" className="dzevakert-mintchev" value={dzevakertTvyalner.aktiv ? 'true' : 'false'}
              onChange={(e) => nkaragrel('aktiv', e.target.value === 'true')}>
              <option value="true">✅ Aktiv</option>
              <option value="false">❌ Voraktiv</option>
            </select>
          </div>
        </div>

        <div className="modal-kolutyun" style={{ padding: '20px 0 0' }}>
          <button type="button" className="kochumn-knop khnamelu-knop" onClick={vercnel} disabled={barcracumKa} id="ash-modal-veradardal">Veradardal</button>
          <button type="submit" className="kochumn-knop hsnakan-knop" disabled={barcracumKa} id="ash-modal-pahanel">
            {barcracumKa ? '⏳ Pahanjvum...' : `${norsogum ? '✏️ Pahanel' : '👨‍💼 Steghcel'}`}
          </button>
        </div>
      </form>
    </Modal>
  );
}
