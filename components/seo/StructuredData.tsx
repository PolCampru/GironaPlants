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
          description:
            'Empresa familiar con más de 30 años de experiencia. Cultivamos planta mediterránea en la provincia de Girona y conseguimos las plantas que cada proyecto necesita a través de una red de viveros de confianza en toda Europa.',
          slogan: 'Si no la cultivamos, la encontramos.'
        }
      case 'en':
        return {
          name: 'GironaPlants - Mediterranean Plants Nursery',
          description:
            'Family-run company with more than 30 years of experience. We grow Mediterranean plants in the province of Girona, Catalonia, and source the plants every project needs through a trusted grower network across Europe.',
          slogan: "If we don't grow it, we'll find it."
        }
      case 'fr':
        return {
          name: 'GironaPlants - Pépinière de plantes méditerranéennes',
          description:
            'Entreprise familiale forte de plus de 30 ans d\'expérience. Nous cultivons des plantes méditerranéennes dans la province de Gérone, en Catalogne, et trouvons les plantes dont chaque projet a besoin grâce à un réseau de pépinières de confiance dans toute l\'Europe.',
          slogan: 'Si nous ne la cultivons pas, nous la trouvons.'
        }
      default: // Catalan
        return {
          name: 'GironaPlants - Viver de plantes mediterrànies',
          description:
            "Empresa familiar amb més de 30 anys d'experiència. Cultivem planta mediterrània a la província de Girona i aconseguim les plantes que cada projecte necessita a través d'una xarxa de vivers de confiança arreu d'Europa.",
          slogan: 'Si no la cultivem, la trobem.'
        }
    }
  }

  const data = getLocalizedData()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'GardenStore'],
    '@id': 'https://gironaplants.com/#business',
    name: data.name,
    alternateName: 'Girona Plants',
    description: data.description,
    slogan: data.slogan,
    url: 'https://gironaplants.com',
    image: 'https://gironaplants.com/images/lavenders.jpg',
    telephone: '+34 639 811 560',
    email: 'gironaplants@gironaplants.com',
    foundingDate: '1992',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Girona',
      addressRegion: 'Catalonia',
      addressCountry: 'ES'
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
    areaServed: ['Europe', 'Spain', 'France', 'Portugal', 'Italy', 'Germany', 'Andorra'],
    knowsLanguage: ['ca', 'es', 'en', 'fr'],
    sameAs: ['https://www.linkedin.com/in/gironaplants/'],
    priceRange: '€€',
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