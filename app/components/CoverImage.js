'use client'

import { useCovers } from '../context/CoverContext'

export default function CoverImage({ slug, src, alt, className, priority, ...props }) {
  const { getCover } = useCovers()
  const customCover = getCover(slug)
  const imageSrc = customCover || src

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      priority={priority}
      {...props}
    />
  )
}
