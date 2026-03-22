import { useState } from 'react'

/**
 * Drop-in replacement for <img> that shows a shimmer skeleton while the
 * image is loading, then fades the image in once it's ready.
 *
 * Props mirror standard <img> attributes plus:
 *  - wrapperClassName  — classes applied to the wrapping <div>
 *  - All other props   — forwarded directly to <img>
 */
const LazyImage = ({ src, alt, className = '', wrapperClassName = '', ...rest }) => {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Shimmer — shown until image loads or errors */}
      {!loaded && !errored && (
        <div className="skeleton absolute inset-0 w-full h-full" aria-hidden="true" />
      )}

      {/* Actual image — fades in when loaded */}
      {!errored && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          {...rest}
        />
      )}

      {/* Fallback when image fails to load */}
      {errored && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface text-secondary text-xs">
          {alt ?? 'Image unavailable'}
        </div>
      )}
    </div>
  )
}

export default LazyImage
