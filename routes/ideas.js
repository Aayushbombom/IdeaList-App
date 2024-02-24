const express = require('express');
const Idea = require('../models/Idea');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.json({success: true, data: ideas});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something Went Wrong'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        res.json({success: true, data: idea});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something Went Wrong'});
    }
});

router.post('/', async (req, res) => {
    const idea = new Idea({
        text: req.body.text,
        tag: req.body.tag,
        username: req.body.username,
    });
    try {
        const savedIdea = await idea.save();
        res.json({success: true, data: savedIdea});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something Went Wrong'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id, {
            $set: {
                text: req.body.text,
                tag: req.body.tag
                },
            },
            { new: true });
        res.json({sucess: true, data: updatedIdea})    
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something Went Wrong'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const idea = await Idea.findById(req.params.id);
        console.log(idea);
        if(idea.username === req.body.username){
            await Idea.findByIdAndDelete(req.params.id);   
            return res.json({sucess: true, data: {}}); 
        }
        res.status(403).json({success: false, error: 'Something Went Wrong'});
           
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: 'Something Went Wrong'});
    }
})

module.exports = router;