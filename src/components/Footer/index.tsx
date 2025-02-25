import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import SubscribeForm from '../SubscribeForm';
import Container from '../Container';
import NavBar from './NavBar';
import style from './style.module.css';

const Footer = () => {
  const t = useTranslations('footer');

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
              <p>{t('subscribe.description')}</p>
            </div>
            <SubscribeForm />
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
