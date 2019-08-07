import axios from "axios";
// initial setting from axios
const instance = (url, accessToken) => {
  axios.defaults.baseURL = url;
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  // axios.create({
  //   baseURL: url,
  //   // timeout: 5000,
  //   headers: {
  //     "cache-control": "no-cache",
  //     Authorization: `Bearer ${accessToken}`
  //   }
  // });
};
export default instance;
