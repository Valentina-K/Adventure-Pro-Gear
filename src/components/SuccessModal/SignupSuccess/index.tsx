'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { verifyEmail } from '@/clientServices/clientAxios';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import SucceessIcon from '@/../public/icons/success _vector.svg';
import WarningIcon from '@/../public/icons/warning.svg';
import generic from '../style.module.css';

const iconSize = [
  {
    w: 78,
    h: 92,
  },
  {
    w: 85,
    h: 100,
  },
];

function SignupSuccess() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const t = useTranslations('auth');
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [icon, setIcon] = useState(WarningIcon);
  const windWidth = useWindowWidth();
  const { w, h } = windWidth > 743 ? iconSize[1] : iconSize[0];

  useEffect(() => {
    const verifyEmailWithToken = async (token: string) => {
      try {
        const result = await verifyEmail(token);
        if (result.success) {
          setSuccess(true);
          setIcon(SucceessIcon);
        } else {
          setSuccess(false);
        }
      } catch {
        setSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      verifyEmailWithToken(token);
    } else {
      setIsLoading(false);
      setSuccess(false);
    }
  }, [token]);

  if (isLoading) {
    return <h2 className={generic.title}>{t('registration.success.3')}</h2>;
  }

  return (
    <div>
      {success ? (
        <h2 className={generic.title}>{t('registration.success.4')}</h2>
      ) : (
        <h2 className={generic.title}>{t('registration.success.5')}</h2>
      )}
      <div style={{ border: '1px solid lightblue' }}>
        <Image src={icon} width={w} height={h} alt="icon" />
      </div>
    </div>
  );
}

export default SignupSuccess;
