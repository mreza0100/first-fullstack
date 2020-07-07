import { GET_TODOS } from "../type";

export default function (state = false, action) {
	switch (action.type) {
		case GET_TODOS:
			return action.payload;
		case "???":
			return [action.payload, ...state];
		default:
			return state;
	}
}
