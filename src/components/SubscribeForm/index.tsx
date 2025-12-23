'use client';

import { useState } from 'react';
import clsx from 'clsx';

import style from './style.module.css';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const SubscribeForm: React.FC = () => {
  const t = useTranslations('footer.subscribe');

  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
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
            <Link className={style.agreement_label} href="/security_policy">
              {t('agreement')}
            </Link>
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
