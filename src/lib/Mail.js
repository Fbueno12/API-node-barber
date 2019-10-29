import nodemailer from 'nodemailer';
import mail_config from '../config/mail';

class Mail {
    constructor(){
        const {host,port,secure,auth} = mail_config;

        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: auth.user ? auth : null
        });
    }

    sendMail(message){
        return this.transporter.sendMail({
            ... mail_config.default,
            ... message,
        });
    }
}

export default new Mail();