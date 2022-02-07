const fetch = require('node-fetch');
require('dotenv').config();

async function sendEmail(email, name) {
    try {
        const body = {
            "personalizations": [
                        {
                            "to":[
                                    {
                                        "email": email,
                                        "name": name
                                    }
                                ],
                            "subject":"¡Bienvenido, " + name + "!"
                        }
            ],
            "content": [
                {
                    "type": "text/plain",
                    "value": "¡El registro se ha completado correctamente!"
                }
            ],
            "from":
            {
                "email":"adorssi@gmail.com",
                "name":"Ariel Dorssi"
            },
            "reply_to":
            {
                "email":"adorssi@gmail.com",
                "name":"Ariel Dorssi"
            }
        }
            const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.SEND_GRID_KEY
            }
        });
    
        return true;
    } catch (error) {
        console.log(error);
    }


}

module.exports = sendEmail;
