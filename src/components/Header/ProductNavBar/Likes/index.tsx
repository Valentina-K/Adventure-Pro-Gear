import React from 'react';
import Image from 'next/image';
import Favorites from '@/../public/icons/Favorites.svg';
import styles from './Likes.module.css';

function Likes() {
  return (
    <div className={styles.like}>
      <Image src={Favorites} alt="likes icon" width={24} height={24} />
    </div>
  );
}

export default Likes;
