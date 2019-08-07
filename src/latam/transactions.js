import axios from "axios";

export default function(accessToken) {
  const t = {};
  t.show = (programId, memberId, year) =>
    axios
      .get(
        `/programs/${programId}/members/${memberId}/transactions?year=${year}`
      )
      .then(response => response.data)
      .catch(err => Promise.reject(err.response));
  return t;
}
