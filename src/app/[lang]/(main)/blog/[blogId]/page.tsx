'use client';

import React, { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '@/redux/features/selectors';
import { getBlogsId } from '@/clientServices/clientAxios';
import { dataReview } from '@/assets/json';
import { Product } from '@/interfaces/product';
import Container from '@/components/Container';
import Navigation from '@/components/Navigation/Navigation';
import Recommendation from '@/components/Recommendation/Recommendation';
import style from './blogId.module.css';
import facebook from '../../../../../../public/icons/facebook_blue.svg';
import telegram from '../../../../../../public/icons/telegram.svg';

interface IBlog {
  titleEn: string;
  titleUa: string;
  imageUrl: string;
  contentUa: string;
  contentEn: string;
  createdAt: string;
}

function BlogId({ params }: { params: { blogId: string } }) {
  const locale = useLocale();
  const recommendation = useSelector(selectAllProducts);
  const recommendationProducts = recommendation.slice(0, 6);
  
  const [blog, setBlog] = useState<IBlog>({});

  useEffect(() => {
    const fetchData = (async () => {
      const blogs = await getBlogsId(params.blogId);
      setBlog(blogs);
    })();
  }, [params.blogId]);

  return (
    <Container>
      <div>
        <Navigation navigationPage="Блог" title={locale === 'uk' ? blog?.titleUa : blog.titleEn} />
      </div>
      {blog && (
        <div className={style.post_container}>
          <h1 className={style.title}>{locale === 'uk' ? blog?.titleUa : blog?.titleEn}</h1>
          <p className={style.data}>{blog?.createdAt}</p>
          <Image
            src={blog?.imageUrl}
            alt="img blog"
            width="280"
            height="218"
            className={style.blog_img}
          />
          <p>{locale === 'uk' ? blog?.contentUa : blog?.contentEn}</p>
        </div>
      )}

      <div className={style.review_container}>
        <span className={style.review}>Як Вам стаття? Залиште реакцію! </span>
        {dataReview?.map(({ reviewImg, review, size }) => (
          <span key={review} className={style.review_item}>
            <Image src={reviewImg} alt={review} width={size} height={size} />
          </span>
        ))}
      </div>

      <div className={style.send_btn_container}>
        <button type="button" className={style.send_btn}>
          <Image src={facebook} alt="facebook" width="24" height="24" />
          <span className={style.send_btn_text}>Поділитися</span>
        </button>
        <button type="button" className={style.send_btn}>
          <Image src={telegram} alt="telegram" width={24} height={24} />
          <span className={style.send_btn_text}>Відправити</span>
        </button>
      </div>

      <div className={style.recommendation_container}>
        <Recommendation
          recommendation={recommendationProducts}
        />
      </div>
    </Container>
  );
}

export default BlogId;
