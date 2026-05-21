// Dashboard — Vahanak (Վահանակ)
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Vahanak() {
  const [vichakagirner, setVichakagirner] = useState({
    bololOgtaterneр: 0,
    bololTiketer: 0,
    bacTiketer: 0,
    ntsaghikTiketer: 0,
    pakvatsTiketer: 0,
    bololAshkhatakitsner: 0,
    akardatsvatsTsanusatsurnner: 0,
  });
  const [verjinTiketer, setVerjinTiketer] = useState([]);
  const [verjinTsanusatsurnner, setVerjinTsanusatsurnner] = useState([]);
  const [barcracumKa, setBarcracumKa] = useState(true);

  useEffect(() => {
    async function bererTvyalner() {
      try {
        const [ogtaterPataskhan, tiketPataskhan, ashkhatakitsPataskhan, tsanusatsurnPataskhan] = await Promise.all([
          fetch('/api/ogtaterner').then(r => r.json()),
          fetch('/api/tiketer').then(r => r.json()),
          fetch('/api/ashkhatakitsner').then(r => r.json()),
          fetch('/api/tsanusatsurnner').then(r => r.json()),
        ]);

        const tiketer = tiketPataskhan.tvyalner || [];
        const tsanusatsurnner = tsanusatsurnPataskhan.tvyalner || [];

        setVichakagirner({
          bololOgtaterneр: ogtaterPataskhan.qanak || 0,
          bololTiketer: tiketer.length,
          bacTiketer: tiketer.filter(t => t.kargavichak === 'Բաց').length,
          ntsaghikTiketer: tiketer.filter(t => t.kargavichak === 'Ընthatsik' || t.kargavichak === 'Ընթացիկ').length,
          pakvatsTiketer: tiketer.filter(t => t.kargavichak === 'Փակված' || t.kargavichak === 'Փակված').length,
          bololAshkhatakitsner: ashkhatakitsPataskhan.qanak || 0,
          akardatsvatsTsanusatsurnner: tsanusatsurnner.filter(ts => !ts.kardatsvatsd).length,
        });
        setVerjinTiketer(tiketer.slice(0, 5));
        setVerjinTsanusatsurnner(tsanusatsurnner.slice(0, 4));
      } catch (e) {
        console.error('Vichakagirner berelis սխալ:', e);
      } finally {
        setBarcracumKa(false);
      }
    }
    bererTvyalner();
  }, []);

  const kargnishGuyner = { 'Ցածր': 'kanach', 'Միջին': 'deghin', 'Բարձր': 'karmir', 'Ցածր': 'kanach' };
  const kargavichakGuyner = { 'Вас': 'bac', 'Բաց': 'bac', 'Ընթացիկ': 'ntsaghik', 'Փակված': 'pakvats' };

  return (
    <>
      <Head>
        <title>Վահանակ — Աջակցության Կենտրոնի Կառավարում</title>
        <meta name="description" content="Աջակցության Կենտրոնի Կառավարման Համակարգ — Գլխավոր Վահանակ" />
      </Head>
      <main className="hastsumnayin-kartik">
        <div className="ejhakutyunayin-bnagir">
          <div>
            <h1 className="ejhakutyunayin-anagir">📊 Վահանակ</h1>
            <p className="ejhakutyunayin-nkaragrutyun">Աջակցության Կենտրոնի Կառավարման Համակարգ — Գլխավոր</p>
          </div>
        </div>

        {barcracumKa ? (
          <div className="barcracum-vichak">
            <div className="barcracum-shrjanag" />
            <span>Տվյալները բեռնվում են...</span>
          </div>
        ) : (
          <>
            {/* Vichakagri Karteр */}
            <div className="vichakagiri-vankuyk">
              <div className="vichakagiri-bak kapuyt">
                <div className="vichakagiri-nshanakum">👥</div>
                <div className="vichakagiri-hamara">{vichakagirner.bololOgtaterneр}</div>
                <div className="vichakagiri-patiakner">Բոլոր Օգտատերերը</div>
              </div>
              <div className="vichakagiri-bak kanach">
                <div className="vichakagiri-nshanakum">🎫</div>
                <div className="vichakagiri-hamara">{vichakagirner.bacTiketer}</div>
                <div className="vichakagiri-patiakner">Բաց Տոմսեր</div>
              </div>
              <div className="vichakagiri-bak deghin">
                <div className="vichakagiri-nshanakum">⏳</div>
                <div className="vichakagiri-hamara">{vichakagirner.ntsaghikTiketer}</div>
                <div className="vichakagiri-patiakner">Ընթացիկ Տոմսեր</div>
              </div>
              <div className="vichakagiri-bak karmir">
                <div className="vichakagiri-nshanakum">✅</div>
                <div className="vichakagiri-hamara">{vichakagirner.pakvatsTiketer}</div>
                <div className="vichakagiri-patiakner">Փակված Տոմսեր</div>
              </div>
              <div className="vichakagiri-bak">
                <div className="vichakagiri-nshanakum">👨‍💼</div>
                <div className="vichakagiri-hamara">{vichakagirner.bololAshkhatakitsner}</div>
                <div className="vichakagiri-patiakner">Աշխատակիցներ</div>
              </div>
              <div className="vichakagiri-bak karmir">
                <div className="vichakagiri-nshanakum">🔔</div>
                <div className="vichakagiri-hamara">{vichakagirner.akardatsvatsTsanusatsurnner}</div>
                <div className="vichakagiri-patiakner">Չկարդացված Ծանուցումներ</div>
              </div>
            </div>

            {/* 2 Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

              {/* Verjin Tiketer */}
              <div className="ashkhatanoc-bak">
                <div style={{ padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0ff' }}>🎫 Վերջին Տոմսեր</h2>
                  <Link href="/tiketer" style={{ fontSize: '0.85rem', color: '#6c63ff', textDecoration: 'none' }}>Բոլորը տեսնել →</Link>
                </div>
                {verjinTiketer.length === 0 ? (
                  <div className="datark-vichak"><div className="datark-nshani">🎫</div><p className="datark-anagir">Տոմսեր չկան</p></div>
                ) : (
                  <div style={{ padding: 8 }}>
                    {verjinTiketer.map((tiket) => (
                      <div key={tiket.id} style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 4, background: 'rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            #{tiket.id} {tiket.vernagir}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 2 }}>
                            {tiket.steghtsoghogtater ? `${tiket.steghtsoghogtater.anun} ${tiket.steghtsoghogtater.azganun}` : 'Չհանձնված'}
                          </div>
                        </div>
                        <span className={`petakan-nshani ${kargavichakGuyner[tiket.kargavichak] || 'bac'}`} style={{ flexShrink: 0 }}>
                          {tiket.kargavichak}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Verjin Tsanusatsurnner */}
              <div className="ashkhatanoc-bak">
                <div style={{ padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0ff' }}>🔔 Վերջին Ծանուցումներ</h2>
                  <Link href="/tsanusatsurnner" style={{ fontSize: '0.85rem', color: '#6c63ff', textDecoration: 'none' }}>Բոլորը տեսնել →</Link>
                </div>
                {verjinTsanusatsurnner.length === 0 ? (
                  <div className="datark-vichak"><div className="datark-nshani">🔔</div><p className="datark-anagir">Ծանուցումներ չկան</p></div>
                ) : (
                  <div style={{ padding: 8 }}>
                    {verjinTsanusatsurnner.map((ts) => (
                      <div key={ts.id} style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 4, background: ts.kardatsvatsd ? 'rgba(255,255,255,0.02)' : 'rgba(108,99,255,0.08)', borderLeft: ts.kardatsvatsd ? 'none' : '3px solid #6c63ff', opacity: ts.kardatsvatsd ? 0.6 : 1 }}>
                        <div style={{ fontSize: '0.88rem', color: '#f0f0ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {ts.haghordagutyun}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 4 }}>
                          {ts.stacoghogtater ? `${ts.stacoghogtater.anun} ${ts.stacoghogtater.azganun}` : '—'}
                          {ts.kardatsvatsd ? ' · ✅ Կարդացված' : ' · 📭 Չկարդացված'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
