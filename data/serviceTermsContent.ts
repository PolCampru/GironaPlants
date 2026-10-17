// How and to whom we deliver: Europe only, on pallets only, trade volumes.
//
// Shown on the home page, the catalogues page, beside the contact form and on
// the quote page — the places where someone decides whether to ask for a
// quote. Plain per-locale data so it is in the server HTML (see
// data/pageHeadings.ts).
//
// The private-buyer note is deliberately warm: we can't serve a handful of
// plants, but the person asking should leave with a good impression and a
// pointer to who can.

export type ServiceTermKey = "europe" | "pallet" | "trade";

export type ServiceTermsContent = {
  label: string;
  title: string;
  items: { key: ServiceTermKey; title: string; text: string }[];
  particular: { title: string; text: string };
};

const content: Record<string, ServiceTermsContent> = {
  es: {
    label: "Condiciones de servicio",
    title: "Planta para profesionales, en palé, en toda Europa",
    items: [
      {
        key: "europe",
        title: "Solo dentro de Europa",
        text: "Servimos a cualquier país europeo.",
      },
      {
        key: "pallet",
        title: "Solo envío paletizado",
        text: "La planta viaja en palé, bien protegida y en un solo transporte. No trabajamos con paquetería.",
      },
      {
        key: "trade",
        title: "Pedidos profesionales",
        text: "Paisajistas, jardineros, garden centers, distribuidores y administraciones: precios y logística pensados para volumen.",
      },
    ],
    particular: {
      title: "¿Eres particular?",
      text: "¡Gracias por pensar en nosotros! Como solo enviamos en palé, no podemos atender pedidos pequeños. Para unas pocas plantas, tu garden center o vivero de confianza te atenderá mejor. Y si preparas un proyecto grande, hablemos.",
    },
  },
  ca: {
    label: "Condicions de servei",
    title: "Planta per a professionals, en palet, a tot Europa",
    items: [
      {
        key: "europe",
        title: "Només dins d'Europa",
        text: "Servim a qualsevol país europeu.",
      },
      {
        key: "pallet",
        title: "Només enviament paletitzat",
        text: "La planta viatja en palet, ben protegida i en un sol transport. No treballem amb paqueteria.",
      },
      {
        key: "trade",
        title: "Comandes professionals",
        text: "Paisatgistes, jardiners, garden centers, distribuïdors i administracions: preus i logística pensats per a volum.",
      },
    ],
    particular: {
      title: "Ets particular?",
      text: "Gràcies per pensar en nosaltres! Com que només enviem en palet, no podem atendre comandes petites. Per a unes quantes plantes, el teu garden center o viver de confiança t'atendrà millor. I si prepares un projecte gran, parlem-ne.",
    },
  },
  en: {
    label: "Terms of supply",
    title: "Trade orders, on pallets, anywhere in Europe",
    items: [
      {
        key: "europe",
        title: "Europe only",
        text: "We deliver to any European country.",
      },
      {
        key: "pallet",
        title: "Palletised delivery only",
        text: "Plants travel on pallets, well protected and in a single load. We don't use parcel couriers.",
      },
      {
        key: "trade",
        title: "Trade orders",
        text: "Landscapers, gardeners, garden centres, distributors and public bodies: prices and logistics built for volume.",
      },
    ],
    particular: {
      title: "Buying for your own garden?",
      text: "Thank you for thinking of us! Because we only ship on pallets, we can't take on small orders. For a few plants, your local garden centre will look after you better. And if you're planning a large project, let's talk.",
    },
  },
  fr: {
    label: "Conditions de service",
    title: "Pour les professionnels, sur palette, partout en Europe",
    items: [
      {
        key: "europe",
        title: "Uniquement en Europe",
        text: "Nous livrons dans tous les pays européens.",
      },
      {
        key: "pallet",
        title: "Livraison sur palette uniquement",
        text: "Les plantes voyagent sur palette, bien protégées et en un seul transport. Pas d'envoi par colis.",
      },
      {
        key: "trade",
        title: "Commandes professionnelles",
        text: "Paysagistes, jardiniers, jardineries, distributeurs et collectivités : prix et logistique pensés pour le volume.",
      },
    ],
    particular: {
      title: "Vous êtes un particulier ?",
      text: "Merci de penser à nous ! Comme nous livrons uniquement sur palette, nous ne pouvons pas honorer les petites commandes. Pour quelques plantes, votre jardinerie de proximité vous servira mieux. Et si vous préparez un grand projet, parlons-en.",
    },
  },
  it: {
    label: "Condizioni di servizio",
    title: "Per professionisti, su pallet, in tutta Europa",
    items: [
      {
        key: "europe",
        title: "Solo in Europa",
        text: "Consegniamo in qualsiasi paese europeo.",
      },
      {
        key: "pallet",
        title: "Solo spedizione su pallet",
        text: "Le piante viaggiano su pallet, ben protette e in un unico trasporto. Non spediamo tramite corriere.",
      },
      {
        key: "trade",
        title: "Ordini professionali",
        text: "Paesaggisti, giardinieri, garden center, distributori ed enti pubblici: prezzi e logistica pensati per i volumi.",
      },
    ],
    particular: {
      title: "Sei un privato?",
      text: "Grazie per aver pensato a noi! Poiché spediamo solo su pallet, non possiamo evadere ordini piccoli. Per poche piante, il tuo garden center di fiducia ti servirà meglio. E se stai preparando un grande progetto, parliamone.",
    },
  },
};

export function getServiceTermsContent(locale: string): ServiceTermsContent {
  return content[locale] ?? content.es;
}
