// Tsanusatsurnner — Tsanusatsurnneri Karavarum (Notifications Management)
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import TsanusatsurnModal from '../components/TsanusatsurnModal';
import DeleteModal from '../components/DeleteModal';

const tesakNshanner = { 'Տեղեկություն': 'ℹ️', 'Զգուշացում': '⚠️', 'Սխալ': '❌', 'Հաջողություն': '✅' };
const tesakGuyner = {
  'Տեղեկություն': { bg: 'rgba(56,189,248,0.15)', color: '#38bdf8', border: 'rgba(56,189,248,0.3)' },
  'Զգուշացում': { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  'Սխալ': { bg: 'rgba(244,63,94,0.15)', color: '#f43f5e', border: 'rgba(244,63,94,0.3)' },
  'Հաջողություն': { bg: 'rgba(16,185,129,0.15)', color: '#10b981', border: 'rgba(16,185,129,0.3)' },
};

export default function TsanusatsurnneriKaravarum() {
  const [bololTsanusatsurnner, setBololTsanusatsurnner] = useState([]);
  const [ogtaterneр, setOgtaterneр] = useState([]);
  const [tiketer, setTiketer] = useState([]);
  const [kardatsvatsdzZtrel, setKardatsvatsdzZtrel] = useState('');
  const [barcracumKa, setBarcracumKa] = useState(true);
  const [modalBatsKa, setModalBatsKa] = useState(false);
  const [xmbagrvogTs, setXmbagrvogTs] = useState(null);
  const [jnjvogId, setJnjvogId] = useState(null);
  const [jnjelModalBatsKa, setJnjelModalBatsKa] = useState(false);
  const [jnjumBarcracumKa, setJnjumBarcracumKa] = useState(false);
  const [toast, setToast] = useState(null);

  const tsnuytsToast = useCallback((msg, tesak = 'հաջողություն') => {
    setToast({ haghordagutyun: msg, tesak });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const bererTvyalner = useCallback(async () => {
    setBarcracumKa(true);
    try {
      const [tsP, ogtP, tikP] = await Promise.all([
        fetch('/api/tsanusatsurnner').then(r => r.json()),
        fetch('/api/ogtaterner').then(r => r.json()),
        fetch('/api/tiketer').then(r => r.json()),
      ]);
      if (tsP.հաջողություն) setBololTsanusatsurnner(tsP.tvyalner);
      if (ogtP.հաջողություն) setOgtaterneр(ogtP.tvyalner);
      if (tikP.հաջողություն) setTiketer(tikP.tvyalner);
    } catch (e) {
      tsnuytsToast('Տվյալներ բերելիս սխալ', 'սխալ');
    } finally {
      setBarcracumKa(false);
    }
  }, [tsnuytsToast]);

  useEffect(() => { bererTvyalner(); }, [bererTvyalner]);

  const pahanelTs = async (dzev) => {
    const method = xmbagrvogTs ? 'PUT' : 'POST';
    const url = xmbagrvogTs ? `/api/tsanusatsurnner/${xmbagrvogTs.id}` : '/api/tsanusatsurnner';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dzev) });
    const tvyalner = await res.json();
    if (!tvyalner.հաջողություն) throw new Error(tvyalner.սխալ);
    tsnuytsToast(xmbagrvogTs ? 'Ծանուցումը խմբագրվեց' : 'Նոր ծանուցում ստեղծվեց');
    bererTvyalner();
  };

  const nshanakelKardatsvatsdz = async (id) => {
    try {
      const res = await fetch(`/api/tsanusatsurnner/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kardatsvatsd: true }),
      });
      const tvyalner = await res.json();
      if (tvyalner.հաջողություն) {
        setBololTsanusatsurnner(prev => prev.map(ts => ts.id === id ? { ...ts, kardatsvatsd: true } : ts));
        tsnuytsToast('Ծանուցումը նշանակվեց կարդացված');
      }
    } catch (e) {
      tsnuytsToast('Սխալ', 'սխալ');
    }
  };

  const hashtvarel = async () => {
    setJnjumBarcracumKa(true);
    try {
      const res = await fetch(`/api/tsanusatsurnner/${jnjvogId}`, { method: 'DELETE' });
      const tvyalner = await res.json();
      if (!tvyalner.հաջողություն) throw new Error(tvyalner.սխալ);
      tsnuytsToast('Ծանուցումը ջնջվեց');
      setJnjelModalBatsKa(false);
      bererTvyalner();
    } catch (e) {
      tsnuytsToast(e.message || 'Ջնջելու սխալ', 'սխալ');
    } finally {
      setJnjumBarcracumKa(false);
    }
  };

  const zarrkvats = bololTsanusatsurnner.filter(ts => {
    if (kardatsvatsdzZtrel === 'true') return ts.kardatsvatsd;
    if (kardatsvatsdzZtrel === 'false') return !ts.kardatsvatsd;
    return true;
  });

  const akardatsvatsdz = bololTsanusatsurnner.filter(ts => !ts.kardatsvatsd).length;

  return (
    <>
      <Head>
        <title>Ծանուցումներ — Աջակցության Կենտրոն</title>
        <meta name="description" content="Ծանուցումների կառավարում" />
      </Head>
      <main className="hastsumnayin-kartik">
        <div className="ejhakutyunayin-bnagir">
          <div>
            <h1 className="ejhakutyunayin-anagir">
              🔔 Ծանուցումներ
              {akardatsvatsdz > 0 && (
                <span style={{ marginLeft: 12, fontSize: '1rem', background: '#f43f5e', color: '#fff', padding: '2px 10px', borderRadius: 999, fontWeight: 700 }}>
                  {akardatsvatsdz} nor
                </span>
              )}
            </h1>
            <p className="ejhakutyunayin-nkaragrutyun">{bololTsanusatsurnner.length} ծանուցում, {akardatsvatsdz} չկարդացված</p>
          </div>
          <button className="kochumn-knop hsnakan-knop" onClick={() => { setXmbagrvogTs(null); setModalBatsKa(true); }} id="steghcel-nor-tsanusatsurn">
            ✨ Նոր Ծանուցում
          </button>
        </div>

        <div className="kndurutyun-bak">
          <select className="dzevakert-mintchev" style={{ minWidth: 200 }} value={kardatsvatsdzZtrel}
            onChange={(e) => setKardatsvatsdzZtrel(e.target.value)} id="kardatsvatsdz-ztrel">
            <option value="">Բոլոր Ծանուցումները</option>
            <option value="false">📭 Չկարդացվածներ</option>
            <option value="true">📬 Կարդացվածներ</option>
          </select>
        </div>

        <div className="tsanusatsurn-shrjar">
          {barcracumKa ? (
            <div className="barcracum-vichak"><div className="barcracum-shrjanag" /><span>Բեռնվում է...</span></div>
          ) : zarrkvats.length === 0 ? (
            <div className="datark-vichak">
              <div className="datark-nshani">🔔</div>
              <div className="datark-anagir">Ծանուցումներ չկան</div>
            </div>
          ) : (
            zarrkvats.map((ts) => {
              const guyn = tesakGuyner[ts.tesak] || tesakGuyner['Տեղեկություն'];
              return (
                <div key={ts.id} className={`tsanusatsurn-bak ${ts.kardatsvatsd ? 'kardatsvatsd' : 'nekardatsvatsd'}`}
                  style={{ borderColor: ts.kardatsvatsd ? 'rgba(255,255,255,0.1)' : guyn.border }}>
                  <div className="tsanusatsurn-nshani" style={{ background: guyn.bg, color: guyn.color }}>
                    {tesakNshanner[ts.tesak] || 'ℹ️'}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: ts.kardatsvatsd ? '#94a3b8' : '#f0f0ff' }}>
                      {ts.haghordagutyun}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 6, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <span>#{ts.id}</span>
                      {ts.stacoghogtater && <span>👤 {ts.stacoghogtater.anun} {ts.stacoghogtater.azganun}</span>}
                      {ts.kapvatstiket && <span>🎫 #{ts.kapvatstiket.id} {ts.kapvatstiket.vernagir}</span>}
                      <span style={{ color: guyn.color }}>{ts.tesak}</span>
                      <span>{ts.kardatsvatsd ? '📬 Կարդացված' : '📭 Չկարդացված'}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    {!ts.kardatsvatsd && (
                      <button className="kochumn-knop tarmarkutyan-knop patan-knop" title="Նշանակել որպես կարդացված"
                        onClick={() => nshanakelKardatsvatsdz(ts.id)} id={`kard-ts-${ts.id}`}>✓</button>
                    )}
                    <button className="kochumn-knop tarmarkutyan-knop patan-knop" title="Խմբագրել"
                      onClick={() => { setXmbagrvogTs(ts); setModalBatsKa(true); }} id={`xmbagrel-ts-${ts.id}`}>✏️</button>
                    <button className="kochumn-knop jnjelu-knop patan-knop" title="Ջնջել"
                      onClick={() => { setJnjvogId(ts.id); setJnjelModalBatsKa(true); }} id={`jnjel-ts-${ts.id}`}>🗑️</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      <TsanusatsurnModal batsKa={modalBatsKa} vercnel={() => { setModalBatsKa(false); setXmbagrvogTs(null); }}
        xmbagrvogTsanusatsurn={xmbagrvogTs} pahanel={pahanelTs} ogtaterneр={ogtaterneр} tiketer={tiketer} />
      <DeleteModal batsKa={jnjelModalBatsKa} vercnel={() => setJnjelModalBatsKa(false)}
        anagir="Վստա՞հ եք, որ ուզում եք ջնջել այս ծանուցումը։"
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
