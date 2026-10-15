import { ItemType } from "@/types/Cart";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { recordQuoteRequest } from "@/lib/quoteRequests";

/** Total attachment budget. Beyond this most SMTP servers reject the message. */
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

/**
 * Everything here goes into an HTML email. Interpolating raw form input built
 * a message an author could inject markup into, and mangled any name or
 * comment containing < or &.
 */
const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const row = (label: string, value: unknown) =>
  value
    ? `<p style="margin: 0;"><strong>${label}:</strong> ${escapeHtml(value)}</p>`
    : "";

type MailCopy = {
  company: string;
  name: string;
  email: string;
  phone: string;
  comment: string;
  quoteHeading: string;
  onOffer: string;
  genus: string;
  description: string;
  quantity: string;
  potSize: string;
  height: string;
  quoteSubject: string;
  contactSubject: string;
};

/**
 * The notification is written in the language the visitor browsed the site
 * in, so staff read and answer it in that language. Catalan is the fallback.
 */
const MAIL_COPY: Record<string, MailCopy> = {
  ca: {
    company: "Nom de l'empresa",
    name: "Nom de contacte",
    email: "Correu electrònic",
    phone: "Telèfon",
    comment: "Comentari",
    quoteHeading: "Sol·licitud de pressupost",
    onOffer: "Producte en oferta",
    genus: "Gènere",
    description: "Descripció",
    quantity: "Quantitat",
    potSize: "Mida de test",
    height: "Alçada",
    quoteSubject: "Nova sol·licitud de pressupost",
    contactSubject: "Nou contacte des de la web",
  },
  es: {
    company: "Nombre de la empresa",
    name: "Nombre de contacto",
    email: "Correo electrónico",
    phone: "Teléfono",
    comment: "Comentario",
    quoteHeading: "Solicitud de presupuesto",
    onOffer: "Producto en oferta",
    genus: "Género",
    description: "Descripción",
    quantity: "Cantidad",
    potSize: "Tamaño de maceta",
    height: "Altura",
    quoteSubject: "Nueva solicitud de presupuesto",
    contactSubject: "Nuevo contacto desde la web",
  },
  en: {
    company: "Company name",
    name: "Contact name",
    email: "Email",
    phone: "Phone",
    comment: "Comment",
    quoteHeading: "Quote request",
    onOffer: "Product on offer",
    genus: "Genus",
    description: "Description",
    quantity: "Quantity",
    potSize: "Pot size",
    height: "Height",
    quoteSubject: "New quote request",
    contactSubject: "New contact from the website",
  },
  fr: {
    company: "Nom de l'entreprise",
    name: "Nom du contact",
    email: "E-mail",
    phone: "Téléphone",
    comment: "Commentaire",
    quoteHeading: "Demande de devis",
    onOffer: "Produit en promotion",
    genus: "Genre",
    description: "Description",
    quantity: "Quantité",
    potSize: "Taille du pot",
    height: "Hauteur",
    quoteSubject: "Nouvelle demande de devis",
    contactSubject: "Nouveau contact depuis le site",
  },
  it: {
    company: "Nome dell'azienda",
    name: "Nome del contatto",
    email: "E-mail",
    phone: "Telefono",
    comment: "Commento",
    quoteHeading: "Richiesta di preventivo",
    onOffer: "Prodotto in offerta",
    genus: "Genere",
    description: "Descrizione",
    quantity: "Quantità",
    potSize: "Misura del vaso",
    height: "Altezza",
    quoteSubject: "Nuova richiesta di preventivo",
    contactSubject: "Nuovo contatto dal sito web",
  },
};

function parseItems(raw: FormDataEntryValue | null): ItemType[] {
  if (typeof raw !== "string" || !raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // A malformed cart must not take the whole enquiry down with it.
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const company = formData.get("company") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const comment = formData.get("comment") as string;
    const customerType = formData.get("type") as string;
    const pageLocale = formData.get("page_locale") as string;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const items = parseItems(formData.get("items"));

    const files = (formData.getAll("files") as File[]).filter(
      (file) => file && file.size > 0
    );
    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json(
        { message: "Attachments too large" },
        { status: 413 }
      );
    }

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    // Stored before the mail goes out, on purpose: if SMTP is down or the
    // credentials are stale, the enquiry still exists somewhere we can read
    // it instead of being lost with the send. recordQuoteRequest never
    // throws and times out at 5s, so it cannot cost us a delivery either.
    await recordQuoteRequest({
      kind: items.length ? "quote" : "contact",
      name,
      company,
      email,
      phone,
      customerType,
      comment,
      pageLocale,
      items,
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const locale = (pageLocale || "").toLowerCase();
    const known = Object.hasOwn(MAIL_COPY, locale);
    const t = known ? MAIL_COPY[locale] : MAIL_COPY.ca;
    const languageTag = known ? `[${locale.toUpperCase()}] ` : "";

    // The items block is only rendered when there is a cart. It used to be
    // emitted unconditionally, and `${items && items.length > 0 && ...}`
    // printed the literal word "false" under the heading on every plain
    // enquiry from /contact.
    const itemsHtml = items.length
      ? `
        <h3 style="margin-top: 1rem; margin-bottom: 0.5rem;">${t.quoteHeading}:</h3>
        <div style="padding-left: 1em;">
          ${items
            .map((item) => {
              const lines = [
                item.discount
                  ? `<p style="margin: 0;"><strong>${t.onOffer}</strong></p>`
                  : "",
                row(t.genus, item.genus),
                row(t.description, item.description),
                row(t.quantity, item.quantity),
                row(t.potSize, item.pot_size),
                row(t.height, item.height),
              ].join("");
              return `<div style="margin-bottom: 20px;">${lines}</div>`;
            })
            .join("")}
        </div>`
      : "";

    const htmlContent = `
      <div style="font-size: 14px; line-height: 1.3;">
        <div>
          ${row(t.company, company)}
          ${row(t.name, name)}
          ${row(t.email, email)}
          ${row(t.phone, phone)}
          ${row(t.comment, comment)}
        </div>
        ${itemsHtml}
      </div>
    `;

    await transporter.sendMail({
      // From must be the authenticated mailbox: putting the visitor's address
      // here fails SPF/DMARC and gets the message binned or rejected. Their
      // address goes in Reply-To, so hitting reply still answers them.
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.MAIL_DESTINATION,
      subject: items.length
        ? `${languageTag}${t.quoteSubject} — ${name}`
        : `${languageTag}${t.contactSubject} — ${name}`,
      html: htmlContent,
      attachments,
    });

    return NextResponse.json(
      { message: "Email enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return NextResponse.json(
      { message: "Error al enviar el email" },
      { status: 500 }
    );
  }
}
