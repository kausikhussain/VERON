import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ShoppingBag, Eye, Plus, Sparkles, Star, Layers } from 'lucide-react';
import { FabricDistortionCanvas } from './FabricDistortionCanvas';

interface ProductShowcaseProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onAddToOutfitBuilder: (p: Product) => void;
  currency: string;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onAddToOutfitBuilder,
  currency,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const categories = [
    'All',
    'Formal',
    'Luxury Essentials',
    'Footwear',
    'Accessories',
    'Travel',
    'Streetwear',
    'Fragrances',
    'Athleisure',
  ];

  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    JPY: { symbol: '¥', rate: 155.0 },
  };

  const curr = currencyRates[currency] || currencyRates.USD;

  const formatPrice = (usd: number) => {
    const converted = Math.round(usd * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="collection" className="py-24 bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059]">
              AUTUMN / WINTER 2026 EDITORIAL
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#F8F9FA] mt-2 font-normal">
              Signature <br />
              <span className="italic font-light text-[#C5A059] font-serif">Haute Collection</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-light text-[#EFECE6]/70 max-w-md">
            Every garment in our flagship collection is handcrafted in limited series to ensure uncompromised quality and exclusivity.
          </p>
        </div>

        {/* Category Filters Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar border-b border-[#1F2128]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C5A059] text-[#08080A] font-medium shadow-md'
                  : 'bg-[#121316] text-[#EFECE6]/70 hover:text-[#F8F9FA] hover:bg-[#1F2128] border border-[#1F2128]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              onMouseEnter={() => setHoveredProductId(product.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              data-cursor-text="INSPECT"
              className="group relative bg-[#121316] border border-[#1F2128] hover:border-[#C5A059]/60 rounded overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl"
            >
              {/* Soft Gold-Hued Ambient Bloom Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A059]/0 via-[#C5A059]/5 to-[#C5A059]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

              {/* Product Visual Area with Fabric Distortion Shader */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer bg-[#08080A]"
              >
                <FabricDistortionCanvas
                  imageSrc={product.image}
                  alt={product.name}
                  isHovered={hoveredProductId === product.id}
                  className="w-full h-full filter brightness-95"
                />
                
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
                  {product.isBespoke && (
                    <span className="bg-[#C5A059] text-[#08080A] text-[9px] font-mono tracking-widest uppercase font-bold px-2.5 py-1 rounded shadow-md">
                      BESPOKE
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-[#121316]/90 text-[#F8F9FA] border border-[#C5A059]/40 text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded backdrop-blur-md">
                      NEW SEASON
                    </span>
                  )}
                </div>

                {/* Quick Action Hover Bar */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="flex-1 py-2.5 bg-[#08080A]/90 backdrop-blur-md border border-[#C5A059]/40 text-[#F8F9FA] hover:text-[#C5A059] text-[10px] font-mono uppercase tracking-widest rounded flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToOutfitBuilder(product);
                    }}
                    className="p-2.5 bg-[#08080A]/90 backdrop-blur-md border border-[#1F2128] hover:border-[#C5A059] text-[#C5A059] rounded cursor-pointer transition-colors"
                    title="Add to Outfit Builder"
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Meta & Info */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#C5A059] uppercase">
                    <span>{product.category}</span>
                    <span className="text-[#EFECE6]/50">{product.origin}</span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-xl text-[#F8F9FA] mt-1 group-hover:text-[#C5A059] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs font-light text-[#EFECE6]/60 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-3 text-[11px] font-mono text-[#EFECE6]/70 bg-[#08080A] px-3 py-1.5 rounded border border-[#1F2128]">
                    <span className="text-[#C5A059]">Fabric:</span> {product.fabric}
                  </div>
                </div>

                {/* Price & Add to Wardrobe CTA */}
                <div className="pt-4 border-t border-[#1F2128] flex items-center justify-between">
                  <div>
                    <span className="font-serif text-xl text-[#F8F9FA]">
                      {formatPrice(product.price)}
                    </span>
                    <p className="text-[9px] font-mono text-[#EFECE6]/50 uppercase">INCL. TAX & CUSTOMS</p>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="px-4 py-2.5 bg-[#C5A059] text-[#08080A] hover:bg-[#EFECE6] font-medium text-xs tracking-widest uppercase rounded flex items-center gap-2 transition-all duration-300 cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
