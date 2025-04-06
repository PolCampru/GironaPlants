import Catalogues from "@/components/specific/AboutUs/Catalogues/Catalogues";
import Contact from "@/components/specific/Home/Contact/Contact";
import HeroHome from "@/components/specific/Home/Hero/Hero";
import OurPlants from "@/components/specific/Home/OurPlants/OurPlants";
import { CataloguesProps } from "@/types/AboutUs";
import {
  HeroHomeProps,
  HomeDataType,
  HomePageProps,
  PlantsHomeProps,
} from "@/types/Home";

export const metadata = {
  title: "GironaPlants Home",
  description: "Bienvenido a la página de inicio",
};

export default async function HomePage({ params }: HomePageProps) {
  const { lng } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${baseUrl}/api/strapi/home?locale=${lng}&populate=*&fields[0]=id&fields[1]=hero_title&fields[2]=hero_subtitle&fields[3]=hero_button&fields[4]=plants_title&fields[5]=plants_subtitle&fields[6]=plants_button&fields[7]=catalogues_title&fields[8]=catalogues_subtitle&fields[9]=catalogues_button&fields[10]=contact_title&fields[11]=contact_subtitle&fields[12]=contact_button`;

  const response = await fetch(url);

  const json = await response.json();

  const homeData: HomeDataType = json.data;

  const heroHomeData: HeroHomeProps = {
    hero_images: homeData?.hero_images || [],
    hero_title: homeData?.hero_title || "",
    hero_subtitle: homeData?.hero_subtitle || "",
    hero_button: homeData?.hero_button || "",
    locale: lng,
  };

  const plantsHomeData: PlantsHomeProps = {
    plants_title: homeData?.plants_title || "",
    plants_subtitle: homeData?.plants_subtitle || "",
    plants_button: homeData?.plants_button || "",
    locale: lng,
  };

  const cataloguesHomeData: CataloguesProps = {
    catalogues_title: homeData?.catalogues_title || "",
    catalogues_subtitle: homeData?.catalogues_subtitle || "",
    catalogues_button: homeData?.catalogues_button || "",
    locale: lng,
  };

  const contactHomeData = {
    contact_title: homeData?.contact_title || "",
    contact_subtitle: homeData?.contact_subtitle || "",
    contact_button: homeData?.contact_button || "",
    locale: lng,
  };

  return (
    <main>
      <HeroHome data={heroHomeData} />
      <OurPlants data={plantsHomeData} />
      <Catalogues data={cataloguesHomeData} />
      <Contact data={contactHomeData} />
    </main>
  );
}
