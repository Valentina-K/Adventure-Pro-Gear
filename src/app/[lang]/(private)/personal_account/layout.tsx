import React from 'react';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import ProfileMenu from '@/components/ProfileMenu';
import Container from '@/components/Container';
import { Locale } from '@/i18n-config';
import styles from './personalAccount.module.css';

interface RootLayoutProps {
  children: React.ReactNode | React.ReactNode[];
  params: {
    lang: Locale;
  };
}

const DashboardLayout: React.FC<RootLayoutProps> = async ({ children, params }) => (
  <div className={styles.personalAccountLayout}>
    <BreadcrumbNavigation locale={params.lang} breadcrumbsData="breadcrumbsData.breadcrumbs" />
    <Container className={styles.dashboardWrapper}>
      <ProfileMenu className={styles.profileMenuLayout} />
      <section className={styles.section}>{children}</section>
    </Container>
  </div>
);
export default DashboardLayout;
