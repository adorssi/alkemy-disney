const db = require('../database/models');
const { validationResult } = require('express-validator' );
const bcryptjs = require('bcryptjs');
const sendEmail = require('../modules/SendGridEmail/index.js');

const userController = {
    processRegister: async (req, res) => {
        const {name, email, password} = req.body;
        let errors = validationResult(req);
        
        if(errors.isEmpty()) {
            try {
                const userExists = await db.User.findAll(
                    {
                    attributes: ['email'],
                    where: {
                        email: email
                    }
                
                });
                if(userExists.length === 1) {
                    res.json({
                        error: 'El email ya se encuentra registrado'
                    })
                } else {
                    const newUser = db.User.create({
                        name,
                        email,
                        password: bcryptjs.hashSync(password, 10),
                    });
    
                    sendEmail(email, name);
                    res.json({
                        success: 'El usuario se creó correctamente.'
                    });
                }
                
            } catch (error) {
                console.log(error);
            }
        } else {
            res.json({
                errors
            });
        }
    },
    processLogin: async (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            const {email, password} = req.body;
            const userExists = await db.User.findAll(
                {
                attributes: ['email', 'password'],
                where: {
                    email: email
                }
            
            });
            
            if(userExists.length === 1) {
                if(bcryptjs.compareSync(password, userExists[0].password)) {

                    res.json({
                        logged: true,
                        userLogged: userExists[0].email
                    });
                } else {
                    res.json({
                        error: 'Credenciales inválidas'
                    })
                }
            }
        }
    }
}

module.exports = userController;