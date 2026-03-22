import { motion } from 'framer-motion'
import LazyImage from '../components/LazyImage'
import TopNav from '../components/TopNav'
import HeroSection from '../components/HeroSection'
import SectionHeader from '../components/SectionHeader'
import ProductCarousel from '../components/ProductCarousel'
import ScatterText from '../components/ScatterText'
import ContactCTA from '../components/ContactCTA'
import Footer from '../components/Footer'
import FloatingChatbot from '../components/FloatingChatbot'
import { useParallax } from '../hooks/useParallax'
import {
  fadeUp,
  fadeIn,
  staggerContainerFast,
  slideInLeft,
  slideInRight,
} from '../utils/motionVariants'

const LandingPage = () => {
  const { ref: aboutRef, y: aboutImgY } = useParallax(0.25)

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <TopNav />

      {/* Section A — Hero */}
      <HeroSection />

      {/* Section B — Product Carousel */}
      <motion.section
        className="pt-28 bg-bg overflow-hidden"
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-14">
          <div className="px-6">
            <SectionHeader
              title="My Areas of Craft"
              subtitle="Five things I've been working on for a while. Go take a look."
            />
          </div>
          <ProductCarousel />
        </div>
      </motion.section>

      {/* Section C — Scatter text interlude */}
      <ScatterText />

      {/* Section D — About Me Preview */}
      <section
        ref={aboutRef}
        id="about"
        className="py-36 px-6 bg-black border-t border-white/10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Image — parallax drift */}
            <motion.div style={{ y: aboutImgY }}>
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <LazyImage
                  src="/gwen-avatar.png"
                  alt="Gwen"
                  className="object-cover object-top"
                  wrapperClassName="w-full aspect-square rounded-card overflow-hidden"
                />
              </motion.div>
            </motion.div>

            {/* Text — slides in from right */}
            <motion.div
              className="flex flex-col gap-8"
              variants={staggerContainerFast}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div variants={slideInRight}>
                <SectionHeader
                  title="I'm Gwen, a Designer & Builder shaping products, systems, and creative worlds."
                  showRule
                  dark
                />
              </motion.div>

              <motion.p variants={fadeUp} className="text-white/70 leading-relaxed text-lg">
                I turn ideas into real things. From UX and brand systems to AI workflows and working prototypes.
              </motion.p>
              <motion.p variants={fadeUp} className="text-white/70 leading-relaxed">
                My approach is simple: make it clear, make it work, and make it matter.
              </motion.p>

              <motion.div variants={fadeUp} className="pt-2">
                <a href="#contact" className="btn-secondary self-start inline-flex !border-white/30 !text-white hover:!bg-white hover:!text-black">
                  Learn more about me →
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section D — Contact / Footer */}
      <div id="contact">
        <ContactCTA />
      </div>
      <Footer />

      <FloatingChatbot />
    </div>
  )
}

export default LandingPage
