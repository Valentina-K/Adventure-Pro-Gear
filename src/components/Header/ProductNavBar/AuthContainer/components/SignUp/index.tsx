'use client';

import { Fragment, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Locale } from '@/i18n-config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registerAction } from '@/app/actions';
import Form from '@/components/Form';
import Checkbox from '@/components/Checkbox/Checkbox';
import { getAllTranslations, getTranslation } from '@/dictionaries/dictionaries';
import { getSignUpSchema, SignUpData } from '@/validation';
import { AppRoutes } from '@/constants/routes';
import { Button, Field } from '@/components/UI';

import styles from './SignUp.module.css';
import 'react-toastify/dist/ReactToastify.css';
import FieldPassword from '@/components/UI/Field/FieldPassword';

interface SignUpProps {
  locale: Locale;
}

const SignUp: React.FC<SignUpProps> = ({ locale }) => {
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
    formState: { errors, isValid },
  } = useForm<SignUpData>({
    mode: 'onTouched',
    resolver: zodResolver(getSignUpSchema(authTranslation)),
  });

  const onSubmit = async (data: SignUpData) => {
    setLoading(true);

    const response = await registerAction(data, locale);

    if (response?.submitError) {
			setError('email',{
				type: 'manual',
				message: response.submitError
			});
    }

    if (response?.success) {
      router.push(`/${locale}${AppRoutes.SIGNIN}`);
      toast.success(
        <>
          {response.success.map((line: string, index: number) => (
            <Fragment key={index}>
              {index === 0 ? (
                <h4>{line}</h4>
              ) : index === 2 ? (
                <p>
                  {line
                    .split('\n')
                    .map(substring =>
                      substring === 'Contact us. ' || substring === "Зв'язатися з нами. " ? (
                        <Link href={`/${locale}${AppRoutes.HOME}`}>{substring}</Link>
                      ) : (
                        substring
                      )
                    )}
                </p>
              ) : (
                <p>{line}</p>
              )}
              {index < response.success.length - 1 && <br />}
            </Fragment>
          ))}
        </>,
        {
          position: 'top-right',
          className: `${styles.toastMessage}`,
          bodyClassName: `${styles.toastBody}`,
          icon: false,
          autoClose: 36000000,
        }
      );
    }

    setLoading(false);
  };

  return (
    <div className={styles.formContainer}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.h4}>Реєстрація</h4>

        <Field register={register} name="name" placeholder="name" errors={errors?.name} required />

        <Field
          register={register}
          name="surname"
          placeholder="surname"
          errors={errors?.surname}
          required
        />

        <Field
          register={register}
          type="email"
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

        <Checkbox text="Remember me" className={styles.checkboxRegistration} id="regRemember" />

        <p className={styles.submitPolicy}>
          Реєструючись, ви погоджуєтеся з умовами
          <Link href={`/${locale}/policy`}>
            {' '}
            положення про обробку і захист персональних даних та угодою користувача
          </Link>
        </p>

        <Button
          full
          size="large"
          disabled={!isValid || loading}
          className={styles.submitRegistration}
        >
          Зареєструватися
        </Button>

        <Link className={styles.loginLink} href={`/${locale}${AppRoutes.SIGNIN}`}>
          Я вже зареєстрований
        </Link>
      </Form>
    </div>
  );
};

export default SignUp;
