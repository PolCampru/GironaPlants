import axios from "axios";

interface PageProps {
  params: { lng: string };
}

export default async function Page({ params: { lng } }: PageProps) {
  const { data: pageData } = await axios.get(
    `${process.env.STRAPI_API_URL}/pages?locale=${lng}`
  );

  return <main>Hello World! {lng}</main>;
}
