import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-gold-400/60 focus:bg-white/[0.05]";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Indiquez votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Adresse e-mail invalide.";
    if (form.message.trim().length < 10)
      next.message = "Votre message est un peu court (10 caractères min.).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) setSent(true);
  };

  return (
    <PageTransition>
      <section className="container-px mx-auto max-w-7xl pt-36 pb-16">
        <SectionTitle
          eyebrow="Contact"
          title="Parlons-en"
          subtitle="Une question, une privatisation, un mot doux sur votre dernière Margherita ? Écrivez-nous."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <div className="rounded-3xl glass p-8 shadow-card sm:p-10">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-basil-400/30 to-basil-500/20 text-basil-400">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <h3 className="font-serif text-2xl text-cream">Message envoyé</h3>
                    <p className="max-w-sm text-sm text-cream/60">
                      Merci {form.name.split(" ")[0]} ! Nous revenons vers vous très vite,
                      généralement sous 24 heures.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ name: "", email: "", message: "" });
                      }}
                      className="mt-2 text-xs uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-cream/70"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    <div>
                      <label className="mb-2 block text-sm text-cream/70" htmlFor="name">
                        Nom
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={update("name")}
                        placeholder="Votre nom"
                        className={fieldClass}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-ember-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-cream/70" htmlFor="email">
                        E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        placeholder="vous@email.com"
                        className={fieldClass}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-ember-400">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-cream/70" htmlFor="message">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Dites-nous tout…"
                        className={`${fieldClass} resize-none`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-ember-400">{errors.message}</p>
                      )}
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Envoyer le message
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-3xl glass p-8">
                <h3 className="font-serif text-xl text-cream">Coordonnées</h3>
                <div className="mt-5 space-y-4 text-sm text-cream/65">
                  <p className="flex flex-col">
                    <span className="text-cream/40">Adresse</span>
                    {site.address.street}, {site.address.zip} {site.address.city}
                  </p>
                  <p className="flex flex-col">
                    <span className="text-cream/40">Téléphone</span>
                    <a href={site.phoneHref} className="transition-colors hover:text-gold-300">
                      {site.phone}
                    </a>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-cream/40">E-mail</span>
                    <a href={site.emailHref} className="transition-colors hover:text-gold-300">
                      {site.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="rounded-3xl glass p-8">
                <h3 className="font-serif text-xl text-cream">Horaires</h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex flex-col">
                      <span className="text-cream/80">{h.days}</span>
                      <span className="text-cream/45">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-3xl glass">
                <div className="absolute inset-0 bg-gradient-to-br from-ink-800 to-ink-900" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(232,190,110,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(232,190,110,0.12) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative flex h-full min-h-[140px] flex-col items-center justify-center gap-2 p-6 text-center">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ember-500/20 text-ember-400">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21s-7-4.4-7-9a7 7 0 0 1 14 0c0 4.6-7 9-7 9z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </span>
                  <span className="text-sm text-cream/70">
                    {site.address.street}, {site.address.city}
                  </span>
                  <span className="text-xs text-cream/40">
                    Quartier Saint-Vincent · Métro Hôtel de Ville
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
