import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Button from '../Button';
import Comment from '../Comment';
import styles from './Comments.module.scss';
import { useEffect } from 'react';
import { fetchCurrentComments } from '../../features/stories/asyncActions';
import Loader from '../Loader';
import { resetComments, setComments } from '../../features/stories/slice';
import api from '../../api';
import { CommentType } from '../../types/comment';

type CommentsProps = {
  commentsIds?: number[];
  className?: string;
};

const Comments = ({ commentsIds, className }: CommentsProps) => {
  const classes = classNames(styles.comments, className);
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.stories.currentComments);

  const loadSubcomments = async (comment: CommentType) => {
    const index = comments?.findIndex(c => c.id === comment.id);

    const subcomments = await Promise.all(
      (comment.kids as number[]).map(api.comments.getCommentById)
    );

    if (index !== undefined && comments) {
      const newComments = [...comments];
      newComments.splice(index + 1, 0, ...subcomments);
      dispatch(setComments(newComments));
    }
  };

  const refetchComments = () => {
    if (commentsIds) {
      dispatch(resetComments());
      dispatch(fetchCurrentComments(commentsIds));
    }
  };

  useEffect(() => {
    if (commentsIds) dispatch(fetchCurrentComments(commentsIds));

    return () => {
      dispatch(resetComments());
    };
  }, [dispatch, commentsIds]);

  if (!commentsIds) return <div></div>;

  return (
    <div className={classes}>
      <header className={styles.comments__header}>
        <h2 className={styles.comments__title}>Comment</h2>
        <Button text="Refresh comments" theme="black" onClick={refetchComments} />
      </header>
      <main className={styles.comments__list}>
        {comments ? (
          comments.map(comment => (
            <Comment
              className={styles.comments__item}
              comment={comment}
              key={comment.id}
              loadSubcomments={loadSubcomments}
            />
          ))
        ) : (
          <Loader />
        )}
      </main>
    </div>
  );
};

export default Comments;
