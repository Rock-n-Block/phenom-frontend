import { routes } from 'appConstants';
import styles from './styles.module.scss';
import { NullAvatarSrc } from 'assets/img';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import cn from 'classnames';
import { FallbackImage } from 'containers';

interface IProps {
  id: number | string;
  avatar: string;
  isCollection?: boolean;
  size?: number | string;
  className?: string;
}

const Avatar: FC<IProps> = ({ avatar, id, isCollection = false, size = 24, className }) => {
  return (
    <Link
      to={
        isCollection ? routes.collection.link(id || '') : routes.profile.link(id || '', 'about')
      }
      className={cn(styles.avatar, className)}
    >
      <FallbackImage
        src={avatar}
        className={styles.avatarImg}
        errorSrc={NullAvatarSrc}
        width={size}
        height={size}
      />
    </Link>
  );
};
export default Avatar;
