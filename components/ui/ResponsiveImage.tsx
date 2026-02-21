import Image from 'next/image'
import { CSSProperties } from 'react'

interface ResponsiveImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  style?: CSSProperties
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  quality?: number
  fill?: boolean
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
}

export default function ResponsiveImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  style,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  quality = 85,
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center',
}: ResponsiveImageProps) {
  // Generate blur placeholder if not provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='

  const imageProps: any = {
    src,
    alt,
    quality,
    placeholder,
    blurDataURL: blurDataURL || defaultBlurDataURL,
    className,
    style,
    priority,
  }

  if (fill) {
    imageProps.fill = true
    imageProps.style = {
      objectFit,
      objectPosition,
      ...style,
    }
  } else {
    imageProps.width = width
    imageProps.height = height
  }

  if (sizes) {
    imageProps.sizes = sizes
  } else if (!fill) {
    // Default responsive sizes
    imageProps.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  }

  return <Image {...imageProps} alt={alt} />
}

// Common size presets for consistent usage
export const imageSizes = {
  hero: '(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px',
  card: '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px',
  thumbnail: '(max-width: 768px) 25vw, (max-width: 1200px) 20vw, 150px',
  full: '100vw',
  half: '(max-width: 768px) 100vw, 50vw',
}