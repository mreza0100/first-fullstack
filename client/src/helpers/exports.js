function transition(time = 0.3) {
	return {
		transition: `${time}s ease-in-out,background-color 
                ${time}s ease-in-out,border-color 
                ${time}s ease-in-out,box-shadow 
                ${time}s ease-in-out;`,
	};
}

function flex(whatIDontWant = []) {
	let res = { display: "flex" };
	if (!whatIDontWant.includes("alignItems")) {
		res = { ...res, alignItems: "center" };
	}
	if (!whatIDontWant.includes("justifyContent")) {
		res = { ...res, justifyContent: "center" };
	}
	return res;
}

const $ = "!important";

const butyInputs = {
	"input, textarea": {
		borderRadius: "5px",
		padding: "5px 8px",
		margin: "10px 0",
		border: "1px #3c615ba1 solid",
		transition: "all .2s linear",
		"&::placeholder": {
			color: "black",
			opacity: "1",
		},
		"&:focus": {
			outline: "none",
			border: "1px #475993 solid",
			boxShadow: "3px 3px #475993a4",
		},
	},
};

const stringify = JSON.stringify;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const consoleCss = [
	"width: 400px",
	"background: linear-gradient(#06d35b, #571402)",
	"border: 1px solid #3E0E02",
	"color: white",
	"text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)",
	"line-height: 40px",
	"font-weight: bold",
].join(";");

function prevEnter(e) {
	if ((e.charCode || e.keyCode) === 13) e.preventDefault();
	return void 0;
}

const getObjLength = obj => Object.keys(obj).length;
function grabToken(cookies) {
	try {
		const idx = cookies.split("=").indexOf("token") + 1;
		const token = cookies.split("=")[idx];
		return token;
	} catch (err) {
		return false;
	}
}
export {
	transition,
	flex,
	$,
	phoneRegExp,
	butyInputs,
	stringify,
	consoleCss,
	prevEnter,
	getObjLength,
	grabToken,
};
