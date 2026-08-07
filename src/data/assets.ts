/**
 * Centralized Asset Architecture Registry
 * Maps organized asset paths for Men's and Women's luxury collections,
 * campaign imagery, 3D models, textures, and video streams.
 */

export interface AssetCategory {
  id: string;
  name: string;
  gender: 'men' | 'women' | 'unisex';
  folder: string;
  heroImage: string;
  description: string;
}

export const CATEGORY_ASSET_MAP: Record<string, AssetCategory[]> = {
  men: [
    {
      id: 'men-suits',
      name: 'Suits & Tailoring',
      gender: 'men',
      folder: '/assets/men/jackets',
      heroImage: '/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg',
      description: 'Mayfair bespoke suits hand-sculpted from Vicuña and worsted flannel.'
    },
    {
      id: 'men-shirts',
      name: 'Bespoke Shirts & Polos',
      gender: 'men',
      folder: '/assets/men/shirts',
      heroImage: '/assets/men/shirts/clean-beige-shirt-outfit-for-everyday-style.jpeg',
      description: 'West Indian Sea Island 200s cotton shirts with mother-of-pearl buttons.'
    },
    {
      id: 'men-tshirts',
      name: 'Graphic & Oversized Tees',
      gender: 'men',
      folder: '/assets/men/tshirts',
      heroImage: '/assets/men/tshirts/porche-911-gt3-oversized-t-shirt-240-gsm-premium-cotton-unisex-porsche-911-911gt3-t-shirt-oversizedtshirt-cartshirt-porsche911-aeio-porsche911-porschelife-911gtrs-carenthusiast-supercarstyle-por.jpeg',
      description: 'Heavyweight 300 GSM Peruvian Pima cotton graphic streetwear tees.'
    },
    {
      id: 'men-shoes',
      name: 'Footwear & Oxfords',
      gender: 'men',
      folder: '/assets/men/shoes',
      heroImage: '/assets/men/shoes/campus-men-s-white-green-camp-clint-sneakers-clean-everyday-style.jpeg',
      description: 'Wholecut French box-calfskin oxfords and hand-welted sneakers.'
    },
    {
      id: 'men-watches',
      name: 'Timepieces & Horology',
      gender: 'men',
      folder: '/assets/men/watches',
      heroImage: '/assets/men/watches/patek-philippe-nautilus-watch-ref-5610-1p-001-boodles.jpeg',
      description: 'Titanium tourbillon timepieces with crocodile leather straps.'
    },
    {
      id: 'men-cargos',
      name: 'Tech-Wool Cargo Pants',
      gender: 'men',
      folder: '/assets/men/cargos',
      heroImage: '/assets/men/cargos/cargo-style-denim-jeans.jpeg',
      description: 'Utilitarian cargo functionality merged with Zegna tech-merino luxury.'
    },
    {
      id: 'men-sunglasses',
      name: 'Haute Eyewear & Optics',
      gender: 'men',
      folder: '/assets/men/sunglasses',
      heroImage: '/assets/men/sunglasses/casual-summer-men-sunglasses-outfit.jpeg',
      description: 'Japanese beta-titanium frames with ZEISS polarized optics.'
    }
  ],
  women: [
    {
      id: 'women-dresses',
      name: 'Couture Gowns & Evening Wear',
      gender: 'women',
      folder: '/assets/women/dresses',
      heroImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1200',
      description: 'Floor-length silk chiffon gowns and structured velvet corsetry.'
    },
    {
      id: 'women-handbags',
      name: 'Handbags & Leather Goods',
      gender: 'women',
      folder: '/assets/women/handbags',
      heroImage: '/assets/women/handbags/vintage-luxury-shoulder-bag.jpeg',
      description: 'Hand-stitched calfskin tote bags and exotic python minaudieres.'
    },
    {
      id: 'women-heels',
      name: 'Stiletto Heels & Pumps',
      gender: 'women',
      folder: '/assets/women/heels',
      heroImage: '/assets/men/shoes/comfy-white-sneakers-shoes-for-women.jpeg',
      description: 'Sculptural 105mm heels in nappa leather with champagne gold hardware.'
    },
    {
      id: 'women-jewellery',
      name: 'High Fine Jewellery',
      gender: 'women',
      folder: '/assets/women/jewellery',
      heroImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1200',
      description: '18k rose gold necklaces with VS1 ethically sourced diamonds.'
    }
  ]
};

