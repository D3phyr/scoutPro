import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import AppSkeleton from '~/components/common/AppSkeleton';
import useLoaded from '~/hooks/useLoaded';
import ThumbnailImg from '~/assets/img/thumbnail.png';

import styles from './AppCard.module.scss';

const AppCard = ({ link, thumbnail, title, date, isVideo, ...props }) => {
  const computedClass = cn(styles.wrapper, {
    [props.className]: props.className,
  });

  const isLoaded = useLoaded(thumbnail, false);

  return (
    <article className={computedClass}>
      <Link href={link}>
        {!isLoaded && !thumbnail.includes('undefined') ? (
          <div className={styles.skeletonWrapper}>
            <AppSkeleton />
          </div>
        ) : (
          <div className={cn(styles.imageWrapper, isVideo && styles.thumbnail)}>
            {thumbnail.includes('undefined') ? (
              <div className={styles.empty}>
                <img src={ThumbnailImg.src} alt="" />
              </div>
            ) : (
              <Image src={thumbnail} alt="" width="0" height="0" sizes="100vw" className={styles.image} />
            )}
          </div>
        )}
        <p className={styles.title}>{title}</p>
        <p className={styles.date}>{date}</p>
      </Link>
    </article>
  );
};

export default AppCard;
