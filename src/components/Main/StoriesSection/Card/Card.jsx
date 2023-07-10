import React from 'react';
import cn from 'classnames';
import AppSkeleton from '~/components/common/AppSkeleton';
import useLoaded from '~/hooks/useLoaded';

import styles from './Card.module.scss';

const Card = ({ media, title, date, isModal, isVideo }) => {
  const isLoaded = useLoaded(media, false);

  return (
    <div className={cn(styles.container, isModal && styles.modal)}>
      <div className={styles.mediaWrapperOuter}>
        <div className={styles.mediaWrapperInner}>
          {!isModal && !isLoaded ? (
            <AppSkeleton />
          ) : (
            <>
              {/* {isVideo ? (
                <video className={styles.video} src={`${media}#t=0.1`} preload="metadata"></video>
              ) : ( */}
              <img src={media} alt="" className={styles.media} />
              {/* )} */}
            </>
          )}
        </div>
      </div>
      <div className={styles.inner}>
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>{date}</p>
      </div>
    </div>
  );
};

export default Card;
