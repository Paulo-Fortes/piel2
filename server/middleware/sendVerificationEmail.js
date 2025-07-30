import nodemailer from 'nodemailer';

//echl pqor mxcv wlsv
//paulorobertoroco@gmail.com
//app: Piel


export const sendVerificationEmail = (token, email, name) => {
    const html = `
    <html>
        <body>
            <h3> Estimado ${name}</h3>
            <p>Gracias por registrarse a Piel!</p>
            <p>Use el link abajo para validar tu e-mail</p>
            <a href="http://localhost:3000/email-verify/${token}">Clique aquí!</a>
        </body>
    </html>
    `;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'paulorobertoroco@gmail.com',
            pass: 'echl pqor mxcv wlsv'
        },
    });

    const mailOptions = {
        from: 'paulorobertoroco@gmail.com',
        to: email,
        subject: 'Verifique tu dirección de e-mail',
        html: html
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)            
        } else {
            console.log(`E-mail enviado a ${email}`);
            console.log(info.response);            
        }
    });    
};