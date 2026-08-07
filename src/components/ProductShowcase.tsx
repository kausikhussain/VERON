import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product, MainCategory } from '../types';
import { ShoppingBag, Eye, Sparkles, Layers, Search, Filter, X } from 'lucide-react';
import { FabricDistortionCanvas } from './FabricDistortionCanvas';
import { formatINR } from '../utils/formatCurrency';

interface ProductShowcaseProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onAddToOutfitBuilder: (p: Product) => void;
  currency?: string;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onAddToOutfitBuilder,
  currency = 'INR',
}) => {
  const [selectedGender, setSelectedGender] = useState<'all' | 'men' | 'women'>('all');
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [selectedCollection, setSelectedCollection] = useState<string>('All Collections');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const mainCategories = [
    'All',
    'Suits & Tailoring',
    'Dresses & Gowns',
    'Top Wear',
    'Bottom Wear',
    'Footwear',
    'Handbags & Leather',
    'Fine Jewellery',
    'Accessories',
    'Grooming & Perfumes',
    'Luxury Essentials',
  ];

  const collectionsList = [
    'All Collections',
    'New Arrivals',
    'Featured Collection',
    'Business Collection',
    'Streetwear Collection',
    'Sneakers Collection',
    'Watches Collection',
    'Men\'s Accessories',
    'Grooming Essentials',
    'Wedding Collection',
    'Gym Collection',
    'Travel Collection',
    'Editor\'s Picks',
    'Trending This Week',
  ];

  const getSubcategories = () => {
    const subs = new Set<string>();
    if (selectedMainCategory === 'All') {
      products.forEach((p) => {
        if (p.subcategory) subs.add(p.subcategory);
      });
    } else {
      products.forEach((p) => {
        if (p.category === selectedMainCategory && p.subcategory) {
          subs.add(p.subcategory);
        }
      });
    }
    return Array.from(subs);
  };

  const currentSubcategories = getSubcategories();

  const formatPrice = (inr: number) => {
    return formatINR(inr);
  };

  // Filter products
  const filteredProducts = products.filter((p) => {
    // Gender filter
    if (selectedGender !== 'all') {
      if (p.gender && p.gender !== selectedGender) return false;
      if (!p.gender && selectedGender === 'women') return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    // Main Category filter
    if (selectedMainCategory !== 'All') {
      if (selectedMainCategory === 'Suits & Tailoring') {
        if (p.subcategory !== 'Suits' && p.subcategory !== 'Blazers' && !p.isBespoke) return false;
      } else if (p.category !== selectedMainCategory) {
        return false;
      }
    }

    // Subcategory filter
    if (selectedSubcategory !== 'All') {
      if (p.subcategory !== selectedSubcategory) return false;
    }

    // Collection filter
    if (selectedCollection !== 'All Collections') {
      if (!p.collections || !p.collections.includes(selectedCollection)) return false;
    }

    return true;
  });

  return (
    <section id="collection" className="py-24 bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Title & Gender Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059]">
                AUTUMN / WINTER 2026/27 FLAGSHIP CATALOGUE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#F8F9FA] font-normal">
              Aurelius <br />
              <span className="italic font-light text-[#C5A059] font-serif">Signature Atelier</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Gender Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#121316] border border-[#1F2128]">
              <button
                onClick={() => setSelectedGender('all')}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  selectedGender === 'all'
                    ? 'bg-[#C5A059] text-black font-semibold shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                ALL COUTURE
              </button>
              <button
                onClick={() => setSelectedGender('men')}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  selectedGender === 'men'
                    ? 'bg-[#C5A059] text-black font-semibold shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                MEN'S
              </button>
              <button
                onClick={() => setSelectedGender('women')}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                  selectedGender === 'women'
                    ? 'bg-[#C5A059] text-black font-semibold shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                WOMEN'S
              </button>
            </div>

            {/* Search bar */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Vicuña, Gowns, Oxfords..."
                className="w-full bg-[#121316] border border-[#1F2128] focus:border-[#C5A059] rounded-full px-4 py-2 pl-10 text-xs text-[#F8F9FA] placeholder-[#EFECE6]/40 outline-none transition-colors"
              />
              <Search className="w-4 h-4 text-[#C5A059] absolute left-3.5 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#EFECE6]/60 hover:text-[#F8F9FA]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Category Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar border-b border-[#1F2128]">
          {mainCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedMainCategory(cat);
                setSelectedSubcategory('All');
              }}
              className={`px-5 py-2.5 rounded-full text-xs tracking-[0.15em] uppercase whitespace-nowrap transition-all duration-300 cursor-pointer ${
                selectedMainCategory === cat
                  ? 'bg-[#C5A059] text-[#08080A] font-medium shadow-md'
                  : 'bg-[#121316] text-[#EFECE6]/70 hover:text-[#F8F9FA] hover:bg-[#1F2128] border border-[#1F2128]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Subcategories (if selected main category has subcategories) */}
        {currentSubcategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Subcategory:
            </span>
            <button
              onClick={() => setSelectedSubcategory('All')}
              className={`px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                selectedSubcategory === 'All'
                  ? 'bg-[#1F2128] text-[#C5A059] border border-[#C5A059]/40'
                  : 'text-[#EFECE6]/60 hover:text-[#F8F9FA]'
              }`}
            >
              All {selectedMainCategory}
            </button>
            {currentSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1 rounded text-[11px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedSubcategory === sub
                    ? 'bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]'
                    : 'text-[#EFECE6]/60 hover:text-[#F8F9FA]'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Curated Collections Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          <span className="text-[10px] font-mono text-[#EFECE6]/50 uppercase tracking-widest mr-2 whitespace-nowrap">
            Curated Collections:
          </span>
          {collectionsList.map((col) => (
            <button
              key={col}
              onClick={() => setSelectedCollection(col)}
              className={`px-3 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                selectedCollection === col
                  ? 'bg-[#1F2128] text-[#C5A059] border border-[#C5A059]/60 font-medium'
                  : 'bg-[#08080A] text-[#EFECE6]/50 hover:text-[#EFECE6] border border-[#1F2128]'
              }`}
            >
              {col}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4 border border-[#1F2128] rounded bg-[#121316]">
            <p className="text-sm font-mono text-[#C5A059] uppercase tracking-widest">
              No tailored pieces found for these criteria
            </p>
            <button
              onClick={() => {
                setSelectedMainCategory('All');
                setSelectedSubcategory('All');
                setSelectedCollection('All Collections');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 bg-[#C5A059] text-[#08080A] font-medium text-xs tracking-widest uppercase rounded cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
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
                    {product.isEditorPick && !product.isBespoke && !product.isNew && (
                      <span className="bg-[#1F2128]/90 text-[#C5A059] border border-[#C5A059]/30 text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded">
                        EDITOR'S PICK
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
                      <span>{product.subcategory || product.category}</span>
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
        )}
      </div>
    </section>
  );
};
