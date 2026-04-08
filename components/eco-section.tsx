import { Leaf, Recycle, Home, Heart } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Produits 100% Vegan",
    description: "Formules naturelles sans cruauté animale",
  },
  {
    icon: Recycle,
    title: "Respectueux de l'environnement",
    description: "Biodégradables et sans substances nocives",
  },
  {
    icon: Home,
    title: "Service à domicile",
    description: "Nous venons chez vous dans tout le Canton de Vaud",
  },
  {
    icon: Heart,
    title: "Sécurité garantie",
    description: "Sans danger pour enfants et animaux",
  },
]

export function EcoSection() {
  return (
    <section id="eco" className="py-20 md:py-28 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="inline-block text-secondary md:text-2xl lg:text-2xl font-semibold text-sm uppercase tracking-wider mb-4">
              Engagement écologique
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-foreground mb-6 text-balance">
              Eco-friendly & à domicile
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Notre engagement pour un nettoyage efficace et respectueux de votre santé et de la planète.
            </p>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center mx-auto mb-5">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust badge */}
          <div className="mt-16 bg-card rounded-2xl p-8 border border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Notre promesse</h4>
                  <p className="text-muted-foreground text-sm">Un nettoyage professionnel, sain et écologique</p>
                </div>
              </div>
              <div className="flex gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Vegan</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">100%</div>
                  <div className="text-sm text-muted-foreground">Écologique</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
