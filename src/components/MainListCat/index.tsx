'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import { useLocale } from 'next-intl';
import clsx from 'clsx';
import style from './style.module.css';

const ExamCatData = [
  {
    id: '1',
    titleEn: 'News',
    titleUa: 'Новинки',
    imageUrl: '/images/example/cat/news.jpg',
  },
  {
    id: '2',
    titleEn: 'Running',
    titleUa: 'Біг',
    imageUrl: '/images/example/cat/running.jpg',
  },
  {
    id: '3',
    titleEn: 'Backpacks',
    titleUa: 'Рюкзаки',
    imageUrl: '/images/example/cat/backpacks.jpg',
  },
  {
    id: '4',
    titleEn: 'Jackets',
    titleUa: 'Куртки',
    imageUrl: '/images/example/cat/jackets.jpg',
  },
  {
    id: '5',
    titleEn: 'Cycling',
    titleUa: 'Велоспорт',
    imageUrl: '/images/example/cat/cycling.jpg',
  },
  {
    id: '6',
    titleEn: 'Headlamps',
    titleUa: 'Налобні ліхтарі',
    imageUrl: '/images/example/cat/headlamps.png',
  },
  {
    id: '7',
    titleEn: 'Winter sports',
    titleUa: 'Зимові види спорту',
    imageUrl: '/images/example/cat/winter.jpg',
  },
  {
    id: '8',
    titleEn: 'Camping',
    titleUa: 'Кемпінг',
    imageUrl: '/images/example/cat/tents.jpg',
  },
  {
    id: '9',
    titleEn: 'Winter Camping',
    titleUa: 'Зимовий кемпінг',
    imageUrl: '/images/example/cat/tents.jpg',
  },
];

interface Props {
  length?: number;
  className?: string;
  categories?: { id: string; titleEn: string; titleUa: string; imageUrl: string }[];
}

const MainListCat: React.FC<Props> = ({ categories = [], length = 8 }) => {
  const lang = useLocale();
  const router = useRouter();
  
  const handleLink = (id: number) => {
    id === 1 && router.push('/newItems');
  }

  return (
    <section className={style.wrapper}>
      <ul className={style.home_blog_list}>
        {ExamCatData?.slice(0, length).map(({ id, titleEn, titleUa, imageUrl }) => (
          <li key={id} className={style.blogs_item}>
            <div className={style.home_blog_link} onClick={()=>handleLink(Number(id))}>
              <div className={style.blogs_item_img}>
                <Image
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  src={imageUrl}
                  alt={titleEn}
                  width="280"
                  height="190"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              </div>
              <div className={clsx(style.home_blog_item_title)}>
                <h2 className={style.blogs_item_description}>
                  {lang === 'en' ? titleEn : titleUa}
                </h2>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MainListCat;
