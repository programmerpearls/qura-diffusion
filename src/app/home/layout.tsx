'use client';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
import { useDispatch } from 'react-redux';
import Sidebar from '@/components/Sidebar';
import {message} from 'antd';
import {useState, useRef, useEffect, useCallback} from 'react';
import { addGeneratedImage } from '@/store/reducers/generatedImagesSlice';
import OptionsContext from '../../components/Context/OptionsContext';
import config from '../config/config';


export default function HomeLayout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isImageGenerationOpen, setIsImageGenerationOpen] = useState(false);
  const [isImageCompleted, setIsImageCompleted] = useState(false);

  const [imageSrc, setImageSrc] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<any>(null);
  const WS_URL = config.apiWsBaseUrl + '?token=' + config.apiKey;
  

  const onGalleryHandler = () => {
    router.push('/home/gallery');
  };
  // Handle incoming WebSocket messages
  const handleWebSocketMessage = async (data: any) => {
    try {
      if (data && data.image) {
        // Construct a data URL
        const base64Image = `data:image/png;base64,${data.image}`;
        setImageSrc(base64Image);

        if (data.completed && data.image) {
          dispatch(addGeneratedImage(base64Image));
        }
      }
    } catch (error) {
      console.error('Error converting binary to base64:', error);
    }

    if (data.completed) {
      setIsImageCompleted(true);
    } else {
      console.log(`Progress: ${data.step} steps completed.`);
    }
  };

  const handleWebSocketClose = (event: any) => {
    switch (event.code) {
      case 1000:
        message.info('Connection closed normally.');
        break;
      case 1003:
        message.error('Invalid request format.');
        break;
      case 3000:
        message.error('Unauthorized: Invalid API key.');
        break;
      case 1011:
        message.error('Internal server error.');
        break;
      case 1013:
        message.warning('Service unavailable: All GPUs are in use.');
        break;
      case 3008:
        message.error('Request timed out.');
        break;
      default:
        message.error('Unexpected error occurred.');
        break;
    }
  };
  // Initialize the WebSocket connection
  const initializeWebSocket = useCallback(() => {

    wsRef.current = new WebSocket(WS_URL);

    wsRef.current.onopen = () => {
      console.log('WebSocket connection opened at ' + WS_URL);
      setIsConnected(true);
    };

    wsRef.current.onmessage = (message: MessageEvent) => {
      const data = JSON.parse(message.data);
      handleWebSocketMessage(data);
    };

    wsRef.current.onclose = (event: CloseEvent) => {
      setIsConnected(false);
      handleWebSocketClose(event);
    };

    wsRef.current.onerror = (error: Event) => {
      console.error('WebSocket error: ', error);
    };
  }, [WS_URL, handleWebSocketClose, handleWebSocketMessage]);

  useEffect(() => {
    initializeWebSocket();
    return () => {
      if (isConnected) {
        wsRef.current.close();
      }
    };
  }, []);

  const onImageGenerationHandler = (text: string) => {
    if (isConnected) {
      // new image generation refresh
      setImageSrc('');
      setIsImageCompleted(false);

      wsRef.current.send(
        JSON.stringify({
          prompt: text,
        }),
      );
    } else {
      console.log('wss closed');
    }
  };

  const onImageDialogOpenHandler = (bol: boolean) => {
    router.push(`/home`);
    // If the socket is in a closed or error state, attempt to reconnect
    if (bol && !isConnected) {
      console.log('WebSocket is not connected, attempting to reconnect...');
      initializeWebSocket();
    }
    setIsImageGenerationOpen(bol);
  }

  return (
    <div className="container">
      <Header />
      <div className="body flex relative w-full">
        <Sidebar
          onImageDialogOpenHandler={onImageDialogOpenHandler}
          onGalleryHandler={onGalleryHandler}
        />
        <div className="content-container flex justify-center">
          <OptionsContext.Provider
            value={{
              isImageGenerationOpen: isImageGenerationOpen,
              isImageCompleted: isImageCompleted,
              imageSrc: imageSrc,
              onImageDialogOpenHandler: onImageDialogOpenHandler,
              onImageGenerationHandler: onImageGenerationHandler,
              onGalleryHandler: onGalleryHandler,
            }}
          >
            {children}
          </OptionsContext.Provider>
        </div>
      </div>
    </div>
  );
}
