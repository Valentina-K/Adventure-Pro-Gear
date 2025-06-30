import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import ProfileMenu from '@/components/ProfileMenu';
import { AppRoutes } from '@/constants/routes';
import { Link, usePathname } from '@/i18n/routing';
import styles from './DropDown.module.css';

interface DropDownProps {
  isLinkClicked: () => void;
  personalAccount?: string;
  className?: string;
}

const DropDown: React.FC<DropDownProps> = ({ className, isLinkClicked }) => {
  const { data: session } = useSession();
  const locale = useLocale();
  const path = usePathname();
  const t = useTranslations('auth');

  return (
    <div className={`${className} ${styles.dropDown}`}>
      <span className={clsx({ [styles.dropdownSpan]: session })}> </span>
      {(session && session?.error !== 'RefreshAccessTokenError') ? (
        <ProfileMenu className={styles.profileMenu} isLinkClicked={isLinkClicked} />
      ) : (
        <ul>
          <li>
            <Link href={`${path}${AppRoutes.SIGNIN}`} scroll={false} onClick={isLinkClicked}>
              {t('login.title')}
            </Link>
          </li>
          <li>
            <Link href={`${path}${AppRoutes.SIGN_UP}`} scroll={false} onClick={isLinkClicked}>
              {t('registration.title')}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropDown;
