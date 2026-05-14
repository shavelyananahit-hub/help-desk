// Dashboard — Vahanak (Վahanak)
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
          ntsaghikTiketer: tiketer.filter(t => t.kargavichak === 'Ընthatsik' || t.kargavichak === 'Ntsaghik').length,
          pakvatsTiketer: tiketer.filter(t => t.kargavichak === 'Pakvats' || t.kargavichak === 'Փакватs').length,
          bololAshkhatakitsner: ashkhatakitsPataskhan.qanak || 0,
          akardatsvatsTsanusatsurnner: tsanusatsurnner.filter(ts => !ts.kardatsvatsd).length,
        });
        setVerjinTiketer(tiketer.slice(0, 5));
        setVerjinTsanusatsurnner(tsanusatsurnner.slice(0, 4));
      } catch (e) {
        console.error('Vichakagirner berelis skhalt:', e);
      } finally {
        setBarcracumKa(false);
      }
    }
    bererTvyalner();
  }, []);

  const kargnishGuyner = { 'Ĉatsr': 'kanach', 'Ìijin': 'deghin', 'Bardzr': 'karmir', 'Ĉatsr': 'kanach' };
  const kargavichakGuyner = { 'Вас': 'bac', 'Bас': 'bac', 'Ntsaghik': 'ntsaghik', 'Pakvats': 'pakvats' };

  return (
    <>
      <Head>
        <title>Vahanak — Help Desk Karavarum</title>
        <meta name="description" content="Help Desk Karavarum Hamakarg — Hsnakan Vahanak" />
      </Head>
      <main className="hastsumnayin-kartik">
        <div className="ejhakutyunayin-bnagir">
          <div>
            <h1 className="ejhakutyunayin-anagir">📊 Vahanak</h1>
            <p className="ejhakutyunayin-nkaragrutyun">Help Desk Karavarum Hamakarg — Hsnakan Ararkogh</p>
          </div>
        </div>

        {barcracumKa ? (
          <div className="barcracum-vichak">
            <div className="barcracum-shrjanag" />
            <span>Tvyalner-y bercvum en...</span>
          </div>
        ) : (
          <>
            {/* Vichakagri Karteр */}
            <div className="vichakagiri-vankuyk">
              <div className="vichakagiri-bak kapuyt">
                <div className="vichakagiri-nshanakum">👥</div>
                <div className="vichakagiri-hamara">{vichakagirner.bololOgtaterneр}</div>
                <div className="vichakagiri-patiakner">Bolor Ogtaterneр</div>
              </div>
              <div className="vichakagiri-bak kanach">
                <div className="vichakagiri-nshanakum">🎫</div>
                <div className="vichakagiri-hamara">{vichakagirner.bacTiketer}</div>
                <div className="vichakagiri-patiakner">Bac Tiketer</div>
              </div>
              <div className="vichakagiri-bak deghin">
                <div className="vichakagiri-nshanakum">⏳</div>
                <div className="vichakagiri-hamara">{vichakagirner.ntsaghikTiketer}</div>
                <div className="vichakagiri-patiakner">Ntsaghik Tiketer</div>
              </div>
              <div className="vichakagiri-bak karmir">
                <div className="vichakagiri-nshanakum">✅</div>
                <div className="vichakagiri-hamara">{vichakagirner.pakvatsTiketer}</div>
                <div className="vichakagiri-patiakner">Pakvats Tiketer</div>
              </div>
              <div className="vichakagiri-bak">
                <div className="vichakagiri-nshanakum">👨‍💼</div>
                <div className="vichakagiri-hamara">{vichakagirner.bololAshkhatakitsner}</div>
                <div className="vichakagiri-patiakner">Ashkhatakitsner</div>
              </div>
              <div className="vichakagiri-bak karmir">
                <div className="vichakagiri-nshanakum">🔔</div>
                <div className="vichakagiri-hamara">{vichakagirner.akardatsvatsTsanusatsurnner}</div>
                <div className="vichakagiri-patiakner">Akardatsvatsvats Tsanusatsurnner</div>
              </div>
            </div>

            {/* 2 Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

              {/* Verjin Tiketer */}
              <div className="ashkhatanoc-bak">
                <div style={{ padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0ff' }}>🎫 Verjin Tiketer</h2>
                  <Link href="/tiketer" style={{ fontSize: '0.85rem', color: '#6c63ff', textDecoration: 'none' }}>Boloры tеsel →</Link>
                </div>
                {verjinTiketer.length === 0 ? (
                  <div className="datark-vichak"><div className="datark-nshani">🎫</div><p className="datark-anagir">Tiketer chkan</p></div>
                ) : (
                  <div style={{ padding: 8 }}>
                    {verjinTiketer.map((tiket) => (
                      <div key={tiket.id} style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 4, background: 'rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            #{tiket.id} {tiket.vernagir}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: 2 }}>
                            {tiket.steghtsoghogtater ? `${tiket.steghtsoghogtater.anun} ${tiket.steghtsoghogtater.azganun}` : 'Anhandznarkvats'}
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
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0ff' }}>🔔 Verjin Tsanusatsurnner</h2>
                  <Link href="/tsanusatsurnner" style={{ fontSize: '0.85rem', color: '#6c63ff', textDecoration: 'none' }}>Boloры tеsel →</Link>
                </div>
                {verjinTsanusatsurnner.length === 0 ? (
                  <div className="datark-vichak"><div className="datark-nshani">🔔</div><p className="datark-anagir">Tsanusatsurnner chkan</p></div>
                ) : (
                  <div style={{ padding: 8 }}>
                    {verjinTsanusatsurnner.map((ts) => (
                      <div key={ts.id} style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 4, background: ts.kardatsvatsd ? 'rgba(255,255,255,0.02)' : 'rgba(108,99,255,0.08)', borderLeft: ts.kardatsvatsd ? 'none' : '3px solid #6c63ff', opacity: ts.kardatsvatsd ? 0.6 : 1 }}>
                        <div style={{ fontSize: '0.88rem', color: '#f0f0ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {ts.haghordagutyun}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 4 }}>
                          {ts.stacoghogtater ? `${ts.stacoghogtater.anun} ${ts.stacoghogtater.azganun}` : '—'}
                          {ts.kardatsvatsd ? ' · ✅ Kardatsvatsvats' : ' · 📭 Akardatsvatsvats'}
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
