import { FormEvent, useCallback, VFC } from 'react';

import { Text } from 'components';

import { DeleteSVG } from 'assets/img';

import styles from './styles.module.scss';

interface IDeletePreview {
  onClick: () => void;
}

const DeletePreview: VFC<IDeletePreview> = ({ onClick }) => {
  const onDelete = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClick();
    },
    [onClick],
  );
  return (
    <button type="button" onClick={onDelete} className={styles['delete-button__wrapper']}>
      <span className={styles['delete-button__wrapper-icon']}>
        <DeleteSVG />
      </span>
      <Text tag="span" className={styles['delete-button__wrapper-text']} id="Delete">
        Delete
      </Text>
    </button>
  );
};
export default DeletePreview;
