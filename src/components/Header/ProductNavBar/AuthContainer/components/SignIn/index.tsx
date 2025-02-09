'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, usePathname, redirect } from 'next/navigation';
import { Locale } from '@/i18n-config';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { getLogInSchema, LogInData } from '@/validation';
// import Button from '@/components/Button';
import { AppRoutes } from '@/constants/routes';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox/Checkbox';

import styles from './SignIn.module.css';
import { Field, Button } from '@/components/UI';
import FieldPassword from '@/components/UI/Field/FieldPassword';

interface SignInProps {
  locale: Locale;
}

const SignIn: React.FC<SignInProps> = ({ locale }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [authTranslation, setAuthTranslation] = useState<any>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      const translations = await getAllTranslations(locale);
      const translationFunction = getTranslation(translations);
      setAuthTranslation(translationFunction('auth'));
    };

    loadTranslations();
  }, [locale]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid },
  } = useForm<LogInData>({
    mode: 'onSubmit',
    resolver: zodResolver(getLogInSchema(authTranslation)),
  });

  const onSubmit = async (data: LogInData) => {
    setLoading(true);

    try {
      const response = await signIn('credentials', {
        redirect: false,
        ...data,
      });

      if (response?.ok) {
        router.push(`/${locale}${AppRoutes.PERSONAL_ACCOUNT}`);
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
        <h4 className={styles.h4}>Вхід</h4>

        <Field
          register={register}
          name="email"
          placeholder="email"
          errors={errors?.email}
          required
        />

        <FieldPassword
          register={register}
          name="password"
          placeholder="password"
          errors={errors?.password}
          required
        />

        <Link
          href={`/${locale}/${AppRoutes.FORGOT_PASSWORD}`}
          className={styles.restorePasswordLink}
        >
          Забули пароль?
        </Link>

        <Checkbox className={styles.checkboxSignIn} text="Remember me" id="remember" />

        <Button full size="large" disabled={!isValid || loading}>
          {loading ? 'loading...' : 'Увійти'}
        </Button>

        <Link className={styles.registerLink} href={`/${locale}${AppRoutes.SIGN_UP}`}>
          Зареєструватися
        </Link>
      </Form>
    </div>
  );
};

export default SignIn;
