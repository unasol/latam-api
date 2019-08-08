import axios from "axios";
export default function () {
  const t = {
    create: (programId: string, memberId: string, body: any) =>
      axios
        .post(`/programs/${programId}/members/${memberId}/accrual`, body)
        .then(response => response.data)
        .catch(err => Promise.reject(err.response))
  };
  return t;
}
