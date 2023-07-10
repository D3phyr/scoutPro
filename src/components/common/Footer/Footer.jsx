import React from 'react';
import cn from 'classnames';
import Logo from '~/assets/img/logo.png';
import Link from 'next/link';
import Sports from '~/components/common/Sports';
import useMobile from '~/hooks/useMobile';

import styles from './Footer.module.scss';

const Footer = ({ data }) => {
  const { pageLinks } = data.header;
  const { socialMediaLinks, pageLinks: links, text1: note } = data.footer;
  const { typeOfSport } = data.typesOfSports.typesOfSports;

  const isMobile = useMobile(450);

  return (
    <footer className={styles.footer}>
      <div className={styles.menuWrapper}>
        <Link href="/" aria-label="На главную страницу" className={styles.logoWrapper}>
          <img src={Logo.src} alt="Логотип Live Scout" className={styles.logo} />
        </Link>
        <nav className={styles.menu}>
          <ul className={styles.list}>
            {pageLinks.map(el => {
              return (
                <li className={styles.item} key={el.id}>
                  <Link href={el.link}>{el.text.toUpperCase()}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <Sports data={typeOfSport} />

      <div className={styles.bottom}>
        <div className={styles.row1}>
          {!isMobile && <p className={styles.note}>{note}</p>}
          <div className={styles.contactsWrapper}>
            {socialMediaLinks.map(el => {
              return (
                <a href={el.link} target="_blank" key={el.id} className={styles.contact}>
                  <img src={`${process.env.NEXT_PUBLIC_BASEURL}${el.icon.url}`} alt="" />
                </a>
              );
            })}
          </div>
        </div>
        <div className={styles.row2}>
          {!isMobile && <p className={styles.copyright}>{`© ${new Date().getFullYear()} ООО “Мир Спорта”`}</p>}
          <div className={styles.linksWrapper}>
            {links.map(el => {
              return (
                <Link href={el.link} key={el.id} className={styles.link}>
                  {el.text}
                </Link>
              );
            })}
          </div>
        </div>
        {isMobile && <p className={styles.note}>{note}</p>}
        {isMobile && <p className={styles.copyright}>{`© ${new Date().getFullYear()} ООО “Мир Спорта”`}</p>}
      </div>
    </footer>
  );
};

export default Footer;
