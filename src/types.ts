export interface Product {
  id: string;
  name: string;
  category: 'Formal' | 'Streetwear' | 'Luxury Essentials' | 'Footwear' | 'Accessories' | 'Fragrances' | 'Travel' | 'Athleisure';
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
  palette: string[];
  items: {
    category: string;
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
