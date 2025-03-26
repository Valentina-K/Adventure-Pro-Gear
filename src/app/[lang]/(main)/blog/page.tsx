import React, { Suspense } from 'react';
import Container from '@/components/Container';
// import Pagination from '@/components/Pagination/Pagination';
import Navigation from '@/components/Navigation/Navigation';
import { getBlogs } from '@/services/axios';
import type { IBlogsProps, IPageProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import style from './blog.module.css';
import BlogList from '@/components/BlogPage/blogList';

async function Blog({ params }: IPageProps) {
  const blogs = await getBlogs();
  const { lang } = params;
  const t = await getTranslations({ lang, namespace: 'blog' });

  return (
    <Container>
      <Navigation title={t('title')} />

      <div className={style.blogs_container}>
        <h1 className={style.blogs_title}>{t('title')}</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <BlogList blogs={blogs} lang={lang} />
        </Suspense>

        {/* <Pagination searchParams={{}} /> */}
      </div>
    </Container>
  );
}

export default Blog;
