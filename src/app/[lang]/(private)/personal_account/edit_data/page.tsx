'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  updatePersonalData,
  updatePassword,
  updateEmail,
  getPersonalData,
  deleteUser,
} from '@/app/actions';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Button from '@/components/Button';
// import Checkbox from '@/components/Checkbox/Checkbox';
import styles from './EditData.module.css';

type FormDataGroup = 'personalData' | 'newPassword' | 'newEmail';

interface FormData {
  personalData: {
    name: string;
    surname: string;
    phoneNumber: string;
    streetAndHouseNumber: string;
    city: string;
    postalCode: string;
  };
  newPassword: {
    password: string;
    confirmPassword: string;
  };
  newEmail: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const EditData = () => {
  const params = useParams();
  const t = useTranslations('profile.editProfile');
  const calledRef = useRef(false);

  const [formData, setFormData] = useState<FormData>({
    personalData: {
      name: '',
      surname: '',
      phoneNumber: '',
      streetAndHouseNumber: '',
      city: '',
      postalCode: '',
    },
    newPassword: {
      password: '',
      confirmPassword: '',
    },
    newEmail: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [actionType, setActionType] = useState<string | null>(null);

  const [shouldSignOut, setShouldSignOut] = useState(false);

  useEffect(() => {
    if (shouldSignOut) {
      const timer = setTimeout(() => {
        signOut({ callbackUrl: '/?auth=signin' });
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [shouldSignOut]);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    (async () => {
      const user = await getPersonalData();

      const sanitizeValue = (value: string | null | undefined) =>
        (value === 'null' || value == null ? '' : value);

      if (typeof user === 'object' && !Array.isArray(user)) {
        setFormData({
          personalData: {
            name: sanitizeValue(user.name),
            surname: sanitizeValue(user.surname),
            phoneNumber: sanitizeValue(user.phoneNumber),
            streetAndHouseNumber: sanitizeValue(user.streetAndHouseNumber),
            city: sanitizeValue(user.city),
            postalCode: sanitizeValue(user.postalCode),
          },
          newPassword: {
            password: sanitizeValue(user.password),
            confirmPassword: sanitizeValue(user.confirmPassword),
          },
          newEmail: {
            email: sanitizeValue(user.email),
            password: sanitizeValue(user.password),
            confirmPassword: sanitizeValue(user.confirmPassword),
          },
        });
      } else {
        toast.error(user, {
          position: 'top-right',
          className: `${styles.signInToastErrorMessage}`,
          bodyClassName: `${styles.signInToastBody}`,
          autoClose: 36000000,
        });
      }
    })();
  }, []);

  const handleChange = (group: FormDataGroup) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => ({
      ...prevData,
      [group]: {
        ...prevData[group],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const filterEmptyFields = (data: Record<string, string>) => {
    // eslint-disable-next-line no-shadow
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      // if (value.trim() !== '') {
      formData.append(key, value);
      // }
    });
    console.log('Filtered form Data:', formData);
    return formData;
  };

  const deleteAccount = async () => {
    const res = await deleteUser();
    console.log('res delete', res);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    switch (actionType) {
      case 'updatePersonalData':
        // eslint-disable-next-line no-case-declarations
        const filteredPersonalData = filterEmptyFields(formData.personalData);
        // eslint-disable-next-line no-case-declarations
        const res = await updatePersonalData(filteredPersonalData);

        if (res) {
          // if (
          // eslint-disable-next-line max-len
          //   Object.values(res).some(value => value === '' || value === null || value === undefined)
          // ) {
          //   return toast.error('Fill in all required fields for input', {
          //     position: 'top-right',
          //     className: `${styles.signInToastErrorMessage}`,
          //     bodyClassName: `${styles.signInToastBody}`,
          //     autoClose: 36000000,
          //   });
          // }

          if (typeof res === 'object') {
            toast.success('Information successfully updated. You need to sign in again.', {
              position: 'top-right',
              className: `${styles.signInToastErrorMessage}`,
              bodyClassName: `${styles.signInToastBody}`,
              autoClose: 36000000,
            });
            setShouldSignOut(true);
            return;
          } else {
            return toast.error(typeof res === 'string' ? res : 'Please try again later.', {
              position: 'top-right',
              className: `${styles.signInToastErrorMessage}`,
              bodyClassName: `${styles.signInToastBody}`,
              autoClose: 36000000,
            });
          }
        }
      // eslint-disable-next-line no-fallthrough
      case 'updatePassword':
        // eslint-disable-next-line no-case-declarations
        const filteredPasswordData = filterEmptyFields(formData.newPassword);
        // eslint-disable-next-line no-case-declarations
        const resupdatePassword = await updatePassword(filteredPasswordData);

        // if (resupdatePassword) {
        if (resupdatePassword.length === 0) {
          toast.success('Password successfully updated. You need to sign in again.', {
            position: 'top-right',
            className: `${styles.signInToastErrorMessage}`,
            bodyClassName: `${styles.signInToastBody}`,
            autoClose: 36000000,
          });
          setShouldSignOut(true);
          return;
        } else {
          return toast.error(resupdatePassword || 'Please try again later.', {
            position: 'top-right',
            className: `${styles.signInToastErrorMessage}`,
            bodyClassName: `${styles.signInToastBody}`,
            autoClose: 36000000,
          });
        }
      // }
      // break;
      case 'updateEmail':
        // eslint-disable-next-line no-case-declarations
        const filteredEmailData = filterEmptyFields(formData.newEmail);
        // eslint-disable-next-line no-case-declarations
        const resFilteredEmail = await updateEmail(filteredEmailData);

        // if (resFilteredEmail) {
        if (resFilteredEmail.length === 0) {
          toast.success('Password successfully updated. You need to sign in again.', {
            position: 'top-right',
            className: `${styles.signInToastErrorMessage}`,
            bodyClassName: `${styles.signInToastBody}`,
            autoClose: 36000000,
          });
          setShouldSignOut(true);
          return;
        } else {
          return toast.error(resFilteredEmail || 'Please try again later.', {
            position: 'top-right',
            className: `${styles.signInToastErrorMessage}`,
            bodyClassName: `${styles.signInToastBody}`,
            autoClose: 36000000,
          });
          // }
        }
      // break;
      default:
        console.error('Unknown action type');
    }
  };

  return (
    <Form className={styles.editDataForm} onSubmit={handleSubmit}>
      <div className={styles.heading}>
        <h4 className={styles.formHeader}>{t('title')}</h4>
        <p className={styles.deleteAccount} aria-hidden="true" onClick={deleteAccount}>
          {t('delete')}
        </p>
      </div>
      <div className={styles.personalDataContainerWithHeader}>
        <p className={styles.personalDataHeder}>{t('personalData')}</p>
        <div className={styles.personalDataContainer}>
          <div className={styles.personalData}>
            <Input
              placeholder={params.lang === 'uk' ? 'Імʼя' : 'Name'}
              name="name"
              value={formData?.personalData?.name}
              type="text"
              onChange={handleChange('personalData')}
            />
            <Input
              placeholder={params.lang === 'uk' ? 'Прізвище' : 'Surname'}
              name="surname"
              value={formData?.personalData?.surname}
              type="text"
              onChange={handleChange('personalData')}
            />
            <Input
              type="text"
              placeholder={params.lang === 'uk' ? 'Телефон' : 'Phone'}
              value={formData?.personalData?.phoneNumber}
              name="phoneNumber"
              onChange={handleChange('personalData')}
            />
          </div>
          <div className={styles.personalData}>
            <Input
              placeholder={
                params.lang === 'uk' ? 'Вулиця та номер будинку' : 'Street and house number'
              }
              name="streetAndHouseNumber"
              value={formData?.personalData?.streetAndHouseNumber}
              type="text"
              onChange={handleChange('personalData')}
            />
            <Input
              placeholder={params.lang === 'uk' ? 'Місто' : 'City'}
              name="city"
              value={formData?.personalData?.city}
              type="text"
              onChange={handleChange('personalData')}
            />
            <Input
              placeholder={params.lang === 'uk' ? 'Поштовий індекс' : 'Postal code'}
              name="postalCode"
              value={formData?.personalData?.postalCode}
              type="text"
              onChange={handleChange('personalData')}
            />
          </div>
        </div>
      </div>
      <div className={styles.mailingContainet}>
        <h6 className={styles.spam}>{t('mailing.mailing')}</h6>
        <div className={styles.subscriptionContainer}>
          <p className={styles.subscription}>{t('mailing.descr')}</p>
          <div className={styles.radio_container}>
            <div className={styles.radio_container}>
              <input
                type="radio"
                id="yes"
                name="rememberme"
                defaultChecked
                className={styles.input}
              />
              <label htmlFor="yes" className={styles.label}>
                {t('mailing.yes')}
              </label>
            </div>

            <div className={styles.radio_container}>
              <input
                type="radio"
                name="rememberme"
                id="no"
                value="other"
                className={styles.input}
              />
              <label htmlFor="no" className={styles.label}>
                {t('mailing.no')}
              </label>
            </div>
          </div>
          {/* <Checkbox text="Так" className={styles.checkbox} />
        <Checkbox text="Ні" className={styles.checkbox} /> */}
        </div>
      </div>
      <Button
        className={styles.submitButton}
        backgroundColor="#376B8E"
        color="#F5FFFF"
        text={params.lang === 'uk' ? 'Зберегти дані' : 'Save data'}
        type="submit"
        // color="transparent"
        onClick={() => setActionType('updatePersonalData')}
      />
      {/* <Input type="submit" value="Зберегти дані" /> */}
      <br />
      <h6 className={styles.spam}>{t('newPassword')}</h6>
      <div className={styles.EditPassword}>
        <Input
          placeholder={params.lang === 'uk' ? 'Новий пароль' : 'New password'}
          type="password"
          name="password"
          value={formData?.newPassword?.password}
          onChange={handleChange('newPassword')}
        />
        <Input
          placeholder={params.lang === 'uk' ? 'Повторити пароль' : 'Repeat password'}
          type="password"
          name="confirmPassword"
          value={formData?.newPassword?.confirmPassword}
          onChange={handleChange('newPassword')}
        />
      </div>
      <Button
        className={styles.submitButton}
        backgroundColor="#376B8E"
        color="#F5FFFF"
        text={params.lang === 'uk' ? 'Змінити пароль' : 'Change password'}
        type="submit"
        // color="transparent"
        onClick={() => setActionType('updatePassword')}
      />
      <br />

      <h6 className={styles.spam}>{t('newEmail')}</h6>
      <div className={styles.EditEmailContainer}>
        <div className={styles.editEmail}>
          <Input
            placeholder="E-mail"
            type="email"
            name="email"
            value={formData.newEmail.email}
            onChange={handleChange('newEmail')}
          />
          <Input
            placeholder={params.lang === 'uk' ? 'Пароль' : 'Password'}
            type="password"
            name="password"
            value={formData.newEmail.password}
            onChange={handleChange('newEmail')}
          />
          <Input
            placeholder={params.lang === 'uk' ? 'Повторити пароль' : 'Repeat password'}
            type="password"
            name="confirmPassword"
            value={formData.newEmail.confirmPassword}
            onChange={handleChange('newEmail')}
          />
        </div>
        <p className={styles.emailChangeInfo}>{t('emailDescr')}</p>
      </div>
      <Button
        className={styles.submitButton}
        backgroundColor="#376B8E"
        color="#F5FFFF"
        text={params.lang === 'uk' ? 'Змінити E-mail' : 'Change Email'}
        // color="transparent"
        type="submit"
        onClick={() => setActionType('updateEmail')}
      />
    </Form>
  );
};

export default EditData;
