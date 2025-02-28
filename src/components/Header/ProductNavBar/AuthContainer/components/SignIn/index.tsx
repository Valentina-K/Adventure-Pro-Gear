import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';

import { getLogInSchema, LogInData } from '@/validation';
import { useRouter } from '@/i18n/routing';
import { AppRoutes } from '@/constants/routes';
import Form from '@/components/Form';
import Checkbox from '@/components/Checkbox/Checkbox';
import { Field, Button } from '@/components/UI';
import FieldPassword from '@/components/UI/Field/FieldPassword';
import styles from './SignIn.module.css';

const SignIn: React.FC = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('auth');
  const tValidate = useTranslations('auth.login.zod');

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LogInData>({
    mode: 'onTouched',
    resolver: zodResolver(getLogInSchema(tValidate)),
  });

  const onSubmit = async (data: LogInData) => {
    setLoading(true);

    try {
      const response = await signIn('credentials', {
        redirect: false,
        ...data,
      });

      if (response?.ok) {
        router.push({
          pathname: `${AppRoutes.PERSONAL_ACCOUNT}`,
        });
      } else {
        setError('email', {
          type: 'manual',
          message: 'Incorrect email or password',
        });
      }
    } catch (error) {
      console.error('SignIn error:', error);
    }

    setLoading(false);
  };

  return (
    <div className={styles.formContainer}>
      <Form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.h4}>{t('login.title')}</h4>

        <Field
          register={register}
          name="email"
          type="email"
          placeholder={t('email')}
          errors={errors?.email}
          required
        />

        <FieldPassword
          register={register}
          name="password"
          placeholder={t('password')}
          errors={errors?.password}
          required
        />

        <Link
          href={`/${locale}/${AppRoutes.FORGOT_PASSWORD}`}
          className={styles.restorePasswordLink}
        >
          {t('login.forgotPassword')}
        </Link>

        <Checkbox className={styles.checkboxSignIn} text={t('rememberMe')} id="logRemember" />

        <Button full size="large" disabled={!isValid || loading}>
          {loading ? 'loading...' : t('signIn')}
        </Button>

        <Link className={styles.registerLink} href={`/${locale}${AppRoutes.SIGN_UP}`}>
          {t('signUp')}
        </Link>
      </Form>
    </div>
  );
};

export default SignIn;
