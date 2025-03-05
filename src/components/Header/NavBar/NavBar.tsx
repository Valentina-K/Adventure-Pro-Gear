import { HeaderProps } from '@/types';
import React from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import logoImage from '@/../public/logo.svg';
import NavList from './NavList';
import styles from '../Header.module.css';

const NavBar: React.FC<HeaderProps> = ({ setToggleCatalog }) => (
  <nav className={styles.nav}>
    <Link href="/" className={styles.logo}>
      <Image src={logoImage} height={75} width={258} alt="logo" />
    </Link>

    <NavList setToggleCatalog={setToggleCatalog} />
  </nav>
);

export default NavBar;
