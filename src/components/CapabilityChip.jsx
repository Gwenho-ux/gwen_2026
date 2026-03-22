/**
 * Small label chip — category tags, skill labels, capability listings.
 * variant="accent" → lime green bg with dark text (per accent usage rules)
 * variant="default" → muted grey surface
 */
const CapabilityChip = ({ label, variant = 'default', className = '' }) => {
  const variantClass =
    variant === 'accent'
      ? 'bg-accent text-white'
      : 'bg-surface text-secondary border border-border'

  return (
    <span
      className={`inline-block text-[10px] font-semibold tracking-label uppercase px-3 py-1.5 rounded-card ${variantClass} ${className}`}
    >
      {label}
    </span>
  )
}

export default CapabilityChip
