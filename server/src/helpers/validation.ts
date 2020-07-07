const yup = require("yup");

const registerSchema = <any>yup.object({
	name: yup.string().min(6).max(255).required().trim(),
	email: yup.string().min(6).max(255).email().required().trim(),
	password: yup.string().min(6).max(1024).required().trim(),
});

export const registerValidation = (data: {
	name: string;
	email: string;
	password: string;
}) =>
	registerSchema
		.validate(data)
		.then((trustedData: any) => ({ ok: true, trustedData }))
		.catch((err: any) => ({ ok: false, err }));

const loginSchema = yup.object({
	email: yup.string().min(6).max(255).email().required().trim(),
	password: yup.string().min(6).max(1024).required().trim(),
});
export const loginValidation = (data: { email: string; password: string }) =>
	loginSchema
		.validate(data)
		.then((trustedData: any) => ({ ok: true, trustedData }))
		.catch((err: any) => ({ ok: false, err }));

const saveTodoSchema = yup.object({
	title: yup.string().required().trim(),
	body: yup.string().required().trim(),
});
export const saveTodoValidation = (data: { title: string; body: string }) =>
	saveTodoSchema
		.validate(data)
		.then((trustedData: any) => ({ ok: true, trustedData }))
		.catch((err: any) => ({ ok: false, err }));
