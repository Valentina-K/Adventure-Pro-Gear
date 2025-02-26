import { useTranslations } from 'next-intl';

import { navLinks } from '@/routes';
import { Link } from '@/i18n/routing';
import LangLinks from './LangLinks';
import styles from '../Header.module.css';

const NavList = () => {
  const t = useTranslations('nav');

  return (
    <>
      <ul className={styles.navList}>
        {navLinks.map(({ path, label, id }) => {
          if (path) {
            return (
              <li className={styles.navItem} key={id}>
                <Link href={path}>{t(label)}</Link>
              </li>
            );
          }
        })}
      </ul>

      <LangLinks />
    </>
  );
};

export default NavList;
