import axios from "axios";

export default function () {
  const t = {
    show: (programId: string, memberId: string, year: string) =>
      axios
        .get(
          `/programs/${programId}/members/${memberId}/transactions?year=${year}`
        )
        .then(response => response.data)
        .catch(err => Promise.reject(err.response))
  }
  return t;
}
