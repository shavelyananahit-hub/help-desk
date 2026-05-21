// OgtaterModal — Ogtateri Ստեղծել/Խմբագրել Modal (User Create/Edit Modal)
import { useState, useEffect } from 'react';
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

export default function OgtaterModal({ batsKa, vercnel, xmbagrvogOgtater, pahanel }) {
  const [dzevakertTvyalner, setDzevakertTvyalner] = useState(datarkNakhnayin);
  const [barcracumKa, setBarcracumKa] = useState(false);
  const [skhalter, setSkhalter] = useState({});

  const norsogum = !!xmbagrvogOgtater;

  useEffect(() => {
    if (xmbagrvogOgtater) {
      setDzevakertTvyalner({
        anun: xmbagrvogOgtater.anun || '',
        azganun: xmbagrvogOgtater.azganun || '',
        elektronerayin_hasce: xmbagrvogOgtater.elektronerayin_hasce || '',
        herakhosahamer: xmbagrvogOgtater.herakhosahamer || '',
        der: xmbagrvogOgtater.der || 'Հաճախորդ',
        gtnayin_bard: '',
      });
    } else {
      setDzevakertTvyalner(datarkNakhnayin);
    }
    setSkhalter({});
  }, [xmbagrvogOgtater, batsKa]);

  const nkaragrel = (anun, arjanekh) => {
    setDzevakertTvyalner(naKhnayin => ({ ...naKhnayin, [anun]: arjanekh }));
    if (skhalter[anun]) setSkhalter(naKhnayin => ({ ...naKhnayin, [anun]: '' }));
  };

  const tvayinabaner = () => {
    const norSkhalter = {};
    if (!dzevakertTvyalner.anun.trim()) norSkhalter.anun = 'Անունը պարտադիր է';
    if (!dzevakertTvyalner.azganun.trim()) norSkhalter.azganun = 'Ազգանունը պարտադիր է';
    if (!dzevakertTvyalner.elektronerayin_hasce.trim()) norSkhalter.elektronerayin_hasce = 'Էլ. հասցեն պարտադիր է';
    if (!norsogum && !dzevakertTvyalner.gtnayin_bard) norSkhalter.gtnayin_bard = 'Գաղտնաբառը պարտադիր է';
    setSkhalter(norSkhalter);
    return Object.keys(norSkhalter).length === 0;
  };

  const pahanel_submit = async (e) => {
    e.preventDefault();
    if (!tvayinabaner()) return;
    setBarcracumKa(true);
    try {
      await pahanel(dzevakertTvyalner);
      vercnel();
    } catch (սխալ) {
      setSkhalter({ global: սխալ.message || 'Սխալ տեղի ունեցավ' });
    } finally {
      setBarcracumKa(false);
    }
  };

  return (
    <Modal
      batsKa={batsKa}
      vercnel={vercnel}
      anagir={norsogum ? 'Խմբագրել Օգտատիրոջը' : 'Ստեղծել Նոր Օգտատեր'}
      nshani={norsogum ? '✏️' : '👤'}
    >
      <form className="dzevakert-khumb" onSubmit={pahanel_submit} id="ogtater-dzevakert">
        {skhalter.global && (
          <div style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 10, padding: '12px 16px', color: '#f43f5e', fontSize: '0.9rem' }}>
            ⚠️ {skhalter.global}
          </div>
        )}

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="ogtater-anun">Անուն</label>
            <input
              id="ogtater-anun"
              className="dzevakert-muts"
              type="text"
              value={dzevakertTvyalner.anun}
              onChange={(e) => nkaragrel('anun', e.target.value)}
              placeholder="Արամ"
            />
            {skhalter.anun && <span className="dzevakert-skhalt">{skhalter.anun}</span>}
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="ogtater-azganun">Ազգանուն</label>
            <input
              id="ogtater-azganun"
              className="dzevakert-muts"
              type="text"
              value={dzevakertTvyalner.azganun}
              onChange={(e) => nkaragrel('azganun', e.target.value)}
              placeholder="Պետրոսյան"
            />
            {skhalter.azganun && <span className="dzevakert-skhalt">{skhalter.azganun}</span>}
          </div>
        </div>

        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir pahanjvats" htmlFor="ogtater-email">Էլ. Հասցե</label>
          <input
            id="ogtater-email"
            className="dzevakert-muts"
            type="email"
            value={dzevakertTvyalner.elektronerayin_hasce}
            onChange={(e) => nkaragrel('elektronerayin_hasce', e.target.value)}
            placeholder="aram@helpdesk.am"
          />
          {skhalter.elektronerayin_hasce && <span className="dzevakert-skhalt">{skhalter.elektronerayin_hasce}</span>}
        </div>

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ogtater-herakhosahamer">Հեռախոս</label>
            <input
              id="ogtater-herakhosahamer"
              className="dzevakert-muts"
              type="tel"
              value={dzevakertTvyalner.herakhosahamer}
              onChange={(e) => nkaragrel('herakhosahamer', e.target.value)}
              placeholder="+374 91 123456"
            />
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir pahanjvats" htmlFor="ogtater-der">Դեր</label>
            <select
              id="ogtater-der"
              className="dzevakert-mintchev"
              value={dzevakertTvyalner.der}
              onChange={(e) => nkaragrel('der', e.target.value)}
            >
              {dereriEnthrutyunner.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir pahanjvats" htmlFor="ogtater-gtnayin">
            Գաղտնաբառ {norsogum && '(թողնել դատարկ՝ չխմբագրելու համար)'}
          </label>
          <input
            id="ogtater-gtnayin"
            className="dzevakert-muts"
            type="password"
            value={dzevakertTvyalner.gtnayin_bard}
            onChange={(e) => nkaragrel('gtnayin_bard', e.target.value)}
            placeholder={norsogum ? '••••••••' : 'Առնվազն 8 նիշ'}
          />
          {skhalter.gtnayin_bard && <span className="dzevakert-skhalt">{skhalter.gtnayin_bard}</span>}
        </div>

        <div className="modal-kolutyun" style={{ padding: '20px 0 0', marginTop: 4 }}>
          <button type="button" className="kochumn-knop khnamelu-knop" onClick={vercnel} disabled={barcracumKa} id="ogtater-modal-veradardal">
            Վերադառնալ
          </button>
          <button type="submit" className="kochumn-knop hsnakan-knop" disabled={barcracumKa} id="ogtater-modal-pahanel">
            {barcracumKa
              ? <><span className="barcracum-shrjanag" style={{ width: 16, height: 16, borderWidth: 2 }} /> Պահպանվում է...</>
              : <><span>{norsogum ? '✏️' : '✨'}</span> {norsogum ? 'Պահպանել' : 'Ստեղծել'}</>
            }
          </button>
        </div>
      </form>
    </Modal>
  );
}
