'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import arrowsLeft from '@/../public/icons/Arrows.svg';
import homeIcon from '@/../public/icons/home.svg';
import styles from './Navigation.module.css';

function Navigation({ navigationPage, title }: { navigationPage?: string; title?: string }) {
  const router = useRouter();
  const handleRedirectHomeClick = () => {
    router.push('/');
  };
  const handleRedirectNavigationPageClick = () => {
    // eslint-disable-next-line no-unused-expressions
    title ? router.back() : '';
  };

  return (
    <div className={styles.about_navigation_container}>
      <Image
        src={homeIcon}
        alt="home Icon"
        width={24}
        height={24}
        className={styles.homeIcon}
        onClick={handleRedirectHomeClick}
      />
      <Image
        src={arrowsLeft}
        alt="arrows Left"
        width={20}
        height={20}
        className={`${styles.about_navigation_img} ${title ? styles.title_navigation : ''}`}
      />

      <p
        className={`${styles.about_navigation} ${title ? styles.title_navigation : ''}`}
        onClick={handleRedirectNavigationPageClick}
      >
        {navigationPage}
      </p>
      {title && (
        <>
          <Image
            src={arrowsLeft}
            alt="arrows Left"
            width={20}
            height={20}
            className={styles.about_navigation_img}
          />
          <p className={styles.about_navigation}>{title}</p>
        </>
      )}
    </div>
  );
}

export default Navigation;
