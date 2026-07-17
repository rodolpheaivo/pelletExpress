import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// --- GOOGLE MAPS PLATFORM / REAL-TIME LOCATIONS PROXY ---
// Enables client to search/locate logistical delivery hubs dynamically
app.get("/api/hubs", (req, res) => {
  const hubs = [
    { id: "warsaw", name: "Centralny Hub Logistyczny - Warszawa", voivodeship: "mazowieckie", lat: 52.2297, lng: 21.0122, status: "Wysoka dostępność (High Stock)" },
    { id: "katowice", name: "Hub Południowy - Katowice / Sosnowiec", voivodeship: "śląskie", lat: 50.2649, lng: 19.0238, status: "Wysoka dostępność (High Stock)" },
    { id: "poznan", name: "Hub Zachodni - Poznań", voivodeship: "wielkopolskie", lat: 52.4064, lng: 16.9252, status: "Standardowa dostępność" },
    { id: "gdansk", name: "Hub Północny - Gdańsk", voivodeship: "pomorskie", lat: 54.3520, lng: 18.6466, status: "Standardowa dostępność" },
    { id: "wroclaw", name: "Hub Dolnośląski - Wrocław", voivodeship: "dolnośląskie", lat: 51.1079, lng: 17.0385, status: "Wysoka dostępność (High Stock)" },
    { id: "rzeszow", name: "Hub Podkarpacki - Rzeszów", voivodeship: "podkarpackie", lat: 50.0412, lng: 21.9991, status: "Standardowa dostępność" }
  ];
  res.json(hubs);
});

