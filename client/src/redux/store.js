import { createStore, applyMiddleware } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import thunk from "redux-thunk";
import combinedReducer from "./reducer";
import Api from "../api/index.API";

const reducer = (state, action) => {
	if (action.type === HYDRATE) {
		// !action.payload.posts && delete action.payload.posts;
		return {
			...state,
			...action.payload,
		};
	} else {
		return combinedReducer(state, action);
	}
};

export const makeStore = () =>
	createStore(reducer, applyMiddleware(thunk.withExtraArgument({ Api })));

export const wrapper = createWrapper(makeStore);
