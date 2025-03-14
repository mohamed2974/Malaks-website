import nodemailer from 'nodemailer';

export async function POST(req) {
  const { name, email, titel, tel, message } = await req.json();

  // Erstelle den Inhalt der E-Mail
  const emailContent = `Nachricht von ${name}:\nEmail: ${email}\nNummer: ${tel}\n\nBetreff: ${titel}\n\n${message}`;

  // Erstelle den Mail-Transporter für Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,  // Deine Gmail-Adresse
      pass: process.env.EMAIL_PASS,  // Dein Gmail-Passwort oder App-Passwort
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Verwende die authentifizierte E-Mail-Adresse als Absender
    to: process.env.EMAIL_ADRESSAT,
    subject: 'Neue Kontaktanfrage airpods store',
    text: emailContent,
  };  

  try {
    // Sende die E-Mail
    const sendResult = await transporter.sendMail(mailOptions);
    console.log('Email gesendet:', sendResult.messageId);

    return new Response(
      JSON.stringify({ message: 'Nachricht erfolgreich gesendet!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    return new Response(
      JSON.stringify({ message: 'Fehler beim Senden der Nachricht.' }),
      { status: 500 }
    );
  }
}
