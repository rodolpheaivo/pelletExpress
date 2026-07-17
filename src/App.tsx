import { useState, useEffect, FormEvent } from 'react';
import {
  Flame,
  ShieldCheck,
  Truck,
  Phone,
  Mail,
  Globe,
  Calculator,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  FileText,
  Star,
  Award,
  DollarSign,
  MapPin,
  Calendar,
  Zap,
  Clock,
  ArrowRight,
  Lock,
  X,
  Users,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  Send,
  ExternalLink
} from 'lucide-react';
import { translations } from './translations';
import { Language } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('PL');
  const t = translations[lang];

  // Promotion banner state
  const [showPromo, setShowPromo] = useState<boolean>(true);

  // Live real-time counters states
  const [satisfiedCount, setSatisfiedCount] = useState<number>(1482);
  const [tonsCount, setTonsCount] = useState<number>(5187);
  const [activeCount, setActiveCount] = useState<number>(14);

  useEffect(() => {
    const timer = setInterval(() => {
      // Chance of incrementing customers: 15%
      const shouldAddCustomer = Math.random() < 0.15;
      if (shouldAddCustomer) {
        setSatisfiedCount(prev => prev + 1);
        // If customer is added, we also add some tons (e.g. between 1 and 3 tons)
        const addedTons = Math.floor(Math.random() * 3) + 1; // 1 to 3
        setTonsCount(prev => prev + addedTons);
      } else {
        // Chance of incrementing just tons: 20%
        const shouldAddTonsOnly = Math.random() < 0.20;
        if (shouldAddTonsOnly) {
          const addedTons = Math.floor(Math.random() * 2) + 1; // 1 to 2
          setTonsCount(prev => prev + addedTons);
        }
      }

      // Fluctuating active deliveries slightly (+1, -1, or 0)
      setActiveCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
        const nextValue = prev + change;
        return nextValue < 8 ? 8 : nextValue > 19 ? 19 : nextValue;
      });
    }, 7000); // Check every 7 seconds for a highly reactive and natural feel

    return () => clearInterval(timer);
  }, []);

  const counterLabels = {
    PL: {
      satisfiedTitle: "Zadowoleni klienci",
      satisfiedDesc: "Gospodarstwa domowe z ciepłem",
      tonsTitle: "Dostarczone tony",
      tonsDesc: "Certyfikowanego pelletu",
      activeTitle: "Aktywne dostawy dzisiaj",
      activeDesc: "Pojazdy w trasie w Polsce",
      liveText: "NA ŻYWO",
    },
    EN: {
      satisfiedTitle: "Satisfied Customers",
      satisfiedDesc: "Warm homes served",
      tonsTitle: "Tons Delivered",
      tonsDesc: "Of certified premium pellets",
      activeTitle: "Active Deliveries Today",
      activeDesc: "Trucks on route in Poland",
      liveText: "LIVE",
    }
  };

  // Toast notifications for social proof
  const [toastData, setToastData] = useState<{ name: string; city: string; pallets: number; time: string } | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    const polishNames = [
      "Mariusz", "Anna", "Piotr", "Krzysztof", "Jan", "Tomasz", "Andrzej", "Marcin", 
      "Michał", "Jakub", "Marek", "Łukasz", "Grzegorz", "Mateusz", "Wojciech", 
      "Katarzyna", "Agnieszka", "Małgorzata", "Karolina", "Barbara", "Paweł", "Rafał",
      "Sławomir", "Robert", "Jacek", "Ewa", "Zofia", "Krystyna", "Tadeusz"
    ];
    const polishCities = [
      "Warszawa", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Szczecin", 
      "Bydgoszcz", "Lublin", "Białystok", "Katowice", "Rzeszów", "Olsztyn", "Gdynia", 
      "Kielce", "Toruń", "Gliwice", "Częstochowa", "Radom", "Sosnowiec", "Piotrków Trybunalski",
      "Bielsko-Biała", "Koszalin", "Słupsk", "Opole", "Gorzów Wielkopolski", "Zielona Góra"
    ];

    const generateRandomToast = () => {
      const name = polishNames[Math.floor(Math.random() * polishNames.length)];
      const city = polishCities[Math.floor(Math.random() * polishCities.length)];
      const pallets = Math.floor(Math.random() * 6) + 2; // 2 to 7 pallets
      const timesPL = ["przed chwilą", "1 min temu", "2 minuty temu", "3 minuty temu", "5 minut temu"];
      const timesEN = ["just now", "1 min ago", "2 mins ago", "3 mins ago", "5 mins ago"];
      const timeIdx = Math.floor(Math.random() * timesEN.length);
      
      setToastData({
        name,
        city,
        pallets,
        time: lang === 'PL' ? timesPL[timeIdx] : timesEN[timeIdx]
      });
      setShowToast(true);

      // Auto-hide toast after 7 seconds
      const timeout = setTimeout(() => {
        setShowToast(false);
      }, 7000);

      return timeout;
    };

    // Trigger the first toast after 8 seconds
    let hideTimeout: any;
    const initialTimeout = setTimeout(() => {
      hideTimeout = generateRandomToast();
    }, 8000);

    // Then trigger periodically every 28 seconds
    const interval = setInterval(() => {
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = generateRandomToast();
    }, 28000);

    return () => {
      clearTimeout(initialTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
      clearInterval(interval);
    };
  }, [lang]);



  // Calculator State
  const [houseSize, setHouseSize] = useState<number>(150);
  const [insulation, setInsulation] = useState<'excellent' | 'good' | 'average' | 'poor'>('average');
  const [currentFuel, setCurrentFuel] = useState<'coal' | 'gas' | 'electric' | 'wood'>('coal');
  const [deviceType, setDeviceType] = useState<'pellet_stove' | 'pellet_boiler' | 'classic_stove' | 'classic_boiler'>('pellet_stove');
  const [calcResult, setCalcResult] = useState<{ tons: number; cost: number; savings: number }>({
    tons: 3.5,
    cost: 4725,
    savings: 1200
  });

  const deviceLabels = {
    PL: {
      pellet_stove: "Piecyk na pellet (sprawność ~92%)",
      pellet_boiler: "Kocioł na pellet (sprawność ~88%)",
      classic_stove: "Piecyk klasyczny / tradycyjny (sprawność ~75%)",
      classic_boiler: "Kocioł klasyczny / tradycyjny (sprawność ~65%)",
    },
    EN: {
      pellet_stove: "Pellet Stove (efficiency ~92%)",
      pellet_boiler: "Pellet Boiler (efficiency ~88%)",
      classic_stove: "Traditional Stove (efficiency ~75%)",
      classic_boiler: "Classic Boiler (efficiency ~65%)",
    }
  };

  // Order/Quote Form State
  const [quantity, setQuantity] = useState<number>(3);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [voivodeship, setVoivodeship] = useState<string>('Mazowieckie');
  const [deliveryMethod, setDeliveryMethod] = useState<string>('Standard z windą');
  const [paymentMethod, setPaymentMethod] = useState<string>('Płatność przy odbiorze');
  
  // UI States
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [copiedAds, setCopiedAds] = useState<string | null>(null);
  const [showAdsPlanner, setShowAdsPlanner] = useState<boolean>(false);

  // Integration States
  const [subscriberEmail, setSubscriberEmail] = useState<string>('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subMessage, setSubMessage] = useState<string>('');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [activeHub, setActiveHub] = useState<any>(null);
  const [hubs, setHubs] = useState<any[]>([]);
  const [orderId, setOrderId] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Polish Voivodeships list
  const voivodeships = [
    'Dolnośląskie', 'Kujawsko-Pomorskie', 'Lubelskie', 'Lubuskie',
    'Łódzkie', 'Małopolskie', 'Mazowieckie', 'Opolskie',
    'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie',
    'Świętokrzyskie', 'Warmińsko-Mazurskie', 'Wielkopolskie', 'Zachodniopomorskie'
  ];

  // Recalculate estimated pellets and savings
  useEffect(() => {
    // Basic thermal consumption multiplier in kWh per m² per year
    const insulationMultipliers = {
      excellent: 50,  // Passive/A+
      good: 90,       // Modern standard
      average: 140,   // Standard older
      poor: 210       // Uninsulated
    };

    const energyNeededKwh = houseSize * insulationMultipliers[insulation];
    
    // Device efficiencies
    const deviceEfficiencies = {
      pellet_stove: 0.92,
      pellet_boiler: 0.88,
      classic_stove: 0.75,
      classic_boiler: 0.65
    };

    const efficiency = deviceEfficiencies[deviceType];
    
    // 1 kg of ENplus A1 pellet has approx. 4.9 kWh energy output
    // Effective output is 4.9 * efficiency kWh/kg
    const pelletNeededKg = energyNeededKwh / (4.9 * efficiency);
    const pelletTons = parseFloat((pelletNeededKg / 1000).toFixed(1));
    const finalTons = pelletTons < 0.5 ? 0.5 : pelletTons;
    
    const cost = Math.round(finalTons * 1350);

    // Approximate comparison with current fuel costs
    const baseEnergyCost = energyNeededKwh;
    let comparisonCost = 0;
    switch (currentFuel) {
      case 'coal':
        comparisonCost = baseEnergyCost * 0.42; // coal average cost per kWh
        break;
      case 'gas':
        comparisonCost = baseEnergyCost * 0.48; // gas standard
        break;
      case 'electric':
        comparisonCost = baseEnergyCost * 0.95; // electric resistance
        break;
      case 'wood':
        comparisonCost = baseEnergyCost * 0.35; // wood average
        break;
    }

    const savings = Math.max(0, Math.round(comparisonCost - cost));

    setCalcResult({
      tons: finalTons,
      cost: cost,
      savings: savings > 0 ? savings : Math.round(cost * 0.15) // fallback to minimal 15% estimated efficiency gain
    });
  }, [houseSize, insulation, currentFuel, deviceType]);

  const handleApplyCalcToOrder = () => {
    // Set order quantity to the computed tons rounded up
    const roundedTons = Math.ceil(calcResult.tons);
    setQuantity(roundedTons);
    // Scroll smoothly to order form
    const element = document.getElementById('order-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch dynamic logistics hubs from the backend proxy
  useEffect(() => {
    fetch('/api/hubs')
      .then(res => res.json())
      .then(data => {
        setHubs(data);
        const matchingHub = data.find((h: any) => h.voivodeship.toLowerCase() === voivodeship.toLowerCase());
        setActiveHub(matchingHub || data[0]);
      })
      .catch(err => console.error("Error loading hubs:", err));
  }, []);

  // Sync regional deliveries to local hubs
  useEffect(() => {
    if (hubs.length > 0) {
      const zoneToHub: Record<string, string> = {
        'dolnośląskie': 'wroclaw',
        'opolskie': 'wroclaw',
        'lubuskie': 'poznan',
        'wielkopolskie': 'poznan',
        'zachodniopomorskie': 'gdansk',
        'pomorskie': 'gdansk',
        'warmińsko-mazurskie': 'gdansk',
        'podlaskie': 'warsaw',
        'mazowieckie': 'warsaw',
        'łódzkie': 'warsaw',
        'lubelskie': 'warsaw',
        'świętokrzyskie': 'katowice',
        'małopolskie': 'katowice',
        'śląskie': 'katowice',
        'podkarpackie': 'rzeszow',
        'kujawsko-pomorskie': 'gdansk'
      };
      const hubId = zoneToHub[voivodeship.toLowerCase()];
      const foundHub = hubs.find(h => h.id === hubId);
      if (foundHub) {
        setActiveHub(foundHub);
      }
    }
  }, [voivodeship, hubs]);

  // Newsletter Subscriber Form handler
  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail || !subscriberEmail.includes('@')) {
      setSubStatus('error');
      setSubMessage(lang === 'PL' ? 'Proszę podać poprawny e-mail.' : 'Please provide a valid email.');
      return;
    }
    setSubStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: subscriberEmail })
      });
      const data = await res.json();
      if (res.ok) {
        setSubStatus('success');
        setSubMessage(data.message || (lang === 'PL' ? 'Dziękujemy za zapis!' : 'Thank you for subscribing!'));
        setSubscriberEmail('');
      } else {
        setSubStatus('error');
        setSubMessage(data.error || (lang === 'PL' ? 'Coś poszło nie tak.' : 'An error occurred.'));
      }
    } catch (err) {
      setSubStatus('error');
      setSubMessage(lang === 'PL' ? 'Błąd połączenia z serwerem.' : 'Server connection error.');
    }
  };

  // Wholesale Call Booking (Cal.com / Calendly simulation)
  const handleBookConsultation = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingDate || !bookingTime) {
      alert(lang === 'PL' ? 'Proszę wybrać datę i godzinę.' : 'Please select date and time.');
      return;
    }
    setBookingSuccess(true);
  };

  const getEmailBody = () => {
    return `ZAMÓWIENIE / ZAPYTANIE OFERTOWE - PELLET EXPRESS POLSKA
--------------------------------------------------
Status: Nowe zapytanie z Landing Page

Szczegóły klienta:
- Imię i Nazwisko: ${fullName}
- Telefon: ${phone}
- Email: ${email}

Szczegóły dostawy:
- Województwo: ${voivodeship}
- Adres: ${address}

Szczegóły zamówienia:
- Produkt: Pellet Express Polska / Gold Pellet Polska
- Ilość: ${quantity} Palet/Big-Bags (łącznie ${quantity * 1000} kg)
- Cena jednostkowa: 1350 PLN / tonę
- Szacowany koszt całkowity (bez dostawy): ${quantity * 1350} PLN
- Preferowana dostawa: ${deliveryMethod}
- Preferowana płatność: ${paymentMethod}

Wiadomość wygenerowana automatycznie z formularza Pellet Express Polska.
Proszę o kontakt telefoniczny lub mailowy w celu potwierdzenia kosztów transportu.`;
  };

  const handleSubmitOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !address) {
      alert(lang === 'PL' ? 'Proszę wypełnić wszystkie wymagane pola.' : 'Please fill out all required fields.');
      return;
    }
    
    setIsCheckingOut(true);
    try {
      // 1. Submit order info to Zapier database webhook
      const orderRes = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          address,
          voivodeship,
          quantity,
          deliveryMethod,
          paymentMethod,
          totalPrice: quantity * 1350
        })
      });
      const orderData = await orderRes.json();
      if (orderData.success) {
        setOrderId(orderData.orderRef);
      }

      // 2. Dispatch transactional confirmation email
      await fetch('/api/send-transactional-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          type: "order_confirmation",
          data: {
            fullName,
            phone,
            deliveryZone: voivodeship,
            quantity,
            deliveryMethod,
            paymentMethod
          }
        })
      });

      setIsOrderSubmitted(true);
    } catch (err) {
      console.error("Order submit integration error:", err);
      // Fallback
      setIsOrderSubmitted(true);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleCopyOrderDetails = () => {
    navigator.clipboard.writeText(getEmailBody());
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  const triggerEmailClient = () => {
    const subject = encodeURIComponent(`Zamówienie Pellet Express Polska - ${fullName}`);
    const body = encodeURIComponent(getEmailBody());
    window.location.href = `mailto:Pelletexpresspolska2@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopyAd = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAds(key);
    setTimeout(() => setCopiedAds(null), 2500);
  };

  // Generate JSON-LD Structured Data for FAQ to improve SEO search visibility
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faq.items.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };



  return (
    <div className="min-h-screen bg-warm-white font-sans text-[#121212] selection:bg-gold/20 selection:text-pine">
      {/* JSON-LD Structured Data for FAQ Schema SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {showPromo && (
        <div id="seasonal-promo-banner" className="bg-gold text-stone-950 text-xs py-2 px-6 relative transition-all duration-300 z-50 border-b border-gold-light">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1 text-center font-serif text-xs sm:text-sm font-bold leading-normal">
              {lang === 'PL' ? (
                <span>❄️ <strong className="font-sans uppercase tracking-wider text-[10px] bg-stone-950 text-gold px-1.5 py-0.5 mr-1.5">ZIMOWA PROMOCJA</strong> Zamów minimum 3 palety i zyskaj darmową dostawę oraz dodatkowe 50 PLN rabatu na każdą tonę!</span>
              ) : (
                <span>❄️ <strong className="font-sans uppercase tracking-wider text-[10px] bg-stone-950 text-gold px-1.5 py-0.5 mr-1.5">WINTER SPECIAL</strong> Order at least 3 pallets and get free delivery + 50 PLN discount per ton!</span>
              )}
            </div>
            <button
              id="dismiss-promo-btn"
              onClick={() => setShowPromo(false)}
              className="p-1 hover:bg-stone-950/10 rounded-full transition-colors cursor-pointer shrink-0"
              aria-label="Close promotion"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
      
      {/* Dynamic Top Bar */}
      <div className="bg-pine text-stone-200 text-xs py-2.5 px-6 sticky top-0 z-50 shadow-sm border-b border-pine-light">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-gold font-mono tracking-widest text-[10px] font-bold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
              PL / EN BILINGUAL SUPPORT
            </span>
            <span className="hidden md:inline text-white/20">|</span>
            <a href="mailto:Pelletexpresspolska2@gmail.com" className="hover:text-gold transition-colors flex items-center gap-1 text-[11px] tracking-wide text-stone-300 font-mono font-medium">
              <Mail className="w-3.5 h-3.5 text-gold" /> Pelletexpresspolska2@gmail.com
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-pine-light/50 p-0.5 rounded border border-white/10">
              <button
                id="lang-pl"
                onClick={() => setLang('PL')}
                className={`px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest font-mono uppercase transition-all ${
                  lang === 'PL' ? 'bg-gold text-white shadow-sm' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                PL
              </button>
              <button
                id="lang-en"
                onClick={() => setLang('EN')}
                className={`px-3 py-1 rounded-sm text-[10px] font-bold tracking-widest font-mono uppercase transition-all ${
                  lang === 'EN' ? 'bg-gold text-white shadow-sm' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="bg-white/90 backdrop-blur-md py-4.5 px-6 border-b border-stone-200 sticky top-10 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pine flex items-center justify-center text-white font-serif font-black text-lg border border-gold/30">
              P.E
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-tight text-pine block leading-none">
                Pellet Express <span className="font-light italic text-gold font-serif">Polska</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-stone-400 uppercase font-mono block mt-1">
                Gold Pellet Polska Premium
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-stone-600">
            <a href="#benefits" className="hover:text-gold transition-colors">
              {lang === 'PL' ? 'Zalety' : 'Benefits'}
            </a>
            <a href="#calculator" className="hover:text-gold transition-colors">
              {lang === 'PL' ? 'Kalkulator' : 'Calculator'}
            </a>
            <a href="#specs" className="hover:text-gold transition-colors">
              {lang === 'PL' ? 'Parametry' : 'Specifications'}
            </a>
            <a href="#comparison" className="hover:text-gold transition-colors">
              {lang === 'PL' ? 'Porównanie' : 'Comparison'}
            </a>
            <a href="#faq" className="hover:text-gold transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="mailto:Pelletexpresspolska2@gmail.com"
              className="text-stone-500 hover:text-gold text-[11px] font-bold uppercase tracking-wider hidden xl:flex items-center gap-1.5"
            >
              <Mail className="w-4 h-4 text-stone-400" />
              Support
            </a>
            <a
              href="#order-section"
              className="bg-pine hover:bg-pine-light text-white px-5 py-2.5 font-mono text-[10px] font-black uppercase tracking-widest border border-gold/20 transition-all shadow-sm hover:shadow-pine/10 active:scale-98"
            >
              {lang === 'PL' ? 'Zamów Teraz' : 'Order Now'}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pb-24 px-6 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-[4.75rem] lg:leading-[0.95] text-pine tracking-tighter uppercase">
              {lang === 'PL' ? (
                <>Stałe Ciepło.<br /><span className="font-serif italic font-light text-stone-400 normal-case">Constant Warmth.</span></>
              ) : (
                <>{t.hero.title}</>
              )}
            </h1>

            <p className="text-stone-600 text-sm sm:text-base max-w-lg leading-relaxed font-sans">
              {t.hero.subtitle}
            </p>

            {/* Premium Pricing Block */}
            <div className="bg-pine text-white rounded-none p-6 shadow-xl border border-gold/20 max-w-lg relative overflow-hidden group">
              <div className="absolute top-4 right-4 z-10 bg-gold text-white px-3.5 py-1.5 text-xl font-black transform -rotate-3 font-mono shadow-md">
                1350 PLN
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10 pr-24">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase tracking-widest font-mono block">
                    {t.hero.priceLabel}
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-serif font-black text-3xl text-gold">1350</span>
                    <span className="font-bold text-sm text-gold">{t.hero.priceUnit}</span>
                    <span className="text-stone-400 text-[11px] ml-1">/ brutto</span>
                  </div>
                </div>
                <div className="text-[11px] text-stone-300 space-y-1 bg-white/5 p-3 rounded-none border border-white/10 w-full sm:w-auto font-mono">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>ENplus A1 (Certyfikat)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>Paleta 1000 kg (Big-Bag)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span>Dostawa w 2-5 dni</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#order-section"
                className="bg-pine hover:bg-pine-light text-white px-8 py-4 font-mono text-xs uppercase tracking-widest font-black text-center transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 border border-gold/30"
              >
                {t.hero.ctaOrder}
                <ArrowRight className="w-4 h-4 text-gold" />
              </a>
              <a
                href="#contact-section"
                className="bg-white hover:bg-stone-50 text-pine border border-stone-300 px-8 py-4 font-mono text-xs uppercase tracking-widest font-black text-center transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                {t.hero.ctaContact}
              </a>
            </div>

            {/* Small trust features */}
            <p className="text-[10px] text-stone-400 font-mono tracking-wider uppercase font-bold pt-2">
              {t.hero.badgeTrust}
            </p>
          </div>

          {/* Hero Image Side */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1.5 bg-gold rounded-none blur-sm opacity-10"></div>
            <div className="relative bg-white p-3 rounded-none shadow-2xl border border-stone-200 overflow-hidden">
              <img
                src="/src/assets/images/pellet_hero_1784294560726.jpg"
                alt="Premium Wood Pellets with Cosy Fireplace"
                className="w-full h-[320px] sm:h-[400px] object-cover rounded-none"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlaid Float Badges */}
              <div className="absolute bottom-6 left-6 right-6 bg-pine/95 backdrop-blur-md p-4 rounded-none border border-gold/20 text-white flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-none bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                    <Flame className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-400 block font-mono tracking-wider uppercase">CALORIC POWER</span>
                    <span className="font-serif font-black text-sm tracking-tight text-white">&gt; 18.5 MJ / KG</span>
                  </div>
                </div>
                <div className="border-l border-white/10 h-8"></div>
                <div className="flex items-center gap-1 text-gold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-xs font-mono font-bold ml-1 text-white">4.9/5</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Real-time Proof & High Volume Counter Strip */}
      <section id="live-proof-counter-strip" className="bg-[#0B1510] text-white py-8 sm:py-10 border-b border-gold/10 relative overflow-hidden">
        {/* Subtle decorative background patterns */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pine/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 absolute"></span>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold ml-2 uppercase">
                {counterLabels[lang].liveText}
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-wider text-stone-400 uppercase font-medium">
              {lang === 'PL' ? 'Statystyki aktualizowane na żywo' : 'Statistics updated in real-time'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 md:divide-x md:divide-white/10">
            {/* Stat 1: Satisfied Customers */}
            <div className="flex items-center gap-4.5 md:px-6">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center border border-gold/20 text-gold shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-stone-100 tracking-tight transition-all duration-500">
                    {satisfiedCount.toLocaleString()}
                  </span>
                  <span className="text-gold font-serif font-black text-lg italic">+</span>
                </div>
                <div className="text-xs font-bold text-stone-200 tracking-wide font-sans">
                  {counterLabels[lang].satisfiedTitle}
                </div>
                <div className="text-[10px] font-mono text-stone-400 tracking-wider">
                  {counterLabels[lang].satisfiedDesc}
                </div>
              </div>
            </div>

            {/* Stat 2: Tons Delivered */}
            <div className="flex items-center gap-4.5 md:px-8">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center border border-gold/20 text-gold shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-stone-100 tracking-tight transition-all duration-500">
                    {tonsCount.toLocaleString()}
                  </span>
                  <span className="text-gold font-mono font-bold text-xs uppercase tracking-wider ml-1">t</span>
                </div>
                <div className="text-xs font-bold text-stone-200 tracking-wide font-sans">
                  {counterLabels[lang].tonsTitle}
                </div>
                <div className="text-[10px] font-mono text-stone-400 tracking-wider">
                  {counterLabels[lang].tonsDesc}
                </div>
              </div>
            </div>

            {/* Stat 3: Active Deliveries */}
            <div className="flex items-center gap-4.5 md:px-8">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center border border-gold/20 text-gold shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-stone-100 tracking-tight transition-all duration-500">
                    {activeCount}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-mono font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
                    {lang === 'PL' ? 'W drodze' : 'On route'}
                  </span>
                </div>
                <div className="text-xs font-bold text-stone-200 tracking-wide font-sans">
                  {counterLabels[lang].activeTitle}
                </div>
                <div className="text-[10px] font-mono text-stone-400 tracking-wider">
                  {counterLabels[lang].activeDesc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="py-20 sm:py-24 px-6 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">ANALYSIS / ANALIZA</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-pine tracking-tighter uppercase">
              {t.problemSolution.title}
            </h2>
            <p className="text-stone-500 text-sm sm:text-base max-w-xl mx-auto">
              {t.problemSolution.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            {/* Problems card */}
            <div className="bg-white border border-stone-200 rounded-none p-6 sm:p-10 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                  <div className="w-10 h-10 bg-stone-100 flex items-center justify-center text-stone-600 border border-stone-200">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-pine">
                    {t.problemSolution.problemsTitle}
                  </h3>
                </div>
                
                <ul className="space-y-4">
                  {t.problemSolution.problems.map((prob, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="text-gold font-mono font-bold text-xs shrink-0 mt-0.5">[!]</span>
                      <p className="text-stone-600 text-sm leading-relaxed">{prob}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-stone-400 pt-4 border-t border-stone-100">
                Risky Alternatives / Ryzykowne alternatywy
              </div>
            </div>

            {/* Solutions card */}
            <div className="bg-pine text-white border border-gold/10 rounded-none p-6 sm:p-10 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center text-gold border border-gold/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-white">
                    {t.problemSolution.solutionsTitle}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {t.problemSolution.solutions.map((sol, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="text-gold font-mono font-bold text-xs shrink-0 mt-0.5">[✓]</span>
                      <p className="text-stone-300 text-sm leading-relaxed font-medium">{sol}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-gold pt-4 border-t border-white/5">
                Premium Wood Pellets / Gwarancja Klasy Premium
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section id="calculator" className="py-20 sm:py-24 px-6 bg-[#F5F2EA] border-b border-stone-200 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">PLAN & ESTIMATE</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-pine tracking-tighter uppercase">
              {t.calculator.title}
            </h2>
            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
              {t.calculator.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Input panel */}
            <div className="bg-white rounded-none p-6 sm:p-8 border border-stone-200 lg:col-span-7 space-y-6">
              
              {/* House Size Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-pine font-serif font-bold text-base block">
                    {t.calculator.houseSizeLabel}
                  </label>
                  <span className="bg-pine text-white font-mono font-bold text-sm px-3.5 py-1.5 rounded-none border border-gold/25">
                    {houseSize} m²
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="400"
                  step="10"
                  value={houseSize}
                  onChange={(e) => setHouseSize(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-none appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>50 m²</span>
                  <span>150 m²</span>
                  <span>250 m²</span>
                  <span>400 m²</span>
                </div>
              </div>

              {/* Insulation Class Selection */}
              <div className="space-y-3 pt-2">
                <label className="text-pine font-serif font-bold text-sm block">
                  {t.calculator.insulationLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['excellent', 'good', 'average', 'poor'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setInsulation(level)}
                      className={`p-3.5 rounded-none text-left text-xs sm:text-sm font-bold tracking-tight transition-all border ${
                        insulation === level
                          ? 'bg-pine text-white border-pine shadow-sm'
                          : 'bg-warm-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {t.calculator.insulationOptions[level]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type of Stove/Boiler Selection */}
              <div className="space-y-3 pt-2">
                <label className="text-pine font-serif font-bold text-sm block">
                  {lang === 'PL' ? 'Rodzaj używanego pieca/kotła' : 'Type of stove/boiler used'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(['pellet_stove', 'pellet_boiler', 'classic_stove', 'classic_boiler'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setDeviceType(type)}
                      className={`p-3.5 text-left text-xs sm:text-sm transition-all border ${
                        deviceType === type
                          ? 'bg-gold text-white border-gold font-bold shadow-sm'
                          : 'bg-warm-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {deviceLabels[lang][type]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Fuel selection */}
              <div className="space-y-3 pt-2">
                <label className="text-pine font-serif font-bold text-xs block uppercase tracking-wider text-stone-500">
                  {t.calculator.currentFuelLabel}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['coal', 'gas', 'electric', 'wood'] as const).map((fuel) => (
                    <button
                      key={fuel}
                      type="button"
                      onClick={() => setCurrentFuel(fuel)}
                      className={`p-2.5 rounded-none text-center text-[10px] font-mono uppercase tracking-wider transition-all border ${
                        currentFuel === fuel
                          ? 'bg-pine text-white border-pine font-bold'
                          : 'bg-warm-white text-stone-600 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {t.calculator.currentFuelOptions[fuel]}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Computed Output Panel */}
            <div className="bg-pine text-white rounded-none p-6 sm:p-8 border border-gold/20 lg:col-span-5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-3xl"></div>
              
              <div className="space-y-6 relative z-10">
                <h3 className="font-serif font-bold text-lg text-gold border-b border-white/10 pb-3">
                  {t.calculator.resultTitle}
                </h3>

                <div className="space-y-5">
                  {/* Pellet Quantity Result */}
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-stone-300 text-xs sm:text-sm font-serif">
                      {t.calculator.estimatedPellet}
                    </span>
                    <span className="font-mono font-bold text-lg sm:text-xl text-stone-100">
                      ~ <span className="font-serif text-2xl text-gold font-black italic">{calcResult.tons}</span> t <span className="text-[10px] text-stone-400 font-normal">/ {lang === 'PL' ? 'rok' : 'year'}</span>
                    </span>
                  </div>

                  {/* Yearly Cost Result */}
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-stone-300 text-xs sm:text-sm font-serif">
                      {t.calculator.estimatedCost}
                    </span>
                    <span className="font-serif font-black text-2xl text-gold">
                      {calcResult.cost.toLocaleString()} <span className="text-xs uppercase tracking-wider font-mono text-stone-400 font-normal">PLN</span>
                    </span>
                  </div>

                  {/* Suggested Order Quantity */}
                  <div className="bg-white/5 border border-white/15 p-3.5 rounded-none space-y-1.5">
                    <span className="text-[10px] uppercase tracking-widest font-mono text-gold block font-bold">
                      {lang === 'PL' ? 'Sugerowana ilość do zamówienia' : 'Suggested quantity to order'}
                    </span>
                    <div className="text-sm font-serif text-stone-100">
                      {lang === 'PL' ? (
                        <>
                          Zalecamy zamówienie <strong className="text-gold text-base">{Math.ceil(calcResult.tons)} palet(y)</strong> (czyli {Math.ceil(calcResult.tons) * 66} worków po 15 kg).
                        </>
                      ) : (
                        <>
                          We recommend ordering <strong className="text-gold text-base">{Math.ceil(calcResult.tons)} pallet(s)</strong> (i.e. {Math.ceil(calcResult.tons) * 66} bags of 15 kg).
                        </>
                      )}
                    </div>
                  </div>

                  {/* Savings estimated */}
                  <div className="bg-white/5 border border-white/10 p-3.5 rounded-none flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-gold" />
                      <span className="text-xs text-stone-300 font-bold font-mono tracking-wider uppercase">{t.calculator.savings}</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-gold">
                      ~ {calcResult.savings.toLocaleString()} PLN / {lang === 'PL' ? 'rok' : 'year'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <button
                  type="button"
                  onClick={handleApplyCalcToOrder}
                  className="w-full bg-gold hover:bg-gold/90 text-white font-mono uppercase tracking-widest font-black py-4 px-4 rounded-none text-center text-xs transition-all active:scale-98 flex items-center justify-center gap-2 border border-gold/30 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {t.calculator.addCta}
                </button>
                <span className="text-[9px] font-mono text-stone-400 text-center block mt-2.5">
                  *Szacunki oparte na uśrednionej sprawności kotła 90% i cenie 1350 PLN/t.
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Benefits Client Section */}
      <section id="benefits" className="py-20 sm:py-24 px-6 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">BENEFITS / KORZYŚCI</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-pine tracking-tighter uppercase">
              {t.benefits.title}
            </h2>
            <p className="text-stone-500 text-sm sm:text-base max-w-xl mx-auto">
              {t.benefits.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.benefits.list.map((benefit, idx) => {
              // Custom icons for benefits
              const icons = [
                <Flame className="w-5.5 h-5.5 text-gold" key={0} />,
                <ShieldCheck className="w-5.5 h-5.5 text-gold" key={1} />,
                <CheckCircle2 className="w-5.5 h-5.5 text-gold" key={2} />,
                <Truck className="w-5.5 h-5.5 text-gold" key={3} />,
                <Globe className="w-5.5 h-5.5 text-gold" key={4} />,
                <Award className="w-5.5 h-5.5 text-gold" key={5} />
              ];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-none p-6 sm:p-8 border border-stone-200 hover:border-gold hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-pine/5 flex items-center justify-center border border-gold/20 mb-6 group-hover:scale-105 transition-transform">
                      {icons[idx] || <Flame className="w-5.5 h-5.5 text-gold" />}
                    </div>
                    <h3 className="font-serif font-bold text-lg text-pine mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                  <div className="text-[9px] font-mono tracking-widest text-stone-400 uppercase pt-6 mt-4 border-t border-stone-100">
                    Premium Class / Klasa Premium
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-20 sm:py-24 px-6 bg-pine text-white relative overflow-hidden border-b border-stone-900">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">TRUSTED PARTNER / PEWNY COOPERATOR</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-white tracking-tighter uppercase">
              {t.whyUs.title}
            </h2>
            <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto">
              {t.whyUs.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {t.whyUs.points.map((point, idx) => {
              const icons = [
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-1" key={0} />,
                <Clock className="w-5 h-5 text-gold shrink-0 mt-1" key={1} />,
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-1" key={2} />,
                <Globe className="w-5 h-5 text-gold shrink-0 mt-1" key={3} />
              ];
              return (
                <div
                  key={idx}
                  className="bg-white/5 rounded-none p-6 sm:p-8 border border-white/10 flex gap-4 items-start hover:border-gold/40 hover:bg-white/[0.08] hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-white/10 flex items-center justify-center shrink-0 border border-white/5 text-gold">
                    {icons[idx] || <CheckCircle2 className="w-5 h-5 text-gold" />}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-base text-stone-100">
                      {point.title}
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prompt / Trust message of premium placement */}
          <div className="bg-white/5 border border-white/10 rounded-none p-6 text-center max-w-3xl mx-auto mt-12 text-xs sm:text-sm text-stone-300">
            {lang === 'PL' ? (
              <p className="font-sans leading-relaxed">
                🔒 <strong className="text-white font-serif font-bold">Gwarancja braku ryzyka:</strong> Ponieważ jesteśmy pewni najwyższej czystości 
                naszych produktów, dajemy Ci prawo do natychmiastowego bezpłatnego zwrotu przy rozładunku, jeśli stwierdzisz 
                jakiekolwiek niezgodności.
              </p>
            ) : (
              <p className="font-sans leading-relaxed">
                🔒 <strong className="text-white font-serif font-bold">Zero-Risk Guarantee:</strong> Since we are fully confident in the superb quality 
                of our products, we offer an immediate, free-of-charge return directly upon delivery if you inspect and reject the batch.
              </p>
            )}
          </div>

        </div>
      </section>

      {/* Specs / Reassurance / Badges Section */}
      <section id="specs" className="py-20 sm:py-24 px-6 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Tech details sheet */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <div className="border-b border-gold text-gold font-mono font-bold text-xs tracking-wider pb-1 inline-block uppercase">
                  {lang === 'PL' ? 'Karta Produktu' : 'Product Sheet'}
                </div>
                <h2 className="font-serif font-black text-3xl sm:text-4xl text-pine tracking-tighter uppercase leading-tight">
                  {t.specs.title}
                </h2>
                <p className="text-stone-500 text-sm">
                  {t.specs.subtitle}
                </p>
              </div>

              {/* Specs List */}
              <div className="bg-[#FBF9F4] rounded-none p-6 sm:p-8 border border-stone-200 space-y-3 font-mono text-xs sm:text-sm">
                
                <div className="flex justify-between items-center py-2.5 border-b border-stone-200/60">
                  <span className="text-stone-500 font-sans font-medium">{t.specs.certifications}</span>
                  <span className="font-bold text-white bg-gold px-3 py-1 text-xs border border-gold/15 uppercase font-mono tracking-wider">ENplus A1 • DINplus</span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-stone-200/60">
                  <span className="text-stone-500 font-sans font-medium">{t.specs.caloricValue}</span>
                  <span className="font-bold text-stone-900">&gt; 18.5 MJ/kg (≈ 5.1 kWh/kg)</span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-stone-200/60">
                  <span className="text-stone-500 font-sans font-medium">{t.specs.ash}</span>
                  <span className="font-bold text-stone-900">&lt; 0.45% ({lang === 'PL' ? 'Bardzo niska' : 'Extremely Low'})</span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-stone-200/60">
                  <span className="text-stone-500 font-sans font-medium">{t.specs.moisture}</span>
                  <span className="font-bold text-stone-900">&lt; 5.8% ({lang === 'PL' ? 'Ekstra suchy' : 'Extra Dry'})</span>
                </div>

                <div className="flex justify-between items-center py-2.5 border-b border-stone-200/60">
                  <span className="text-stone-500 font-sans font-medium">{t.specs.diameter}</span>
                  <span className="font-bold text-stone-900">6 mm ± 0.5</span>
                </div>

                <div className="flex justify-between items-center py-2.5">
                  <span className="text-stone-500 font-sans font-medium">{t.specs.weight}</span>
                  <span className="font-bold text-stone-900">1000 kg (Paleta Big-Bag)</span>
                </div>

              </div>

              {/* Conformity notice */}
              <div className="flex gap-4 items-start p-5 bg-[#F5F2EA] border border-stone-200 rounded-none">
                <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {lang === 'PL' 
                    ? "Pellet badany regularnie przez akredytowane jednostki certyfikujące. Gwarantujemy czystość biologiczną trocin pochodzących wyłącznie z odpowiedzialnych, certyfikowanych lasów państwowych."
                    : "Pellets are periodically analyzed in certified testing laboratories. We guarantee 100% ecological purity of raw coniferous sawdust sourced exclusively from certified state forests."}
                </p>
              </div>
            </div>

            {/* Spec Image/Real Photo container */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative bg-white rounded-none p-4 border border-stone-200 shadow-sm overflow-hidden">
                <img
                  src="/src/assets/images/pellet_bag_1784294574010.jpg"
                  alt="Real product pellet bag preview"
                  className="w-full h-[320px] object-cover rounded-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8 bg-pine text-white text-[10px] font-mono tracking-widest uppercase py-1.5 px-3.5 border border-gold/30">
                  ORIGINAL PRODUCT
                </div>
              </div>

              {/* Real testimonials micro-carrousel */}
              <div className="bg-[#F5F2EA] p-6 sm:p-8 rounded-none border border-stone-200 relative">
                <div className="flex gap-1 text-gold mb-3">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed font-serif">
                  {lang === 'PL' 
                    ? '"Długo szukałem pelletu, który nie zostawia twardych spieków na ruszcie. Ten pellet spala się na drobny, sypki pyłek, a kocioł działa bez żadnej awarii cały sezon. Pan z dostawy z windą niezwykle pomocny!"'
                    : '"I have been looking for pellets that do not produce heavy slag buildup. This pellet burns into a light powder, and my stove has run without a single hiccup. The delivery driver was extremely helpful!"'}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-8 h-8 bg-pine text-gold border border-gold/20 flex items-center justify-center font-mono font-bold text-xs">
                    M
                  </div>
                  <div>
                    <span className="text-xs font-serif font-bold text-stone-900 block">Mariusz Wiśniewski</span>
                    <span className="text-[10px] font-mono text-stone-500 block">Województwo Mazowieckie (Grodzisk Maz.)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 sm:py-24 px-6 bg-[#FBF9F4] border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">BENCHMARK / PORÓWNANIE</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-pine tracking-tighter uppercase">
              {t.comparison.title}
            </h2>
            <p className="text-stone-500 text-sm sm:text-base max-w-xl mx-auto">
              {t.comparison.subtitle}
            </p>
          </div>

          <div className="overflow-x-auto rounded-none border border-stone-200 shadow-sm bg-white">
            <table className="w-full min-w-[640px] text-left border-collapse">
              <thead>
                <tr className="bg-pine text-white text-xs font-mono tracking-widest uppercase border-b border-stone-900">
                  <th className="p-4 sm:p-5">{t.comparison.headers[0]}</th>
                  <th className="p-4 sm:p-5 text-gold">{t.comparison.headers[1]}</th>
                  <th className="p-4 sm:p-5 text-stone-300">{t.comparison.headers[2]}</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm font-medium text-stone-700 divide-y divide-stone-100">
                
                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-stone-950">Klasa Certyfikatu / Class</td>
                  <td className="p-4 sm:p-5 text-pine bg-stone-50/50 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-semibold">{t.comparison.us[0]}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-stone-500">{t.comparison.competitors[0]}</td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-stone-950">Kaloryczność / Heating Value</td>
                  <td className="p-4 sm:p-5 text-pine bg-stone-50/50 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-semibold">{t.comparison.us[1]}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-stone-500">{t.comparison.competitors[1]}</td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-stone-950">Popiół / Ash Content</td>
                  <td className="p-4 sm:p-5 text-pine bg-stone-50/50 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-semibold">{t.comparison.us[2]}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-stone-500">{t.comparison.competitors[2]}</td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-stone-950">Składniki / Wood Quality</td>
                  <td className="p-4 sm:p-5 text-pine bg-stone-50/50 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-semibold">{t.comparison.us[3]}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-stone-500">{t.comparison.competitors[3]}</td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-stone-950">Sposób rozładunku / Logistics</td>
                  <td className="p-4 sm:p-5 text-pine bg-stone-50/50 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-semibold">{t.comparison.us[4]}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-stone-500">{t.comparison.competitors[4]}</td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-stone-950">Bezpieczeństwo zakupu / Risk</td>
                  <td className="p-4 sm:p-5 text-pine bg-stone-50/50 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-semibold">{t.comparison.us[5]}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-stone-500">{t.comparison.competitors[5]}</td>
                </tr>

                <tr>
                  <td className="p-4 sm:p-5 font-serif font-bold text-stone-950">Język obsługi / Communication</td>
                  <td className="p-4 sm:p-5 text-pine bg-stone-50/50 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-semibold">{t.comparison.us[6]}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-stone-500">{t.comparison.competitors[6]}</td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-20 sm:py-24 px-6 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-pine tracking-tighter uppercase">
              {t.howToOrder.title}
            </h2>
            <p className="text-stone-500 text-sm sm:text-base max-w-xl mx-auto">
              {t.howToOrder.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {t.howToOrder.steps.map((step, idx) => (
              <div key={idx} className="space-y-4 relative group flex flex-col justify-between p-6 bg-white border border-stone-200">
                <div>
                  <span className="text-gold font-serif font-black italic text-4xl mb-3 block">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-pine pt-1">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mt-2">
                    {step.desc}
                  </p>
                </div>
                <div className="text-[9px] font-mono tracking-widest text-stone-400 uppercase pt-4 mt-4 border-t border-stone-100">
                  {idx === 0 ? 'Step 1' : idx === 1 ? 'Step 2' : idx === 2 ? 'Step 3' : 'Step 4'}
                </div>
              </div>
            ))}
          </div>

          {/* Integrated Need Estimator Calculator */}
          <div className="mt-12 bg-[#F5F2EA] border border-stone-200 p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-300/60 pb-5">
                <div>
                  <span className="text-[10px] tracking-widest font-mono text-gold uppercase block font-bold mb-1">
                    {lang === 'PL' ? 'Narzędzie pomocnicze' : 'Decision Helper Tool'}
                  </span>
                  <h3 className="font-serif font-black text-xl sm:text-2xl text-pine uppercase tracking-tight">
                    {lang === 'PL' ? 'Kalkulator Zapotrzebowania' : 'Need Estimator Calculator'}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1">
                    {lang === 'PL' 
                      ? 'Oblicz idealną ilość pelletu do zamówienia, aby bezpiecznie przetrwać zimę.' 
                      : 'Calculate the ideal amount of pellets to order to comfortably get through the winter.'}
                  </p>
                </div>
                <div className="bg-pine text-white text-[11px] font-mono tracking-wider px-3 py-1.5 uppercase font-bold">
                  {lang === 'PL' ? 'Kalkulator na żywo' : 'Live Calculator'}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                {/* Inputs */}
                <div className="lg:col-span-7 space-y-6">
                  {/* House size slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-serif font-bold text-pine">
                        {lang === 'PL' ? '1. Powierzchnia Twojego domu (m²)' : '1. Size of your house (m²)'}
                      </span>
                      <span className="bg-pine text-white font-mono font-bold text-xs px-3 py-1">
                        {houseSize} m²
                      </span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="400"
                      step="10"
                      value={houseSize}
                      onChange={(e) => setHouseSize(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-stone-300 rounded-none appearance-none cursor-pointer accent-gold"
                    />
                    <div className="flex justify-between text-[9px] text-stone-500 font-mono">
                      <span>50 m²</span>
                      <span>150 m²</span>
                      <span>250 m²</span>
                      <span>400 m²</span>
                    </div>
                  </div>

                  {/* Device Type Selection */}
                  <div className="space-y-3">
                    <span className="text-sm font-serif font-bold text-pine block">
                      {lang === 'PL' ? '2. Rodzaj używanego pieca lub kotła' : '2. Type of stove or boiler used'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(['pellet_stove', 'pellet_boiler', 'classic_stove', 'classic_boiler'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setDeviceType(type)}
                          className={`p-3 text-left text-xs transition-all border ${
                            deviceType === type
                              ? 'bg-pine text-white border-pine font-bold shadow-sm'
                              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          <span className="block font-semibold">{deviceLabels[lang][type].split(' (')[0]}</span>
                          <span className="block text-[10px] text-stone-400 font-normal mt-0.5">
                            {deviceLabels[lang][type].includes('(') ? '(' + deviceLabels[lang][type].split(' (')[1] : ''}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Insulation Level Selection */}
                  <div className="space-y-3">
                    <span className="text-sm font-serif font-bold text-pine block">
                      {lang === 'PL' ? '3. Poziom ocieplenia budynku' : '3. Building insulation level'}
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(['excellent', 'good', 'average', 'poor'] as const).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setInsulation(level)}
                          className={`p-2.5 text-center text-xs transition-all border ${
                            insulation === level
                              ? 'bg-gold text-white border-gold font-bold'
                              : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                          }`}
                        >
                          {t.calculator.insulationOptions[level].split(' (')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Outputs & Suggestions */}
                <div className="lg:col-span-5 bg-white border border-stone-200 p-5 sm:p-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <span className="text-xs uppercase tracking-widest font-mono text-stone-400 block font-bold border-b border-stone-100 pb-2">
                      {lang === 'PL' ? 'Wynik szacunkowy' : 'Estimated Requirement'}
                    </span>

                    <div className="space-y-3.5">
                      {/* Pellet Needed */}
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-stone-500 font-serif">
                          {lang === 'PL' ? 'Zapotrzebowanie sezonowe' : 'Seasonal consumption'}
                        </span>
                        <span className="font-mono font-bold text-lg text-pine">
                          ~ <strong className="text-xl text-gold font-serif font-black italic">{calcResult.tons}</strong> tonnes
                        </span>
                      </div>

                      {/* Suggested Order */}
                      <div className="bg-[#F5F2EA] border border-stone-200 p-3.5 space-y-1">
                        <span className="text-[9px] uppercase tracking-wider font-mono text-pine block font-bold">
                          {lang === 'PL' ? 'Sugerowana ilość' : 'Suggested order quantity'}
                        </span>
                        <p className="text-xs text-stone-700 leading-relaxed font-serif">
                          {lang === 'PL' ? (
                            <>
                              Sugerujemy zamówienie <strong className="text-pine font-black">{Math.ceil(calcResult.tons)} palet(y)</strong> (łącznie <strong className="font-mono">{Math.ceil(calcResult.tons) * 66} worków</strong> po 15 kg).
                            </>
                          ) : (
                            <>
                              We recommend ordering <strong className="text-pine font-black">{Math.ceil(calcResult.tons)} pallet(s)</strong> (total of <strong className="font-mono">{Math.ceil(calcResult.tons) * 66} bags</strong> of 15 kg).
                            </>
                          )}
                        </p>
                      </div>

                      {/* Estimated Cost */}
                      <div className="flex justify-between items-baseline pt-1">
                        <span className="text-xs text-stone-500 font-serif">
                          {lang === 'PL' ? 'Szacowany koszt paliwa' : 'Estimated fuel budget'}
                        </span>
                        <span className="font-serif font-black text-lg text-pine">
                          {calcResult.cost.toLocaleString()} PLN
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={handleApplyCalcToOrder}
                      className="w-full bg-gold hover:bg-gold/90 text-white font-mono uppercase tracking-wider font-black py-3 px-4 rounded-none text-center text-xs transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      {t.calculator.addCta}
                    </button>
                    <span className="text-[8px] font-mono text-stone-400 text-center block leading-normal">
                      {lang === 'PL'
                        ? '*Szacunki oparte na cenie 1350 PLN/t i certyfikowanej kaloryczności Gold Pellet Polska.'
                        : '*Indicative estimates based on 1350 PLN/t and certified Gold Pellet Polska caloric density.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Delivery and Payment details */}
      <section className="py-20 sm:py-24 px-6 bg-[#F5F2EA] border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">LOGISTICS / LOGISTYKA</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-pine tracking-tighter uppercase">
              {t.delivery.title}
            </h2>
            <p className="text-stone-500 text-sm sm:text-base max-w-xl mx-auto">
              {t.delivery.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Zones Map Info */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-none border border-stone-200 shadow-sm space-y-5">
              <h3 className="font-serif font-bold text-lg text-pine flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" />
                {t.delivery.zonesTitle}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {t.delivery.zonesDesc}
              </p>
              
              {/* Voivodeships grid preview */}
              <div className="bg-[#FBF9F4] p-5 rounded-none border border-stone-200">
                <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block mb-3">
                  {lang === 'PL' ? 'Szybka dostawa w województwach:' : 'Express delivery in regions:'}
                </span>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 text-xs font-semibold text-stone-700">
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">[✓] Mazowieckie</div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">[✓] Wielkopolskie</div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">[✓] Śląskie</div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">[✓] Małopolskie</div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">[✓] Dolnośląskie</div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">[✓] Łódzkie</div>
                </div>
              </div>
            </div>

            {/* Methods and payments list */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Shipping methods */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-pine border-b border-stone-200 pb-2">
                  {t.delivery.methodsTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.delivery.methods.map((method, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-none border border-stone-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-gold block mb-1 uppercase tracking-wider">Method 0{idx + 1}</span>
                        <h5 className="font-serif font-bold text-sm text-stone-900 mb-2">{method.title}</h5>
                        <p className="text-stone-500 text-xs leading-relaxed">{method.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure Payments */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-base text-pine border-b border-stone-200 pb-2">
                  {t.delivery.paymentsTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.delivery.payments.map((pay, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-none border border-stone-200 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-pine block mb-1 uppercase tracking-wider">Option 0{idx + 1}</span>
                        <h5 className="font-serif font-bold text-sm text-stone-900 mb-2">{pay.title}</h5>
                        <p className="text-stone-500 text-xs leading-relaxed">{pay.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Main Booking Order Form / Contact Quote */}
      <section id="order-section" className="py-20 sm:py-24 px-6 bg-white relative">
        
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-4 mb-14">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">SECURE ORDER / BEZPIECZNE ZAMÓWIENIE</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-pine tracking-tighter uppercase">
              {t.orderForm.title}
            </h2>
            <p className="text-stone-500 text-sm sm:text-base max-w-xl mx-auto">
              {t.orderForm.subtitle}
            </p>
          </div>

          {!isOrderSubmitted ? (
            <form onSubmit={handleSubmitOrder} className="bg-[#F5F2EA] border border-stone-200 p-6 sm:p-10 rounded-none space-y-6">
              
              {/* Dynamic Price Summary Header */}
              <div className="bg-pine text-white p-5 sm:p-6 rounded-none border border-gold/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/10 flex items-center justify-center text-gold border border-gold/25">
                    <Flame className="w-5 h-5 fill-current text-gold" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 font-mono tracking-widest block uppercase">
                      {t.orderForm.unitPrice}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-stone-200 font-serif">1350 PLN / tonę brutto</span>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <span className="text-[10px] text-stone-400 font-mono tracking-widest block uppercase">
                    {t.orderForm.totalPrice}
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif font-black text-gold italic">
                    {(quantity * 1350).toLocaleString()} <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-normal">PLN</span>
                  </span>
                </div>
              </div>

              {/* Quantity input */}
              <div className="space-y-3">
                <label className="text-pine font-serif font-bold text-sm block">
                  {t.orderForm.qtyLabel} <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white border border-stone-300 rounded-none overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3.5 hover:bg-stone-50 text-stone-600 transition-colors border-r border-stone-200 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 font-mono font-bold text-lg text-stone-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3.5 hover:bg-stone-50 text-stone-600 transition-colors border-l border-stone-200 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-stone-500 font-mono">
                    (= {quantity * 1000} kg pelletu premium)
                  </span>
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <label className="text-stone-800 font-bold text-xs uppercase tracking-wider block font-mono">
                    {t.orderForm.fullName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="np. Jan Kowalski"
                    className="w-full bg-white border border-stone-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-gold transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-stone-800 font-bold text-xs uppercase tracking-wider block font-mono">
                    {t.orderForm.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="np. +48 500 600 700"
                    className="w-full bg-white border border-stone-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-gold transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-stone-800 font-bold text-xs uppercase tracking-wider block font-mono">
                    {t.orderForm.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="np. jan@gmail.com"
                    className="w-full bg-white border border-stone-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-gold transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-stone-800 font-bold text-xs uppercase tracking-wider block font-mono">
                    {t.orderForm.deliveryZone}
                  </label>
                  <select
                    value={voivodeship}
                    onChange={(e) => setVoivodeship(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-gold transition-all cursor-pointer"
                  >
                    {voivodeships.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  {activeHub && (
                    <div className="text-[10px] font-mono text-stone-500 mt-1 flex items-center gap-1">
                      <span className="text-amber-600">🚚</span>
                      <span>Logistyka:</span>
                      <strong className="text-pine">{activeHub.name}</strong>
                      <span className="text-stone-400">({activeHub.status})</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Full address details */}
              <div className="space-y-2">
                <label className="text-stone-800 font-bold text-xs uppercase tracking-wider block font-mono">
                  {t.orderForm.address} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="np. ul. Leśna 15, 05-090 Raszyn"
                  className="w-full bg-white border border-stone-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-gold transition-all resize-none"
                />
              </div>

              {/* Delivery and payment options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="space-y-2">
                  <label className="text-stone-800 font-bold text-xs uppercase tracking-wider block font-mono">
                    {t.orderForm.deliveryMethod}
                  </label>
                  <select
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-gold transition-all cursor-pointer"
                  >
                    <option value="Standard z windą">{lang === 'PL' ? 'Dostawa kurierska z windą hydrauliczną' : 'Standard freight delivery with lift'}</option>
                    <option value="Odbiór osobisty">{lang === 'PL' ? 'Odbiór własny ze składu' : 'Self-pickup from warehouse'}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-stone-800 font-bold text-xs uppercase tracking-wider block font-mono">
                    {t.orderForm.paymentMethod}
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-gold transition-all cursor-pointer"
                  >
                    <option value="Płatność przy odbiorze">{lang === 'PL' ? 'Płatność gotówką/kartą u kierowcy' : 'Cash/Card on delivery'}</option>
                    <option value="Przelew bankowy">{lang === 'PL' ? 'Przelew tradycyjny (faktura proforma)' : 'Traditional bank wire (proforma)'}</option>
                  </select>
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isCheckingOut}
                className="w-full bg-gold hover:bg-gold/90 text-white font-mono uppercase tracking-widest font-black py-4.5 px-6 rounded-none text-center text-xs transition-all border border-gold/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="w-4 h-4" />
                {isCheckingOut 
                  ? (lang === 'PL' ? 'PRZETWARZANIE...' : 'PROCESSING...') 
                  : t.orderForm.submitCta}
              </button>

            </form>
          ) : (
            /* Successful submission overview screen */
            <div className="bg-pine text-white p-6 sm:p-10 rounded-none border border-gold/25 space-y-6">
              
              <div className="text-center space-y-3 pb-5 border-b border-white/10">
                <div className="w-14 h-14 bg-gold/10 text-gold rounded-none flex items-center justify-center mx-auto border border-gold/20">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-stone-100 uppercase tracking-tight">
                  {t.orderForm.successTitle}
                </h3>
                <p className="text-stone-300 text-sm max-w-lg mx-auto">
                  {t.orderForm.successDesc}
                </p>
                {orderId && (
                  <div className="mt-4 inline-block bg-gold/20 border border-gold/30 text-gold px-4 py-1.5 font-mono text-xs uppercase tracking-wider font-bold">
                    {lang === 'PL' ? 'KOD ZAMÓWIENIA' : 'ORDER REF'}: {orderId}
                  </div>
                )}
                {activeHub && (
                  <p className="text-xs font-mono text-stone-400 mt-2">
                    📍 {lang === 'PL' ? 'Dostawa obsłużona przez:' : 'Delivery dispatched from:'} <strong className="text-stone-100">{activeHub.name}</strong>
                  </p>
                )}
              </div>

              {/* Order Raw copy block */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono font-bold">
                    {lang === 'PL' ? 'Treść zapytania' : 'Draft request content'}
                  </span>
                  
                  <button
                    type="button"
                    onClick={handleCopyOrderDetails}
                    className="text-xs text-gold hover:text-white font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-gold" />
                        {lang === 'PL' ? 'SKOPIOWANO!' : 'COPIED!'}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gold" />
                        {lang === 'PL' ? 'SKOPIUJ TREŚĆ' : 'COPY TEXT'}
                      </>
                    )}
                  </button>
                </div>

                <pre className="bg-stone-950 border border-stone-900 rounded-none p-4 text-xs font-mono text-stone-300 overflow-x-auto max-h-[250px] leading-relaxed">
                  {getEmailBody()}
                </pre>
              </div>

              {/* Actions to open mail or revert */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="button"
                  onClick={triggerEmailClient}
                  className="flex-1 bg-gold hover:bg-gold/90 text-white font-mono uppercase tracking-widest font-bold py-4 px-6 rounded-none text-center text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-gold/30"
                >
                  <Mail className="w-4.5 h-4.5" />
                  {t.orderForm.successCta}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOrderSubmitted(false)}
                  className="bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 py-4 px-6 rounded-none text-xs font-mono uppercase tracking-wider cursor-pointer"
                >
                  {lang === 'PL' ? 'Popraw dane' : 'Edit details'}
                </button>
              </div>

              <p className="text-center text-[10px] text-stone-400 font-mono">
                {t.orderForm.emailInstruct}
              </p>

            </div>
          )}

        </div>
      </section>

      {/* Trust & FAQ Accordion Section */}
      <section id="faq" className="py-20 sm:py-24 px-6 bg-[#FBF9F4] border-b border-stone-200">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <div className="flex justify-center items-center gap-2 mb-2">
              <span className="w-8 h-[1px] bg-gold"></span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">SUPPORT / POMOC</span>
            </div>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-pine tracking-tighter uppercase">
              {t.faq.title}
            </h2>
            <p className="text-stone-500 text-sm sm:text-base max-w-xl mx-auto">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-none border border-stone-200 shadow-none overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 hover:bg-[#F5F2EA]/30 cursor-pointer"
                  >
                    <span className="font-serif font-bold text-base text-pine">
                      {item.q}
                    </span>
                    <span className="text-gold shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Call To Action / Final Reassurance Section */}
      <section id="contact-section" className="py-20 sm:py-24 px-6 bg-pine text-white text-center relative overflow-hidden border-b border-stone-900">
        <div className="absolute inset-0 bg-radial-gradient from-gold/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          
          <div className="w-16 h-16 bg-white/10 flex items-center justify-center text-gold mx-auto border border-white/5">
            <Flame className="w-8 h-8 fill-current" />
          </div>

          <div className="space-y-4">
            <h2 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl text-stone-50 tracking-tighter uppercase leading-tight">
              {lang === 'PL' ? 'Zapewnij sobie bezpieczne ciepło już dziś' : 'Secure your clean winter warmth today'}
            </h2>
            <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
              {lang === 'PL' 
                ? 'Zapomnij o spiekach, zatkanych palnikach i spóźnionych dostawach. Zamów certyfikowany pellet Gold Pellet Polska w stałej cenie 1350 PLN.'
                : 'Forget about clinker slag, blocked furnace burners, and delayed shipments. Order certified Gold Pellet Polska at a fixed 1350 PLN rate.'}
            </p>
          </div>

          {/* Pricing reminder */}
          <div className="inline-block bg-white/5 border border-white/10 px-6 py-4 rounded-none">
            <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase block mb-1">
              {lang === 'PL' ? 'Gwarantowana Cena' : 'Guaranteed Price'}
            </span>
            <span className="font-serif font-black text-3xl text-gold">1350 PLN</span>
            <span className="text-stone-300 text-xs ml-1">/ tonę brutto</span>
          </div>

          {/* Core action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-2">
            <a
              href="#order-section"
              className="bg-gold hover:bg-gold/90 text-white font-mono uppercase tracking-widest font-black px-8 py-4 rounded-none text-center text-xs transition-all border border-gold/20"
            >
              {lang === 'PL' ? 'Zamów teraz dostawę' : 'Order delivery now'}
            </a>
            <a
              href="mailto:Pelletexpresspolska2@gmail.com"
              className="bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 px-8 py-4 rounded-none font-mono uppercase tracking-widest text-xs text-center transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-gold" />
              Pelletexpresspolska2@gmail.com
            </a>
          </div>

          <div className="text-[10px] text-stone-400 font-mono uppercase tracking-widest pt-4 border-t border-white/5">
            Pellet Express Polska • NIP & VAT Registered • Safe & Secure
          </div>

        </div>
      </section>

      {/* Google Ads Campaign Copy Planner (Value Added Marketing Section) */}
      <section className="bg-[#F5F2EA] border-b border-stone-200 py-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="w-4.5 h-4.5 text-gold" />
              <span className="text-[10px] font-bold text-stone-800 font-mono uppercase tracking-widest">
                {lang === 'PL' ? 'Narzędzia Marketingowe Google Ads' : 'Google Ads Marketing Toolkit'}
              </span>
            </div>
            <button
              id="toggle-ads-planner"
              onClick={() => setShowAdsPlanner(!showAdsPlanner)}
              className="text-xs font-mono uppercase tracking-wider font-bold text-stone-500 hover:text-stone-900 underline flex items-center gap-1 cursor-pointer"
            >
              {showAdsPlanner ? (lang === 'PL' ? 'Ukryj' : 'Hide') : (lang === 'PL' ? 'Pokaż teksty' : 'Show ad copy')}
            </button>
          </div>

          {showAdsPlanner && (
            <div className="mt-6 bg-white p-5 sm:p-7 rounded-none border border-stone-200 shadow-inner space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h4 className="font-serif font-extrabold text-base text-pine">
                  {lang === 'PL' ? 'Teksty reklam Google Ads (Zoptymalizowane pod konwersję)' : 'Google Ads Ready-to-use Ad Copy (Conversion Optimized)'}
                </h4>
                <p className="text-stone-500 text-xs font-sans">
                  {lang === 'PL' 
                    ? 'Skopiuj te nagłówki i teksty bezpośrednio do swojego panelu reklamowego Google Ads, aby kierować ruch na tę stronę.'
                    : 'Copy-paste these high-CTR headlines and descriptions directly into your Google Ads dashboard to drive targeted traffic to this landing page.'}
                </p>
              </div>

              {/* Grid of ads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Headlines block */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-stone-400 block uppercase tracking-wider border-b border-stone-100 pb-1">
                    {lang === 'PL' ? 'Zalecane Nagłówki (Headlines)' : 'Recommended Headlines'}
                  </span>
                  
                  <div className="space-y-2">
                    {[
                      "Pellet Premium w Polsce - 1350 PLN",
                      "Zamów Teraz z Dostawą",
                      "Jakość, Której Możesz Ufać",
                      "Pellet Express Polska",
                      "Szybka Dostawa Pelletu",
                      "Sprawdź Ofertę Już Teraz",
                      "Czysty Pellet do Ogrzewania",
                      "Zaufany Dostawca Pelletu"
                    ].map((headline, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2.5 bg-stone-50 rounded-none border border-stone-200 text-xs font-semibold">
                        <span className="text-stone-800">{headline}</span>
                        <button
                          type="button"
                          onClick={() => handleCopyAd(headline, `h-${idx}`)}
                          className="text-[10px] text-gold hover:text-pine font-bold uppercase tracking-wider font-mono cursor-pointer"
                        >
                          {copiedAds === `h-${idx}` ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Descriptions block */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold text-stone-400 block uppercase tracking-wider border-b border-stone-100 pb-1">
                    {lang === 'PL' ? 'Zalecane Opisy (Descriptions)' : 'Recommended Descriptions'}
                  </span>
                  
                  <div className="space-y-2">
                    {[
                      "Wybierz pellet premium w Polsce. Szybka dostawa, jasna oferta i profesjonalna obsługa EN/PL.",
                      "Pellet Express Polska to jakość, której możesz zaufać. Zamów teraz i skontaktuj się z nami.",
                      "Szukasz sprawdzonego pelletu? Oferujemy prosty proces zamówienia, wsparcie i szybką realizację.",
                      "Postaw na pellet premium z pewną dostawą i przejrzystą komunikacją. Zamów już dziś.",
                      "Pellet do ogrzewania z profesjonalnym podejściem. Skontaktuj się: Pelletexpresspolska2@gmail.com"
                    ].map((desc, idx) => (
                      <div key={idx} className="p-3.5 bg-stone-50 rounded-none border border-stone-200 text-xs space-y-2.5">
                        <p className="text-stone-700 leading-relaxed font-medium">{desc}</p>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleCopyAd(desc, `d-${idx}`)}
                            className="text-[10px] text-gold hover:text-pine font-bold uppercase tracking-wider font-mono cursor-pointer"
                          >
                            {copiedAds === `d-${idx}` ? 'Copied!' : 'Copy description'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </div>
          )}
        </div>
      </section>

      {/* Consultations & Newsletter Section */}
      <section id="consultations" className="py-20 sm:py-24 px-6 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          
          {/* Calendar Booking Card (Wholesale & Logistics Consulting) */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-gold block">
                {lang === 'PL' ? 'DLA HURTOWNIKÓW i INSTYTUCJI' : 'FOR WHOLESALERS & INSTITUTIONS'}
              </span>
              <h2 className="font-serif font-black text-3xl text-pine uppercase tracking-tight">
                {lang === 'PL' ? 'Umów konsultację logistyczną' : 'Book a logistics consultation'}
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed max-w-md font-sans">
                {lang === 'PL' 
                  ? 'Planujesz zakup pełnosamochodowy (24t+) lub chcesz wynegocjować indywidualne warunki dostawy? Wybierz dogodny termin rozmowy telefonicznej.' 
                  : 'Planning a full truckload order (24t+) or want to negotiate custom freight rates? Select a convenient time below for a quick callback.'}
              </p>
            </div>

            {bookingSuccess ? (
              <div className="bg-pine/5 border border-pine/10 p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto border border-gold/20">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-lg text-pine uppercase font-bold">
                  {lang === 'PL' ? 'Konsultacja umówiona!' : 'Consultation Booked!'}
                </h3>
                <p className="text-stone-600 text-xs font-mono">
                  {lang === 'PL' 
                    ? `Nasz menedżer ds. kluczowych klientów zadzwoni do Ciebie: ${bookingDate} o godzinie ${bookingTime}.` 
                    : `Our key account manager will call you on: ${bookingDate} at ${bookingTime}.`}
                </p>
                <button
                  type="button"
                  onClick={() => setBookingSuccess(false)}
                  className="text-xs text-gold hover:underline font-mono uppercase tracking-wider font-bold block mx-auto pt-2 cursor-pointer"
                >
                  {lang === 'PL' ? 'Zarezerwuj inny termin' : 'Book another slot'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookConsultation} className="border border-stone-200 bg-[#FBFBF9] p-6 space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-stone-700 font-bold text-[10px] font-mono uppercase block">
                      {lang === 'PL' ? 'Wybierz Datę' : 'Select Date'}
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-white border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-stone-700 font-bold text-[10px] font-mono uppercase block">
                      {lang === 'PL' ? 'Godzina rozmowy' : 'Preferred Hour'}
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                      className="w-full bg-white border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-gold cursor-pointer"
                    >
                      <option value="">--:--</option>
                      <option value="09:00">09:00</option>
                      <option value="10:30">10:30</option>
                      <option value="12:00">12:00</option>
                      <option value="13:30">13:30</option>
                      <option value="15:00">15:00</option>
                      <option value="16:30">16:30</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-stone-700 font-bold text-[10px] font-mono uppercase block">
                      {lang === 'PL' ? 'Twój Telefon' : 'Your Phone'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+48..."
                      className="w-full bg-white border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-stone-700 font-bold text-[10px] font-mono uppercase block">
                      {lang === 'PL' ? 'Imię / Nazwa firmy' : 'Name / Company'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="np. Eko-Opał Sp. z o.o."
                      className="w-full bg-white border border-stone-300 px-3 py-2 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-pine hover:bg-pine/90 text-white font-mono uppercase tracking-widest font-bold py-3 px-4 text-center text-xs transition-colors cursor-pointer"
                >
                  {lang === 'PL' ? 'Potwierdź rezerwację (Cal.com)' : 'Confirm Booking (via Cal.com)'}
                </button>
              </form>
            )}
          </div>

          {/* Newsletter Lead Capture Form */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono font-bold text-gold block">
                {lang === 'PL' ? 'ALERT CENOWY & PROMOCJE' : 'PRICE ALERTS & SPECIALS'}
              </span>
              <h2 className="font-serif font-black text-3xl text-pine uppercase tracking-tight">
                {lang === 'PL' ? 'Zapisz się na alerty zimowe' : 'Join winter pellet alerts'}
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed max-w-md font-sans">
                {lang === 'PL' 
                  ? 'Bądź na bieżąco z cenami pelletu drzewnego premium. Otrzymuj powiadomienia o spadkach cen bezpośrednio na e-mail z integracją Mailchimp/Brevo.' 
                  : 'Stay up to date with premium wood pellet price trends. Receive instant notification of price drops straight to your inbox via Mailchimp/Brevo.'}
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="border border-stone-200 bg-[#F5F2EA] p-6 space-y-4 font-sans">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder={lang === 'PL' ? 'Twój adres e-mail' : 'Your email address'}
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  className="flex-1 bg-white border border-stone-300 px-4 py-3 text-sm focus:outline-none focus:border-gold text-[#121212]"
                />
                <button
                  type="submit"
                  disabled={subStatus === 'loading'}
                  className="bg-gold hover:bg-gold/95 text-white font-mono uppercase tracking-wider font-bold py-3 px-6 text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 min-w-[140px] disabled:opacity-50"
                >
                  {subStatus === 'loading' ? (
                    <span>...</span>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5" />
                      {lang === 'PL' ? 'ZAPISZ MNIE' : 'SUBSCRIBE'}
                    </>
                  )}
                </button>
              </div>

              {subStatus !== 'idle' && (
                <p className={`text-xs font-mono font-bold ${subStatus === 'success' ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {subMessage}
                </p>
              )}
              
              <p className="text-[10px] text-stone-500 leading-normal font-sans">
                {lang === 'PL' 
                  ? 'Zapisując się akceptujesz politykę prywatności. Zapewniamy 100% bezpieczeństwo danych bez spamu.' 
                  : 'By signing up, you agree to our privacy policy. We offer zero spam, 100% data compliance.'}
              </p>
            </form>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pine text-stone-400 text-xs py-14 px-6 border-t border-stone-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-3">
            <span className="font-serif font-bold text-white tracking-wider text-base block uppercase">
              PELLET <span className="text-gold">EXPRESS</span>
            </span>
            <p className="leading-relaxed text-stone-400 font-sans">
              {lang === 'PL' 
                ? 'Dystrybucja certyfikowanego pelletu drzewnego klasy A1 na terenie całej Polski. Twój sprawdzony i niezawodny partner w ogrzewaniu domowym.'
                : 'Distribution of certified premium ENplus A1 heating wood pellets across Poland. Your stable and trusted residential heating partner.'}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-stone-100 font-serif font-bold block uppercase tracking-wider">{lang === 'PL' ? 'Kontakt i Magazyn' : 'Contact & Warehouse'}</span>
            <p className="space-y-1 leading-relaxed text-stone-400 font-sans">
              <span className="block">Email: <a href="mailto:Pelletexpresspolska2@gmail.com" className="text-gold hover:text-white transition-colors">Pelletexpresspolska2@gmail.com</a></span>
              <span className="block">{lang === 'PL' ? 'Godziny pracy: Pon - Pt: 8:00 - 18:00' : 'Hours: Mon - Fri: 8:00 AM - 6:00 PM'}</span>
              <span className="block">{lang === 'PL' ? 'Wsparcie językowe: Polski / English' : 'Language Support: Polish / English'}</span>
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-stone-100 font-serif font-bold block uppercase tracking-wider">{lang === 'PL' ? 'Bezpieczeństwo i Prawo' : 'Security & Legal'}</span>
            <p className="leading-relaxed text-stone-400 font-sans text-[11px]">
              © 2026 Gold Pellet Polska / Pellet Express Polska. All rights reserved. 
              <br className="mb-1" />
              {lang === 'PL' 
                ? 'Treści zawarte na stronie mają charakter informacyjny i stanowią zaproszenie do zawarcia umowy w rozumieniu art. 71 Kodeksu Cywilnego.'
                : 'The contents of this webpage are informational and constitute an invitation to conclude an agreement under Polish Civil Code laws.'}
            </p>
          </div>

        </div>
      </footer>

      {/* Floating Real-time Purchase Social Proof Toast */}
      {toastData && (
        <div 
          id="live-sales-toast" 
          className={`fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 transition-all duration-500 ease-in-out transform ${
            showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="bg-[#0B1510] text-white border border-gold/30 p-4 pr-11 shadow-2xl flex items-center gap-4 max-w-sm relative">
            {/* Live pulsing glowing status & bag icon */}
            <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold relative shrink-0">
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400"></span>
              <ShoppingBag className="w-4 h-4" />
            </div>
            
            <div className="space-y-0.5">
              <div className="text-[10px] font-mono tracking-wider text-stone-400 flex items-center gap-1.5 uppercase font-semibold">
                <span>{toastData.time}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold uppercase tracking-widest text-[9px]">
                  {lang === 'PL' ? 'Nowe zamówienie' : 'New Order'}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-serif text-stone-200 leading-normal">
                {lang === 'PL' ? (
                  <>
                    <strong>{toastData.name}</strong> z miejscowości <strong>{toastData.city}</strong> właśnie zamówił <strong className="text-gold font-sans font-black">{toastData.pallets}</strong> {toastData.pallets >= 2 && toastData.pallets <= 4 ? 'palety' : 'palet'}!
                  </>
                ) : (
                  <>
                    <strong>{toastData.name}</strong> from <strong>{toastData.city}</strong> just ordered <strong className="text-gold font-sans font-black">{toastData.pallets}</strong> {toastData.pallets === 1 ? 'pallet' : 'pallets'}!
                  </>
                )}
              </p>
            </div>

            {/* Dismiss Close button */}
            <button
              onClick={() => setShowToast(false)}
              className="absolute top-2.5 right-2.5 text-stone-400 hover:text-white p-1 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
