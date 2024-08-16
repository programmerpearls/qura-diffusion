import {Button, ButtonProps, ConfigProvider} from 'antd';

interface IDButton extends ButtonProps {
  onClickHandler: () => void;
}

const DButton: React.FC<IDButton> = ({onClickHandler, children, ...rest}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3CC6E6',
          colorBgContainerDisabled: '#9de2f2',
          colorTextDisabled: '#ffffff',
        },
      }}
    >
      <Button onClick={onClickHandler} {...rest}>
        {children}
      </Button>
    </ConfigProvider>
  );
};

export default DButton;
