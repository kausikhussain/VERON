import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { ShoppingBag, X, Check, ShieldCheck, Feather, Layers, Sparkles, Camera } from 'lucide-react';
import { ARVirtualTryOn } from './ARVirtualTryOn';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string, monogram?: string) => void;
  onAddToOutfitBuilder: (product: Product) => void;
  allProducts: Product[];
  currency: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onAddToOutfitBuilder,
  allProducts,
  currency,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || 'Standard');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'Standard');
  const [monogram, setMonogram] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [showArTryOn, setShowArTryOn] = useState(false);

  const images = [product.image, ...(product.additionalImages || [])];

  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    JPY: { symbol: '¥', rate: 155.0 },
  };

  const curr = currencyRates[currency] || currencyRates.USD;
  const formattedPrice = `${curr.symbol}${Math.round(product.price * curr.rate).toLocaleString()}`;

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 2);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize, monogram);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#08080A]/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#121316] border border-[#C5A059]/40 rounded-lg max-w-4xl w-full p-6 sm:p-8 relative shadow-2xl my-8 text-[#F8F9FA] space-y-6"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#EFECE6]/60 hover:text-[#F8F9FA] cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[3/4] w-full rounded overflow-hidden border border-[#1F2128] bg-[#08080A]">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-20 rounded border overflow-hidden cursor-pointer ${
                      selectedImage === img ? 'border-[#C5A059]' : 'border-[#1F2128] opacity-60'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specs & Customization */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A059]">
                  {product.category} • {product.origin}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#F8F9FA] mt-1 font-normal">
                  {product.name}
                </h2>
                <span className="font-serif text-2xl text-[#C5A059] mt-2 block">
                  {formattedPrice}
                </span>
              </div>

              <p className="text-xs font-light text-[#EFECE6]/80 leading-relaxed">
                {product.description}
              </p>

              {/* Fabric Specs */}
              <div className="p-3 bg-[#08080A] border border-[#1F2128] rounded space-y-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[#C5A059]">Fabric:</span>
                  <span className="text-[#EFECE6]">{product.fabric}</span>
                </div>
                {product.weight && (
                  <div className="flex justify-between">
                    <span className="text-[#C5A059]">Weight:</span>
                    <span className="text-[#EFECE6]">{product.weight}</span>
                  </div>
                )}
                {product.weave && (
                  <div className="flex justify-between">
                    <span className="text-[#C5A059]">Weave:</span>
                    <span className="text-[#EFECE6]">{product.weave}</span>
                  </div>
                )}
              </div>

              {/* Color Picker */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block">
                  SELECT COLOR
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 rounded text-xs font-mono uppercase cursor-pointer border ${
                        selectedColor === color
                          ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#C5A059]'
                          : 'border-[#1F2128] text-[#EFECE6]/60'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Picker */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block">
                  SELECT ATELIER SIZE
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded text-xs font-mono uppercase cursor-pointer border ${
                        selectedSize === size
                          ? 'border-[#C5A059] bg-[#C5A059] text-[#08080A] font-medium'
                          : 'border-[#1F2128] text-[#EFECE6]/70 hover:border-[#C5A059]/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Custom Monogramming */}
              <div className="space-y-1 pt-2">
                <label className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase flex items-center gap-1">
                  <span>BESPOKE MONOGRAM EMBROIDERY (OPTIONAL)</span>
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={monogram}
                  onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                  placeholder="e.g. 'A.V.M.'"
                  className="w-full bg-[#08080A] border border-[#1F2128] focus:border-[#C5A059] rounded px-3 py-2 text-xs font-mono text-[#F8F9FA] outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#1F2128]">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-[0.2em] uppercase rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-[#EFECE6] transition-colors"
                >
                  {addedSuccess ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{addedSuccess ? 'Added to Wardrobe' : `Add to Bag (${formattedPrice})`}</span>
                </button>

                <button
                  onClick={() => setShowArTryOn(true)}
                  className="p-3.5 bg-[#1F2128] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#08080A] rounded cursor-pointer transition-colors flex items-center gap-2 border border-[#C5A059]/30"
                  title="Virtual AR Try-On"
                >
                  <Camera className="w-5 h-5" />
                  <span className="text-[10px] font-mono tracking-widest uppercase hidden sm:inline">AR Try-On</span>
                </button>

                <button
                  onClick={() => {
                    onAddToOutfitBuilder(product);
                    onClose();
                  }}
                  className="p-3.5 bg-[#1F2128] hover:bg-[#C5A059] text-[#C5A059] hover:text-[#08080A] rounded cursor-pointer transition-colors"
                  title="Add to Outfit Builder"
                >
                  <Layers className="w-5 h-5" />
                </button>
              </div>

              <p className="text-[10px] font-mono text-[#EFECE6]/50 text-center uppercase">
                COMPLIMENTARY WORLDWIDE INSURED EXPRESS DELIVERY • 30-DAY RETURN GUARANTEE
              </p>
            </div>
          </div>
        </div>

        {/* AR Virtual Try-On Modal */}
        {showArTryOn && (
          <ARVirtualTryOn product={product} onClose={() => setShowArTryOn(false)} />
        )}
      </motion.div>
    </div>
  );
};
