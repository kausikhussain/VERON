export type MainCategory =
  | 'Top Wear'
  | 'Bottom Wear'
  | 'Innerwear'
  | 'Footwear'
  | 'Accessories'
  | 'Grooming'
  | 'Luxury Essentials'
  | 'Suits & Tailoring';

export interface Product {
  id: string;
  name: string;
  category: MainCategory;
  subcategory: string;
  collections?: string[];
  price: number;
  description: string;
  image: string;
  additionalImages?: string[];
  fabric: string;
  origin: string;
  weight?: string;
  weave?: string;
  details: string[];
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isBespoke?: boolean;
  isTrending?: boolean;
  isEditorPick?: boolean;
  rating?: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  season: string;
  image: string;
  quote: string;
  photographer: string;
  taggedProducts: string[]; // Product IDs
}

export interface OutfitSlot {
  id: 'jacket' | 'shirt' | 'trousers' | 'footwear' | 'accessory';
  name: string;
  product?: Product;
}

export interface AIStylistResult {
  title: string;
  concept: string;
  occasion: string;
  budgetRange?: string;
  colorMatchingNotes?: string;
  palette: string[];
  items: {
    category: string; // e.g., Shirt, Pants, Shoes, Watch, Sunglasses, Belt, Wallet, Perfume, Accessory
    name: string;
    fabric: string;
    stylingNotes: string;
    price: number;
  }[];
  groomingAndFragrance: string;
  atelierNote: string;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  monogram?: string;
  quantity: number;
}

export interface AtelierBooking {
  location: string;
  date: string;
  time: string;
  fullName: string;
  email: string;
  phone: string;
  preferredTailor?: string;
  notes?: string;
}

