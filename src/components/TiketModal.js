// TiketModal — Tiketi Ստեղծել/Խմբագրել Modal
import { useState, useEffect } from 'react';
import Modal from './Modal';

const datarkNakhnayin = {
  vernagir: '',
  nkaragrutyun: '',
  kargnish: 'Միջին',
  kargavichak: 'Բաց',
  kategoria: '',
  ogtater_id: '',
  ashkhatakits_id: '',
};

export default function TiketModal({ batsKa, vercnel, xmbagrvogTiket, pahanel, ogtaterneр = [], ashkhatakitsner = [] }) {
  const [dzevakertTvyalner, setDzevakertTvyalner] = useState(datarkNakhnayin);
  const [barcracumKa, setBarcracumKa] = useState(false);
  const [skhalter, setSkhalter] = useState({});
  const norsogum = !!xmbagrvogTiket;

  useEffect(() => {
    if (xmbagrvogTiket) {
      setDzevakertTvyalner({
        vernagir: xmbagrvogTiket.vernagir || '',
        nkaragrutyun: xmbagrvogTiket.nkaragrutyun || '',
        kargnish: xmbagrvogTiket.kargnish || 'Միջին',
        kargavichak: xmbagrvogTiket.kargavichak || 'Բաց',
        kategoria: xmbagrvogTiket.kategoria || '',
        ogtater_id: xmbagrvogTiket.ogtater_id || '',
        ashkhatakits_id: xmbagrvogTiket.ashkhatakits_id || '',
      });
    } else {
      setDzevakertTvyalner(datarkNakhnayin);
    }
    setSkhalter({});
  }, [xmbagrvogTiket, batsKa]);

  const nkaragrel = (anun, arjanekh) => {
    setDzevakertTvyalner(prev => ({ ...prev, [anun]: arjanekh }));
    if (skhalter[anun]) setSkhalter(prev => ({ ...prev, [anun]: '' }));
  };

  const pahanel_submit = async (e) => {
    e.preventDefault();
    if (!dzevakertTvyalner.vernagir.trim()) {
      setSkhalter({ vernagir: 'Վերնագիրը պարտադիր է' });
      return;
    }
    setBarcracumKa(true);
    try {
      await pahanel({
        ...dzevakertTvyalner,
        ogtater_id: dzevakertTvyalner.ogtater_id || null,
        ashkhatakits_id: dzevakertTvyalner.ashkhatakits_id || null,
      });
      vercnel();
    } catch (սխալ) {
      setSkhalter({ global: սխալ.message || 'Սխալ տեղի ունեցավ' });
    } finally {
      setBarcracumKa(false);
    }
  };

  return (
    <Modal batsKa={batsKa} vercnel={vercnel} anagir={norsogum ? 'Խմբագրել Տոմսը' : 'Ստեղծել Նոր Տոմս'} nshani={norsogum ? '✏️' : '🎫'} lajox>
      <form className="dzevakert-khumb" onSubmit={pahanel_submit} id="tiket-dzevakert">
        {skhalter.global && (
          <div style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 10, padding: '12px 16px', color: '#f43f5e', fontSize: '0.9rem' }}>
            ⚠️ {skhalter.global}
          </div>
        )}
        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir pahanjvats" htmlFor="tiket-vernagir">Վերնագիր</label>
          <input id="tiket-vernagir" className="dzevakert-muts" value={dzevakertTvyalner.vernagir} onChange={(e) => nkaragrel('vernagir', e.target.value)} placeholder="Տոմսի վերնագիր..." />
          {skhalter.vernagir && <span className="dzevakert-skhalt">{skhalter.vernagir}</span>}
        </div>
        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir" htmlFor="tiket-nkaragrutyun">Նկարագրություն</label>
          <textarea id="tiket-nkaragrutyun" className="dzevakert-bnagir" value={dzevakertTvyalner.nkaragrutyun} onChange={(e) => nkaragrel('nkaragrutyun', e.target.value)} placeholder="Ավելացրեք նկարագրություն..." rows={3} />
        </div>
        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="tiket-kargnish">Կարգ</label>
            <select id="tiket-kargnish" className="dzevakert-mintchev" value={dzevakertTvyalner.kargnish} onChange={(e) => nkaragrel('kargnish', e.target.value)}>
              <option value="Ցածր">🟢 Ցածր</option>
              <option value="Միջին">🟡 Միջին</option>
              <option value="Բարձր">🔴 Բարձր</option>
            </select>
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="tiket-kargavichak">Կարգավիճակ</label>
            <select id="tiket-kargavichak" className="dzevakert-mintchev" value={dzevakertTvyalner.kargavichak} onChange={(e) => nkaragrel('kargavichak', e.target.value)}>
              <option value="Բաց">🟢 Բաց</option>
              <option value="Ընթացիկ">🔵 Ընթացիկ</option>
              <option value="Փակված">⚫ Փակված</option>
            </select>
          </div>
        </div>
        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir" htmlFor="tiket-kategoria">Կատեգորիա</label>
          <input id="tiket-kategoria" className="dzevakert-muts" value={dzevakertTvyalner.kategoria} onChange={(e) => nkaragrel('kategoria', e.target.value)} placeholder="Էլ. Փոստ, Սարքավորում..." />
        </div>
        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="tiket-ogtater">Ստեղծող օգտատեր</label>
            <select id="tiket-ogtater" className="dzevakert-mintchev" value={dzevakertTvyalner.ogtater_id} onChange={(e) => nkaragrel('ogtater_id', e.target.value)}>
              <option value="">— Ընտրել —</option>
              {ogtaterneр.map((o) => <option key={o.id} value={o.id}>{o.anun} {o.azganun}</option>)}
            </select>
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="tiket-ashkhatakits">Հանձնված Աշխատակից</label>
            <select id="tiket-ashkhatakits" className="dzevakert-mintchev" value={dzevakertTvyalner.ashkhatakits_id} onChange={(e) => nkaragrel('ashkhatakits_id', e.target.value)}>
              <option value="">— Հանձնել —</option>
              {ashkhatakitsner.map((a) => <option key={a.id} value={a.id}>{a.anun} {a.azganun}</option>)}
            </select>
          </div>
        </div>
        <div className="modal-kolutyun" style={{ padding: '20px 0 0' }}>
          <button type="button" className="kochumn-knop khnamelu-knop" onClick={vercnel} disabled={barcracumKa} id="tiket-modal-veradardal">Վերադառնալ</button>
          <button type="submit" className="kochumn-knop hsnakan-knop" disabled={barcracumKa} id="tiket-modal-pahanel">
            {barcracumKa ? '⏳ Պահպանվում է...' : `${norsogum ? '✏️ Պահպանել' : '🎫 Ստեղծել'}`}
          </button>
        </div>
      </form>
    </Modal>
  );
}
