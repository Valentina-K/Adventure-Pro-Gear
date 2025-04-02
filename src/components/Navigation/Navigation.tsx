'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import arrowsLeft from '@/../public/icons/Arrows.svg';
import homeIcon from '@/../public/icons/home.svg';
import styles from './Navigation.module.css';
import Loading from '../Loading';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface Props {
  navigationPage?: string;
  title?: string;
  productName?: string;
  breadcrumbs?: string[];
}

function Navigation({ navigationPage, title, productName, breadcrumbs: providedBreadcrumbs }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    // If breadcrumbs array is provided, use it directly
    if (providedBreadcrumbs) {
      return providedBreadcrumbs.map((label, index) => ({
        label,
        href: index === 0 ? '/' : `/${providedBreadcrumbs.slice(1, index + 1).join('/')}`,
      }));
    }

    const pathArray = pathName.split('/').filter(item => item !== '');
    const generatedBreadcrumbs: BreadcrumbItem[] = [];
    let currentPath = '';

    pathArray.forEach((path, index) => {
      currentPath += `/${path}`;

      // Skip locale segment in the breadcrumb display
      if (index === 0 && (path === 'uk' || path === 'en')) {
        return;
      }

      let label = path.replace(/-/g, ' ');
      if (index === pathArray.length - 1 && title) {
        label = title;
      } else if (productName && index === pathArray.length - 1) {
        label = productName;
      }

      generatedBreadcrumbs.push({
        label: label,
        href: currentPath,
      });
    });

    return generatedBreadcrumbs;
  };

  const handleRedirectHomeClick = () => {
    router.push(`${locale === 'uk' ? '/' : `/${locale}/`}`);
    setLoading(prev => !prev);
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className={styles.about_navigation_container} aria-label="Breadcrumb">
      <button onClick={handleRedirectHomeClick} className={styles.homeIcon}>
        <Image src={homeIcon} alt="Home" width={24} height={24} />
      </button>

      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          <Image
            src={arrowsLeft}
            alt="separator"
            width={20}
            height={20}
            className={styles.about_navigation_img}
          />
          <Link
            href={breadcrumb.href}
            className={`${styles.about_navigation} ${
              index === breadcrumbs.length - 1 ? styles.title_navigation : ''
            }`}
          >
            {breadcrumb.label}
          </Link>
        </React.Fragment>
      ))}

      {loading && <Loading />}
    </nav>
  );
}

export default Navigation;
