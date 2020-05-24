const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'acceptmail.23@gmail.com',
        pass: 'fwgvtwnohiugnrlu',
    }
})

const mailOptions = {
    from: "acceptmail.23@gmail.com",
    to: "virajssjadhav@gmail.com",
    subject: "My first email",
    text: "This is the first email sent through node.js",
    html: "<a href=\"http:/localhost:3000/\">Click here</a>"
}

transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
        console.log(error)
    }
    else {
        console.log("Email sent!" + info.response)
    }
})