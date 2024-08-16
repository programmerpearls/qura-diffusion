'use client';

import DButton from '@/components/DButton';

import {Alert, Input} from 'antd';
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import DModel from '@/components/DModel';
import OptionsContext from '../../components/Context/OptionsContext';

const HomePage = () => {
  const {
    isImageGenerationOpen,
    onImageDialogOpenHandler,
    onImageGenerationHandler,
    isImageCompleted,
    imageSrc
  } = useContext(OptionsContext);


  const [text, setText] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [errorDownload, setErrorDownload] = useState('');
  
  const [isImageGenOpen, setIsImageGenOpen] = useState(isImageGenerationOpen);
  const [isGenerateLoaderOpen, setIsGenerateLoaderOpen] = useState(
    false,
  );

  const {TextArea} = Input;

  useEffect(() => {
    setIsImageGenOpen(isImageGenerationOpen);
    setText('');
  }, [setIsImageGenOpen, isImageGenerationOpen]);

  const generateImage = () => {
    if (!text) {
      setErrorMessage('Please enter some text to generate image');
      return;
    }
    setIsGenerateLoaderOpen(true);
    setIsImageGenOpen(false);
    onImageDialogOpenHandler(false);
    onImageGenerationHandler(text);
  };

  const onChangeTextHandler = useCallback(
    (e: {target: {value: SetStateAction<string>}}) => {
      setText(e.target.value);
      if (e.target.value.toString().trim() == '') {
        setErrorMessage('Please enter some text to generate image');
        return;
      }
      setErrorMessage('');
    },
    [setText, setErrorMessage],
  );

  const onCloseHandler = () => {
    setIsImageGenOpen(false);
    onImageDialogOpenHandler(false);
  };

  const onCloseGenerateLoader = () => {
    setIsGenerateLoaderOpen(false);
  }

  const downloadImage = () => {
    if (!imageSrc) {
      setErrorDownload('No image available for download.');
      console.error("No image source available for download.");
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = imageSrc;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onCloseGenerateLoader();
    } catch (error) {
      setErrorDownload('Failed to download image.');
      console.error("Failed to download image:", error);
    }
  };

  const textImageCompletion: string = isImageCompleted ? "Generated Image" : "Image Generation in process ..."

  return (
    <>
      <DModel
        title="Image generation"
        isModalOpen={isImageGenOpen}
        key="imageGeneration"
        maskClosable={false}
        closable={true}
        onCloseHandler={onCloseHandler}
        footer={[
          [
            <DButton
              style={{
                height: '65px',
              }}
              type="primary"
              size="large"
              className="w-52"
              onClickHandler={generateImage}
              key={'txtSpeech'}
            >
              Generate
            </DButton>,
          ],
        ]}
      >
        <div className="flex justify-between"></div>
        <div className="w-full mt-5">
          {errorMessage && (
            <Alert message={errorMessage} type="error" showIcon />
          )}
          <TextArea
            rows={10}
            cols={40}
            value={text}
            onChange={e => onChangeTextHandler(e)}
            size="large"
          />
        </div>
      </DModel>
      <DModel
        key="downloadCompleteImage"
        title={textImageCompletion}
        isModalOpen={isGenerateLoaderOpen}
        closable={true}
        onCloseHandler={onCloseGenerateLoader}
        footer={null}
      >
      <div className="flex flex-col justify-center items-center">
        <div className="mt-16 w-full px-4">
          <div className="flex justify-center items-center">
            {imageSrc ? (
              <img src={imageSrc} alt="Generated Image" className="max-w-full h-auto" />
            ) : (
              <p className="text-center text-gray-500">No image received yet</p>
            )}
          </div>
        </div>

        <div className="flex mt-8 mb-8 justify-center">
          <DButton
            style={{
              height: '50px',
            }}
            type="primary"
            size="large"
            className="w-40"
            onClickHandler={downloadImage}
            disabled={!isImageCompleted} 
          >
            Download Image
          </DButton>
        </div>

        {errorDownload && <p className="text-red-500 mt-4">{errorDownload}</p>}
      </div>
    </DModel>
    </>
  );
};

export default HomePage;
