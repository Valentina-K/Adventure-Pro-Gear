import React, { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { getBlogs, getBlogsId } from '@/services/axios';
import { dataReview } from '@/assets/json';

import Container from '@/components/Container';
import Navigation from '@/components/Navigation/Navigation';
import Recommendation from '@/components/Recommendation/Recommendation';
import style from './blogId.module.css';
import BlogList from '@/components/BlogPage/blogList';

interface IBlog {
  titleEn: string;
  titleUa: string;
  imageUrl: string;
  contentUa: string;
  contentEn: string;
  createdAt: string;
}

interface Props {
  params: {
    blogId: string;
    lang: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

async function BlogId({ params }: Props) {
  const { lang, blogId } = params;
  const blog = await getBlogsId(blogId);
  const blogs = await getBlogs();
  const t = await getTranslations({ lang, namespace: 'blogId' });

  const title = lang === 'uk' ? blog?.titleUa : blog?.titleEn;
  const content = lang === 'uk' ? blog?.contentUa : blog?.contentEn;
  const data = new Date(blog?.createdAt).toLocaleDateString('uk-UA');
  const image = blog?.imageUrl;

  return (
    <Container>
      <Navigation title={title} />
      {blog && (
        <article className={style.post_container}>
          <h1 className={style.title}>{title}</h1>
          <p className={style.data}>{data}</p>
          <div className={style.blog_img}>
            <Image src={image} alt="img blog" width="280" height="218" />
          </div>

          <div className={style.blog_content}>
            <div
              className="contentBlock"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />

            <aside className={style.aside}>
              <div className={style.aside_articles}>
                <h3>{t('latest')}</h3>
                <Suspense fallback={<div>Loading...</div>}>
                  <BlogList blogs={blogs} lang={lang} length={2} currentBlogId={blogId} />
                </Suspense>
              </div>

              <div className={style.aside_review}>
                <div className={style.review_container}>
                  <h2 className={style.review}>{t('feedback')}</h2>
                  <ul className={style.review_list}>
                    {dataReview?.map(({ reviewImg, review, size }) => (
                      <li key={review}>
                        <button type="button" className={style.review_item}>
                          <Image src={reviewImg} alt={review} width={size} height={size} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={style.send_btn_container}>
                  <button type="button" className={style.send_btn}>
                    <Image src="/icons/facebook_blue.svg" alt="facebook" width="24" height="24" />
                    <span className={style.send_btn_text}>{t('share')}</span>
                  </button>
                  <button type="button" className={style.send_btn}>
                    <Image src="/icons/telegram.svg" alt="telegram" width={24} height={24} />
                    <span className={style.send_btn_text}>{t('send')}</span>
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </article>
      )}

      {/* <div className={style.recommendation_container}>
        <Recommendation recommendation={recommendationProducts} t={t} />
      </div> */}
    </Container>
  );
}

export default BlogId;
