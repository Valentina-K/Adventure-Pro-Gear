import type { NextPage } from 'next';
import type { Locale } from '@/i18n-config';

import Container from '../Container';
import NavBar from '../Footer/NavBar';
import styles from './Footer.module.css';
import clsx from 'clsx';

interface FooterProps {
  locale?: Locale;
  translation: any;
}

const Footer: NextPage<FooterProps> = ({ translation, locale }) => (
  <footer className={clsx(styles.footer, 'footer')}>
    <Container>
      <NavBar locale={locale} />
    </Container>

    <div className={styles.subscribe}>
      <Container>
        <div className={styles.wrap}>
          <div className={styles.subscribeText}>
            <p>Будьте у центрі подій - підпишіться на наші новии! Новинки, знижки, акції.</p>
          </div>
          <form id="subscribeForm" className={clsx(styles.subscribeForm)}>
            <div className={styles.subscribeInputs}>
              <div className={styles.subscribeInput}>
                <input type="email" placeholder="Введіть Ваш e-mail" />
              </div>

              <div className={clsx(styles.subscribeInput, styles.agreement)}>
                <input type="checkbox" name="agreement" id="agreement" />
                <label htmlFor="agreement">Я прочитав і згоден з умовами Політики безпеки</label>
              </div>
            </div>
            <button type="submit" className={styles.subscribeBtn}>
              Підписатися
            </button>
          </form>
        </div>
      </Container>
    </div>

    <Container>
      <p className={styles.copyright}>
        <span>Тисячі товарів для яскравих пригод в онлайн магазині Adventure Pro Gear </span>
        <span>©{new Date().getFullYear()}</span>
      </p>
    </Container>
  </footer>
);

export default Footer;
