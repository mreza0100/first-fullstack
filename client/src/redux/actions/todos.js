import { GET_TODOS } from "../type";
import { _USE_API_ } from "../../api/index.API";

export const getTodos = (payload = {}) => async (dispatch, getState) => {
	const { token, redirectToLogin } = payload;
	if (redirectToLogin) {
		if (!token) redirectToLogin();
	}
	const headers = token ? { authentication: token } : null;

	try {
		const res = await _USE_API_({ headers })
			.Get({
				url: "todos",
			})
			.catch(err => {
				if (err.response.status === 401) redirectToLogin();
			});
		dispatch({ type: GET_TODOS, payload: res.data });
	} catch (err) {
		dispatch({ type: GET_TODOS, payload: false });
	}
};
