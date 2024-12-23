import React from 'react';
// import { Locale } from '@/i18n-config';
import Container from '@/components/Container';
import AboutHeader from '@/components/AboutUs/AboutHeader/AboutHeader';
import AboutHero from '@/components/AboutUs/AboutHero/AboutHero';
import AboutCard from '@/components/AboutUs/AboutCard/AboutCard';
import AboutListInfo from '@/components/AboutUs/AboutListInfo/AboutListInfo';
import styles from './aboutUs.module.css';

function AboutUs() {
  return (
    <div>
      {/* {locale === "uk-UA" ? product?.productNameUa : product?.productNameEn} */}
      <AboutHeader />

      <Container>
        <AboutHero />
        <AboutCard />
        <AboutListInfo />

        <div className={styles.img_container}>
          <div className={styles.footer_img} />
          <p className={styles.about_text}>
            Дякуємо за те, що обрали Adventure Pro Gear. Разом ми будемо завоювати нові вершини та
            долати нові шляхи!
          </p>
        </div>
      </Container>
    </div>
  );
}

export default AboutUs;
