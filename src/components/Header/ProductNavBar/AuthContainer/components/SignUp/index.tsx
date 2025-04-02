import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

import { registerAction } from '@/app/actions';
import Form from '@/components/Form';
import Checkbox from '@/components/Checkbox/Checkbox';
import { getSignUpSchema, SignUpData } from '@/validation';
import { AppRoutes } from '@/constants/routes';
import { Button, Field } from '@/components/UI';
import FieldPassword from '@/components/UI/Field/FieldPassword';

import styles from './SignUp.module.css';
// import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('auth');
  const tValidate = useTranslations('auth.registration.zod');

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<SignUpData>({
    mode: 'onChange',
    resolver: zodResolver(getSignUpSchema(tValidate)),
  });

  const onSubmit = async (data: SignUpData) => {
    setLoading(true);

    const response = await registerAction(data, locale);

    if (response?.submitError) {
      setError('email', {
        type: 'manual',
        message: response.submitError,
      });
    }

    if (response?.success) {
      setIsSuccess(true);
      // router.push(`/${locale}${AppRoutes.SIGNIN}`);

      // toast.success(
      //   <>
      //     {response.success.map((line: string, index: number) => (
      //       <Fragment key={index}>
      //         {index === 0 ? (
      //           <h4>{line}</h4>
      //         ) : index === 2 ? (
      //           <p>
      //             {line
      //               .split('\n')
      //               .map(substring =>
      //                 substring === 'Contact us. ' || substring === "Зв'язатися з нами. " ? (
      //                   <Link href={`${AppRoutes.HOME}`}>{substring}</Link>
      //                 ) : (
      //                   substring
      //                 )
      //               )}
      //           </p>
      //         ) : (
      //           <p>{line}</p>
      //         )}
      //         {index < response.success.length - 1 && <br />}
      //       </Fragment>
      //     ))}
      //   </>,
      //   {
      //     position: 'top-right',
      //     className: `${styles.toastMessage}`,
      //     bodyClassName: `${styles.toastBody}`,
      //     icon: false,
      //     autoClose: 36000000,
      //   }
      // );
    }

    setLoading(false);
  };

  if (isSuccess) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.modalContent}>
          <h2 style={{ marginBottom: '20px' }}>{t('registration.success.0')}</h2>
          <p>{t('registration.success.1')}</p>
          <br />
          <p>{t('registration.success.2')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.h4}>{t('registration.title')}</h4>

        <Field
          register={register}
          name="name"
          placeholder={t('name')}
          errors={errors?.name}
          required
        />

        <Field
          register={register}
          name="surname"
          placeholder={t('surname')}
          errors={errors?.surname}
          required
        />

        <Field
          register={register}
          type="email"
          name="email"
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

        <Checkbox text={t('rememberMe')} className={styles.checkboxRegistration} id="regRemember" />

        <p className={styles.submitPolicy}>
          {t.rich('registration.policy', {
            // eslint-disable-next-line react/no-unstable-nested-components
            link: chunks => <Link href="/policy">{chunks}</Link>,
          })}
        </p>

        <Button
          full
          size="large"
          disabled={!isValid || loading}
          className={styles.submitRegistration}
        >
          {t('signUp')}
        </Button>

        {/* change parameter on click to ${AppRoutes.SIGNIN} */}
        <Link className={styles.loginLink} href={`${AppRoutes.SIGNIN}`}>
          {t('I have registered')}
        </Link>
      </Form>
    </div>
  );
};

export default SignUp;
