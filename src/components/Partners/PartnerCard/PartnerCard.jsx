import React from 'react';
import { useRouter } from 'next/router';

import styles from './PartnerCard.module.scss';

const PartnerCard = ({ image, text, link }) => {
  const router = useRouter();

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <img src={image} alt="" className={styles.image} />
      </div>
      <p className={styles.text}>{text}</p>
    </a>
  );
};

export default PartnerCard;
