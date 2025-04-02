import Container from '@/components/Container';
import React from 'react';
import Navigation from '@/components/Navigation/Navigation';
import { getTranslations } from 'next-intl/server';
import { IPageProps } from '@/types/IPageProps';
import styles from './style.module.css';

async function Contacts({ params }: IPageProps) {
  const { lang } = params;
  const t = await getTranslations({ lang, namespace: 'contactPage' });

  return (
    <section>
      <div className={styles.contacts_bg}>
        <Container>
          <Navigation breadcrumbs={t.raw('breadcrumbs')} />

          <div className={styles.contacts_content}>
            <div className={styles.contacts_content_left}>
              <h1>{t('title')}</h1>

              <div>
                <span>{t('address')}</span>
                <p>м.Львів, вул. Героїв УПА, 77</p>
              </div>

              <div>
                <span>{t('phone')}</span>
                <p>
                  Kyivstar: <a href="tel:+380983375323">+38 098 337 53 23</a>
                </p>
                <p>
                  Life: <a href="tel:+380931982738">+38 093 198 27 38</a>
                </p>
              </div>

              <div>
                <span>{t('email')}</span>
                <p>
                  <a href="mailto:info@adventureprogear.com.ua">info@adventureprogear.com.ua</a>
                </p>
              </div>

              <div>
                <span>{t('workHours')}</span>
                <p>{t('weekdays')}</p>
                <p>{t('weekend')}</p>
              </div>
            </div>

            <div className={styles.contacts_content_right}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d346.00712349658045!2d23.99109150141212!3d49.828305732816126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473ae77e96ffc7a9%3A0xd03ceb64f536aba4!2z0LLRg9C70LjRhtGPINCT0LXRgNC-0ZfQsiDQo9Cf0JAsIDc3LCDQm9GM0LLRltCyLCDQm9GM0LLRltCy0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsINCj0LrRgNCw0ZfQvdCwLCA3OTAwMA!5e0!3m2!1suk!2sse!4v1743604440134!5m2!1suk!2sse"
                width="600"
                height="450"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Contacts;
