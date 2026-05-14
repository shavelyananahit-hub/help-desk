// Tiketer — Tiketneri Karavarum (Tickets Management)
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import TiketModal from '../components/TiketModal';
import DeleteModal from '../components/DeleteModal';

const kargavichakNshanner = { 'Бас': '🟢', 'Bас': '🟢', 'Ntsaghik': '🔵', 'Pakvats': '⚫' };
const kargnishNshanner = { 'Ĉatsr': '🟢', 'Ìijin': '🟡', 'Bardzr': '🔴' };
const kargavichakDasakargum = { 'Бас': 'bac', 'Bас': 'bac', 'Ntsaghik': 'ntsaghik', 'Pakvats': 'pakvats' };
const kargnishDasakargum = { 'Ĉatsr': 'tsatsr', 'Ìijin': 'mijin', 'Bardzr': 'bardzr' };

export default function TiketneriKaravarum() {
  const [bololTiketer, setBololTiketer] = useState([]);
  const [ogtaterneр, setOgtaterneр] = useState([]);
  const [ashkhatakitsner, setAshkhatakitsner] = useState([]);
  const [pretrutyunArarkogh, setPretrutyunArarkogh] = useState('');
  const [kargavichakZtrel, setKargavichakZtrel] = useState('');
  const [kargnishZtrel, setKargnishZtrel] = useState('');
  const [barcracumKa, setBarcracumKa] = useState(true);
  const [modalBatsKa, setModalBatsKa] = useState(false);
  const [xmbagrvogTiket, setXmbagrvogTiket] = useState(null);
  const [jnjvogTiketId, setJnjvogTiketId] = useState(null);
  const [jnjelModalBatsKa, setJnjelModalBatsKa] = useState(false);
  const [jnjumBarcracumKa, setJnjumBarcracumKa] = useState(false);
  const [toast, setToast] = useState(null);

  const tsnuytsToast = useCallback((haghordagutyun, tesak = 'hajalutyun') => {
    setToast({ haghordagutyun, tesak });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const bererTvyalner = useCallback(async () => {
    setBarcracumKa(true);
    try {
      const [tiketP, ogtaterP, ashP] = await Promise.all([
        fetch('/api/tiketer').then(r => r.json()),
        fetch('/api/ogtaterner').then(r => r.json()),
        fetch('/api/ashkhatakitsner').then(r => r.json()),
      ]);
      if (tiketP.hajalutyun) setBololTiketer(tiketP.tvyalner);
      if (ogtaterP.hajalutyun) setOgtaterneр(ogtaterP.tvyalner);
      if (ashP.hajalutyun) setAshkhatakitsner(ashP.tvyalner);
    } catch (e) {
      tsnuytsToast('Tvyalner berelis skhalt', 'skhalt');
    } finally {
      setBarcracumKa(false);
    }
  }, [tsnuytsToast]);

  useEffect(() => { bererTvyalner(); }, [bererTvyalner]);

  const pahanelTiket = async (dzev) => {
    const method = xmbagrvogTiket ? 'PUT' : 'POST';
    const url = xmbagrvogTiket ? `/api/tiketer/${xmbagrvogTiket.id}` : '/api/tiketer';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dzev) });
    const tvyalner = await res.json();
    if (!tvyalner.hajalutyun) throw new Error(tvyalner.skhalt);
    tsnuytsToast(xmbagrvogTiket ? 'Tiket-y hajolothabar xmbagrvets' : 'Nor tiket hajolothabar steghtsvel');
    bererTvyalner();
  };

  const hashtvarel = async () => {
    setJnjumBarcracumKa(true);
    try {
      const res = await fetch(`/api/tiketer/${jnjvogTiketId}`, { method: 'DELETE' });
      const tvyalner = await res.json();
      if (!tvyalner.hajalutyun) throw new Error(tvyalner.skhalt);
      tsnuytsToast('Tiket-y hajolothabar jnjvel');
      setJnjelModalBatsKa(false);
      bererTvyalner();
    } catch (e) {
      tsnuytsToast(e.message || 'Jnjelu skhalt', 'skhalt');
    } finally {
      setJnjumBarcracumKa(false);
    }
  };

  const zarrkvatsOgtaterneр = bololTiketer.filter(t => {
    const textZtum = `${t.vernagir} ${t.nkaragrutyun} ${t.kategoria}`.toLowerCase().includes(pretrutyunArarkogh.toLowerCase());
    const kargavichakZtum = !kargavichakZtrel || t.kargavichak === kargavichakZtrel;
    const kargnishZtum = !kargnishZtrel || t.kargnish === kargnishZtrel;
    return textZtum && kargavichakZtum && kargnishZtum;
  });

  return (
    <>
      <Head>
        <title>Tiketer — Help Desk</title>
        <meta name="description" content="Tiketneri karavarum" />
      </Head>

      <main className="hastsumnayin-kartik">
        <div className="ejhakutyunayin-bnagir">
          <div>
            <h1 className="ejhakutyunayin-anagir">🎫 Tiketer</h1>
            <p className="ejhakutyunayin-nkaragrutyun">{bololTiketer.length} tiket grvagrvats e hamakargum</p>
          </div>
          <button className="kochumn-knop hsnakan-knop" onClick={() => { setXmbagrvogTiket(null); setModalBatsKa(true); }} id="steghcel-nor-tiket">
            ✨ Nor Tiket
          </button>
        </div>

        {/* Ztrer */}
        <div className="kndurutyun-bak">
          <div className="pretrutyan-muts-bak" style={{ flex: 2 }}>
            <span className="pretrutyan-nshani">🔍</span>
            <input className="pretrutyan-muts" type="text" placeholder="Vorоnel vernagir, nkaragrutyun..."
              value={pretrutyunArarkogh} onChange={(e) => setPretrutyunArarkogh(e.target.value)} id="tiket-pretrutyun" />
          </div>
          <select className="dzevakert-mintchev" style={{ minWidth: 160 }} value={kargavichakZtrel}
            onChange={(e) => setKargavichakZtrel(e.target.value)} id="kargavichak-ztrel">
            <option value="">Bolor Kargavichakner</option>
            <option value="Бас">🟢 Бас</option>
            <option value="Ntsaghik">🔵 Ntsaghik</option>
            <option value="Pakvats">⚫ Pakvats</option>
          </select>
          <select className="dzevakert-mintchev" style={{ minWidth: 140 }} value={kargnishZtrel}
            onChange={(e) => setKargnishZtrel(e.target.value)} id="kargnish-ztrel">
            <option value="">Bolor Kargnishner</option>
            <option value="Ĉatsr">🟢 Ĉatsr</option>
            <option value="Ìijin">🟡 Ìijin</option>
            <option value="Bardzr">🔴 Bardzr</option>
          </select>
        </div>

        <div className="ashkhatanoc-bak">
          {barcracumKa ? (
            <div className="barcracum-vichak"><div className="barcracum-shrjanag" /><span>Bercvum e...</span></div>
          ) : zarrkvatsOgtaterneр.length === 0 ? (
            <div className="datark-vichak">
              <div className="datark-nshani">🎫</div>
              <div className="datark-anagir">Tiketer chkan</div>
              <div className="datark-nkaragrutyun">Steghcel nor tiket bnagrov</div>
            </div>
          ) : (
            <table className="ashkhatanoc-zarmik" id="tiketer-zavarak">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Vernagir</th>
                  <th>Kargnish</th>
                  <th>Kargavichak</th>
                  <th>Kategoria</th>
                  <th>Steghtsoghogtater</th>
                  <th>Handnvats</th>
                  <th>Gortsolutyunner</th>
                </tr>
              </thead>
              <tbody>
                {zarrkvatsOgtaterneр.map((tiket) => (
                  <tr key={tiket.id}>
                    <td style={{ color: '#6c63ff', fontWeight: 700 }}>#{tiket.id}</td>
                    <td>
                      <div style={{ fontWeight: 600, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tiket.vernagir}</div>
                      {tiket.nkaragrutyun && <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>{tiket.nkaragrutyun}</div>}
                    </td>
                    <td><span className={`petakan-nshani kargnish-nshani ${kargnishDasakargum[tiket.kargnish] || 'mijin'}`}>{kargnishNshanner[tiket.kargnish] || '🟡'} {tiket.kargnish}</span></td>
                    <td><span className={`petakan-nshani ${kargavichakDasakargum[tiket.kargavichak] || 'bac'}`}>{tiket.kargavichak}</span></td>
                    <td style={{ color: '#94a3b8' }}>{tiket.kategoria || '—'}</td>
                    <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      {tiket.steghtsoghogtater ? `${tiket.steghtsoghogtater.anun} ${tiket.steghtsoghogtater.azganun}` : '—'}
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      {tiket.handnvatsAshkhatakits ? `${tiket.handnvatsAshkhatakits.anun} ${tiket.handnvatsAshkhatakits.azganun}` : <span style={{ color: '#f59e0b' }}>Chhandnvats</span>}
                    </td>
                    <td>
                      <div className="gortsolutyunneri-shor">
                        <button className="kochumn-knop tarmarkutyan-knop patan-knop" title="Xmbagrel"
                          onClick={() => { setXmbagrvogTiket(tiket); setModalBatsKa(true); }} id={`xmbagrel-tiket-${tiket.id}`}>✏️</button>
                        <button className="kochumn-knop jnjelu-knop patan-knop" title="Jnjel"
                          onClick={() => { setJnjvogTiketId(tiket.id); setJnjelModalBatsKa(true); }} id={`jnjel-tiket-${tiket.id}`}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <TiketModal batsKa={modalBatsKa} vercnel={() => { setModalBatsKa(false); setXmbagrvogTiket(null); }}
        xmbagrvogTiket={xmbagrvogTiket} pahanel={pahanelTiket}
        ogtaterneр={ogtaterneр} ashkhatakitsner={ashkhatakitsner} />

      <DeleteModal batsKa={jnjelModalBatsKa} vercnel={() => setJnjelModalBatsKa(false)}
        anagir="Вstahе՞q, vor uccum eq jnjel аyd tikety?"
        nkaragrutyun="Tiket-y jnjelu depqum аynkaran tvalyalnery kkorcanven"
        hashtvarel={hashtvarel} barcracumKa={jnjumBarcracumKa} />

      {toast && (
        <div className="toast-zanazan">
          <div className={`toast-bak ${toast.tesak}`}>
            <span>{toast.tesak === 'hajalutyun' ? '✅' : '❌'}</span>
            <span style={{ fontSize: '0.9rem' }}>{toast.haghordagutyun}</span>
          </div>
        </div>
      )}
    </>
  );
}
