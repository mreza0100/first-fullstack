import { Request } from "express";
export interface customRequest extends Request {
	userID: string;
}
export interface dotenvTypes {
	PORT: string;
	salt: string;
	TOKEN_SECRET: string;
}
export interface TRouter {
	get: any;
	post: any;
	put: any;
	delete: any;
	all: any;
}
