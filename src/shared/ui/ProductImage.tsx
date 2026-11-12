import { useState, type ImgHTMLAttributes } from 'react'
import fallback from '../../img/producto-placeholder.svg'

export default function ProductImage({
  src,
  onError,
  ...props
}: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src?: string | null }) {
  const [failed, setFailed] = useState<string | null>(null)
  const source = src && failed !== src ? src : fallback
  return (
    <img
      {...props}
      src={source}
      onError={(event) => {
        if (source !== fallback) setFailed(src ?? null)
        onError?.(event)
      }}
    />
  )
}
