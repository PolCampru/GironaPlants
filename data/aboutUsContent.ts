// Per-locale fallback copy for the About Us page. Strapi content wins when a
// field is filled in; these keep the page complete (it used to render blank)
// while the CMS is empty or unreachable.
// The same copy is seeded into Strapi by cms/scripts/seed-site-content.js —
// keep both in sync when editing.

export type AboutUsFallbackContent = {
  title: string;
  // Rendered right after the "Girona Plants " brand span, so it must continue
  // that sentence (start lowercase).
  subtitle: string;
  hero_button: string;
  our_clients: {
    title: string;
    subtitle: string;
    clients: {
      name: string;
      description: string;
      image: string;
    }[];
  };
  catalogues_title: string;
  catalogues_subtitle: string;
  catalogues_button: string;
};

const CLIENT_IMAGES = [
  "/images/aboutUs/viveristes.svg",
  "/images/aboutUs/gardens.svg",
  "/images/aboutUs/jardiners.svg",
  "/images/aboutUs/obraPublica.svg",
  "/images/aboutUs/sostenibles.svg",
  "/images/aboutUs/paisagistes.svg",
  "/images/aboutUs/comercials.svg",
  "/images/aboutUs/fruiters.svg",
  "/images/aboutUs/organismesOficials.svg",
  "/images/aboutUs/repobladorsForestals.svg",
];

const withImages = (
  clients: { name: string; description: string }[]
): AboutUsFallbackContent["our_clients"]["clients"] =>
  clients.map((client, i) => ({ ...client, image: CLIENT_IMAGES[i] }));

