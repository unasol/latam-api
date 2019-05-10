import instance from "./config";

export default function(accessToken) {
  const t = {};
  t.create = (programId, memberId, body) =>
    instance(accessToken)
      .post(`/programs/${programId}/members/${memberId}/accrual`, body)
      .then(response => response.data)
      .catch(err => Promise.reject(err.response));
  return t;
}
