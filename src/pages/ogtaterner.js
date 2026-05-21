// Ogtaterneр — Ogtaterneri Karavarum (Users Management)
import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import OgtaterModal from '../components/OgtaterModal';
import DeleteModal from '../components/DeleteModal';

export default function OgtaterneriKaravarum() {
  const [bololOgtaterneр, setBololOgtaterneр] = useState([]);
  const [pretrutyunArarkogh, setPretrutyunArarkogh] = useState('');
  const [barcracumKa, setBarcracumKa] = useState(true);
  const [steghcelModalBatsKa, setSteghcelModalBatsKa] = useState(false);
  const [xmbagrvogOgtater, setXmbagrvogOgtater] = useState(null);
  const [jnjvogOgtaterId, setJnjvogOgtaterId] = useState(null);
  const [jnjelModalBatsKa, setJnjelModalBatsKa] = useState(false);
  const [jnjumBarcracumKa, setJnjumBarcracumKa] = useState(false);
  const [toast, setToast] = useState(null);

  const tsnuytsToast = useCallback((haghordagutyun, tesak = 'հաջողություն') => {
    setToast({ haghordagutyun, tesak });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const bererOgtaterneр = useCallback(async () => {
    setBarcracumKa(true);
    try {
      const pataskhan = await fetch('/api/ogtaterner');
      const tvyalner = await pataskhan.json();
      if (tvyalner.հաջողություն) setBololOgtaterneр(tvyalner.tvyalner);
    } catch (e) {
      tsnuytsToast('Օգտատերեր բերելիս սխալ', 'սխալ');
    } finally {
      setBarcracumKa(false);
    }
  }, [tsnuytsToast]);

  useEffect(() => { bererOgtaterneр(); }, [bererOgtaterneр]);

  const pahanelOgtater = async (dzevakertTvyalner) => {
    const methodы = xmbagrvogOgtater ? 'PUT' : 'POST';
    const urlы = xmbagrvogOgtater ? `/api/ogtaterner/${xmbagrvogOgtater.id}` : '/api/ogtaterner';
    const pataskhan = await fetch(urlы, {
      method: methodы,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dzevakertTvyalner),
    });
    const tvyalner = await pataskhan.json();
    if (!tvyalner.հաջողություն) throw new Error(tvyalner.սխալ);
    tsnuytsToast(xmbagrvogOgtater ? 'Օգտատերը հաջողությամբ խմբագրվեց' : 'Նոր օգտատեր հաջողությամբ ստեղծվեց');
    bererOgtaterneр();
  };

  const hashtvarel = async () => {
    setJnjumBarcracumKa(true);
    try {
      const pataskhan = await fetch(`/api/ogtaterner/${jnjvogOgtaterId}`, { method: 'DELETE' });
      const tvyalner = await pataskhan.json();
      if (!tvyalner.հաջողություն) throw new Error(tvyalner.սխալ);
      tsnuytsToast('Օգտատերը հաջողությամբ ջնջվեց');
      setJnjelModalBatsKa(false);
      bererOgtaterneр();
    } catch (e) {
      tsnuytsToast(e.message || 'Ջնջելու սխալ', 'սխալ');
    } finally {
      setJnjumBarcracumKa(false);
    }
  };

  const derNshanner = { 'Ādministrator': 'der-nshani', 'Адмін': 'der-nshani' };

  const zarrkvatsOgtaterneр = bololOgtaterneр.filter(o =>
    `${o.anun} ${o.azganun} ${o.elektronerayin_hasce} ${o.der}`.toLowerCase()
      .includes(pretrutyunArarkogh.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Օգտատերեր — Աջակցության Կենտրոն</title>
        <meta name="description" content="Օգտատերերի կառավարում" />
      </Head>

      <main className="hastsumnayin-kartik">
        <div className="ejhakutyunayin-bnagir">
          <div>
            <h1 className="ejhakutyunayin-anagir">👥 Օգտատերեր</h1>
            <p className="ejhakutyunayin-nkaragrutyun">{bololOgtaterneр.length} օգտատեր գրանցված է համակարգում</p>
          </div>
          <button className="kochumn-knop hsnakan-knop" onClick={() => { setXmbagrvogOgtater(null); setSteghcelModalBatsKa(true); }} id="steghcel-nor-ogtater">
            ✨ Նոր Օգտատեր
          </button>
        </div>

        {/* Pretrutyun */}
        <div className="kndurutyun-bak">
          <div className="pretrutyan-muts-bak">
            <span className="pretrutyan-nshani">🔍</span>
            <input className="pretrutyan-muts" type="text" placeholder="Որոնել անուն, ազգանուն, էլ. հասցե..."
              value={pretrutyunArarkogh} onChange={(e) => setPretrutyunArarkogh(e.target.value)} id="ogtater-pretrutyun" />
          </div>
        </div>

        {/* Table */}
        <div className="ashkhatanoc-bak">
          {barcracumKa ? (
            <div className="barcracum-vichak"><div className="barcracum-shrjanag" /><span>Բեռնվում է...</span></div>
          ) : zarrkvatsOgtaterneр.length === 0 ? (
            <div className="datark-vichak">
              <div className="datark-nshani">👥</div>
              <div className="datark-anagir">{pretrutyunArarkogh ? 'Որոնումով արդյունք չգտնվեց' : 'Օգտատերեր չկան'}</div>
              <div className="datark-nkaragrutyun">{pretrutyunArarkogh ? 'Կատարեք այլ որոնում' : 'Սկսել նոր օգտատեր ստեղծելով'}</div>
            </div>
          ) : (
            <table className="ashkhatanoc-zarmik" id="ogtaterneр-zavarak">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Անուն Ազգանուն</th>
                  <th>Էլ. Հասցե</th>
                  <th>Հեռախոս</th>
                  <th>Դեր</th>
                  <th>Գործողություններ</th>
                </tr>
              </thead>
              <tbody>
                {zarrkvatsOgtaterneр.map((ogtater) => (
                  <tr key={ogtater.id}>
                    <td style={{ color: '#6c63ff', fontWeight: 700 }}>#{ogtater.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#6c63ff,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>
                          {ogtater.anun?.[0]}{ogtater.azganun?.[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{ogtater.anun} {ogtater.azganun}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: '#94a3b8' }}>{ogtater.elektronerayin_hasce}</td>
                    <td style={{ color: '#94a3b8' }}>{ogtater.herakhosahamer || '—'}</td>
                    <td><span className="petakan-nshani der-nshani">{ogtater.der}</span></td>
                    <td>
                      <div className="gortsolutyunneri-shor">
                        <button className="kochumn-knop tarmarkutyan-knop patan-knop" title="Խմբագրել"
                          onClick={() => { setXmbagrvogOgtater(ogtater); setSteghcelModalBatsKa(true); }}
                          id={`xmbagrel-ogtater-${ogtater.id}`}>✏️</button>
                        <button className="kochumn-knop jnjelu-knop patan-knop" title="Ջնջել"
                          onClick={() => { setJnjvogOgtaterId(ogtater.id); setJnjelModalBatsKa(true); }}
                          id={`jnjel-ogtater-${ogtater.id}`}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <OgtaterModal batsKa={steghcelModalBatsKa} vercnel={() => { setSteghcelModalBatsKa(false); setXmbagrvogOgtater(null); }}
        xmbagrvogOgtater={xmbagrvogOgtater} pahanel={pahanelOgtater} />

      <DeleteModal batsKa={jnjelModalBatsKa} vercnel={() => setJnjelModalBatsKa(false)}
        anagir="Վստա՞հ եք, որ ուզում եք ջնջել այս օգտատիրոջը։"
        nkaragrutyun="Օգտատիրոջը ջնջելու դեպքում տվյալները կկորչեն"
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
