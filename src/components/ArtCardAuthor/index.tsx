import styles from './styles.module.scss';
import { Text, Avatar } from 'components';
import { FC } from 'react';
import { TextColor } from 'types';

interface IProps {
  id: number | string;
  avatar: string;
  name: string;
  authorTextColor?: TextColor;
}

const ArtCardAuthor: FC<IProps> = ({ id, avatar, name, authorTextColor = 'black' }) => {
  return (
    <div className={styles.artCardAuthor}>
      <Avatar avatar={avatar} id={id} size={24} />
      <Text className={styles.name} color={authorTextColor}>
        {name}
      </Text>
    </div>
  );
};
export default ArtCardAuthor;
