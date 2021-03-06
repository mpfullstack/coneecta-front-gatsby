import React from 'react';
import useImage from 'use-image';

const ImageLoader = ({ url, alt = '', title = '', loader = '', width = 'auto', height = 'auto' }) => {
  const [image, status] = useImage(url);

  if (status === 'loaded') {
    return <img src={image.src} alt={alt} title={title} style={{ width, height}}/>;
  } else if (loader) {
    return loader;
  }
}

export default ImageLoader;