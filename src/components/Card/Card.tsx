import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchStoryById } from '../../features/stories/asyncActions';
import { selectStoryByIndex, updateStory } from '../../features/stories/slice';
import prettyDate from '../../helpers/prettyDate';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useOnScreen from '../../hooks/useOnScreen';

import CardSkeleton from '../CardSkeleton';
import styles from './Card.module.scss';

type CardProps = {
  id: number;
  index: number;
  className?: string;
};

const Card = ({ id, index, className }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(cardRef, '1000px');
  const classes = classNames(styles.card, className);

  const dispatch = useAppDispatch();
  const story = useAppSelector(selectStoryByIndex(index));
  const isLoaded = story !== null;
  const onClick = () => isLoaded && dispatch(updateStory(story));

  useEffect(() => {
    if (onScreen && !isLoaded) dispatch(fetchStoryById(id));
  }, [dispatch, onScreen, isLoaded, id, index]);

  return (
    <Link to={`/story/${id}`} className={styles.link} onClick={onClick}>
      <div className={classes} ref={cardRef}>
        {story ? (
          <div className={styles.card__content}>
            <h2 className={styles.card__title}>
              {index + 1}. {story.title}
            </h2>
            <span className={styles.card__info}>
              {story.score} points by {story.by} at {prettyDate(story.time)}
            </span>
          </div>
        ) : (
          <CardSkeleton />
        )}
      </div>
    </Link>
  );
};

export default Card;
