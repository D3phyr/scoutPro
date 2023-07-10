import React from 'react';
import cn from 'classnames';
import Logo from '~/assets/img/logo.png';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import { useRouter } from 'next/router';

import styles from './Header.module.scss';

const Header = ({ data }) => {
  const { pageLinks } = data.header;
  const { socialMediaLinks, pageLinks: links, text1: note } = data.footer;

  const router = useRouter();

  return (
    <header className={styles.header}>
      <Link href="/" aria-label="На главную страницу" className={styles.logoWrapper}>
        <img src={Logo.src} alt="Логотип Live Scout" className={styles.logo} />
      </Link>
      <nav className={styles.menu}>
        <ul className={styles.list}>
          {pageLinks.map(el => {
            return (
              <li className={cn(styles.item, router.asPath === el.link && styles.active)} key={el.id}>
                <Link href={el.link}>{el.text.toUpperCase()}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <MobileMenu data={pageLinks} social={socialMediaLinks} links={links} note={note} />
    </header>
  );
};

export default Header;
