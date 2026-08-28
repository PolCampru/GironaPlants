import { ItemType } from "@/types/Cart";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // The items block is only rendered when there is a cart. It used to be
    // emitted unconditionally, and `${items && items.length > 0 && ...}`
    // printed the literal word "false" under the heading on every plain
    // enquiry from /contact.
    const itemsHtml = items.length
      ? `
        <h3 style="margin-top: 1rem; margin-bottom: 0.5rem;">Sol·licitud de pressupost:</h3>
        <div style="padding-left: 1em;">
          ${items
            .map((item) => {
              const lines = [
                item.discount
                  ? `<p style="margin: 0;"><strong>Producte en oferta</strong></p>`
                  : "",
                row("Gènere", item.genus),
                row("Descripció", item.description),
                row("Quantitat", item.quantity),
                row("Mida de test", item.pot_size),
                row("Alçada", item.height),
              ].join("");
              return `<div style="margin-bottom: 20px;">${lines}</div>`;
            })
            .join("")}
        </div>`
      : "";

    const htmlContent = `
      <div style="font-size: 14px; line-height: 1.3;">
        <div>
          ${row("Nom de l'empresa", company)}
          ${row("Nom de contacte", name)}
          ${row("Correu electrònic", email)}
          ${row("Telèfon", phone)}
          ${row("Comentari", comment)}
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
        ? `Nova sol·licitud de pressupost — ${name}`
        : `Nou contacte des de la web — ${name}`,
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
