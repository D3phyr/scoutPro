import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './SportButton.module.scss';

const SportButton = ({ icon, text, isActive, link }) => {
  return (
    <Link href={link ?? '/'} className={cn(styles.wrapper, isActive && styles.active)}>
      <img src={icon} alt={text} className={styles.icon} />
      <span className={styles.text}>{text.toUpperCase()}</span>
    </Link>
  );
};

export default SportButton;
