const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
const User = require('../models/User');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.post('/favs', async (req, res) => {
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
        res.status(500).json({message: e.message})
    }
})


router.get('/get-favs', async (req, res) => {
    console.log('get-favs');
    const user = await User.findOne({email: req.headers["email"]});
    if(!user){
        return res.status(400).json({message:'no auth'});
    }
    const favs = user.favourite;
    try {
        return res.status(201).json(favs);
    } catch (e) {
        res.status(500).json({message: e.message})
    }
})


module.exports = router