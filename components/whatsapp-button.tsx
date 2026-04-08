"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/41762269434"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
      aria-label="Contacter via WhatsApp"
    >
      <MessageCircle className="h-6 w-6 fill-current" />
      <span className="font-semibold hidden sm:inline group-hover:inline">WhatsApp</span>
    </a>
  )
}
