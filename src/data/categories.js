/**
 * Category data — each object maps to a route and a Category page.
 * Swap content here without touching layout code.
 */
export const categories = [
  {
    id: 'ux-design',
    slug: 'ux-design',
    title: 'UX/UI Design',
    tagline: 'Designing experiences that feel inevitable.',
    label: 'Design',
    description: 'End-to-end product design — from user research to polished interfaces.',
    route: '/ux-design',
    icon: '◫',
    heroBg: '/product-ux.png',
  },
  {
    id: 'creativity',
    slug: 'creativity',
    title: 'Creativity',
    tagline: 'Where ideas take shape and culture meets craft.',
    label: 'Creative',
    description: 'Branding, visual storytelling, and art direction with editorial sensibility.',
    route: '/creativity',
    icon: '◈',
    heroBg: '/product-creative.png',
  },
  {
    id: 'ai',
    slug: 'ai',
    title: 'AI Application',
    tagline: 'Harnessing intelligence as a design material.',
    label: 'Tech',
    description: 'Building AI-powered workflows, tools, and systems that augment human creativity.',
    route: '/ai',
    icon: '◎',
    heroBg: '/product-ai.png',
  },
  {
    id: 'prototyping',
    slug: 'prototyping',
    title: 'Mini Experiences',
    tagline: 'From idea to working product in hours, not months.',
    label: 'Code',
    description: 'Rapid prototyping and shipping with clean, purpose-built code.',
    route: '/prototyping',
    icon: '◱',
    heroBg: '/product-mini.png',
  },
  {
    id: 'leadership',
    slug: 'leadership',
    title: 'Leadership',
    tagline: 'Building products, teams, and lasting impact.',
    label: 'People',
    description: 'Cross-functional team leadership, mentoring, and strategic vision.',
    route: '/leadership',
    icon: '◇',
    heroBg: '/product-impact.png',
  },
]

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug) ?? null
