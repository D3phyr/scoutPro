import React from 'react';
import Link from 'next/link';
import cn from 'classnames';
import { useRouter } from 'next/router';

import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = ({ links }) => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      {links.map((link, index) => {
        return (
          <span key={index}>
            <Link href={link.path} className={cn(styles.link, link.active && styles.active)}>
              {link.title}
            </Link>
            {index + 1 < links.length && <span className={styles.divider}>&gt;</span>}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
