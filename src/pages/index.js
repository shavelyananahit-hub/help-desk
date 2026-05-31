// Dashboard — Vahanak (Վահանակ)
import { useState, useEffect } from 'react';
import { BarChart3, Users, Ticket, Hourglass, CheckCircle2, Briefcase, Bell, Mail } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

  const [chartData, setChartData] = useState([]);
  const [chartFilter, setChartFilter] = useState('ամբողջ ժամանակ');
  const [showTickets, setShowTickets] = useState(true);
  const [showUsers, setShowUsers] = useState(true);
  const [showEmployees, setShowEmployees] = useState(true);

  useEffect(() => {
    async function bererTvyalner() {
      try {
        const [ogtaterPataskhan, tiketPataskhan, ashkhatakitsPataskhan, tsanusatsurnPataskhan, statisticsPataskhan] = await Promise.all([
          fetch('/api/ogtaterner').then(r => r.json()),
          fetch('/api/tiketer').then(r => r.json()),
          fetch('/api/ashkhatakitsner').then(r => r.json()),
          fetch('/api/tsanusatsurnner').then(r => r.json()),
          fetch('/api/statistics').then(r => r.json()),
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
        setChartData(statisticsPataskhan.tvyalner || []);
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

  const getFilteredChartData = () => {
    if (!chartData || chartData.length === 0) return [];
    const now = new Date();
    return chartData.filter(item => {
      const itemDate = new Date(item.date);
      const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
      if (chartFilter === 'շաբաթ') return diffDays <= 7;
      if (chartFilter === 'ամիս') return diffDays <= 30;
      if (chartFilter === 'տարի') return diffDays <= 365;
      return true;
    });
  };

  return (
    <>
      <Head>
        <title>Գլխավոր էջ — Աջակցության Կենտրոնի Կառավարում</title>
        <meta name="description" content="Աջակցության Կենտրոնի Կառավարման Համակարգ — Գլխավոր " />
      </Head>
      <main className="hastsumnayin-kartik">
        <div className="ejhakutyunayin-bnagir">
          <div>
            <h1 className="ejhakutyunayin-anagir" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart3 size={28} /> Գլխավոր էջ</h1>
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
              <Link href="/ogtaterner" className="vichakagiri-bak kapuyt vichakagiri-link">
                <div className="vichakagiri-nshanakum"><Users size={28} /></div>
                <div className="vichakagiri-hamara">{vichakagirner.bololOgtaterneр}</div>
                <div className="vichakagiri-patiakner">Բոլոր Օգտատերերը</div>
              </Link>
              <Link href="/tiketer?kargavichak=Բաց" className="vichakagiri-bak kanach vichakagiri-link">
                <div className="vichakagiri-nshanakum"><Ticket size={28} /></div>
                <div className="vichakagiri-hamara">{vichakagirner.bacTiketer}</div>
                <div className="vichakagiri-patiakner">Բաց Տոմսեր</div>
              </Link>
              <Link href="/tiketer?kargavichak=Ընթացիկ" className="vichakagiri-bak deghin vichakagiri-link">
                <div className="vichakagiri-nshanakum"><Hourglass size={28} /></div>
                <div className="vichakagiri-hamara">{vichakagirner.ntsaghikTiketer}</div>
                <div className="vichakagiri-patiakner">Ընթացիկ Տոմսեր</div>
              </Link>
              <Link href="/tiketer?kargavichak=Փակված" className="vichakagiri-bak karmir vichakagiri-link">
                <div className="vichakagiri-nshanakum"><CheckCircle2 size={28} /></div>
                <div className="vichakagiri-hamara">{vichakagirner.pakvatsTiketer}</div>
                <div className="vichakagiri-patiakner">Փակված Տոմսեր</div>
              </Link>
              <Link href="/ashkhatakitsner" className="vichakagiri-bak vichakagiri-link">
                <div className="vichakagiri-nshanakum"><Briefcase size={28} /></div>
                <div className="vichakagiri-hamara">{vichakagirner.bololAshkhatakitsner}</div>
                <div className="vichakagiri-patiakner">Աշխատակիցներ</div>
              </Link>
              <Link href="/tsanusatsurnner?kardatsvatsd=false" className="vichakagiri-bak karmir vichakagiri-link">
                <div className="vichakagiri-nshanakum"><Bell size={28} /></div>
                <div className="vichakagiri-hamara">{vichakagirner.akardatsvatsTsanusatsurnner}</div>
                <div className="vichakagiri-patiakner">Չկարդացված Ծանուցումներ</div>
              </Link>
            </div>

            {/* Chart Section */}
            <div className="ashkhatanoc-bak" style={{ padding: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f0f0ff', display: 'flex', alignItems: 'center', gap: 8 }}><BarChart3 size={24} /> Վիճակագրություն</h2>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['շաբաթ', 'ամիս', 'տարի', 'ամբողջ ժամանակ'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setChartFilter(filter)}
                      style={{
                        background: chartFilter === filter ? 'rgba(232, 28, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        border: `1px solid ${chartFilter === filter ? '#e81cff' : 'transparent'}`,
                        color: chartFilter === filter ? '#e81cff' : '#94a3b8',
                        padding: '6px 12px',
                        borderRadius: 20,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <AreaChart data={getFilteredChartData()} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#e81cff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#e81cff" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a200ff" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#a200ff" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEmployees" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff5cb3" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ff5cb3" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e1e2f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                      itemStyle={{ color: '#f0f0ff' }}
                    />
                    {showTickets && <Area type="monotone" dataKey="tickets_count" name="Տոմսեր" stroke="#e81cff" fillOpacity={1} fill="url(#colorTickets)" />}
                    {showUsers && <Area type="monotone" dataKey="users_count" name="Օգտատերեր" stroke="#a200ff" fillOpacity={1} fill="url(#colorUsers)" />}
                    {showEmployees && <Area type="monotone" dataKey="employees_count" name="Աշխատակիցներ" stroke="#ff5cb3" fillOpacity={1} fill="url(#colorEmployees)" />}
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f0f0ff', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={showTickets} onChange={(e) => setShowTickets(e.target.checked)} style={{ accentColor: '#e81cff', width: 16, height: 16 }} />
                  <span style={{ color: '#e81cff' }}>Տոմսեր</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f0f0ff', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={showUsers} onChange={(e) => setShowUsers(e.target.checked)} style={{ accentColor: '#a200ff', width: 16, height: 16 }} />
                  <span style={{ color: '#a200ff' }}>Օգտատերեր</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f0f0ff', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input type="checkbox" checked={showEmployees} onChange={(e) => setShowEmployees(e.target.checked)} style={{ accentColor: '#ff5cb3', width: 16, height: 16 }} />
                  <span style={{ color: '#ff5cb3' }}>Աշխատակիցներ</span>
                </label>
              </div>
            </div>

            {/* 2 Column Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

              {/* Verjin Tiketer */}
              <div className="ashkhatanoc-bak">
                <div style={{ padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0ff', display: 'flex', alignItems: 'center', gap: '6px' }}><Ticket size={20} /> Վերջին Տոմսեր</h2>
                  <Link href="/tiketer" style={{ fontSize: '0.85rem', color: '#b963ffff', textDecoration: 'none' }}>Բոլորը տեսնել →</Link>
                </div>
                {verjinTiketer.length === 0 ? (
                  <div className="datark-vichak"><div className="datark-nshani"><Ticket size={40} /></div><p className="datark-anagir">Տոմսեր չկան</p></div>
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
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f0f0ff', display: 'flex', alignItems: 'center', gap: '6px' }}><Bell size={20} /> Վերջին Ծանուցումներ</h2>
                  <Link href="/tsanusatsurnner" style={{ fontSize: '0.85rem', color: '#b963ffff', textDecoration: 'none' }}>Բոլորը տեսնել →</Link>
                </div>
                {verjinTsanusatsurnner.length === 0 ? (
                  <div className="datark-vichak"><div className="datark-nshani"><Bell size={40} /></div><p className="datark-anagir">Ծանուցումներ չկան</p></div>
                ) : (
                  <div style={{ padding: 8 }}>
                    {verjinTsanusatsurnner.map((ts) => (
                      <div key={ts.id} style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 4, background: ts.kardatsvatsd ? 'rgba(255,255,255,0.02)' : 'rgba(108,99,255,0.08)', borderLeft: ts.kardatsvatsd ? 'none' : '3px solid #6c63ff', opacity: ts.kardatsvatsd ? 0.6 : 1 }}>
                        <div style={{ fontSize: '0.88rem', color: '#f0f0ff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {ts.haghordagutyun}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 4 }}>
                          {ts.stacoghogtater ? `${ts.stacoghogtater.anun} ${ts.stacoghogtater.azganun}` : '—'}
                          {ts.kardatsvatsd ? <><CheckCircle2 size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6, marginRight: 2 }} /> Կարդացված</> : <><Mail size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 6, marginRight: 2 }} /> Չկարդացված</>}
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
