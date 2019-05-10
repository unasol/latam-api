import instance from "./config";

export default function(accessToken) {
  const t = {};
  t.show = (programId, memberId, year) =>
    instance(accessToken)
      .get(
        `/programs/${programId}/members/${memberId}/transactions?year=${year}`
      )
      .then(response => response.data)
      .catch(err => Promise.reject(err.response));
  return t;
}
