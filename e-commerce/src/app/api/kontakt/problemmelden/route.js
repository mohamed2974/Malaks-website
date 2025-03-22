import nodemailer from 'nodemailer';

export async function POST(req) {
    const data = await req.formData();
    const email = data.get('email');
    const titel = data.get('titel');
    const tel = data.get('tel');
    const message = data.get('message');
    const imgFile = data.get('img');

    // Falls imgFile vorhanden ist, kannst du es z.B. in Base64 umwandeln oder direkt anhängen
    let attachment = null;
    if (imgFile) {
        const buffer = await imgFile.arrayBuffer();
        attachment = {
            filename: `problem_${Date.now()}.png`,
            content: Buffer.from(buffer),
            contentType: imgFile.type,
        };
    }

    // Erstelle den Inhalt der E-Mail
    const emailContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #007bff;">Neue Problemmeldung</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefonnummer:</strong> ${tel}</p>
        <p><strong>Problem:</strong> ${titel}</p>
        <hr style="border: 0; height: 1px; background: #ccc; margin: 10px 0;">
        <p style="white-space: pre-line;">${message}</p>
    </div>
`;

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
        subject: 'Eine Problemmeldung von einem Benutzer',
        html: emailContent,
        attachments: attachment ? [attachment] : [], // Falls img existiert, als Anhang hinzufügen
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
