import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Logo from '~/assets/img/logo.png';

import styles from './MobileMenu.module.scss';

const MobileMenu = ({ data, social, links, note }) => {
  const [isActive, setIsActive] = useState(false);
  const [isInit, setIsInit] = useState(false);

  const onOpen = () => {
    setIsActive(true);
  };

  const onClose = () => {
    setIsActive(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsInit(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('body-scroll-disabled');
    } else {
      document.body.classList.remove('body-scroll-disabled');
    }
  }, [isActive]);

  return (
    <div className={styles.wrapper}>
      <div
        className={cn(styles.hamburger, !isInit && styles.disabled, { [styles.active]: isActive })}
        onClick={onOpen}
      ></div>
      <nav className={cn(styles.menu, !isInit && styles.hidden, isActive && styles.active)}>
        <div className={styles.close} onClick={onClose}></div>
        <img src={Logo.src} alt="Логотип Live Scout" className={styles.logo} />
        <ul className={styles.list}>
          {data.map(el => {
            return (
              <li className={styles.item} key={el.id} onClick={onClose}>
                <Link href={el.link}>{el.text.toUpperCase()}</Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.contactsWrapper}>
          {social.map(el => {
            return (
              <a href={el.link} target="_blank" key={el.id} className={styles.contact}>
                <img src={`${process.env.NEXT_PUBLIC_BASEURL}${el.icon.url}`} alt="" />
              </a>
            );
          })}
        </div>
        <div className={styles.linksWrapper}>
          {links.map(el => {
            return (
              <Link href={el.link} key={el.id} className={styles.link} onClick={onClose}>
                {el.text}
              </Link>
            );
          })}
        </div>
        <p className={styles.note}>{note}</p>
        <p className={styles.copyright}>{`© ${new Date().getFullYear()} ООО “Мир Спорта”`}</p>
      </nav>
      <div className={cn(styles.overlay, isActive && styles.active)} onClick={onClose}></div>
    </div>
  );
};

export default MobileMenu;
