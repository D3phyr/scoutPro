import React from 'react';
import cn from 'classnames';
import Link from 'next/link';

import styles from './AppButton.module.scss';

const AppButton = ({ children, isArrow, link, type, ...props }) => {
  const btnClass = cn(styles.btn, isArrow && styles.arrow, {
    [props.className]: props.className,
  });

  return link ? (
    <Link href={link} {...props} className={btnClass}>
      {children}
    </Link>
  ) : (
    <button type={type ?? 'button'} {...props} className={btnClass}>
      {children}
    </button>
  );
};

export default AppButton;
