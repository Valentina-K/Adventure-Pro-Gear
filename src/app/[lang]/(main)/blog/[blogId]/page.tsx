import React from 'react';
import { Locale } from '@/i18n-config';
import { getBlogsId, getProducts } from '@/services/axios';
import Image from 'next/image';
import { dataReview } from '@/assets/json';
import Container from '@/components/Container';
import Navigation from '@/components/Navigation/Navigation';
import Recommendation from '@/components/Recommendation/Recommendation';
import style from './blogId.module.css';
import facebook from '../../../../../../public/icons/facebook_blue.svg';
import telegram from '../../../../../../public/icons/telegram.svg';

async function BlogId({ params }: { params: { blogId: string; lang: Locale } }) {
  const blog = await getBlogsId(params.blogId);

  // toDo: too slow
  const recommendation = await getProducts();
  const recommendationProducts = recommendation?.data?.content?.slice(0, 6);

  return (
    <Container>
      <div>
        <Navigation navigationPage="Блог" title={blog.postTitle} />
      </div>
      <div className={style.post_container}>
        <h1 className={style.title}>{blog.postTitle}</h1>
        <p className={style.data}>15.08.23</p>
        <Image src={blog.imageUrl} alt="img blog" width="280" height="218" className={style.blog_img} />
        <p>{blog.content}</p>
      </div>

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
          translation={{
            card: {
              addToFollowing: '',
              sale: '',
              new: '',
              available: '',
              outOfStock: '',
              buy: '',
            },
          }}
          locale={params.lang}
          recommendation={recommendationProducts}
        />
      </div>
    </Container>
  );
}

export default BlogId;
