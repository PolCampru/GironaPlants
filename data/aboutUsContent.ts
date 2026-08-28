// Per-locale fallback copy for the About Us page. Strapi content wins when a
// field is filled in; these keep the page complete while the CMS is empty or
// unreachable.
// The same copy is seeded into Strapi by cms/scripts/seed-site-content.js —
// keep both in sync when editing.

import type { ClientType } from "@/types/AboutUs";
import type { StatCopy } from "./homeContent";

export type AboutUsFallbackContent = {
  label: string;
  title: string;
  /**
   * A complete sentence. It used to be rendered after a hardcoded
   * "Girona Plants " span, so every locale had to start mid-sentence in
   * lowercase and the CMS field was unusable on its own.
   */
  subtitle: string;
  hero_button: string;
  hero_secondary_button: string;
  founded: { value: string; label: string };
  stats: StatCopy[];
  our_clients: {
    title: string;
    headline: string;
    subtitle: string;
    clients: ClientType[];
  };
  catalogues_title: string;
  catalogues_headline: string;
  catalogues_subtitle: string;
  catalogues_button: string;
};

/** Icon keys, resolved to inline icons in OurClients. Order is fixed. */
const CLIENT_ICONS = [
  "nurseries",
  "garden",
  "gardeners",
  "public",
  "sustainable",
  "landscapers",
  "distributors",
  "fruit",
  "administrations",
  "reforestation",
];

const withIcons = (
  clients: { name: string; description: string }[]
): ClientType[] =>
  clients.map((client, i) => ({ ...client, icon: CLIENT_ICONS[i] }));

