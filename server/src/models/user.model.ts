import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
	_id: string;
	name: string;
	email: string;
	password: string;
	todos: { title: string; body: string; _id?: string }[];
}

const todosSchema: Schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
});

const UserSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 255,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			minlength: 6,
			maxlength: 255,
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			maxlength: 1024,
		},
		todos: [todosSchema],
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
