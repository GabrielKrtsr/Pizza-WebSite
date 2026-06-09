export type PizzaCategory = "Classiques" | "Spécialités" | "Végétariennes";

export interface Pizza {
  name: string;
  price: number;
  ingredients: string[];
  category: PizzaCategory;
  signature?: boolean;
}

export const menu: Pizza[] = [
  {
    name: "Margherita",
    price: 12,
    category: "Classiques",
    ingredients: [
      "San Marzano DOP",
      "fior di latte",
      "basilic frais",
      "huile d'olive extra vierge",
    ],
    signature: true,
  },
  {
    name: "Marinara",
    price: 10,
    category: "Classiques",
    ingredients: ["San Marzano DOP", "ail", "origan", "huile d'olive"],
  },
  {
    name: "Napoletana",
    price: 14,
    category: "Classiques",
    ingredients: ["San Marzano DOP", "fior di latte", "anchois de Cetara", "câpres", "origan"],
  },
  {
    name: "Diavola",
    price: 15,
    category: "Spécialités",
    ingredients: [
      "San Marzano DOP",
      "fior di latte",
      "salame piccante",
      "piment de Calabre",
      "miel de châtaignier",
    ],
    signature: true,
  },
  {
    name: "Tartufo",
    price: 19,
    category: "Spécialités",
    ingredients: [
      "crème de truffe noire",
      "fior di latte",
      "champignons",
      "parmesan 24 mois",
      "huile de truffe",
    ],
    signature: true,
  },
  {
    name: "Bufala e Crudo",
    price: 18,
    category: "Spécialités",
    ingredients: [
      "San Marzano DOP",
      "mozzarella di bufala",
      "prosciutto di Parma 18 mois",
      "roquette",
      "copeaux de parmesan",
    ],
  },
  {
    name: "Quattro Formaggi",
    price: 16,
    category: "Spécialités",
    ingredients: ["fior di latte", "gorgonzola DOP", "parmesan", "provola fumée", "noix"],
  },
  {
    name: "Ortolana",
    price: 15,
    category: "Végétariennes",
    ingredients: [
      "San Marzano DOP",
      "fior di latte",
      "courgettes",
      "aubergines",
      "poivrons grillés",
      "basilic",
    ],
    signature: true,
  },
  {
    name: "Verde",
    price: 15,
    category: "Végétariennes",
    ingredients: [
      "pesto de basilic",
      "mozzarella di bufala",
      "épinards frais",
      "pignons de pin",
      "zeste de citron",
    ],
  },
  {
    name: "Funghi e Tartufata",
    price: 17,
    category: "Végétariennes",
    ingredients: [
      "crème de truffe",
      "fior di latte",
      "trio de champignons",
      "thym",
      "huile d'olive",
    ],
  },
];

export const categories: PizzaCategory[] = [
  "Classiques",
  "Spécialités",
  "Végétariennes",
];

export const categoryBlurb: Record<PizzaCategory, string> = {
  Classiques: "Les fondamentaux napolitains, sublimés par la simplicité des produits.",
  Spécialités: "Nos créations signature, généreuses et audacieuses.",
  Végétariennes: "Le potager de Campanie, frais et lumineux.",
};
