// JSON-LD Schema Generators for Programmatic SEO

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Zemplate.ai",
  "url": "https://zemplate.ai",
  "logo": "https://zemplate.ai/logo.png",
  "sameAs": [
    "https://twitter.com/zemplateai",
    "https://instagram.com/zemplateai",
    "https://linkedin.com/company/zemplateai"
  ]
});

export const generateProductSchema = (template: any) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": template.title,
  "image": template.image,
  "description": `Generate stunning ${template.title} with AI. No prompting required.`,
  "brand": {
    "@type": "Brand",
    "name": "Zemplate.ai"
  },
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": template.likes.replace(/,/g, '') || "150"
  }
});

export const generateBreadcrumbSchema = (items: { label: string, href: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://zemplate.ai/"
    },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 2,
      "name": item.label,
      "item": `https://zemplate.ai${item.href}`
    }))
  ]
});

export const generateFAQSchema = (faqs: { question: string, answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
