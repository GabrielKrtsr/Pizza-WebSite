import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { menu, categories, categoryBlurb, type PizzaCategory } from "@/data/menu";

type Filter = "Tout" | PizzaCategory;
const filters: Filter[] = ["Tout", ...categories];

function priceLabel(p: number) {
  return `${p},00 €`;
}

export default function Menu() {
  const [filter, setFilter] = useState<Filter>("Tout");
  const visible =
    filter === "Tout" ? menu : menu.filter((p) => p.category === filter);

  return (
    <PageTransition>
      <section className="container-px mx-auto max-w-7xl pt-36 pb-12">
        <SectionTitle
          eyebrow="La carte"
          title="Nos pizzas"
          subtitle="Dix recettes au feu de bois, composées chaque jour avec des produits d'exception. Pâte maturée 48 heures."
        />

        {/* Filters */}
        <div className="mt-12 flex flex-wrap justify-center gap-2.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-5 py-2 text-sm transition-colors no-tap-highlight ${
                filter === f ? "text-ink-950" : "text-cream/65 hover:text-cream"
              }`}
            >
              {filter === f && (
                <motion.span
                  layoutId="menu-filter"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-300 to-gold-500"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative font-medium">{f}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-24">
        {filter !== "Tout" && (
          <p className="mb-8 text-center text-sm italic text-cream/50">
            {categoryBlurb[filter]}
          </p>
        )}

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((pizza, i) => (
              <motion.article
                key={pizza.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl glass p-7 shadow-card"
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-gold-400/15 via-transparent to-terracotta-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-2xl text-cream">{pizza.name}</h3>
                      {pizza.signature && (
                        <span className="rounded-full border border-gold-400/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-gold-300">
                          Signature
                        </span>
                      )}
                    </div>
                    <span className="mt-1 inline-block text-[11px] uppercase tracking-[0.22em] text-cream/40">
                      {pizza.category}
                    </span>
                  </div>
                  <span className="shrink-0 font-serif text-xl text-gold-300">
                    {priceLabel(pizza.price)}
                  </span>
                </div>

                <div className="hairline my-5" />

                <p className="relative text-sm leading-relaxed text-cream/60">
                  {pizza.ingredients.join(" · ")}
                </p>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-7xl pb-12">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-[2rem] glass-strong px-8 py-14 text-center shadow-card">
            <h2 className="font-serif text-3xl text-cream sm:text-4xl">
              Envie de goûter ?
            </h2>
            <p className="max-w-md text-cream/60">
              Réservez votre table ou contactez-nous pour une commande à emporter.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button to="/reservation" size="lg">
                Réserver une table
              </Button>
              <Button to="/contact" variant="outline" size="lg">
                Nous contacter
              </Button>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
