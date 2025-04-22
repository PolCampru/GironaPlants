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
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}): Promise<Metadata> {
  const { lng } = await params;

  let title = "";
  let description = "";

  switch (lng) {
    case "es":
      title = "GironaPlants - Vivero especializado en plantas mediterráneas";
      description =
        "Descubre nuestra amplia selección de plantas mediterráneas, árboles y arbustos cultivados con pasión en nuestro vivero de Girona. Calidad y sostenibilidad garantizadas.";
      break;
    case "ca":
      title = "GironaPlants - Viver especialitzat en plantes mediterrànies";
      description =
        "Descobreix la nostra àmplia selecció de plantes mediterrànies, arbres i arbustos cultivats amb passió al nostre viver de Girona. Qualitat i sostenibilitat garantides.";
      break;
    case "en":
      title = "GironaPlants - Specialized nursery in Mediterranean plants";
      description =
        "Discover our wide selection of Mediterranean plants, trees and shrubs grown with passion in our nursery in Girona. Quality and sustainability guaranteed.";
      break;
    case "fr":
      title =
        "GironaPlants - Pépinière spécialisée en plantes méditerranéennes";
      description =
        "Découvrez notre large sélection de plantes méditerranéennes, d'arbres et d'arbustes cultivés avec passion dans notre pépinière de Gérone. Qualité et durabilité garanties.";
      break;
    default:
      title = "GironaPlants - Plantas mediterráneas";
      description = "Vivero especializado en plantas mediterráneas en Girona";
  }

  return {
    title,
    description,
    keywords:
      "plantas, vivero, Girona, mediterráneo, árboles, arbustos, jardinería, Catalunya",
  };
}

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
    <article>
      <section>
        <HeroHome data={heroHomeData} />
      </section>
      <section>
        <OurPlants data={plantsHomeData} />
      </section>
      <section>
        <Catalogues data={cataloguesHomeData} />
      </section>
      <section>
        <Contact data={contactHomeData} />
      </section>
    </article>
  );
}
