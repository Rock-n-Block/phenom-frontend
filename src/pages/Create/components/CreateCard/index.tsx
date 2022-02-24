import { ReactElement, VFC } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import styles from './styles.module.scss';

interface ICreateCard {
  icon: ReactElement;
  title: string | ReactElement;
  href: string;
  className?: string;
  withAnimation?: boolean;
}

const CreateCard: VFC<ICreateCard> = ({ icon, title, href, className, withAnimation = true }) => {
  return (
    <Link
      to={href}
      className={cn(className, styles['create-card__wrapper'], {
        [styles['with-animation']]: withAnimation,
      })}
    >
      <div className={styles['create-card__wrapper-icon']}>{icon}</div>
      <div className={styles['create-card__wrapper-title']}>{title}</div>
    </Link>
  );
};

export default CreateCard;
