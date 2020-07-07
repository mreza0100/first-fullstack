import Axios from "axios";
import { consoleCss, grabToken } from "../helpers/exports";
import Router from "next/router";
const dash = "-------";
const { parse } = JSON;
const APIConfigs = {
	// baseURL: "http://192.168.1.21:8585/v1/",
	baseURL: "http://localhost:8000",
	dispatch: false,
	getState: false,
	debug: false,
	details: false,
};

class Api {
	constructor({ dispatch, getState, baseURL, debug, details, headers }) {
		this.headers = headers ?? { authentication: this._getToken() };
		this.dispatch = dispatch ?? APIConfigs.dispatch;
		this.getState = getState ?? APIConfigs.getState;
		this.debug = debug ?? APIConfigs.debug;
		this.details = details ?? APIConfigs.details;
		this.baseURL = baseURL ?? APIConfigs.baseURL;
		this.xhr = Axios.create({
			baseURL: this.baseURL,
			headers: this.headers,
		});
	}

	_debugCenter = ({ axiosMsg, url, params, callbackWithRes, callback }) => {
		try {
			try {
				var { config, data: d, status, statusText, request } = axiosMsg;
			} catch {
				var { config, status, statusText, request } = axiosMsg.response;
			}
			const { warn, log, table, group, groupEnd } = console;
			const data = typeof d !== "undefined" ? d : parse(config.data);
			const msg = `%c${dash}MSG from debug center->debug : [[[${this.debug}]]] detailes : [[[${this.details}]]]${dash}`;
			warn(msg, consoleCss);
			group("NETWORK STUFF");
			log("status code     ::::", status);
			log("statusText      ::::", statusText);
			log("method          ::::", config.method);
			log("params          ::::", params ?? "not found");
			log("data            ::::", data);
			log("headers         ::::", config.headers);
			log("response        ::::", request.response ?? undefined);
			log("pathName        ::::", url);
			log("baseURL         ::::", this.baseURL);
			log("full URL        ::::", request.responseURL ?? undefined);
			groupEnd();
			group("INTERNAL STUFF");
			log("callbackWithRes ::::", !!callbackWithRes);
			log("callback        ::::", !!callback);
			log("dispatch        ::::", !!this.dispatch);
			log("getState        ::::", !!this.getState);
			groupEnd();
			warn(msg, consoleCss);
			if (this.details) {
				log("configs: ");
				table(config);
				log(dash);
				log("request: ");
				table(request);
			}
		} catch (err) {
			console.warn(`${dash}INTERNAL ERROR WHILE DIBAGING${dash}`);
			console.warn(err);
		}
	};

	_getToken() {
		try {
			var cookies = document.cookie;
			const token = grabToken(cookies);
			if (!token) Router.push({ pathname: "/login" });
			return token;
		} catch (err) {}
	}

	_handleRes = res => {
		// console.log(res);
	};

	_handleErr = err => {
		try {
			if (err.response.status === 401) Router.push({ pathname: "/login" });
		} catch (reason) {}
	};

	Get({ url, params, data, callbackWithRes, callback }) {
		return new Promise((resolve, reject) => {
			this.xhr
				.get(url, {
					params,
					data,
				})
				.then(res => {
					this._handleRes(res);
					resolve(res);
					return res;
				})
				.then(res => {
					if (this.debug)
						this._debugCenter({
							axiosMsg: res,
							url,
							params,
							callbackWithRes,
							callback,
						});
				})
				.then(callbackWithRes)
				.catch(err => {
					this._handleErr(err);
					reject(err, url, params);
					if (this.debug)
						this._debugCenter({
							axiosMsg: err,
							url,
							params,
							callbackWithRes,
							callback,
						});
				})
				.finally(callback);
		});
	}

	Post({ url, params, data, callbackWithRes, callback } = {}) {
		return new Promise((resolve, reject) => {
			this.xhr
				.post(url, params, { data })
				.then(res => {
					this._handleRes(res);
					resolve(res);
				})
				.then(res => {
					if (this.debug)
						this._debugCenter({
							axiosMsg: res,
							url,
							params,
							callbackWithRes,
							callback,
						});
				})
				.then(callbackWithRes)
				.catch(err => {
					this._handleErr(err);
					reject(err);
					if (this.debug)
						this._debugCenter({
							axiosMsg: err,
							url,
							params,
							callbackWithRes,
							callback,
						});
				})
				.finally(callback);
		});
	}

	Delete({ url, params, data, callbackWithRes, callback }) {
		return new Promise((resolve, reject) => {
			this.xhr
				.delete(url, { data, params })
				.then(res => {
					this._handleRes(res);
					resolve(res);
					return res;
				})
				.then(res => {
					if (this.debug)
						this._debugCenter({
							axiosMsg: res,
							url,
							params,
							callbackWithRes,
							callback,
						});
				})
				.then(callbackWithRes)
				.catch(err => {
					this._handleErr(err);
					reject(err, url, params);
					if (this.debug)
						this._debugCenter({
							axiosMsg: err,
							url,
							params,
							callbackWithRes,
							callback,
						});
				})
				.finally(callback);
		});
	}
}

// ? INITING HOOK

function _USE_API_({ dispatch, getState, baseURL, debug, details, headers } = {}) {
	return new Api({ dispatch, getState, baseURL, debug, details, headers });
}

// $>>> EXPORTS
export default Api;
export { _USE_API_ };
