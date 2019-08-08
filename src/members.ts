import axios from "axios";
export default function () {
  const t = {
    getMember: (programId: string, docType: string, docValue: string) =>
      axios
        .get(`/programs/${programId}/members?type=${docType}&value=${docValue}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.response)),

    getMemberInfo: (programId: string, memberId: string) =>
      axios
        .get(`/programs/${programId}/members/${memberId}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.response)),

    // create new member
    // http://developers.latam-pass.latam.com/#members
    create: (programId: string, body: any) =>
      axios
        .post(`/programs/${programId}/members`, body)
        .then(response => response.data)
        .catch(err => Promise.reject(err.response))
  }
  return t;
}
