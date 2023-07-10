import React from 'react';
import cn from 'classnames';
import slug from '~/assets/img/slug.png';
import { getConvertedDate } from '~/utils/getConvertedDate';
import Link from 'next/link';
import { truncateString } from '~/utils/truncateString';
import useMobile from '~/hooks/useMobile';

import styles from './MatchScore.module.scss';

const MatchScore = ({ data, table, onClick }) => {
  const isLeftWinner = data.statistics?.Side_1?.points > data.statistics?.Side_2?.points;
  const isRightWinner = data.statistics?.Side_1?.points < data.statistics?.Side_2?.points;

  const isMobile = useMobile(450);

  return (
    <div className={cn(styles.scoreContainer, table && styles.tableStyles)} onClick={onClick}>
      <span className={styles.date}>
        {table ? getConvertedDate(data.date, false, false) : getConvertedDate(data.date, false, true)}
      </span>
      <div className={styles.borderContainer}>
        <div className={styles.score}>
          <div className={styles.team}>
            {/* <img className={styles.logo} /> */}
            <img src={slug.src} alt="" className={styles.teamLogo} />
            <Link href={`/team/${data.side_1_id}`} onClick={e => e.stopPropagation()}>
              <div className={cn(styles.teamName, isRightWinner && styles.opacity)}>
                {table
                  ? truncateString(data.statistics?.Side_1?.name, 28)
                  : isMobile
                  ? truncateString(data.statistics?.Side_1?.name, 10)
                  : truncateString(data.statistics?.Side_1?.name, 14)}
              </div>
            </Link>
            <div className={cn(styles.teamScore, isRightWinner && styles.opacity)}>
              {data.statistics?.Side_1?.points}
            </div>
          </div>
          <div className={cn(styles.team, styles.downTeam)}>
            {/* <img className={styles.logo} /> */}
            <img src={slug.src} alt="" className={styles.teamLogo} />
            <Link href={`/team/${data.side_2_id}`} onClick={e => e.stopPropagation()}>
              <div className={cn(styles.teamName, isLeftWinner && styles.opacity)}>
                {table
                  ? truncateString(data.statistics?.Side_2?.name, 28)
                  : isMobile
                  ? truncateString(data.statistics?.Side_2?.name, 10)
                  : truncateString(data.statistics?.Side_2?.name, 14)}
              </div>
            </Link>
            <div className={cn(styles.teamScore, isLeftWinner && styles.opacity)}>
              {data.statistics?.Side_2?.points}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchScore;
