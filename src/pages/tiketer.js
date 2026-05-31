// Tiketer — Tiketneri Karavarum (Tickets Management)
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Ticket, PlusCircle, Search, Pencil, Trash2, CheckCircle2, XCircle, Circle, Eye } from 'lucide-react';
import Head from 'next/head';
import TiketModal from '../components/TiketModal';
import DeleteModal from '../components/DeleteModal';

const kargavichakNshanner = { 'Բաց': <Circle fill="#10b981" size={12} strokeWidth={0} />, 'Ընթացիկ': <Circle fill="#f59e0b" size={12} strokeWidth={0} />, 'Փակված': <Circle fill="#64748b" size={12} strokeWidth={0} /> };
const kargnishNshanner = { 'Ցածր': <Circle fill="#10b981" size={12} strokeWidth={0} />, 'Միջին': <Circle fill="#f59e0b" size={12} strokeWidth={0} />, 'Բարձր': <Circle fill="#f43f5e" size={12} strokeWidth={0} /> };
const kargavichakDasakargum = { 'Բաց': 'bac', 'Բաց': 'bac', 'Ընթացիկ': 'ntsaghik', 'Փակված': 'pakvats' };
const kargnishDasakargum = { 'Ցածր': 'tsatsr', 'Միջին': 'mijin', 'Բարձր': 'bardzr' };

