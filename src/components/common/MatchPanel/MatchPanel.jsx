import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import MatchScore from '~/components/common/MatchScore';
import football from '~/assets/img/football.png';
import basketball from '~/assets/img/basketball.png';
import hockey from '~/assets/img/hockey.png';
import pingpong from '~/assets/img/pingpong.png';
import tennis from '~/assets/img/tennis.png';
import voleyball from '~/assets/img/voleyball.png';
import cricket from '~/assets/img/cricket.png';

import styles from './MatchPanel.module.scss';

const MatchPanel = () => {
  const [matches, setMatches] = useState([]);
  const [matchIds, setMatchIds] = useState([]);
  const [gender, setGender] = useState('ВСЕ');
  const [sport, setSport] = useState('all');
  const [sportId, setSportId] = useState(null);
  const [sportSrc, setSportSrc] = useState(null);
  const [pannelActive, setPannel] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const sliderRef = useRef(null);
  const [isInit, setIsInit] = useState(false);

  const changePannelStatus = val => {
    setPannel(val);
  };

  const changeGenderFilter = val => {
    setGender(val);
    setPannel(false);
  };

  const changeSportFilter = val => {
    setSport(val);
    if (val === 'football') {
      setSportSrc(football.src);
      setSportId(2);
    }
    if (val === 'basketball') {
      setSportSrc(basketball.src);
      setSportId(3);
    }
    if (val === 'hockey') {
      setSportSrc(hockey.src);
      setSportId(1);
    }
    if (val === 'pingpong') {
      setSportSrc(pingpong.src);
      setSportId(6);
    }
    if (val === 'tennis') {
      setSportSrc(tennis.src);
      setSportId(4);
    }
    if (val === 'voleyball') {
      setSportSrc(voleyball.src);
      setSportId(5);
    }
    if (val === 'cricket') {
      setSportSrc(cricket.src);
      setSportId(7);
    }
    if (val === 'all') {
      setSportSrc(null);
      setSportId(null);
    }
    setPannel(false);
  };

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const fetchData = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        searchData: {
          OR: [
            {
              date: {
                gte: new Date(),
              },
              factically_started_at: null,
            },
            {
              NOT: {
                factically_started_at: null,
              },
              ended_at: null,
            },
          ],
          sportId: sportId ?? undefined,
          KindOfSport:
            gender === 'ВСЕ'
              ? undefined
              : {
                  male: gender === 'М',
                  female: gender === 'Ж',
                },
        },
        page: 1,
        count: 20,
        orderBy: {
          date: 'asc',
        },
      }),
    };
    const responseMatches = await fetch(
      `${process.env.NEXT_PUBLIC_SCOUTURL}/api/getMatchesUnauthorised`,
      requestOptions,
    );
    const dataMatches = await responseMatches.json();
    if (!isLoading) {
      setLoading(true);
    }
    const ids = dataMatches.message.map(el => el.id);
    setMatchIds(ids);
    setMatches(dataMatches.message);
  };

  const updateData = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ids: matchIds,
      }),
    };
    let dataMatches;
    try {
      const responseMatches = await fetch(
        `${process.env.NEXT_PUBLIC_SCOUTURL}/api/getMatchesStateForSite`,
        requestOptions,
      );
      dataMatches = await responseMatches.json();
    } catch (error) {}

    const arr = [];
    for (let match in dataMatches) {
      if (!dataMatches[match].ended_at) {
        arr.push(dataMatches[match]);
      }
    }
    setMatches(arr.sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  useInterval(() => {
    updateData();
  }, 30000);

  useEffect(() => {
    fetchData();
  }, [gender, sportId]);

  const buttonContainerRef = useRef(null);

  useEffect(() => {
    const elem = document.querySelector('.swiper-wrapper');
    const buttonContainer = buttonContainerRef.current;
    setIsOverflow(elem.clientWidth + buttonContainer.clientWidth > document.body.clientWidth);
  }, [matches]);

  useEffect(() => {
    setTimeout(() => {
      setIsInit(true);
    }, 1000);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.filter}>
          <div className={styles.row}>
            <button
              onClick={() => changePannelStatus(true)}
              className={cn(styles.button, styles.colored, styles.mainBtn)}
            ></button>
          </div>
          <div className={styles.row}>
            <div className={cn(styles.button, styles.selected)}>{gender === 'ВСЕ' ? 'М/Ж' : gender}</div>
          </div>
          <div className={styles.row}>
            <div className={cn(styles.button, styles.selected)}>
              {!sportSrc ? 'ВСЕ' : <img src={sportSrc} alt="" className={styles.sportImg} />}
            </div>
          </div>
        </div>
        <div
          className={cn(
            styles.pannel,
            !isInit && styles.hidden,
            pannelActive === true ? styles.active : styles.disabled,
          )}
        >
          <div className={styles.row}>
            <button
              onClick={() => changePannelStatus(false)}
              className={cn(styles.button, styles.colored, styles.mainBtnActive)}
            ></button>
          </div>
          <div className={styles.row}>
            <div
              onClick={() => changeGenderFilter('ВСЕ')}
              className={cn(styles.button, styles.colored, gender === 'ВСЕ' && styles.current)}
            >
              М/Ж
            </div>

            <div
              onClick={() => changeGenderFilter('Ж')}
              className={cn(styles.button, styles.colored, gender === 'Ж' && styles.current)}
            >
              Ж
            </div>
            <div
              onClick={() => changeGenderFilter('М')}
              className={cn(styles.button, styles.colored, gender === 'М' && styles.current)}
            >
              М
            </div>
          </div>
          <div className={styles.row}>
            <div
              onClick={() => changeSportFilter('all')}
              className={cn(styles.button, styles.colored, sport === 'all' && styles.current)}
            >
              ВСЕ
            </div>
            <div
              onClick={() => changeSportFilter('football')}
              className={cn(styles.button, styles.colored, sport === 'football' && styles.current)}
            >
              <img src={football.src} alt="" className={styles.sportImg} />
            </div>
            <div
              onClick={() => changeSportFilter('basketball')}
              className={cn(styles.button, styles.colored, sport === 'basketball' && styles.current)}
            >
              <img src={basketball.src} alt="" className={styles.sportImg} />
            </div>
            <div
              onClick={() => changeSportFilter('hockey')}
              className={cn(styles.button, styles.colored, sport === 'hockey' && styles.current)}
            >
              <img src={hockey.src} alt="" className={styles.sportImg} />
            </div>
            <div
              onClick={() => changeSportFilter('pingpong')}
              className={cn(styles.button, styles.colored, sport === 'pingpong' && styles.current)}
            >
              <img src={pingpong.src} alt="" className={styles.sportImg} />
            </div>
            <div
              onClick={() => changeSportFilter('tennis')}
              className={cn(styles.button, styles.colored, sport === 'tennis' && styles.current)}
            >
              <img src={tennis.src} alt="" className={styles.sportImg} />
            </div>
            <div
              onClick={() => changeSportFilter('voleyball')}
              className={cn(styles.button, styles.colored, sport === 'voleyball' && styles.current)}
            >
              <img src={voleyball.src} alt="" className={styles.sportImg} />
            </div>
            <div
              onClick={() => changeSportFilter('cricket')}
              className={cn(styles.button, styles.colored, sport === 'cricket' && styles.current)}
            >
              <img src={cricket.src} alt="" className={styles.sportImg} />
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation
          ref={sliderRef}
          spaceBetween={0}
          slidesPerView={'auto'}
          className={styles.swiper}
          freeMode
        >
          {matches.map((el, index) => {
            return (
              <SwiperSlide key={el.id}>
                <MatchScore data={el}></MatchScore>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          className={cn(styles.buttonContainer, !isOverflow && styles.hidden)}
          onClick={() => sliderRef.current.swiper.slideNext()}
          ref={buttonContainerRef}
        >
          <div className={cn(styles.buttonArrow)}></div>
        </div>
      </div>
    </div>
  );
};

export default MatchPanel;