export const LOCAL_ASSET_REGISTRY = {
  watches: [
    '/assets/men/watches/patek-philippe-nautilus-watch-ref-5610-1p-001-boodles.jpeg',
    '/assets/men/watches/black-pvd-nautilus-by-patek-philippe-luxury-watch-timepiece-raacks-raackscom.jpeg',
    '/assets/men/watches/fossil-neutra-men-s-chronograph-watch-with-stainless-steel-bracelet-or-genuine-leather-band.jpeg',
    '/assets/men/watches/luxury-black-gold-men-s-watch-premium-dress-watch-for-old-money-style-2026.jpeg',
    '/assets/men/watches/casio-men-s-three-hand-quartz-silver-tone-stainless-steel-watch-38-5mm-macy-s.jpeg',
    '/assets/men/watches/emporio-armani-sr-2434-mens-cnronogrph-date-bracelet-strap-watch.jpeg',
    '/assets/men/watches/watch2/garmin-marq-watch-athlete-gen-2-carbon-smartwatch.jpeg',
    '/assets/men/watches/watch2/glycine-watch-airman-42-gl0070-c-w-sellors-luxury-watches.jpeg',
    '/assets/men/watches/watch2/reservoir-watch-gt-tour-carbon-limited-edition-rsv11-gt-530-11-c-w-sellors-luxury-watches.jpeg'
  ],
  tuxedos: [
    '/assets/men/jackets/classic-grey-double-breasted-elegance.jpeg',
    '/assets/men/jackets/black-tuxedo-suit-for-men-3-piece-wedding-suit-groom-tuxedo-set-formal-prom-suit-slim-fit-black-dinn.jpeg',
    '/assets/men/jackets/breasted-suit-men.jpeg',
    '/assets/men/jackets/brown-stripes-suit-with-beige-and-cream-pant.jpeg',
    '/assets/men/jackets/dressed-in-sophistication-tailored-to-perfection-class-is-timeless-and-a-sharp-double-breaste.jpeg'
  ],
  shirts: [
    '/assets/men/shirts/clean-beige-shirt-outfit-for-everyday-style.jpeg',
    '/assets/men/shirts/light-blue-hooded-shirt-outfit-for-men-casual-summer-fashion.jpeg',
    '/assets/men/shirts/men-s-premium-black-textured-casual-shirt-minimal-stylish-summer-outfit.jpeg',
    '/assets/men/shirts/minimal-grey-hooded-shirt-for-men-casual-summer-outfit-under.jpeg',
    '/assets/men/shirts/premium-grey-striped-linen-shirt-minimalist-men-s-fashion-essential.jpeg'
  ],
  tshirts: [
    '/assets/men/tshirts/porche-911-gt3-oversized-t-shirt-240-gsm-premium-cotton-unisex-porsche-911-911gt3-t-shirt-oversizedtshirt-cartshirt-porsche911-aeio-porsche911-porschelife-911gtrs-carenthusiast-supercarstyle-por.jpeg',
    '/assets/men/tshirts/shadow-ronin-katana-oversized-t-shirt-minimal-japanese-streetwear-black-graphic-tee-dm-to-buy.jpeg',
    '/assets/men/tshirts/shadow-warrior-oversized-graphic-t-shirt-japanese-streetwear-anime-style-tee.jpeg',
    '/assets/men/tshirts/zoro-anime-oversized-t-shirt-aesthetic-streetwear-trending-anime-fashion-for-men.jpeg',
    '/assets/men/tshirts/blusa-oversized-tokyo-street-style-super-estilosa.jpeg'
  ],
  shoes: [
    '/assets/men/shoes/campus-men-s-white-green-camp-clint-sneakers-clean-everyday-style.jpeg',
    '/assets/men/shoes/clean-white-sneakers-aesthetic-minimal-fashion-footwear.jpeg',
    '/assets/men/shoes/grey-casual-sneakers-for-men-women-comfortable-everyday-trainers-amazon-uk.jpeg',
    '/assets/men/shoes/us-polo-assn-white-sneakers-for-men-casual-sneakers-outfit-ideas-everyday-stylish-shoes.jpeg',
    '/assets/men/shoes/comfy-white-sneakers-shoes-for-women.jpeg'
  ],
  handbags: [
    '/assets/women/handbags/vintage-luxury-shoulder-bag.jpeg',
    '/assets/women/handbags/minimalist-leather-tote-bag.jpeg',
    '/assets/women/handbags/luxury-black-quilted-handbag.jpeg'
  ],
  sunglasses: [
    '/assets/men/sunglasses/casual-summer-men-sunglasses-outfit.jpeg',
    '/assets/men/sunglasses/stealth-black-aviator-sunglasses.jpeg'
  ],
  cargos: [
    '/assets/men/cargos/cargo-style-denim-jeans.jpeg',
    '/assets/men/cargos/tactical-black-luxury-cargo.jpeg'
  ]
};

export const LUXURY_CAMPAIGN_VIDEOS = {
  heroCinematic: '/assets/videos/landing-video.mp4',
  craftsmanshipLoop: '/assets/videos/landing-video.mp4',
  catwalkShowcase: '/assets/videos/landing-video.mp4'
};

