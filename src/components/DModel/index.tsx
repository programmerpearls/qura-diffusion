import {Modal, ModalFuncProps} from 'antd';
import DButton from '../DButton';
import TextArea from 'antd/es/input/TextArea';
import {FC, ReactNode} from 'react';

interface IDModel extends ModalFuncProps {
  title?: string;
  isModalOpen: boolean;
  children: ReactNode;
  footer?:
    | ReactNode
    | ((
        originNode: ReactNode,
        extra: {
          OkBtn: FC<{}>;
          CancelBtn: FC<{}>;
        },
      ) => ReactNode);
  onCloseHandler: () => void;
  closable: boolean;
}

const DModel: FC<IDModel> = ({
  title,
  children,
  isModalOpen,
  onCloseHandler,
  closable,
  footer,
  ...rest
}) => {
  return (
    <Modal
      title={title}
      centered
      styles={{
        content: {backgroundColor: '#d9d9d9', width: '600px'},
        header: {backgroundColor: '#d9d9d9', color: '#ffffff'},
      }}
      onCancel={onCloseHandler}
      closable={closable}
      open={isModalOpen}
      footer={footer}
      {...rest}
    >
      {children}
    </Modal>
  );
};

export default DModel;
