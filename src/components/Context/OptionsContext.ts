import {createContext} from 'react';

interface OptionsContextType {
  isImageGenerationOpen: boolean;
  isImageCompleted: boolean;
  imageSrc: string;
  onImageGenerationHandler: (text: string) => void;
  onImageDialogOpenHandler: (bol: boolean) => void;
  onGalleryHandler: (bol: boolean) => void;
}

const OptionsContext = createContext<OptionsContextType>({
  isImageGenerationOpen: false,
  isImageCompleted: false,
  imageSrc: '',
  onImageGenerationHandler: (text: string) => {},
  onImageDialogOpenHandler: (bol: boolean) => {},
  onGalleryHandler: (bol: boolean) => {},
});

export default OptionsContext;
