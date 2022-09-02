import { Router } from "express";
import bodyParser from 'body-parser';
import User from '../models/User';

const router = Router();

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

export default router.get('/get-favs', async (req: any, res: any) => {
    console.log('get-favs');
    const user = await User.findOne({email: req.headers["email"]});
    if(!user){
        return res.status(400).json({message:'no auth'});
    }
    const favs = user.favourite;
    try {
        return res.status(201).json(favs);
    } catch (e) {
        res.status(500).json({message: e})
    }
})