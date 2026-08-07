import React from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ArrowUpRight, Compass } from 'lucide-react';

interface SignatureCollectionProps {
  onSelectCategory: (cat: string) => void;
}

interface CategoryCard {
  title: string;
  subtitle: string;
  image: string;
  itemCount: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    title: 'Formal & Black Tie',
    subtitle: 'Bespoke Tuxedos & Vicuña Blazers',
    image: '/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg',
    itemCount: '12 Masterpieces',
  },
  {
    title: 'Luxury Essentials',
    subtitle: 'Cashmere Trench Coats & Sea Island Shirts',
    image: '/assets/men/shirts/clean-beige-shirt-outfit-for-everyday-style.jpeg',
    itemCount: '18 Garments',
  },
  {
    title: 'Footwear Atelier',
    subtitle: 'Wholecut Calfskin Oxfords & Chelsea Boots',
    image: '/assets/men/shoes/campus-men-s-white-green-camp-clint-sneakers-clean-everyday-style.jpeg',
    itemCount: '9 Styles',
  },
  {
    title: 'Accessories & Horology',
    subtitle: 'Tourbillon Timepieces & Titanium Eyewear',
    image: '/assets/men/watches/patek-philippe-nautilus-watch-ref-5610-1p-001-boodles.jpeg',
    itemCount: '15 Objects',
  },
  {
    title: 'Travel & Luggage',
    subtitle: 'Tuscan Leather Holdalls & Passport Cases',
    image: '/assets/women/handbags/vintage-luxury-shoulder-bag.jpeg',
    itemCount: '8 Companions',
  },
  {
    title: 'Couture Streetwear',
    subtitle: 'Silk-Merino Hoodies & Oversized Knits',
    image: '/assets/men/tshirts/porche-911-gt3-oversized-t-shirt-240-gsm-premium-cotton-unisex-porsche-911-911gt3-t-shirt-oversizedtshirt-cartshirt-porsche911-aeio-porsche911-porschelife-911gtrs-carenthusiast-supercarstyle-por.jpeg',
    itemCount: '10 Silhouettes',
  },
  {
    title: 'Haute Eyewear & Optics',
    subtitle: 'Japanese Beta-Titanium Frames & Optics',
    image: '/assets/men/sunglasses/casual-summer-men-sunglasses-outfit.jpeg',
    itemCount: '6 Specs',
  },
  {
    title: 'Performance Athleisure',
    subtitle: 'Zegna Tech-Wool Joggers & Cargo Pants',
    image: '/assets/men/cargos/cargo-style-denim-jeans.jpeg',
    itemCount: '7 Items',
  },
];

export const SignatureCollection: React.FC<SignatureCollectionProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-24 bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059]">
              EIGHT CURATED PILLARS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#F8F9FA] mt-2 font-normal">
              Signature <br />
              <span className="italic font-light text-[#C5A059] font-serif">Atelier Pillars</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-light text-[#EFECE6]/70 max-w-md">
            Each category embodies a distinct architectural philosophy, unifying raw luxury fibers with contemporary silhouettes.
          </p>
        </div>

        {/* 8 Categories Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              onClick={() => onSelectCategory(cat.title.split(' ')[0])}
              className="group relative aspect-[3/4] w-full overflow-hidden rounded border border-[#1F2128] hover:border-[#C5A059]/50 cursor-pointer bg-[#121316] flex flex-col justify-between p-6 transition-all duration-500 shadow-xl"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.6] contrast-105 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/20 to-transparent" />

              {/* Top Tag */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[9px] font-mono tracking-widest text-[#C5A059] bg-[#08080A]/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#1F2128] uppercase">
                  {cat.itemCount}
                </span>
                <div className="p-2 bg-[#08080A]/80 backdrop-blur-md rounded-full text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-[#08080A] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 space-y-1">
                <h3 className="font-serif text-xl text-[#F8F9FA] group-hover:text-[#C5A059] transition-colors uppercase">
                  {cat.title}
                </h3>
                <p className="text-xs font-light text-[#EFECE6]/70 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
