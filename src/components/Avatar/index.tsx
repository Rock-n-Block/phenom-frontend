import { FC } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { FallbackImage } from 'containers';

import { routes } from 'appConstants';

import { NullAvatarSrc } from 'assets/img';

import styles from './styles.module.scss';

interface IProps {
  id: number | string;
  avatar: string;
  isCollection?: boolean;
  size?: number | string;
  className?: string;
  withAnim?: boolean;
}

const Avatar: FC<IProps> = ({
  avatar,
  id,
  isCollection = false,
  size = 24,
  withAnim = true,
  className,
}) => {
  return (
    <Link
      to={isCollection ? routes.collection.link(id || '') : routes.profile.link(id || '', 'about')}
      className={cn(styles.avatar, className, { [styles.withAnim]: withAnim })}
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
