let nodemailer = require("nodemailer");
exports.mail= async function mail(to,subject,textmessage){
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth:{
            user: "noreply@enugudisco.com",
            pass: "Enugudisco@123",
        },
        secure: true,
    });
    const mailData = {
        from:'"From Truck Service" <noreply@enugudisco.com>',
        to: `${to}`,
        subject: `${subject}`,
        text: `${textmessage}`,
    };
    let info = await transporter.sendMail(mailData, function(err, info){
        if(err) console.log(err);
        else console.log(info);

    });
}