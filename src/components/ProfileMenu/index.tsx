'use client';

import React, { useState, Suspense } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { profileLinks } from '@/routes';

import Loading from '@/components/Loading';
import SignOut from '@/../public/icons/SignOut.svg';
import { AppRoutes } from '@/constants/routes';
import styles from './ProfileMenu.module.css';

// import Orders from '@/../public/icons/Orders.svg';
// import OrdersWhite from '@/../public/icons/OrdersWhite.svg';
// import EditData from '@/../public/icons/EditData.svg';
// import EditDataWhite from '@/../public/icons/EditDataWhite.svg';

interface ProfileMenuProps {
  menuData: string[] | undefined;
  className?: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ menuData, className }) => {
  const session = useSession();
  const locale = useLocale();
  const t = useTranslations('profile.menuLinks');

  const [favouritesHover, setFavouritesHover] = useState(false);
  const [OrdersHover, setOrdersHover] = useState(false);
  const [editDataHover, setEditDataHover] = useState(false);
  const [ExitHover, setExitHover] = useState(false);

  return (
    <div className={`${styles.profileMenu} ${className}`}>
      <div className={styles.profileInfo}>
        {/* <Loading /> */}
        {session.status === 'loading' ? (
          <Loading className={styles.loaddingProfilePicture} />
        ) : (
          <Link href={`${window.location.origin}/${locale}/personal_account/`}>
            <div className={styles.profilePhoto}>{`${session && session.data?.user.name[0]}`}</div>
            <div>{`${session && session.data?.user.name} ${session && session.data?.user.surname}`}</div>
          </Link>
        )}
      </div>

      <ul className={styles.menuList}>
        {profileLinks.map(({ path, label, icon, id }) => {
          return (
            <li key={id} className={styles.menuItem}>
              <Link
                href={path}
                onMouseEnter={() => setOrdersHover(true)}
                onMouseLeave={() => setOrdersHover(false)}
              >
                <img src={icon} alt="image" />
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
