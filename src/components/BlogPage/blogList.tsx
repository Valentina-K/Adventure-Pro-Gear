import React from 'react';
import type { IBlogsProps } from '@/types';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import clsx from 'clsx';
import style from './style.module.css';

interface Props {
  blogs: {
    content: IBlogsProps[];
  };
  length?: number;
  lang?: string;
  currentBlogId?: string | number;

}

const blogList = ({ blogs, length, lang, currentBlogId }: Props) => {
  return (
    <ul className={clsx(style.blogs_list, { [style.column]: length })}>
      {blogs?.content
        .filter(blog => Number(blog.id) !== Number(currentBlogId))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, length)
        .map(({ id, titleEn, titleUa, imageUrl, createdAt }: IBlogsProps) => (
          <li key={id} className={style.blogs_item}>
            <Link href={`/blog/${id}`}>
              <div className={style.blogs_item_img}>
                <Image
                  src={imageUrl}
                  alt={titleEn}
                  width="380"
                  height="280"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              </div>
              <div className={style.blogs_item_content}>
                <span className={style.blogs_item_date}>
                  {new Date(createdAt).toLocaleDateString('uk-UA')}
                </span>
                <h2 className={style.blogs_item_description}>
                  {lang === 'en' ? titleEn : titleUa}
                </h2>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default blogList;
