import { Router } from "express";
import bodyParser from 'body-parser';
import User from '../models/User';

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

export default router.post('/favs', async (req: any, res: any) => {
    console.log('favs');
    const user = await User.findOne({email: req.headers["email"]});
    if(!user){
        return res.status(400).json({message:'no auth'})
    }
    const favs = req.body;
    if(!favs){
        return res.status(400).json({message:'no data'})
    }
    user.favourite = favs;
    try {
        await user.save();
        return res.status(201).json({message: 'User`s data updated'})
    } catch (e) {
        res.status(500).json({message: e})
    }
});