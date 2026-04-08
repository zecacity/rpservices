import { NextResponse } from "next/server"

interface QuoteData {
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
  tapisItems: Array<{ width: string; length: string }>
  tapisPile: string
  tapisDirt: string
  moquetteItems: Array<{ width: string; length: string }>
  moquetteDirt: string
  cars: Record<string, number>
  carDirt: string
  carService: string
  comments: string
  photoUrls?: string[]
  viaWhatsApp?: boolean
}

function buildHtmlEmail(data: QuoteData) {
  const sections: string[] = []

  // Cars
  const carEntries = Object.entries(data.cars).filter(([, qty]) => qty > 0)
  if (carEntries.length > 0) {
    let html = '<tr><td style="padding:12px 16px;background:#f0f9ff;font-weight:600;color:#1a73e8;border-bottom:1px solid #e5e7eb;">Interieurs Auto</td></tr>'
    for (const [type, qty] of carEntries) {
      html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">${type}: <strong>${qty}</strong></td></tr>`
    }
    if (data.carDirt) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Sujidade: <strong>${data.carDirt}</strong></td></tr>`
    if (data.carService) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Sevice: <strong>${data.carService}</strong></td></tr>`
    sections.push(html)
  }

  // Canapes
  const canapeEntries = Object.entries(data.canapes).filter(([, qty]) => qty > 0)
  if (canapeEntries.length > 0) {
    let html = '<tr><td style="padding:12px 16px;background:#f0f9ff;font-weight:600;color:#1a73e8;border-bottom:1px solid #e5e7eb;">Canapes</td></tr>'
    for (const [type, qty] of canapeEntries) {
      html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">${type}: <strong>${qty}</strong></td></tr>`
    }
    if (data.canapeDirt) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Sujidade: <strong>${data.canapeDirt}</strong></td></tr>`
    if (data.canapeFabric) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Tissu: <strong>${data.canapeFabric}</strong></td></tr>`
    const opts = Object.entries(data.canapeOptions || {}).filter(([, v]) => v).map(([k]) => k)
    if (opts.length > 0) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Options: <strong>${opts.join(", ")}</strong></td></tr>`
    sections.push(html)
  }

  // Fauteuils
  const fauteuilEntries = Object.entries(data.fauteuils).filter(([, qty]) => qty > 0)
  if (fauteuilEntries.length > 0) {
    let html = '<tr><td style="padding:12px 16px;background:#f0f9ff;font-weight:600;color:#1a73e8;border-bottom:1px solid #e5e7eb;">Fauteuils</td></tr>'
    for (const [type, qty] of fauteuilEntries) {
      html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">${type}: <strong>${qty}</strong></td></tr>`
    }
    if (data.fauteuilDirt) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Sujidade: <strong>${data.fauteuilDirt}</strong></td></tr>`
    if (data.fauteuilFabric) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Tissu: <strong>${data.fauteuilFabric}</strong></td></tr>`
    sections.push(html)
  }

  // Tapis
  const tapisItems = data.tapisItems || []
  const validTapis = tapisItems.filter((c: { width: string; length: string }) => c.width && c.length)
  if (validTapis.length > 0) {
    let html = '<tr><td style="padding:12px 16px;background:#f0f9ff;font-weight:600;color:#1a73e8;border-bottom:1px solid #e5e7eb;">Tapis</td></tr>'
    validTapis.forEach((carpet: { width: string; length: string }, index: number) => {
      html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Tapis ${index + 1}: <strong>${carpet.width}m x ${carpet.length}m</strong></td></tr>`
    })
    if (data.tapisPile) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Type de poil: <strong>${data.tapisPile}</strong></td></tr>`
    if (data.tapisDirt) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Sujidade: <strong>${data.tapisDirt}</strong></td></tr>`
    sections.push(html)
  }

  // Moquettes
  const moquetteItems = data.moquetteItems || []
  const validMoquettes = moquetteItems.filter((c: { width: string; length: string }) => c.width && c.length)
  if (validMoquettes.length > 0) {
    let html = '<tr><td style="padding:12px 16px;background:#f0f9ff;font-weight:600;color:#1a73e8;border-bottom:1px solid #e5e7eb;">Moquettes</td></tr>'
    validMoquettes.forEach((moquette: { width: string; length: string }, index: number) => {
      html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Moquette ${index + 1}: <strong>${moquette.width}m x ${moquette.length}m</strong></td></tr>`
    })
    if (data.moquetteDirt) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Sujidade: <strong>${data.moquetteDirt}</strong></td></tr>`
    sections.push(html)
  }

  // Mattresses
  const mattressEntries = Object.entries(data.mattresses).filter(([, qty]) => qty > 0)
  if (mattressEntries.length > 0) {
    let html = '<tr><td style="padding:12px 16px;background:#f0f9ff;font-weight:600;color:#1a73e8;border-bottom:1px solid #e5e7eb;">Matelas</td></tr>'
    for (const [type, qty] of mattressEntries) {
      html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">${type}: <strong>${qty}</strong></td></tr>`
    }
    if (data.mattressDirt) html += `<tr><td style="padding:8px 16px 8px 32px;border-bottom:1px solid #f3f4f6;">Sujidade: <strong>${data.mattressDirt}</strong></td></tr>`
    sections.push(html)
  }

  // Photos section
  let photosHtml = ""
  if (data.photoUrls && data.photoUrls.length > 0) {
    photosHtml = `
      <div style="margin-bottom:24px;">
        <p style="font-weight:600;color:#374151;margin-bottom:12px;">Photos jointes (${data.photoUrls.length}):</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${data.photoUrls.map((url: string, i: number) => `<a href="${url}" target="_blank" style="display:inline-block;"><img src="${url}" alt="Photo ${i + 1}" style="width:120px;height:120px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb;" /></a>`).join("")}
        </div>
      </div>
    `
  }

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#0a0a0a;padding:24px;text-align:center;">
        <h1 style="color:#1a73e8;margin:0;font-size:24px;">RP Services</h1>
        <p style="color:#999;margin:4px 0 0;font-size:14px;">Nouvelle demande de devis</p>
      </div>
      <div style="padding:24px;background:#ffffff;">
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
          <tr><td style="padding:12px 16px;background:#1a73e8;color:#ffffff;font-weight:600;border-bottom:1px solid #e5e7eb;" colspan="2">Coordonnées du client</td></tr>
          <tr><td style="padding:8px 16px;border-bottom:1px solid #f3f4f6;color:#666;width:120px;">Nom</td><td style="padding:8px 16px;border-bottom:1px solid #f3f4f6;font-weight:500;">${data.name}</td></tr>
          <tr><td style="padding:8px 16px;border-bottom:1px solid #f3f4f6;color:#666;">Telephone</td><td style="padding:8px 16px;border-bottom:1px solid #f3f4f6;font-weight:500;">${data.phone}</td></tr>
          <tr><td style="padding:8px 16px;border-bottom:1px solid #f3f4f6;color:#666;">Email</td><td style="padding:8px 16px;border-bottom:1px solid #f3f4f6;font-weight:500;"><a href="mailto:${data.email}" style="color:#1a73e8;">${data.email}</a></td></tr>
          <tr><td style="padding:8px 16px;border-bottom:1px solid #f3f4f6;color:#666;">Adresse</td><td style="padding:8px 16px;border-bottom:1px solid #f3f4f6;font-weight:500;">${data.address}</td></tr>
        </table>
        ${sections.length > 0 ? `<table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${sections.join("")}</table>` : ""}
        ${photosHtml}
        ${data.comments ? `<div style="background:#f9fafb;border-radius:8px;padding:16px;margin-bottom:24px;"><p style="margin:0 0 4px;font-weight:600;color:#374151;">Commentaires:</p><p style="margin:0;color:#6b7280;">${data.comments}</p></div>` : ""}
        ${data.viaWhatsApp ? '<div style="background:#dcfce7;border-radius:8px;padding:12px;margin-bottom:24px;border:1px solid #86efac;"><p style="margin:0;color:#166534;font-size:14px;">Ce client a egalement envoye une demande via WhatsApp.</p></div>' : ""}
      </div>
      <div style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#9ca3af;">
        Email envoye automatiquement depuis le site RP Services
      </div>
    </div>
  `
}

function buildPlainText(data: QuoteData) {
  const lines: string[] = []
  lines.push("=== NOUVELLE DEMANDE DE DEVIS ===")
  if (data.viaWhatsApp) lines.push("(Egalement envoye via WhatsApp)")
  lines.push("")
  lines.push("--- Coordonnées du client ---")
  lines.push(`Nom: ${data.name}`)
  lines.push(`Telephone: ${data.phone}`)
  lines.push(`Email: ${data.email}`)
  lines.push(`Adresse: ${data.address}`)
  lines.push("")

  const carEntries = Object.entries(data.cars).filter(([, qty]) => qty > 0)
  if (carEntries.length > 0) {
    lines.push("--- Interieurs Auto ---")
    for (const [type, qty] of carEntries) lines.push(`  ${type}: ${qty}`)
    if (data.carDirt) lines.push(`  Sujidade: ${data.carDirt}`)
    if (data.carService) lines.push(`  Sujidade: ${data.carService}`)
    lines.push("")
  }

  const canapeEntries = Object.entries(data.canapes).filter(([, qty]) => qty > 0)
  if (canapeEntries.length > 0) {
    lines.push("--- Canapes ---")
    for (const [type, qty] of canapeEntries) lines.push(`  ${type}: ${qty}`)
    if (data.canapeDirt) lines.push(`  Sujidade: ${data.canapeDirt}`)
    if (data.canapeFabric) lines.push(`  Tissu: ${data.canapeFabric}`)
    const opts = Object.entries(data.canapeOptions || {}).filter(([, v]) => v).map(([k]) => k)
    if (opts.length > 0) lines.push(`  Options: ${opts.join(", ")}`)
    lines.push("")
  }

  const fauteuilEntries = Object.entries(data.fauteuils).filter(([, qty]) => qty > 0)
  if (fauteuilEntries.length > 0) {
    lines.push("--- Fauteuils ---")
    for (const [type, qty] of fauteuilEntries) lines.push(`  ${type}: ${qty}`)
    if (data.fauteuilDirt) lines.push(`  Sujidade: ${data.fauteuilDirt}`)
    if (data.fauteuilFabric) lines.push(`  Tissu: ${data.fauteuilFabric}`)
    lines.push("")
  }

  const tapisItems = data.tapisItems || []
  const validTapis = tapisItems.filter((c) => c.width && c.length)
  if (validTapis.length > 0) {
    lines.push("--- Tapis ---")
    validTapis.forEach((carpet, index) => {
      lines.push(`  Tapis ${index + 1}: ${carpet.width}m x ${carpet.length}m`)
    })
    if (data.tapisPile) lines.push(`  Type de poil: ${data.tapisPile}`)
    if (data.tapisDirt) lines.push(`  Sujidade: ${data.tapisDirt}`)
    lines.push("")
  }

  const moquetteItems = data.moquetteItems || []
  const validMoquettes = moquetteItems.filter((c) => c.width && c.length)
  if (validMoquettes.length > 0) {
    lines.push("--- Moquettes ---")
    validMoquettes.forEach((moquette, index) => {
      lines.push(`  Moquette ${index + 1}: ${moquette.width}m x ${moquette.length}m`)
    })
    if (data.moquetteDirt) lines.push(`  Sujidade: ${data.moquetteDirt}`)
    lines.push("")
  }

  const mattressEntries = Object.entries(data.mattresses).filter(([, qty]) => qty > 0)
  if (mattressEntries.length > 0) {
    lines.push("--- Matelas ---")
    for (const [type, qty] of mattressEntries) lines.push(`  ${type}: ${qty}`)
    if (data.mattressDirt) lines.push(`  Sujidade: ${data.mattressDirt}`)
    lines.push("")
  }

  if (data.photoUrls && data.photoUrls.length > 0) {
    lines.push("--- Photos ---")
    data.photoUrls.forEach((url, i) => lines.push(`  Photo ${i + 1}: ${url}`))
    lines.push("")
  }

  if (data.comments) {
    lines.push("--- Commentaires ---")
    lines.push(data.comments)
    lines.push("")
  }

  return lines.join("\n")
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const resendApiKey = "re_7WEd7neS_6ygPjQDHYxj13p8gD9Vqsr5a"
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY non configuree. Veuillez configurer la variable d'environnement." },
        { status: 500 }
      )
    }

    const htmlBody = buildHtmlEmail(data)
    const textBody = buildPlainText(data)

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "RP Services <onboarding@resend.dev>",
        to: [process.env.QUOTE_RECIPIENT_EMAIL || "rservicesp@outlook.com"],
        reply_to: data.email,
        subject: `Nouvelle demande de devis - ${data.name}`,
        html: htmlBody,
        text: textBody,
      }),
    })

    if (!res.ok) {
      const errorData = await res.text()
      console.error("Resend API error:", res.status, errorData)
      
      // Parse error for better user feedback
      let errorMessage = `Erreur lors de l'envoi de l'email (${res.status}).`
      try {
        const parsed = JSON.parse(errorData)
        if (parsed.message) {
          errorMessage = parsed.message
        }
      } catch {
        // Keep default message
      }
      
      return NextResponse.json(
        { error: errorMessage, details: errorData },
        { status: 500 }
      )
    }

    const result = await res.json()
    return NextResponse.json({ success: true, emailId: result.id })
  } catch (error) {
    console.error("Error processing quote request:", error)
    return NextResponse.json(
      { error: "Erreur lors du traitement de la demande" },
      { status: 500 }
    )
  }
}
