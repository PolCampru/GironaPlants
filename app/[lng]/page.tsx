import LanguageInitializer from "./LanguageInitializer";
import axios from "axios";

interface PageProps {
  params: { lng: string };
}

export default async function Home({ params: { lng } }: PageProps) {
  // const { data: pageData } = await axios.get(
  //   `${process.env.STRAPI_API_URL}/pages?locale=${lng}`
  // );
  <LanguageInitializer lng={lng} />;
  return <main>Hello World! {lng}</main>;
}
