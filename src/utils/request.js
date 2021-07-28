import axios from "axios";
import { handleResponseErrorMessage } from "./response";

// create an axios instance
const request = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  // eslint-disable-next-line
  timeout: process.env.REQUEST_TIMEOUT || 30000, // request timeout
});

// Config header
const configHeader = (headers) => {
  for (const [key, value] of Object.entries(headers)) {
    axios.defaults.headers.common[key] = value;
  }
};

// request interceptor
request.interceptors.request.use(
  (config) => {
    // do something before request is sent
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept-Language"] = "vi";
    return config;
  },
  (error) => {
    // do something with request error
    // eslint-disable-next-line
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // Add logic to check response here
    // For example: logout when account is logged on different device, backend can send custom code here
    return res;
  },
  (error) => {
    return Promise.reject(handleResponseErrorMessage(error));
  }
);

export default { request, configHeader };
