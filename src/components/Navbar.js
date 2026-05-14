// Navbar — Նավիգացիայի Բար (Navigation Bar)
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

// Նավիգացիայի կետեր (Navigation items)
const navKeteр = [
  { href: '/', anagir: 'Վahanak', nshani: '📊', id: 'nav-vahanak' },
  { href: '/ogtaterner', anagir: 'Օгtaterneр', nshani: '👥', id: 'nav-ogtaterner' },
  { href: '/tiketer', anagir: 'Тiketer', nshani: '🎫', id: 'nav-tiketer' },
  { href: '/ashkhatakitsner', anagir: 'Аshkhatakitsner', nshani: '👨‍💼', id: 'nav-ashkhatakitsner' },
  { href: '/tsanusatsurnner', anagir: 'Тsanusatsurnner', nshani: '🔔', id: 'nav-tsanusatsurnner' },
];

export default function Navbar() {
  const router = useRouter();
  const [batsNavAktiv, setBatsNavAktiv] = useState(false);
  const [tsanusatsuрniQanak, setTsanusatsuрniQanak] = useState(0);

  useEffect(() => {
    // Ստուganl akardatsvatsvats tsanusatsurnner (Fetch unread notifications count)
    async function bererTsanusatsurnQanak() {
      try {
        const pataskhan = await fetch('/api/tsanusatsurnner?kardatsvatsd=false');
        const tvyalner = await pataskhan.json();
        if (tvyalner.hajalutyun) setTsanusatsuрniQanak(tvyalner.qanak);
      } catch (e) {
        // Հանգիստ
      }
    }
    bererTsanusatsurnQanak();
  }, [router.pathname]);

  const arkaKochum = () => setBatsNavAktiv(false);

  return (
    <>
      <nav className="navbar" id="hsnakan-navbar">
        <div className="navbar-kartik">
          {/* Նшаnak */}
          <Link href="/" className="navbar-nshani-kapuyt" id="navbar-logo">
            <span className="navbar-nshani-nkar">🎯</span>
            <span className="navbar-anagir">
              <span className="navbar-anagir-hsnakan">Help</span>
              <span className="navbar-anagir-bnagitseri">Desk</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar-kapakner" id="navbar-desktop-links">
            {navKeteр.map((ket) => {
              const aktiv = router.pathname === ket.href;
              return (
                <Link
                  key={ket.href}
                  href={ket.href}
                  className={`navbar-kapal ${aktiv ? 'aktiv' : ''}`}
                  id={ket.id}
                >
                  <span className="navbar-kapal-nshani">{ket.nshani}</span>
                  <span>{ket.anagir}</span>
                  {ket.href === '/tsanusatsurnner' && tsanusatsuрniQanak > 0 && (
                    <span className="tsanusatsurn-hamara-nshani">{tsanusatsuрniQanak}</span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Burger */}
          <button
            className={`burger-knop ${batsNavAktiv ? 'aktiv' : ''}`}
            onClick={() => setBatsNavAktiv(!batsNavAktiv)}
            id="burger-knop"
            aria-label="Ցuyts menyu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Menu */}
        {batsNavAktiv && (
          <div className="mobile-menyu" id="mobile-menyu">
            {navKeteр.map((ket) => {
              const aktiv = router.pathname === ket.href;
              return (
                <Link
                  key={ket.href}
                  href={ket.href}
                  className={`mobile-kapal ${aktiv ? 'aktiv' : ''}`}
                  onClick={arkaKochum}
                  id={`mobile-${ket.id}`}
                >
                  <span>{ket.nshani}</span>
                  <span>{ket.anagir}</span>
                  {ket.href === '/tsanusatsurnner' && tsanusatsuрniQanak > 0 && (
                    <span className="tsanusatsurn-hamara-nshani">{tsanusatsuрniQanak}</span>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 500;
          background: rgba(15, 15, 26, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        }
        .navbar-kartik {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .navbar-nshani-kapuyt {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .navbar-nshani-nkar {
          font-size: 1.6rem;
          filter: drop-shadow(0 0 8px rgba(108, 99, 255, 0.6));
        }
        .navbar-anagir {
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.02em;
        }
        .navbar-anagir-hsnakan { color: #f0f0ff; }
        .navbar-anagir-bnagitseri {
          background: linear-gradient(135deg, #6c63ff, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .navbar-kapakner {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .navbar-kapal {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 10px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.25s ease;
          position: relative;
          white-space: nowrap;
        }
        .navbar-kapal:hover {
          color: #f0f0ff;
          background: rgba(255, 255, 255, 0.08);
        }
        .navbar-kapal.aktiv {
          color: #f0f0ff;
          background: rgba(108, 99, 255, 0.2);
        }
        .navbar-kapal.aktiv::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 2px;
          background: linear-gradient(135deg, #6c63ff, #a78bfa);
          border-radius: 999px;
        }
        .navbar-kapal-nshani { font-size: 1rem; }
        .tsanusatsurn-hamara-nshani {
          background: #f43f5e;
          color: white;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 999px;
          min-width: 18px;
          text-align: center;
          line-height: 1.4;
        }
        .burger-knop {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .burger-knop span {
          display: block;
          width: 24px;
          height: 2px;
          background: #94a3b8;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .mobile-menyu {
          display: flex;
          flex-direction: column;
          padding: 12px 20px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          gap: 4px;
        }
        .mobile-kapal {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 10px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .mobile-kapal:hover, .mobile-kapal.aktiv {
          color: #f0f0ff;
          background: rgba(108, 99, 255, 0.15);
        }
        @media (max-width: 900px) {
          .navbar-kapakner { display: none; }
          .burger-knop { display: flex; }
        }
        @media (max-width: 480px) {
          .navbar-anagir { display: none; }
        }
      `}</style>
    </>
  );
}
