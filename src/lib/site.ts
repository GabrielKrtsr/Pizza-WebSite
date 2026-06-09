// Central place for the restaurant's identity & contact details.
// Demo data — edit these values to match the real venue.

export const site = {
  name: "Forno Vivo",
  tagline: "Pizzeria napoletana",
  baseline: "Le feu vivant de Naples, au cœur de la ville.",
  description:
    "Pâte maturée 48 heures, four à bois à 480°C, mozzarella di bufala et produits sélectionnés en Campanie. L'artisanat napolitain dans son expression la plus pure.",
  address: {
    street: "18 rue des Lavandières",
    zip: "69001",
    city: "Lyon",
    country: "France",
  },
  phone: "+33 4 78 92 14 60",
  phoneHref: "tel:+33478921460",
  email: "bonjour@fornovivo.fr",
  emailHref: "mailto:bonjour@fornovivo.fr",
  hours: [
    { days: "Mardi — Jeudi", time: "12h00 – 14h30 · 19h00 – 22h30" },
    { days: "Vendredi — Samedi", time: "12h00 – 14h30 · 19h00 – 23h30" },
    { days: "Dimanche", time: "19h00 – 22h30" },
    { days: "Lundi", time: "Fermé" },
  ],
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "TripAdvisor", href: "https://tripadvisor.com" },
  ],
  foundedYear: 2014,
} as const;

export const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/menu", label: "Carte" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
  { to: "/reservation", label: "Réserver" },
] as const;
