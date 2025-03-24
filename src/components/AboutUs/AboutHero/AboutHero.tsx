import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './AboutHero.module.css';

function AboutHero() {
  const t = useTranslations('aboutPage.advantages');

  return (
    <ul className={styles.list_hero}>
      <li className={`${styles.item_hero} ${styles.item_hero_text}`}>
        <h3 className={styles.hero_aboutUs}>{t('title')}</h3>
        <p
          className={styles.hero_description}
          dangerouslySetInnerHTML={{ __html: t.raw('desc') }}
        />
      </li>
      <li className={`${styles.item_hero} ${styles.item_hero_img}`}>
        <Image
          src="/images/about/aboutUs.png"
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
