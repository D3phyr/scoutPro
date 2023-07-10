import React from 'react';

import styles from './AppSkeleton.module.scss';

const AppSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.skeleton}></div>
    </div>
  );
};

export default AppSkeleton;
