import React from 'react';
import { getPhotoByTag, PhotoItem } from '../content/photoManifest';

interface PhotoPictureProps {
  photoTag: string;
  className?: string;
  priority?: boolean;
  useThumb?: boolean;
  alt?: string;
  style?: React.CSSProperties;
}

export const PhotoPicture: React.FC<PhotoPictureProps> = ({
  photoTag,
  className = '',
  priority = false,
  useThumb = false,
  alt,
  style = {}
}) => {
  let photo: PhotoItem;
  try {
    photo = getPhotoByTag(photoTag);
  } catch (err) {
    console.error(err);
    return null;
  }

  const webpSrc = useThumb ? photo.derivatives.thumb : photo.derivatives.webp;
  const jpgSrc = photo.derivatives.jpg;
  const displayAlt = alt || photo.alt;

  const combinedStyle: React.CSSProperties = {
    objectFit: photo.preferredFit,
    objectPosition: photo.focalPoint.desktop,
    ...style
  };

  return (
    <picture className={`photo-picture ${className}`}>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={jpgSrc}
        alt={displayAlt}
        width={photo.naturalWidth}
        height={photo.naturalHeight}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        style={combinedStyle}
      />
    </picture>
  );
};
