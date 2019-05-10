import instance from "./config";
export default function programs(accessToken) {
  const t = {};
  t.getPrograms = async () => {
    return instance(accessToken)
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
