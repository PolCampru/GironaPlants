import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { type, company, name, email, phone, comment, files, privacyPolicy } =
      await request.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
    console.log(process.env.EMAIL_HOST);
    console.log(process.env.EMAIL_PORT);
    console.log(process.env.MAIL_DESTINATION);
    console.log(email);

    const mailOptions = {
      from: email as string,
      to: process.env.MAIL_DESTINATION,
      subject: `Nova sol·licitud de pressupost`,
      text: `
        Nom de l'empresa: ${company}
        Nom de contacte: ${name}
        Correu electrònic: ${email}
        Telèfon: ${phone}
        Comentari: ${comment}
        Política de privacitat acceptada: ${privacyPolicy ? "Sí" : "No"}
        `,
      attatchments: files.map(async (file: File) => ({
        filename: file.name,
        content: file,
      })),
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error sending email" },
      { status: 500 }
    );
  }
}
