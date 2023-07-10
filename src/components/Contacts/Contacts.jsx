import React, { useState } from 'react';
import cn from 'classnames';
import axios from 'axios';
import Breadcrumbs from '~/components/common/Breadcrumbs';
import { checkNumbersInput } from '~/utils/checkNumbersInput';
import AppButton from '~/components/common/AppButton';
import Link from 'next/link';

import styles from './Contacts.module.scss';

const Contacts = ({ data }) => {
  const { title, contactsZone } = data.entity;

  const [inputValues, setInputValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    details: '',
  });
  const [errorArr, setErrorArr] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);

  const breadcrumbs = [
    { title: 'Главная', path: '/', active: false },
    { title: 'Контакты', path: '/contacts', active: true },
  ];

  const clearError = name => {
    setErrorArr(errorArr.filter(el => el !== name));
  };

  const sendData = async () => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('firstName', inputValues.firstName);
      bodyFormData.append('lastName', inputValues.lastName);
      bodyFormData.append('email', inputValues.email);
      bodyFormData.append('phone', inputValues.phone);
      bodyFormData.append('text', inputValues.details);

      await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_BASEURL}/api/send-applications`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: bodyFormData,
      });
      setIsSubmitted(true);
      setInputValues({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        details: '',
      });
    } catch (error) {
      setIsSubmitError(true);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = [];
    for (const element in inputValues) {
      if (inputValues[element] === '') {
        errors.push(element);
      }
    }
    setErrorArr(errors);
    if (errors.length > 0) return;
    sendData();
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs links={breadcrumbs} />
      <div className={styles.inner}>
        <div className={styles.left}>
          <h1 className={styles.title}>{title}</h1>
          {contactsZone.map((el, index) => {
            return (
              <div key={index} className={styles.text}>
                <p>{el.title}</p>
                {el.email ? (
                  <a href={`mailto:${el.email}`}>{el.email}</a>
                ) : el.phone ? (
                  <a href={`tel:${el.phone}`}>{el.phone}</a>
                ) : (
                  <p>{el.text}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.right}>
          <p className={styles.formTitle}>Связаться с нами</p>
          <form className={cn(styles.form)} onSubmit={e => handleSubmit(e)}>
            <div className={cn(styles.formItem, errorArr.includes('firstName') && styles.invalid)}>
              <input
                id="firstName"
                type="text"
                placeholder="Имя"
                name="firstName"
                value={inputValues.firstName}
                onChange={e => setInputValues({ ...inputValues, firstName: e.target.value })}
                onFocus={e => clearError(e.target.name)}
                className={styles.input}
              />
              <label htmlFor="firstName" className={styles.label}>
                <span>Имя</span>
              </label>
              {errorArr.includes('firstName') && <span className={styles.error}>Обязательное поле</span>}
            </div>
            <div className={cn(styles.formItem, errorArr.includes('lastName') && styles.invalid)}>
              <input
                id="lastName"
                type="text"
                placeholder="Фамилия"
                name="lastName"
                value={inputValues.lastName}
                onChange={e => setInputValues({ ...inputValues, lastName: e.target.value })}
                onFocus={e => clearError(e.target.name)}
                className={styles.input}
              />
              <label htmlFor="lastName" className={styles.label}>
                <span>Фамилия</span>
              </label>
              {errorArr.includes('lastName') && <span className={styles.error}>Обязательное поле</span>}
            </div>
            <div className={cn(styles.formItem, errorArr.includes('phone') && styles.invalid)}>
              <input
                id="tel"
                type="tel"
                placeholder="Телефон"
                name="phone"
                value={inputValues.phone}
                onChange={e =>
                  checkNumbersInput(e.target.value) && setInputValues({ ...inputValues, phone: e.target.value })
                }
                onFocus={e => clearError(e.target.name)}
                className={styles.input}
              />
              <label htmlFor="tel" className={styles.label}>
                <span>Телефон</span>
              </label>
              {errorArr.includes('phone') && <span className={styles.error}>Обязательное поле</span>}
            </div>
            <div className={cn(styles.formItem, errorArr.includes('email') && styles.invalid)}>
              <input
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={inputValues.email}
                onChange={e => setInputValues({ ...inputValues, email: e.target.value })}
                onFocus={e => clearError(e.target.name)}
                className={styles.input}
              />
              <label htmlFor="email" className={styles.label}>
                <span>Email</span>
              </label>
              {errorArr.includes('email') && <span className={styles.error}>Обязательное поле</span>}
            </div>
            <div className={cn(styles.textareaOuter, styles.formItem, errorArr.includes('details') && styles.invalid)}>
              <textarea
                className={styles.textarea}
                placeholder="Ваше сообщение"
                name="details"
                rows={4}
                value={inputValues.details}
                onChange={e => setInputValues({ ...inputValues, details: e.target.value })}
                onFocus={e => clearError(e.target.name)}
              ></textarea>
              {/* {errorArr.includes('lastName') && <span className={styles.error}>Обязательное поле</span>} */}
            </div>
            <div className={styles.submitWrapper}>
              <AppButton isArrow className={styles.button} type="submit">
                Отправить
              </AppButton>
            </div>
            {isSubmitError && <p className={styles.networkError}>Ошибка сети, повторите позднее</p>}
            <p className={styles.note}>
              Пожалуйста, ознакомьтесь с нашей{' '}
              <Link href="/" target="_blank">
                Политикой конфиденциальности
              </Link>{' '}
              относительно того, как мы будем обрабатывать эту информацию.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
