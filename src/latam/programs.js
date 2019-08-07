import axios from "axios";
export default function programs() {
  const t = {};
  t.getPrograms = async () => {
    return axios
      .get("/programs")
      .then(function(response) {
        return response.data;
      })
      .catch(function(err) {
        return Promise.reject(err.response);
      });
  };
  return t;
}
