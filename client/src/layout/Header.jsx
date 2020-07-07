import { flex } from "../helpers/exports";
import styled from "styled-components";

export default function Header() {
	return (
		<StyledHeader>
			<div className="container row justify-content-end">
				<h1>awdawd</h1>
			</div>
		</StyledHeader>
	);
}

const StyledHeader = styled.header(props => {
	return {
		...flex(),
		height: "50px",
		width: "100%",
		backgroundColor: "#212121",
	};
});
