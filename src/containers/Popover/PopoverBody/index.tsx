import { FC } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';

import { usePopover } from 'hooks';

import styles from './styles.module.scss';

export interface IPopoverBody {
  className?: string;
}

const PopoverBody: FC<IPopoverBody> = ({ className, children }) => {
  const { visible, closePopover, position, topOffset } = usePopover();

  if (!visible) {
    return null;
  }
  return (
    <section
      className={cn(styles.wrapper, styles[position || 'right'])}
      style={{ paddingTop: topOffset }}
    >
      <div className={cn(styles.body, className)}>
        <OutsideClickHandler onOutsideClick={closePopover}>{children}</OutsideClickHandler>
      </div>
    </section>
  );
};
export default PopoverBody;
