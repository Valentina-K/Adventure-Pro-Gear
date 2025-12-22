'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import useLocalStorage from '@/utils/favoritesContext';
import FavoritesList from './FavoritesList/FavoritesList';
import styles from './Favorites.module.css';

function Favorites() {
  const t = useTranslations('profile');
  const { list } = useLocalStorage();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{t("favorites.title")}</h2>
      {list.length > 0 ? <FavoritesList /> : <p className={styles.text}>{t("favorites.text")}</p>}
    </div>
  );
}

export default Favorites;
