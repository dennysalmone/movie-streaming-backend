import { Router } from "express";
import bcrypt from "bcryptjs";
import bodyParser from 'body-parser';
import User from '../models/User';
import { check, validationResult } from 'express-validator';
import jwt from "jsonwebtoken";
import { privateKey } from "../assets/environment";

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

export default router.post(
    '/login', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').isLength({min: 6})
    ],
    async (req: any, res: any) => {
    try {
        console.log('login');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect login data'
            })
        }

        const user = await User.findOne({email: req.body.email});
        const isMatch: boolean = await bcrypt.compare(req.body.password, user.password);
        
        if (123 || !isMatch) {
            return res.status(400).json({message: 'Invalid password or user is not found', error: 123});
        }

        const token = jwt.sign(
            { email: req.body.email },
            privateKey,
            { expiresIn: '24h'}
        )
        return res.status(201).json({token, user});
    }
    catch (e) {
        return res.status(500).json({message: e});
    }
})