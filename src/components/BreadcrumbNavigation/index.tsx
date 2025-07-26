'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BreadcrumbHome from '@/../public/icons/BreadcrumbHome.svg';
import Arrows from '@/../public/icons/Arrows.svg';
import { AppRoutes } from '@/constants/routes';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Locale } from '@/i18n-config';
import Container from '../Container';
import styles from './BreadcrumbNav.module.css';

interface BreadcrumbNavigationProps {
  locale: Locale;
  /* breadcrumbsData?: { [key: string]: string }; */
  breadcrumbsData?: string;
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({ locale, breadcrumbsData }) => {
  const params = useParams();
  const t = useTranslations(breadcrumbsData);
  const pathName = usePathname();
  const modifyPathName = (path: string) => {
    const pathArray = path.split(AppRoutes.HOME);
    const filteredArray = pathArray.filter(element => element !== '');
    if (locale && locale !== 'uk') {
      filteredArray.splice(0, 1);
    }
    return filteredArray;
  };
  const pathParts = modifyPathName(pathName);

  const getBreadcrumbLabel = (pathPart: string) => {
    // Если это последняя часть пути и есть params.id
    if (pathParts[pathParts.length - 1] === pathPart && params.id) {
      return params.id; // Просто показываем ID из параметров
    }

    // Если pathPart — это ID, возвращаем его
    if (/\d+/.test(pathPart)) {
      return pathPart;
    }

    // Пытаемся получить перевод
    return t(pathPart) || pathPart;
  };
  return (
    <div className={styles.breadcrumbsContainer}>
      <Container>
        <ul className={styles.breadcrumbsList}>
          <li className={styles.homeIcon}>
            <Link href="/">
              <Image src={BreadcrumbHome} alt="home icon" width={24} height={24} />
            </Link>
          </li>
          <Image src={Arrows} alt="arrow icon" width={20} height={20} />
          {pathParts.map((pathPart, index) => (
            <div key={index} className={styles.listItem}>
              <li>
                {index === pathParts.length - 1 ? (
                  <p>{getBreadcrumbLabel(pathPart)}</p>
                ) : (
                  <Link href={`/${locale}/${pathPart}/`}>{getBreadcrumbLabel(pathPart)}</Link>
                )}
              </li>
              {/* <li>
                {index === pathParts.length - 1 ? (
                  <p>{t(pathPart)}</p>
                ) : (
                  <Link href={`/${locale}/${pathPart}/`}>
                    {t(pathPart)}
                  </Link>
                )}
              </li> */}
              {index !== pathParts.length - 1 && (
                <Image
                  src={Arrows}
                  alt="arrow icon"
                  width={22}
                  height={22}
                  className={styles.arrowIcon}
                />
              )}
            </div>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default BreadcrumbNavigation;
