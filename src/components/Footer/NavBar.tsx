'use client';

import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { footerInformationLinks } from '@/routes';

import logoFooter from '@/../public/logo-footer.svg';
import SocialLinks from '@/components/SocialLinks';
import style from './style.module.css';

const Footer = () => {
  const t = useTranslations('footer');
  const pathName = usePathname();
  return (
    <nav className={style.nav}>
      <Link href="/" className="logo">
        <Image src={logoFooter} width={180} alt="logo" />
      </Link>

      <div className={style.wrap}>
        <div>
          <b>{t('information.title')}</b>
          <ul className={style.menu}>
            {footerInformationLinks.map(({ path, label, id }) => {
              return (
                <li className={style.navItem} key={id}>
                  <Link
                    href={path}
                    className={clsx({
                      [style.active]: pathName !== '/' && pathName === `${path}/`,
                    })}
                  >
                    {t(`information.${label}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <b>{t('support.title')}</b>
          <ul className={style.menu}>
            <li className={style.navItem}>
              <Link href="">{t('support.guarantee')}</Link>
            </li>
            <li className={style.navItem}>
              <Link href="">{t('support.delivery')}</Link>
            </li>
            <li className={style.navItem}>
              <Link href="">{t('support.payment')}</Link>
            </li>
            <li className={style.navItem}>
              <Link href="">{t('support.return')}</Link>
            </li>
          </ul>
        </div>

        <div>
          <b>{t('contacts.title')}</b>
          <ul className={style.menu}>
            <li className={style.navItem}>
              <a href="tel:+380504545659">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.67187 11.7C9.44364 13.2938 10.7324 14.5792 12.3281 15.3469C12.4458 15.4026 12.576 15.4268 12.7059 15.4169C12.8358 15.407 12.9608 15.3635 13.0687 15.2907L15.4125 13.725C15.516 13.6548 15.6357 13.6119 15.7603 13.6005C15.8849 13.589 16.0104 13.6093 16.125 13.6594L20.5125 15.5438C20.6625 15.6062 20.7877 15.7162 20.869 15.8568C20.9504 15.9974 20.9832 16.1608 20.9625 16.3219C20.8234 17.4073 20.2937 18.4048 19.4723 19.1278C18.6509 19.8508 17.5943 20.2498 16.5 20.25C13.1185 20.25 9.87548 18.9067 7.48439 16.5156C5.0933 14.1246 3.75 10.8815 3.75 7.50003C3.75025 6.40578 4.1492 5.34911 4.87221 4.52774C5.59522 3.70637 6.59274 3.17659 7.67812 3.03753C7.83922 3.01684 8.00266 3.04967 8.14326 3.13099C8.28386 3.2123 8.39384 3.33758 8.45625 3.48753L10.3406 7.88441C10.3896 7.99723 10.4101 8.12038 10.4003 8.24299C10.3905 8.36561 10.3507 8.48393 10.2844 8.58753L8.71875 10.9688C8.64905 11.0765 8.60814 11.2003 8.59993 11.3283C8.59172 11.4563 8.61649 11.5843 8.67187 11.7V11.7Z"
                    stroke="#F5FFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>+380 50 454 56 59</span>
              </a>
            </li>
            <li className={style.navItem}>
              <a href="mailto:info@adventureprogear.com">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.29 2.54291L20.14 7.35291C21.205 8.10138 21.8392 9.32124 21.84 10.6229V17.7529C21.8374 18.8854 21.3849 19.9704 20.5823 20.7693C19.7796 21.5682 18.6925 22.0156 17.56 22.0129H6.28C5.14753 22.0156 4.06038 21.5682 3.25772 20.7693C2.45507 19.9704 2.00265 18.8854 2 17.7529V10.6229C2.00085 9.32124 2.63503 8.10138 3.7 7.35291L10.55 2.54291C11.3199 1.81903 12.5201 1.81903 13.29 2.54291ZM19.5216 19.7087C20.043 19.1911 20.3374 18.4876 20.34 17.7529V10.6229C20.326 9.82531 19.9322 9.08228 19.28 8.62291L12.43 3.81291L12.32 3.73291C12.2147 3.62541 12.0705 3.56483 11.92 3.56483C11.7695 3.56483 11.6253 3.62541 11.52 3.73291L11.41 3.81291L4.56 8.62291C3.90781 9.08228 3.51401 9.82531 3.5 10.6229V17.7529C3.50265 18.4876 3.79703 19.1911 4.31838 19.7087C4.83973 20.2263 5.54535 20.5156 6.28 20.5129H17.56C18.2947 20.5156 19.0003 20.2263 19.5216 19.7087Z"
                    fill="#F5FFFF"
                  />
                  <path
                    d="M17.99 11.0129L12.45 14.8829C12.286 15.047 12.0608 15.1349 11.829 15.1254C11.5973 15.1159 11.38 15.0098 11.23 14.8329L5.85 11.0129C5.63389 10.826 5.33035 10.7781 5.0672 10.8894C4.80405 11.0007 4.62701 11.2519 4.61062 11.5372C4.59422 11.8224 4.74133 12.0922 4.99 12.2329L10.29 16.0129C10.7246 16.4175 11.2962 16.6426 11.89 16.6429C12.4484 16.6288 12.9808 16.4037 13.38 16.0129L18.85 12.1929C19.1645 11.9602 19.2472 11.5248 19.04 11.1929C18.7977 10.8566 18.3305 10.7765 17.99 11.0129Z"
                    fill="#F5FFFF"
                  />
                </svg>
                <span>info@adventureprogear.com</span>
              </a>
            </li>
          </ul>
          <br />
          <b>{t('social.title')}</b>
          <div className={clsx(style.menu)}>
            <SocialLinks />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
