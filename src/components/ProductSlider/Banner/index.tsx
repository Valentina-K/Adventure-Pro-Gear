'use client';

import React from 'react';
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, useDotButton } from '../EmblaCarouselDotButton';
import styles from './styles.module.css';

const slides = [
  {
    id: 1,
    title: 'Промо-баннер 1',
    imageUrl: '/images/banners/banner1.jpg',
  },
  {
    id: 2,
    title: 'Промо-баннер 2',
    imageUrl: '/images/banners/banner2.jpg',
  },
  {
    id: 3,
    title: 'Промо-баннер 3',
    imageUrl: '/images/banners/banner3.jpg',
  },
];

const Banner = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay()]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const t = useTranslations('homePage');

  return (
    <section>
      <div>
        <h1 className={styles.title}>{t('title')}</h1>
      </div>
      <div className={styles.embla}>
        <div ref={emblaRef} className={styles.embla__viewport}>
          <ul className={styles.embla__container}>
            {slides?.map(banner => (
              <li key={banner.id} className={styles.embla__slide}>
                <div className={styles.embla__slide__item}>
                  <Image src={banner.imageUrl} alt={banner.title} width={1200} height={480} />
                </div>
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
      </div>
    </section>
  );
};

export default Banner;