const content: Record<string, AboutUsFallbackContent> = {
  es: {
    title: "Una familia dedicada a las plantas",
    subtitle:
      "es una empresa familiar con más de 30 años de experiencia en el sector de la planta. Cultivamos planta mediterránea en la provincia de Girona y, cuando un proyecto necesita una especie que no tenemos, la conseguimos: trabajamos con una red de viveros de confianza en España y el resto de Europa para servir pedidos completos, de la primera planta a la última.",
    hero_button: "Ver nuestras plantas",
    our_clients: {
      title: "Nuestros clientes",
      subtitle:
        "Del viverista al organismo público: damos servicio a todo tipo de proyectos verdes en toda Europa.",
      clients: withImages([
        { name: "Viveros", description: "Suministro entre viveros y planta joven para engorde." },
        { name: "Jardines", description: "Planta acabada y de temporada, lista para la venta." },
        { name: "Jardineros", description: "Pedidos a medida para obra nueva y mantenimiento." },
        { name: "Obra pública", description: "Planta para licitaciones y proyectos de obra civil." },
        { name: "Sostenibles", description: "Especies de bajo consumo hídrico que favorecen la biodiversidad." },
        { name: "Paisajistas", description: "Localizamos los ejemplares exactos que pide cada diseño." },
        { name: "Comerciales", description: "Grandes volúmenes con condiciones al por mayor." },
        { name: "Fruticultores", description: "Frutales y planta de producción adaptada al clima." },
        { name: "Organismos oficiales", description: "Ayuntamientos y administraciones con espacios verdes." },
        { name: "Reforestadores", description: "Planta forestal autóctona para repoblaciones." },
      ]),
    },
    catalogues_title: "Catálogos",
    catalogues_subtitle:
      "Descarga nuestros catálogos de disponibilidad y producción actualizados.",
    catalogues_button: "Ver catálogos",
  },
  ca: {
    title: "Una família dedicada a les plantes",
    subtitle:
      "és una empresa familiar amb més de 30 anys d'experiència en el sector de la planta. Cultivem planta mediterrània a la província de Girona i, quan un projecte necessita una espècie que no tenim, l'aconseguim: treballem amb una xarxa de vivers de confiança a Espanya i la resta d'Europa per servir comandes completes, de la primera planta a l'última.",
    hero_button: "Veure les nostres plantes",
    our_clients: {
      title: "Els nostres clients",
      subtitle:
        "Del viverista a l'organisme públic: donem servei a tota mena de projectes verds arreu d'Europa.",
      clients: withImages([
        { name: "Vivers", description: "Subministrament entre vivers i planta jove per engreixar." },
        { name: "Jardins", description: "Planta acabada i de temporada, a punt per a la venda." },
        { name: "Jardiners", description: "Comandes a mida per a obra nova i manteniment." },
        { name: "Obra pública", description: "Planta per a licitacions i projectes d'obra civil." },
        { name: "Sostenibles", description: "Espècies de baix consum hídric que afavoreixen la biodiversitat." },
        { name: "Paisatgistes", description: "Localitzem els exemplars exactes que demana cada disseny." },
        { name: "Comercials", description: "Grans volums amb condicions a l'engròs." },
        { name: "Fruticultors", description: "Fruiters i planta de producció adaptada al clima." },
        { name: "Organismes oficials", description: "Ajuntaments i administracions amb espais verds." },
        { name: "Repobladors forestals", description: "Planta forestal autòctona per a repoblacions." },
      ]),
    },
    catalogues_title: "Catàlegs",
    catalogues_subtitle:
      "Descarrega els nostres catàlegs de disponibilitat i producció actualitzats.",
    catalogues_button: "Veure catàlegs",
  },
  en: {
    title: "A family devoted to plants",
    subtitle:
      "is a family-run company with more than 30 years of experience in the plant trade. We grow Mediterranean plants in the province of Girona, Catalonia — and when a project calls for a species we don't grow, we source it through our trusted network of nurseries across Spain and the rest of Europe, delivering complete orders wherever the project is.",
    hero_button: "See our plants",
    our_clients: {
      title: "Our clients",
      subtitle:
        "From nurseries to public bodies: we serve every kind of green project across Europe.",
      clients: withImages([
        { name: "Nurseries", description: "Trade supply and young plants for growing on." },
        { name: "Garden centres", description: "Finished, seasonal plants ready for retail." },
        { name: "Gardeners", description: "Made-to-measure orders for new builds and maintenance." },
        { name: "Public works", description: "Plants for tenders and civil-works projects." },
        { name: "Sustainable projects", description: "Low-water species that support biodiversity." },
        { name: "Landscapers", description: "We track down the exact specimens each design calls for." },
        { name: "Retailers", description: "Large volumes at wholesale terms." },
        { name: "Fruit growers", description: "Fruit trees and productive plants suited to the climate." },
        { name: "Official bodies", description: "Town councils and public administrations." },
        { name: "Reforestation", description: "Native forest plants for repopulation projects." },
      ]),
    },
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Download our up-to-date availability and production catalogues.",
    catalogues_button: "View catalogues",
  },
  fr: {
    title: "Une famille passionnée de plantes",
    subtitle:
      "est une entreprise familiale forte de plus de 30 ans d'expérience dans le secteur végétal. Nous cultivons des plantes méditerranéennes dans la province de Gérone, en Catalogne — et lorsqu'un projet demande une espèce que nous ne cultivons pas, nous la trouvons grâce à notre réseau de pépinières de confiance en Espagne et dans le reste de l'Europe, pour livrer des commandes complètes partout en Europe.",
    hero_button: "Voir nos plantes",
    our_clients: {
      title: "Nos clients",
      subtitle:
        "De la pépinière aux organismes publics : nous accompagnons tous les projets verts partout en Europe.",
      clients: withImages([
        { name: "Pépinières", description: "Approvisionnement entre professionnels et jeunes plants à élever." },
        { name: "Jardineries", description: "Plantes finies et de saison, prêtes à la vente." },
        { name: "Jardiniers", description: "Commandes sur mesure pour créations et entretien." },
        { name: "Travaux publics", description: "Plantes pour appels d'offres et génie civil." },
        { name: "Projets durables", description: "Espèces sobres en eau qui favorisent la biodiversité." },
        { name: "Paysagistes", description: "Nous trouvons les sujets exacts qu'exige chaque projet." },
        { name: "Revendeurs", description: "Gros volumes aux conditions de gros." },
        { name: "Arboriculteurs", description: "Arbres fruitiers et plants productifs adaptés au climat." },
        { name: "Organismes officiels", description: "Mairies et administrations publiques." },
        { name: "Reboiseurs", description: "Plants forestiers indigènes pour le reboisement." },
      ]),
    },
    catalogues_title: "Catalogues",
    catalogues_subtitle:
      "Téléchargez nos catalogues de disponibilité et de production à jour.",
    catalogues_button: "Voir les catalogues",
  },
};

export function getAboutUsContent(locale: string): AboutUsFallbackContent {
  return content[locale] ?? content.es;
}
