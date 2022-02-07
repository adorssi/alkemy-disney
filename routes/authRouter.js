const express = require('express');
const authController = require('../controllers/authController');
var router = express.Router();
const { body } = require('express-validator');

const registerValidation = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').notEmpty().withMessage('El correo electrónico es obligatorio').bail().isEmail().withMessage('El correo no tiene un formato válido'),
    body('password').notEmpty().withMessage('Debes introducir una contraseña'),
    body('password_confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Las contraseñas especificadas no coinciden');
        }
        return true;
      }),
];

const loginValidation = [
  body('email').notEmpty().withMessage('El correo electrónico es obligatorio').bail().isEmail().withMessage('El correo no tiene un formato válido'),
  body('password').notEmpty().withMessage('Debes introducir una contraseña')
];

router.post('/register', registerValidation, authController.processRegister);
router.post('/login', loginValidation, authController.processLogin);

module.exports = router;
