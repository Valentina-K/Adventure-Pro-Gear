import { useState } from 'react';
import clsx from 'clsx';
import { UseFormRegister, Path, FieldError } from 'react-hook-form';
import Image from 'next/image';
import Eye from '@/../public/icons/Eye.svg';
import Error from '@/../public/icons/Error.svg';

import styles from './style.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  register: UseFormRegister<any>;
  errors?: FieldError;
  name: string;
  type?: 'password';
}

export default function FieldPassword({
  name,
  type = 'password',
  register,
  errors,
  ...props
}: Props) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className={clsx(styles.inputContainer)}>
      <input
        className={clsx(styles.input)}
        type={passwordVisible ? 'text' : type}
        {...register(name)}
        {...props}
      />

      <Image
        src={Eye}
        className={styles.hideIcon}
        alt="hide icon"
        width={20}
        height={20}
        onClick={() => setPasswordVisible(prev => !prev)}
      />

      {errors && (
        <div className={styles.errorContainer}>
          <Image
            src={Error}
            alt="error icon"
            width={11}
            height={11}
            className={styles.errorImage}
          />
          <p className={styles.error}>{errors?.message}</p>
        </div>
      )}
    </div>
  );
}
