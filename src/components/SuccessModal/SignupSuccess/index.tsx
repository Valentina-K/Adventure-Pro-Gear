'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { verifyEmail } from '@/clientServices/clientAxios';
import SucceessIcon from '@/../public/icons/success _vector.svg';
import WarningIcon from '@/../public/icons/warning.svg';
import generic from '../style.module.css';

function SignupSuccess() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const t = useTranslations('auth');
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);

  useEffect(() => {    
    setToken(searchParams.get('token'));
  }, []);
  
  useEffect(() => {
    const verifyEmailWithToken = async (token: string) => {
      try {
        const result = await verifyEmail(token);
        if (result.success) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch {
        setSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) verifyEmailWithToken(token);
  }, [token]);

  if (isLoading) {
    return <h2 className={generic.title}>{t('registration.success.3')}</h2>;
  }

  return (
    <div>      
      <h2 className={generic.title}>{success ? t('registration.success.4'): t('registration.success.5')}</h2>      
      <div className={generic.iconWrapper}>
        <Image src={success ? SucceessIcon : WarningIcon} width={85} height={100} alt="icon" />
      </div>
    </div>
  );
}

export default SignupSuccess;
