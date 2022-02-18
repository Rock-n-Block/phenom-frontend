import { FC } from 'react';

import { Avatar,Text } from 'components';
import { sliceString } from 'utils';

import { TextColor } from 'types';

import styles from './styles.module.scss';

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
        {sliceString(name, 10, 5)}
      </Text>
    </div>
  );
};
export default ArtCardAuthor;
