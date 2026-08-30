import { MetadataRoute } from 'next'
import { getLanguages } from '@/lib/languages'
import { getCatalogue } from '@/lib/catalogue'

/**
 * The sitemap.
 *
 * Two things used to be wrong with it. A static public/sitemap.xml shadowed
 * this route — a file in public/ wins over a route of the same path — so
 * Google only ever saw a hand-written list of nine pages, frozen in July.
 * And this route emitted /{lng}/products/{id} and /{lng}/offers/{id}, which
 * were never routes: every dynamic URL in it was a 404.
 *
 * What is here now is what the site actually serves: the static pages, one
 * page per genus and one per botanical name, in each of the four locales.
 */
/** Rebuilt hourly, so a build that could not reach Strapi heals itself. */
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gironaplants.com'
  const languages = getLanguages()
  const lastModified = new Date()

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

  const urls: MetadataRoute.Sitemap = []
  
  languages.forEach(lang => {
    staticPages.forEach(page => {
      const priority = page === '' ? 1.0 : 
                     page === '/products' || page === '/offers' ? 0.8 :
                     page === '/about-us' || page === '/catalogues' ? 0.7 :
                     page === '/budget' || page === '/contact' ? 0.6 : 0.3
      
      const changeFreq = page === '' || page === '/products' || page === '/offers' ? 'weekly' :
                        page === '/about-us' || page === '/catalogues' || page === '/budget' || page === '/contact' ? 'monthly' : 'yearly'

      urls.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified,
        changeFrequency: changeFreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
        priority: priority,
      })
    })
  })

  // Never throws: getCatalogue() returns [] if Strapi is unreachable, and a
  // sitemap missing its deep pages for one hour beats a 500 that costs the
  // whole file.
  const catalogue = await getCatalogue()

  catalogue.forEach(genus => {
    languages.forEach(lang => {
      urls.push({
        url: `${baseUrl}/${lang}/products/${genus.slug}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      })

      genus.species.forEach(species => {
        urls.push({
          url: `${baseUrl}/${lang}/products/${genus.slug}/${species.slug}`,
          lastModified,
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      })
    })
  })

  return urls
}
