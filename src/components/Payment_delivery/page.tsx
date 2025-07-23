'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation/Navigation';
import Container from '@/components/Container';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import DeliveryImg1 from '../../../public/images/payment_delivery/img1.png';
import DeliveryImg2 from '../../../public/images/payment_delivery/img2.png';
import DeliveryImg3 from '../../../public/images/payment_delivery/img3.png';
import DeliveryImg4 from '../../../public/images/payment_delivery/img4.png';
import styles from './payment_delivery.module.css';
import clsx from 'clsx';

export default function PaymentDelivery() {
  const t = useTranslations('payment_delivery');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743);
      setIsTablet(window.innerWidth <= 1179);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
      <Navigation title={t('title')} />

      <section className={styles.policy}>
        <div className={styles.block}>
          <h1 className={styles.mainTitle}>{t('title')}</h1>
          <div className={styles.blockImg}>
            <div className={styles.block}>
              <p className={styles.text}>{t('description1')}</p>
              <p className={styles.text}>{t('description2')}</p>
            </div>
            <Image
              src={DeliveryImg1}
              alt="Delivery"
              width={isMobile ? 328 : isTablet ? 664 : 480}
              height={isMobile ? 178 : isTablet ? 400 : 272}
            />
          </div>
        </div>

        <div id="delivery" className={clsx(styles.block, styles.scrollSection)}>
          <h4 className={styles.title}>{t('block1.title')}</h4>
          <div className={styles.text}>{t('block1.description')}</div>
          <div className={styles.subTitle}>{t('block1.subBlock1.title')}</div>
          <div className={styles.text}>{t('block1.subBlock1.text1')}</div>

          <div className={styles.subTitle}>{t('block1.subBlock2.title')}</div>
          <div className={styles.text}>{t('block1.subBlock2.text1')}</div>
          <div className={styles.text}>{t('block1.subBlock2.text2')}</div>
          <div className={styles.text}>{t('block1.subBlock2.text3')}</div>
        </div>

        <div className={styles.block}>
          <h4 className={styles.title}>{t('block2.title')}</h4>
          <div className={styles.blockImg}>
            <Image
              src={DeliveryImg2}
              alt="Delivery"
              width={isMobile ? 328 : isTablet ? 664 : 480}
              height={isMobile ? 210 : isTablet ? 400 : 328}
            />
            <div className={styles.block}>
              <div className={styles.text}>{t('block2.description1')}</div>
              <div className={styles.text}>{t('block2.description2')}</div>
              <div className={styles.text}>{t('block2.description3')}</div>
            </div>
          </div>
        </div>

        <div id="payment" className={clsx(styles.block, styles.scrollSection)}>
          <h4 className={styles.title}>{t('block3.title')}</h4>
          <div className={styles.blockImg}>
            <div className={styles.block}>
              <div className={styles.text}>{t('block3.description1')}</div>
              <div className={styles.text}>{t('block3.description2')}</div>
              <div className={styles.text}>{t('block3.description3')}</div>
            </div>
            <Image
              src={DeliveryImg3}
              alt="Delivery"
              width={isMobile ? 328 : isTablet ? 664 : 480}
              height={isMobile ? 210 : isTablet ? 400 : 320}
            />
          </div>
        </div>

        <div id="return" className={clsx(styles.block, styles.scrollSection)}>
          <h4 className={styles.title}>{t('block4.title')}</h4>
          <div className={styles.blockImg}>
            <Image
              src={DeliveryImg4}
              alt="Delivery"
              width={isMobile ? 328 : isTablet ? 664 : 480}
              height={isMobile ? 230 : isTablet ? 440 : 344}
            />
            <div className={styles.block}>
              <div className={styles.text}>{t('block4.description1.text')}</div>
              <div className={styles.text}>
                <div className={styles.subText}>
                  <span>1.</span>
                  <span>{t('block4.description1.subText1')}</span>
                </div>
                <div className={styles.subText}>
                  <span>2.</span>
                  <span>{t('block4.description1.subText2')}</span>
                </div>
                <div className={styles.subText}>
                  <span>3.</span>
                  <span>{t('block4.description1.subText3')}</span>
                </div>
              </div>
              <div className={styles.text}>{t('block4.description2')}</div>
            </div>
          </div>
        </div>

        <div className={styles.footerBlock}>
          <div>
            <span>{t('payment_delivery_footer.text1')}</span>
            <span> </span>
            <span className={styles.mainText}>{t('payment_delivery_footer.text2')}</span>
          </div>
          <div>
            <span>{t('payment_delivery_footer.text3')}</span>
            <span> </span>
            <span className={styles.mainText}>{t('payment_delivery_footer.text4')}</span>
            <span> </span>
            <span>{t('payment_delivery_footer.text5')}</span>
            <span> </span>
            <span className={styles.mainText}>{t('payment_delivery_footer.text6')}</span>
            <span> </span>
            <span>{t('payment_delivery_footer.text7')}</span>
            <span> </span>
            <span className={styles.mainText}>{t('payment_delivery_footer.text8')}</span>
            <span> </span>
            <span>{t('payment_delivery_footer.text9')}</span>
          </div>
        </div>
      </section>
    </Container>
  );
}
