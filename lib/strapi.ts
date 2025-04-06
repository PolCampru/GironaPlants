export async function fetchStrapiData(endpoint: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/api/strapi/${endpoint}`;

  const response = await fetch(url);

  const data = await response.json();

  return data.data;
}
