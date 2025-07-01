import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { getBlogs } from '@/services/axios';
import Container from '@/components/Container';
import Pagination from '@/components/Pagination/Pagination';
import Navigation from '@/components/Navigation/Navigation';
import BlogList from '@/components/BlogPage/blogList';
import type { IPageProps } from '@/types';
import BlogPagination from '@/components/Pagination/BlogPagination'
import style from './blog.module.css';

async function Blog({ params, searchParams }: IPageProps & { searchParams: { page?: string } }) {
  const { lang } = params;
  const pageParam = Number(searchParams.page) || 1;

  const t = await getTranslations({ lang, namespace: 'blog' });

  const blogs = await getBlogs(pageParam - 1, 12);
  const currentPage = blogs.pageable.pageNumber + 1;

  if (pageParam < 1) return notFound();

  return (
    <Container>
      <Navigation title={t('title')} />

      <div className={style.blogs_container}>
        <h1 className={style.blogs_title}>{t('title')}</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <BlogList blogs={blogs} lang={lang} />
        </Suspense>

        <BlogPagination totalPage={blogs?.totalPages} currentPage={currentPage} />
      </div>
    </Container>
  );
}

export default Blog;
