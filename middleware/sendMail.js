import { createTransport } from "nodemailer";

const sendMail = async (email, subject, otp) => {
  try {
    const transport = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Important for Gmail
      auth: {
        user: process.env.GMAIL,     // 👉 Use uppercase consistent key
        pass: process.env.PASSWORD   // 👉 Use uppercase consistent key
      }
    });

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>OTP Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            h1 {
                color: red;
            }
            p {
                margin-bottom: 20px;
                color: #333;
            }
            .otp {
                font-size: 32px;
                font-weight: bold;
                color: #7b68ee;
                margin-bottom: 30px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>OTP Verification</h1>
            <p>Hello ${email},</p>
            <p>Your One-Time Password (OTP) for verification is:</p>
            <p class="otp">${otp}</p>
        </div>
    </body>
    </html>`;

    await transport.sendMail({
      from: `"MarkIt" <${process.env.GMAIL}>`,
      to: email,
      subject,
      html
    });

    console.log("Email sent to", email);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send OTP email");
  }
};

export default sendMail;
