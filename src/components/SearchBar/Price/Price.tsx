import { FC, useEffect, useState } from 'react';
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
  minRange?: number;
  maxRange?: number;
  difference?: number;
}

const Price: FC<IPriceProps> = ({
  createQueryString,
  setMinValue,
  setMaxValue,
  maxValue,
  minValue,
  setPage,
  minRange = 0,
  maxRange = 100000,
  difference = 100,
}) => {
  const [searchFieldActive, setSearchFieldActive] = useState(false);
  /* const [search, setSearch] = useState<ISearch>({
    rangeMin: 0,
    rangeMax: 100000,
  }); */
  const handleFieldActive = () => {
    setSearchFieldActive(prev => !prev);
  };

  const [minInput, setMinInput] = useState(minValue.toString());
  const [maxInput, setMaxInput] = useState(maxValue.toString());

  // чтобы локальный ввод не "отставал" при изменении пропсов
  useEffect(() => {
    setMinInput(minValue.toString());
  }, [minValue]);

  useEffect(() => {
    setMaxInput(maxValue.toString());
  }, [maxValue]);

  const clampMin = (val: number) => Math.max(minRange, Math.min(val, maxValue - difference));
  const clampMax = (val: number) => Math.min(maxRange, Math.max(val, minValue + difference));

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^[0-9]+$/.test(val)) {
      setMinInput(val);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '' || /^[0-9]+$/.test(val)) {
      setMaxInput(val);
    }
  };

  const applyMin = () => {
    const parsed = Number(minInput);
    if (!isNaN(parsed) && minInput !== '') {
      const clamped = clampMin(parsed);
      setMinValue(clamped); // передаём наверх
      setMinInput(clamped.toString());
    } else {
      setMinInput(minValue.toString()); // возвращаем актуальное
    }
  };

  const applyMax = () => {
    const parsed = Number(maxInput);
    if (!isNaN(parsed) && maxInput !== '') {
      const clamped = clampMax(parsed);
      setMaxValue(clamped); // передаём наверх
      setMaxInput(clamped.toString());
    } else {
      setMaxInput(maxValue.toString());
    }
  };

  const handleKeyDownMin = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyMin();
      (e.target as HTMLInputElement).blur(); // чтобы убрать курсор
    }
  };

  const handleKeyDownMax = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyMax();
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleChangeRanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'rangeMin') {
      const value = clampMin(Number(e.target.value));
      setMinValue(value);
      //const value = Math.min(parsed, maxValue - difference);
      createQueryString('priceFrom', value.toString());
      // setPage(0);
    } else if (e.target.name === 'rangeMax') {
      const value = clampMax(Number(e.target.value));
      setMaxValue(value);
      //const value = Math.max(parsed, minValue + difference);
      createQueryString('priceTo', value.toString());
      // setPage(0);
    }
    /* setSearch({
      ...search,
      rangeMin: minValue,
      rangeMax: maxValue,
    }); */
  };

  const getProgressStyle = () => {
    const range = maxRange - minRange;
    const left = ((minValue - minRange) / range) * 100;
    const width = ((maxValue - minValue) / range) * 100;
    /* const range = 100000 - 0;

    const left = ((minValue - 0) / range) * 100;
    const width = ((maxValue - minValue) / range) * 100; */

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
              min={minRange}
              max={maxRange}
              step="10"
              className={`${styles.min} ${styles.range}`}
              onChange={handleChangeRanges}
            />

            <input
              type="range"
              name="rangeMax"
              value={maxValue}
              min={minRange}
              max={maxRange}
              step="10"
              className={`${styles.max} ${styles.range}`}
              onChange={handleChangeRanges}
            />
          </div>

          <div className={styles.slider}>
            <div className={styles.progress} style={getProgressStyle()} />
          </div>
          <div className={styles.price}>
            <input
              type="text"
              name="minPrice"
              value={minInput}
              onChange={handleMinChange}
              onBlur={applyMin}
              onKeyDown={handleKeyDownMin}
              className={styles.priceValue}
            />
            <span className={styles.priceSpan}>-</span>
            <input
              type="text"
              name="maxPrice"
              onChange={handleMaxChange}
              onBlur={applyMax}
              onKeyDown={handleKeyDownMax}
              value={maxInput}
              className={styles.priceValue}
            />
          </div>
        </>
      )}
    </div>
  );
};
export default Price;
