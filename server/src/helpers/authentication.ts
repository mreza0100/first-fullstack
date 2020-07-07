import { Response, NextFunction } from "express";
import { customRequest } from "./@types";
import jwt from "jsonwebtoken";
import { dotenv } from "../index";

function authentication(req: customRequest, res: Response, next: NextFunction) {
	const token: string = <string>req.headers.authentication;

	if (!token) return res.status(401).send("Access Denied");

	try {
		const JWTPayload: { _id: string } = <any>jwt.verify(token, dotenv.TOKEN_SECRET);
		req.userID = JWTPayload._id;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).send("Invalid Token");
	}
}

export default authentication;
