import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy GoogleGenAI initialization
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    genAIClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", brand: "AURELIUS & CO." });
});

// AI Stylist Endpoint (Exclusively for Men's Couture)
app.post("/api/ai-stylist", async (req, res) => {
  const { occasion, season, budget, colorScheme, prompt } = req.body;

  const fallbackStylistResponse = {
    title: `The Mayfair Gentleman - ${occasion || 'Executive'} Ensemble`,
    concept: "A masterclass in masculine structure and quiet authority. Perfectly balanced proportions pairing tactile Vicuña and worsted wool with precision accessories.",
    occasion: occasion || 'Business',
    budgetRange: budget || 'Executive ($2,500 - $5,000)',
    colorMatchingNotes: colorScheme || 'Monochromatic OLED Black & Gold',
    palette: ["#08080A OLED Black", "#2C3539 Charcoal", "#C5A059 Champagne Gold"],
    items: [
      {
        category: "Shirt / Top",
        name: "Sea Island Cotton 200s Spread-Collar Shirt",
        fabric: "100% West Indian Sea Island Cotton",
        stylingNotes: "Structured collar stiffeners inserted; hand-rolled French cuffs",
        price: 650
      },
      {
        category: "Pants / Bottom",
        name: "Pleated High-Waisted Worsted Flannel Trousers",
        fabric: "100% English Worsted Flannel",
        stylingNotes: "Extended side waist cinchers; 5cm turn-up cuff hem",
        price: 1450
      },
      {
        category: "Shoes / Footwear",
        name: "Wholecut French Calfskin Oxford Shoes",
        fabric: "Full-Grain French Box Calfskin",
        stylingNotes: "Mirror-shine polished toe cap with oak-bark leather sole",
        price: 1950
      },
      {
        category: "Watch",
        name: "AURELIUS Chrono Tourbillon Titanium 42mm",
        fabric: "Grade 5 Titanium & 18k Gold",
        stylingNotes: "Manual wind Calibre A-900 with alligator strap",
        price: 24500
      },
      {
        category: "Sunglasses",
        name: "Japan Beta-Titanium Polarized Sunglasses",
        fabric: "Beta Titanium & ZEISS Optics",
        stylingNotes: "Gold leaf filigree on rim edge",
        price: 880
      },
      {
        category: "Belt",
        name: "Full-Grain Calfskin Dress Belt",
        fabric: "Box Calfskin & Solid Champagne Brass",
        stylingNotes: "32mm width matching shoe patina",
        price: 520
      },
      {
        category: "Wallet",
        name: "Crocodile Leather Slim Cardholder",
        fabric: "Certified Porosus Crocodile Skin",
        stylingNotes: "Hand-lacquered edges with RFID shielding",
        price: 780
      },
      {
        category: "Perfume / Cologne",
        name: "No. IX Smoked Frankincense & Amber Oud 100ml",
        fabric: "25% Eau de Parfum Extract",
        stylingNotes: "Apply to pulse points prior to buttoning shirt",
        price: 420
      },
      {
        category: "Accessories",
        name: "18k Champagne Gold & Onyx Cufflinks",
        fabric: "18k Gold & Black Onyx",
        stylingNotes: "Secured into French cuffs for subtle wrist detail",
        price: 1450
      }
    ],
    groomingAndFragrance: "Pair with AURELIUS No. IX Smoked Oud & White Suede cologne alongside Mayfair Imperial Sandalwood Beard Oil.",
    atelierNote: "Our Mayfair Atelier can schedule a private fitting at your residence or hotel suite."
  };

  try {
    const userPrompt = prompt || `Assemble a complete 9-piece men's luxury outfit for occasion: "${occasion || 'Business'}", season: "${season || 'Autumn / Winter'}", budget range: "${budget || 'Executive'}", color scheme: "${colorScheme || 'Monochromatic Black & Gold'}".`;

    const systemInstruction = `You are Senior Couture Director and Chief Personal Stylist at AURELIUS & CO., the world's most prestigious luxury menswear house in London Mayfair.
Your styling advice is strictly for MEN. You assemble complete head-to-toe outfits for gentlemen.

When recommending outfits, you MUST return valid JSON with exactly 9 items in the "items" array covering these 9 exact categories for men:
1. Shirt / Top
2. Pants / Bottom
3. Shoes / Footwear
4. Watch
5. Sunglasses
6. Belt
7. Wallet
8. Perfume / Cologne
9. Accessories (e.g. Cufflinks, Pocket Square, or Leather Bag)

JSON format schema:
{
  "title": "Evocative male ensemble name (e.g. 'The Mayfair Boardroom Armor')",
  "concept": "A 2-3 sentence editorial summary explaining the aesthetic philosophy and masculine silhouette",
  "occasion": "The occasion e.g. Office, College, Date Night, Wedding, Casual, Business, Gym, Airport Look, Vacation, Winter, Summer",
  "budgetRange": "Budget range",
  "colorMatchingNotes": "Color harmony advice",
  "palette": ["Color 1 e.g. #08080A OLED Black", "Color 2 e.g. #C5A059 Champagne Gold", "Color 3 e.g. #2C3539 Charcoal"],
  "items": [
    {
      "category": "Shirt / Top | Pants / Bottom | Shoes / Footwear | Watch | Sunglasses | Belt | Wallet | Perfume / Cologne | Accessories",
      "name": "Luxurious item name",
      "fabric": "Material & Origin",
      "stylingNotes": "Sartorial guidance on how to wear it",
      "price": number
    }
  ],
  "groomingAndFragrance": "Specific male fragrance and grooming notes",
  "atelierNote": "Bespoke tailoring or fitting tip"
}
Ensure output is strictly valid JSON without markdown code blocks.`;

    if (!process.env.GEMINI_API_KEY) {
      return res.json(fallbackStylistResponse);
    }

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch {
      return res.json(fallbackStylistResponse);
    }
  } catch (error: any) {
    console.warn("AI Stylist API notice (falling back gracefully):", error?.message || error);
    return res.json(fallbackStylistResponse);
  }
});

