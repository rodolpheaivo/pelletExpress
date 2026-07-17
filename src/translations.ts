import { TranslationKeys, Language } from './types';

export const translations: Record<Language, TranslationKeys> = {
  PL: {
    hero: {
      badge: "★ Najwyższa Klasa Premium (ENplus A1)",
      title: "Ciepło, na którym możesz polegać każdej zimy",
      subtitle: "Zamów certyfikowany pellet drzewny klasy premium z błyskawiczną dostawą bezpośrednio pod Twoje drzwi w całej Polsce.",
      priceLabel: "Cena za paletę (Big-Bag 1000 kg)",
      priceUnit: "PLN",
      ctaOrder: "Zamów teraz",
      ctaContact: "Skontaktuj się",
      badgeTrust: "✓ Gwarancja braku spieków • ✓ Szybka dostawa z windą • ✓ Płatność przy odbiorze"
    },
    problemSolution: {
      title: "Koniec z loterią grzewczą",
      subtitle: "Dlaczego tanie, niepewne paliwo kosztuje Cię więcej, niż myślisz?",
      problemsTitle: "Częste problemy u konkurencji",
      solutionsTitle: "Standard Pellet Express Polska",
      problems: [
        "Słaba jakość pelletu powodująca powstawanie spieków i blokowanie podajnika.",
        "Wysoka wilgotność dająca mało ciepła i zużywająca więcej ton paliwa.",
        "Kierowcy zostawiający palety na drodze, brak kontaktu i spóźnione dostawy.",
        "Ukryte koszty i brak przejrzystości cenowej przy zakupie."
      ],
      solutions: [
        "100% czyste drewno iglaste (świerk/sosna) bez lepiszczy, kory i piasku.",
        "Doskonałe parametry suszenia: wilgotność poniżej 6%, dająca maksymalną kaloryczność.",
        "Profesjonalny transport z windą hydrauliczną i wózkiem paletowym pod same drzwi.",
        "Stała cena 1350 PLN za tonę, żadnych ukrytych opłat, pełna faktura VAT."
      ]
    },
    benefits: {
      title: "Komfort, oszczędność i spokój umysłu",
      subtitle: "Wybierając Gold Pellet Polska, zyskujesz bezkompromisową jakość grzewczą",
      list: [
        {
          title: "Maksymalna wydajność",
          desc: "Wysoka kaloryczność (powyżej 18.5 MJ/kg) sprawia, że zużywasz do 20% mniej pelletu niż w przypadku tańszych zamienników."
        },
        {
          title: "Bezpieczeństwo kotła",
          desc: "Znikoma ilość popiołu (poniżej 0.5%) chroni Twój palnik przed spiekami, co zapobiega awariom i wydłuża żywotność pieca."
        },
        {
          title: "Czystość i wygoda",
          desc: "Pellet nie kurzy się, pachnie naturalnym lasem iglastym i pakowany jest w wytrzymałe, hermetyczne worki chroniące przed wilgocią."
        },
        {
          title: "Profesjonalny transport",
          desc: "Wozimy wyłącznie wyspecjalizowanymi autami z windą hydrauliczną. Rozładunek odbywa się sprawnie i w miejscu, które wskażesz."
        },
        {
          title: "Dwujęzyczne wsparcie EN/PL",
          desc: "Zapewniamy profesjonalną obsługę klienta w języku polskim i angielskim na każdym etapie zamówienia."
        },
        {
          title: "Uczciwe zasady gry",
          desc: "Nie musisz płacić z góry. Oferujemy płatność gotówką lub kartą przy odbiorze kierowcy po sprawdzeniu jakości towaru."
        }
      ]
    },
    whyUs: {
      title: "Dlaczego jesteśmy liderem zaufania?",
      subtitle: "Dla nas pellet to nie tylko produkt. To obietnica bezpiecznego ciepła w Twoim domu.",
      points: [
        {
          title: "Przejrzystość na 100%",
          desc: "Wszystkie parametry fizykochemiczne są badane laboratoryjnie i w pełni zgodne z rzeczywistością. Nie fałszujemy certyfikatów."
        },
        {
          title: "Błyskawiczny czas reakcji",
          desc: "Dostarczamy towar w ciągu 2-5 dni roboczych od potwierdzenia zamówienia. Zawsze informujemy o godzinie dostawy telefonicznie."
        },
        {
          title: "Zredukowane ryzyko",
          desc: "Zamawiasz bez zaliczek. Jeśli towar nie spełni Twoich oczekiwań przy rozładunku, kierowca zabierze go z powrotem bez żadnych kosztów."
        },
        {
          title: "Obsługa klienta premium",
          desc: "Dedykowany opiekun dba o to, by dostawa przebiegła gładko, a Ty czuł się zaopiekowany przed i po zakupie."
        }
      ]
    },
    specs: {
      title: "Specyfikacja techniczna i certyfikaty",
      subtitle: "Parametry laboratoryjne, które gwarantują bezawaryjną pracę Twojej instalacji grzewczej",
      weight: "Waga palety",
      diameter: "Średnica pelletu",
      ash: "Zawartość popiołu",
      moisture: "Wilgotność całkowita",
      caloricValue: "Wartość opałowa",
      certifications: "Certyfikacja klasy"
    },
    comparison: {
      title: "Zrób mądre porównanie",
      subtitle: "Zobacz różnicę i przekonaj się, dlaczego pozorna oszczędność na tańszym pellecie to błąd",
      headers: ["Cecha", "Pellet Express Polska", "Tani pellet z rynku"],
      us: [
        "Klasa Premium ENplus A1",
        "Wysoka (>18.5 MJ/kg)",
        "Bardzo niska (<0.5%)",
        "Brak (czyste trociny iglaste)",
        "Winda hydrauliczna + wózek",
        "Płatność przy odbiorze (0% ryzyka)",
        "Wsparcie EN / PL"
      ],
      competitors: [
        "Często brak certyfikatów",
        "Niska (15-16 MJ/kg)",
        "Wysoka (>1.5% - ryzyko spieków)",
        "Piasek, kora, kleje chemiczne",
        "Często brak rozładunku (tylko kurier)",
        "Wymagana przedpłata",
        "Utrudniony kontakt"
      ]
    },
    howToOrder: {
      title: "Prosty proces zamówienia w 4 krokach",
      subtitle: "Zarezerwuj dostawę w mniej niż 2 minuty, bez skomplikowanych formalności",
      steps: [
        {
          title: "Krok 1: Wybierz ilość",
          desc: "Określ ile ton (palet) pelletu potrzebujesz. Możesz skorzystać z naszego kalkulatora zużycia."
        },
        {
          title: "Krok 2: Wypełnij formularz",
          desc: "Podaj adres dostawy oraz dane kontaktowe. Nie wymagamy podawania danych karty kredytowej."
        },
        {
          title: "Krok 3: Potwierdzenie",
          desc: "Skontaktujemy się z Tobą telefonicznie lub mailowo w celu ustalenia dogodnego terminu dostawy."
        },
        {
          title: "Krok 4: Dostawa i płatność",
          desc: "Kierowca dostarcza pellet windą. Sprawdzasz jakość i płacisz przy odbiorze. Ciesz się czystym ciepłem!"
        }
      ]
    },
    delivery: {
      title: "Dostawa i Bezpieczne Płatności",
      subtitle: "Dostarczamy na terenie całej Polski, dbając o każdy szczegół transportu",
      zonesTitle: "Obszar i Czas Dostawy",
      zonesDesc: "Nasz profesjonalny transport dociera do każdego województwa w Polsce. Średni czas realizacji zamówienia wynosi od 2 do 5 dni roboczych. Kierowca dzwoni do Ciebie na 2 godziny przed przyjazdem.",
      methodsTitle: "Metody dostawy",
      methods: [
        {
          title: "Dostawa Premium z windą",
          desc: "Auto ciężarowe wyposażone w windę hydrauliczną oraz ręczny wózek paletowy. Rozładunek na utwardzonej powierzchni."
        },
        {
          title: "Odbiór osobisty",
          desc: "Możliwość odbioru własnym transportem z naszego magazynu po wcześniejszym uzgodnieniu terminu."
        }
      ],
      paymentsTitle: "Bezpieczne formy płatności",
      payments: [
        {
          title: "Płatność przy odbiorze (COD)",
          desc: "Płacisz bezpiecznie gotówką lub kartą kierowcy dopiero po dostarczeniu i obejrzeniu pelletu."
        },
        {
          title: "Tradycyjny przelew bankowy",
          desc: "Opłata na podstawie faktury proforma przed wysyłką towaru. Wygodne dla firm."
        }
      ]
    },
    calculator: {
      title: "Kalkulator Zużycia i Kosztów",
      subtitle: "Oblicz szacunkowe zapotrzebowanie na pellet dla Twojego domu i zobacz roczny koszt ogrzewania",
      houseSizeLabel: "Powierzchnia domu (m²)",
      insulationLabel: "Klasa ocieplenia budynku",
      insulationOptions: {
        excellent: "Doskonała (nowy dom energooszczędny)",
        good: "Dobra (lekko ocieplony dom)",
        average: "Przeciętna (standardowe ocieplenie)",
        poor: "Słaba (stare budownictwo, brak ocieplenia)"
      },
      currentFuelLabel: "Obecny sposób ogrzewania",
      currentFuelOptions: {
        coal: "Węgiel / Ekogroszek",
        gas: "Gaz ziemny",
        electric: "Ogrzewanie elektryczne",
        wood: "Drewno kawałkowe"
      },
      resultTitle: "Szacunkowe wyniki obliczeń",
      estimatedPellet: "Zapotrzebowanie na pellet",
      estimatedCost: "Szacowany roczny koszt",
      savings: "Twój potencjalny zysk",
      addCta: "Zastosuj tę ilość w zamówieniu"
    },
    orderForm: {
      title: "Szybkie zamówienie / Zapytanie ofertowe",
      subtitle: "Wypełnij poniższe pola. Przygotujemy dla Ciebie niezobowiązującą wycenę z transportem i skontaktujemy się błyskawicznie.",
      qtyLabel: "Ilość pelletu (Palety / Big-Bags po 1000 kg)",
      unitPrice: "Cena za tonę",
      totalPrice: "Wartość zamówienia brutto",
      fullName: "Imię i Nazwisko",
      phone: "Numer telefonu",
      email: "Adres e-mail",
      address: "Dokładny adres dostawy (Ulica, nr, kod pocztowy, miasto)",
      deliveryZone: "Województwo dostawy",
      deliveryMethod: "Preferowana metoda dostawy",
      paymentMethod: "Preferowana forma płatności",
      submitCta: "Wyślij zapytanie o zamówienie",
      successTitle: "Dziękujemy za zapytanie!",
      successDesc: "Twoje zapytanie zostało wygenerowane pomyślnie. Aby ukończyć proces, wyślij wygenerowaną wiadomość e-mail do nas na Pelletexpresspolska2@gmail.com lub kliknij przycisk poniżej, aby wysłać automatycznie.",
      successCta: "Otwórz program pocztowy",
      emailInstruct: "Skopiuj poniższą treść i wyślij na adres Pelletexpresspolska2@gmail.com jeśli program pocztowy się nie otworzy:"
    },
    faq: {
      title: "Często Zadawane Pytania (FAQ)",
      subtitle: "Odpowiedzi na najczęstsze pytania naszych klientów",
      items: [
        {
          q: "Czy pellet posiada certyfikat ENplus A1?",
          a: "Tak, nasz pellet produkowany jest zgodnie z najsurowszymi normami europejskimi klasy A1. Gwarantuje to maksymalną czystość trocin, wysoką kaloryczność oraz minimalną zawartość popiołu."
        },
        {
          q: "Jak wygląda rozładunek i czy kierowca pomoże z wniesieniem?",
          a: "Nasi kierowcy posiadają windy hydrauliczne oraz wózki paletowe. Rozładowują paletę w miejscu utwardzonym (np. podjazd, garaż, o ile nawierzchnia na to pozwala). Standardowa usługa nie obejmuje ręcznego wnoszenia pojedynczych worków po schodach, ale kierowcy zawsze starają się pomóc w miarę możliwości technicznych."
        },
        {
          q: "Czy cena 1350 PLN zawiera koszty dostawy?",
          a: "Cena 1350 PLN to cena bazowa za 1 tonę (1000 kg) pelletu spakowanego na palecie. Koszt transportu zależy od województwa docelowego i jest kalkulowany indywidualnie. Przy zamówieniach od 3 ton oferujemy darmową dostawę w wielu regionach Polski!"
        },
        {
          q: "Jakie drewno jest używane do produkcji pelletu?",
          a: "Nasz pellet jest produkowany w 100% z czystych trocin drzew iglastych (głównie świerk i sosna), bez jakichkolwiek sztucznych dodatków, klejów, piasku czy kory. Dzięki temu ma piękny jasny kolor i zapach naturalnego drewna."
        },
        {
          q: "Czy mogę zapłacić kierowcy kartą?",
          a: "Tak, większość naszych kierowców posiada terminale płatnicze. Przy składaniu zamówienia prosimy o zaznaczenie preferencji płatności kartą przy odbiorze, abyśmy mogli to potwierdzić."
        }
      ]
    }
  },
  EN: {
    hero: {
      badge: "★ Highest Premium Class (ENplus A1)",
      title: "Warmth you can rely on every single winter",
      subtitle: "Order certified premium wood pellets with lightning-fast delivery directly to your door across Poland.",
      priceLabel: "Price per pallet (Big-Bag 1000 kg)",
      priceUnit: "PLN",
      ctaOrder: "Order now",
      ctaContact: "Contact us",
      badgeTrust: "✓ No slag guarantee • ✓ Fast lift truck delivery • ✓ Payment on delivery"
    },
    problemSolution: {
      title: "No more heating lotteries",
      subtitle: "Why cheap, unreliable fuel costs you more than you think?",
      problemsTitle: "Common issues with local sellers",
      solutionsTitle: "Pellet Express Polska standards",
      problems: [
        "Poor pellet quality causing clinkers/slag and clogging the boiler feeder.",
        "High moisture level leading to low heat output and burning more tons of fuel.",
        "Drivers leaving pallets on the road, lack of contact, and late deliveries.",
        "Hidden fees and lack of transparency during the purchasing process."
      ],
      solutions: [
        "100% clean softwood sawdust (spruce/pine) without chemical binders, bark, or sand.",
        "Perfect drying parameters: moisture below 6% for maximum caloric value.",
        "Professional transport equipped with a hydraulic tail lift and pallet jack to your door.",
        "Flat rate of 1350 PLN per ton, no hidden fees, full VAT invoice provided."
      ]
    },
    benefits: {
      title: "Comfort, savings, and peace of mind",
      subtitle: "By choosing Gold Pellet Polska, you gain uncompromising heating performance",
      list: [
        {
          title: "Maximum Efficiency",
          desc: "High caloric value (above 18.5 MJ/kg) ensures you burn up to 20% less pellet compared to cheaper market alternatives."
        },
        {
          title: "Boiler Safety",
          desc: "Extremely low ash content (under 0.5%) prevents clinker/slag buildup, protecting your boiler and extending its lifespan."
        },
        {
          title: "Clean and Convenient",
          desc: "Dust-free pellet bags that smell like natural forest, packed in heavy-duty moisture-proof hermetic bags."
        },
        {
          title: "Professional Transport",
          desc: "We ship exclusively using specialized trucks with hydraulic tail lifts, unloading exactly where you need it."
        },
        {
          title: "Bilingual Support EN/PL",
          desc: "We provide dedicated professional support in both Polish and English to make communication effortless."
        },
        {
          title: "Zero-Risk Terms",
          desc: "No upfront payment required. We offer safe Cash on Delivery (COD) or Card on Delivery after inspecting the product."
        }
      ]
    },
    whyUs: {
      title: "Why are we Poland's trusted supplier?",
      subtitle: "To us, wood pellets are not just a product. It's a promise of safe warmth for your family.",
      points: [
        {
          title: "100% Transparency",
          desc: "All physical and chemical specifications are laboratory tested and verified. We do not falsify certifications."
        },
        {
          title: "Express Dispatch",
          desc: "We deliver within 2-5 business days from order confirmation. Our drivers always call you 2 hours before arrival."
        },
        {
          title: "Risk-Free Ordering",
          desc: "No down payments. If the product does not meet your high standards upon unloading, we will take it back for free."
        },
        {
          title: "Premium Customer Service",
          desc: "A dedicated logistics manager ensures your delivery goes smoothly and answers any questions before and after purchase."
        }
      ]
    },
    specs: {
      title: "Technical Specifications & Standards",
      subtitle: "Laboratory parameters that ensure hassle-free operation of your pellet stove or boiler",
      weight: "Pallet Weight",
      diameter: "Pellet Diameter",
      ash: "Ash Content",
      moisture: "Total Moisture",
      caloricValue: "Caloric Value",
      certifications: "Class Certification"
    },
    comparison: {
      title: "Make a Smart Comparison",
      subtitle: "See the differences and understand why saving a few zlotys on cheap pellet is a bad investment",
      headers: ["Feature", "Pellet Express Polska", "Cheap Market Pellet"],
      us: [
        "Premium Class ENplus A1",
        "High (>18.5 MJ/kg)",
        "Extremely Low (<0.5%)",
        "None (100% pure softwood sawdust)",
        "Tail lift truck + pallet jack delivery",
        "Payment on delivery (0% risk)",
        "Bilingual support EN / PL"
      ],
      competitors: [
        "Often lacks certifications",
        "Low (15-16 MJ/kg)",
        "High (>1.5% - causes clinker)",
        "Contains sand, bark, chemical glues",
        "No unloading service (roadside drop)",
        "Prepayment required",
        "Hard to reach support"
      ]
    },
    howToOrder: {
      title: "Simple 4-Step Ordering Process",
      subtitle: "Book your high-grade heating pellet in under 2 minutes, hassle-free",
      steps: [
        {
          title: "Step 1: Choose Quantity",
          desc: "Select how many tons (pallets) you need. Use our integrated heating calculator to estimate your needs."
        },
        {
          title: "Step 2: Fill the Form",
          desc: "Provide your delivery address and contact details. No credit card details required."
        },
        {
          title: "Step 3: Confirmation",
          desc: "We will contact you via phone or email to verify delivery details and agree on a convenient day."
        },
        {
          title: "Step 4: Delivery & Pay",
          desc: "Our driver unloads the pallet with a lift. Inspect the premium quality and pay on delivery. Enjoy safe warmth!"
        }
      ]
    },
    delivery: {
      title: "Delivery & Safe Payments",
      subtitle: "We ship nationwide across Poland, handling every delivery with care",
      zonesTitle: "Areas & Shipping Time",
      zonesDesc: "Our professional freight network reaches every single voivodeship in Poland. Average delivery time is 2 to 5 business days. Our driver will call you exactly 2 hours prior to arrival.",
      methodsTitle: "Delivery Methods",
      methods: [
        {
          title: "Premium Tail-Lift Freight",
          desc: "Heavy-duty truck equipped with a hydraulic tail lift and physical pallet jack. Delivery onto a paved surface."
        },
        {
          title: "Self-Pickup",
          desc: "Pick up the order directly from our warehouse with your own truck after scheduled arrangement."
        }
      ],
      paymentsTitle: "Secure Payment Methods",
      payments: [
        {
          title: "Cash / Card on Delivery (COD)",
          desc: "Pay safely in cash or via card to the driver's terminal only after the pellets are safely delivered."
        },
        {
          title: "Traditional Bank Wire",
          desc: "Pay via standard bank transfer using a proforma invoice before dispatch. Convenient for businesses."
        }
      ]
    },
    calculator: {
      title: "Consumption & Cost Calculator",
      subtitle: "Estimate the wood pellet requirements for your home and see your estimated annual heating costs",
      houseSizeLabel: "House Size (m²)",
      insulationLabel: "Building Insulation Class",
      insulationOptions: {
        excellent: "Excellent (new energy-efficient house)",
        good: "Good (well insulated)",
        average: "Average (standard insulation)",
        poor: "Poor (older house, no insulation)"
      },
      currentFuelLabel: "Current Heating Method",
      currentFuelOptions: {
        coal: "Coal / Eco-coal",
        gas: "Natural Gas",
        electric: "Electric heating",
        wood: "Standard firewood"
      },
      resultTitle: "Estimated Calculations",
      estimatedPellet: "Estimated Pellet Needed",
      estimatedCost: "Estimated Annual Cost",
      savings: "Your Potential Gain",
      addCta: "Apply this quantity to my order"
    },
    orderForm: {
      title: "Quick Order / Request a Quote",
      subtitle: "Fill in the fields below. We will prepare an obligation-free quote with delivery costs and get back to you immediately.",
      qtyLabel: "Pellet Quantity (Pallets / Big-Bags of 1000 kg)",
      unitPrice: "Price per ton",
      totalPrice: "Estimated Gross Total",
      fullName: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      address: "Delivery Address (Street, House No, Postcode, City)",
      deliveryZone: "Voivodeship / Region",
      deliveryMethod: "Preferred Delivery Method",
      paymentMethod: "Preferred Payment Method",
      submitCta: "Send Order Query",
      successTitle: "Thank you for your request!",
      successDesc: "Your order request has been generated successfully. To complete the process, send the draft email to Pelletexpresspolska2@gmail.com, or click below to open your mail app automatically.",
      successCta: "Open Mail App",
      emailInstruct: "Copy the following text and send to Pelletexpresspolska2@gmail.com if your email client doesn't open automatically:"
    },
    faq: {
      title: "Frequently Asked Questions (FAQ)",
      subtitle: "Answers to the most common questions from homeowners in Poland",
      items: [
        {
          q: "Are the pellets ENplus A1 certified?",
          a: "Yes, our wood pellets are manufactured strictly in accordance with European ENplus A1 quality guidelines. This ensures high caloric density, low ash generation, and protection against clinkers."
        },
        {
          q: "How does unloading work, and will the driver bring it inside?",
          a: "Our trucks are equipped with hydraulic lifts and hand pallet jacks. They unload the pallets onto paved surfaces like driveways or garages. Ramping/carrying single 15kg bags up stairs is not standard, but our drivers are always friendly and help as much as possible."
        },
        {
          q: "Does the 1350 PLN price include delivery?",
          a: "The 1350 PLN price is the base price for 1 ton (1000 kg) of pellet secured on a pallet. Shipping costs are calculated based on your voivodeship. For orders of 3 tons or more, we offer free shipping in many regions!"
        },
        {
          q: "What type of wood is used in production?",
          a: "Our pellets are crafted from 100% pure coniferous sawdust (spruce and pine), with no artificial additives, chemicals, sand, or bark. This guarantees a clean light-golden color and a natural pine scent."
        },
        {
          q: "Can I pay the driver with a credit card?",
          a: "Yes! Most of our delivery vehicles carry mobile payment terminals. Please select 'Card on Delivery' in the booking form so we can confirm it for your delivery route."
        }
      ]
    }
  }
};
