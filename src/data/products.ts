import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- TOP WEAR ---
  {
    id: 'prod-top-1',
    name: "The Sovereign Double-Breasted Vicuña Suit Jacket",
    category: 'Top Wear',
    subcategory: 'Suits',
    collections: ['New Arrivals', 'Featured Collection', 'Business Collection', 'Luxury Essentials', 'Wedding Collection', 'Editor\'s Picks'],
    price: 285000,
    description: "Hand-sculpted in our Mayfair atelier using rare Andean Vicuña fleece. Features hand-padded silk canvassing, natural horn buttons, and subtle roped shoulders for the ultimate executive posture.",
    image: '/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg',
    additionalImages: [
      '/assets/men/jackets/black-tuxedo-suit-for-men-3-piece-wedding-suit-groom-tuxedo-set-formal-prom-suit-slim-fit-black-dinn.jpeg',
      '/assets/men/jackets/breasted-suit-men.jpeg'
    ],
    fabric: "100% Rare Andean Vicuña & Silk Canvas",
    origin: "Biella, Italy",
    weight: "280g/m",
    weave: "Hand-brushed Twill",
    details: [
      "Hand-stitched silk pick stitching along lapels",
      "Real horn buttons sourced from sustainable European estates",
      "Full cupro-mulberry silk lining",
      "Working sleeve surgeon cuffs"
    ],
    colors: ["Midnight Obsidian", "Graphite Gray", "Imperial Camel"],
    sizes: ["46 EU / 36 US", "48 EU / 38 US", "50 EU / 40 US", "52 EU / 42 US", "54 EU / 44 US"],
    isNew: true,
    isBespoke: true,
    isEditorPick: true,
    isTrending: true,
    rating: 5.0
  },
  {
    id: 'prod-top-2',
    name: "Sea Island Cotton 200s Spread-Collar Shirt",
    category: 'Top Wear',
    subcategory: 'Shirts',
    collections: ['Luxury Essentials', 'Business Collection', 'Wedding Collection', 'Editor\'s Picks'],
    price: 28500,
    description: "Spun from certified West Indian Sea Island cotton. Silky tactile sheen with Australian mother-of-pearl buttons sewn with 22 stitches per inch.",
    image: '/assets/men/shirts/clean-beige-shirt-outfit-for-everyday-style.jpeg',
    additionalImages: [
      '/assets/men/shirts/men-s-premium-black-textured-casual-shirt-minimal-stylish-summer-outfit.jpeg',
      '/assets/men/shirts/premium-grey-striped-linen-shirt-minimalist-men-s-fashion-essential.jpeg'
    ],
    fabric: "100% West Indian Sea Island Cotton",
    origin: "Swiss Weave",
    weight: "110g/m",
    weave: "Poplin 200/2",
    details: [
      "Australian MOP buttons with shank backing",
      "Hand-sewn collar stand with removable brass stiffeners",
      "Single-needle side seams"
    ],
    colors: ["Pearl White", "Sky Azure", "Champagne Tint"],
    sizes: ["38 / 15.0\"", "39 / 15.5\"", "40 / 15.75\"", "41 / 16.0\"", "42 / 16.5\""],
    isNew: true,
    isEditorPick: true,
    rating: 4.9
  },
  {
    id: 'prod-top-3',
    name: "Heavyweight Silk & Merino Knit Hoodie",
    category: 'Top Wear',
    subcategory: 'Hoodies',
    collections: ['Streetwear Collection', 'New Arrivals', 'Trending This Week', 'Travel Collection'],
    price: 48500,
    description: "Couture streetwear elevated. 18-gauge 3D seamless knit from a silk-merino yarn with hand-cast titanium aglets and architectural drop shoulders.",
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1200',
    fabric: "60% Mulberry Silk, 40% Extrafine Australian Merino",
    origin: "Kyoto, Japan",
    weight: "480g/m",
    weave: "18-Gauge Seamless Milano Stitch",
    details: [
      "Relaxed architectural male silhouette",
      "Laser-etched titanium drawstring ends",
      "Kangaroo pocket with hidden micro-zipper"
    ],
    colors: ["OLED Black", "Pearl Ivory", "Slate Olive"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isTrending: true,
    rating: 4.8
  },
  {
    id: 'prod-top-4',
    name: "Pima Cotton Minimalist Oversized Crew Tee",
    category: 'Top Wear',
    subcategory: 'Oversized T-Shirts',
    collections: ['Streetwear Collection', 'Luxury Essentials', 'Trending This Week'],
    price: 12500,
    description: "Ultra-heavy 300 GSM Peruvian Pima cotton tee with a clean boxy drape, high ribbed collar, and understated tonal embroidery at the spine.",
    image: '/assets/men/tshirts/porche-911-gt3-oversized-t-shirt-240-gsm-premium-cotton-unisex-porsche-911-911gt3-t-shirt-oversizedtshirt-cartshirt-porsche911-aeio-porsche911-porschelife-911gtrs-carenthusiast-supercarstyle-por.jpeg',
    additionalImages: [
      '/assets/men/tshirts/shadow-ronin-katana-oversized-t-shirt-minimal-japanese-streetwear-black-graphic-tee-dm-to-buy.jpeg',
      '/assets/men/tshirts/shadow-warrior-oversized-graphic-t-shirt-japanese-streetwear-anime-style-tee.jpeg'
    ],
    fabric: "100% Long-Staple Peruvian Pima Cotton",
    origin: "Lima, Peru",
    weight: "300g/m",
    weave: "Heavy Single Jersey",
    details: [
      "Pre-shrunk organic mercerized finish",
      "Seamless drop-shoulder construction",
      "High-density rib collar"
    ],
    colors: ["Graphite Black", "Optic White", "Titanium Dust"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7
  },
  {
    id: 'prod-top-5',
    name: "Silk-Cashmere Long-Sleeve Polo Shirt",
    category: 'Top Wear',
    subcategory: 'Polo Shirts',
    collections: ['Luxury Essentials', 'Featured Collection', 'Business Collection', 'Editor\'s Picks'],
    price: 38500,
    description: "An understated staple crafted with mother-of-pearl buttons, seamless cuffs, and a razor-sharp placket that lays flush against the collarbone.",
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1200',
    fabric: "70% Silk, 30% Mongolian Cashmere",
    origin: "Biella, Italy",
    details: [
      "Placket with hidden horn buttons",
      "Ribbed collar and sleeve trim",
      "Breathable thermoregulating knit"
    ],
    colors: ["Champagne Gold", "OLED Black", "Midnight Navy"],
    sizes: ["48 EU", "50 EU", "52 EU", "54 EU"],
    isEditorPick: true,
    rating: 4.9
  },
  {
    id: 'prod-top-6',
    name: "Structured Double-Breasted Velvet Tuxedo Blazer",
    category: 'Top Wear',
    subcategory: 'Blazers',
    collections: ['Wedding Collection', 'Featured Collection', 'Luxury Essentials'],
    price: 195000,
    description: "Crafted from deep midnight black Lyon silk velvet with satin peak lapels. Designed for gala evenings, black-tie ceremonies, and award galas.",
    image: '/assets/men/jackets/black-tuxedo-suit-for-men-3-piece-wedding-suit-groom-tuxedo-set-formal-prom-suit-slim-fit-black-dinn.jpeg',
    fabric: "100% Lyon Silk Velvet with Satin Facing",
    origin: "Lyon, France",
    details: [
      "Satin-covered horn buttons",
      "Hand-padded chest piece",
      "Bespoke internal pocketing"
    ],
    colors: ["Midnight Velvet", "OLED Obsidian"],
    sizes: ["46 EU", "48 EU", "50 EU", "52 EU", "54 EU"],
    isBespoke: true,
    rating: 5.0
  },
  {
    id: 'prod-top-7',
    name: "Subtle Textured Waffle Henley Shirt",
    category: 'Top Wear',
    subcategory: 'Henleys',
    collections: ['Luxury Essentials', 'Travel Collection'],
    price: 380,
    description: "A refined waffle-knit henley spun from organic Egyptian Giza cotton with hand-carved horn buttons.",
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1200',
    fabric: "100% Organic Giza Cotton Waffle",
    origin: "Cairo, Egypt",
    details: [
      "3-button horn placket",
      "Form-fitting chest cut",
      "Flatlock seams"
    ],
    colors: ["Charcoal", "Bone White", "Olive Sand"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8
  },
  {
    id: 'prod-top-8',
    name: "Monochromatic Silk & Linen Kurta Set",
    category: 'Top Wear',
    subcategory: 'Kurtas',
    collections: ['Wedding Collection', 'Featured Collection'],
    price: 1850,
    description: "Architectural modern kurta tailored from hand-spun Mulberry silk and raw French linen, accented with subtle hand-embroidered metallic thread.",
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1200',
    fabric: "60% Mulberry Silk, 40% French Linen",
    origin: "Varanasi Atelier",
    details: [
      "Concealed placket with gold-washed buttons",
      "Mandarin collar with subtle stitch detail",
      "Matching silk tailored trousers included"
    ],
    colors: ["Champagne Ivory", "Slate OLED Black"],
    sizes: ["38", "40", "42", "44"],
    isBespoke: true,
    rating: 4.9
  },

  // --- BOTTOM WEAR ---
  {
    id: 'prod-bot-1',
    name: "Pleated High-Waisted Worsted Flannel Trousers",
    category: 'Bottom Wear',
    subcategory: 'Trousers',
    collections: ['Business Collection', 'Luxury Essentials', 'Featured Collection'],
    price: 58500,
    description: "Master-tailored with double forward pleats, extended side waist adjusters, and a clean turn-up cuff. Cut from English worsted wool flannel.",
    image: '/assets/men/jeans/classic-grey-double-breasted-elegance.jpeg',
    fabric: "100% English Worsted Flannel Wool",
    origin: "Huddersfield, UK",
    weight: "320g/m",
    details: [
      "Side waist cinchers in solid brass",
      "Internal curtain waistband",
      "5cm turn-up cuff hem"
    ],
    colors: ["Charcoal Grey", "Midnight Black", "Camel Oat"],
    sizes: ["30 US / 46 EU", "32 US / 48 EU", "34 US / 50 EU", "36 US / 52 EU"],
    isEditorPick: true,
    rating: 4.9
  },
  {
    id: 'prod-bot-2',
    name: "Japanese Selvedge Denim Tailored Jeans",
    category: 'Bottom Wear',
    subcategory: 'Jeans',
    collections: ['Streetwear Collection', 'Luxury Essentials', 'Trending This Week'],
    price: 34500,
    description: "Crafted on vintage shuttle looms in Okayama using 14.5oz indigo-dyed selvedge cotton with custom titanium hardware.",
    image: '/assets/men/jeans/cargo-style-denim-jeans.jpeg',
    fabric: "100% Okayama Selvedge Cotton Denim (14.5oz)",
    origin: "Okayama, Japan",
    details: [
      "Hidden selvedge ID inside coin pocket",
      "Titanium river-etched rivets",
      "Hand-stamped leather back patch"
    ],
    colors: ["Raw Deep Indigo", "Washed Charcoal", "Obsidian Black"],
    sizes: ["30x32", "32x32", "34x34", "36x34"],
    isTrending: true,
    rating: 4.8
  },
  {
    id: 'prod-bot-3',
    name: "Italian Stretch Cotton Garment-Dyed Chinos",
    category: 'Bottom Wear',
    subcategory: 'Chinos',
    collections: ['Luxury Essentials', 'Business Collection', 'Travel Collection'],
    price: 22500,
    description: "Slim-tailored chinos with subtle stretch for comfort. Hand-finished with genuine horn button closures.",
    image: '/assets/men/jeans/classic-grey-double-breasted-elegance.jpeg',
    fabric: "97% Giza Cotton, 3% Elastane",
    origin: "Veneto, Italy",
    details: [
      "V-split rear waistband for flexibility",
      "Internal grip tape",
      "Garment-dyed vintage luster"
    ],
    colors: ["Khaki Tan", "Navy Obsidian", "Olive Grey"],
    sizes: ["30", "32", "34", "36"],
    rating: 4.7
  },
  {
    id: 'prod-bot-4',
    name: "Tech-Wool Tailored Cargo Joggers",
    category: 'Bottom Wear',
    subcategory: 'Cargo Pants',
    collections: ['Streetwear Collection', 'Gym Collection', 'Travel Collection'],
    price: 42500,
    description: "Merging utilitarian cargo functionality with Zegna tech-merino luxury. Features sleek magnetic flap pockets and tapered cuffs.",
    image: '/assets/men/cargos/cargo-style-denim-jeans.jpeg',
    fabric: "80% Zegna Tech Merino, 15% Nylon, 5% Elastane",
    origin: "Biella, Italy",
    details: [
      "Concealed zipper key-card pocket",
      "Magnetic fidlock cargo closures",
      "Water-repellent finish"
    ],
    colors: ["OLED Black", "Titanium Grey", "Military Bronze"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    rating: 4.8
  },
  {
    id: 'prod-bot-5',
    name: "Pure French Linen Drawstring Trousers",
    category: 'Bottom Wear',
    subcategory: 'Linen Pants',
    collections: ['Travel Collection', 'Luxury Essentials'],
    price: 26500,
    description: "Ultra-breathable relaxed linen trousers with an internal silk drawstring. Perfect for summer coastal retreats.",
    image: '/assets/men/shirts/premium-grey-striped-linen-shirt-minimalist-men-s-fashion-essential.jpeg',
    fabric: "100% Normandy Linen",
    origin: "Normandy, France",
    details: [
      "Horn drawstring aglets",
      "Horn button fly",
      "Double back welt pockets"
    ],
    colors: ["Sand Oat", "Pure White", "Midnight Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9
  },

  // --- FOOTWEAR ---
  {
    id: 'prod-foot-1',
    name: "Wholecut French Calfskin Oxford Shoes",
    category: 'Footwear',
    subcategory: 'Formal Shoes',
    collections: ['Featured Collection', 'Business Collection', 'Wedding Collection', 'Editor\'s Picks'],
    price: 85000,
    description: "Cut from a single flawless piece of French calfskin leather. Hand-patinated in our Florence workshop with a fiddleback bevelled waist oak-bark sole.",
    image: '/assets/men/shoes/campus-men-s-white-green-camp-clint-sneakers-clean-everyday-style.jpeg',
    additionalImages: [
      '/assets/men/shoes/clean-white-sneakers-aesthetic-minimal-fashion-footwear.jpeg'
    ],
    fabric: "Full-Grain French Box Calfskin",
    origin: "Florence, Italy",
    details: [
      "Goodyear-welted hand-stitched construction",
      "Hand-burnished espresso glaze",
      "Includes solid cedar shoe trees and velvet dust bags"
    ],
    colors: ["Espresso Burnish", "OLED Black", "Oxblood Amber"],
    sizes: ["40 EU / 7 US", "41 EU / 8 US", "42 EU / 9 US", "43 EU / 10 US", "44 EU / 11 US", "45 EU / 12 US"],
    isBespoke: true,
    isEditorPick: true,
    rating: 5.0
  },
  {
    id: 'prod-foot-2',
    name: "Sculpted Italian Aniline Chelsea Boots",
    category: 'Footwear',
    subcategory: 'Chelsea Boots',
    collections: ['Luxury Essentials', 'Featured Collection', 'Trending This Week'],
    price: 72000,
    description: "Seamless minimalist ankle boot with elastic side gores, hand-stained burnished toe, and a pitch heel with memory foam arch support.",
    image: '/assets/men/shoes/grey-casual-sneakers-for-men-women-comfortable-everyday-trainers-amazon-uk.jpeg',
    fabric: "Full-Grain Italian Aniline Calfskin",
    origin: "Marche, Italy",
    details: [
      "Blake-rapid welted sole with rubber tread insert",
      "Hand-stained burnished toe",
      "Dual heel pull tabs with gold hot-stamping"
    ],
    colors: ["OLED Black", "Suede Taupe", "Deep Chestnut"],
    sizes: ["40 EU", "41 EU", "42 EU", "43 EU", "44 EU"],
    isTrending: true,
    rating: 4.8
  },
  {
    id: 'prod-foot-3',
    name: "AURELIUS Court Leather Minimalist Sneakers",
    category: 'Footwear',
    subcategory: 'Sneakers',
    collections: ['Sneakers Collection', 'Streetwear Collection', 'New Arrivals', 'Trending This Week'],
    price: 38500,
    description: "Hand-crafted minimalist low-top sneakers in ultra-soft nappa calf leather with Margom rubber cup soles and leather lining.",
    image: '/assets/men/shoes/campus-men-s-white-green-camp-clint-sneakers-clean-everyday-style.jpeg',
    additionalImages: [
      '/assets/men/shoes/clean-white-sneakers-aesthetic-minimal-fashion-footwear.jpeg',
      '/assets/men/shoes/grey-casual-sneakers-for-men-women-comfortable-everyday-trainers-amazon-uk.jpeg'
    ],
    fabric: "Smooth Italian Nappa Leather & Margom Sole",
    origin: "Civitanova Marche, Italy",
    details: [
      "Hand-stitched leather footbed",
      "Gold foil stamped serial code at heel",
      "Waxed cotton laces"
    ],
    colors: ["Mono White", "Triple Black", "Concrete Grey"],
    sizes: ["40 EU", "41 EU", "42 EU", "43 EU", "44 EU", "45 EU"],
    isNew: true,
    rating: 4.9
  },
  {
    id: 'prod-foot-4',
    name: "Belgian Suede Penny Loafers with Gold Bit",
    category: 'Footwear',
    subcategory: 'Loafers',
    collections: ['Luxury Essentials', 'Travel Collection', 'Business Collection'],
    price: 52000,
    description: "Supple water-resistant suede loafers with hand-piped leather trim and a solid champagne gold horsebit bridge.",
    image: '/assets/men/shoes/us-polo-assn-white-sneakers-for-men-casual-sneakers-outfit-ideas-everyday-stylish-shoes.jpeg',
    fabric: "Reverse Calf Suede & Calfskin Trim",
    origin: "Naples, Italy",
    details: [
      "Ultra-flexible Blake stitched leather sole",
      "Unlined suede vamp for maximum softness",
      "Champagne gold hardware"
    ],
    colors: ["Dark Espresso", "Sand Suede", "OLED Black"],
    sizes: ["40 EU", "41 EU", "42 EU", "43 EU", "44 EU"],
    rating: 4.9
  },
  {
    id: 'prod-foot-5',
    name: "Aerodynamic Mesh & Calfskin Running Trainers",
    category: 'Footwear',
    subcategory: 'Running Shoes',
    collections: ['Sneakers Collection', 'Gym Collection', 'Streetwear Collection'],
    price: 39500,
    description: "High-performance luxury runners featuring lightweight carbon fiber shank inserts, Vibram cushioning soles, and reflective technical thread.",
    image: '/assets/men/shoes/comfy-white-sneakers-shoes-for-women.jpeg',
    fabric: "Technical Ripstop Mesh, Italian Leather & Vibram Sole",
    origin: "Montebelluna, Italy",
    details: [
      "Vibram Megagrip traction outsole",
      "Carbon fiber arch stability board",
      "Ortholite memory foam inner sole"
    ],
    colors: ["Crimson Obsidian", "Titanium White", "Gunmetal Red"],
    sizes: ["40 EU", "41 EU", "42 EU", "43 EU", "44 EU"],
    isNew: true,
    rating: 4.8
  },

  // --- ACCESSORIES & WATCHES ---
  {
    id: 'prod-acc-1',
    name: "AURELIUS Chrono Tourbillon Titanium 42mm",
    category: 'Accessories',
    subcategory: 'Luxury Watches',
    collections: ['Watches Collection', 'Featured Collection', 'Luxury Essentials', 'Editor\'s Picks'],
    price: 1850000,
    description: "An architectural horological masterpiece in grade 5 titanium and 18k champagne gold. Features a flying tourbillon movement with 72-hour power reserve and hand-stitched alligator strap.",
    image: '/assets/men/watches/patek-philippe-nautilus-watch-ref-5610-1p-001-boodles.jpeg',
    additionalImages: [
      '/assets/men/watches/black-pvd-nautilus-by-patek-philippe-luxury-watch-timepiece-raacks-raackscom.jpeg',
      '/assets/men/watches/luxury-black-gold-men-s-watch-premium-dress-watch-for-old-money-style-2026.jpeg'
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
    isBespoke: true,
    isEditorPick: true,
    rating: 5.0
  },
  {
    id: 'prod-acc-2',
    name: "Atelier Tuscan Leather Holdall 55cm",
    category: 'Accessories',
    subcategory: 'Duffel Bags',
    collections: ['Men\'s Accessories', 'Travel Collection', 'Luxury Essentials'],
    price: 145000,
    description: "The quintessential luxury travel companion. Crafted from full-grain vegetable-tanned Tuscan leather with hand-polished edge painting and brass hardware.",
    image: '/assets/women/handbags/vintage-luxury-shoulder-bag.jpeg',
    additionalImages: [
      '/assets/women/handbags/minimalist-leather-tote-bag.jpeg'
    ],
    fabric: "Tuscan Vegetable-Tanned Calf Leather",
    origin: "Santa Croce, Italy",
    details: [
      "Hand-stitched rolled handles",
      "Suede-lined main compartment with laptop sleeve",
      "Reinforced base with metal protective feet",
      "TSA-compliant padlock & brass key tag"
    ],
    colors: ["Cognac Saddle", "Nero Stealth", "British Racing Green"],
    sizes: ["55cm x 30cm x 28cm"],
    rating: 4.9
  },
  {
    id: 'prod-acc-3',
    name: "Japan Beta-Titanium Polarized Sunglasses",
    category: 'Accessories',
    subcategory: 'Sunglasses',
    collections: ['Men\'s Accessories', 'Luxury Essentials', 'Trending This Week'],
    price: 38500,
    description: "Ultra-lightweight Japanese beta-titanium eyewear with anti-reflective ZEISS polarized lenses and 24k gold leaf inlay.",
    image: '/assets/men/sunglasses/casual-summer-men-sunglasses-outfit.jpeg',
    fabric: "Beta Titanium & ZEISS Optics",
    origin: "Sabae, Japan",
    details: [
      "100% UVA/UVB protection with anti-scratch coating",
      "Hand-finished filigree detailing on rim edge",
      "Includes handmade leather case and microfiber cloth"
    ],
    colors: ["Gold & Emerald Tint", "Titanium & Midnight Smoke"],
    sizes: ["One Size"],
    isTrending: true,
    rating: 4.9
  },
  {
    id: 'prod-acc-4',
    name: "Crocodile Leather Slim Cardholder & Money Clip",
    category: 'Accessories',
    subcategory: 'Wallets',
    collections: ['Men\'s Accessories', 'Luxury Essentials'],
    price: 32500,
    description: "Ultra-slim cardholder wallet crafted from hand-glazed Porosus crocodile skin with magnetic titanium money clip.",
    image: '/assets/women/handbags/vintage-luxury-shoulder-bag.jpeg',
    fabric: "Certified Porosus Crocodile Skin & Calfskin",
    origin: "Paris, France",
    details: [
      "Hand-painted lacquer edges",
      "Gold foil stamped insignia",
      "RFID-shielded central pocket"
    ],
    colors: ["OLED Black", "Cognac Amber", "Eucalyptus Green"],
    sizes: ["Standard Card Size"],
    rating: 5.0
  },
  {
    id: 'prod-acc-5',
    name: "Full-Grain Calfskin Dress Belt with Gold Buckle",
    category: 'Accessories',
    subcategory: 'Belts',
    collections: ['Men\'s Accessories', 'Business Collection', 'Wedding Collection'],
    price: 24500,
    description: "Hand-finished 32mm dress belt made from box calfskin with a solid champagne-gold brass buckle.",
    image: '/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg',
    fabric: "Full-Grain French Box Calfskin & Solid Brass",
    origin: "Parma, Italy",
    details: [
      "32mm width designed for suit trouser loops",
      "Hand-stitched perimeter",
      "Subtle hot-stamped logo on underside"
    ],
    colors: ["OLED Black", "Dark Espresso", "Mahogany"],
    sizes: ["85cm / 32\"", "90cm / 34\"", "95cm / 36\"", "100cm / 38\""],
    rating: 4.8
  },
  {
    id: 'prod-acc-6',
    name: "18k Champagne Gold & Onyx Cufflinks",
    category: 'Accessories',
    subcategory: 'Cufflinks',
    collections: ['Men\'s Accessories', 'Wedding Collection', 'Business Collection'],
    price: 68000,
    description: "Hand-carved natural black onyx stones encased in brushed 18k champagne gold geometry.",
    image: '/assets/men/watches/luxury-black-gold-men-s-watch-premium-dress-watch-for-old-money-style-2026.jpeg',
    fabric: "18k Champagne Gold & Natural Black Onyx",
    origin: "London Mayfair",
    details: [
      "Fixed bar closure with laser monogramming",
      "Hand-polished mirror edge",
      "Delivered in velvet jewelry box"
    ],
    colors: ["Gold & Onyx"],
    sizes: ["One Size"],
    isBespoke: true,
    rating: 5.0
  },

  // --- GROOMING & PERFUMES ---
  {
    id: 'prod-groom-1',
    name: "No. IX Smoked Frankincense & Amber Oud 100ml",
    category: 'Grooming',
    subcategory: 'Cologne',
    collections: ['Grooming Essentials', 'Featured Collection', 'Luxury Essentials', 'Editor\'s Picks'],
    price: 18500,
    description: "An enigmatic olfactory signature for men. Deep notes of wild Cambodian oud, smoked frankincense, Moroccan rose, and velvety white suede.",
    image: '/assets/men/sunglasses/casual-summer-men-sunglasses-outfit.jpeg',
    fabric: "25% Pure Eau de Parfum Extract",
    origin: "Grasse, France",
    details: [
      "Hand-blown glass vessel with solid brass cap",
      "Housed in handcrafted piano-black lacquer box",
      "Ethically harvested rare botanicals"
    ],
    colors: ["Amber Gold Liquid"],
    sizes: ["100ml / 3.4 fl oz"],
    isEditorPick: true,
    rating: 5.0
  },
  {
    id: 'prod-groom-2',
    name: "Mayfair Imperial Beard Care & Conditioning Oil",
    category: 'Grooming',
    subcategory: 'Beard Care',
    collections: ['Grooming Essentials', 'Luxury Essentials'],
    price: 4800,
    description: "Infused with cold-pressed jojoba, argan, and sandalwood extracts to nourish, soften, and tame coarse beard hair while hydrating skin.",
    image: '/assets/men/shirts/clean-beige-shirt-outfit-for-everyday-style.jpeg',
    fabric: "100% Organic Cold-Pressed Botanical Oils",
    origin: "London Barber Atelier",
    details: [
      "Non-greasy rapid absorption formula",
      "Scented with cedarwood, vetiver, and bergamot",
      "Includes boar-bristle beard comb"
    ],
    colors: ["Clear Golden Oil"],
    sizes: ["50ml / 1.7 fl oz"],
    rating: 4.9
  },
  {
    id: 'prod-groom-3',
    name: "Handcrafted Damascene Steel Safety Razor Shaving Kit",
    category: 'Grooming',
    subcategory: 'Shaving Kits',
    collections: ['Grooming Essentials', 'Featured Collection'],
    price: 28500,
    description: "Precision double-edge safety razor hand-forged from 64-layer Damascene steel paired with a badger-hair shaving brush and weighted stand.",
    image: '/assets/men/watches/patek-philippe-nautilus-watch-ref-5610-1p-001-boodles.jpeg',
    fabric: "Damascene Steel, Silvertip Badger Hair, Anodized Aluminum",
    origin: "Solingen, Germany",
    details: [
      "Optimal weight distribution for effortless glide",
      "Silvertip badger hair brush creates rich lather",
      "Includes 20 Swedish steel blades"
    ],
    colors: ["Damascus Pattern Steel"],
    sizes: ["3-Piece Kit"],
    isBespoke: true,
    rating: 4.9
  },
  {
    id: 'prod-groom-4',
    name: "Hydrating Charcoal Face Wash & Skin Regenerator",
    category: 'Grooming',
    subcategory: 'Face Wash',
    collections: ['Grooming Essentials'],
    price: 3800,
    description: "Deep cleansing activated charcoal facial cleanser enriched with hyaluronic acid, niacinamide, and green tea extract for clear men's skin.",
    image: '/assets/men/tshirts/porche-911-gt3-oversized-t-shirt-240-gsm-premium-cotton-unisex-porsche-911-911gt3-t-shirt-oversizedtshirt-cartshirt-porsche911-aeio-porsche911-porschelife-911gtrs-carenthusiast-supercarstyle-por.jpeg',
    fabric: "Activated Bamboo Charcoal & Hyaluronic Complex",
    origin: "Tokyo, Japan",
    details: [
      "Sulfate-free gentle detoxifying foam",
      "Unclogs pores and prevents razor bumps",
      "Matte non-shiny finish"
    ],
    colors: ["Charcoal Gel"],
    sizes: ["150ml / 5.1 fl oz"],
    rating: 4.8
  },

  // --- INNERWEAR ---
  {
    id: 'prod-in-1',
    name: "Sea Island Cotton Stretch Trunks (Pack of 3)",
    category: 'Innerwear',
    subcategory: 'Trunks',
    collections: ['Luxury Essentials'],
    price: 9800,
    description: "The pinnacle of daily comfort. Ultra-soft Sea Island cotton blended with micro-elastane, finished with a seamless plush elastic waistband.",
    image: '/assets/men/shirts/clean-beige-shirt-outfit-for-everyday-style.jpeg',
    fabric: "92% Sea Island Cotton, 8% Elastane",
    origin: "Swiss Knit Atelier",
    details: [
      "No-ride-up leg band construction",
      "Tagless itch-free printed interior label",
      "Breathable moisture-wicking weave"
    ],
    colors: ["OLED Black", "Graphite Grey", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.9
  },
  {
    id: 'prod-in-2',
    name: "Thermal Ribbed Merino Wool Base Layer Vest",
    category: 'Innerwear',
    subcategory: 'Thermals',
    collections: ['Luxury Essentials', 'Travel Collection'],
    price: 11500,
    description: "Featherlight extrafine merino thermal vest engineered to regulate core temperature under tailored dress shirts.",
    image: '/assets/men/shirts/premium-grey-striped-linen-shirt-minimalist-men-s-fashion-essential.jpeg',
    fabric: "100% Extrafine Australian Merino Wool",
    origin: "Tasmania, Australia",
    details: [
      "Ultra-thin 17.5-micron fiber for zero itchiness",
      "Deep V-neck stays invisible under open shirt collar",
      "Natural odor-resistant properties"
    ],
    colors: ["Nude Tone", "Optic White", "Charcoal"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8
  },

  // --- WOMEN'S COUTURE COLLECTION ---
  {
    id: 'prod-wmn-1',
    name: "The Mayfair Silk Chiffon Sculpted Evening Gown",
    category: 'Dresses & Gowns',
    subcategory: 'Gowns',
    gender: 'women',
    collections: ['New Arrivals', 'Featured Collection', 'Luxury Essentials', 'Editor\'s Picks', 'Trending This Week'],
    price: 345000,
    description: "Hand-draped in liquid mulberry silk chiffon with structured inner corsetry and subtle hand-sewn crystal degrade along the trailing train.",
    image: '/assets/women/handbags/vintage-luxury-shoulder-bag.jpeg',
    additionalImages: [
      '/assets/women/handbags/minimalist-leather-tote-bag.jpeg'
    ],
    fabric: "100% Pure Mulberry Silk Chiffon",
    origin: "Como, Italy",
    weight: "140g/m",
    weave: "Hand-draped Chiffon",
    details: [
      "Built-in internal silk boned corset",
      "Concealed hand-picked back zip closure",
      "Fluid floor-length trailing hemline"
    ],
    colors: ["Champagne Gold", "Obsidian Noir", "Emerald Velvet"],
    sizes: ["36 EU / 2 US", "38 EU / 4 US", "40 EU / 6 US", "42 EU / 8 US"],
    isNew: true,
    isEditorPick: true,
    isTrending: true,
    rating: 5.0
  },
  {
    id: 'prod-wmn-2',
    name: "AURELIUS Royal Calfskin Structured Tote Bag",
    category: 'Handbags & Leather',
    subcategory: 'Totes',
    gender: 'women',
    model3D: 'bag',
    collections: ['Luxury Essentials', 'Featured Collection', 'Trending This Week'],
    price: 185000,
    description: "Architectural handbag hand-stitched from full-grain box calfskin. Finished with 18k gold champagne lock hardware and hand-painted edges.",
    image: '/assets/women/handbags/vintage-luxury-shoulder-bag.jpeg',
    additionalImages: [
      '/assets/women/handbags/minimalist-leather-tote-bag.jpeg'
    ],
    fabric: "Full-Grain French Box Calfskin",
    origin: "Florence, Italy",
    details: [
      "Solid 18k gold champagne turn-lock closure",
      "Mulberry suede lining with interior key loop",
      "Detachable leather shoulder strap"
    ],
    colors: ["Caramel Cognac", "OLED Noir", "Ivory Cream"],
    sizes: ["Medium (32cm x 24cm)"],
    isNew: true,
    isTrending: true,
    rating: 4.9
  },
  {
    id: 'prod-wmn-3',
    name: "Sculptural 105mm Nappa Leather Stiletto Heels",
    category: 'Footwear',
    subcategory: 'Heels',
    gender: 'women',
    model3D: 'shoe',
    collections: ['New Arrivals', 'Featured Collection', 'Editor\'s Picks'],
    price: 78500,
    description: "Handcrafted in Florence with ultra-soft nappa leather uppers, a slim 105mm architectural heel, and padded leather insoles for effortless poise.",
    image: '/assets/men/shoes/comfy-white-sneakers-shoes-for-women.jpeg',
    fabric: "100% Italian Nappa Leather & Leather Sole",
    origin: "Florence, Italy",
    details: [
      "Hand-polished champagne metallic heel tip",
      "Memory foam dual-cushioned footbed",
      "Non-slip leather outsole"
    ],
    colors: ["Champagne Gold", "Midnight Noir", "Crimson Silk"],
    sizes: ["36 EU", "37 EU", "38 EU", "39 EU", "40 EU"],
    isNew: true,
    isEditorPick: true,
    rating: 4.9
  },
  {
    id: 'prod-wmn-4',
    name: "18k Rose Gold & Pavé Diamond Sovereign Pendant",
    category: 'Fine Jewellery',
    subcategory: 'Necklaces',
    gender: 'women',
    collections: ['Luxury Essentials', 'Featured Collection', 'Wedding Collection'],
    price: 425000,
    description: "Exquisite 18k solid rose gold pendant set with 1.45 carats of ethically sourced VS1 brilliant-cut diamonds in a signature sunburst setting.",
    image: '/assets/men/watches/luxury-black-gold-men-s-watch-premium-dress-watch-for-old-money-style-2026.jpeg',
    fabric: "18k Solid Rose Gold & VS1 Diamonds",
    origin: "Mayfair Fine Jewellery Atelier",
    details: [
      "1.45 Carats total diamond weight (F-G color, VS1 clarity)",
      "Adjustable 18-inch delicate rose gold trace chain",
      "Certified conflict-free diamond provenance"
    ],
    colors: ["Rose Gold", "Yellow Gold", "Platinum White"],
    sizes: ["One Size"],
    isNew: true,
    isEditorPick: true,
    rating: 5.0
  }
];
