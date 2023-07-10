import React, { useState } from 'react';
import AppButton from '~/components/common/AppButton';

import styles from './Story.module.scss';

const Story = ({ media, title, text, link, isVideo, video }) => {
  return (
    <div className={styles.story}>
      <div className={styles.inner}>
        {isVideo ? (
          <video src={video} className={styles.video} autoPlay muted webkit-playsinline="true" playsInline></video>
        ) : (
          <img src={media} alt="" className={styles.media} />
        )}
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
        {link && (
          <AppButton link={link.link} className={styles.btn}>
            {link.text}
          </AppButton>
        )}
      </div>
    </div>
  );
};

export default Story;
