import TopNav from '../components/TopNav'
import FloatingChatbot from '../components/FloatingChatbot'
import Footer from '../components/Footer'

/**
 * Shared layout shell for all 5 category pages.
 * Provides TopNav, FloatingChatbot, and Footer.
 * Children render between nav and footer.
 */
const CategoryLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <TopNav />

      {/* Main content — padded to clear sticky nav */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      <Footer />
      <FloatingChatbot />
    </div>
  )
}

export default CategoryLayout
