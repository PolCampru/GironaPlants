import { ItemType } from "@/types/Cart";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const company = formData.get("company") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const comment = formData.get("comment") as string;

    const files = formData.getAll("files") as File[];

    const itemsString = formData.get("items") as string;
    const items: ItemType[] = JSON.parse(itemsString);

    const attachments = await Promise.all(
      files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return {
          filename: file.name,
          content: buffer,
        };
      })
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

    const htmlContent = `
      <div style="font-size: 14px; line-height: 1.3;">
        <!-- Section with contact & company info -->
        <div>
          ${
            company
              ? `<p style="margin: 0;"><strong>Nom de l'empresa:</strong> ${company}</p>`
              : ""
          }
          ${
            name
              ? `<p style="margin: 0;"><strong>Nom de contacte:</strong> ${name}</p>`
              : ""
          }
          ${
            email
              ? `<p style="margin: 0;"><strong>Correu electrònic:</strong> ${email}</p>`
              : ""
          }
          ${
            phone
              ? `<p style="margin: 0;"><strong>Telèfon:</strong> ${phone}</p>`
              : ""
          }
          ${
            comment
              ? `<p style="margin: 0;"><strong>Comentari:</strong> ${comment}</p>`
              : ""
          }
        </div>

        <!-- Section with items -->
        <h3 style="margin-top: 1rem; margin-bottom: 0.5rem;">Sol·licitud de pressupost:</h3>
        <div style="padding-left: 1em;">
          ${
            items &&
            items.length > 0 &&
            items
              .map((item) => {
                let itemHtml = "";

                if (item.discount) {
                  itemHtml += `<p style="margin: 0;"><strong>Producte en oferta</strong></p>`;
                }

                itemHtml += `<p style="margin: 0;"><strong>Gènere:</strong> ${item.genus}</p>`;
                itemHtml += `<p style="margin: 0;"><strong>Descripció:</strong> ${item.description}</p>`;
                itemHtml += `<p style="margin: 0;"><strong>Quantitat:</strong> ${item.quantity}</p>`;

                if (item.pot_size) {
                  itemHtml += `<p style="margin: 0;"><strong>Mida de test:</strong> ${item.pot_size}</p>`;
                }

                if (item.height) {
                  itemHtml += `<p style="margin: 0;"><strong>Alçada:</strong> ${item.height}</p>`;
                }

                return `<div style="margin-bottom: 20px;">${itemHtml}</div>`;
              })
              .join("")
          }
        </div>
      </div>
    `;

    const mailOptions = {
      from: email,
      to: process.env.MAIL_DESTINATION,
      subject: `Nova sol·licitud de pressupost`,
      html: htmlContent,
      attachments,
    };

    await transporter.sendMail(mailOptions);

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
