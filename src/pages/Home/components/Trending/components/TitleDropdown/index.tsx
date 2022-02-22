import { FC, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';

import { H2, Text } from 'components';

import { iconArrowDownBlue } from 'assets/img';

import styles from './styles.module.scss';

type OptionType = {
  title: string;
};

interface IProps {
  options: OptionType[];
  value: OptionType;
  setValue: (value: OptionType) => void;
  className?: string;
}

const TitleDropdown: FC<IProps> = ({ options, value, setValue, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOptionClick = (option: OptionType) => {
    setValue(option);
    setIsOpen(false);
  };
  return (
    <div className={cn(styles.titleDropdown, className)}>
      <OutsideClickHandler onOutsideClick={handleClose}>
        <div
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
          onClick={() => setIsOpen((prevState) => !prevState)}
          className={styles.selected}
        >
          <H2 weight="bold" color="blue" className={styles.blueValue}>
            {value.title.toLowerCase() === 'all categories' ? 'all categories' : value.title}
          </H2>
          <div className={styles.dropdownContainer}>
            <img
              src={iconArrowDownBlue}
              alt=""
              className={cn(styles.selectedImg, { [styles.selectedImgOpen]: isOpen })}
            />
            <div className={cn(styles.selectionWrapper, { [styles.activeDropdown]: isOpen })}>
              <div className={`${styles.triangle}`} />
              <ul className={cn(styles.body, { [styles.activeDropdown]: isOpen })}>
                {options.map((option) => (
                  <li key={JSON.stringify(option)}>
                    <div
                      // key={option.value}
                      tabIndex={0}
                      role="button"
                      onKeyDown={() => {}}
                      onClick={(e: any) => {
                        e.stopPropagation();
                        handleOptionClick(option);
                      }}
                      className={styles.option}
                    >
                      <Text weight="semibold" size="xl">
                        {option.title}
                      </Text>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};
export default TitleDropdown;
