// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslations } from 'next-intl';
import { HeaderProps } from '@/types';
import clsx from 'clsx';
import { navLinks } from '@/routes';
import { Link, usePathname } from '@/i18n/routing';
import LangLinks from './LangLinks';
import styles from '../Header.module.css';

const NavList: React.FC<HeaderProps> = ({ setToggleCatalog }) => {
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
