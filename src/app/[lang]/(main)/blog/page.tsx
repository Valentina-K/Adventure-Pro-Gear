import React from 'react';
import Image from 'next/image';
import Container from '@/components/Container';
import Pagination from '@/components/Pagination/Pagination';
import Navigation from '@/components/Navigation/Navigation';
import { getBlogs } from '@/services/axios';
import { Link } from '@/i18n/routing';
import type { IBlogsProps, IPageProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import style from './blog.module.css';

export const dynamic = 'force-dynamic';

async function Blog({ params }: IPageProps) {
  const blogs = await getBlogs();
  const { lang } = params;
  const t = await getTranslations({ lang, namespace: 'blog' });

  return (
    <Container>
      <div>
        <Navigation navigationPage={t('title')} />
      </div>
      <div className={style.blogs_container}>
        <h1 className={style.blogs_title}>{t('title')}</h1>
        <ul className={style.blogs_list}>
          {blogs &&
            blogs?.map(({ id, postTitle, imageUrl }: IBlogsProps) => (
              <li key={id} className={style.blogs_item}>
                <Link href={`${id}`}>
                  <Image
                    src={imageUrl}
                    alt="img blog"
                    width="180"
                    height="180"
                    className={style.blogs_item_img}
                  />
                  <div className={style.blogs_item_content}>
                    <span className={style.blogs_item_date}>15.08.23</span>
                    <h2 className={style.blogs_item_description}>{postTitle}</h2>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
        {/* <Pagination searchParams={{}} /> */}
      </div>
    </Container>
  );
}

export default Blog;
