import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getBlogs } from '@/services/axios';
import { getTranslations } from 'next-intl/server';
import clsx from 'clsx';
import { IBlogsProps } from '@/types';
import img1 from '../../../public/blogs/393243edcfc7654f9c114dc2aef9bad597126652.jpg';
import img2 from '../../../public/blogs/8cbd1ee01036c89145af92d4c18854ba15d55e55.jpg';
import img3 from '../../../public/blogs/8cf48cd82b81ce404a0b0ece0a073703eb348543.jpg';
import img4 from '../../../public/blogs/8dff78325542448db21109b2cbbd65e18444c943.jpg';
import img5 from '../../../public/blogs/a1836e4e560b7a4f9a09199733719179fba2153b.jpg';
import style from './style.module.css';

interface Props {
  lang?: string;
}

const placeholderImages = [img1, img2, img3, img4, img5];

const homeBlogList = async ({ lang }: Props) => {
  const t = await getTranslations({ lang, namespace: 'blog' });
  const blogs = await getBlogs(0, 5);

  if (!blogs || blogs.totalElements < 5) {
    return null;
  }



  return (
    <section className={style.home_blog}>
      <div className={style.home_blog_title}>
        <h2>{t('title')}</h2>
      </div>

      <ul className={style.home_blog_list}>
        {blogs?.content
          .slice(0, 5)
          .map(({ id, titleEn, titleUa, imageUrl }: IBlogsProps, index: number) => {
            const fallbackImage = placeholderImages[index].src;

            return (
              <li key={id} className={style.blogs_item}>
                <Link href={`/blog/${id}`} className={style.home_blog_link}>
                  <div className={style.blogs_item_img}>
                    <Image
                      src={fallbackImage || imageUrl}
                      alt={titleEn}
                      width="380"
                      height="280"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <div className={clsx(style.home_blog_item_title)}>
                    <h2 className={style.blogs_item_description}>
                      {lang === 'en' ? titleEn : titleUa}
                    </h2>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>

      <div className={style.home_blog_link_container}>
        <Link href="/blog" className={style.home_blog_next_link}>
          <span className={style.home_blog_link_text}>{t('all_blogs')}</span>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.5506 7.43012C18.5533 7.23038 18.4752 7.03803 18.3339 6.89679C18.1927 6.75554 18.0003 6.6774 17.8006 6.68012C17.3864 6.68012 17.0506 7.0159 17.0506 7.43012V15.5001L7.7206 6.16012C7.53363 5.95946 7.25205 5.87687 6.98631 5.94473C6.72058 6.01259 6.51308 6.22009 6.44522 6.48583C6.37735 6.75156 6.45995 7.03314 6.6606 7.22012L16.0006 16.5601H7.9306C7.51639 16.5601 7.1806 16.8959 7.1806 17.3101C7.1806 17.7243 7.51639 18.0601 7.9306 18.0601H17.8106C18.2248 18.0601 18.5606 17.7243 18.5606 17.3101L18.5506 7.43012Z"
              fill="#F5FFFF"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default homeBlogList;
