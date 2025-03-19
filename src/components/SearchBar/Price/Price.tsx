import { FC, useState } from 'react';
import Image from 'next/image';
import styles from './Price.module.css';
import arrowDown from '../../../../public/icons/arrowsDown.svg';
import arrowUp from '../../../../public/icons/arrowsUp.svg';

interface ISearch {
  rangeMin: number;
  rangeMax: number;
}

interface IPriceProps {
  createQueryString: any;
  setMinValue: any;
  setMaxValue: any;
  maxValue: number;
  minValue: number;
  setPage: any;
}

const Price: FC<IPriceProps> = ({
  createQueryString,
  setMinValue,
  setMaxValue,
  maxValue,
  minValue,
  setPage,
}) => {
  const [searchFieldActive, setSearchFieldActive] = useState(false);
  const [search, setSearch] = useState<ISearch>({
    rangeMin: 0,
    rangeMax: 100000,
  });

  const handleFieldActive = () => {
    setSearchFieldActive(prev => !prev);
  };

  const handleChangeRanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'rangeMin') {
      const value = Math.min(Number(e.target.value), maxValue - 100);
      createQueryString('priceFrom', value.toString());
      setMinValue(value);
      setPage(1);
    } else if (e.target.name === 'rangeMax') {
      const value = Math.max(Number(e.target.value), minValue + 100);
      createQueryString('priceTo', value.toString());
      setMaxValue(value);
      setPage(1);
    }
    setSearch({
      ...search,
      rangeMin: minValue,
      rangeMax: maxValue,
    });
  };

  const getProgressStyle = () => {
    const range = 100000 - 0;

    const left = ((minValue - 0) / range) * 100;
    const width = ((maxValue - minValue) / range) * 100;

    return {
      left: `${left}%`,
      width: `${width}%`,
    };
  };
  return (
    <div className={styles.accordion}>
      <div onClick={handleFieldActive} aria-hidden="true" className={styles.tab}>
        <p className={styles.title}> Ціна:</p>
        {!searchFieldActive && <Image src={arrowDown} alt="arrowDown" />}
        {searchFieldActive && <Image src={arrowUp} alt="arrowDown" />}
      </div>
      {searchFieldActive && (
        <>
          <div className="rangeslider">
            <input
              type="range"
              name="rangeMin"
              value={minValue}
              min="0"
              max="100000"
              step="10"
              className={`${styles.min} ${styles.range}`}
              onChange={handleChangeRanges}
            />

            <input
              type="range"
              name="rangeMax"
              value={maxValue}
              min="0"
              max="100000"
              step="10"
              className={`${styles.max} ${styles.range}`}
              onChange={handleChangeRanges}
            />
          </div>

          <div className={styles.slider}>
            <div className={styles.progress} style={getProgressStyle()} />
          </div>
          <div className={styles.price}>
            <p className={styles.priceValue}>{minValue}</p>
            <span className={styles.priceSpan}>-</span>
            <p className={styles.priceValue}>{maxValue}</p>
          </div>
        </>
      )}
    </div>
  );
};
export default Price;
