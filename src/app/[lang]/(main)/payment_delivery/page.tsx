import React from 'react';
import Navigation from '@/components/Navigation/Navigation';
import Container from '@/components/Container';
import { IPageProps } from '@/types';
import { getTranslations } from 'next-intl/server';
import styles from './policy.module.css';

async function page({ params }: IPageProps) {
  const { lang } = params;
  const t = await getTranslations({ lang, namespace: 'policy' });

  const policyContent = [
    {
      titleKey: 'block1.title',
      texts: ['block1.1-1', 'block1.1-2'],
    },
    {
      titleKey: 'block2.title',
      texts: ['block2.2-1', 'block2.2-2', 'block2.2-3', 'block2.2-4', 'block2.2-5'],
    },
    {
      titleKey: 'block3.title',
      texts: ['block3.3-1', 'block3.3-2', 'block3.3-3'],
    },
    {
      titleKey: 'block4.title',
      texts: [
        'block4.4-1',
        'block4.4-2',
        'block4.4-3.text',
        { type: 'subText', keys: ['block4.4-3.name', 'block4.4-3.password', 'block4.4-3.email'] },
        'block4.4-4',
        'block4.4-5',
        'block4.4-6',
        'block4.4-7',
        'block4.4-8',
        'block4.4-9',
      ],
    },
    {
      titleKey: 'block5.title',
      texts: ['block5.5-1', 'block5.5-2', 'block5.5-3'],
    },
    {
      titleKey: 'block6.title',
      texts: ['block6.6-1'],
    },
    {
      titleKey: 'block7.title',
      texts: ['block7.7-1'],
    },
    {
      titleKey: 'block8.title',
      texts: [
        'block8.8-1.title',
        { type: 'subText', keys: ['block8.8-1.8-1-1', 'block8.8-1.8-1-2'] },
        'block8.8-2',
        'block8.8-3',
        'block8.8-4',
      ],
    },
    {
      titleKey: 'block9.title',
      texts: [
        'block9.9-1',
        'block9.9-2',
        'block9.9-3',
        'block9.9-4',
        'block9.9-5.text',
        {
          type: 'subText',
          keys: ['block9.9-5.variant1', 'block9.9-5.variant2', 'block9.9-5.variant3'],
        },
        'block9.9-6.text',
        { type: 'subText', keys: ['block9.9-6.variant1', 'block9.9-6.variant2'] },
        'block9.9-7',
        'block9.9-8',
      ],
    },
    {
      titleKey: 'block10.title',
      texts: [
        'block10.10-1',
        'block10.10-2.text',
        {
          type: 'subText',
          keys: ['block10.10-2.delivery', 'block10.10-2.info', 'block10.10-2.other'],
        },
        'block10.10-3',
        'block10.10-4',
        'block10.10-5',
        'block10.10-6',
      ],
    },
    {
      titleKey: 'block11.title',
      texts: ['block11.11-1', 'block11.11-2'],
    },
    {
      titleKey: 'block12.title',
      texts: ['block12.12-1', 'block12.12-2', 'block12.12-3'],
    },
    {
      titleKey: 'block13.title',
      texts: ['block13.13-1', 'block13.13-2', 'block13.13-3', 'block13.13-4'],
    },
  ];

  return (
    <Container>
      <Navigation title={t('title')} />

      <section className={styles.policy}>
        <div className={styles.block}>
          <h1 className={styles.mainTitle}>{t('title')}</h1>
          <p className={styles.text}>{t('description')}</p>
          <p className={styles.text}>{t('description')}</p>
        </div>

        {policyContent.map((block, index) => (
          <div key={index} className={styles.block}>
            <h4 className={styles.title}>{t(block.titleKey)}</h4>
            {block.texts.map((item, idx) => {
              if (typeof item === 'string') {
                return (
                  <div key={idx} className={styles.text}>
                    {t(item)}
                  </div>
                );
              }
              if (item.type === 'subText') {
                return item.keys.map((key, i) => (
                  <div key={`${idx}-${i}`} className={styles.subText}>
                    {t(key)}
                  </div>
                ));
              }
              return null;
            })}
          </div>
        ))}
      </section>
    </Container>
  );
}

export default page;
