import React from 'react';
import { motion } from 'motion/react';
import { LOOKBOOK_STORIES } from '../data/lookbook';
import { Product } from '../types';
import { Sparkles, ArrowRight, Camera } from 'lucide-react';

interface LookbookProps {
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onOpenAIStylist: () => void;
}

export const Lookbook: React.FC<LookbookProps> = ({
  products,
  onSelectProduct,
  onOpenAIStylist,
}) => {
  return (
    <section id="lookbook" className="py-24 bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#C5A059]">
              EDITORIAL JOURNAL & LOOKBOOKS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#F8F9FA] mt-2 font-normal">
              Cinematic <br />
              <span className="italic font-light text-[#C5A059] font-serif">Fashion Stories</span>
            </h2>
          </div>
          <button
            onClick={onOpenAIStylist}
            className="px-6 py-3 bg-[#121316] border border-[#C5A059]/40 hover:border-[#C5A059] text-[#C5A059] hover:text-[#F8F9FA] font-light text-xs tracking-[0.2em] uppercase rounded flex items-center gap-2 cursor-pointer transition-all self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Generate Outfit with AI</span>
          </button>
        </div>

        {/* Stories List */}
        <div className="space-y-24">
          {LOOKBOOK_STORIES.map((story, index) => {
            const tagged = products.filter((p) => story.taggedProducts.includes(p.id));

            return (
              <div
                key={story.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Editorial Image */}
                <div
                  className={`lg:col-span-7 relative group overflow-hidden rounded border border-[#1F2128] ${
                    index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-6 left-6 bg-[#08080A]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#1F2128] text-[10px] font-mono text-[#C5A059] uppercase">
                      {story.season}
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] font-mono text-[#EFECE6]/70">
                      <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{story.photographer}</span>
                    </div>
                  </div>
                </div>

                {/* Editorial Copy & Tagged Products */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A059]">
                      {story.subtitle}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#F8F9FA] mt-1 uppercase">
                      {story.title}
                    </h3>
                  </div>

                  <blockquote className="text-sm font-light text-[#EFECE6] italic font-serif border-l-2 border-[#C5A059] pl-4 py-1 leading-relaxed">
                    "{story.quote}"
                  </blockquote>

                  {/* Tagged Items List */}
                  {tagged.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-[#1F2128]">
                      <p className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase">
                        SHOP THE EDITORIAL LOOK
                      </p>
                      <div className="space-y-2">
                        {tagged.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => onSelectProduct(item)}
                            className="p-3 bg-[#121316] hover:bg-[#1F2128] border border-[#1F2128] hover:border-[#C5A059]/40 rounded flex items-center justify-between cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 object-cover rounded border border-[#1F2128]"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <p className="font-serif text-xs text-[#F8F9FA] line-clamp-1">
                                  {item.name}
                                </p>
                                <p className="text-[10px] font-mono text-[#C5A059]">
                                  ${item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
