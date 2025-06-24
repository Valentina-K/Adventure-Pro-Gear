import React from 'react';
import Navigation from '@/components/Navigation/Navigation';
import Container from '@/components/Container';
import { IPageProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import styles from './policy.module.css';

async function page({ params }: IPageProps) {
  const { lang } = params;
  const t = await getTranslations({ lang, namespace: 'security_policy' });

  const policyContent = [
    {
      titleKey: 'block1.title',
      texts: ['block1.text1', 'block1.text2'],
    },
    {
      titleKey: 'block2.title',
      texts: ['block2.text1', 'block2.text2'],
    },
    {
      titleKey: 'block3.title',
      texts: ['block3.text1', 'block3.text2'],
    },
    {
      titleKey: 'block4.title',
      texts: ['block4.text1', 'block4.text2'],
    },
    {
      titleKey: 'block5.title',
      texts: ['block5.text1', 'block5.text2'],
    },
    {
      titleKey: 'block6.title',
      texts: ['block6.text1', 'block6.text2'],
    },
    {
      titleKey: 'block7.title',
      texts: ['block7.text1', 'block7.text2'],
    },
  ];

  return (
    <Container>
      <Navigation title={t('title')} />

      <section className={styles.policy}>
        <div className={styles.block}>
          <h1 className={styles.mainTitle}>{t('title')}</h1>
        </div>

        {policyContent.map((block, index) => (
          <div key={index} className={styles.block}>
            <h4 className={styles.title}>{t(block.titleKey)}</h4>
            {block.texts.map((item, idx) => {
              return (
                <div key={idx} className={styles.text}>
                  {t(item)}
                </div>
              );
            })}
          </div>
        ))}
      </section>
    </Container>
  );
}

export default page;
