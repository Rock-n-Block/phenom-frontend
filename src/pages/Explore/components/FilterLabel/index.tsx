import { VFC } from 'react';

import { Text } from 'components';

import { CrossIcon } from 'assets/img';

import s from './FilterLabel.module.scss';

interface IProps {
  title: string;
  onClick: () => void;
  icon?: string;
}

const FilterLabel: VFC<IProps> = ({ title, onClick, icon }) => {
  return (
    <button className={s.label} onClick={onClick} type="button">
      {icon && <img className={s.icon} src={icon} alt="icon" />}
      <Text tag="span">
        {title}
      </Text>
      <div className={s.cross}>
        <CrossIcon />
      </div>
    </button>
  );
};

export default FilterLabel;
