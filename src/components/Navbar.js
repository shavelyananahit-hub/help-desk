// Navbar — Նավիգացիայի Բար (Navigation Bar)
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { BarChart3, Users, Briefcase, Bell, Target, Ticket } from 'lucide-react';
import styles from './Navbar.module.css';

// Նավիգացիայի կետեր (Navigation items)
const navKeteр = [
  { href: '/', anagir: 'Գլխավոր էջ', nshani: <BarChart3 size={18} />, id: 'nav-vahanak' },
  { href: '/ogtaterner', anagir: 'Օգտատերեր', nshani: <Users size={18} />, id: 'nav-ogtaterner' },
  { href: '/tiketer', anagir: 'Տոմսեր', nshani: <Ticket size={18} />, id: 'nav-tiketer' },
  { href: '/ashkhatakitsner', anagir: 'Աշխատակիցներ', nshani: <Briefcase size={18} />, id: 'nav-ashkhatakitsner' },
  { href: '/tsanusatsurnner', anagir: 'Ծանուցումներ', nshani: <Bell size={18} />, id: 'nav-tsanusatsurnner' },
];

export default function Navbar() {
  const router = useRouter();
  const [batsNavAktiv, setBatsNavAktiv] = useState(false);
  const [tsanusatsuрniQanak, setTsanusatsuрniQanak] = useState(0);

  useEffect(() => {
    // Ստուganl չկարդացված tsanusatsurnner (Fetch unread notifications count)
    async function bererTsanusatsurnQanak() {
      try {
        const pataskhan = await fetch('/api/tsanusatsurnner?kardatsvatsd=false');
        const tvyalner = await pataskhan.json();
        if (tvyalner.հաջողություն) setTsanusatsuрniQanak(tvyalner.qanak);
      } catch (e) {
        // Հանգիստ
      }
    }
    bererTsanusatsurnQanak();
  }, [router.pathname]);

  const arkaKochum = () => setBatsNavAktiv(false);

  return (
    <nav className={styles.navbar} id="hsnakan-navbar">
      <div className={styles.navbarKartik}>
        {/* Նշանակ */}
        <Link href="/" className={styles.navbarNshaniPink} id="navbar-logo">
          <span className={styles.navbarNshaniNkar}>
            <Target size={28} strokeWidth={2.5} color="#a855f7" />
          </span>
          <span className={styles.navbarAnagir}>
            <span className={styles.navbarAnagirHsnakan}>Աջակցության</span>
            <span className={styles.navbarAnagirBnagitseri}>Կենտրոն</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.navbarKapakner} id="navbar-desktop-links">
          {navKeteр.map((ket) => {
            const aktiv = router.pathname === ket.href;
            return (
              <Link
                key={ket.href}
                href={ket.href}
                className={`${styles.navbarKapal} ${aktiv ? styles.aktiv : ''}`}
                id={ket.id}
              >
                <span className={styles.navbarKapalNshani}>{ket.nshani}</span>
                <span>{ket.anagir}</span>
                {ket.href === '/tsanusatsurnner' && tsanusatsuрniQanak > 0 && (
                  <span className={styles.tsanusatsurnHamaraNshani}>{tsanusatsuрniQanak}</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Burger */}
        <button
          className={`${styles.burgerKnop} ${batsNavAktiv ? styles.aktiv : ''}`}
          onClick={() => setBatsNavAktiv(!batsNavAktiv)}
          id="burger-knop"
          aria-label="Ցույց տալ մենյուն"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {batsNavAktiv && (
        <div className={styles.mobileMenyu} id="mobile-menyu">
          {navKeteр.map((ket) => {
            const aktiv = router.pathname === ket.href;
            return (
              <Link
                key={ket.href}
                href={ket.href}
                className={`${styles.mobileKapal} ${aktiv ? styles.aktiv : ''}`}
                onClick={arkaKochum}
                id={`mobile-${ket.id}`}
              >
                <span>{ket.nshani}</span>
                <span>{ket.anagir}</span>
                {ket.href === '/tsanusatsurnner' && tsanusatsuрniQanak > 0 && (
                  <span className={styles.tsanusatsurnHamaraNshani}>{tsanusatsuрniQanak}</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
