import styles from './MatchTable.module.scss';
import cn from 'classnames';
import MatchScore from '~/components/common/MatchScore';

const MatchTable = ({ data, onModalOpen }) => {
  const splitedArray = data => {
    const chunkSize = 4;
    const array = [];
    if (data) {
      for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        array.push(chunk);
      }
    }
    return array;
  };

  return (
    <div className={styles.wrapper}>
      {data && data.length > 0 ? (
        splitedArray(data).map((el, index) => {
          return (
            <div key={index} className={styles.row}>
              {el[0] && <MatchScore table data={el[0]} onClick={() => onModalOpen(el[0])} />}
              {el[1] && <MatchScore table data={el[1]} onClick={() => onModalOpen(el[1])} />}
              {el[2] && <MatchScore table data={el[2]} onClick={() => onModalOpen(el[2])} />}
              {el[3] && <MatchScore table data={el[3]} onClick={() => onModalOpen(el[3])} />}
            </div>
          );
        })
      ) : (
        <div className={styles.empty}>
          <p>Матчей не найдено</p>
        </div>
      )}
    </div>
  );
};

export default MatchTable;