export default function TiketneriKaravarum() {
  const router = useRouter();
  const [bololTiketer, setBololTiketer] = useState([]);
  const [ogtaterneр, setOgtaterneр] = useState([]);
  const [ashkhatakitsner, setAshkhatakitsner] = useState([]);
  const [pretrutyunArarkogh, setPretrutyunArarkogh] = useState('');
  const [kargavichakZtrel, setKargavichakZtrel] = useState('');
  const [kargnishZtrel, setKargnishZtrel] = useState('');
  const [barcracumKa, setBarcracumKa] = useState(true);
  const [modalBatsKa, setModalBatsKa] = useState(false);
  const [xmbagrvogTiket, setXmbagrvogTiket] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
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

  useEffect(() => {
    if (router.isReady && router.query.kargavichak) {
      setKargavichakZtrel(router.query.kargavichak);
    }
  }, [router.isReady, router.query.kargavichak]);

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
            <h1 className="ejhakutyunayin-anagir" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Ticket size={28} /> Տոմսեր</h1>
            <p className="ejhakutyunayin-nkaragrutyun">{bololTiketer.length} տոմս գրանցված է համակարգում</p>
          </div>
          <button className="kochumn-knop hsnakan-knop" onClick={() => { setXmbagrvogTiket(null); setIsViewMode(false); setModalBatsKa(true); }} id="steghcel-nor-tiket">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><PlusCircle size={18} /> Նոր Տոմս</span>
          </button>
        </div>

        {/* Ztrer */}
        <div className="kndurutyun-bak">
          <div className="pretrutyan-muts-bak" style={{ flex: 2 }}>
            <span className="pretrutyan-nshani"><Search size={18} /></span>
            <input className="pretrutyan-muts" type="text" placeholder="Որոնել վերնագիր, նկարագրություն..."
              value={pretrutyunArarkogh} onChange={(e) => setPretrutyunArarkogh(e.target.value)} id="tiket-pretrutyun" />
          </div>
          <select className="dzevakert-mintchev" style={{ minWidth: 160 }} value={kargavichakZtrel}
            onChange={(e) => setKargavichakZtrel(e.target.value)} id="kargavichak-ztrel">
            <option value="">Բոլոր Կարգավիճակները</option>
            <option value="Բաց">Բաց</option>
            <option value="Ընթացիկ">Ընթացիկ</option>
            <option value="Փակված">Փակված</option>
          </select>
          <select className="dzevakert-mintchev" style={{ minWidth: 140 }} value={kargnishZtrel}
            onChange={(e) => setKargnishZtrel(e.target.value)} id="kargnish-ztrel">
            <option value="">Բոլոր Կարգերը</option>
            <option value="Ցածր">Ցածր</option>
            <option value="Միջին">Միջին</option>
            <option value="Բարձր">Բարձր</option>
          </select>
        </div>

        <div className="ashkhatanoc-bak">
          {barcracumKa ? (
            <div className="barcracum-vichak"><div className="barcracum-shrjanag" /><span>Բեռնվում է...</span></div>
          ) : zarrkvatsOgtaterneр.length === 0 ? (
            <div className="datark-vichak">
              <div className="datark-nshani"><Ticket size={48} /></div>
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
                    <td><span className={`petakan-nshani kargnish-nshani ${kargnishDasakargum[tiket.kargnish] || 'mijin'}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{kargnishNshanner[tiket.kargnish] || <Circle fill="#f59e0b" size={12} strokeWidth={0} />} {tiket.kargnish}</span></td>
                    <td><span className={`petakan-nshani ${kargavichakDasakargum[tiket.kargavichak] || 'bac'}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{kargavichakNshanner[tiket.kargavichak] || <Circle fill="#10b981" size={12} strokeWidth={0} />} {tiket.kargavichak}</span></td>
                    <td style={{ color: '#94a3b8' }}>{tiket.kategoria || '—'}</td>
                    <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      {tiket.steghtsoghogtater ? `${tiket.steghtsoghogtater.anun} ${tiket.steghtsoghogtater.azganun}` : '—'}
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      {tiket.handnvatsAshkhatakits ? `${tiket.handnvatsAshkhatakits.anun} ${tiket.handnvatsAshkhatakits.azganun}` : <span style={{ color: '#f59e0b' }}>Չհանձնված</span>}
                    </td>
                    <td>
                      <div className="gortsolutyunneri-shor">
                        <button className="kochumn-knop tarmarkutyan-knop patan-knop" style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.15)', borderColor: 'rgba(139, 92, 246, 0.3)' }} title="Դիտել"
                          onClick={() => { setXmbagrvogTiket(tiket); setIsViewMode(true); setModalBatsKa(true); }} id={`ditel-tiket-${tiket.id}`}><Eye size={16} /></button>
                        <button className="kochumn-knop tarmarkutyan-knop patan-knop" title="Խմբագրել"
                          onClick={() => { setXmbagrvogTiket(tiket); setIsViewMode(false); setModalBatsKa(true); }} id={`xmbagrel-tiket-${tiket.id}`}><Pencil size={16} /></button>
                        <button className="kochumn-knop jnjelu-knop patan-knop" title="Ջնջել"
                          onClick={() => { setJnjvogTiketId(tiket.id); setJnjelModalBatsKa(true); }} id={`jnjel-tiket-${tiket.id}`}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <TiketModal isOpen={modalBatsKa} onClose={() => { setModalBatsKa(false); setXmbagrvogTiket(null); setIsViewMode(false); }}
        xmbagrvogTiket={xmbagrvogTiket} pahanel={pahanelTiket} isViewMode={isViewMode}
        ogtaterneр={ogtaterneр} ashkhatakitsner={ashkhatakitsner} />

      <DeleteModal isOpen={jnjelModalBatsKa} onClose={() => setJnjelModalBatsKa(false)}
        title="Վստա՞հ եք, որ ուզում եք ջնջել այս տոմսը։"
        description="Տոմսը ջնջելու դեպքում տվյալները կկորչեն"
        onConfirm={hashtvarel} isLoading={jnjumBarcracumKa} />

      {toast && (
        <div className="toast-zanazan">
          <div className={`toast-bak ${toast.tesak}`}>
            <span>{toast.tesak === 'հաջողություն' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}</span>
            <span style={{ fontSize: '0.9rem' }}>{toast.haghordagutyun}</span>
          </div>
        </div>
      )}
    </>
  );
}
