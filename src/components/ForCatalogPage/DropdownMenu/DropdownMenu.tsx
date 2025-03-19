'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import arrowDown from '../../../../public/icons/arrowsDown.svg';
import arrowUp from '../../../../public/icons/arrowsUp.svg';
import styles from './DropdownMenu.module.css';

interface IDropdownMenuProps {
  filterByDefault: () => void;
  filterByDecreasingPrices: () => void;
  filterByRisingPrices: () => void;
  filterByPopularity: () => void;
}

const DropdownMenu: React.FC<IDropdownMenuProps> = ({
  filterByDefault,
  filterByDecreasingPrices,
  filterByRisingPrices,
  filterByPopularity,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchFieldActive, setSearchFieldActive] = useState(false);
  const [activeValue, setActiveValue] = useState('');
  const [activeField, setActiveField] = useState({
    default: 'За замовчуванням',
    decreasingPrices: 'За зменшенням цін',
    risingPrices: 'За зростанням цін',
    byPopularity: 'За популярністю',
  });

  const handleFieldActive = () => {
    setSearchFieldActive(prev => !prev);
  };
  const handleToggleMenu = () => {
    handleFieldActive();
    setToggleMenu(prev => !prev);
  };

  const handleChangeSortProducts = (sortType: string) => {
    Object.entries(activeField).forEach(
      ([key, value]) => key === sortType && setActiveValue(value)
    );
    handleFieldActive();
    setToggleMenu(prev => !prev);

    if (sortType === 'default') {
      return filterByDefault();
    }
    if (sortType === 'decreasingPrices') {
      return filterByDecreasingPrices();
    }
    if (sortType === 'risingPrices') {
      return filterByRisingPrices();
    }
    if (sortType === 'byPopularity') {
      return filterByPopularity();
    }
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropbtnContainer} onClick={handleToggleMenu} aria-hidden="true">
        <p className={`${styles.menu} ${styles.menu_default} `} aria-hidden="true">
          {activeValue || 'За замовчування'}
        </p>
        {!searchFieldActive && <Image src={arrowDown} alt="arrowDown" />}
        {searchFieldActive && <Image src={arrowUp} alt="arrowDown" />}
      </div>
      {toggleMenu && (
        <div className={styles.dropdownContent}>
          <p
            className={`${styles.menu} ${activeValue === 'За замовчуванням' || activeValue === '' ? styles.active : ''}`}
            onClick={() => handleChangeSortProducts('default')}
            aria-hidden="true"
          >
            За замовчуванням
          </p>
          <p
            className={`${styles.menu} ${activeValue === 'За зменшенням цін' ? styles.active : ''}`}
            onClick={() => handleChangeSortProducts('decreasingPrices')}
            aria-hidden="true"
          >
            За зменшенням цін
          </p>
          <p
            className={`${styles.menu} ${activeValue === 'За зростанням цін' ? styles.active : ''}`}
            onClick={() => handleChangeSortProducts('risingPrices')}
            aria-hidden="true"
          >
            За зростанням цін
          </p>
          <p
            className={`${styles.menu} ${activeValue === 'За популярністю' ? styles.active : ''}`}
            onClick={() => handleChangeSortProducts('byPopularity')}
            aria-hidden="true"
          >
            За популярністю
          </p>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
