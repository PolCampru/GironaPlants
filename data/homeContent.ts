// Per-locale fallback copy for the home page. Strapi content wins whenever a
// field is filled in; these guarantee the landing page never renders blank
// while the CMS is empty or unreachable.
// The same copy is seeded into Strapi by cms/scripts/seed-site-content.js —
// keep both in sync when editing.

export const CONTACT_PHONE = "+34 639 811 560";
export const CONTACT_EMAIL = "gironaplants@gironaplants.com";

export type StatCopy = { value: string; label: string };
export type StepCopy = { title: string; text: string };

export type HomeFallbackContent = {
  hero_badge: string;
  hero_title: string;
  hero_subtitle: string;
  hero_secondary_button: string;
  hero_tag: string;
  hero_image_alt: string;
  hero_stat_label: string;
  hero_stat_note: string;

  search_placeholder: string;
  search_button: string;
  search_suggestions: string[];
  search_suggestions_label: string;

  stats: StatCopy[];

  plants_title: string;
  plants_headline: string;
  plants_subtitle: string;
  plants_button: string;
  plants_count_label: string;
  ask_title: string;
  ask_text: string;
  ask_button: string;

  how_title: string;
  how_label: string;
  how_steps: StepCopy[];

  catalogues_title: string;
  catalogues_headline: string;
  catalogues_subtitle: string;
  catalogues_button: string;
  download_label: string;

  contact_title: string;
  contact_subtitle: string;
  contact_button: string;
};

