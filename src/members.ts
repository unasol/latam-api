import axios from "axios";
import { handlerError } from "./helpers/handler_error";
export default function (isDebug: boolean) {
  const t = {
    getMember: (programId: string, docType: string, docValue: string) =>
      axios
        .get(`/programs/${programId}/members?type=${docType}&value=${docValue}`)
        .then(response => response.data)
        .catch(err => Promise.reject(handlerError(err, isDebug))),

    getMemberInfo: (programId: string, memberId: string) =>
      axios
        .get(`/programs/${programId}/members/${memberId}`)
        .then(response => response.data)
        .catch(err => Promise.reject(handlerError(err, isDebug))),

    // create new member
    // http://developers.latam-pass.latam.com/#members
    create: (programId: string, body: any) =>
      axios
        .post(`/programs/${programId}/members`, body)
        .then(response => response.data)
        .catch(err => Promise.reject(handlerError(err, isDebug)))
  }
  return t;
}
