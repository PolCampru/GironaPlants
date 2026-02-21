interface FetchOptions {
  retries?: number;
  timeout?: number;
  cache?: RequestCache;
  revalidate?: number;
}

class StrapiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public statusText?: string
  ) {
    super(message);
    this.name = 'StrapiError';
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function fetchWithRetry(
  url: string,
  options: RequestInit & FetchOptions = {}
): Promise<Response> {
  const { retries = 3, timeout = 10000, ...fetchOptions } = options;
  
  let lastError: Error;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, {
        ...fetchOptions,
        timeout,
      });

      if (!response.ok) {
        throw new StrapiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response.statusText
        );
      }

      return response;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      // Don't retry on client errors (4xx) except 408, 429
      if (error instanceof StrapiError && error.status) {
        if (error.status >= 400 && error.status < 500 && 
            error.status !== 408 && error.status !== 429) {
          throw error;
        }
      }

      // Wait before retry with exponential backoff
      if (attempt < retries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError!;
}

export async function fetchStrapiData(
  endpoint: string, 
  options: FetchOptions = {}
) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}/api/strapi/${endpoint}`;

    const fetchOptions: RequestInit & FetchOptions = {
      cache: options.cache || 'force-cache',
      next: options.revalidate ? { revalidate: options.revalidate } : { revalidate: 3600 }, // 1 hour default
      retries: options.retries || 3,
      timeout: options.timeout || 10000,
    };

    const response = await fetchWithRetry(url, fetchOptions);
    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new StrapiError('Invalid response format from Strapi API');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching Strapi data:', {
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });

    // Return null instead of throwing in some cases to allow graceful degradation
    if (error instanceof StrapiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

// Direct Strapi API calls (bypassing Next.js API routes for server-side)
export async function fetchStrapiDirect(
  endpoint: string,
  options: FetchOptions = {}
): Promise<any> {
  try {
    const strapiBaseUrl = process.env.STRAPI_BASE_URL;
    const strapiToken = process.env.STRAPI_TOKEN;

    if (!strapiBaseUrl || !strapiToken) {
      throw new StrapiError('Strapi configuration missing');
    }

    const url = `${strapiBaseUrl}/api/${endpoint}`;

    const fetchOptions: RequestInit & FetchOptions = {
      headers: {
        'Authorization': `Bearer ${strapiToken}`,
        'Content-Type': 'application/json',
      },
      cache: options.cache || 'force-cache',
      next: options.revalidate ? { revalidate: options.revalidate } : { revalidate: 3600 },
      retries: options.retries || 3,
      timeout: options.timeout || 10000,
    };

    const response = await fetchWithRetry(url, fetchOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching direct Strapi data:', {
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}
