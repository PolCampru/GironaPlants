import React from 'react'

interface BusinessStructuredDataProps {
  locale?: string
}

interface ProductStructuredDataProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    image?: string
    category?: string
  }
  locale?: string
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[]
}

export function BusinessStructuredData({ locale = 'ca' }: BusinessStructuredDataProps) {
  const getLocalizedData = () => {
    switch (locale) {
      case 'es':
        return {
          name: 'GironaPlants - Vivero de plantas mediterráneas',
          description: 'Vivero especializado en plantas mediterráneas, árboles y arbustos en Girona, Cataluña.',
          address: 'Girona, Cataluña, España'
        }
      case 'en':
        return {
          name: 'GironaPlants - Mediterranean Plants Nursery',
          description: 'Specialized nursery in Mediterranean plants, trees and shrubs in Girona, Catalonia.',
          address: 'Girona, Catalonia, Spain'
        }
      case 'fr':
        return {
          name: 'GironaPlants - Pépinière de plantes méditerranéennes',
          description: 'Pépinière spécialisée en plantes méditerranéennes, arbres et arbustes à Gérone, Catalogne.',
          address: 'Gérone, Catalogne, Espagne'
        }
      default: // Catalan
        return {
          name: 'GironaPlants - Viver de plantes mediterrànies',
          description: 'Viver especialitzat en plantes mediterrànies, arbres i arbustos a Girona, Catalunya.',
          address: 'Girona, Catalunya, Espanya'
        }
    }
  }

  const data = getLocalizedData()
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://gironaplants.com',
    name: data.name,
    description: data.description,
    url: 'https://gironaplants.com',
    telephone: '+34-XXX-XXX-XXX', // Replace with actual phone
    email: 'gironaplants@gironaplants.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Girona',
      addressRegion: 'Catalonia',
      addressCountry: 'ES',
      streetAddress: data.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.9794,
      longitude: 2.8214
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '14:00'
      }
    ],
    sameAs: [
      // Add social media URLs when available
    ],
    priceRange: '€',
    servedCuisine: [], // Not applicable for plants
    acceptedPaymentMethod: [
      'http://purl.org/goodrelations/v1#Cash',
      'http://purl.org/goodrelations/v1#ByBankTransferInAdvance',
      'http://purl.org/goodrelations/v1#ByInvoice'
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

export function ProductStructuredData({ product, locale = 'ca' }: ProductStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://gironaplants.com/products/${product.id}`,
    name: product.name,
    description: product.description,
    image: product.image || 'https://gironaplants.com/images/default-plant.jpg',
    brand: {
      '@type': 'Brand',
      name: 'GironaPlants'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'GironaPlants'
    },
    offers: {
      '@type': 'Offer',
      url: `https://gironaplants.com/${locale}/products/${product.id}`,
      priceCurrency: 'EUR',
      price: product.price,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'GironaPlants'
      }
    },
    category: product.category || 'Plants',
    sku: product.id
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}