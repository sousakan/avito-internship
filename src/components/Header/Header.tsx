import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { fetchStoriesIds } from '../../features/stories/asyncActions';
import { useAppDispatch } from '../../hooks/redux';
import Button from '../Button';
import Container from '../Container';
import styles from './Header.module.scss';

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const classes = classNames(styles.header, className);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const refreshList = () => dispatch(fetchStoriesIds());

  return (
    <header className={classes}>
      <Container isBig>
        <div className={styles.header__content}>
          <Link className={styles.header__name} to="/">
            Hacker News
          </Link>
          {location.pathname === '/' ? (
            <Button text="Refresh list" onClick={refreshList} />
          ) : (
            <Link className={styles.header__link} to="/">
              Home
            </Link>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Header;
