import { VFC } from 'react';
import { NavLink } from 'react-router-dom';

import cn from 'classnames';

import { TBarOption } from 'types';

import styles from './styles.module.scss';

interface ITabBar {
  rootPath: string;
  options: TBarOption[];
  className?: string;
  tabClassName?: string;
}

const TabBar: VFC<ITabBar> = ({ rootPath, options, className, tabClassName }) => {
  return (
    <section className={cn(styles['tab-bar__wrapper'], className)}>
      <nav className={cn(styles['tab-bar__wrapper__body'])}>
        {options.map((opt) => (
          <NavLink
            className={({ isActive }) =>
              cn(styles['tab-bar__wrapper__body-tab'], tabClassName, {
                [styles['active-tab']]: isActive,
              })
            }
            to={`${rootPath}${opt.value}`}
          >
            {opt.name || opt.value}
          </NavLink>
        ))}
      </nav>
    </section>
  );
};

export default TabBar;
