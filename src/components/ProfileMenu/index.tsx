'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { profileLinks } from '@/routes';
import Loading from '@/components/Loading';
import styles from './ProfileMenu.module.css';

interface ProfileMenuProps {
  className?: string;
  isLinkClicked: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ className, isLinkClicked }) => {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const t = useTranslations('profile.menuLinks');
  const pathName = usePathname();
  const hideMenu = searchParams.get('hideMenu') === 'true';
  if (hideMenu) return null;

  return (
    <div className={`${styles.profileMenu} ${className}`}>
      <div className={styles.profileInfo}>
        {status === 'loading' ? (
          <Loading className={styles.loaddingProfilePicture} />
        ) : (
          <Link href="/personal_account/">
            <div className={styles.profilePhoto}>
              <Image src="/icons/Person.svg" width={24} height={24} alt="profile photo" />
            </div>
            <div>{`${session?.user?.name} ${session?.user?.surname}`}</div>
          </Link>
        )}
      </div>

      <ul className={styles.menuList}>
        {profileLinks.map(({
          path, label, icon, id
        }) => {
          const isExit = id === 4;
          const cleanPath = path.replace(/\/$/, '');
          const isActive = pathName.startsWith(cleanPath);
          return (
            <li key={id} className={styles.menuItem}>
              <Link
                href={isExit ? `${path}?hideMenu=true` : path}
                className={clsx({ [styles.active]: isActive })}
                onClick={isLinkClicked}
              >
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
