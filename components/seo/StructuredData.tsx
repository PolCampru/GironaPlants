import React from 'react'

interface BusinessStructuredDataProps {
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
    // The nursery, not the province capital. These used to be 41.9794, 2.8214
    // — Girona city centre, some 28 km from where the plants actually are —
    // which is the one fact about a local business Google most needs right.
    // Matches the Google Business Profile, deliberately: a listing and a
    // site's own markup disagreeing about the location is a conflict Google
    // resolves on its own, and rarely in your favour.
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Carretera de Riells, Km 1',
      addressLocality: 'Breda',
      postalCode: '17400',
      addressRegion: 'Girona',
      addressCountry: 'ES'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 41.7591377,
      longitude: 2.5510631
    },
    // Mon-Fri 8:00-18:00, confirmed by the nursery. This used to open at 09:00
    // and claim a Saturday morning, neither of which matched the hours the
    // contact page has shown in all four languages (data/contactContent.ts) —
    // so Google was being handed opening times, and a day of the week, that
    // nobody here actually works.
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
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

interface SpeciesStructuredDataProps {
  name: string
  url: string
  genus: string
  lowPrice: number | null
  highPrice: number | null
  /** Rows that actually carry a price — see the offers block below. */
  offerCount: number
  description: string
}

/**
 * One botanical name, sold in several pot sizes and heights — so the price is
 * an AggregateOffer over the catalogue rows, never a single figure. The seller
 * points at the LocalBusiness node emitted by BusinessStructuredData rather
 * than repeating it on every one of the ~750 species pages.
 */
export function SpeciesStructuredData({
  name,
  url,
  genus,
  lowPrice,
  highPrice,
  offerCount,
  description,
}: SpeciesStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name,
    description,
    url,
    category: genus,
    // Required for a product rich result. The catalogue holds no per-species
    // photography, so this is the site image rather than a picture of this
    // plant — which is why it is the same one for every species page.
    image: 'https://gironaplants.com/images/lavenders.jpg',
    brand: { '@type': 'Brand', name: 'GironaPlants' },
    ...(lowPrice != null && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        lowPrice,
        highPrice: highPrice ?? lowPrice,
        // Rows without a price are not offers: counting them would advertise
        // ten offers spanning a range computed from two.
        offerCount,
        availability: 'https://schema.org/InStock',
        url,
        seller: { '@id': 'https://gironaplants.com/#business' },
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface GenusStructuredDataProps {
  genus: string
  url: string
  items: { name: string; url: string }[]
}

/** The species a genus page lists, so the page is read as a catalogue listing. */
export function GenusStructuredData({ genus, url, items }: GenusStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collection`,
    name: genus,
    url,
    isPartOf: { '@id': 'https://gironaplants.com/#business' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
