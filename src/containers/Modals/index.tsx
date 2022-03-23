import modalSelector from 'store/modals/selectors';

import {
  ApprovePendingModal,
  ApproveRejectedModal,
  SendPendingModal,
  SendRejectedModal,
  SendSuccessModal,
} from 'components';
import ApproveErrorModal from 'components/Modals/modals/ApproveErrorModal';

import { useModals, useShallowSelector } from 'hooks';
import { Modals } from 'types';

const ModalsComponent = () => {
  const { modalType, closeModals } = useModals();
  const modalProps = useShallowSelector(modalSelector.getProp('modalProps'));
  return (
    <>
      <ApprovePendingModal
        visible={modalType === Modals.ApprovePending}
        onClose={() => closeModals()}
      />

      <ApproveErrorModal
        visible={modalType === Modals.ApproveError}
        onClose={() => closeModals()}
      />

      <ApproveRejectedModal
        visible={modalType === Modals.ApproveRejected}
        onClose={() => closeModals()}
        onApproveAgain={'onApprove' in modalProps ? modalProps.onApprove : undefined}
      />
      <SendPendingModal visible={modalType === Modals.SendPending} onClose={() => closeModals()} />
      <SendSuccessModal visible={modalType === Modals.SendSuccess} onClose={() => closeModals()} />
      <SendRejectedModal
        visible={modalType === Modals.SendRejected}
        onClose={() => closeModals()}
        onSendAgain={'onApprove' in modalProps ? modalProps.onApprove : undefined}
      />
    </>
  );
};

export default ModalsComponent;
