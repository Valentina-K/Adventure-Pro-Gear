import React from 'react';
import type { UseFormRegister, FieldError } from 'react-hook-form';
import Image from 'next/image';
import styles from './style.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>;
  register: UseFormRegister<any>;
  errors?: FieldError;
  name: string;
  className?: string;
  type?: 'text' | 'email';
}

export function Field({ name, register, errors, className, type = 'text', ...props }: Props) {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        className={`${className} ${styles.input}`}
        {...register(name)}
        {...props}
      />
      {errors && (
        <div className={styles.errorContainer}>
          <Image
            src="/icons/Error.svg"
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
