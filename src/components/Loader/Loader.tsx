import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.loader__spinner} />
    </div>
  );
};

export default Loader;
