import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: "The Sovereign Double-Breasted Vicuña Jacket",
    category: 'Formal',
    price: 6800,
    description: "Hand-sculpted in our Mayfair atelier using rare 100% Andean Vicuña fleece. Features hand-padded silk canvassing, natural horn buttons, and subtle roped shoulders.",
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1200'
    ],
    fabric: "100% Rare Andean Vicuña",
    origin: "Biella, Italy",
    weight: "280g/m",
    weave: "Hand-brushed Twill",
    details: [
      "Hand-stitched silk pick stitching along lapels",
      "Real horn buttons sourced from sustainable estates",
      "Full cupro-mulberry silk lining",
      "Working sleeve surgeon cuffs"
    ],
    colors: ["Midnight Obsidian", "Graphite Gray", "Imperial Camel"],
    sizes: ["46 EU / 36 US", "48 EU / 38 US", "50 EU / 40 US", "52 EU / 42 US", "54 EU / 44 US"],
    isNew: true,
    isBespoke: true,
    rating: 5.0
  },
  {
    id: 'prod-2',
    name: "AURELIUS Chrono Tourbillon 42mm",
    category: 'Accessories',
    price: 24500,
    description: "An architectural masterpiece in titanium grade 5 and 18k champagne gold. Features a flying tourbillon movement with 72-hour power reserve and hand-stitched alligator strap.",
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
    ],
    fabric: "Grade 5 Titanium & 18k Champagne Gold",
    origin: "Geneva, Switzerland",
    details: [
      "Manual-wind Calibre A-900 Flying Tourbillon",
      "Sapphire crystal with anti-reflective dual coating",
      "50m water resistance",
      "Hand-sewn Mississippiensis alligator leather strap"
    ],
    colors: ["Rose Titanium", "OLED Stealth Black"],
    sizes: ["42mm Case"],
    isNew: true,
    isBespoke: true,
    rating: 4.9
  },
  {
    id: 'prod-3',
    name: "The Mayfair Cashmere & Silk Trench",
    category: 'Luxury Essentials',
    price: 4900,
    description: "A weatherproof cashmere-silk blend trench coat with raglan sleeves and storm flaps. Merges military heritage with relaxed modern elegance.",
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1200'
    ],
    fabric: "70% Mongolian Cashmere, 30% Mulberry Silk",
    origin: "Scottish Highlands",
    weight: "340g/m",
    weave: "Water-resistant Gabardine",
    details: [
      "Belted waist with hand-engraved titanium buckle",
      "Internal passport zipper pocket",
      "Removable shearling collar accent"
    ],
    colors: ["Warm Beige", "Midnight Charcoal", "Olive Bronze"],
    sizes: ["48 EU", "50 EU", "52 EU", "54 EU"],
    rating: 4.8
  },
  {
    id: 'prod-4',
    name: "Wholecut French Calfskin Oxford Shoes",
    category: 'Footwear',
    price: 1950,
    description: "Cut from a single piece of flawless French calfskin leather. Hand-patinated in our Florence workshop with a fiddleback bevelled waist oak-bark sole.",
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1200'
    ],
    fabric: "Full-Grain French Box Calfskin",
    origin: "Florence, Italy",
    details: [
      "Goodyear-welted hand-stitched construction",
      "Hand-burnished espresso glaze",
      "Includes solid cedar shoe trees and dust bags"
    ],
    colors: ["Espresso Burnish", "OLED Black", "Oxblood Amber"],
    sizes: ["40 EU / 7 US", "41 EU / 8 US", "42 EU / 9 US", "43 EU / 10 US", "44 EU / 11 US", "45 EU / 12 US"],
    rating: 5.0
  },
  {
    id: 'prod-5',
    name: "Atelier Leather Holdall 55cm",
    category: 'Travel',
    price: 3800,
    description: "The quintessential luxury travel companion. Crafted from full-grain vegetable-tanned Tuscan leather with hand-polished edge painting and brass hardware.",
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1200',
    additionalImages: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200'
    ],
    fabric: "Tuscan Vegetable-Tanned Calf Leather",
    origin: "Santa Croce, Italy",
    details: [
      "Hand-stitched rolled handles",
      "Suede-lined main compartment with lap-top sleeve",
      "Reinforced base with metal protective feet",
      "TSA-compliant padlock & brass key tag"
    ],
    colors: ["Cognac Saddle", "Nero Stealth", "British Racing Green"],
    sizes: ["55cm x 30cm x 28cm"],
    rating: 4.9
  },
  {
    id: 'prod-6',
    name: "No. IX Smoked Frankincense & Amber Oud 100ml",
    category: 'Fragrances',
    price: 420,
    description: "An enigmatic olfactory signature. Deep notes of wild Cambodian oud, smoked frankincense, Moroccan rose, and velvety white suede.",
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200',
    fabric: "25% Pure Eau de Parfum Extract",
    origin: "Grasse, France",
    details: [
      "Hand-blown glass vessel with solid brass cap",
      "Housed in handcrafted piano-black lacquer box",
      "Cruelty-free & ethically harvested rare botanicals"
    ],
    colors: ["Amber Gold Liquid"],
    sizes: ["100ml / 3.4 fl oz"],
    rating: 5.0
  },
  {
    id: 'prod-7',
    name: "Heavyweight Silk & Merino Knit Hoodie",
    category: 'Streetwear',
    price: 1250,
    description: "Couture streetwear elevated. 18-gauge 3D seamless knit from a silk-merino yarn with hand-cast titanium aglets.",
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1200',
    fabric: "60% Mulberry Silk, 40% Extrafine Australian Merino",
    origin: "Kyoto, Japan",
    weight: "480g/m",
    weave: "18-Gauge Seamless Milano Stitch",
    details: [
      "Relaxed architectural silhouette",
      "Laser-etched titanium drawstring ends",
      "Kangaroo pocket with hidden micro-zipper"
    ],
    colors: ["OLED Black", "Pearl Ivory", "Slate Olive"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    rating: 4.7
  },
  {
    id: 'prod-8',
    name: "Sea Island Cotton 200s Dress Shirt",
    category: 'Luxury Essentials',
    price: 650,
    description: "Spun from certified West Indian Sea Island cotton. Silky tactile sheen with Australian mother-of-pearl buttons sewn with 22 stitches per inch.",
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=1200',
    fabric: "100% West Indian Sea Island Cotton",
    origin: "Barbados / Swiss Weave",
    weight: "110g/m",
    weave: "Poplin 200/2",
    details: [
      "Australian MOP buttons with shank backing",
      "Hand-sewn collar stand with removable stiffeners",
      "Single-needle side seams"
    ],
    colors: ["Pearl White", "Sky Azure", "Champagne Tint"],
    sizes: ["38 / 15.0\"", "39 / 15.5\"", "40 / 15.75\"", "41 / 16.0\"", "42 / 16.5\""],
    rating: 4.9
  },
  {
    id: 'prod-9',
    name: "Sculpted Italian Calfskin Chelsea Boots",
    category: 'Footwear',
    price: 1650,
    description: "Seamless minimalist ankle boot with elastic side gores and a subtle pitch heel. Elegant almond toe shape with memory foam arch support.",
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=1200',
    fabric: "Full-Grain Italian Aniline Calfskin",
    origin: "Marche, Italy",
    details: [
      "Blake-rapid welted sole with rubber tread insert",
      "Hand-stained burnished toe",
      "Dual heel pull tabs with gold hot-stamping"
    ],
    colors: ["OLED Black", "Suede Taupe", "Deep Chestnut"],
    sizes: ["40 EU", "41 EU", "42 EU", "43 EU", "44 EU"],
    rating: 4.8
  },
  {
    id: 'prod-10',
    name: "AURELIUS Titanium Framed Sunglasses",
    category: 'Accessories',
    price: 880,
    description: "Japanese ultra-lightweight beta-titanium eyewear with anti-reflective ZEISS polarized lenses and 24k gold leaf inlay.",
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=1200',
    fabric: "Beta Titanium & ZEISS Optics",
    origin: "Sabae, Japan",
    details: [
      "100% UVA/UVB protection with anti-scratch coating",
      "Hand-finished filigree detailing on rim edge",
      "Includes leather case and microfiber cloth"
    ],
    colors: ["Gold & Emerald Tint", "Titanium & Midnight Smoke"],
    sizes: ["One Size"],
    rating: 4.9
  },
  {
    id: 'prod-11',
    name: "Architectural Tech-Wool Athleisure Joggers",
    category: 'Athleisure',
    price: 950,
    description: "Blending performance elasticity with merino luxury. Tapered cut with bonded water-repellent zippers and ergonomic knee darts.",
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&q=80&w=1200',
    fabric: "80% Zegna Tech Merino, 15% Nylon, 5% Elastane",
    origin: "Biella, Italy",
    details: [
      "Elastic waistband with silicone grip internal tape",
      "Concealed zipper key card pocket",
      "Reflective subtle champagne trim"
    ],
    colors: ["Charcoal Grey", "OLED Black"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.6
  },
  {
    id: 'prod-12',
    name: "Bespoke Crocodile Leather Card Holder",
    category: 'Accessories',
    price: 780,
    description: "Ultra-slim 6-slot card wallet crafted from hand-glazed Porosus crocodile skin with calfskin lining.",
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200',
    fabric: "Certified Porosus Crocodile Skin",
    origin: "Paris, France",
    details: [
      "Hand-painted lacquer edges",
      "Gold foil stamped AURELIUS insignia",
      "RFID-shielded central pocket"
    ],
    colors: ["OLED Black", "Eucalyptus Green", "Cognac"],
    sizes: ["Standard Card Size"],
    rating: 5.0
  }
];
