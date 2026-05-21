// Tiketer — Tiketneri Karavarum (Tickets Management)
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import TiketModal from '../components/TiketModal';
import DeleteModal from '../components/DeleteModal';

const kargavichakNshanner = { 'Բաց': '🟢', 'Բաց': '🟢', 'Ընթացիկ': '🔵', 'Փակված': '⚫' };
const kargnishNshanner = { 'Ցածր': '🟢', 'Միջին': '🟡', 'Բարձր': '🔴' };
const kargavichakDasakargum = { 'Բաց': 'bac', 'Բաց': 'bac', 'Ընթացիկ': 'ntsaghik', 'Փակված': 'pakvats' };
const kargnishDasakargum = { 'Ցածր': 'tsatsr', 'Միջին': 'mijin', 'Բարձր': 'bardzr' };

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

  const tsnuytsToast = useCallback((haghordagutyun, tesak = 'հաջողություն') => {
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
      if (tiketP.հաջողություն) setBololTiketer(tiketP.tvyalner);
      if (ogtaterP.հաջողություն) setOgtaterneр(ogtaterP.tvyalner);
      if (ashP.հաջողություն) setAshkhatakitsner(ashP.tvyalner);
    } catch (e) {
      tsnuytsToast('Տվյալներ բերելիս սխալ', 'սխալ');
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
    if (!tvyalner.հաջողություն) throw new Error(tvyalner.սխալ);
    tsnuytsToast(xmbagrvogTiket ? 'Տոմսը հաջողությամբ խմբագրվեց' : 'Նոր տոմս հաջողությամբ ստեղծվեց');
    bererTvyalner();
  };

  const hashtvarel = async () => {
    setJnjumBarcracumKa(true);
    try {
      const res = await fetch(`/api/tiketer/${jnjvogTiketId}`, { method: 'DELETE' });
      const tvyalner = await res.json();
      if (!tvyalner.հաջողություն) throw new Error(tvyalner.սխալ);
      tsnuytsToast('Տոմսը հաջողությամբ ջնջվեց');
      setJnjelModalBatsKa(false);
      bererTvyalner();
    } catch (e) {
      tsnuytsToast(e.message || 'Ջնջելու սխալ', 'սխալ');
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
        <title>Տոմսեր — Աջակցության Կենտրոն</title>
        <meta name="description" content="Տոմսերի կառավարում" />
      </Head>

      <main className="hastsumnayin-kartik">
        <div className="ejhakutyunayin-bnagir">
          <div>
            <h1 className="ejhakutyunayin-anagir">🎫 Տոմսեր</h1>
            <p className="ejhakutyunayin-nkaragrutyun">{bololTiketer.length} տոմս գրանցված է համակարգում</p>
          </div>
          <button className="kochumn-knop hsnakan-knop" onClick={() => { setXmbagrvogTiket(null); setModalBatsKa(true); }} id="steghcel-nor-tiket">
            ✨ Նոր Տոմս
          </button>
        </div>

        {/* Ztrer */}
        <div className="kndurutyun-bak">
          <div className="pretrutyan-muts-bak" style={{ flex: 2 }}>
            <span className="pretrutyan-nshani">🔍</span>
            <input className="pretrutyan-muts" type="text" placeholder="Որոնել վերնագիր, նկարագրություն..."
              value={pretrutyunArarkogh} onChange={(e) => setPretrutyunArarkogh(e.target.value)} id="tiket-pretrutyun" />
          </div>
          <select className="dzevakert-mintchev" style={{ minWidth: 160 }} value={kargavichakZtrel}
            onChange={(e) => setKargavichakZtrel(e.target.value)} id="kargavichak-ztrel">
            <option value="">Բոլոր Կարգավիճակները</option>
            <option value="Բաց">🟢 Բաց</option>
            <option value="Ընթացիկ">🔵 Ընթացիկ</option>
            <option value="Փակված">⚫ Փակված</option>
          </select>
          <select className="dzevakert-mintchev" style={{ minWidth: 140 }} value={kargnishZtrel}
            onChange={(e) => setKargnishZtrel(e.target.value)} id="kargnish-ztrel">
            <option value="">Բոլոր Կարգերը</option>
            <option value="Ցածր">🟢 Ցածր</option>
            <option value="Միջին">🟡 Միջին</option>
            <option value="Բարձր">🔴 Բարձր</option>
          </select>
        </div>

        <div className="ashkhatanoc-bak">
          {barcracumKa ? (
            <div className="barcracum-vichak"><div className="barcracum-shrjanag" /><span>Բեռնվում է...</span></div>
          ) : zarrkvatsOgtaterneр.length === 0 ? (
            <div className="datark-vichak">
              <div className="datark-nshani">🎫</div>
              <div className="datark-anagir">Տոմսեր չկան</div>
              <div className="datark-nkaragrutyun">Ստեղծել նոր տոմս բնագրով</div>
            </div>
          ) : (
            <table className="ashkhatanoc-zarmik" id="tiketer-zavarak">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Վերնագիր</th>
                  <th>Կարգ</th>
                  <th>Կարգավիճակ</th>
                  <th>Կատեգորիա</th>
                  <th>Ստեղծող օգտատեր</th>
                  <th>Հանձնված է</th>
                  <th>Գործողություններ</th>
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
                      {tiket.handnvatsAshkhatakits ? `${tiket.handnvatsAshkhatakits.anun} ${tiket.handnvatsAshkhatakits.azganun}` : <span style={{ color: '#f59e0b' }}>Չհանձնված</span>}
                    </td>
                    <td>
                      <div className="gortsolutyunneri-shor">
                        <button className="kochumn-knop tarmarkutyan-knop patan-knop" title="Խմբագրել"
                          onClick={() => { setXmbagrvogTiket(tiket); setModalBatsKa(true); }} id={`xmbagrel-tiket-${tiket.id}`}>✏️</button>
                        <button className="kochumn-knop jnjelu-knop patan-knop" title="Ջնջել"
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
        anagir="Վստա՞հ եք, որ ուզում եք ջնջել այս տոմսը։"
        nkaragrutyun="Տոմսը ջնջելու դեպքում տվյալները կկորչեն"
        hashtvarel={hashtvarel} barcracumKa={jnjumBarcracumKa} />

      {toast && (
        <div className="toast-zanazan">
          <div className={`toast-bak ${toast.tesak}`}>
            <span>{toast.tesak === 'հաջողություն' ? '✅' : '❌'}</span>
            <span style={{ fontSize: '0.9rem' }}>{toast.haghordagutyun}</span>
          </div>
        </div>
      )}
    </>
  );
}
