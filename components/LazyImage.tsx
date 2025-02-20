"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect, useRef } from "react";

const LazyImage = ({
  src,
  alt,
  defaultUrl: placeholder,
  ...props
}: {
  src: string;
  alt: string;
  defaultUrl: string;
} & ImageProps) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (imgRef.current) {
      // Create an observer that sets isVisible to true when the image enters the viewport.
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1, // Trigger when 10% of the image is visible.
          rootMargin: "100px", // Preload a bit before it fully appears.
        }
      );
      observer.observe(imgRef.current);
    }
    return () => {
      if (observer && observer.unobserve && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <Image
      ref={imgRef}
      src={isVisible ? src : placeholder || ""}
      alt={alt}
      {...props}
    />
  );
};

export default LazyImage;
