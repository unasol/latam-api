import instance from "./config";

export default function(accessToken) {
  const t = {};
  t.getMember = (programId, docType, docValue) =>
    instance(accessToken)
      .get(`/programs/${programId}/members?type=${docType}&value=${docValue}`)
      .then(response => response.data)
      .catch(err => Promise.reject(err.response));

  t.getMemberInfo = (programId, memberId) =>
    instance(accessToken)
      .get(`/programs/${programId}/members/${memberId}`)
      .then(response => response.data)
      .catch(err => Promise.reject(err.response));
  return t;
}
