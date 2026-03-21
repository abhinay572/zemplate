// Currency detection based on user location
// Uses free ipapi.co API to detect country, then maps to currency

export interface CurrencyInfo {
  symbol: string;
  code: string;
  rate: number; // conversion rate from INR
}

const CURRENCY_MAP: Record<string, CurrencyInfo> = {
  US: { symbol: "$", code: "USD", rate: 0.012 },
  GB: { symbol: "£", code: "GBP", rate: 0.0095 },
  EU: { symbol: "€", code: "EUR", rate: 0.011 },
  CA: { symbol: "C$", code: "CAD", rate: 0.016 },
  AU: { symbol: "A$", code: "AUD", rate: 0.019 },
  JP: { symbol: "¥", code: "JPY", rate: 1.79 },
  AE: { symbol: "AED", code: "AED", rate: 0.044 },
  SG: { symbol: "S$", code: "SGD", rate: 0.016 },
  IN: { symbol: "₹", code: "INR", rate: 1 },
};

// EU member countries
const EU_COUNTRIES = [
  "DE", "FR", "IT", "ES", "NL", "BE", "AT", "PT", "FI", "IE",
  "GR", "SK", "SI", "LT", "LV", "EE", "CY", "MT", "LU", "HR",
];

const DEFAULT_CURRENCY: CurrencyInfo = { symbol: "$", code: "USD", rate: 0.012 };
const INR_CURRENCY: CurrencyInfo = { symbol: "₹", code: "INR", rate: 1 };

let cachedCurrency: CurrencyInfo | null = null;

export async function detectCurrency(): Promise<CurrencyInfo> {
  if (cachedCurrency) return cachedCurrency;

  try {
    const res = await Promise.race([
      fetch("https://ipapi.co/json/"),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error("timeout")), 3000)),
    ]);

    const data = await res.json();
    const country = data.country_code || "";

    if (EU_COUNTRIES.includes(country)) {
      cachedCurrency = CURRENCY_MAP.EU;
    } else if (CURRENCY_MAP[country]) {
      cachedCurrency = CURRENCY_MAP[country];
    } else {
      cachedCurrency = DEFAULT_CURRENCY;
    }
  } catch {
    // Default to USD for non-Indian users if detection fails
    cachedCurrency = DEFAULT_CURRENCY;
  }

  return cachedCurrency;
}

export function formatPrice(inrAmount: number, currency: CurrencyInfo): string {
  if (currency.code === "INR") return `₹${inrAmount}`;
  const converted = Math.round(inrAmount * currency.rate);
  if (converted === 0 && inrAmount > 0) {
    // For very small amounts, show with decimal
    return `${currency.symbol}${(inrAmount * currency.rate).toFixed(2)}`;
  }
  return `${currency.symbol}${converted}`;
}