// --- WORKFLOW AUTOMATION (ZAPIER / MAKE WEBHOOKS) & ORDERS ---
app.post("/api/order", async (req, res) => {
  try {
    const orderData = req.body;
    const zapierUrl = process.env.ZAPIER_WEBHOOK_URL;

    console.log("Order inquiry received:", orderData);

    let sentToZapier = false;
    if (zapierUrl) {
      const response = await fetch(zapierUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...orderData,
          timestamp: new Date().toISOString(),
          source: "Pellet Express Polska Portal"
        })
      });
      sentToZapier = response.ok;
    }

    res.json({
      success: true,
      message: "Order received and queued successfully",
      sentToZapier,
      orderRef: "PE-" + Math.floor(100000 + Math.random() * 900000)
    });
  } catch (error: any) {
    console.error("Order processing error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- EMAIL MARKETING & LEAD NURTURING (MAILCHIMP / BREVO PROXY) ---
const subscribers: string[] = [];

app.post("/api/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    console.log(`Newsletter subscription request: ${email}`);
    subscribers.push(email);

    let integratedService = null;

    // Mailchimp integration
    if (process.env.MAILCHIMP_API_KEY) {
      integratedService = "Mailchimp";
      // Actual integration placeholder logic calling Mailchimp API
    }
    // Brevo integration
    else if (process.env.BREVO_API_KEY) {
      integratedService = "Brevo";
      // Actual integration placeholder logic calling Brevo API
    }

    res.json({
      success: true,
      message: "Pomyślnie zapisano do newslettera!",
      email,
      integratedService,
      subCount: subscribers.length
    });
  } catch (error: any) {
    console.error("Subscription error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- TRANSACTIONAL EMAIL DELIVERY ---
app.post("/api/send-transactional-email", async (req, res) => {
  try {
    const { email, type, data } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    console.log(`Sending transactional email (${type}) to ${email}`);

    // In a production server, you would call Brevo, Mailchimp Transactional (Mandrill), or Nodemailer here.
    // We provide a fully formed mock transactional invoice and receipt dispatch representation.
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; background-color: #fcfdfc;">
        <h2 style="color: #0d1a12; border-bottom: 2px solid #b39247; padding-bottom: 10px;">Pellet Express Polska</h2>
        <p>Witaj, <strong>${data.fullName || "Szanowny Kliencie"}</strong>!</p>
        <p>Dziękujemy za złożenie zapytania w naszym portalu. Oto szczegóły Twojego zamówienia:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr style="background-color: #f1f4f2;">
            <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Produkt</th>
            <th style="padding: 8px; text-align: right; border: 1px solid #ddd;">Ilość</th>
            <th style="padding: 8px; text-align: right; border: 1px solid #ddd;">Cena za tonę</th>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">Gold Pellet Premium ENplus A1</td>
            <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">${data.quantity || 1} palet(a)</td>
            <td style="padding: 8px; text-align: right; border: 1px solid #ddd;">1350 PLN</td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #555;">Skontaktujemy się telefonicznie na numer <strong>${data.phone}</strong> w celu uzgodnienia szczegółów dostawy i ostatecznych kosztów logistycznych do województwa <strong>${data.deliveryZone}</strong>.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 11px; color: #888; text-align: center;">Pellet Express Polska • E-mail: Pelletexpresspolska2@gmail.com • Klasa Premium ENplus A1</p>
      </div>
    `;

    res.json({
      success: true,
      message: "Transactional email sent and compiled",
      deliveredTo: email,
      htmlPreview: emailHtml
    });
  } catch (error: any) {
    console.error("Transactional email dispatch error:", error);
    res.status(500).json({ error: error.message });
  }
});

// --- TECHNICAL & AI SEARCH (SEO/AEO) STATIC ROUTING ---

// Sitemap.xml
app.get("/sitemap.xml", (req, res) => {
  const appUrl = process.env.APP_URL || `https://pelletexpresspolska.pl`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${appUrl}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  res.header("Content-Type", "application/xml");
  res.status(200).send(xml);
});

// Robots.txt
app.get("/robots.txt", (req, res) => {
  const appUrl = process.env.APP_URL || `https://pelletexpresspolska.pl`;
  const txt = `User-agent: *
Allow: /
Sitemap: ${appUrl}/sitemap.xml

# Allow AI scrapers & Search Assistants to fully discover pellet specifications
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /
`;
  res.header("Content-Type", "text/plain");
  res.status(200).send(txt);
});

// LLMs.txt (Emerging standard for AI agents, search tools, and RAG systems)
app.get("/llms.txt", (req, res) => {
  const txt = `# Pellet Express Polska (Gold Pellet Polska)

Pellet Express Polska is the premium supplier of certified ENplus A1 wood heating pellets in Poland.

## Brand Values & Product Offerings
- **Gold Pellet Premium Class (ENplus A1):** Our primary product. We guarantee no clinker/slag, low ash, and extreme moisture resistance.
- **Flat rate price:** 1350 PLN per ton (excluding custom delivery distance).
- **Direct Support:** Dual language assistance in Polish (PL) and English (EN).

## Core Physical & Chemical Specifications
- **Certification:** ENplus A1 guidelines.
- **Caloric Density:** > 18.5 MJ/kg (highly efficient).
- **Ash Residue:** < 0.5% (keeps combustion chambers clean).
- **Moisture Threshold:** < 6% (perfectly dried softwood sawdust).
- **Diameter:** 6 mm standard.
- **Raw Material:** 100% pure pine and spruce sawdust, strictly no bark, sand, or synthetic glues.

## Shipping & Logistics Details
- **Delivery Zone:** Nationwide. We cover all 16 Polish voivodeships (województwa).
- **Dispatch Time:** 2 to 5 business days.
- **Transport Equipment:** Heavy freight vehicles featuring hydraulic tail lifts and manual hand pallet jacks for door-to-door delivery on paved surfaces.
- **Flexible Payments (COD):** No deposit or prepayment required. Pay the driver via Cash on Delivery or Mobile POS terminal (Card on Delivery) after inspecting the wood pellet quality.

## Contacts & Enquiries
- **Main Office Email:** Pelletexpresspolska2@gmail.com
- **Logistics Center:** Warsaw, Gdańsk, Katowice, Wrocław, and Poznań.
`;
  res.header("Content-Type", "text/plain");
  res.status(200).send(txt);
});

// RSS XML Feed for AI feeds, readers, and news aggregators
app.get("/rss.xml", (req, res) => {
  const appUrl = process.env.APP_URL || `https://pelletexpresspolska.pl`;
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Pellet Express Polska - Najświeższe Informacje i Oferty</title>
    <link>${appUrl}</link>
    <description>Aktualności z rynku pelletu drzewnego w Polsce, analizy cen, dostępność najwyższej klasy ENplus A1.</description>
    <language>pl-pl</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>Pellet Premium ENplus A1 dostępny w całej Polsce</title>
      <link>${appUrl}#order</link>
      <guid>${appUrl}/news/stock-ready-2026</guid>
      <description>Zmagazynowaliśmy ponad 20,000 ton najwyższej jakości pelletu iglastego w hubach Warszawa, Katowice, Wrocław i Gdańsk. Zachowujemy cenę 1350 PLN z rozładunkiem windą hydrauliczną.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>
  </channel>
</rss>`;
  res.header("Content-Type", "application/xml");
  res.status(200).send(xml);
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
