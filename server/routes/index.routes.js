const router = require("express").Router()
const User = require("../models/User.model")
const uploader = require("./../config/cloudinary.config")

router.post("/", uploader.single("picture"), async (req, res, next) => {
	console.log(req.body)
	console.log(req.file)
	try {
		const createdUser = await User.create({
			name: req.body.name,
			picture: req.file.path,
		})
		res.json(createdUser)
	} catch (error) {
		next(error)
	}
})

module.exports = router
