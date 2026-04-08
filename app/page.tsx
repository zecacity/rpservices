import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { EcoSection } from "@/components/eco-section"
import { QuoteForm } from "@/components/quote-form"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <QuoteForm />
      <EcoSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
