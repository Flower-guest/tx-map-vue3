import Request from "./request";
import localCache from "@/utils/Cache";

const timeOut = 30000;
const xjRequest = new Request({
  baseURL: import.meta.env.VITE_BASE_URL + "",
  timeout: timeOut,
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache("token") ?? "";
      if (token) {
        config.headers = {
          token,
          // Authorization: `bearer ${token}`,
        };
      }
      return config;
    },
  },
});

export default xjRequest;
