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

// AI Stylist Endpoint
app.post("/api/ai-stylist", async (req, res) => {
  const fallbackStylistResponse = {
    title: "The Mayfair Executive Ensemble",
    concept: "A masterclass in quiet authority. Sharp peak lapels paired with seamless Vicuña trousers and polished Chelsea boots in burnished espresso calfskin.",
    palette: ["#0B0C10 OLED Black", "#2C3539 Charcoal", "#C5A059 Champagne Gold"],
    items: [
      {
        category: "Jacket / Outerwear",
        name: "Bespoke Peak-Lapel Double-Breasted Jacket",
        fabric: "Loro Piana Super 180s Wool & Vicuña Blend",
        stylingNotes: "Keep the bottom button unfastened; ensure cuff displays 1.5 cm of shirt linen",
        price: 5200
      },
      {
        category: "Shirt / Knitwear",
        name: "Sea Island Cotton Spread-Collar Dress Shirt",
        fabric: "100% Giza 87 Egyptian Cotton (200s Two-Ply)",
        stylingNotes: "Structured collar stiffeners inserted; hand-rolled cuffs",
        price: 850
      },
      {
        category: "Trousers",
        name: "Pleated High-Waisted Tailored Trousers",
        fabric: "English Worsted Flannel",
        stylingNotes: "Side waist adjusters cinched without belt loops for a clean waistline",
        price: 1450
      },
      {
        category: "Footwear",
        name: "Hand-Welted Wholecut Oxford Shoes in Espresso",
        fabric: "Full-Grain French Calfskin",
        stylingNotes: "Mirror-shine polished toe cap with high-density leather sole",
        price: 1950
      },
      {
        category: "Accessories",
        name: "AURELIUS Chrono Tourbillon & Silk Pocket Square",
        fabric: "18k Rose Gold & Mulberry Silk Hand-Rolled Edge",
        stylingNotes: "Folded casually into chest pocket with subtle point exposure",
        price: 18500
      }
    ],
    groomingAndFragrance: "AURELIUS No. IX - Vetiver, Smoked Frankincense, and Tuscan Amber.",
    atelierNote: "Our Mayfair Atelier can schedule a private fitting at your residence or hotel suite."
  };

  try {
    const { occasion, weather, stylePreference, prompt } = req.body;

    const userPrompt = prompt || `Assemble an ultra-luxury outfit for occasion: "${occasion || 'Business Executive'}", weather: "${weather || 'Autumn Temperate'}", style preference: "${stylePreference || 'Monochromatic Minimalist'}".`;

    const systemInstruction = `You are Senior Couture Director and Chief Personal Stylist at AURELIUS & CO., the world's most prestigious luxury menswear house in London Mayfair.
Your styling advice is highly refined, architectural, elegant, precise, and authoritative.
When recommending outfits, return JSON with:
{
  "title": "A short, evoke name for the ensemble (e.g. 'The Mayfair Boardroom Armor')",
  "concept": "A 2-3 sentence editorial summary explaining the aesthetic philosophy and silhouette",
  "palette": ["Color Name 1 with Hex e.g. #111111 OLED Black", "Color Name 2 e.g. #C5A059 Champagne Gold", "Color Name 3 e.g. #2C3539 Charcoal"],
  "items": [
    {
      "category": "Jacket / Outerwear | Shirt / Knitwear | Trousers | Footwear | Accessories",
      "name": "Specific luxurious item name (e.g. 'Hand-Padded Double-Breasted Cashmere Blazer in Midnight Navy')",
      "fabric": "Material & Origin (e.g. 'Loro Piana Super 180s Cashmere & Vicuña')",
      "stylingNotes": "How to wear or button it",
      "price": number (in USD, e.g. 4800)
    }
  ],
  "groomingAndFragrance": "Specific fragrance and grooming notes (e.g., 'Pair with AURELIUS No. V Smoked Oud & White Suede')",
  "atelierNote": "A bespoke tailoring tip or fitting custom detail"
}
Ensure the output is strictly valid JSON without markdown code fences.`;

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
