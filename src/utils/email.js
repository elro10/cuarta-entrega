import nodemailer from "nodemailer"
import { options } from "../config/config.js"

//transporter

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: options.gmail.emailAdmin,
        pass: options.gmail.emailPass
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

//funcion generar correo de recuperacion de contraseña

export const sendRecoveryPass = async (userEmail, token) => {
    const link = `http://localhost:8080/reset-password?token=${token}`
    //estructura del correo
    await transporter.sendMail({
        from: options.gmail.emailAdmin,
        to: userEmail,
        subject: "restablecer contraseña",
        html:`
            <div>
                <h2>Has solicitado un cambio de contraseña</h2>
                <p>Da clic en el siguiente enlace para restablecer la contraseña</p>
                <a href="${link}">
                    <button> Restablecer contraseña </button>
                </a>
            </div>
        `
        
    })
}