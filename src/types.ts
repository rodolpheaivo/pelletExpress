export interface TranslationKeys {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    priceLabel: string;
    priceUnit: string;
    ctaOrder: string;
    ctaContact: string;
    badgeTrust: string;
  };
  problemSolution: {
    title: string;
    subtitle: string;
    problemsTitle: string;
    solutionsTitle: string;
    problems: string[];
    solutions: string[];
  };
  benefits: {
    title: string;
    subtitle: string;
    list: {
      title: string;
      desc: string;
    }[];
  };
  whyUs: {
    title: string;
    subtitle: string;
    points: {
      title: string;
      desc: string;
    }[];
  };
  specs: {
    title: string;
    subtitle: string;
    weight: string;
    diameter: string;
    ash: string;
    moisture: string;
    caloricValue: string;
    certifications: string;
  };
  comparison: {
    title: string;
    subtitle: string;
    headers: string[];
    us: string[];
    competitors: string[];
  };
  howToOrder: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      desc: string;
    }[];
  };
  delivery: {
    title: string;
    subtitle: string;
    zonesTitle: string;
    zonesDesc: string;
    methodsTitle: string;
    methods: {
      title: string;
      desc: string;
    }[];
    paymentsTitle: string;
    payments: {
      title: string;
      desc: string;
    }[];
  };
  calculator: {
    title: string;
    subtitle: string;
    houseSizeLabel: string;
    insulationLabel: string;
    insulationOptions: {
      excellent: string;
      good: string;
      average: string;
      poor: string;
    };
    currentFuelLabel: string;
    currentFuelOptions: {
      coal: string;
      gas: string;
      electric: string;
      wood: string;
    };
    resultTitle: string;
    estimatedPellet: string;
    estimatedCost: string;
    savings: string;
    addCta: string;
  };
  orderForm: {
    title: string;
    subtitle: string;
    qtyLabel: string;
    unitPrice: string;
    totalPrice: string;
    fullName: string;
    phone: string;
    email: string;
    address: string;
    deliveryZone: string;
    deliveryMethod: string;
    paymentMethod: string;
    submitCta: string;
    successTitle: string;
    successDesc: string;
    successCta: string;
    emailInstruct: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: {
      q: string;
      a: string;
    }[];
  };
}

export type Language = 'PL' | 'EN';
