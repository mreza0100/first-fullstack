import styled from "styled-components";
import { flex, $ } from "../helpers/exports";
import { _USE_API_ } from "../api/index.API";
import { useDispatch } from "react-redux";
import { getTodos } from "../redux/actions/todos";

const handleSubmit = async id => {
	try {
		var res = await _USE_API_().Delete({ url: "todos", data: { todoID: id } });
		console.log(res);
	} catch (err) {
		alert(err);
	}
	return res.status;
};

export default function Todo({ data }) {
	const { title, body, _id } = data;
	const dispatch = useDispatch();

	const onSubmit = async () => {
		const status = await handleSubmit(_id);
		if (status === 200) dispatch(getTodos());
	};

	return (
		<StyledTask>
			<h4>{title}</h4>
			<h6>{body}</h6>
			<button className="btn btn-danger" onClick={onSubmit}>
				delete
			</button>
		</StyledTask>
	);
}

const StyledTask = styled.li(props => {
	return {
		...flex(["justifyContent"]),
		justifyContent: "space-evenly",
		flexDirection: "column",
		maxWidth: "33.3333%",
		width: "100%",
		minHeight: "95px",
		padding: "10px",
		"> h4": {
			fontSize: `16px ${$}`,
		},
		"> h6, > h4": {
			width: "80%",
			fontSize: "14px",
			wordBreak: " break-word",
			textAlign: "center",
		},
	};
});
