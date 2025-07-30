import nodemailer from 'nodemailer';

export const sendPasswordResetEmail = (token, email, name) => {
    const html = `
    <html>
        <body>
            <h3>Estimado(a) ${name}</h3>
            <p>Por favor, clique en el link abajo para resetear la contraseña.</p>
            <a href="http://localhost:3000/password-reset/${token}">Clique aquí</a>
        </body>
    </html>`;

    const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'paulorobertoroco@gmail.com',
                pass: 'echl pqor mxcv wlsv'
            }
        });
    
        const mailOptions = {
            from: 'paulorobertoroco@gmail.com',
            to: email,
            subject: 'Piel: solicitud de reseteo de contraseña.',
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