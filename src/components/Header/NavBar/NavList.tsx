import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { navLinks } from '@/routes';
import { Link, usePathname } from '@/i18n/routing';
import LangLinks from './LangLinks';
import styles from '../Header.module.css';

const NavList = () => {
  const t = useTranslations('nav');
  const pathName = usePathname();

  return (
    <>
      <ul className={styles.navList}>
        {navLinks.map(({ path, label, id }) => {
          return (
            <li className={clsx(styles.navItem)} key={id}>
              <Link
                href={path}
                className={clsx({
                  [styles.active]: pathName !== '/' && pathName === `${path}/`,
                })}
              >
                {t(label)}
              </Link>
            </li>
          );
        })}
      </ul>

      <LangLinks />
    </>
  );
};

export default NavList;
