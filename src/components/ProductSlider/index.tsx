'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Product } from '@/types';
import useLocalStorage from '@/utils/favoritesContext';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import Card from '../Card';
import styles from './styles.module.css';
import { useWindowWidth } from '@/hooks/useWindowWidth';

type Props = {
  title: string;
  slides: Product[];
  options?: EmblaOptionsType;
  delay?: number;
  autoplay?: boolean;
  length?: number;
};

const EmblaCarousel: React.FC<Props> = ({ slides, options, title, length = 4, delay = 3000 }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    [Autoplay({ delay })]
  );
  const width = useWindowWidth()
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const favStorage = useLocalStorage();
  return (
    <section className={`${styles.embla}`}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.embla__viewport} ref={emblaRef}>
        <ul className={styles.embla__container}>
          {slides?.map((slide, index) => (
            <li className={styles.embla__slide} key={index}>
              <Card variant={width > 1179 || width < 744 ? 'big' : "small"} product={slide} favoriteStore={favStorage} />
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.embla__controls}>
        <div className={styles.embla__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={[
                styles.embla__dot,
                selectedIndex === index && styles['embla__dot--selected'],
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
