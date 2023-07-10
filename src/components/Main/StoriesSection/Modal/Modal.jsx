import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '~/assets/img/logo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import StoryCard from '../StoryCard';
import useMobile from '~/hooks/useMobile';

import styles from './Modal.module.scss';

const Modal = ({ data, handleModal, index }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [itemsNum, setItemsNum] = useState(4);

  const isMobile = useMobile(450);

  const sliderRef = useRef(null);

  const changeSlide = num => {
    if (!sliderRef.current) return;
    setActiveSlide(num);
    sliderRef.current.swiper.slideTo(num);
  };

  const onSlideChange = swiper => {
    setActiveSlide(swiper.realIndex);
  };

  const { events } = useRouter();

  useEffect(() => {
    events.on('routeChangeStart', handleModal);
    return () => {
      events.off('routeChangeStart', handleModal);
    };
  }, [handleModal, events]);

  const getItemsNumber = () => {
    setItemsNum(document.body.clientWidth <= 1440 ? 4 : (document.body.clientWidth / 1440) * 4);
  };

  useEffect(() => {
    getItemsNumber();
    document.body.classList.add('body-scroll-disabled');
    document.querySelector('.container').style.overflow = 'hidden';
    window.addEventListener('resize', getItemsNumber);
    window.addEventListener(
      'scroll',
      e => {
        e.preventDefault();
        window.scrollTo(0, 0);
      },
      { once: true },
    );
    return () => {
      document.body.classList.remove('body-scroll-disabled');
      document.querySelector('.container').style.overflow = 'unset';
      window.removeEventListener('resize', getItemsNumber);
    };
  }, []);

  return (
    <div className={styles.modal}>
      <div className={cn(styles.header, 'container')}>
        <Link href="/" aria-label="На главную страницу" className={styles.logoWrapper}>
          <img src={Logo.src} alt="Логотип Live Scout" className={styles.logo} />
        </Link>
        <div className={styles.close} onClick={handleModal}></div>
      </div>
      <Swiper
        centeredSlides={true}
        spaceBetween="6.25rem"
        slidesPerView={isMobile ? 1 : itemsNum}
        initialSlide={index}
        className={styles.slider}
        ref={sliderRef}
        onSlideChange={onSlideChange}
      >
        {data.map((el, i) => {
          return (
            <SwiperSlide key={el.id}>
              <StoryCard index={i} isActive={i === activeSlide} changeSlide={changeSlide} data={data} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Modal;
