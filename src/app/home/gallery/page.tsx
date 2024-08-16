'use client';

import './gallery.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectGeneratedImages } from '@/store/reducers/generatedImagesSlice';

const Gallery = () => {
  const generatedImages = useSelector(selectGeneratedImages);

  return (
    <div className="page-container">
      <div className="img-gallery">
        {generatedImages.length > 0 ? (
          generatedImages.map((itemUrl, index) => (
            <div className="img-gallery__item" key={index}>
              <figure>
                <Image
                  src={itemUrl}
                  width="1280"
                  height="1920"
                  alt={`Image ${index + 1}`}
                />
                <figcaption>Image {`#${index + 1}`}</figcaption>
                <a 
                  href={itemUrl} 
                  download={`image-${index + 1}.jpg`} 
                  className="download-button"
                >
                  Download
                </a>
              </figure>
            </div>
          ))
        ) : (
          <div className="no-images-message">
            <p>No images available in the gallery.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
