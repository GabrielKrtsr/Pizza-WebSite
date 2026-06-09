import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";
import { pizzaFrames } from "@/assets/pizza/frames";

const timeline = [
  {
    year: "2014",
    title: "Le premier feu",
    text: "Gennaro quitte le Vomero, à Naples, et allume son four à Lyon. Quinze couverts, une seule pizza à la carte.",
  },
  {
    year: "2017",
    title: "La reconnaissance",
    text: "La Margherita entre au guide des meilleures pizzerias de France. La file s'allonge sur le trottoir.",
  },
  {
    year: "2020",
    title: "Le levain maison",
    text: "Naissance de notre levain naturel, nourri chaque matin. La pâte gagne en légèreté et en parfum.",
  },
  {
    year: "Aujourd'hui",
    title: "La même flamme",
    text: "Mêmes gestes, mêmes producteurs, même obsession. Rien n'a changé, et c'est tout l'enjeu.",
  },
];

const values = [
  { t: "Saisonnalité", d: "La carte respire au rythme des arrivages de Campanie." },
  { t: "Zéro compromis", d: "Si le produit n'est pas parfait, la pizza ne sort pas." },
  { t: "Hospitalité", d: "Ici, on accueille comme à la maison — bruyamment et généreusement." },
];

export default function About() {
  return (
    <PageTransition>
      {/* Intro */}
      <section className="container-px mx-auto max-w-7xl pt-36 pb-16">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionTitle
              align="left"
              eyebrow="Notre histoire"
              title={
                <>
                  Une vie passée
                  <br />
                  devant le four
                </>
              }
              subtitle={`${site.name} n'est pas un concept. C'est l'histoire d'un homme, d'un feu, et d'une obsession transmise depuis Naples.`}
            />
            <div className="mt-9">
              <Button to="/reservation">Venez nous rencontrer</Button>
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="pizza-mask overflow-hidden rounded-3xl">
                <img
                  src={pizzaFrames[0]}
                  alt="Pizza margherita napolitaine entière"
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-radial-glow blur-2xl" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="container-px mx-auto max-w-5xl py-16">
        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-gold-400/50 via-white/10 to-transparent md:left-1/2" />
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.05}>
                <div
                  className={`relative flex flex-col gap-3 pl-10 md:w-1/2 md:pl-0 ${
                    i % 2 === 0
                      ? "md:pr-12 md:text-right"
                      : "md:ml-auto md:pl-12"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-gold-400 bg-ink-900 md:left-auto ${
                      i % 2 === 0
                        ? "md:-right-2"
                        : "md:-left-2"
                    }`}
                  />
                  <span className="font-serif text-xl text-gold-300">{item.year}</span>
                  <h3 className="font-serif text-2xl text-cream">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-cream/60">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-px mx-auto max-w-7xl py-16">
        <SectionTitle eyebrow="Nos valeurs" title="Ce qui ne se négocie pas" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.1}>
              <GlassCard className="h-full p-8">
                <span className="font-serif text-3xl text-gold-400/60">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-serif text-2xl text-cream">{v.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">{v.d}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="container-px mx-auto max-w-4xl py-20 text-center">
        <Reveal>
          <p className="font-serif text-2xl italic leading-relaxed text-cream/80 sm:text-3xl">
            « Une bonne pizza, c'est trois ingrédients et trente ans de patience. »
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold-300/80">
            Gennaro — Fondateur &amp; pizzaiolo
          </p>
        </Reveal>
      </section>
    </PageTransition>
  );
}
