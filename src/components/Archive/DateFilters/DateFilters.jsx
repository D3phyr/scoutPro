import styles from './DateFilters.module.scss';
import AppButton from '~/components/common/AppButton';
import cn from 'classnames';
import ScrollContainer from 'react-indiana-drag-scroll';

const DateFilters = ({ data, currentDateIndex, changeDateFilter }) => {
  return (
    <div className={styles.outer}>
      <ScrollContainer>
        <div className={styles.wrapper}>
          {data.map((el, index) => {
            return (
              <AppButton
                key={index}
                onClick={() => changeDateFilter(index)}
                className={cn(currentDateIndex === index && styles.active, styles.btn)}
              >
                {el}
              </AppButton>
            );
          })}
        </div>
      </ScrollContainer>
    </div>
  );
};

export default DateFilters;
