import axios from "axios";
export default function() {
  const t = {};
  t.create = (programId, memberId, body) =>
    axios
      .post(`/programs/${programId}/members/${memberId}/accrual`, body)
      .then(response => response.data)
      .catch(err => Promise.reject(err.response));
  return t;
}
