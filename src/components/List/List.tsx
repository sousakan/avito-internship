import { useAppSelector } from '../../hooks/redux';
import Card from '../Card';
import styles from './List.module.scss';

const List = () => {
  const storiesIds = useAppSelector(state => state.stories.storiesIds);

  return (
    <div className={styles.list}>
      {storiesIds.map((id, index) => (
        <Card className={styles.list__item} id={id} index={index} key={id} />
      ))}
    </div>
  );
};

export default List;
