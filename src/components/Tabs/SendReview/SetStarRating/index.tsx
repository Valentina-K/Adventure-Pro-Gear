import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import EmptyStar from '@/../public/icons/EmptyStar.svg';
import FullStar from '@/../public/icons/FullStar.svg';
import styles from './SetStarRating.module.css';

interface SetStarRatingProp {
  onStarClick: (value: number) => void;
  refresh: boolean;
}

const SetStarRating: React.FC<SetStarRatingProp> = ({ onStarClick, refresh }) => {
  const [starIndex, setStarIndex] = useState(0);
  const [starArray, setStarArray] = useState(
    new Array(5).fill(<Image src={EmptyStar} width={31} height={30} alt="star" />)
  );
  useEffect(()=>{
    if (refresh) setStarIndex(0);
  }, [refresh]);
  useEffect(() => {
    function getStars() {
      const emptyStarArray = new Array(5 - starIndex).fill(
        <Image src={EmptyStar} width={31} height={30} alt="star" />
      );
      const fullStarArray = new Array(5 - emptyStarArray.length).fill(
        <Image src={FullStar} width={31} height={30} alt="star" />
      );
      setStarArray(fullStarArray.concat(emptyStarArray));
    }
    getStars();
    onStarClick(starIndex);
  }, [starIndex, onStarClick]);

  return (
    <div className={styles.ratingReview}>
      <p>Оцініть товар</p>
      <div className={styles.starsBlock}>
        {starArray.map((star, ind) => (
          <button
            type="button"
            className={styles.starButton}
            onClick={() => setStarIndex(ind + 1)}
            key={ind}
          >
            {star}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SetStarRating;
