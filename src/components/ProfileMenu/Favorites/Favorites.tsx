'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';
import FavoritesList from './FavoritesList/FavoritesList';
import styles from './Favorites.module.css';

function Favorites() {
  const t = useTranslations('profile.favorites');
  const { list } = useLocalStorage('favorites');

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t("title")}</h2>
      {list.length > 0 ? <FavoritesList /> : <p className={styles.text}>{t("text")}</p>}
    </div>
  );
}

export default Favorites;
