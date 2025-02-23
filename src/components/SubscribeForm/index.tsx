'use client';

import { useState } from 'react';
import { Locale } from '@/i18n-config';
import clsx from 'clsx';

import style from './style.module.css';
import { useTranslations } from 'next-intl';

const SubscribeForm: React.FC = () => {
  const t = useTranslations('footer.subscribe');

  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log('submit email: ', formData.get('email'));
  };

  return (
    <form onSubmit={handleSubmit} id="subscribeForm" className={clsx(style.subscribeForm)}>
      <div className={style.inputContainer}>
        <div className={style.input}>
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            name="email"
            type="email"
            placeholder={t('placeholder')}
            required
          />
        </div>

        <div className={clsx(style.input, style.agreement)}>
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            required
            aria-labelledby="agreement-label"
          />
          <label id="agreement-label" htmlFor="agreement">
            {t('agreement')}
          </label>
        </div>
      </div>

      <button type="submit" disabled={!email} className={style.btn}>
        {t('subscribe')}
      </button>
    </form>
  );
};

export default SubscribeForm;
