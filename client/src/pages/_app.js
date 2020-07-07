import NextApp from "next/app";
// Router for NProgress
import Router from "next/router";
// ThemeProvider styled-components"
import { ThemeProvider } from "styled-components";
// NProgress
import NProgress from "nprogress";
import { wrapper } from "../redux/store";
// font-awesome
import "font-awesome/css/font-awesome.min.css";
// nprogress
import "nprogress/nprogress.css";
// general styles include libs font etc...
import "../styles/general.scss";

Router.onRouteChangeStart = x => {
	NProgress.start();
};

Router.onRouteChangeComplete = () => {
	NProgress.done();
};

Router.onRouteChangeError = () => {
	NProgress.done();
};

// !--->>>

export default wrapper.withRedux(
	class App extends NextApp {
		render() {
			const { Component, pageProps } = this.props;
			return (
				<ThemeProvider theme={{}}>
					<Component {...pageProps} />
				</ThemeProvider>
			);
		}
	}
);

export async function getStaticProps({ Component, ctx }) {
	return {
		...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
	};
}

// export function reportWebVitals(metric) {
// 	console.log(metric);
// }
