/**
 * Generic grey placeholder box — stands in for images, illustrations, avatars.
 * Replace with real <img> or component once assets are ready.
 */
const PlaceholderBlock = ({ label = 'Placeholder', className = '', aspectRatio = 'aspect-video' }) => {
  return (
    <div
      className={`bg-surface border border-border flex items-center justify-center ${aspectRatio} ${className}`}
    >
      <span className="text-secondary text-xs font-semibold tracking-label uppercase">
        {label}
      </span>
    </div>
  )
}

export default PlaceholderBlock
