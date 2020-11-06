const router = require('express').Router();
const Thoutht = require('../thought');

router.get("/", (req, res, next) => {
    Thoutht.find({}, (error, result) => {
        if (error) {
            // next(error)
            res.json(error)
        } else {
            res.json(result)
        }
    })
})

router.post("/create", (req, res, next) => {
    const thought = req.body.thought
    Thoutht.create({ thought }, (error, result) => {
        if (error) {
            res.json(error)
        } else {
            res.json({ newThought: result })
        }
    })
})




module.exports = router;