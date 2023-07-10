import styles from './SportFilters.module.scss';
import cn from 'classnames';
import ScrollContainer from 'react-indiana-drag-scroll';

const SportFilters = ({ data, currentSportIndex, changeSportFilter }) => {
  return (
    <div className={styles.outer}>
      <ScrollContainer>
        <div className={styles.wrapper}>
          <div
            onClick={() => changeSportFilter(0)}
            className={cn(styles.sport, Number(currentSportIndex) === 0 && styles.active)}
          >
            ВСЕ
          </div>
          {data.map((el, index) => {
            return (
              <div
                key={index}
                onClick={() => changeSportFilter(index + 1)}
                className={cn(styles.sport, Number(currentSportIndex) - 1 === index && styles.active)}
              >
                {el}
              </div>
            );
          })}
        </div>
      </ScrollContainer>
    </div>
  );
};

export default SportFilters;
