"use client"

import React, { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Mail, MessageCircle, Minus, Plus, Upload } from "lucide-react"

const DIRT_LEVELS = [
  { value: "leger", label: "Leger" },
  { value: "modere", label: "Modere" },
  { value: "tres-sale", label: "Tres sale" },
] as const

const CAR_SERVICES = [
  {
    value: "silver",
    label: "Silver",
    items: [
      "Nettoyage des surfaces plastiques",
      "Aspiration complete de l'habitacle et coffre",
      "Nettoyage et finition seuils de porte",
      "Vitrerie interieure",
      "Shampoing des tapis",
    ],
  },
  {
    value: "gold",
    label: "Gold",
    items: [
      "Nettoyage des surfaces plastiques",
      "Aspiration complete de l'habitacle et coffre",
      "Vitrerie interieure",
      "Shampoing des sieges, tapis",
      "Nettoyage cuir et alcantara",
      "Brillance et revitalisation des surfaces plastiques",
      "Desinfection vapeur",
    ],
  },
  {
    value: "platinum",
    label: "Platinum",
    items: [
      "Nettoyage des surfaces plastiques",
      "Aspiration complete de l'habitacle et coffre",
      "Vitrerie interieure",
      "Shampoing complet des sieges, tapis, moquettes",
      "Nettoyage cuir et alcantara",
      "Brillance et revitalisation des surfaces plastiques",
      "Desinfection vapeur",
      "Traitement des cuirs",
      "Nettoyage du ciel de toit, compartiments roue de secours",
    ],
  },
] as const

