import {UserOutlined} from '@ant-design/icons';
import DButton from '../DButton';
import {Avatar} from 'antd';

interface ISidebar {
  onImageDialogOpenHandler: (isOpen: boolean) => void;
  onGalleryHandler: () => void;
}

const Sidebar: React.FC<ISidebar> = ({
  onImageDialogOpenHandler,
  onGalleryHandler,
}) => {
  return (
    <div className="sidebar flex  border-r-4 border-black min-w-60 min-h-[743px] overflow-auto">
      <div className="flex w-full ">
        <div className="flex flex-col w-full ">
          <div className="mt-5 flex justify-center w-full">
            <DButton
              style={{
                height: '65px',
              }}
              type="primary"
              size="large"
              className="w-52 ml-5 mr-5"
              onClickHandler={() => onImageDialogOpenHandler(true)}
            >
              Image generation
            </DButton>
          </div>
          <div className="mt-5 flex justify-center flex-grow">
            <DButton
              style={{height: '65px'}}
              type="primary"
              size="large"
              className="w-52 ml-5 mr-5"
              onClickHandler={onGalleryHandler}
            >
              Gallery
            </DButton>
          </div>

          <div className="w-[215px] h-[140px] self-center bg-white ">
            <div className="flex pt-2 cursor-pointer" onClick={() => {}}>
              <div className="Avatar pt-2 pb-2 pr-2">
                <Avatar size={45} icon={<UserOutlined />} />
              </div>
              <div className="UserDetails p-2 ">
                <div className="username text-[#525252]">Waqar Subhani</div>
                <div className="text-sm text-[#bebdbd]">waqar@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
