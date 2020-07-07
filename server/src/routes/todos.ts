import { Response, Router } from "express";
import { customRequest, TRouter } from "../helpers/@types";
import User, { IUser } from "../models/user.model";

import { saveTodoValidation } from "../helpers/validation";
import authentication from "../helpers/authentication";
import { badReq } from "../helpers/funcs";

const router: TRouter = Router();
router.get("/", authentication, async (req: customRequest, res: Response) => {
	try {
		const user: IUser | null = await User.findById(req.userID);
		if (!user) return res.status(401).send("Access Denied");
		res.json(user.todos).end();
	} catch (err) {
		console.log(err);
		return badReq(res);
	}
});

router.post("/", authentication, async (req: customRequest, res: Response) => {
	// validation
	const isValid: any = await saveTodoValidation({
		title: req.body.title,
		body: req.body.body,
	});
	if (!isValid.ok) return res.status(403).json(isValid.err).end();

	const { title, body } = isValid.trustedData;
	// validation is ok try to save todo
	try {
		const user: IUser | null = await User.findById(req.userID);
		if (!user) return res.status(401).send("Access Denied");
		user.todos.unshift({ title, body });
		user.save();
		res.status(201).send("todo added").end();
	} catch (err) {
		return badReq(res);
	}
});

router.delete("/", authentication, async (req: customRequest, res: Response) => {
	const userID: string = req.userID;
	const todoID: string = req.body.todoID;

	try {
		const user: IUser | null = await User.findById(userID);
		if (!user) return res.status(401).send("Access Denied");

		if (user.todos)
			user.todos = user.todos.filter(todo => todo._id!.toString() !== todoID);

		user.save();

		res.status(200).send("todo deleted").end();
	} catch (err) {
		return badReq(res);
	}
});

module.exports = router;
