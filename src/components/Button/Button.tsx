import classNames from 'classnames';
import styles from './Button.module.scss';

type ButtonProps = {
  text: string;
  theme?: 'white' | 'black';
  className?: string;
  onClick: () => void;
};

const Button = ({ text, theme = 'white', className, onClick }: ButtonProps) => {
  const classes = classNames(styles.button, className, {
    [styles.button_black]: theme === 'black',
  });

  return (
    <button className={classes} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
