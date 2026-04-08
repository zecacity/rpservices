import { Card, CardContent } from "@/components/ui/card"
import { Sofa, BedDouble, LayoutGrid, Car } from "lucide-react"

const services = [
  {
    icon: Sofa,
    title: "Canapés & Fauteuils",
    description: "Nettoyage en profondeur pour tous types de tissus, cuir et alcantara. Élimination des taches et des odeurs.",
  },
  {
    icon: BedDouble,
    title: "Matelas",
    description: "Hygiénisation complète, élimination des acariens et allergènes pour un sommeil sain.",
  },
  {
    icon: LayoutGrid,
    title: "Tapis & Moquettes",
    description: "Nettoyage adapté à tous types de fibres, du poil court au poil long.",
  },
  {
    icon: Car,
    title: "Intérieurs Auto",
    description: "Service complet pour votre véhicule: sièges, tapis, plafond et tableau de bord.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block md:text-2xl lg:text-2xl text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Nos Services
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            Nous intervenons à domicile dans 
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
            toute la Suisse romande.
          </h2>

          {/*<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nous intervenons à domicile dans toute la Suisse romande.
          </p>*/}
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="group bg-card border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <service.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
