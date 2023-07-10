import React from 'react';
import Breadcrumbs from '~/components/common/Breadcrumbs';
import { useRouter } from 'next/router';
import AppCard from '~/components/common/AppCard';
import Image from 'next/image';
import { getYouTubeId } from '~/utils/getYouTubeId';
import { getRutubeLink } from '~/utils/getRutubeLink';
import AppSkeleton from '~/components/common/AppSkeleton';
import useLoaded from '~/hooks/useLoaded';
import { getConvertedDate } from '~/utils/getConvertedDate';

import styles from './NewsArticle.module.scss';

const NewsArticle = ({ data }) => {
  const { title, updatedAt, readingTime, article, nextArticle, bannerMedia } = data.entity;

  const router = useRouter();

  const isLoaded = useLoaded(`${process.env.NEXT_PUBLIC_BASEURL}${bannerMedia?.image?.url}` ?? '', false);

  const breadcrumbs = [
    { title: 'Главная', path: '/', active: false },
    { title: 'Новости', path: '/news', active: false },
    { title: title, path: router.asPath, active: true },
  ];

  const getDynamicBlock = (el, i) => {
    switch (el.type) {
      case 'header':
        return <h2 key={i}>{el.data.text}</h2>;

      case 'paragraph':
        return (
          <p
            key={i}
            dangerouslySetInnerHTML={{
              __html: el.data.text,
            }}
          ></p>
        );

      case 'list':
        return (
          <ul className={styles.list} key={i}>
            {el.data.items.map((item, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{
                  __html: item,
                }}
              ></li>
            ))}
          </ul>
        );

      case 'image':
        return (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASEURL}${el.data.file.url}`}
            alt=""
            width="0"
            height="0"
            sizes="100vw"
            key={i}
          />
        );

      default:
        break;
    }
  };

  const getVideo = link => {
    if (link.includes('youtube')) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${getYouTubeId(link)}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else if (link.includes('rutube')) {
      return <iframe width="720" height="405" src={getRutubeLink(link)} frameBorder="0" allowFullScreen></iframe>;
    } else if (link.includes('vk.com')) {
      return <div dangerouslySetInnerHTML={{ __html: link }}></div>;
    }
  };

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs links={breadcrumbs} />
      <div className={styles.inner}>
        <div className={styles.left}>
          {bannerMedia.videoLink ? (
            <div className={styles.video}>{getVideo(bannerMedia.videoLink)}</div>
          ) : (
            <div className={!isLoaded ? styles.imageWrapper : ''}>
              {!isLoaded ? (
                <div className={styles.skeletonWrapper}>
                  <AppSkeleton />
                </div>
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASEURL}${bannerMedia.image.url}`}
                  alt=""
                  width="0"
                  height="0"
                  sizes="100vw"
                  className={styles.mainImage}
                />
              )}
            </div>
          )}
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.header}>
            <span className={styles.headerText}>{getConvertedDate(updatedAt)}</span>
            <span className={styles.headerText}>{`${readingTime.split(' ')[0]} мин. для чтения`}</span>
          </div>
          <div className={styles.content}>{JSON.parse(article).blocks?.map(getDynamicBlock)}</div>
        </div>
        <div className={styles.right}>
          {nextArticle && (
            <div className={styles.nextInner}>
              <p className={styles.next}>Следующая новость</p>
              <AppCard
                link={`/news/${nextArticle.slug}`}
                thumbnail={
                  nextArticle.bannerMedia.image
                    ? `${process.env.NEXT_PUBLIC_BASEURL}${nextArticle.bannerMedia.image.url}`
                    : `https://img.youtube.com/vi/${getYouTubeId(nextArticle.bannerMedia.videoLink)}/maxres1.jpg`
                }
                title={nextArticle.title}
                date={nextArticle.date}
                isVideo={nextArticle.bannerMedia.videoLink}
                className={styles.card}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
