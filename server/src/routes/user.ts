import { Router, Request, Response } from "express";

import User from "../models/user.model";
import jwt from "jsonwebtoken";

import { registerValidation, loginValidation } from "../helpers/validation";
import { dotenv } from "../index";

import { hashThis, bcryptCompare } from "../helpers/funcs";
import { TRouter } from "../helpers/@types";

const router: TRouter = Router();

router.post("/register", async (req: Request, res: Response) => {
	console.log(req.body);
	// validation
	const isValid: any = await registerValidation({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});
	if (!isValid.ok) return res.status(403).json(isValid.err).end();
	const { name, email, password } = isValid.trustedData;
	// validation is ok check for email duplication
	const isduplicate = await User.findOne({ email }).then(res => !!res);
	if (isduplicate) return res.status(406).send("email already exist").end();

	// all right create new user
	const hashedPassword: string = await hashThis(password);
	const newUser = new User({
		name,
		email,
		password: hashedPassword,
	});
	try {
		const savedUser = await newUser.save();
		res.status(201).json({ id: savedUser._id }).end();
	} catch (err) {
		res.status(400).send(err).end();
	}
});

router.post("/login", async (req: Request, res: Response) => {
	// validation
	const isValid: any = await loginValidation({
		email: req.body.email,
		password: req.body.password,
	});
	if (!isValid.ok)
		return res
			.status(403)
			.json(<any>isValid.err)
			.end();
	const { email, password } = <any>isValid.trustedData;
	// validation is ok check for email exist and password compare
	const user: any = await User.findOne({ email });

	if (!user) return res.status(400).send("email not exist").end();
	const isValidPass = await bcryptCompare(password, user.password);
	if (!isValidPass) return res.status(400).send("password is wrong").end();
	// all right generating JWT
	const token = jwt.sign({ _id: user._id }, dotenv.TOKEN_SECRET, {
		expiresIn: "24d",
	});
	res.status(200).json({ token }).end();
});

module.exports = router;
