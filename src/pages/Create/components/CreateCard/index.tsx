import { ReactElement, VFC } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';

import styles from './styles.module.scss';

interface ICreateCard {
  icon: ReactElement;
  title: string | ReactElement;
  href: string;
  className?: string;
}

const CreateCard: VFC<ICreateCard> = ({ icon, title, href, className }) => {
  return (
    <Link to={href} className={cn(className, styles['create-card__wrapper'])}>
      <div className={styles['create-card__wrapper-icon']}>{icon}</div>
      <div className={styles['create-card__wrapper-title']}>{title}</div>
    </Link>
  );
};

export default CreateCard;
