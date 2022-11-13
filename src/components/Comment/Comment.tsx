import classNames from 'classnames';
import prettyDate from '../../helpers/prettyDate';
import { CommentType } from '../../types/comment';
import styles from './Comment.module.scss';
import { useState } from 'react';

type CommentProps = {
  comment: CommentType;
  className?: string;
  loadSubcomments: (comment: CommentType) => Promise<void>;
};

const Comment = ({ comment, className, loadSubcomments }: CommentProps) => {
  const [clicked, setClicked] = useState(false);
  const classes = classNames(styles.comment, className, {
    [styles.clickable]: comment.kids && !clicked,
  });

  function createMarkup() {
    return {
      __html: comment.text,
    };
  }

  return (
    <div
      className={classes}
      onClick={() => {
        if (!clicked) {
          comment.kids && loadSubcomments(comment);
          setClicked(true);
        }
      }}
    >
      <header className={styles.comment__header}>
        <span className={styles.comment__author}>{comment.by}</span>
        <span className={styles.comment__detail}>
          {prettyDate(comment.time)}
          {comment.kids ? `, ${comment.kids.length} replies` : ''}
        </span>
      </header>
      <p className={styles.comment__text} dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
};

export default Comment;
