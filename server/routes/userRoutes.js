import express from 'express';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '../middleware/sendVerificationEmail.js';
import {sendPasswordResetEmail} from '../middleware/sendPasswordResetEmail.js';

const userRoutes = express.Router()

const genToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {expiresIn: '60d'})
}

//login
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPasswords(password))) {
        user.firstLogin = false;
        await user.save()
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            googleImage: user.googleImage,
            googleId: user.googleId,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
            active: user.active,
            firstLogin: user.firstLogin,
            created: user.createdAt,
        });
    } else {
        res.status(401).send('E-mail o contraseña incorrectos.')
        throw new Error('Usario no encontrado.')
        
    }
})

//registro

const registerUser = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400).send('Ya existe una cuenta con este e-mail.');
    }

    const user = await User.create ({
        name,
        email,
        password,
    });

    const newToken = genToken(user._id);

    sendVerificationEmail(newToken, email, name);

    if (user) {
        res.status(201).json ({
            id: user._id,
            name: user.name,
            email: user.email,
            googleImage: user.googleImage,
            googleId: user.googleId,
            firstLogin: user.isAdmin,
            token: newToken,
            active: user.active,
            createdAt: user.createdAt,
        });
    }
})

//verificacion de e-mail
const verifyEmail = asyncHandler (async (req, res) => {
    const token = req.headers.authorization.split('')[1]
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decoded.id);
        
        if(user) {
            user.active = true;
            await user.save();
            res.json('Gracias por activar tu cuenta. Ya podés cerrar esta ventana.');
        } else {
            res.status(404).send('Usuario no encontrado.');
        }
    } catch (error) {
        res.status(401).send('Dirección de e-mail no pudo ser verificada.');                
    }
});

//requisito de reseteo de contraseña
const passwordResetRequest = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email});

        if(user) {
            const NewToken = genToken(user._id);
            sendPasswordResetEmail(newToken, user.email, user.name);
            res.status(200).send(`Enviamos un e-mail de recuperación de contraseña al siguiente e-mail $(email)`);
        }
        
    } catch (error) {
        res.status(401).send('No existe una cuenta con esta dirección de e-mail.');        
    }
})


//reseteo de contraseña
const passwordReset = asyncHandler(async(req, res) => {
    const token = req.headers.authorization.split('')[1]
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await User.findById(decoded.id);
        
        if(user) {
            user.password = req.body.password;
            await user.save();
            res.json('Tu contraseña ha sido actualizada correctamente.');
        } else {
            res.status(404).send('No se pudo resetear la contraseña.');
        }
    } catch (error) {
        res.status(401).send('Dirección de e-mail no pudo ser verificada.');                
    }
});

//GOOGLE LOGIN
const googleLogin = asyncHandler(async (req, res) => {
	const { googleId, email, name, googleImage } = req.body;
	console.log(googleId, email, name, googleImage);

	try {
		const user = await User.findOne({ googleId: googleId });
		if (user) {
			user.firstLogin = false;
			await user.save();
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				googleImage: user.googleImage,
				googleId: user.googleId,
				firstLogin: user.firstLogin,
				isAdmin: user.isAdmin,
				token: genToken(user._id),
				active: user.active,
				createdAt: user.createdAt,
			});
		} else {
			const newUser = await User.create({
				name,
				email,
				googleImage,
				googleId,
			});

			const newToken = genToken(newUser._id);

			sendVerificationEmail(newToken, newUser.email, newUser.name, newUser._id);
			res.json({
				_id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				googleImage: newUser.googleImage,
				googleId: newUser.googleId,
				firstLogin: newUser.firstLogin,
				isAdmin: newUser.isAdmin,
				token: genToken(newUser._id),
				active: newUser.active,
				createdAt: newUser.createdAt,
			});
		}
	} catch (error) {
		res.status(404).send('Algo salió mal. Por favor intente luego.');
	}
});


userRoutes.route('/login').post(loginUser);
userRoutes.route('/register').post(registerUser);
userRoutes.route('/verify-email').get(verifyEmail);
userRoutes.route('/password-reset-request').post(passwordResetRequest);
userRoutes.route('/password-reset').post(passwordReset);
userRoutes.route('/google-login').post(googleLogin);

export default userRoutes;

