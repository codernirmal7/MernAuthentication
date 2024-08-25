import { emailVerificationTemplate, WELLCOME_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailTrapClient, sender } from "./mailtrap.config.js"
import "dotenv/config"

export const sendVerificationEmail = async (email , verificationCode)=>{
    const recipients = [{email}]
    try {
        const response = await mailTrapClient.send({
            from : sender,
            to : recipients,
            subject : "Verify your email",
            html : emailVerificationTemplate(verificationCode,`${process.env.FRONTSIDE_URL}/auth/verify?email=${email}&code=${verificationCode}`),
            category : "Email Verification"

        })
        
    } catch (error) {
        console.log("Error while sending Verification Code", error)
    }
}

export const sendWellcomeEmail = async (email)=>{
    const recipients = [{email}]
    try {
        const response = await mailTrapClient.send({
            from : sender,
            to : recipients,
            subject : "Welcome to MernAuth!",
            html : WELLCOME_EMAIL_TEMPLATE,
            category : "Welcome Email"
        })
    } catch (error) {
        console.log("Error while sending Wellcome email", error)
    }
}