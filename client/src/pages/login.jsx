import { FieldContainerTag, Label, C } from "./register";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import { _USE_API_ } from "../api/index.API";
import * as yup from "yup";
import cookie from "js-cookie";
import Router from "next/router";
import Link from "next/link";

const __dataInputs__ = [
	{ name: "email", label: "email", type: "text" },
	{ name: "password", label: "password", type: "password" },
];

const initialValues = { email: "", password: "" };

const validation = yup.object({
	email: yup.string().email().required().trim(),
	password: yup.string().min(8).required().trim(),
});

const handleSubmit = async data => {
	try {
		const res = await _USE_API_().Post({
			url: "user/login",
			params: data,
		});
		const { token } = res.data;
		if (token) {
			cookie.set("token", token);
			Router.push({ pathname: "/" });
		}
	} catch (err) {
		alert(err);
	}
};

export default function login(props) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={({ email, password }) => {
				const data = { email, password };
				handleSubmit(data);
			}}
			validationSchema={validation}
		>
			{({ errors, touched }) => {
				return (
					<StyledMain className={C.FieldContainer}>
						<Form className={C.Form}>
							{__dataInputs__.map(({ name, label, type }) => {
								const err = touched[name] && errors[name];
								return (
									<FieldContainerTag key={name} className={C.FieldContainer}>
										<Label err={err}>{err ?? label}</Label>
										<Field name={name} type={type} />
									</FieldContainerTag>
								);
							})}
							<button className={C.btnSubmit} type="submit">
								submit
							</button>
							<Link href="/register">
								<h4 className="mt-4 cursor-pointer">Register</h4>
							</Link>
						</Form>
					</StyledMain>
				);
			}}
		</Formik>
	);
}
const StyledMain = styled.main(props => {
	return {
		height: "100vh",
	};
});
