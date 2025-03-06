import React from 'react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import logoImage from '@/../public/logo.svg';
import { AppRoutes } from '@/constants/routes';
import NavList from './NavList';
import styles from '../Header.module.css';

const NavBar: React.FC = () => {
  const locale = useLocale();
  return (
    <nav className={styles.nav}>
      <Link href={`${AppRoutes.HOME}`} className={styles.logo}>
        <Image src={logoImage} height={75} width={258} alt="logo" />
      </Link>

      <NavList />
    </nav>
  );
};

export default NavBar;
