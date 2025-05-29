'use client';

import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import Slide from './Slide';
import { Product } from '@/types';
import styles from './styles.module.css';

type Props = {
  title: string;
  slides: Product[];
  options?: EmblaOptionsType;
  delay?: number;
  className?: string;
  autoplay?: boolean;
  variant?: 'big' | 'small';
  length?: number;
};

const EmblaCarousel: React.FC<Props> = ({ slides, options, title, length = 4, delay = 3000 }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    [Autoplay({ delay })]
  );
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <section className={`${styles.embla}`}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.embla__viewport} ref={emblaRef}>
        <ul className={styles.embla__container}>
          {slides?.map((slide, index) => (
            <li className={styles.embla__slide} key={index}>
              <Slide product={slide} />
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
