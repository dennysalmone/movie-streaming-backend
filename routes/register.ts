import { Router } from "express";
import bcrypt from "bcryptjs";
import bodyParser from 'body-parser';
import User from '../models/User';
import { check, validationResult } from 'express-validator';
import Counter from '../models/Counter';
const router = Router();

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

export default router.post(
    '/register', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('userName', 'Incorrect User Name').isLength({min: 1}),
        check('password', 'Incorrect password').isLength({min: 6})
    ],
    async (req: any, res: any) => {
    try {
        console.log('register')
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data during registration'
            })
        }
        let counter = await Counter.findOne({name: 'default'})
        if (!counter) {
            const firstCounter = new Counter ({
                name: 'default',
                idCounter: 1
            })
            await firstCounter.save()
        }
        let candidate = await User.findOne({email: req.body.email})
        if (candidate) {
            return res.status(400).json({message: 'This user alredy exists'})
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
            userName: req.body.userName,
            userId: counter.idCounter++,
            favourite: {}
        })
        await user.save()
        await Counter.updateOne({name: 'default'}, {$inc: { idCounter: 1 }} )
        return res.status(201).json(user)
    }
    catch (e) {
        return res.status(500).json({message: e})
    }
})