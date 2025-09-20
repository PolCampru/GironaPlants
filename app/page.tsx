import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getLanguages } from '@/lib/languages';

const locales = getLanguages();
const defaultLocale = 'ca';

// This page should not be rendered directly, but serves as a fallback
export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('Accept-Language') || '';
  
  // Parse preferred languages
  const preferredLanguages = acceptLanguage
    .split(',')
    .map(lang => lang.split('-')[0].trim())
    .filter(lang => lang);

  // Find the first supported language or use default
  let userLang = defaultLocale;
  for (const lang of preferredLanguages) {
    if (locales.includes(lang)) {
      userLang = lang;
      break;
    }
  }

  console.log('🚀 Página raíz ejecutándose, redirigiendo a:', `/${userLang}`);
  
  // Redirect to the appropriate language
  redirect(`/${userLang}`);
}
