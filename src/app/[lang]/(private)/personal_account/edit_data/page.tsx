'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
import success from "../../../../../../public/icons/success _vector.svg";
import successDelete from '../../../../../../public/images/illustration_travel.svg';
import successEmail from '../../../../../../public/images/10783912_19198898.svg';
import styles from './EditData.module.css';
import Modal from '@/components/Modal';
import Image from 'next/image';
import { getUserInfoService } from '@/services/axios';

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
  const router = useRouter();
  const t = useTranslations('profile.editProfile');
  const calledRef = useRef(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const shouldShowModal = isModalOpen;

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
      if (isModalOpen) {
        setIsOverlayOpen(true);
      } else {
        setIsOverlayOpen(false);
      }
    }, [isModalOpen]);
  
  const closeModal = () => {
      setIsModalOpen(false);
      // const params = new URLSearchParams(searchParams.toString());
      // params.delete('auth');
      // const newUrl = `${path}${params.toString() ? `?${params.toString()}` : ''}`;
      // router.push(newUrl, { scroll: false });
  };
  
  const openModal = (type: string) => {    
    setIsModalOpen(
      type === 'updatePersonalData' ||
        type === 'delete' ||
        type === 'successDelete' ||
        type === 'changeEmail' ||
        type === 'successChangeEmail'
    );
    setTypeModal(type)
  }

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
    openModal("delete")
  };

  const successDeleteAccount = async () => {
    try {
      const res = await deleteUser();
      console.log('res delete', res);      

      if (res.status === 200 || res.status === 201) {
        openModal('successDelete');

        setTimeout(() => {
          router.push('/');
        }, 3000);
        return
      }
        setIsModalOpen(false);
        throw new Error('Something went wrong. Please try again later.');

    } catch (error) {    
     return toast.error('Something went wrong. Please try again later.', {
       position: 'top-right',
       className: `${styles.signInToastErrorMessage}`,
       bodyClassName: `${styles.signInToastBody}`,
       autoClose: 36000000,
     });
    }   
  };

  const closeDeleteAccount = async () => {
    setIsModalOpen(false)
  };
  
  const changeEmail = () => {
    openModal('changeEmail');
  }

  const closeChangeEmail = () => {
    setIsModalOpen(false);
  }

  const successChangeEmail = async () => {
    try {
      const filteredEmailData = filterEmptyFields(formData.newEmail);
      const resFilteredEmail = await updateEmail(filteredEmailData);
      console.log('resFilteredEmail', resFilteredEmail);
      
      if (resFilteredEmail.status === 404) {
        setIsModalOpen(false);
        throw new Error('Something went wrong. Please try again later.');
      }

      if (resFilteredEmail.length === 0) {
        openModal('successChangeEmail');
        setTimeout(() => {
        setShouldSignOut(true);
       }, 3000);
      } else {
         setIsModalOpen(false);
          return toast.error(resFilteredEmail || 'Please try again later.', {
            position: 'top-right',
            className: `${styles.signInToastErrorMessage}`,
            bodyClassName: `${styles.signInToastBody}`,
            autoClose: 36000000,
          });
      };
        } catch (error) {
          return toast.error('Something went wrong. Please try again later.', {
            position: 'top-right',
            className: `${styles.signInToastErrorMessage}`,
            bodyClassName: `${styles.signInToastBody}`,
            autoClose: 36000000,
        });
    }    
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
       switch (actionType) {
         case 'updatePersonalData': {
           const filteredPersonalData = filterEmptyFields(formData.personalData);
           const res = await updatePersonalData(filteredPersonalData);

           if (res) {
             if (typeof res === 'object') {

               if (res.status === 400 || res.status === 404) {
                  throw new Error('Please try again later.');
                } else {
                 openModal('updatePersonalData');
               }

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
           break;
         }

         case 'updatePassword': {
           const filteredPasswordData = filterEmptyFields(formData.newPassword);
           const resupdatePassword = await updatePassword(filteredPasswordData);

           if (resupdatePassword.length === 0) {
             toast.success('Password successfully updated. You need to sign in again.', {
               position: 'top-right',
               className: `${styles.signInToastErrorMessage}`,
               bodyClassName: `${styles.signInToastBody}`,
               autoClose: 36000000,
             });
             setShouldSignOut(true);
           } else {
             return toast.error(resupdatePassword || 'Please try again later.', {
               position: 'top-right',
               className: `${styles.signInToastErrorMessage}`,
               bodyClassName: `${styles.signInToastBody}`,
               autoClose: 36000000,
             });
           }
           break;
         }

        //  case 'updateEmail': {
        //    const filteredEmailData = filterEmptyFields(formData.newEmail);
        //    const resFilteredEmail = await updateEmail(filteredEmailData);

        //    if (resFilteredEmail.length === 0) {
        //      toast.success('Email successfully updated. You need to sign in again.', {
        //        position: 'top-right',
        //        className: `${styles.signInToastErrorMessage}`,
        //        bodyClassName: `${styles.signInToastBody}`,
        //        autoClose: 36000000,
        //      });
        //      setShouldSignOut(true);
        //    } else {
        //      return toast.error(resFilteredEmail || 'Please try again later.', {
        //        position: 'top-right',
        //        className: `${styles.signInToastErrorMessage}`,
        //        bodyClassName: `${styles.signInToastBody}`,
        //        autoClose: 36000000,
        //      });
        //    }
        //    break;
        //  }

         default:
           console.error('Unknown action type');
       }
     } catch (error: any) {
       console.error('Caught error in handleSubmit:', error);
       toast.error(error?.message || 'Something went wrong. Please try again later.', {
         position: 'top-right',
         className: `${styles.signInToastErrorMessage}`,
         bodyClassName: `${styles.signInToastBody}`,
         autoClose: 36000000,
       });
     }
  };

  return (
    <>
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
          <h6 className={`${styles.spam} ${styles.spam_mailing}`}>{t('mailing.mailing')}</h6>
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
          // onClick={() => setActionType('updateEmail')}
          onClick={changeEmail}
        />
      </Form>
      {shouldShowModal && typeModal === 'updatePersonalData' && (
        <Modal closeModal={closeModal} className={styles.openPersonalDataModal}>
          <div>
            <h2>{t('modal.updatePersonalData')}</h2>
            <Image src={success} alt="success" />
          </div>
        </Modal>
      )}
      {shouldShowModal && typeModal === 'delete' && (
        <Modal closeModal={closeModal} className={styles.openPersonalDataModal}>
          <div>
            <h2>{t('modal.deleteAccount')}</h2>
            <div className={styles.btn_modalContainer}>
              <button
                type="button"
                onClick={closeDeleteAccount}
                className={styles.btn_modal_active}
              >
                <span>{t('modal.deleteAccount_no')}</span>
              </button>
              <button type="button" onClick={successDeleteAccount} className={styles.btn_modal}>
                <span>{t('modal.deleteAccount_yes')}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
      {shouldShowModal && typeModal === 'successDelete' && (
        <Modal closeModal={closeModal} className={styles.openPersonalDataModal}>
          <div>
            <p className={styles.deleteDescrModal}>
              {t('modal.deleteAccount_success_p1')}
              <span>&nbsp;Adventure Pro Gear &nbsp;</span>
              {t('modal.deleteAccount_success_p2')}
            </p>
            <Image src={successDelete} alt="successDelete" className={styles.deleteImgModal} />
          </div>
        </Modal>
      )}
      {shouldShowModal && typeModal === 'changeEmail' && (
        <Modal closeModal={closeModal} className={styles.openPersonalDataModal}>
          <div>
            <h2>{t('modal.changeEmail')}</h2>
            <div className={styles.btn_modalContainer}>
              <button type="button" onClick={closeChangeEmail} className={styles.btn_modal_active}>
                <span>{t('modal.changeEmail_no')}</span>
              </button>
              <button type="button" onClick={successChangeEmail} className={styles.btn_modal}>
                <span>{t('modal.changeEmail_yes')}</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
      {shouldShowModal && typeModal === 'successChangeEmail' && (
        <Modal closeModal={closeModal} className={styles.openPersonalDataModal}>
          <div>
            <p className={styles.successChangeEmail}>{t('modal.successChangeEmail')}</p>
            <Image
              src={successEmail}
              alt="successChangeEmail"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default EditData;
