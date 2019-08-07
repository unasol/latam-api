import axios from "axios";
export default function() {
  const t = {};
  t.getMember = (programId, docType, docValue) =>
    axios
      .get(`/programs/${programId}/members?type=${docType}&value=${docValue}`)
      .then(response => response.data)
      .catch(err => Promise.reject(err.response));

  t.getMemberInfo = (programId, memberId) =>
    axios
      .get(`/programs/${programId}/members/${memberId}`)
      .then(response => response.data)
      .catch(err => Promise.reject(err.response));

  // create new member
  // http://developers.latam-pass.latam.com/#members
  t.create = (programId, body) =>
    axios
      .post(`/programs/${programId}/members`, body)
      .then(response => response.data)
      .catch(err => Promise.reject(err.response));
  return t;
}
