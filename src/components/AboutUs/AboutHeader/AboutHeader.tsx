'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import aboutLogo from '@/../public/images/about/aboutLogo.svg';
import homeIcon from '@/../public/icons/home.svg';
import scrollUp from '@/../public/icons/scrollUp.svg';
import arrowsLeft from '@/../public/icons/Arrows.svg';
import styles from './AboutHeader.module.css';

function AboutHeader() {
  const { push } = useRouter();
  const handleRedirectHomeClick = () => {
    push('/');
  };

  return (
    <div className={styles.about}>
      <Container>
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
            className={styles.about_navigation_img}
          />
          <p className={styles.about_navigation}>Про нас</p>
        </div>
        <div className={styles.about_container}>
          <p className={styles.descr_overtext}>Ласкаво просимо до</p>
          <Image
            src={aboutLogo}
            alt="logo"
            width={0}
            height={320}
            // style={{ maxWidth: '100%' }}
            className={styles.about_logo}
          />
          <p className={styles.descr_subtext}>
            вашого надійного партнера у світі туристичного спорядження!
          </p>
          <div className={styles.about_navigation_scrollUp}>
            <Image src={scrollUp} alt="scroll Up" width={46} height={46} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AboutHeader;
