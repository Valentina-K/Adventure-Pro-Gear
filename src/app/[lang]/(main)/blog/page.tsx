import React from 'react';
import { Locale } from '@/i18n-config';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import Pagination from '@/components/Pagination/Pagination';
import Navigation from '@/components/Navigation/Navigation';
import { getBlogs } from '@/services/axios';
import { IBlogsProps } from '@/types';
import imgPost from '../../../../../public/images/blogImg.jpg';
import style from './blog.module.css';

export const dynamic = 'force-dynamic';

async function Blog({ params }: { params: { lang: Locale } }) {
  const blogs = await getBlogs();
  const locale = params.lang;

  return (
    <Container>
      <div>
        <Navigation navigationPage="Блог" />
      </div>
      <div className={style.blogs_container}>
        <h1 className={style.blogs_title}>Блог</h1>
        <ul className={style.blogs_list}>
          {blogs &&
            blogs?.map(({ id, postTitle, imageUrl }: IBlogsProps) => (
              <li key={id} className={style.blogs_item}>
                <Link href={`/${locale}/blog/${id}`}>
                  <Image
                    // src={imgPost}
                    src={imageUrl}
                    alt="img blog"
                    width="180"
                    height="180"
                    className={style.blogs_item_img}
                  />
                  <div className={style.blogs_item_content}>
                    <h2 className={style.blogs_item_date}>15.08.23</h2>
                    <p className={style.blogs_item_description}>{postTitle}</p>
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
