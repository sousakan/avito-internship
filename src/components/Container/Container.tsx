import classNames from 'classnames';
import styles from './Container.module.scss';

type ContainerProps = {
  children: React.ReactNode;
  isBig?: boolean;
};

const Container = ({ children, isBig = false }: ContainerProps) => {
  const classes = classNames(styles.container, { [styles.container_big]: isBig });

  return <div className={classes}>{children}</div>;
};

export default Container;
