import React from 'react';
import Skeleton from 'react-loading-skeleton';
import ImageLoader from './imageLoader';

export default ({ url, circle = false, width, height }) => {
  return (
    <ImageLoader url={url}
      loader={<Skeleton circle={circle} height={height} width={width} />} />
  );
}