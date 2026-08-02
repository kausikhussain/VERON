import React, { useState } from 'react';
import { Product, CartItem, AIStylistResult } from './types';
import { PRODUCTS } from './data/products';
import { LuxuryLoader } from './components/LuxuryLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStory } from './components/BrandStory';
import { SignatureCollection } from './components/SignatureCollection';
import { ProductShowcase } from './components/ProductShowcase';
import { ThreeDExperience } from './components/ThreeDExperience';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Lookbook } from './components/Lookbook';
import { FashionNewsWidget } from './components/FashionNewsWidget';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { CustomCursor } from './components/CustomCursor';
import { AmbientSoundscape } from './components/AmbientSoundscape';
import { WardrobeToast, ToastMessage } from './components/WardrobeToast';
import { AIStylistModal } from './components/AIStylistModal';
import { OutfitBuilder } from './components/OutfitBuilder';
import { ProductModal } from './components/ProductModal';
import { AtelierBookingModal } from './components/AtelierBookingModal';
import { WardrobeDrawer } from './components/WardrobeDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState(false);
  const [isOutfitBuilderOpen, setIsOutfitBuilderOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, subtitle: string, product?: Product) => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, title, subtitle, product }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add single product to cart
  const handleAddToCart = (
    product: Product,
    color?: string,
    size?: string,
    monogram?: string
  ) => {
    const selectedColor = color || product.colors[0] || 'Standard';
    const selectedSize = size || product.sizes[0] || 'Standard';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize &&
          item.monogram === monogram
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          selectedColor,
          selectedSize,
          monogram,
          quantity: 1,
        },
      ];
    });

    addToast(
      product.name,
      `Added to Wardrobe • ${selectedColor} / ${selectedSize}`,
      product
    );

    setIsCartOpen(true);
  };

  // Add multiple products from Outfit Builder or AI Stylist
  const handleAddMultipleToCart = (items: Product[]) => {
    items.forEach((prod) => {
      handleAddToCart(prod);
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateCartQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  // Transfer from AI Stylist into Outfit Builder
  const handleTransferToOutfitBuilder = (aiResult: AIStylistResult) => {
    setIsOutfitBuilderOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-[#08080A] text-[#F8F9FA] min-h-screen font-sans selection:bg-[#C5A059] selection:text-[#08080A]">
      {/* Scroll Progress Bar at Viewport Top */}
      <ScrollProgressBar />

      {/* Luxury Custom Cursor */}
      <CustomCursor />

      {/* Luxury Loader */}
      {isLoading && <LuxuryLoader onComplete={() => setIsLoading(false)} />}

      {/* Main Flagship Content */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        onOpenOutfitBuilder={() => setIsOutfitBuilderOpen(true)}
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onExploreClick={() => {
            const el = document.getElementById('collection');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onAIStylistClick={() => setIsAIStylistOpen(true)}
        />

        {/* Brand Story & Heritage */}
        <BrandStory />

        {/* Fashion News & Search Grounded Haute Couture Intelligence */}
        <FashionNewsWidget />

        {/* 8 Categories Signature Pillars */}
        <SignatureCollection
          onSelectCategory={(cat) => {
            const el = document.getElementById('collection');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Interactive 3D WebGL Canvas Experience */}
        <ThreeDExperience />

        {/* Filterable Products Collection */}
        <ProductShowcase
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p)}
          onAddToOutfitBuilder={(p) => setIsOutfitBuilderOpen(true)}
          currency={currency}
        />

        {/* Craftsmanship & Textile AI Explorer */}
        <CraftsmanshipSection />

        {/* Editorial Lookbook */}
        <Lookbook
          products={PRODUCTS}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOpenAIStylist={() => setIsAIStylistOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <AIStylistModal
        isOpen={isAIStylistOpen}
        onClose={() => setIsAIStylistOpen(false)}
        onTransferToOutfitBuilder={handleTransferToOutfitBuilder}
      />

      <OutfitBuilder
        isOpen={isOutfitBuilderOpen}
        onClose={() => setIsOutfitBuilderOpen(false)}
        products={PRODUCTS}
        onAddMultipleToCart={handleAddMultipleToCart}
        currency={currency}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, color, size, monogram) =>
          handleAddToCart(p, color, size, monogram)
        }
        onAddToOutfitBuilder={(p) => setIsOutfitBuilderOpen(true)}
        allProducts={PRODUCTS}
        currency={currency}
      />

      <AtelierBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <WardrobeDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={() => setCart([])}
        currency={currency}
      />

      {/* Ambient Soundscape Synthesizer Player */}
      <AmbientSoundscape />

      {/* Gold-Accented Wardrobe Toast Notification System */}
      <WardrobeToast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
