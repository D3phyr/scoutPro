import React from 'react';
import Breadcrumbs from '~/components/common/Breadcrumbs';
import PartnerCard from './PartnerCard';

import styles from './Partners.module.scss';

const Partners = ({ data }) => {
  const { title, card } = data.entity;

  const breadcrumbs = [
    { title: 'Главная', path: '/', active: false },
    { title: 'Партнеры', path: '/partners', active: true },
  ];

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs links={breadcrumbs} />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.inner}>
        {card.map(el => (
          <PartnerCard
            image={`${process.env.NEXT_PUBLIC_BASEURL}${el.icon.url}`}
            text={el.text}
            link={el.link}
            key={el.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Partners;
