import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Newspaper, ExternalLink, RefreshCw, Globe, CheckCircle2, Sparkles } from 'lucide-react';

interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  timeAgo: string;
  tag: string;
  grounded?: boolean;
}

export const FashionNewsWidget: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGrounded, setIsGrounded] = useState(false);
  const [citationsCount, setCitationsCount] = useState(0);

  const fetchNews = async (force: boolean = false) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/fashion-news${force ? '?refresh=true' : ''}`);
      const data = await res.json();
      if (data.news && Array.isArray(data.news)) {
        setNews(data.news);
        setIsGrounded(!!data.isGrounded);
        setCitationsCount(data.citationsCount || 0);
      }
    } catch (err) {
      console.error('Failed to fetch fashion news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <section className="py-20 bg-[#08080A] text-[#F8F9FA] border-t border-[#1F2128] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono tracking-extra uppercase text-[#C5A059] glass-card px-3 py-1 rounded-full border border-[#C5A059]/30 flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-[#C5A059]" />
                LIVE SEARCH GROUNDING • GLOBAL LUXURY GAZETTE
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl uppercase tracking-tight text-[#F8F9FA] font-normal">
              Fashion News & <br />
              <span className="italic font-light text-[#C5A059] font-serif">Haute Couture Intelligence</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                GROUNDING STATUS
              </p>
              <p className="text-xs font-mono text-[#C5A059] flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {isGrounded ? `Live Web Sources (${citationsCount})` : 'Curated Atelier Dispatch'}
              </p>
            </div>

            <button
              onClick={() => fetchNews(true)}
              disabled={loading}
              data-cursor-text="REFRESH"
              className="p-3 glass-card hover:border-[#C5A059] text-white/80 hover:text-[#C5A059] rounded-full transition-colors duration-300 disabled:opacity-50 cursor-pointer"
              title="Refresh Fashion Intelligence"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#C5A059]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content News Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="glass-card p-6 rounded-lg space-y-4 animate-pulse border border-white/5"
              >
                <div className="h-4 bg-white/10 rounded w-1/3" />
                <div className="h-6 bg-white/10 rounded w-3/4" />
                <div className="h-16 bg-white/5 rounded w-full" />
                <div className="h-4 bg-white/10 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                data-cursor-text="READ"
                className="group glass-card p-6 rounded-lg border border-white/10 hover:border-[#C5A059]/60 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-extra uppercase text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/30 px-2 py-0.5 rounded">
                      {item.tag || 'HAUTE COUTURE'}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      {item.timeAgo}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#F8F9FA] group-hover:text-[#C5A059] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs font-light text-white/70 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/50 truncate max-w-[160px]">
                    <Sparkles className="w-3 h-3 text-[#C5A059] shrink-0" />
                    <span className="truncate">{item.source}</span>
                  </div>

                  <a
                    href={item.url || 'https://www.vogue.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-white/50 hover:text-[#C5A059] transition-colors cursor-pointer"
                    title="Open Source Article"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
