import { MetadataRoute } from 'next'
import { getLanguages } from '@/lib/languages'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gironaplants.com'
  const languages = getLanguages()
  
  // Static pages
  const staticPages = [
    '',
    '/products',
    '/offers', 
    '/about-us',
    '/catalogues',
    '/budget',
    '/contact',
    '/privacy',
    '/cookie-policy'
  ]

  // Generate URLs for each language
  const staticUrls: MetadataRoute.Sitemap = []
  
  languages.forEach(lang => {
    staticPages.forEach(page => {
      const priority = page === '' ? 1.0 : 
                     page === '/products' || page === '/offers' ? 0.8 :
                     page === '/about-us' || page === '/catalogues' ? 0.7 :
                     page === '/budget' || page === '/contact' ? 0.6 : 0.3
      
      const changeFreq = page === '' || page === '/products' || page === '/offers' ? 'weekly' :
                        page === '/about-us' || page === '/catalogues' || page === '/budget' || page === '/contact' ? 'monthly' : 'yearly'

      staticUrls.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: changeFreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
        priority: priority,
      })
    })
  })

  // Try to fetch dynamic content from Strapi
  const dynamicUrls: MetadataRoute.Sitemap = []
  
  try {
    // Fetch plants for dynamic product pages
    const plantsResponse = await fetch(`${process.env.STRAPI_BASE_URL}/api/plants?pagination[limit]=1000`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`
      }
    })
    
    if (plantsResponse.ok) {
      const plantsData = await plantsResponse.json()
      
      // Generate plant detail pages if they exist
      languages.forEach(lang => {
        plantsData.data?.forEach((plant: any) => {
          if (plant.id) {
            dynamicUrls.push({
              url: `${baseUrl}/${lang}/products/${plant.id}`,
              lastModified: new Date(plant.updatedAt || plant.createdAt || new Date()),
              changeFrequency: 'weekly',
              priority: 0.6,
            })
          }
        })
      })
    }
    
    // Fetch offers for dynamic offer pages
    const offersResponse = await fetch(`${process.env.STRAPI_BASE_URL}/api/offers?pagination[limit]=1000`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`
      }
    })
    
    if (offersResponse.ok) {
      const offersData = await offersResponse.json()
      
      languages.forEach(lang => {
        offersData.data?.forEach((offer: any) => {
          if (offer.id) {
            dynamicUrls.push({
              url: `${baseUrl}/${lang}/offers/${offer.id}`,
              lastModified: new Date(offer.updatedAt || offer.createdAt || new Date()),
              changeFrequency: 'weekly', 
              priority: 0.7,
            })
          }
        })
      })
    }
  } catch (error) {
    console.error('Error fetching dynamic content for sitemap:', error)
  }

  return [...staticUrls, ...dynamicUrls]
}