// Fabric Analysis Endpoint
app.post("/api/fabric-analysis", async (req, res) => {
  const fallbackFabricResponse = {
    history: "Harvested under official conservation protection in the Peruvian Andes, this fiber was historically reserved exclusively for Inca Royalty.",
    tactileFeel: "Unrivaled ethereal softness measuring 12.5 microns, trapping air micro-pockets for featherlight insulation.",
    durabilityGrade: "Heirloom grade, requiring specialized velvet steam treatment and master dry cleaning.",
    recommendedCare: "Professional eco-friendly dry clean only. Store in breathable cedar boxes.",
    quote: "Wearing Vicuña is touching the whisper of natural perfection."
  };

  try {
    const { fabricName } = req.body;
    const prompt = `Provide a luxurious 150-word deep-dive editorial analysis of the rare fabric "${fabricName || 'Vicuña Fleece'}". Cover tactile feel, origin, microscopic weave structure, warmth-to-weight ratio, and why it represents the absolute pinnacle of luxury menswear. Return JSON with keys: "history", "tactileFeel", "durabilityGrade", "recommendedCare", "quote".`;

    if (!process.env.GEMINI_API_KEY) {
      return res.json(fallbackFabricResponse);
    }

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.warn("Fabric analysis API notice (falling back gracefully):", error?.message || error);
    return res.json(fallbackFabricResponse);
  }
});

// Fashion News Endpoint with In-Memory Caching & Gemini Search Grounding
let newsCache: { data: any; timestamp: number } | null = null;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour cache
const FAILURE_CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutes cache on rate limit failure

