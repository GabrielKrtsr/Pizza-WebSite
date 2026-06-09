import PageTransition from "@/components/PageTransition";
import PizzaScroll from "@/components/PizzaScroll";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";
import { pizzaFrames } from "@/assets/pizza/frames";

const pillars = [
  {
    title: "Pâte vivante",
    text: "Maturée 48 heures sur levain naturel, légère et digeste.",
    icon: "M4 14c2-3 6-3 8 0s6 3 8 0M4 18c2-3 6-3 8 0s6 3 8 0",
  },
  {
    title: "Four à bois",
    text: "Cuisson 90 secondes à 480°C, la signature napolitaine.",
    icon: "M12 3c2 3 0 5 0 5s4 1 4 6a4 4 0 0 1-8 0c0-2 1-3 1-3",
  },
  {
    title: "Produits DOP",
    text: "San Marzano, fior di latte et bufala importés de Campanie.",
    icon: "M12 21s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 12c0 4.6-7 9-7 9z",
  },
];

const steps = [
  { n: "01", t: "Le levain", d: "Cultivé chaque jour, il donne à la pâte son parfum et sa légèreté." },
  { n: "02", t: "La main", d: "Chaque disque est étiré à la main, jamais au rouleau." },
  { n: "03", t: "Le feu", d: "Le four à bois saisit la pâte et fait gonfler la corniche." },
];

export default function Home() {
  return (
    <PageTransition>
      {/* HERO — scroll-driven pizza lift */}
      <PizzaScroll />

      {/* PILLARS */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <SectionTitle
          eyebrow="Notre artisanat"
          title="Trois obsessions, une seule pizza"
          subtitle="Tout part de la matière. Nous ne transigeons ni sur le temps, ni sur la flamme, ni sur l'origine."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <GlassCard className="h-full p-8">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-terracotta-500/30 to-ember-500/20 text-gold-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d={p.icon}
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="mt-6 font-serif text-2xl text-cream">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">{p.text}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SIGNATURE / SHOWCASE */}
      <section className="container-px mx-auto max-w-7xl py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="pizza-mask overflow-hidden rounded-3xl">
                <img
                  src={pizzaFrames[Math.floor(pizzaFrames.length * 0.78)]}
                  alt="Part de pizza au fromage filant"
                  className="aspect-square w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-radial-glow blur-2xl" />
            </div>
          </Reveal>

          <div>
            <SectionTitle
              align="left"
              eyebrow="La signature"
              title="La Margherita, notre serment"
              subtitle="San Marzano DOP, fior di latte, basilic, un filet d'huile d'olive. La pizza qui ne ment jamais : si elle est parfaite, tout le reste l'est aussi."
            />
            <div className="mt-10 space-y-5">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.08}>
                  <div className="flex gap-5">
                    <span className="font-serif text-2xl text-gold-400/70">{s.n}</span>
                    <div>
                      <h4 className="font-medium text-cream">{s.t}</h4>
                      <p className="mt-1 text-sm text-cream/55">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-10">
              <Button to="/a-propos" variant="outline">
                Notre histoire
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-7xl py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] glass-strong px-8 py-16 text-center shadow-card sm:px-16">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-radial-glow opacity-70" />
            <h2 className="font-serif text-3xl text-cream sm:text-4xl md:text-5xl">
              Une table vous attend ce soir
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-cream/60">
              Salle intimiste, comptoir face au four. Réservez en quelques secondes.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Button to="/reservation" size="lg">
                Réserver maintenant
              </Button>
              <Button href={site.phoneHref} variant="ghost" size="lg">
                {site.phone}
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
