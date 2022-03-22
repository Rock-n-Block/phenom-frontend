import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { closeModal, setActiveModal } from 'store/modals/reducer';
import modalSelector from 'store/modals/selectors';
import { Modals, ModalState } from 'types/store';

import { useShallowSelector } from 'hooks';

type TUseModalReturn = {
  modalType: Modals;
  closeModals: () => void;
  activateModals: (state: ModalState) => void;
};

type TUseModalProps = {
  currentModal?: ModalState;
};

function useModals(): TUseModalReturn;
function useModals(props: TUseModalProps): TUseModalReturn;

function useModals(props?: TUseModalProps): TUseModalReturn {
  const modal = useShallowSelector(modalSelector.getProp('modalState'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (props) {
      const { currentModal } = props;
      if (currentModal) {
        setActiveModal(currentModal);
      }
    }
  }, [props]);

  const closeModals = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const activateModals = useCallback(
    (state: ModalState) => {
      dispatch(setActiveModal(state));
    },
    [dispatch],
  );

  return { modalType: modal.activeModal, closeModals, activateModals };
}

export default useModals;
