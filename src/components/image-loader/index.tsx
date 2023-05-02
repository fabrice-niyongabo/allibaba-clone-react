import React, { ImgHTMLAttributes } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface IImageLoaderProps {
  src: any;
  alt?: string;
  props?: ImgHTMLAttributes<HTMLImageElement>;
}
function ImageLoader({ src, alt, props }: IImageLoaderProps) {
  return (
    <LazyLoadImage
      effect="blur"
      src={src}
      alt={alt ? alt : ""}
      {...(props as any)}
    />
  );
}

export default ImageLoader;
