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
          name: 'GironaPlants - Distribuidor de planta mediterránea',
          description:
            'Empresa familiar con más de 30 años comercializando planta. No tenemos producción propia: seleccionamos cada especie en el vivero de España o del resto de Europa que mejor la cultiva y servimos pedidos completos a profesionales.',
          slogan: 'No la cultivamos: la encontramos.'
        }
      case 'en':
        return {
          name: 'GironaPlants - Mediterranean plant supplier',
          description:
            'Family-run company with more than 30 years in the plant trade. We have no production of our own: we select each species from the grower in Spain or the rest of Europe who raises it best, and supply complete orders to the trade.',
          slogan: "We don't grow it. We find it."
        }
      case 'fr':
        return {
          name: 'GironaPlants - Fournisseur de plantes méditerranéennes',
          description:
            'Entreprise familiale forte de plus de 30 ans dans le négoce de plantes. Sans production propre : nous sélectionnons chaque espèce chez le pépiniériste d\'Espagne ou du reste de l\'Europe qui la réussit le mieux et livrons des commandes complètes aux professionnels.',
          slogan: 'Nous ne la cultivons pas : nous la trouvons.'
        }
      default: // Catalan
        return {
          name: 'GironaPlants - Distribuïdor de planta mediterrània',
          description:
            "Empresa familiar amb més de 30 anys comercialitzant planta. No tenim producció pròpia: seleccionem cada espècie al viver d'Espanya o de la resta d'Europa que millor la cultiva i servim comandes completes a professionals.",
          slogan: 'No la cultivem: la trobem.'
        }
    }
  }

  const data = getLocalizedData()

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'WholesaleStore', 'GardenStore'],
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
    // The yard in Breda, not the province capital. These used to be 41.9794,
    // 2.8214 — Girona city centre, some 28 km from where the business is —
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
    // Mon-Fri 8:00-18:00, confirmed by the company. This used to open at 09:00
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
    sameAs: [
      'https://www.linkedin.com/in/gironaplants/',
      // The Google Business Profile, so the link from site to listing is
      // stated rather than left for Google to infer from matching address and
      // phone. By place ID, not the maps.app.goo.gl shortlink the company
      // shares: shortlinks are opaque and can rot. Same place either way —
      // CID 3744809856802255064, the id Google itself used to claim it.
      'https://www.google.com/maps/place/?q=place_id:ChIJQTfeMwAvuxIR2HAUUrk8-DM'
    ],
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