function QuantitySelector({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-input bg-background p-3">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-40"
          disabled={value === 0}
          aria-label={`Diminuer ${label}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm font-semibold text-foreground">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(10, value + 1))}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-input bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40"
          disabled={value === 10}
          aria-label={`Augmenter ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

function DirtLevelSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <Label className="text-foreground text-sm">Degre de salissure</Label>
      <div className="grid grid-cols-3 gap-2">
        {DIRT_LEVELS.map((level) => (
          <button
            key={level.value}
            type="button"
            onClick={() => onChange(level.value)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              value === level.value
                ? "border-primary bg-primary/10 text-primary"
                : "border-input bg-background text-muted-foreground hover:bg-muted"
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function CarServiceSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <Label className="text-foreground text-sm">Formule de service</Label>
      <div className="grid grid-cols-3 gap-3">
        {CAR_SERVICES.map((service) => (
          <button
            key={service.value}
            type="button"
            onClick={() => onChange(service.value)}
            className={`rounded-lg border p-3 text-left transition-colors h-full flex flex-col ${
              value === service.value
                ? "border-primary bg-primary/10"
                : "border-input bg-background hover:bg-muted"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-sm font-bold ${
                value === service.value ? "text-primary" : "text-foreground"
              }`}>
                {service.label}
              </span>
              {value === service.value && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  ✓
                </span>
              )}
            </div>
            <ul className="text-xs text-muted-foreground leading-relaxed flex-1">
              {service.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 mb-1">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>
    </div>
  )
}

interface CarpetItem {
  id: string
  largeur: string
  longueur: string
}

interface ChantierItem {
  id: string
  pieces: string
  m2: string
}

interface TerrasseItem {
  id: string
  m2: string
}

function getFormData(form: {
  name: string
  phone: string
  email: string
  address: string
  canapes: Record<string, number>
  canapeDirt: string
  canapeFabric: string
  canapeOptions: Record<string, boolean>
  fauteuils: Record<string, number>
  fauteuilDirt: string
  fauteuilFabric: string
  mattresses: Record<string, number>
  mattressDirt: string
  tapisItems: CarpetItem[]
  tapisPile: string
  tapisDirt: string
  moquetteItems: CarpetItem[]
  moquetteDirt: string
  vitreItems: CarpetItem[]
  vitreDirt: string
  cars: Record<string, number>
  carService: string
  carDirt: string
  chantierItems: ChantierItem[]
  chantierDirt: string
  bailItems: ChantierItem[]
  bailDirt: string
  terrasseItems: TerrasseItem[]
  terrasseDirt: string
  comments: string
}) {
  return { ...form }
}

function buildWhatsAppMessage(form: ReturnType<typeof getFormData>) {
  const lines: string[] = []
  lines.push("*Demande de Devis - RP Services*")
  lines.push("")
  lines.push(`*Nom:* ${form.name}`)
  lines.push(`*Tel:* ${form.phone}`)
  lines.push(`*Email:* ${form.email}`)
  lines.push(`*Adresse:* ${form.address}`)

  const carEntries = Object.entries(form.cars).filter(([, qty]) => qty > 0)
  if (carEntries.length > 0) {
    lines.push("")
    lines.push("*Interieurs Auto:*")
    for (const [type, qty] of carEntries) lines.push(`  ${type}: ${qty}`)
    if (form.carService) {
      const serviceLabel = CAR_SERVICES.find(s => s.value === form.carService)?.label || form.carService
      lines.push(`  Formule: ${serviceLabel}`)
    }
    if (form.carDirt) lines.push(`  Salissure: ${form.carDirt}`)
  }

  const canapeEntries = Object.entries(form.canapes).filter(([, qty]) => qty > 0)
  if (canapeEntries.length > 0) {
    lines.push("")
    lines.push("*Canapes:*")
    for (const [type, qty] of canapeEntries) lines.push(`  ${type}: ${qty}`)
    if (form.canapeFabric) lines.push(`  Tissu: ${form.canapeFabric}`)
    const opts = Object.entries(form.canapeOptions).filter(([, v]) => v).map(([k]) => k)
    if (opts.length > 0) lines.push(`  Options: ${opts.join(", ")}`)
    if (form.canapeDirt) lines.push(`  Salissure: ${form.canapeDirt}`)
  }

  const fauteuilEntries = Object.entries(form.fauteuils).filter(([, qty]) => qty > 0)
  if (fauteuilEntries.length > 0) {
    lines.push("")
    lines.push("*Fauteuils:*")
    for (const [type, qty] of fauteuilEntries) lines.push(`  ${type}: ${qty}`)
    if (form.fauteuilFabric) lines.push(`  Tissu: ${form.fauteuilFabric}`)
    if (form.fauteuilDirt) lines.push(`  Salissure: ${form.fauteuilDirt}`)
  }

  const validTapis = form.tapisItems.filter((c) => c.largeur && c.longueur)
  if (validTapis.length > 0) {
    lines.push("")
    lines.push("*Tapis:*")
    for (let i = 0; i < validTapis.length; i++) {
      lines.push(`  Tapis ${i + 1}: ${validTapis[i].largeur}m x ${validTapis[i].longueur}m`)
    }
    if (form.tapisPile) lines.push(`  Poil: ${form.tapisPile}`)
    if (form.tapisDirt) lines.push(`  Salissure: ${form.tapisDirt}`)
  }

  const validMoquettes = form.moquetteItems.filter((c) => c.largeur && c.longueur)
  if (validMoquettes.length > 0) {
    lines.push("")
    lines.push("*Moquettes:*")
    for (let i = 0; i < validMoquettes.length; i++) {
      lines.push(`  Moquette ${i + 1}: ${validMoquettes[i].largeur}m x ${validMoquettes[i].longueur}m`)
    }
    if (form.moquetteDirt) lines.push(`  Salissure: ${form.moquetteDirt}`)
  }

  const validVitres = form.vitreItems.filter((c) => c.largeur && c.longueur)
  if (validVitres.length > 0) {
    lines.push("")
    lines.push("*vitres:*")
    for (let i = 0; i < validVitres.length; i++) {
      lines.push(`  Vitre ${i + 1}: ${validVitres[i].largeur}m x ${validVitres[i].longueur}m`)
    }
    if (form.vitreDirt) lines.push(`  Salissure: ${form.vitreDirt}`)
  }

  const mattressEntries = Object.entries(form.mattresses).filter(([, qty]) => qty > 0)
  if (mattressEntries.length > 0) {
    lines.push("")
    lines.push("*Matelas:*")
    for (const [type, qty] of mattressEntries) lines.push(`  ${type}: ${qty}`)
    if (form.mattressDirt) lines.push(`  Salissure: ${form.mattressDirt}`)
  }

  const validChantier = form.chantierItems.filter((c) => c.pieces && c.m2)
  if (validChantier.length > 0) {
    lines.push("")
    lines.push("*Nettoyage fin de chantier:*")
    for (let i = 0; i < validChantier.length; i++) {
      lines.push(`  Zone ${i + 1}: ${validChantier[i].pieces} pieces, ${validChantier[i].m2} m2`)
    }
  }

  const validBail = form.bailItems.filter((c) => c.pieces && c.m2)
  if (validBail.length > 0) {
    lines.push("")
    lines.push("*Nettoyage fin de bail:*")
    for (let i = 0; i < validBail.length; i++) {
      lines.push(`  Zone ${i + 1}: ${validBail[i].pieces} pieces, ${validBail[i].m2} m2`)
    }
  }

  const validTerrasse = form.terrasseItems.filter((c) => c.m2)
  if (validTerrasse.length > 0) {
    lines.push("")
    lines.push("*Nettoyage de terrasse:*")
    for (let i = 0; i < validTerrasse.length; i++) {
      lines.push(`  Terrasse ${i + 1}: ${validTerrasse[i].m2} m2`)
    }
    if (form.terrasseDirt) lines.push(`  Salissure: ${form.terrasseDirt}`)
  }

  if (form.comments) {
    lines.push("")
    lines.push(`*Commentaires:* ${form.comments}`)
  }

  return lines.join("\n")
}

function buildWhatsAppMessageWithPhotos(form: ReturnType<typeof getFormData>, hasPhotos: boolean) {
  let message = buildWhatsAppMessage(form)
  if (hasPhotos) {
    message += "\n\n_J'ai des photos a vous envoyer. Je les enverrai apres ce message._"
  }
  return message
}

export function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState<"email" | "whatsapp" | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitMethod, setSubmitMethod] = useState<"email" | "whatsapp" | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPhotoReminder, setShowPhotoReminder] = useState(false)

  // Contact
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")

  // Canapes
  const [canapes, setCanapes] = useState<Record<string, number>>({
    "1 place": 0,
    "2 places": 0,
    "3 places": 0,
    "4+ places": 0,
  })
  const [canapeDirt, setCanapeDirt] = useState("")
  const [canapeFabric, setCanapeFabric] = useState("")
  const [canapeOptions, setCanapeOptions] = useState<Record<string, boolean>>({
    "Canape d'angle": false,
    "Poils d'animaux": false,
    "Canape-lit": false,
  })

  // Fauteuils
  const [fauteuils, setFauteuils] = useState<Record<string, number>>({
    "Fauteuil simple": 0,
    "Fauteuil relax": 0,
    "Fauteuil de bureau": 0,
  })
  const [fauteuilDirt, setFauteuilDirt] = useState("")
  const [fauteuilFabric, setFauteuilFabric] = useState("")

  // Mattresses
  const [mattresses, setMattresses] = useState<Record<string, number>>({
    Simple: 0,
    Double: 0,
    "Queen / King": 0,
  })
  const [mattressDirt, setMattressDirt] = useState("")

  // Tapis - manual dimensions
  const [tapisItems, setTapisItems] = useState<CarpetItem[]>([
    { id: "1", largeur: "", longueur: "" },
  ])
  const [tapisPile, setTapisPile] = useState("")
  const [tapisDirt, setTapisDirt] = useState("")

  // Moquettes - manual dimensions
  const [moquetteItems, setMoquetteItems] = useState<CarpetItem[]>([
    { id: "1", largeur: "", longueur: "" },
  ])
  const [moquetteDirt, setMoquetteDirt] = useState("")
   
  // Vitres - manual dimensions
  const [vitreItems, setVitreItems] = useState<CarpetItem[]>([
    { id: "1", largeur: "", longueur: "" },
  ])
  const [vitreDirt, setVitreDirt] = useState("")

  // Cars
  const [cars, setCars] = useState<Record<string, number>>({
    Citadine: 0,
    Berline: 0,
    "SUV / Utilitaire": 0,
  })
  const [carService, setCarService] = useState("")
  const [carDirt, setCarDirt] = useState("")

  // Nettoyage fin de chantier
  const [chantierItems, setChantierItems] = useState<ChantierItem[]>([
    { id: "1", pieces: "", m2: "" },
  ])
  const [chantierDirt, setChantierDirt] = useState("")

  // Nettoyage fin de bail
  const [bailItems, setBailItems] = useState<ChantierItem[]>([
    { id: "1", pieces: "", m2: "" },
  ])
  const [bailDirt, setBailDirt] = useState("")

  // Nettoyage de terrasse
  const [terrasseItems, setTerrasseItems] = useState<TerrasseItem[]>([
    { id: "1", m2: "" },
  ])
  const [terrasseDirt, setTerrasseDirt] = useState("")

  // Comments
  const [comments, setComments] = useState("")

  // Photos
  const [photos, setPhotos] = useState<{ file: File; preview: string }[]>([])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    
    const newPhotos = Array.from(files).slice(0, 5 - photos.length).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    
    setPhotos((prev) => [...prev, ...newPhotos].slice(0, 5))
    e.target.value = ""
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      const removed = prev[index]
      if (removed) URL.revokeObjectURL(removed.preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  const addTapisItem = () => {
    if (tapisItems.length < 10) {
      setTapisItems((prev) => [...prev, { id: String(Date.now()), largeur: "", longueur: "" }])
    }
  }

  const removeTapisItem = (id: string) => {
    if (tapisItems.length > 1) {
      setTapisItems((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const updateTapisItem = (id: string, field: "largeur" | "longueur", value: string) => {
    setTapisItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  const addMoquetteItem = () => {
    if (moquetteItems.length < 10) {
      setMoquetteItems((prev) => [...prev, { id: String(Date.now()), largeur: "", longueur: "" }])
    }
  }

  const removeMoquetteItem = (id: string) => {
    if (moquetteItems.length > 1) {
      setMoquetteItems((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const updateMoquetteItem = (id: string, field: "largeur" | "longueur", value: string) => {
    setMoquetteItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  const addVitreItem = () => {
    if (vitreItems.length < 10) {
      setVitreItems((prev) => [...prev, { id: String(Date.now()), largeur: "", longueur: "" }])
    }
  }

  const removeVitreItem = (id: string) => {
    if (vitreItems.length > 1) {
      setVitreItems((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const updateVitreItem = (id: string, field: "largeur" | "longueur", value: string) => {
    setVitreItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  // Chantier helpers
  const addChantierItem = () => {
    if (chantierItems.length < 10) {
      setChantierItems((prev) => [...prev, { id: String(Date.now()), pieces: "", m2: "" }])
    }
  }

  const removeChantierItem = (id: string) => {
    if (chantierItems.length > 1) {
      setChantierItems((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const updateChantierItem = (id: string, field: "pieces" | "m2", value: string) => {
    setChantierItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  // Bail helpers
  const addBailItem = () => {
    if (bailItems.length < 10) {
      setBailItems((prev) => [...prev, { id: String(Date.now()), pieces: "", m2: "" }])
    }
  }

  const removeBailItem = (id: string) => {
    if (bailItems.length > 1) {
      setBailItems((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const updateBailItem = (id: string, field: "pieces" | "m2", value: string) => {
    setBailItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  // Terrasse helpers
  const addTerrasseItem = () => {
    if (terrasseItems.length < 10) {
      setTerrasseItems((prev) => [...prev, { id: String(Date.now()), m2: "" }])
    }
  }

  const removeTerrasseItem = (id: string) => {
    if (terrasseItems.length > 1) {
      setTerrasseItems((prev) => prev.filter((c) => c.id !== id))
    }
  }

  const updateTerrasseItem = (id: string, value: string) => {
    setTerrasseItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, m2: value } : c))
    )
  }

  const buildData = useCallback(() => {
    return getFormData({
      name, phone, email, address,
      canapes, canapeDirt, canapeFabric, canapeOptions,
      fauteuils, fauteuilDirt, fauteuilFabric,
      mattresses, mattressDirt,
      tapisItems, tapisPile, tapisDirt,
      moquetteItems, moquetteDirt,
      vitreItems, vitreDirt,
      cars, carService, carDirt,
      chantierItems, chantierDirt,
      bailItems, bailDirt,
      terrasseItems, terrasseDirt,
      comments,
    })
  }, [name, phone, email, address, canapes, canapeDirt, canapeFabric, canapeOptions, fauteuils, fauteuilDirt, fauteuilFabric, mattresses, mattressDirt, tapisItems, tapisPile, tapisDirt, moquetteItems, moquetteDirt,vitreItems, vitreDirt, cars, carService, carDirt, chantierItems, chantierDirt, bailItems, bailDirt, terrasseItems, terrasseDirt, comments])

  const hasPhotos = photos.length > 0

  const uploadPhotos = async (): Promise<string[]> => {
    if (photos.length === 0) return []
    
    const formData = new FormData()
    for (const photo of photos) {
      formData.append("photos", photo.file)
    }
    
    try {
      const res = await fetch("/api/upload-photos", {
        method: "POST",
        body: formData,
      })
      
      if (!res.ok) {
        console.error("Failed to upload photos")
        return []
      }
      
      const data = await res.json()
      return data.urls || []
    } catch (error) {
      console.error("Photo upload error:", error)
      return []
    }
  }

  const sendEmailWithPhotos = async (photoUrls: string[], viaWhatsApp: boolean) => {
    const data = buildData()
    const emailData = {
      ...data,
      tapisItems: data.tapisItems.map((c) => ({ width: c.largeur, length: c.longueur })),
      moquetteItems: data.moquetteItems.map((c) => ({ width: c.largeur, length: c.longueur })),
      vitreItems: data.vitreItems.map((c) => ({ width: c.largeur, length: c.longueur })),
      photoUrls,
      viaWhatsApp,
    }
    
    try {
      await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      })
    } catch (error) {
      console.error("Email send error:", error)
    }
  }

  const handleEmailSubmit = async () => {
    if (!isFormValid) return
    setIsSubmitting("email")
    setErrorMessage(null)

    try {
      // Upload photos first
      const photoUrls = await uploadPhotos()
      
      const data = buildData()
      const emailData = {
        ...data,
        tapisItems: data.tapisItems.map((c) => ({ width: c.largeur, length: c.longueur })),
        moquetteItems: data.moquetteItems.map((c) => ({ width: c.largeur, length: c.longueur })),
        vitreItems: data.vitreItems.map((c) => ({ width: c.largeur, length: c.longueur })),
        photoUrls,
        viaWhatsApp: false,
      }
      
      const res = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      })

      const result = await res.json()

      if (!res.ok) {
        setErrorMessage(result.error || "Erreur lors de l'envoi. Veuillez reessayer ou utiliser WhatsApp.")
        return
      }

      setSubmitMethod("email")
      setIsSubmitted(true)
    } catch {
      setErrorMessage("Erreur de connexion. Veuillez reessayer ou utiliser WhatsApp.")
    } finally {
      setIsSubmitting(null)
    }
  }

  const handleWhatsAppSubmit = async () => {
    if (!isFormValid) return
    setIsSubmitting("whatsapp")
    setErrorMessage(null)

    try {
      // Upload photos first
      const photoUrls = await uploadPhotos()
      
      // Send email with photos in background
      await sendEmailWithPhotos(photoUrls, true)
      
      // Open WhatsApp
      const data = buildData()
      const message = buildWhatsAppMessage(data)
      const encoded = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/41762269434?text=${encoded}`
      window.open(whatsappUrl, "_blank")

      setSubmitMethod("whatsapp")
      setIsSubmitted(true)
    } catch {
      setErrorMessage("Erreur de connexion. Veuillez reessayer.")
    } finally {
      setIsSubmitting(null)
    }
  }

  // Photo reminder modal for WhatsApp
  if (showPhotoReminder) {
    return (
      <section id="devis" className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-card border-border">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-[#25D366]" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  N&apos;oubliez pas vos photos!
                </h3>
                <p className="text-muted-foreground">
                  Votre message WhatsApp est ouvert. Envoyez maintenant ces photos dans la conversation:
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {photos.map((photo, index) => (
                  <div key={photo.preview} className="aspect-square rounded-lg overflow-hidden border border-border">
                    <img
                      src={photo.preview}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  <strong>Comment faire:</strong> Dans WhatsApp, cliquez sur l&apos;icone 📎 (attacher) puis selectionnez &quot;Galerie&quot; ou &quot;Photos&quot; pour envoyer vos images.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => {
                    setShowPhotoReminder(false)
                    setIsSubmitted(true)
                  }}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  J&apos;ai envoye mes photos
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    const whatsappUrl = `https://wa.me/41762269434`
                    window.open(whatsappUrl, "_blank")
                  }}
                  className="flex-1 gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Rouvrir WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  if (isSubmitted) {
    return (
      <section id="devis" className="py-20 md:py-28 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-card border-border">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6">
                {submitMethod === "whatsapp" ? (
                  <MessageCircle className="h-10 w-10 text-secondary" />
                ) : (
                  <FileText className="h-10 w-10 text-secondary" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {submitMethod === "whatsapp" ? "Message WhatsApp envoyée!" : "Demande envoyée!"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {submitMethod === "whatsapp"
                  ? "Merci! Nous avons bien reçu votre demande et vous répondrons rapidement."
                  : "Merci pour votre demande de devis. Nous vous contacterons dans les plus brefs délais."}
              </p>
              <Button onClick={() => { setIsSubmitted(false); setSubmitMethod(null); setShowPhotoReminder(false) }} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Nouvelle demande
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  const hasCanapes = Object.values(canapes).some((v) => v > 0)
  const hasFauteuils = Object.values(fauteuils).some((v) => v > 0)
  const hasMattresses = Object.values(mattresses).some((v) => v > 0)
  const hasValidTapis = tapisItems.some((c) => c.largeur && c.longueur)
  const hasValidMoquettes = moquetteItems.some((c) => c.largeur && c.longueur)
  const hasValidVitres = vitreItems.some((c) => c.largeur && c.longueur)
  const hasCars = Object.values(cars).some((v) => v > 0)
  const hasValidChantier = chantierItems.some((c) => c.pieces && c.m2)
  const hasValidBail = bailItems.some((c) => c.pieces && c.m2)
  const hasValidTerrasse = terrasseItems.some((c) => c.m2)

  // Validation logic for each section
  const isCarsValid = !hasCars || (carService && carDirt)
  const isCanapesValid = !hasCanapes || canapeDirt
  const isFauteuilsValid = !hasFauteuils || fauteuilDirt
  const isTapisValid = !hasValidTapis || (tapisDirt && tapisPile && tapisItems.every(t => !t.largeur && !t.longueur || (t.largeur && t.longueur)))
  const isMoquetteValid = !hasValidMoquettes || (moquetteDirt && moquetteItems.every(m => !m.largeur && !m.longueur || (m.largeur && m.longueur)))
  const isVitreValid = !hasValidVitres || (vitreDirt && vitreItems.every(v => !v.largeur && !v.longueur || (v.largeur && v.longueur)))
  const isMattressesValid = !hasMattresses || mattressDirt
  const isChantierValid = !hasValidChantier || chantierItems.every(c => !c.pieces && !c.m2 || (c.pieces && c.m2))
  const isBailValid = !hasValidBail || bailItems.every(b => !b.pieces && !b.m2 || (b.pieces && b.m2))
  const isTerrasseValid = !hasValidTerrasse || (terrasseDirt && terrasseItems.every(t => !t.m2 || t.m2))

  const isFormValid = name && phone && email && address && 
    isCarsValid && isCanapesValid && isFauteuilsValid && 
    isTapisValid && isMoquetteValid && isVitreValid && isMattressesValid && 
    isChantierValid && isBailValid && isTerrasseValid

  return (
    <section id="devis" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block text-primary md:text-2xl lg:text-2xl font-semibold text-sm uppercase tracking-wider mb-4">
            Contactez-nous
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Demande de devis gratuit
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Remplissez le formulaire ci-dessous et recevez votre devis personnalisé sous 24h.
          </p>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto bg-card border-border">
          <CardContent className="p-6 md:p-10">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
              {/* 1. Contact info */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</span>
                    Vos coordonnées
                  </CardTitle>
                </CardHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Nom et prénom</Label>
                    <Input id="name" placeholder="Jean Dupont" required value={name} onChange={(e) => setName(e.target.value)} className="bg-background border-input text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Téléphone</Label>
                    <Input id="phone" type="tel" placeholder="+41 XX XXX XX XX" required value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-background border-input text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input id="email" type="email" placeholder="jean@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background border-input text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-foreground">Adresse</Label>
                    <Input id="address" placeholder="Rue, ville" required value={address} onChange={(e) => setAddress(e.target.value)} className="bg-background border-input text-foreground" />
                  </div>
                </div>
              </div>

              {/* 2. Cars */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</span>
                    Nettoyage interieurs auto
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(cars).map(([key, val]) => (
                      <QuantitySelector
                        key={key}
                        label={key}
                        value={val}
                        onChange={(v) => setCars((prev) => ({ ...prev, [key]: v }))}
                      />
                    ))}
                  </div>
                  {hasCars && (
                    <>
                      <CarServiceSelector value={carService} onChange={setCarService} />
                      <DirtLevelSelector value={carDirt} onChange={setCarDirt} />
                    </>
                  )}
                </div>
              </div>

              {/* 3. Canapes */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</span>
                    Nettoyage canapés
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(canapes).map(([key, val]) => (
                      <QuantitySelector
                        key={key}
                        label={key}
                        value={val}
                        onChange={(v) => setCanapes((prev) => ({ ...prev, [key]: v }))}
                      />
                    ))}
                  </div>
                  {hasCanapes && (
                    <>
                      <DirtLevelSelector value={canapeDirt} onChange={setCanapeDirt} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-foreground">Type de tissu</Label>
                          <Select value={canapeFabric} onValueChange={setCanapeFabric}>
                            <SelectTrigger className="bg-background border-input text-foreground">
                              <SelectValue placeholder="Selectionner..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tissu">Tissu</SelectItem>
                              <SelectItem value="cuir">Cuir</SelectItem>
                              <SelectItem value="alcantara">Alcantara</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(canapeOptions).map(([key, checked]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={`canape-opt-${key}`}
                              checked={checked}
                              onCheckedChange={(v) => setCanapeOptions((prev) => ({ ...prev, [key]: !!v }))}
                            />
                            <Label htmlFor={`canape-opt-${key}`} className="text-foreground text-sm cursor-pointer">{key}</Label>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 4. Fauteuils */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</span>
                    Nettoyage fauteuils
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(fauteuils).map(([key, val]) => (
                      <QuantitySelector
                        key={key}
                        label={key}
                        value={val}
                        onChange={(v) => setFauteuils((prev) => ({ ...prev, [key]: v }))}
                      />
                    ))}
                  </div>
                  {hasFauteuils && (
                    <>
                      <DirtLevelSelector value={fauteuilDirt} onChange={setFauteuilDirt} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-foreground">Type de tissu</Label>
                          <Select value={fauteuilFabric} onValueChange={setFauteuilFabric}>
                            <SelectTrigger className="bg-background border-input text-foreground">
                              <SelectValue placeholder="Selectionner..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tissu">Tissu</SelectItem>
                              <SelectItem value="cuir">Cuir</SelectItem>
                              <SelectItem value="alcantara">Alcantara</SelectItem>
                              <SelectItem value="autre">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 5. Tapis */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">5</span>
                    Nettoyage tapis
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Indiquez les dimensions de chaque tapis (en mètres).
                  </p>
                  <div className="space-y-3">
                    {tapisItems.map((item, index) => (
                      <div key={item.id} className="flex items-end gap-3 rounded-lg border border-input bg-background p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">Largeur (m)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="ex: 2.5"
                              value={item.largeur}
                              onChange={(e) => updateTapisItem(item.id, "largeur", e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">Longueur (m)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="ex: 3.0"
                              value={item.longueur}
                              onChange={(e) => updateTapisItem(item.id, "longueur", e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                        </div>
                        {tapisItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTapisItem(item.id)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                            aria-label="Supprimer ce tapis"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTapisItem}
                    disabled={tapisItems.length >= 10}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter un tapis
                  </Button>
                  {hasValidTapis && (
                    <>
                      <DirtLevelSelector value={tapisDirt} onChange={setTapisDirt} />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-foreground">Type de poil</Label>
                          <Select value={tapisPile} onValueChange={setTapisPile}>
                            <SelectTrigger className="bg-background border-input text-foreground">
                              <SelectValue placeholder="Selectionner..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="court">Court</SelectItem>
                              <SelectItem value="moyen">Moyen</SelectItem>
                              <SelectItem value="long">Long</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 6. Moquettes */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">6</span>
                    Nettoyage moquettes
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Indiquez les dimensions de chaque moquette (en mètres).
                  </p>
                  <div className="space-y-3">
                    {moquetteItems.map((item, index) => (
                      <div key={item.id} className="flex items-end gap-3 rounded-lg border border-input bg-background p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">Largeur (m)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="ex: 2.5"
                              value={item.largeur}
                              onChange={(e) => updateMoquetteItem(item.id, "largeur", e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">Longueur (m)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="ex: 3.0"
                              value={item.longueur}
                              onChange={(e) => updateMoquetteItem(item.id, "longueur", e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                        </div>
                        {moquetteItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMoquetteItem(item.id)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                            aria-label="Supprimer cette moquette"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMoquetteItem}
                    disabled={moquetteItems.length >= 10}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter une moquette
                  </Button>
                  {hasValidMoquettes && (
                    <DirtLevelSelector value={moquetteDirt} onChange={setMoquetteDirt} />
                  )}
                </div>
              </div>

              {/* 7. Mattresses */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">7</span>
                    Nettoyage matelas
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(mattresses).map(([key, val]) => (
                      <QuantitySelector
                        key={key}
                        label={key}
                        value={val}
                        onChange={(v) => setMattresses((prev) => ({ ...prev, [key]: v }))}
                      />
                    ))}
                  </div>
                  {hasMattresses && (
                    <DirtLevelSelector value={mattressDirt} onChange={setMattressDirt} />
                  )}
                </div>
              </div>

              {/* 8. Nettoyage de vitres */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">8</span>
                    Nettoyage de vitres
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Indiquez les dimensions de vitres (en mètres).
                  </p>
                  <div className="space-y-3">
                    {vitreItems.map((item, index) => (
                      <div key={item.id} className="flex items-end gap-3 rounded-lg border border-input bg-background p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">Largeur (m)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="ex: 2.5"
                              value={item.largeur}
                              onChange={(e) => updateVitreItem(item.id, "largeur", e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">Longueur (m)</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="ex: 3.0"
                              value={item.longueur}
                              onChange={(e) => updateVitreItem(item.id, "longueur", e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                        </div>
                        {vitreItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVitreItem(item.id)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                            aria-label="Supprimer cette vitre"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addVitreItem}
                    disabled={vitreItems.length >= 10}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter une vitre
                  </Button>
                  {hasValidVitres && (
                    <DirtLevelSelector value={vitreDirt} onChange={setVitreDirt} />
                  )}
                </div>
              </div>

              {/* 9. Nettoyage fin de chantier */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">9</span>
                    Nettoyage fin de chantier
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Indiquez le nombre de pièces et la surface en m².
                  </p>
                  <div className="space-y-3">
                    {chantierItems.map((item, index) => (
                      <div key={item.id} className="flex items-end gap-3 rounded-lg border border-input bg-background p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">N° de Pièces</Label>
                            <Input
                              type="number"
                              step="1"
                              min="0"
                              placeholder="ex: 3"
                              value={item.pieces}
                              onChange={(e) => updateChantierItem(item.id, "pieces", e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">m²</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="ex: 50"
                              value={item.m2}
                              onChange={(e) => updateChantierItem(item.id, "m2", e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                        </div>
                        {chantierItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeChantierItem(item.id)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                            aria-label="Supprimer cette zone"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addChantierItem}
                    disabled={chantierItems.length >= 10}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter une zone
                  </Button>
                </div>
              </div>

              {/* 10. Nettoyage fin de bail */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">10</span>
                    Nettoyage fin de bail
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Indiquez le nombre de pièces et la surface en m².
                  </p>
                  <div className="space-y-3">
                    {bailItems.map((item, index) => (
                      <div key={item.id} className="flex items-end gap-3 rounded-lg border border-input bg-background p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">N° de Pièces</Label>
                            <Input
                              type="number"
                              step="1"
                              min="0"
                              placeholder="ex: 3"
                              value={item.pieces}
                              onChange={(e) => updateBailItem(item.id, "pieces", e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">m²</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="ex: 50"
                              value={item.m2}
                              onChange={(e) => updateBailItem(item.id, "m2", e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                        </div>
                        {bailItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBailItem(item.id)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                            aria-label="Supprimer cette zone"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addBailItem}
                    disabled={bailItems.length >= 10}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter une zone
                  </Button>
                </div>
              </div>

              {/* 11. Nettoyage de terrasse */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">11</span>
                    Nettoyage de terrasse
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Indiquez la surface en m².
                  </p>
                  <div className="space-y-3">
                    {terrasseItems.map((item, index) => (
                      <div key={item.id} className="flex items-end gap-3 rounded-lg border border-input bg-background p-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <div className="space-y-1">
                            <Label className="text-foreground text-xs">m²</Label>
                            <Input
                              type="number"
                              step="0.1"
                              min="0"
                              placeholder="ex: 25"
                              value={item.m2}
                              onChange={(e) => updateTerrasseItem(item.id, e.target.value)}
                              className="bg-background border-input text-foreground"
                            />
                          </div>
                        </div>
                        {terrasseItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTerrasseItem(item.id)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-input text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                            aria-label="Supprimer cette terrasse"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTerrasseItem}
                    disabled={terrasseItems.length >= 10}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter une terrasse
                  </Button>
                  {hasValidTerrasse && (
                    <DirtLevelSelector value={terrasseDirt} onChange={setTerrasseDirt} />
                  )}
                </div>
              </div>

              {/* 12. Photos & comments */}
              <div>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">12</span>
                    Photos & Commentaires
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {photos.map((photo, index) => (
                        <div key={photo.preview} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                          <img
                            src={photo.preview}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Supprimer cette photo"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {photos.length < 5 && (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer bg-background hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Cliquez pour ajouter des photos ({photos.length}/5)
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Ajoutez jusqu&apos;a 5 photos pour nous aider a evaluer l&apos;état de vos articles.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="comments" className="text-foreground">Commentaires</Label>
                    <textarea
                      id="comments"
                      rows={3}
                      placeholder="Informations supplementaires..."
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </div>

              {/* Submit buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  type="button"
                  onClick={handleEmailSubmit}
                  disabled={!isFormValid || isSubmitting !== null}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-semibold gap-2"
                >
                  <Mail className="h-5 w-5" />
                  {isSubmitting === "email" ? "Envoi en cours..." : "Envoyer par Email"}
                </Button>
                <Button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  disabled={!isFormValid || isSubmitting !== null}
                  className="bg-[#25D366] text-white hover:bg-[#1da851] py-6 text-base font-semibold gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  {isSubmitting === "whatsapp" ? "Ouverture..." : "Envoyer par WhatsApp"}
                </Button>
              </div>

              {errorMessage && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
                  <p className="text-sm text-destructive font-medium">{errorMessage}</p>
                </div>
              )}

              {!isFormValid && (
                <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4 text-center">
                  <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
                    Veuillez remplir tous les champs obligatoires: coordonnées complètes et options requises pour chaque service seléctionné.
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
