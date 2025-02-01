import type { Locale } from '@/i18n-config';
import clsx from 'clsx';

import SubscribeForm from '../SubscribeForm';
import Container from '../Container';
import NavBar from './NavBar';
import style from './style.module.css';

interface FooterProps {
  locale?: Locale;
  translation: any;
}

const Footer: React.FC<FooterProps> = ({ translation, locale }) => (
  <footer className={clsx(style.footer, 'footer')}>
    <div>
      <Container>
        <NavBar locale={locale} />
      </Container>
    </div>

    <div className={style.subscribeContainer}>
      <Container>
        <div className={style.wrap}>
          <div className={style.text}>
            <p>Будьте у центрі подій - підпишіться на наші новии! Новинки, знижки, акції.</p>
          </div>
          <SubscribeForm translation={translation} locale={locale} />
        </div>
      </Container>
    </div>

    <div>
      <Container>
        <p className={style.copyright}>
          <span>Тисячі товарів для яскравих пригод в онлайн магазині Adventure Pro Gear </span>
          <span>©</span>
          <span>{new Date().getFullYear()}</span>
        </p>
      </Container>
    </div>
  </footer>
);

export default Footer;
