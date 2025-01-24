'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import arrowsLeft from '@/../public/icons/Arrows.svg';
import homeIcon from '@/../public/icons/home.svg';
import styles from './Navigation.module.css';
import Loading from '../Loading';

function Navigation({
  navigationPage,
  title,
  productName,
}: {
  navigationPage?: string;
  title?: string;
  productName?: string;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);

  const pathArray = pathName.split('/');
  const filteredArray = pathArray.filter(element => element !== '');

  const handleRedirectHomeClick = () => {
    router.push(`/${filteredArray[0]}/`);
    setLoading(prev => !prev);
  };
console.log(filteredArray);

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

      <Link
        href={`/${filteredArray[0]}/${filteredArray[1]}/`}
        className={`${styles.about_navigation} ${!title ? styles.title_navigation : ''}`}
      >
        {filteredArray[0] === 'uk-UA'
          ? productName || navigationPage
          : productName || filteredArray[1].replace('_', ' ')}
      </Link>

      {title && (
        <>
          <Image
            src={arrowsLeft}
            alt="arrows Left"
            width={20}
            height={20}
            className={styles.about_navigation_img}
          />
          <p className={`${styles.about_navigation} ${styles.title_navigation}`}>{title}</p>
        </>
      )}
      {loading && <Loading />}
    </div>
  );
}

export default Navigation;
