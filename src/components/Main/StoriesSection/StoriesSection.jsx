import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import Modal from 'react-modal';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './Card';
import { default as ModalComponent } from './Modal';
import useMobile from '~/hooks/useMobile';

import styles from './StoriesSection.module.scss';

Modal.setAppElement('#__next');

const StoriesSection = ({ data }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const isMobile = useMobile(450);

  const handleModal = () => {
    setIsModalActive(!isModalActive);
  };

  const openModal = index => {
    if (index) setActiveIndex(index);
    handleModal();
  };

  useEffect(() => {
    if (isModalActive) {
      document.body.classList.add('body-scroll-disabled');
    } else {
      document.body.classList.remove('body-scroll-disabled');
      setActiveIndex(0);
    }
  }, [isModalActive]);

  return (
    <section className={cn(styles.section, isMobile === null && styles.hidden)}>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevBtnRef.current,
          nextEl: nextBtnRef.current,
        }}
        spaceBetween={isMobile ? 0 : '10rem'}
        slidesPerView={isMobile ? 1.6 : 4.8}
        className={styles.inner}
        cssMode
      >
        {data.map((el, index) => {
          return (
            <SwiperSlide key={el.id} onClick={() => openModal(index)}>
              <Card
                title={el.title}
                media={`${process.env.NEXT_PUBLIC_BASEURL}${el.stories[0].mediaFile.image.url}`}
                date={el.date}
                isVideo={el.stories[0].mediaFile.video}
              />
              {isMobile && index === data.length - 1 && <div className={styles.divider}></div>}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button ref={prevBtnRef} className={styles.prevBtn}></button>
      <button ref={nextBtnRef} className={styles.nextBtn}></button>
      <Modal
        isOpen={isModalActive}
        onRequestClose={handleModal}
        className={styles.modal}
        overlayClassName="overlay"
        closeTimeoutMS={200}
      >
        <ModalComponent data={data} handleModal={handleModal} index={activeIndex} />
      </Modal>
    </section>
  );
};

export default StoriesSection;