const content: Record<string, AboutUsFallbackContent> = {
  es: {
    label: "Nosotros · desde 1992",
    title: "Una familia dedicada a las plantas",
    subtitle:
      "Girona Plants es una empresa familiar con más de 30 años de experiencia en el sector de la planta. Cultivamos planta mediterránea en la provincia de Girona y, cuando un proyecto necesita una especie que no tenemos, la conseguimos: trabajamos con una red de viveros de confianza en España y el resto de Europa para servir pedidos completos, de la primera planta a la última.",
    hero_button: "Ver nuestras plantas",
    hero_secondary_button: "Hablar con nosotros",
    founded: { value: "30+", label: "años de oficio" },
    stats: [
      { value: "1992", label: "Primera planta servida desde el vivero familiar" },
      { value: "336", label: "Géneros distintos en el catálogo actual" },
      { value: "4 idiomas", label: "Atención en castellano, catalán, inglés y francés" },
      { value: "Europa", label: "Red de viveros colaboradores para lo que no cultivamos" },
    ],
    our_clients: {
      title: "Nuestros clientes",
      headline: "Del viverista al organismo público",
      subtitle:
        "Damos servicio a todo tipo de proyectos verdes en toda Europa. Cada perfil pide algo distinto, y eso cambia cómo preparamos el pedido.",
      clients: withIcons([
        { name: "Viveros", description: "Suministro entre viveros y planta joven para engorde." },
        { name: "Garden centers", description: "Planta acabada y de temporada, lista para la venta." },
        { name: "Jardineros", description: "Pedidos a medida para obra nueva y mantenimiento." },
        { name: "Obra pública", description: "Planta para licitaciones y proyectos de obra civil." },
        { name: "Jardín sostenible", description: "Especies de bajo consumo hídrico que favorecen la biodiversidad." },
        { name: "Paisajistas", description: "Localizamos los ejemplares exactos que pide cada diseño." },
        { name: "Distribuidores", description: "Grandes volúmenes con condiciones al por mayor." },
        { name: "Fruticultores", description: "Frutales y planta de producción adaptada al clima." },
        { name: "Administraciones", description: "Ayuntamientos y organismos con espacios verdes a su cargo." },
        { name: "Reforestadores", description: "Planta forestal autóctona para repoblaciones." },
      ]),
    },
    catalogues_title: "Catálogos",
    catalogues_headline: "Descárgalos y compártelos con tu equipo",
    catalogues_subtitle:
      "PDF actualizados de disponibilidad y producción, listos para pasar a obra o a compras.",
    catalogues_button: "Ver catálogos",
  },

  ca: {
    label: "Nosaltres · des del 1992",
    title: "Una família dedicada a les plantes",
    subtitle:
      "Girona Plants és una empresa familiar amb més de 30 anys d'experiència en el sector de la planta. Cultivem planta mediterrània a la província de Girona i, quan un projecte necessita una espècie que no tenim, l'aconseguim: treballem amb una xarxa de vivers de confiança a Espanya i la resta d'Europa per servir comandes completes, de la primera planta a l'última.",
    hero_button: "Veure les nostres plantes",
    hero_secondary_button: "Parlar amb nosaltres",
    founded: { value: "30+", label: "anys d'ofici" },
    stats: [
      { value: "1992", label: "Primera planta servida des del viver familiar" },
      { value: "336", label: "Gèneres diferents al catàleg actual" },
      { value: "4 idiomes", label: "Atenció en català, castellà, anglès i francès" },
      { value: "Europa", label: "Xarxa de vivers col·laboradors per al que no cultivem" },
    ],
    our_clients: {
      title: "Els nostres clients",
      headline: "Del viverista a l'organisme públic",
      subtitle:
        "Donem servei a tota mena de projectes verds arreu d'Europa. Cada perfil demana una cosa diferent, i això canvia com preparem la comanda.",
      clients: withIcons([
        { name: "Vivers", description: "Subministrament entre vivers i planta jove per engreixar." },
        { name: "Garden centers", description: "Planta acabada i de temporada, a punt per a la venda." },
        { name: "Jardiners", description: "Comandes a mida per a obra nova i manteniment." },
        { name: "Obra pública", description: "Planta per a licitacions i projectes d'obra civil." },
        { name: "Jardí sostenible", description: "Espècies de baix consum hídric que afavoreixen la biodiversitat." },
        { name: "Paisatgistes", description: "Localitzem els exemplars exactes que demana cada disseny." },
        { name: "Distribuïdors", description: "Grans volums amb condicions a l'engròs." },
        { name: "Fruticultors", description: "Fruiters i planta de producció adaptada al clima." },
        { name: "Administracions", description: "Ajuntaments i organismes amb espais verds a càrrec seu." },
        { name: "Repobladors forestals", description: "Planta forestal autòctona per a repoblacions." },
      ]),
    },
    catalogues_title: "Catàlegs",
    catalogues_headline: "Descarrega'ls i comparteix-los amb el teu equip",
    catalogues_subtitle:
      "PDF actualitzats de disponibilitat i producció, a punt per passar a obra o a compres.",
    catalogues_button: "Veure catàlegs",
  },

  en: {
    label: "About us · since 1992",
    title: "A family devoted to plants",
    subtitle:
      "Girona Plants is a family-run company with more than 30 years of experience in the plant trade. We grow Mediterranean plants in the province of Girona, Catalonia — and when a project calls for a species we don't grow, we source it through our trusted network of nurseries across Spain and the rest of Europe, delivering complete orders wherever the project is.",
    hero_button: "See our plants",
    hero_secondary_button: "Talk to us",
    founded: { value: "30+", label: "years in the trade" },
    stats: [
      { value: "1992", label: "First plant supplied from the family nursery" },
      { value: "336", label: "Distinct genera in the current catalogue" },
      { value: "4 languages", label: "We answer in Spanish, Catalan, English and French" },
      { value: "Europe", label: "Partner nurseries for everything we don't grow" },
    ],
    our_clients: {
      title: "Our clients",
      headline: "From nurseries to public bodies",
      subtitle:
        "We serve every kind of green project across Europe. Each type asks for something different, and that changes how we put the order together.",
      clients: withIcons([
        { name: "Nurseries", description: "Trade supply and young plants for growing on." },
        { name: "Garden centres", description: "Finished, seasonal plants ready for retail." },
        { name: "Gardeners", description: "Made-to-measure orders for new builds and maintenance." },
        { name: "Public works", description: "Plants for tenders and civil-works projects." },
        { name: "Sustainable planting", description: "Low-water species that support biodiversity." },
        { name: "Landscapers", description: "We track down the exact specimens each design calls for." },
        { name: "Distributors", description: "Large volumes at wholesale terms." },
        { name: "Fruit growers", description: "Fruit trees and productive plants suited to the climate." },
        { name: "Administrations", description: "Town councils and public bodies with green spaces to run." },
        { name: "Reforestation", description: "Native forest plants for repopulation projects." },
      ]),
    },
    catalogues_title: "Catalogues",
    catalogues_headline: "Download them and share with your team",
    catalogues_subtitle:
      "Up-to-date availability and production PDFs, ready to pass on to site or to purchasing.",
    catalogues_button: "View catalogues",
  },

  fr: {
    label: "À propos · depuis 1992",
    title: "Une famille passionnée de plantes",
    subtitle:
      "Girona Plants est une entreprise familiale forte de plus de 30 ans d'expérience dans le secteur végétal. Nous cultivons des plantes méditerranéennes dans la province de Gérone, en Catalogne — et lorsqu'un projet demande une espèce que nous ne cultivons pas, nous la trouvons grâce à notre réseau de pépinières de confiance en Espagne et dans le reste de l'Europe, pour livrer des commandes complètes.",
    hero_button: "Voir nos plantes",
    hero_secondary_button: "Nous contacter",
    founded: { value: "30+", label: "ans de métier" },
    stats: [
      { value: "1992", label: "Première plante livrée depuis la pépinière familiale" },
      { value: "336", label: "Genres différents au catalogue actuel" },
      { value: "4 langues", label: "Nous répondons en espagnol, catalan, anglais et français" },
      { value: "Europe", label: "Réseau de pépinières partenaires pour ce que nous ne cultivons pas" },
    ],
    our_clients: {
      title: "Nos clients",
      headline: "De la pépinière aux organismes publics",
      subtitle:
        "Nous accompagnons tous les projets verts partout en Europe. Chaque profil demande autre chose, et cela change la façon dont nous préparons la commande.",
      clients: withIcons([
        { name: "Pépinières", description: "Approvisionnement entre professionnels et jeunes plants à élever." },
        { name: "Jardineries", description: "Plantes finies et de saison, prêtes à la vente." },
        { name: "Jardiniers", description: "Commandes sur mesure pour créations et entretien." },
        { name: "Travaux publics", description: "Plantes pour appels d'offres et génie civil." },
        { name: "Jardin durable", description: "Espèces sobres en eau qui favorisent la biodiversité." },
        { name: "Paysagistes", description: "Nous trouvons les sujets exacts qu'exige chaque projet." },
        { name: "Distributeurs", description: "Gros volumes aux conditions de gros." },
        { name: "Arboriculteurs", description: "Arbres fruitiers et plants productifs adaptés au climat." },
        { name: "Administrations", description: "Mairies et organismes gérant des espaces verts." },
        { name: "Reboiseurs", description: "Plants forestiers indigènes pour le reboisement." },
      ]),
    },
    catalogues_title: "Catalogues",
    catalogues_headline: "Téléchargez-les et partagez-les avec votre équipe",
    catalogues_subtitle:
      "PDF à jour de disponibilité et de production, prêts à transmettre au chantier ou aux achats.",
    catalogues_button: "Voir les catalogues",
  },
};

export function getAboutUsContent(locale: string): AboutUsFallbackContent {
  return content[locale] ?? content.es;
}
