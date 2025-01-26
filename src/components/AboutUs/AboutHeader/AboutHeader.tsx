import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation/Navigation';
import Container from '@/components/Container';
import aboutLogo from '@/../public/images/about/aboutLogo.svg';
import scrollUp from '@/../public/icons/scrollUp.svg';
import styles from './AboutHeader.module.css';

function AboutHeader() {
  return (
    <div className={styles.about}>
      <Container>
        <Navigation navigationPage="Про нас" />
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
