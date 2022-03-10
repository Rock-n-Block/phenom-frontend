import { FC, useCallback, useRef } from 'react';

import cx from 'classnames';

import { Button, Text } from 'components';

import styles from './styles.module.scss';

export interface ITab {
  key: string;
  title?: string;
  name?: string;
  icon?: JSX.Element | string;
  url?: string;
}

type Props = {
  className?: string;
  wrapClassName?: string;
  tabClassName?: string;
  tabs: ITab[];
  activeTab?: string;
  action: (value: string) => void;
  type?: 'tabs' | 'buttons';
};

const TabLookingComponent: FC<Props> = ({
  className,
  activeTab,
  tabs,
  action,
  tabClassName,
  wrapClassName,
  type,
}) => {
  const handleClick = (key: any) => {
    action(key);
  };

  const scrollProviderRef = useRef<HTMLDivElement>(null);
  const tabWrapperRef = useRef<HTMLDivElement>(null);

  const getIsScrollTips = useCallback(() => {
    if (scrollProviderRef.current && tabWrapperRef.current) {
      if (scrollProviderRef.current.offsetWidth < tabWrapperRef.current.offsetWidth) {
        return true;
      }
    }

    return false;
  }, []);
  return (
    <div
      className={cx(styles.tabContainer, wrapClassName, { [styles.scrollTips]: getIsScrollTips() })}
    >
      <div ref={scrollProviderRef} className={styles.scrollProvider}>
        <div ref={tabWrapperRef} className={cx(styles.tabWrapper, className)}>
          {tabs.map(({ title, name, icon, key, url }) => {
            return type === 'tabs' ? (
              <Button
                onClick={() => handleClick(name || key)}
                color="transparent"
                key={title || name}
                href={url}
                className={cx(styles.tab, { [styles.selected]: (key || name) === activeTab }, tabClassName)}
              >
                {icon && typeof icon === 'string' ? (
                  <img className={styles.tabIcon} src={icon} alt="" />
                ) : (
                  icon
                )}
                <Text className={styles.tabText} weight="medium" size="m">
                  {title || name}
                </Text>
              </Button>
            ) : (
              <Button
                color={(key || name) === activeTab ? 'dark' : 'light'}
                onClick={() => action(name || key)}
                className={tabClassName}
              >
                {title || name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabLookingComponent;
