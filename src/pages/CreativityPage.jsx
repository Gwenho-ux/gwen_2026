import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import SectionHeader from '../components/SectionHeader'
import PageHero from '../components/PageHero'
import TabNav from '../components/TabNav'
import { getCategoryBySlug } from '../data/categories'
import { fadeUp, staggerContainerFast, scaleUp } from '../utils/motionVariants'

// ── Brand case data ───────────────────────────────────────────────────────────
const BRAND_CASES = [
  {
    id: 'moca',
    client: 'Moca Network',
    title: 'Identity as Infrastructure',
    hook: ["Identity isn't seen.", "It's felt."],
    description: "A branding system designed as structure, not surface.\nTranslating abstract ideas like identity and trust into a clear, scalable visual language.",
    whatILed: ['Creative Direction', 'Visual System Design', 'Brand Language'],
    how: [
      'Translated abstract concepts into visual forms (carving, architecture, layers)',
      'Defined reusable rules for typography, layout, and materials',
      'Explored multiple directions and refined toward a stable, institutional feel',
      'Ensured the system works across brand, product, and marketing',
    ],
    keyLearning: 'Strong branding is a system — not just visuals.',
    tags: ['#BrandSystem', '#DigitalIdentity', '#CreativeDirection', '#SystemThinking'],
    images: [
      '/moca-brand-01.jpg', '/moca-brand-02.jpg', '/moca-brand-03.jpg', '/moca-brand-04.jpg',
      '/moca-brand-05.jpg', '/moca-brand-06.jpg', '/moca-brand-07.jpg', '/moca-brand-08.jpg',
    ],
  },
  {
    id: 'animoca',
    client: 'Animoca Brands',
    title: 'Network as Visual System',
    hook: ['Value moves.', 'The system makes it visible.'],
    description: 'A visual system translating Animoca Brands\' ecosystem into a scalable and dynamic language.\n\nBuilt around concepts like network, light, and connection, the system expresses how value flows, expands, and compounds across products and partners.',
    whatILed: ['Creative Direction', 'Visual System Design', 'Brand Language Development'],
    how: [
      'Defined core concepts (network, nodes, light) as visual foundations',
      'Created modular assets to represent different business domains',
      'Designed a dual-mode system (institutional vs expressive) for different contexts',
      'Applied the system across brand, marketing, and large-scale visuals',
    ],
    keyLearning: 'A strong system makes complex ecosystems easy to understand.',
    tags: ['#BrandSystem', '#CreativeDirection', '#EcosystemDesign', '#VisualLanguage', '#Web3'],
    images: [
      '/animoca-brand-01.jpg', '/animoca-brand-02.jpg', '/animoca-brand-03.jpg', '/animoca-brand-04.jpg',
      '/animoca-brand-05.jpg', '/animoca-brand-06.jpg', '/animoca-brand-07.jpg', '/animoca-brand-08.jpg',
    ],
  },
]

// ── Reusable brand case block ────────────────────────────────────────────────
const BrandCase = ({ brand }) => (
  <motion.div
    variants={fadeUp}
    className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start"
  >
    {/* Left: content */}
    <div className="flex flex-col gap-8 lg:w-1/2">
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-semibold tracking-label uppercase text-accent">
          {brand.client}
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight leading-tight">
          {brand.title}
        </h2>
        <p className="text-xl text-secondary italic mt-1 leading-snug">
          {brand.hook.map((line, i) => <span key={i}>{line}{i < brand.hook.length - 1 && <br />}</span>)}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {brand.description.split('\n').filter(Boolean).map((para, i) => (
          <p key={i} className="text-base text-secondary leading-relaxed">{para}</p>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold tracking-label uppercase text-accent">What I Led</p>
        <ul className="flex flex-col gap-2">
          {brand.whatILed.map((item) => (
            <li key={item} className="flex items-center gap-3 text-base text-primary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold tracking-label uppercase text-accent">How I Built It</p>
        <ul className="flex flex-col gap-3">
          {brand.how.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-secondary leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="pl-5 border-l-2 border-accent">
        <p className="text-[11px] font-semibold tracking-label uppercase text-accent mb-1">Key Learning</p>
        <p className="text-base font-semibold text-primary">{brand.keyLearning}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {brand.tags.map((tag) => (
          <span key={tag} className="px-3 py-1.5 text-xs font-medium rounded-full border border-border text-secondary">
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* Right: image carousel */}
    <div className="lg:w-1/2 w-full">
      <ImageCarousel images={brand.images} />
    </div>
  </motion.div>
)

const ART_IMAGES = [
  '/art01.png', '/art02.png', '/art03.png', '/art04.png', '/art05.png',
  '/art06.png', '/art07.png', '/art08.png', '/art09.png', '/art10.png',
  '/art11.png', '/art12.png', '/art13.png', '/art14.png', '/art15.png',
]

const tabs = [
  { id: 'branding', label: 'Branding' },
  { id: 'visual', label: 'Visual Design' },
]

const category = getCategoryBySlug('creativity')

// ── Mini image carousel for the right panel ──────────────────────────────────
const ImageCarousel = ({ images }) => {
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Main image */}
      <div className="relative w-full aspect-[4/3] rounded-card overflow-hidden bg-surface">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <LazyImage
              src={images[active]}
              alt={`Brand image ${active + 1}`}
              className="object-cover"
              wrapperClassName="w-full h-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-white transition-colors shadow-sm"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-white transition-colors shadow-sm"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Counter */}
        <span className="absolute bottom-3 right-4 text-[11px] font-semibold text-white/80 tabular-nums">
          {active + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail strip */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={`aspect-square rounded-card overflow-hidden border-2 transition-all ${i === active ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            <LazyImage
              src={src}
              alt={`Thumbnail ${i + 1}`}
              className="object-cover"
              wrapperClassName="w-full h-full"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────
const CreativityPage = () => {
  const [activeTab, setActiveTab] = useState('branding')

  return (
    <div>
      <PageHero category={category} />

      {/* Tab navigation */}
      <div className="px-6 bg-black sticky top-16 z-30 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <TabNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      <div className="px-6 py-24">
        <div className="max-w-7xl mx-auto">

          {/* ── Branding tab ────────────────────────────────────────── */}
          {activeTab === 'branding' && (
            <motion.div
              key="branding"
              className="flex flex-col gap-24"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            >
              {BRAND_CASES.map((brand, i) => (
                <div key={brand.id}>
                  <BrandCase brand={brand} />
                  {i < BRAND_CASES.length - 1 && (
                    <div className="mt-24 border-t border-border" />
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {/* ── Visual Design tab ───────────────────────────────────── */}
          {activeTab === 'visual' && (
            <motion.div
              key="visual"
              className="flex flex-col gap-10"
              variants={staggerContainerFast}
              initial="hidden"
              animate="visible"
            >
              <SectionHeader
                title="Visual Design & Art Direction"
                subtitle="Editorial sensibility applied to campaigns, publications, and digital spaces."
              />
              <motion.div
                variants={staggerContainerFast}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
              >
                {ART_IMAGES.map((src, i) => (
                  <motion.div
                    key={src}
                    variants={scaleUp}
                    whileHover={{ scale: 1.04, zIndex: 10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="aspect-square overflow-hidden rounded-card bg-surface relative"
                  >
                    <LazyImage
                      src={src}
                      alt={`Art ${i + 1}`}
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      wrapperClassName="w-full h-full"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  )
}

export default CreativityPage
