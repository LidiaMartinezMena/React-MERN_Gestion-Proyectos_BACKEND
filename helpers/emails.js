import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
    
    const {email, nombre, token} =  datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      //Información del email:

      const info = await transport.sendMail({
        from:'"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to: email,
        subject: "UpTask - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `<p> Hola: ${nombre} Comprueba tu cuenta en UpTask </p>
        <p> Tu cuenta ya está casi lista, haz click en el siguiente enlace: </p>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}"> Comprueba tu cuenta </a> 
        <p> Si no creaste esta cuenta, puedes ignorar este email </p>`,
      });
};

export const emailOlvidePassword = async (datos) => {
    
  const {email, nombre, token} =  datos;

  const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    });

    //Información del email:

    const info = await transport.sendMail({
      from:'"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
      to: email,
      subject: "UpTask - Restablece tu password",
      text: "Restablece tu password",
      html: `<p> Hola: ${nombre} Has solicitado restablecer tu password en UpTask </p>
      <p> Haz click en el siguiente enlace para generar un nuevo password: </p>
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}"> Reestablecer Password </a> 
      <p> Si no solicitaste restablecer la contraseña, puedes ignorar este email </p>`,
    });
};