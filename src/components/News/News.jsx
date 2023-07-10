import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import Breadcrumbs from '~/components/common/Breadcrumbs';
import AppButton from '~/components/common/AppButton';
import SportFilters from './SportFilters';
import NewsGrid from '~/components/common/NewsGrid';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './News.module.scss';

const News = ({ data }) => {
  const { title } = data.entity;
  const { typeOfSport } = data.typesOfSports.typesOfSports;

  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState(router.query.filter ?? '');
  const [page, setPage] = useState(0);
  const [newsArr, setNewsArr] = useState([]);
  const [isFetchError, setIsFetchError] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const triggerRef = useRef(null);

  const changeFilter = str => {
    setActiveFilter(str);
  };

  const fetchNews = async (page = 0, query = '') => {
    try {
      if (isEnd) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/api/news-page?start=${page}&limit=15${
          query ? `&sport=${router.query.filter}` : ''
        }`,
      );
      const data = await response.json();
      const { news } = data;
      if (news.length === 0) {
        setIsEnd(true);
        return;
      }
      setNewsArr([...newsArr, ...news]);
    } catch (error) {
      setIsFetchError(true);
    }
  };

  useEffect(() => {
    setNewsArr([]);
    setPage(0);
    setIsEnd(false);
    if (router.query.filter) {
      changeFilter(router.query.filter);
    } else {
      changeFilter('');
    }
  }, [router.query.filter]);

  useEffect(() => {
    fetchNews(page, activeFilter);
  }, [activeFilter, page]);

  const breadcrumbs = [
    { title: 'Главная', path: '/', active: false },
    { title: 'Новости', path: '/news', active: true },
  ];

  useEffect(() => {
    if (window !== undefined) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting & (newsArr.length > 10)) {
            setPage(val => val + 1);
          }
        });
      });
      observer.observe(triggerRef.current);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs links={breadcrumbs} />
      <h1 className={styles.title}>{title}</h1>
      <SportFilters data={typeOfSport} activeFilter={activeFilter} changeFilter={changeFilter} />
      <div className={styles.inner}>
        <NewsGrid news={newsArr} />
      </div>
      <div className={styles.trigger} ref={triggerRef}></div>
    </div>
  );
};

export default News;
