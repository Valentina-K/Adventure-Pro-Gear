import React from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import logoImage from '@/../public/logo.svg';
import NavList from './NavList';
import styles from '../Header.module.css';
import { AppRoutes } from '@/constants/routes';

const NavBar: React.FC = () => (
  <nav className={styles.nav}>
    <Link href={`/${locale}${AppRoutes.HOME}`} className={styles.logo}>
      <Image src={logoImage} height={75} width={258} alt="logo" />
    </Link>

    <NavList />
  </nav>
);

export default NavBar;
