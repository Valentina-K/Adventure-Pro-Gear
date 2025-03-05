'use client';

import React, { useState, Suspense } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { profileLinks } from '@/routes';

import Loading from '@/components/Loading';
import Image from 'next/image';
import SignOut from '@/../public/icons/SignOut.svg';
import { AppRoutes } from '@/constants/routes';
import styles from './ProfileMenu.module.css';

// import Orders from '@/../public/icons/Orders.svg';
// import OrdersWhite from '@/../public/icons/OrdersWhite.svg';
// import EditData from '@/../public/icons/EditData.svg';
// import EditDataWhite from '@/../public/icons/EditDataWhite.svg';

interface ProfileMenuProps {
  className?: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ className }) => {
  const { data: session, status } = useSession();
  const locale = useLocale();
  const t = useTranslations('profile.menuLinks');

  return (
    <div className={`${styles.profileMenu} ${className}`}>
      <div className={styles.profileInfo}>
        {/* <Loading /> */}
        {status === 'loading' ? (
          <Loading className={styles.loaddingProfilePicture} />
        ) : (
          <Link href="/personal_account/">
            <div className={styles.profilePhoto}>{`${session?.user?.name[0]}`}</div>
            <div>{`${session?.user?.name} ${session?.user?.surname}`}</div>
          </Link>
        )}
      </div>

      <ul className={styles.menuList}>
        {profileLinks.map(({ path, label, icon, id }) => {
          return (
            <li key={id} className={styles.menuItem}>
              <Link href={path}>
                <Image src={icon} width={24} height={24} alt="some icon" />
                {t(label)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfileMenu;