app.get("/api/fashion-news", async (req, res) => {
  const forceRefresh = req.query.refresh === "true";
  const now = Date.now();

  // Return cached data if valid and not forcing refresh
  if (!forceRefresh && newsCache && (now - newsCache.timestamp < CACHE_DURATION_MS)) {
    return res.json(newsCache.data);
  }

  const fallbackNews = [
    {
      title: "The Resurgence of Bespoke Canvassing in Paris & Mayfair",
      summary: "Master tailors report a 40% surge in demand for unconstructed Vicuña blazers, as global luxury connoisseurs prioritize tactile discretion over overt logos.",
      source: "Vogue Haute Couture Review",
      url: "https://www.vogue.com/fashion-shows",
      timeAgo: "2 hours ago",
      tag: "HAUTE COUTURE",
      grounded: false
    },
    {
      title: "Micro-Sourcing Andean Vicuña: Ethical Conservation Standards 2026",
      summary: "International wildlife registries establish strict 12.5-micron certification protocols for raw fleece harvested under Andean indigenous cooperative stewardship.",
      source: "Financial Times Luxury Special",
      url: "https://www.ft.com/style",
      timeAgo: "5 hours ago",
      tag: "TEXTILE INNOVATION",
      grounded: false
    },
    {
      title: "Architectural Tailoring Dominates Autumn / Winter Runway Debuts",
      summary: "Sharp structured shoulders, hidden horn buttoning, and liquid drape wool-cashmere trousers redefine power dressing across London and Milan.",
      source: "Robb Report Style Intelligence",
      url: "https://robbreport.com/style",
      timeAgo: "1 day ago",
      tag: "RUNWAY TRENDS",
      grounded: false
    },
    {
      title: "Savile Row Digital Ateliers: Merging AI Styling with Hand-Welting",
      summary: "Historic Mayfair houses adopt high-precision 3D fabric simulations to allow bespoke clientele worldwide to visualize bespoke garments prior to first fitting.",
      source: "GQ Style Gazette",
      url: "https://www.gq.com/style",
      timeAgo: "2 days ago",
      tag: "MAYFAIR HERITAGE",
      grounded: false
    }
  ];

  try {
    if (!process.env.GEMINI_API_KEY) {
      const result = { news: fallbackNews, isGrounded: false };
      newsCache = { data: result, timestamp: now };
      return res.json(result);
    }

    const ai = getGenAI();
    const prompt = `Perform a live web search on luxury fashion, high-end menswear trends, haute couture runway news, and bespoke Savile Row tailoring. 
Return JSON in the exact format:
{
  "news": [
    {
      "title": "Headline",
      "summary": "2-sentence editorial summary",
      "source": "Publication name",
      "url": "Direct reference link or search topic URL",
      "timeAgo": "e.g. 'Just Now' or '3 hours ago'",
      "tag": "e.g. HAUTE COUTURE | RUNWAY TRENDS | MAYFAIR HERITAGE | TEXTILE SCIENCE"
    }
  ]
}
Ensure exactly 4 relevant, high-status luxury fashion items.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      },
    });

    const groundedChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const citations = groundedChunks.map((c: any) => ({
      title: c.web?.title || "Search Result",
      url: c.web?.uri || "https://google.com/search?q=luxury+fashion+news"
    })).filter((c: any) => c.url);

    let parsedNews: any[] = [];
    try {
      const parsed = JSON.parse(response.text || "{}");
      if (Array.isArray(parsed.news)) {
        parsedNews = parsed.news;
      }
    } catch {
      parsedNews = fallbackNews;
    }

    // Attach real grounded citation URLs if available
    if (parsedNews.length > 0 && citations.length > 0) {
      parsedNews = parsedNews.map((item, idx) => ({
        ...item,
        url: citations[idx % citations.length]?.url || item.url,
        source: citations[idx % citations.length]?.title || item.source,
        grounded: true
      }));
    }

    const result = {
      news: parsedNews.length > 0 ? parsedNews : fallbackNews,
      isGrounded: citations.length > 0,
      citationsCount: citations.length
    };

    newsCache = { data: result, timestamp: now };
    return res.json(result);
  } catch (error: any) {
    const isQuotaError = error?.message?.includes("429") || error?.message?.includes("RESOURCE_EXHAUSTED");
    if (isQuotaError) {
      console.log("[Notice] Gemini API quota reached. Serving curated haute couture dispatches with 10-minute caching.");
    } else {
      console.warn("Fashion news notice (serving fallback):", error?.message || error);
    }

    const fallbackResult = { news: fallbackNews, isGrounded: false };
    // Cache the fallback response for 10 minutes to avoid hitting rate limits repeatedly
    newsCache = { data: fallbackResult, timestamp: now - CACHE_DURATION_MS + FAILURE_CACHE_DURATION_MS };
    return res.json(fallbackResult);
  }
});

// Vite server configuration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AURELIUS & CO.] Luxury flagship server listening on http://localhost:${PORT}`);
  });
}

startServer();
