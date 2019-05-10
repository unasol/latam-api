import axios from "axios";
// initial setting from axios
const instance = accessToken =>
  axios.create({
    baseURL: "https://test.api.latam-pass.latam.com",
    // timeout: 5000,
    headers: {
      "cache-control": "no-cache",
      Authorization: `Bearer ${accessToken}`
    }
  });
export default instance;
