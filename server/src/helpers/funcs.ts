import { connection, Promise } from "mongoose";
import { dotenv } from "../index";
import bcrypt from "bcryptjs";
import { Response } from "express";

export const getCollections = (configs: { detailes: boolean }) => {
	const detailes = configs.detailes || false;
	const collections = connection.db.listCollections();
	if (detailes) return collections;
	return new Promise((resolve: (x: any) => void, reject: (x: any) => void) => {
		collections.toArray((err: any, arr: { [key: string]: any }[]) => {
			if (err) return reject(err);
			return resolve(arr);
		});
	});
};

export const getObjLength = (obj: {}) => Object.keys(obj).length;

export const hashThis = async (password: string) =>
	await bcrypt.hash(password, await bcrypt.genSalt(+dotenv.salt));

export const bcryptCompare = async (normalPass: string, hashedPass: string) =>
	await bcrypt.compare(normalPass, hashedPass);

export function badReq(res: Response) {
	res.status(400).send("some thing went wrong from badReq").end();
}
/* "fire": "nodemon --inspect -e ts,tsx --exec node -r ts-node/register ./src/index.ts", */
