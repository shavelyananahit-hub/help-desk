// TsanusatsurnModal — Tsanusatsurni Ստեղծել/Խմբագրել Modal
import { useState, useEffect } from 'react';
import Modal from './Modal';

const datarkNakhnayin = {
  haghordagutyun: '',
  tesak: 'Տեղեկություն',
  kardatsvatsd: false,
  ogtater_id: '',
  tiket_id: '',
};

const tesakerNshanner = {
  'Տեղեկություն': 'ℹ️',
  'Զգուշացում': '⚠️',
  'Սխալ': '❌',
  'Հաջողություն': '✅',
};

export default function TsanusatsurnModal({ batsKa, vercnel, xmbagrvogTsanusatsurn, pahanel, ogtaterneр = [], tiketer = [] }) {
  const [dzevakertTvyalner, setDzevakertTvyalner] = useState(datarkNakhnayin);
  const [barcracumKa, setBarcracumKa] = useState(false);
  const [skhalter, setSkhalter] = useState({});
  const norsogum = !!xmbagrvogTsanusatsurn;

  useEffect(() => {
    if (xmbagrvogTsanusatsurn) {
      setDzevakertTvyalner({
        haghordagutyun: xmbagrvogTsanusatsurn.haghordagutyun || '',
        tesak: xmbagrvogTsanusatsurn.tesak || 'Տեղեկություն',
        kardatsvatsd: !!xmbagrvogTsanusatsurn.kardatsvatsd,
        ogtater_id: xmbagrvogTsanusatsurn.ogtater_id || '',
        tiket_id: xmbagrvogTsanusatsurn.tiket_id || '',
      });
    } else {
      setDzevakertTvyalner(datarkNakhnayin);
    }
    setSkhalter({});
  }, [xmbagrvogTsanusatsurn, batsKa]);

  const nkaragrel = (anun, arjanekh) => {
    setDzevakertTvyalner(prev => ({ ...prev, [anun]: arjanekh }));
    if (skhalter[anun]) setSkhalter(prev => ({ ...prev, [anun]: '' }));
  };

  const pahanel_submit = async (e) => {
    e.preventDefault();
    if (!dzevakertTvyalner.haghordagutyun.trim()) {
      setSkhalter({ haghordagutyun: 'Հաղորդագրությունը պարտադիր է' });
      return;
    }
    setBarcracumKa(true);
    try {
      await pahanel({
        ...dzevakertTvyalner,
        ogtater_id: dzevakertTvyalner.ogtater_id || null,
        tiket_id: dzevakertTvyalner.tiket_id || null,
      });
      vercnel();
    } catch (սխալ) {
      setSkhalter({ global: սխալ.message || 'Սխալ տեղի ունեցավ' });
    } finally {
      setBarcracumKa(false);
    }
  };

  return (
    <Modal batsKa={batsKa} vercnel={vercnel} anagir={norsogum ? 'Խմբագրել Ծանուցումը' : 'Ստեղծել Նոր Ծանուցում'} nshani={norsogum ? '✏️' : '🔔'}>
      <form className="dzevakert-khumb" onSubmit={pahanel_submit} id="tsanusatsurn-dzevakert">
        {skhalter.global && (
          <div style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 10, padding: '12px 16px', color: '#f43f5e', fontSize: '0.9rem' }}>
            ⚠️ {skhalter.global}
          </div>
        )}

        <div className="dzevakert-dasht">
          <label className="dzevakert-dzevagir pahanjvats" htmlFor="ts-haghordagutyun">Հաղորդագրություն</label>
          <textarea id="ts-haghordagutyun" className="dzevakert-bnagir" value={dzevakertTvyalner.haghordagutyun}
            onChange={(e) => nkaragrel('haghordagutyun', e.target.value)}
            placeholder="Ծանուցման հաղորդագրությունը..." rows={3} />
          {skhalter.haghordagutyun && <span className="dzevakert-skhalt">{skhalter.haghordagutyun}</span>}
        </div>

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ts-tesak">Տեսակ</label>
            <select id="ts-tesak" className="dzevakert-mintchev" value={dzevakertTvyalner.tesak}
              onChange={(e) => nkaragrel('tesak', e.target.value)}>
              <option value="Տեղեկություն">ℹ️ Տեղեկություն</option>
              <option value="Զգուշացում">⚠️ Զգուշացում</option>
              <option value="Սխալ">❌ Սխալ</option>
              <option value="Հաջողություն">✅ Հաջողություն</option>
            </select>
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ts-kardatsvatsd">Կարդացվա՞ծ է</label>
            <select id="ts-kardatsvatsd" className="dzevakert-mintchev" value={dzevakertTvyalner.kardatsvatsd ? 'true' : 'false'}
              onChange={(e) => nkaragrel('kardatsvatsd', e.target.value === 'true')}>
              <option value="false">📭 Չկարդացված</option>
              <option value="true">📬 Կարդացված</option>
            </select>
          </div>
        </div>

        <div className="dzevakert-shor">
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ts-ogtater">Ստացող օգտատեր</label>
            <select id="ts-ogtater" className="dzevakert-mintchev" value={dzevakertTvyalner.ogtater_id}
              onChange={(e) => nkaragrel('ogtater_id', e.target.value)}>
              <option value="">— Ընտրել Օգտատեր —</option>
              {ogtaterneр.map((o) => <option key={o.id} value={o.id}>{o.anun} {o.azganun}</option>)}
            </select>
          </div>
          <div className="dzevakert-dasht">
            <label className="dzevakert-dzevagir" htmlFor="ts-tiket">Կապված Տոմս</label>
            <select id="ts-tiket" className="dzevakert-mintchev" value={dzevakertTvyalner.tiket_id}
              onChange={(e) => nkaragrel('tiket_id', e.target.value)}>
              <option value="">— Ընտրել Տոմս —</option>
              {tiketer.map((t) => <option key={t.id} value={t.id}>#{t.id} {t.vernagir}</option>)}
            </select>
          </div>
        </div>

        <div className="modal-kolutyun" style={{ padding: '20px 0 0' }}>
          <button type="button" className="kochumn-knop khnamelu-knop" onClick={vercnel} disabled={barcracumKa} id="ts-modal-veradardal">Վերադառնալ</button>
          <button type="submit" className="kochumn-knop hsnakan-knop" disabled={barcracumKa} id="ts-modal-pahanel">
            {barcracumKa ? '⏳ Պահպանվում է...' : `${norsogum ? '✏️ Պահպանել' : '🔔 Ստեղծել'}`}
          </button>
        </div>
      </form>
    </Modal>
  );
}
