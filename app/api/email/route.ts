import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

interface RequestData {
  email: string;
  nom: string;
  phone: string;
  sujet: string;
  message: string;
}

export async function GET(request: NextRequest) {
  try {
    const res: RequestData = JSON.parse(request.headers.get('data') || '{}');
    const { email = '', nom = '', phone = '', sujet = '', message = '' } = res;

    const transport = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: 'contact@test.apotrewellsolutions.com',
        pass: 'Test1234@',
      },
    });

    const mailOptions: Mail.Options = {
      from: 'contact@test.apotrewellsolutions.com',
      to: 'contact@test.apotrewellsolutions.com',
      cc: email, // Uncomment this line if you want to send a copy to the sender
      subject: `Message de ${nom} (${email}) (${phone}) à propos de ${sujet}`,
      text: message,
    };

    await transport.sendMail(mailOptions);
    return NextResponse.json({ message: 'Message envoyé' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
