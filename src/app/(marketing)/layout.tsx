import { Navigation } from '@/components/marketing/Navigation'
import { Footer } from '@/components/marketing/Footer'
import { ScrollToTopWithProgress } from '@/components/shared/ScrollToTopWithProgress'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <ScrollToTopWithProgress />
      <Footer />      
    </div>
  )
}