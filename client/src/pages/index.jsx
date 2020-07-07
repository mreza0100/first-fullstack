import { flex, butyInputs, prevEnter, grabToken } from "../helpers/exports";
import { getTodos } from "../redux/actions/todos.js";
import { Formik, Form, Field } from "formik";
import MainLayout from "../layout/main";
import styled from "styled-components";
import Todo from "../components/Todo";
import * as yup from "yup";
import { _USE_API_ } from "../api/index.API";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

// !----------SerchBox component
const schema = yup.object({
	title: yup.string().required().trim(),
	body: yup.string().required().trim(),
});

async function handleSubmit(data) {
	const token = grabToken(document.cookie);
	const res = await _USE_API_({
		headers: { authentication: token },
	}).Post({
		url: "todos",
		params: { ...data },
	});
	return res.status;
}

function AddBox(props) {
	const dispatch = useDispatch();
	return (
		<StyledAdd>
			<Formik
				initialValues={{ title: "", body: "" }}
				onSubmit={async ({ title, body }, { setSubmitting, resetForm }) => {
					setSubmitting(true);
					const data = { title, body };
					const status = await handleSubmit(data).finally(() => {
						setSubmitting(false);
					});
					if (status === 201) {
						const token = grabToken(document.cookie);
						dispatch(getTodos({ token }));
						resetForm({});
					} else alert("some thing went wrong", status);
				}}
				validationSchema={schema}
			>
				{({ errors, touched, isSubmitting }) => {
					const titleErr = touched["title"] && errors["title"];
					const bodyErr = touched["body"] && errors["body"];
					const showErr = Boolean(titleErr || bodyErr);
					return (
						<Form
							onKeyDown={prevEnter}
							className={isSubmitting ? "disable-all" : ""}
						>
							<Field placeholder="add your title" name="title" />
							<Field
								placeholder="add your note"
								name="body"
								as="textarea"
								style={{ width: "100%" }}
							/>
							<div className="w-100 d-flex justify-content-end">
								{showErr && (
									<div className="alert-danger" id="input-alert">
										<p>{titleErr}</p>
										<p>{bodyErr}</p>
									</div>
								)}
								<button type="reset" className="btn btn-warning">
									clear
								</button>
								<button type="submit" className="btn btn-success ml-4">
									submit
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</StyledAdd>
	);
}

const StyledAdd = styled.div(props => {
	return {
		width: "100%",
		minHeight: "100px",
		"input, textarea": {
			textAlign: "center",
			wdith: "100%",
		},
		textarea: { minHeight: "55px" },
		form: {
			...flex(),
			flexDirection: "column",
			justifyContent: "space-evenly",
			widh: "100%",
			height: "100%",
			...butyInputs,
		},
		"#input-alert": {
			marginRight: "auto",
			...flex(),

			flexDirection: "column",
			padding: "0 10px",
			"> p": { margin: 0 },
		},
	};
});
// !----------SerchBox component

export default function Home() {
	const todos = useSelector(state => state.todos);
	if (todos)
		return (
			<MainLayout>
				<StyledMain className="container">
					<AddBox />
					<ul>
						{todos.map(todo => {
							return <Todo data={todo} key={todo._id} />;
						})}
					</ul>
				</StyledMain>
			</MainLayout>
		);
	return (
		<h3>
			something went wrong
			<Link href="/login">
				<h1 id="error-msg">back to login</h1>
			</Link>
		</h3>
	);
}

Home.getInitialProps = async ({ store, req, res }) => {
	if (process.browser) var cookies = document.cookie;
	else var { cookie: cookies } = req.headers;
	const token = grabToken(cookies);
	await store.dispatch(getTodos({ token, redirectToLogin }));
	return { x: 1 };
	function redirectToLogin() {
		res.writeHead(302, { Location: "/login" });
		res.end();
	}
};

const StyledMain = styled.main(props => {
	return {
		width: "100%",
		height: "auto",
		minHeight: "100vm",
		"> ul": {
			width: "100%",
			display: "flex",
			flexBasis: "33.333%",
			flexWrap: "wrap",
			height: "auto",
		},
	};
});
