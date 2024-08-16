import DButton from '@/components/DButton';
import dialoggerLogo from '../../../public/dialogger_logo.png';
import Image from 'next/image';

const Header = () => {
  return (
    <div className="header border-b-4 border-black h-24 w-screen flex justify-between items-center">
      <div className="ml-5 text-3xl font-bold">Diffusion.ai</div>
    </div>
  );
};

export default Header;
