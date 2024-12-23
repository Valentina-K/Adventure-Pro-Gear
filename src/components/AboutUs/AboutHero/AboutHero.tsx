import React from 'react';
import Image from 'next/image';
import aboutUsImage from '@/../public/images/about/aboutUs.png';
import styles from './AboutHero.module.css';

function AboutHero() {
  return (
    <ul className={styles.list_hero}>
      <li className={`${styles.item_hero} ${styles.item_hero_text}`}>
        <h3 className={styles.hero_aboutUs}>Про нас</h3>
        <p className={styles.hero_description}>
          Ми - команда ентузіастів, яка об&apos;єднана спільною любов&apos;ю до пригод та активного
          відпочинку. Наш інтернет-магазин створений з метою надати вам доступ до високоякісного та
          функціонального спорядження, яке вас супроводжуватиме на будь-якому етапі вашого
          туристичного відпочинку.
        </p>
        <p className={styles.hero_description}>
          Adventure Pro Gear народився з бажання зробити туризм доступним для всіх. Ми віримо, що
          кожен має право на захоплюючі подорожі та незабутні враження. Наша місія - забезпечити вас
          відмінним та надійним спорядженням, щоб ви могли насолоджуватися кожним моментом своїх
          пригод.
        </p>
      </li>
      <li className={`${styles.item_hero} ${styles.item_hero_img}`}>
        <Image
          src={aboutUsImage}
          alt="about us"
          width={480}
          height={514}
          className={styles.hero_img}
        />
      </li>
    </ul>
  );
}

export default AboutHero;
