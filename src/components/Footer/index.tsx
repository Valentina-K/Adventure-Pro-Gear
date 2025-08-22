'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import SubscribeForm from '../SubscribeForm';
import Container from '../Container';
import NavBar from './NavBar';
import style from './style.module.css';
import { useState } from 'react';
import Image from 'next/image';
import arrowsDown from '../../../public/icons/arrowsDown.svg';
import arrowsUp from '../../../public/icons/arrowsUp.svg';

const Footer = () => {
  const t = useTranslations('footer');
    const [openSection, setOpenSection] = useState<string | null>(null);
  
    const toggleSection = (section: string) => {
      setOpenSection(prev => (prev === section ? null : section));
    };
  
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 743;

  return (
    <footer className={clsx(style.footer, 'footer')}>
      <div>
        <Container>
          <NavBar />
        </Container>
      </div>

      <div className={style.subscribeContainer}>
        <Container>
          <div className={style.wrap}>
            <div className={style.text}>
              {isMobile ? (
                <button
                  onClick={() => toggleSection('subscribe')}
                  className={`${style.btn} ${style.btn_subscribe}`}
                >
                  {t('subscribe.description')}
                  {openSection === 'subscribe' ? (
                    <Image
                      src={arrowsUp}
                      width={25}
                      alt="arrowsUp"
                      style={{
                        filter: 'brightness(0) invert(1)',
                      }}
                    />
                  ) : (
                    <Image
                      src={arrowsDown}
                      width={25}
                      alt="arrowsDown"
                      style={{
                        filter: 'brightness(0) invert(1)',
                      }}
                    />
                  )}
                </button>
              ) : (
                <p>{t('subscribe.description')}</p>
              )}
            </div>
            {(openSection === 'subscribe' || !isMobile) && <SubscribeForm />}
          </div>
        </Container>
      </div>

      <div>
        <Container>
          <p className={style.copyright}>
            <span>{t('copyText')}</span>
            <span> ©</span>
            <span>{new Date().getFullYear()}</span>
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
