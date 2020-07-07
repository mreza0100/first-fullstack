import { flex, $, transition, butyInputs } from "../helpers/exports";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import { _USE_API_ } from "../api/index.API";
import * as yup from "yup";
import Router from "next/router";
import Link from "next/link";

export const C = {
	FieldContainer: "row w-100 justify-content-center",
	Form: "container d-flex flex-column align-items-center",
	btnSubmit: "btn btn-outline-secondary mt-4 pr-5 pl-5",
};

const __dataInputs__ = [
	{ name: "name", label: "name", type: "text" },
	{ name: "email", label: "email", type: "email" },
	{ name: "pass", label: "password", type: "password" },
	{ name: "pass2", label: "confirm password", type: "password" },
];

const initialValues = {
	name: "",
	email: "",
	pass: "",
	pass2: "",
};
const validation = yup.object({
	name: yup.string().trim().required(),
	email: yup.string().email().trim(),
	pass: yup.string().trim().min(8).max(32).required(),
	pass2: yup
		.string()
		.oneOf([yup.ref("pass"), null], "Passwords must match")
		.required(),
});

async function handleSubmit(data) {
	const res = await _USE_API_({ debug: true }).Post({
		url: "user/register",
		params: data,
	});
	if (res.status === 201) Router.push({ pathname: "/login" });
}

export default function register(props) {
	return (
		<StyledMain>
			<Formik
				initialValues={initialValues}
				onSubmit={({ name, email, pass }) => {
					// ? sorting data for running handle submit
					const data = { name, email, password: pass };
					handleSubmit(data);
				}}
				validationSchema={validation}
			>
				{({ errors, touched }) => {
					return (
						<Form className={C.Form}>
							{__dataInputs__.map(({ name, label, type }) => {
								const error = touched[name] && errors[name];
								return (
									<FieldContainerTag key={name} className={C.FieldContainer}>
										<Label err={error}>{error ?? label} :</Label>
										<Field name={name} type={type} />
									</FieldContainerTag>
								);
							})}
							<button type="submit" className={C.button}>
								submit
							</button>

							<Link href="/login">
								<h4 className="mt-4 cursor-pointer">Login</h4>
							</Link>
						</Form>
					);
				}}
			</Formik>
		</StyledMain>
	);
}

const StyledMain = styled.main(props => {
	return {
		minHeight: "100vh",
	};
});

export const Label = styled.label(({ err }) => {
	const color = err ? "red" : "#fff";
	return {
		color,
		...transition(0.2),
		fontSize: "18px",
		marginTop: "35px",
		marginBottom: "15px",
	};
});

export const FieldContainerTag = styled.div(props => {
	return {
		...flex(),
		flexDirection: "column",
		width: `45% ${$}`,
		color: "black",
		...butyInputs,
	};
});
