import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

interface Form {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}
interface Errors {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-gold-400/60 focus:bg-white/[0.05] [color-scheme:dark]";

const times = [
  "12:00", "12:30", "13:00", "13:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
];

const today = new Date().toISOString().split("T")[0];

export default function Reservation() {
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const setField = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Indiquez votre nom.";
    if (!/^[+\d][\d\s.-]{7,}$/.test(form.phone.trim()))
      next.phone = "Numéro de téléphone invalide.";
    if (!form.date) next.date = "Choisissez une date.";
    else if (form.date < today) next.date = "La date doit être à venir.";
    if (!form.time) next.time = "Choisissez un horaire.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) setDone(true);
  };

  const formattedDate = form.date
    ? new Date(form.date + "T00:00:00").toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  return (
    <PageTransition>
      <section className="container-px mx-auto max-w-5xl pt-36 pb-24">
        <SectionTitle
          eyebrow="Réservation"
          title="Réservez votre table"
          subtitle="Salle de 30 couverts, ambiance feutrée et comptoir face au four. Confirmation immédiate."
        />

        <div className="mx-auto mt-16 max-w-3xl">
          <Reveal>
            <div className="rounded-3xl glass p-8 shadow-card sm:p-10">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-5 py-10 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }}
                      className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-gold-300/30 to-ember-500/20 text-gold-300 shadow-glow"
                    >
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                    <h3 className="font-serif text-3xl text-cream">C'est réservé !</h3>
                    <div className="rounded-2xl bg-white/[0.04] px-6 py-5 text-left">
                      <p className="text-sm text-cream/70">
                        <span className="text-cream/40">Au nom de</span> {form.name}
                      </p>
                      <p className="mt-1 text-sm text-cream/70">
                        <span className="text-cream/40">Le</span> {formattedDate}{" "}
                        <span className="text-cream/40">à</span> {form.time}
                      </p>
                      <p className="mt-1 text-sm text-cream/70">
                        <span className="text-cream/40">Pour</span> {form.guests}{" "}
                        {form.guests > 1 ? "personnes" : "personne"}
                      </p>
                    </div>
                    <p className="max-w-sm text-sm text-cream/55">
                      Un SMS de confirmation vous sera envoyé au {form.phone}. À très vite chez{" "}
                      {site.name} !
                    </p>
                    <button
                      onClick={() => {
                        setDone(false);
                        setForm({ name: "", phone: "", date: "", time: "", guests: 2 });
                      }}
                      className="text-xs uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-cream/70"
                    >
                      Nouvelle réservation
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    {/* Guests stepper */}
                    <div>
                      <label className="mb-3 block text-sm text-cream/70">
                        Nombre de personnes
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setField("guests", n)}
                            className={`h-11 w-11 rounded-xl text-sm font-medium transition-all no-tap-highlight ${
                              form.guests === n
                                ? "bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950 shadow-glow"
                                : "border border-white/10 bg-white/[0.03] text-cream/70 hover:border-gold-400/40"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-cream/40">
                        Plus de 8 convives ? Appelez-nous au{" "}
                        <a href={site.phoneHref} className="text-gold-300">
                          {site.phone}
                        </a>
                        .
                      </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm text-cream/70" htmlFor="date">
                          Date
                        </label>
                        <input
                          id="date"
                          type="date"
                          min={today}
                          value={form.date}
                          onChange={(e) => setField("date", e.target.value)}
                          className={fieldClass}
                        />
                        {errors.date && (
                          <p className="mt-1.5 text-xs text-ember-400">{errors.date}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-cream/70" htmlFor="time">
                          Horaire
                        </label>
                        <select
                          id="time"
                          value={form.time}
                          onChange={(e) => setField("time", e.target.value)}
                          className={fieldClass}
                        >
                          <option value="" disabled className="bg-ink-800">
                            Choisir…
                          </option>
                          {times.map((t) => (
                            <option key={t} value={t} className="bg-ink-800">
                              {t}
                            </option>
                          ))}
                        </select>
                        {errors.time && (
                          <p className="mt-1.5 text-xs text-ember-400">{errors.time}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm text-cream/70" htmlFor="rname">
                          Nom
                        </label>
                        <input
                          id="rname"
                          type="text"
                          value={form.name}
                          onChange={(e) => setField("name", e.target.value)}
                          placeholder="Votre nom"
                          className={fieldClass}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-ember-400">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="mb-2 block text-sm text-cream/70" htmlFor="phone">
                          Téléphone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setField("phone", e.target.value)}
                          placeholder="06 12 34 56 78"
                          className={fieldClass}
                        />
                        {errors.phone && (
                          <p className="mt-1.5 text-xs text-ember-400">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Confirmer ma réservation
                    </Button>
                    <p className="text-center text-xs text-cream/40">
                      Réservation sans engagement · annulation gratuite jusqu'à 2h avant.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
