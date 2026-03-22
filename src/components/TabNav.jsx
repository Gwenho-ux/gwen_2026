/**
 * Horizontal tab navigation bar — underline active style.
 * Accepts tabs array: [{ id, label }]
 * Orange underline on active tab (accent usage per design rules).
 */
const TabNav = ({ tabs, activeTab, onTabChange }) => {
  return (
    <nav
      className="flex gap-0"
      aria-label="Category tabs"
      role="tablist"
    >
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          role="tab"
          aria-selected={activeTab === id}
          onClick={() => onTabChange(id)}
          className={`tab-btn flex-1 px-3 text-center break-words hyphens-auto ${activeTab === id ? 'active' : ''}`}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}

export default TabNav
