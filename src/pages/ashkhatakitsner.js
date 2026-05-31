// Աշխատակիցներ — Ashkhatakitsneri Karavarum (Employees Management)
import { useState, useEffect, useCallback } from 'react';
import { Briefcase, PlusCircle, Search, Pencil, Trash2, CheckCircle2, XCircle, Eye } from 'lucide-react';
import Head from 'next/head';
import AshkhatakitsModal from '../components/AshkhatakitsModal';
import DeleteModal from '../components/DeleteModal';

export default function AshkhatakitsneriKaravarum() {
  const [bololAshkhatakitsner, setBololAshkhatakitsner] = useState([]);
  const [pretrutyunArarkogh, setPretrutyunArarkogh] = useState('');
  const [aktivZtrel, setAktivZtrel] = useState('');
  const [barcracumKa, setBarcracumKa] = useState(true);
  const [modalBatsKa, setModalBatsKa] = useState(false);
  const [xmbagrvogAshkhatakits, setXmbagrvogAshkhatakits] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [jnjvogId, setJnjvogId] = useState(null);
  const [jnjelModalBatsKa, setJnjelModalBatsKa] = useState(false);
  const [jnjumBarcracumKa, setJnjumBarcracumKa] = useState(false);
  const [toast, setToast] = useState(null);

  const tsnuytsToast = useCallback((msg, tesak = 'հաջողություն') => {
    setToast({ haghordagutyun: msg, tesak });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const bererAshkhatakitsner = useCallback(async () => {
    setBarcracumKa(true);
    try {
      const res = await fetch('/api/ashkhatakitsner');
      const tvyalner = await res.json();
      if (tvyalner.հաջողություն) setBololAshkhatakitsner(tvyalner.tvyalner);
    } catch (e) {
      tsnuytsToast('Աշխատակիցներ բերելիս սխալ', 'սխալ');
    } finally {
      setBarcracumKa(false);
    }
  }, [tsnuytsToast]);

  useEffect(() => { bererAshkhatakitsner(); }, [bererAshkhatakitsner]);

  const pahanelAshkhatakits = async (dzev) => {
    const method = xmbagrvogAshkhatakits ? 'PUT' : 'POST';
    const url = xmbagrvogAshkhatakits ? `/api/ashkhatakitsner/${xmbagrvogAshkhatakits.id}` : '/api/ashkhatakitsner';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dzev) });
    const tvyalner = await res.json();
    if (!tvyalner.հաջողություն) throw new Error(tvyalner.սխալ);
    tsnuytsToast(xmbagrvogAshkhatakits ? 'Աշխատակիցը խմբագրվեց' : 'Նոր աշխատակից ստեղծվեց');
    bererAshkhatakitsner();
  };

  const hashtvarel = async () => {
    setJnjumBarcracumKa(true);
    try {
      const res = await fetch(`/api/ashkhatakitsner/${jnjvogId}`, { method: 'DELETE' });
      const tvyalner = await res.json();
      if (!tvyalner.հաջողություն) throw new Error(tvyalner.սխալ);
      tsnuytsToast('Աշխատակիցը ջնջվեց');
      setJnjelModalBatsKa(false);
      bererAshkhatakitsner();
    } catch (e) {
      tsnuytsToast(e.message || 'Ջնջելու սխալ', 'սխալ');
    } finally {
      setJnjumBarcracumKa(false);
    }
  };

  const zarrkvats = bololAshkhatakitsner.filter(a => {
    const txt = `${a.anun} ${a.azganun} ${a.elektronerayin_hasce} ${a.bakhum || ''} ${a.pashton || ''}`.toLowerCase().includes(pretrutyunArarkogh.toLowerCase());
    const aktZt = aktivZtrel === '' ? true : aktivZtrel === 'true' ? a.aktiv : !a.aktiv;
    return txt && aktZt;
  });

  return (
    <>
      <Head>
        <title>Աշխատակիցներ — Աջակցության Կենտրոն</title>
        <meta name="description" content="Աշխատակիցների կառավարում" />
      </Head>
      <main className="hastsumnayin-kartik">
        <div className="ejhakutyunayin-bnagir">
          <div>
            <h1 className="ejhakutyunayin-anagir" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={28} /> Աշխատակիցներ</h1>
            <p className="ejhakutyunayin-nkaragrutyun">{bololAshkhatakitsner.length} աշխատակից գրանցված է համակարգում</p>
          </div>
          <button className="kochumn-knop hsnakan-knop" onClick={() => { setXmbagrvogAshkhatakits(null); setIsViewMode(false); setModalBatsKa(true); }} id="steghcel-nor-ashkhatakits">
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><PlusCircle size={18} /> Նոր Աշխատակից</span>
          </button>
        </div>

        <div className="kndurutyun-bak">
          <div className="pretrutyan-muts-bak" style={{ flex: 2 }}>
            <span className="pretrutyan-nshani"><Search size={18} /></span>
            <input className="pretrutyan-muts" placeholder="Որոնել անուն, բաժին..." value={pretrutyunArarkogh}
              onChange={(e) => setPretrutyunArarkogh(e.target.value)} id="ash-pretrutyun" />
          </div>
          <select className="dzevakert-mintchev" style={{ minWidth: 160 }} value={aktivZtrel}
            onChange={(e) => setAktivZtrel(e.target.value)} id="aktiv-ztrel">
            <option value="">Բոլոր Վիճակները</option>
            <option value="true">Ակտիվ</option>
            <option value="false">Ոչ ակտիվ</option>
          </select>
        </div>

        <div className="ashkhatanoc-bak">
          {barcracumKa ? (
            <div className="barcracum-vichak"><div className="barcracum-shrjanag" /><span>Բեռնվում է...</span></div>
          ) : zarrkvats.length === 0 ? (
            <div className="datark-vichak">
              <div className="datark-nshani"><Briefcase size={48} /></div>
              <div className="datark-anagir">Աշխատակիցներ չկան</div>
            </div>
          ) : (
            <table className="ashkhatanoc-zarmik" id="ashkhatakitsner-zavarak">
              <thead>
                <tr>
                  <th>#</th><th>Անուն Ազգանուն</th><th>Բաժին</th><th>Պաշտոն</th>
                  <th>Էլ. Հասցե</th><th>Հեռախոս</th><th>Վիճակ</th><th>Գործողություններ</th>
                </tr>
              </thead>
              <tbody>
                {zarrkvats.map((ash) => (
                  <tr key={ash.id}>
                    <td style={{ color: '#6c63ff', fontWeight: 700 }}>#{ash.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#38bdf8,#6c63ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                          {ash.anun?.[0]}{ash.azganun?.[0]}
                        </div>
                        <span style={{ fontWeight: 600 }}>{ash.anun} {ash.azganun}</span>
                      </div>
                    </td>
                    <td style={{ color: '#94a3b8' }}>{ash.bakhum || '—'}</td>
                    <td style={{ color: '#94a3b8' }}>{ash.pashton || '—'}</td>
                    <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{ash.elektronerayin_hasce}</td>
                    <td style={{ color: '#94a3b8' }}>{ash.herakhosahamer || '—'}</td>
                    <td style={{ whiteSpace: 'nowrap' }}><span className={`petakan-nshani ${ash.aktiv ? 'aktiv-nshani' : 'voktiv-nshani'}`}>{ash.aktiv ? 'Ակտիվ' : 'Ոչ ակտիվ'}</span></td>
                    <td>
                      <div className="gortsolutyunneri-shor">
                        <button className="kochumn-knop tarmarkutyan-knop patan-knop" style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.15)', borderColor: 'rgba(139, 92, 246, 0.3)' }} title="Դիտել" onClick={() => { setXmbagrvogAshkhatakits(ash); setIsViewMode(true); setModalBatsKa(true); }} id={`ditel-ash-${ash.id}`}><Eye size={16} /></button>
                        <button className="kochumn-knop tarmarkutyan-knop patan-knop" title="Խմբագրել" onClick={() => { setXmbagrvogAshkhatakits(ash); setIsViewMode(false); setModalBatsKa(true); }} id={`xmbagrel-ash-${ash.id}`}><Pencil size={16} /></button>
                        <button className="kochumn-knop jnjelu-knop patan-knop" title="Ջնջել" onClick={() => { setJnjvogId(ash.id); setJnjelModalBatsKa(true); }} id={`jnjel-ash-${ash.id}`}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <AshkhatakitsModal isOpen={modalBatsKa} onClose={() => { setModalBatsKa(false); setXmbagrvogAshkhatakits(null); setIsViewMode(false); }}
        xmbagrvogAshkhatakits={xmbagrvogAshkhatakits} onSubmit={pahanelAshkhatakits} isViewMode={isViewMode} />
      <DeleteModal isOpen={jnjelModalBatsKa} onClose={() => setJnjelModalBatsKa(false)}
        title="Վստա՞հ եք, որ ուզում եք ջնջել այս աշխատակցին։"
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
