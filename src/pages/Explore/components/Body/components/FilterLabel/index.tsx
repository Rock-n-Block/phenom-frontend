import { VFC } from 'react';

import { EllipsisText, Text } from 'components';

import { CrossIcon } from 'assets/img';

import s from './styles.module.scss';

interface IProps {
  title: string;
  onClick: () => void;
  icon?: string;
}

const FilterLabel: VFC<IProps> = ({ title, onClick, icon }) => {
  return (
    <button className={s.label} onClick={onClick} type="button">
      {icon && <img className={s.icon} src={icon} alt="icon" />}
      <EllipsisText>
        <Text tag="span">{title}</Text>
      </EllipsisText>
      <div className={s.cross}>
        <CrossIcon />
      </div>
    </button>
  );
};

export default FilterLabel;
