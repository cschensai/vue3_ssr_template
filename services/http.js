import axios from "axios";
import userUser from "~/stores/user";
import { i18n } from "~/plugins/i18n";
import { formatToken } from "../utils/utils";
const store = userUser();
const { VITE_NODE_ENV, VITE_HOME_URL } = useRuntimeConfig();
console.log(111, VITE_NODE_ENV, VITE_HOME_URL)

const http = axios.create({
  timeout: 20000,
  baseURL:
  VITE_NODE_ENV === "development"
      ? "/api"
      : VITE_HOME_URL
});

http.interceptors.request.use(
  (config) => {
    const cookie = useCookie("JSESSIONID").value;
    config.headers.cookies = cookie;
    const token  = formatToken();
    if (config.url === "/api/user/login" || config.url === "/api/user/token") {
      return config;
    }
    if (token) {
      config.headers.Authentication = `Bearer ${token}`;
      config.headers.token = token;
    } else {
      store.logUserOut();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    if (response.headers["new-token"]) {
      const newToken = response.headers["new-token"];
      localStorage.setItem("token", newToken);
    }
    return response;
  },
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      store.logUserOut();
      if (error.response && error.response.data) {
        error.response.data.errorMessage = i18n.global.t("tokenGGMsg");
      }
      error.message = i18n.global.t("tokenGGMsg");
      return Promise.reject(error);
    }
    if (
      error.response &&
      error.response.data &&
      error.response.data === "JWT_TOKEN_CHECK_FAILED"
    ) {
      store.logUserOut();
    }
    return Promise.reject(error);
  }
);

export default http;
