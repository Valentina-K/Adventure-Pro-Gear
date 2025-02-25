import React, { useEffect, useState } from 'react';
import { AppRoutes } from '@/constants/routes';
import { useLocale, useTranslations } from 'next-intl';

import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { useSession } from 'next-auth/react';
// import { usePathname } from 'next/navigation';
import ProfileMenu from '@/components/ProfileMenu';
import { Link, usePathname } from '@/i18n/routing';
import styles from './DropDown.module.css';

interface DropDownProps {
  isLinkClicked: () => void;
  personalAccount?: string;
  className?: string;
}

interface ProfileTranslations {
  menuData: string[];
}

const DropDown: React.FC<DropDownProps> = ({ className, isLinkClicked }) => {
  const session = useSession();
  const locale = useLocale();
  const path = usePathname();
  const t = useTranslations('auth');

  const [menuDataTranslation, setMenuDataTranslation] = useState<ProfileTranslations | undefined>();

  return (
    <div className={`${className} ${styles.dropDown}`}>
      {session.data ? <span className={styles.dropdownSpan} /> : <span />}
      {session.data ? (
        <ProfileMenu
          menuData={menuDataTranslation && menuDataTranslation.menuData}
          className={styles.profileMenu}
        />
      ) : (
        <ul>
          <li>
            <Link href={`${path}${AppRoutes.SIGNIN}`} onClick={isLinkClicked}>
              {t('login.title')}
            </Link>
          </li>
          <li>
            <Link href={`${path}${AppRoutes.SIGN_UP}`} onClick={isLinkClicked}>
              {t('registration.title')}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropDown;
