import React from 'react';
import { getBlogsId, getProducts } from '@/services/axios';
// import Image from 'next/image';
// import { dataReview } from '@/assets/json';
// import Container from '@/components/Container';
// import Navigation from '@/components/Navigation/Navigation';
// import style from './blogId.module.css';
// // import Recommendation from '@/components/Recommendation/Recommendation';
// // import ProductWrapper from '@/components/product/ProductWrapper';
// import imgPost from '../../../../../../public/images/blogImg.jpg';
// import facebook from '../../../../../../public/icons/facebook_blue.svg';
// import telegram from '@/public/icons/telegram.svg';

async function BlogId({
  params,
}: {
  params: { blogId: string };
  }) {
  const blog = await getBlogsId(params.blogId);

  const recommendation = await getProducts();
  const recommendationProduct = recommendation?.data.slice(0, 6);

  return (
    <div>uiiiyi</div>
    // <Container>
    //   <div>
    //     <Navigation navigationPage="Блог" title={blog.postTitle} />
    //   </div>
    //   <div className={style.post_container}>
    //     <h1 className={style.title}>{blog.postTitle}</h1>
    //     <p className={style.data}>15.08.23</p>
    //     <Image src={imgPost} alt="img blog" width="280" height="218"className={style.blog_img} />
    //     <p>{blog.content}</p>
    //   </div>

  //   <div className={style.review_container}>
  //     <span className={style.review}>Як Вам стаття? Залиште реакцію! </span>
  //     {dataReview?.map(({ reviewImg, review, size }) => (
  //       <span key={review} className={style.review_item}>
  //         <Image src={reviewImg} alt={review} width={size} height={size} />
  //       </span>
  //     ))}
  //   </div>

  //   <div className={style.send_btn_container}>
  //     <button type="button" className={style.send_btn}>
  //       <Image src={facebook} alt="facebook" width="24" height="24" />
  //       <span className={style.send_btn_text}>Поділитися</span>
  //     </button>
  //     <button type="button" className={style.send_btn}>
  //       <Image src={telegram} alt="telegram" width={24} height={24} />
  //       <span className={style.send_btn_text}>Відправити</span>
  //     </button>
  //   </div>
  //   {/* <Recommendation params={{
  //     lang: undefined,
  //     productId: 0
  //   }} /> */}
  // </Container>
  );
}

export default BlogId;
