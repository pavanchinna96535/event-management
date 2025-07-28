const nodemailer=require("nodemailer");

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendTicketMail=async(to,subject,html)=>{
    const mailOptions={
        from:`"Malnad Tuskers  " <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
}

module.exports=sendTicketMail;