const content: Record<string, HomeFallbackContent> = {
  es: {
    hero_badge: "Suministro de plantas en toda Europa",
    hero_title: "Las plantas que tu proyecto necesita, en toda Europa",
    hero_subtitle:
      "Más de 30 años consiguiendo planta para profesionales. Cultivamos planta mediterránea en Girona y localizamos cualquier otra especie a través de nuestra red de viveros. Si no la cultivamos, la encontramos.",
    hero_secondary_button:
      "¿Prefieres que lo busquemos nosotros? Solicita un presupuesto",
    hero_tag: "Cultivo propio en Girona",
    hero_image_alt: "Campo de lavanda en el vivero de Girona Plants",
    hero_stat_label: "referencias disponibles",
    hero_stat_note: "Catálogo actualizado desde el vivero",

    search_placeholder: "Busca una especie: Quercus, Lavandula, Festuca…",
    search_button: "Buscar",
    search_suggestions: ["Quercus", "Lavandula", "Juniperus", "Acer"],
    search_suggestions_label: "Más buscadas:",

    stats: [
      { value: "+30 años", label: "sirviendo a profesionales del verde" },
      { value: "336", label: "géneros distintos en el catálogo" },
      { value: "24-48 h", label: "para recibir tu presupuesto" },
      { value: "Europa", label: "red de viveros de confianza" },
    ],

    plants_title: "Nuestras plantas",
    plants_headline: "Del árbol forestal a la gramínea ornamental",
    plants_subtitle:
      "Estos son los géneros que más nos piden. Y si el tuyo no está, lo localizamos por ti.",
    plants_button: "Ver todo el catálogo",
    plants_count_label: "referencias",
    ask_title: "¿No la encuentras?",
    ask_text:
      "Dinos qué especie, medida y cantidad necesitas. La buscamos en nuestra red de viveros y te respondemos en 24-48 h.",
    ask_button: "Pídenosla",

    how_label: "Cómo trabajamos",
    how_title: "Tres pasos entre tu lista y el camión",
    how_steps: [
      {
        title: "Nos envías tu lista",
        text: "Marca especies del catálogo o adjunta tu propio listado en Excel. Sin registro y sin mínimo de pedido.",
      },
      {
        title: "Buscamos lo que falte",
        text: "Lo que no está en nuestro vivero lo localizamos en la red de viveros de confianza en España y el resto de Europa.",
      },
      {
        title: "Recibes un pedido completo",
        text: "Presupuesto cerrado en 24-48 h y entrega en toda Europa. De la primera planta a la última, en un solo envío.",
      },
    ],

    catalogues_title: "Catálogos",
    catalogues_headline: "Descárgalos y compártelos con tu equipo",
    catalogues_subtitle:
      "PDF actualizados de disponibilidad y producción, listos para pasar a obra o a compras.",
    catalogues_button: "Ver catálogos",
    download_label: "Descargar",

    contact_title: "¿Preparamos tu oferta?",
    contact_subtitle:
      "Cuéntanos qué necesita tu proyecto —especies, medidas y cantidades— y te enviamos un presupuesto a medida en 24-48 h, sin compromiso. Servimos en toda Europa.",
    contact_button: "Solicitar presupuesto",
  },

  ca: {
    hero_badge: "Subministrament de plantes a tot Europa",
    hero_title: "Les plantes que el teu projecte necessita, a tot Europa",
    hero_subtitle:
      "Més de 30 anys aconseguint planta per a professionals. Cultivem planta mediterrània a Girona i localitzem qualsevol altra espècie a través de la nostra xarxa de vivers. Si no la cultivem, la trobem.",
    hero_secondary_button:
      "Prefereixes que la busquem nosaltres? Demana un pressupost",
    hero_tag: "Cultiu propi a Girona",
    hero_image_alt: "Camp de lavanda al viver de Girona Plants",
    hero_stat_label: "referències disponibles",
    hero_stat_note: "Catàleg actualitzat des del viver",

    search_placeholder: "Busca una espècie: Quercus, Lavandula, Festuca…",
    search_button: "Cercar",
    search_suggestions: ["Quercus", "Lavandula", "Juniperus", "Acer"],
    search_suggestions_label: "Més buscades:",

    stats: [
      { value: "+30 anys", label: "servint professionals del verd" },
      { value: "336", label: "gèneres diferents al catàleg" },
      { value: "24-48 h", label: "per rebre el teu pressupost" },
      { value: "Europa", label: "xarxa de vivers de confiança" },
    ],

    plants_title: "Les nostres plantes",
    plants_headline: "De l'arbre forestal a la gramínia ornamental",
    plants_subtitle:
      "Aquests són els gèneres que més ens demanen. I si el teu no hi és, el localitzem per tu.",
    plants_button: "Veure tot el catàleg",
    plants_count_label: "referències",
    ask_title: "No la trobes?",
    ask_text:
      "Digues-nos quina espècie, mida i quantitat necessites. La busquem a la nostra xarxa de vivers i et responem en 24-48 h.",
    ask_button: "Demana-la",

    how_label: "Com treballem",
    how_title: "Tres passos entre la teva llista i el camió",
    how_steps: [
      {
        title: "Ens envies la teva llista",
        text: "Marca espècies del catàleg o adjunta el teu llistat en Excel. Sense registre i sense comanda mínima.",
      },
      {
        title: "Busquem el que falti",
        text: "El que no tenim al viver ho localitzem a la xarxa de vivers de confiança a Espanya i la resta d'Europa.",
      },
      {
        title: "Reps una comanda completa",
        text: "Pressupost tancat en 24-48 h i entrega a tot Europa. De la primera planta a l'última, en un sol enviament.",
      },
    ],

    catalogues_title: "Catàlegs",
    catalogues_headline: "Descarrega'ls i comparteix-los amb el teu equip",
    catalogues_subtitle:
      "PDF actualitzats de disponibilitat i producció, a punt per passar a obra o a compres.",
    catalogues_button: "Veure catàlegs",
    download_label: "Descarregar",

    contact_title: "Preparem la teva oferta?",
    contact_subtitle:
      "Explica'ns què necessita el teu projecte —espècies, mides i quantitats— i t'enviem un pressupost a mida en 24-48 h, sense compromís. Servim a tot Europa.",
    contact_button: "Demanar pressupost",
  },

  en: {
    hero_badge: "Plant sourcing across Europe",
    hero_title: "The plants your project needs, anywhere in Europe",
    hero_subtitle:
      "More than 30 years sourcing plants for professionals. We grow Mediterranean species at our own nursery in Girona and track down everything else through our grower network. If we don't grow it, we'll find it.",
    hero_secondary_button: "Rather we did the looking? Request a quote",
    hero_tag: "Grown at our own nursery",
    hero_image_alt: "Lavender field at the Girona Plants nursery",
    hero_stat_label: "references available",
    hero_stat_note: "Catalogue kept up to date from the nursery",

    search_placeholder: "Search a species: Quercus, Lavandula, Festuca…",
    search_button: "Search",
    search_suggestions: ["Quercus", "Lavandula", "Juniperus", "Acer"],
    search_suggestions_label: "Most searched:",

    stats: [
      { value: "30+ years", label: "serving green-sector professionals" },
      { value: "336", label: "distinct genera in the catalogue" },
      { value: "24-48 h", label: "to get your quote back" },
      { value: "Europe", label: "network of trusted growers" },
    ],

    plants_title: "Our plants",
    plants_headline: "From forest trees to ornamental grasses",
    plants_subtitle:
      "These are the genera we're asked for most. If yours isn't here, we'll source it for you.",
    plants_button: "View full catalogue",
    plants_count_label: "references",
    ask_title: "Can't find it?",
    ask_text:
      "Tell us the species, size and quantity you need. We'll look through our grower network and come back to you within 24-48 h.",
    ask_button: "Ask us for it",

    how_label: "How we work",
    how_title: "Three steps between your list and the lorry",
    how_steps: [
      {
        title: "You send us your list",
        text: "Tick species from the catalogue or attach your own spreadsheet. No account, no minimum order.",
      },
      {
        title: "We source what's missing",
        text: "Anything we don't grow ourselves we track down through our network of trusted growers in Spain and the rest of Europe.",
      },
      {
        title: "You get a complete order",
        text: "A firm quote within 24-48 h and delivery across Europe. First plant to last, in a single shipment.",
      },
    ],

    catalogues_title: "Catalogues",
    catalogues_headline: "Download them and share with your team",
    catalogues_subtitle:
      "Up-to-date availability and production PDFs, ready to pass on to site or to purchasing.",
    catalogues_button: "View catalogues",
    download_label: "Download",

    contact_title: "Ready for your quote?",
    contact_subtitle:
      "Tell us what your project needs — species, sizes and quantities — and we'll send a tailored quote within 24-48 h, no obligation. We deliver across Europe.",
    contact_button: "Request a quote",
  },

  fr: {
    hero_badge: "Approvisionnement en plantes en Europe",
    hero_title: "Les plantes dont votre projet a besoin, partout en Europe",
    hero_subtitle:
      "Plus de 30 ans à trouver des plantes pour les professionnels. Nous cultivons des plantes méditerranéennes dans notre pépinière de Gérone et localisons toutes les autres espèces grâce à notre réseau de pépinières. Si nous ne la cultivons pas, nous la trouvons.",
    hero_secondary_button:
      "Vous préférez que nous cherchions ? Demandez un devis",
    hero_tag: "Production dans notre pépinière",
    hero_image_alt: "Champ de lavande dans la pépinière Girona Plants",
    hero_stat_label: "références disponibles",
    hero_stat_note: "Catalogue mis à jour depuis la pépinière",

    search_placeholder: "Cherchez une espèce : Quercus, Lavandula, Festuca…",
    search_button: "Rechercher",
    search_suggestions: ["Quercus", "Lavandula", "Juniperus", "Acer"],
    search_suggestions_label: "Les plus recherchées :",

    stats: [
      { value: "+30 ans", label: "au service des professionnels du végétal" },
      { value: "336", label: "genres différents au catalogue" },
      { value: "24-48 h", label: "pour recevoir votre devis" },
      { value: "Europe", label: "réseau de pépinières de confiance" },
    ],

    plants_title: "Nos plantes",
    plants_headline: "De l'arbre forestier aux graminées ornementales",
    plants_subtitle:
      "Voici les genres qu'on nous demande le plus. Et si le vôtre n'y est pas, nous le localisons pour vous.",
    plants_button: "Voir tout le catalogue",
    plants_count_label: "références",
    ask_title: "Vous ne la trouvez pas ?",
    ask_text:
      "Dites-nous l'espèce, la taille et la quantité. Nous la cherchons dans notre réseau de pépinières et vous répondons sous 24-48 h.",
    ask_button: "Demandez-la nous",

    how_label: "Comment nous travaillons",
    how_title: "Trois étapes entre votre liste et le camion",
    how_steps: [
      {
        title: "Vous nous envoyez votre liste",
        text: "Cochez des espèces au catalogue ou joignez votre propre listing Excel. Sans inscription et sans commande minimale.",
      },
      {
        title: "Nous cherchons ce qui manque",
        text: "Ce que nous ne cultivons pas, nous le localisons dans notre réseau de pépinières de confiance en Espagne et dans le reste de l'Europe.",
      },
      {
        title: "Vous recevez une commande complète",
        text: "Devis ferme sous 24-48 h et livraison dans toute l'Europe. De la première à la dernière plante, en un seul envoi.",
      },
    ],

    catalogues_title: "Catalogues",
    catalogues_headline: "Téléchargez-les et partagez-les avec votre équipe",
    catalogues_subtitle:
      "PDF à jour de disponibilité et de production, prêts à transmettre au chantier ou aux achats.",
    catalogues_button: "Voir les catalogues",
    download_label: "Télécharger",

    contact_title: "On prépare votre devis ?",
    contact_subtitle:
      "Dites-nous ce qu'il faut à votre projet — espèces, tailles et quantités — et nous vous envoyons un devis sur mesure sous 24-48 h, sans engagement. Nous livrons dans toute l'Europe.",
    contact_button: "Demander un devis",
  },
};

export function getHomeContent(locale: string): HomeFallbackContent {
  return content[locale] ?? content.es;
}
