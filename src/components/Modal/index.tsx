import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import cn from 'classnames';

import { H4 } from 'components';

import { iconCross } from 'assets/img';

import styles from './Modal.module.scss';

const Modal: React.FC<any> = ({
  outerClassName,
  containerClassName,
  visible,
  onClose,
  children,
  title,
  maxWidth,
}) => {
  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const disableBodyScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);
  const enableBodyScroll = useCallback(() => {
    document.body.style.overflow = 'unset';
  }, []);
  useEffect(() => {
    if (visible) {
      disableBodyScroll();
    }
    return () => enableBodyScroll();
  }, [disableBodyScroll, enableBodyScroll, visible]);

  return createPortal(
    visible && (
      <div className={styles.modal}>
        <div className={cn(styles.outer, outerClassName)} style={{ maxWidth }}>
          <OutsideClickHandler onOutsideClick={onClose}>
            <div className={cn(styles.container, containerClassName)}>
              {title ? <H4 className={styles.title}>{title}</H4> : null}
              {children}
              <button type="button" className={styles.close} onClick={onClose}>
                <img src={iconCross} width={16} height={16} alt="close" />
              </button>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    ),
    document.body,
  );
};

export default Modal;
