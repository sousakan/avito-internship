import classNames from 'classnames';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCurrentStory } from '../../features/stories/asyncActions';
import prettyDate from '../../helpers/prettyDate';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Comments from '../Comments';
import Loader from '../Loader';
import styles from './Story.module.scss';

const Story = () => {
  const story = useAppSelector(state => state.stories.currentStory);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    if (!story) {
      const id = +location.pathname.split('/')[2];
      dispatch(fetchCurrentStory(id));
    }
  });

  if (!story) return <Loader />;

  return (
    <div className={styles.story}>
      <h1 className={styles.story__title}>{story.title}</h1>
      <div className={styles.story__info}>
        <h3 className={styles.story__subtitle}>Info</h3>
        <div className={styles.story__line}>
          <span className={styles.story__key}>URL:</span>
          <a
            className={classNames(styles.story__value, styles.story__link)}
            href={story.url}
            target="_blank"
            rel="noreferrer"
          >
            {story.url}
          </a>
        </div>
        <div className={styles.story__line}>
          <span className={styles.story__key}>Date:</span>
          <span className={styles.story__value}>{prettyDate(story.time)}</span>
        </div>
        <div className={styles.story__line}>
          <span className={styles.story__key}>Author:</span>
          <span className={styles.story__value}>{story.by}</span>
        </div>
        <div className={styles.story__line}>
          <span className={styles.story__key}>Comments:</span>
          <span className={styles.story__value}>{story.descendants}</span>
        </div>
      </div>
      <Comments className={styles.story__comments} commentsIds={story.kids} />
    </div>
  );
};

export default Story;
