import React from 'react';
import Link from 'next/link';
import Logo from '~/assets/img/logo.png';
import AppButton from '~/components/common/AppButton';
import EmptyImg from '~/assets/img/empty.png';

import styles from './Page404.module.scss';

const Page404 = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <Link href="/" aria-label="На главную страницу" className={styles.logoWrapper}>
        <img src={Logo.src} alt="Логотип Live Scout" className={styles.logo} />
      </Link>
      <h1 className={styles.title}>404 Страница не найдена</h1>
      <AppButton isArrow className={styles.btn} link="/">
        Вернуться на главную
      </AppButton>
      <div className={styles.imgWrapper}>
        <img src={EmptyImg.src} alt="" className={styles.img} />
      </div>
    </div>
  );
};

export default Page404;
