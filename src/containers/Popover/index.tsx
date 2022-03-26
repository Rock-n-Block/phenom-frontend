import { createContext, FC, useCallback, useState } from 'react';

import cn from 'classnames';

import PopoverBody, { IPopoverBody } from './PopoverBody';
import PopoverButton, { IPopoverButton } from './PopoverButton';

import styles from './styles.module.scss';

type TPosition = 'left' | 'center' | 'right';
export interface IPopoverContext {
  visible: boolean;
  setVisible: (value: boolean) => void;
  showOnHover?: boolean;
  setShowOnHover?: (value: boolean) => void;
  position?: TPosition;
  setPosition?: (value: TPosition) => void;
  topOffset?: string;
  setTopOffset?: (offset: string) => void;
}

export const PopoverContext = createContext<IPopoverContext | undefined>(undefined);

interface IPopover {
  Button: FC<IPopoverButton>;
  Body: FC<IPopoverBody>;
}

interface IPopoverProps {
  className?: string;
  showOnHover?: boolean;
  position?: TPosition;
  topOffset?: string;
}

const Popover: FC<IPopoverProps> & IPopover = ({
  className,
  showOnHover = true,
  position = 'right',
  topOffset = '10px',
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [bodyPosition, setBodyPosition] = useState<TPosition>(position);
  const [bodyOffset, setBodyOffset] = useState(topOffset);
  const [hoverShow, setHoverShow] = useState(showOnHover);

  const onMouseOver = useCallback(() => {
    if (!visible && showOnHover) {
      setVisible(true);
    }
  }, [visible, setVisible, showOnHover]);

  const onMouseLeave = useCallback(() => {
    if (visible && showOnHover) {
      setVisible(false);
    }
  }, [visible, setVisible, showOnHover]);

  return (
    <PopoverContext.Provider
      value={{
        visible,
        setVisible,
        position: bodyPosition,
        setPosition: setBodyPosition,
        showOnHover: hoverShow,
        setShowOnHover: setHoverShow,
        topOffset: bodyOffset,
        setTopOffset: setBodyOffset,
      }}
    >
      <div
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onFocus={() => {}}
        className={cn(styles.popoverContainer, className)}
      >
        {children}
      </div>
    </PopoverContext.Provider>
  );
};
Popover.Button = PopoverButton;
Popover.Body = PopoverBody;

export default Popover;
