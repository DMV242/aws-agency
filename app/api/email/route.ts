import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";




export async function POST(request: NextRequest) {
    const { email, nom, phone, sujet, message } = await request.json();

    const transport = nodemailer.createTransport({
      service: 'hostinger',
        host: "smtp.hostinger.com",
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
      // cc: email, (uncomment this line if you want to send a copy to the sender)
      subject: `Message de ${nom} (${email}) (${phone}) a propos de ${sujet}`,
      text: message,
    };

    const sendMailPromise = () =>
      new Promise<string>((resolve, reject) => {
        transport.sendMail(mailOptions, function (err) {
          if (!err) {
            resolve('Email sent');
          } else {
            reject(err.message);
          }
        });
      });


    try {
      await sendMailPromise();
      return NextResponse.json({ message: 'Message envoyé' }, {status: 200});
    } catch (err) {
      return NextResponse.json({ error: err }, { status: 500 });
    }

  }