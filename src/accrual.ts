import { handlerError } from "./helpers/handler_error";

import axios from "axios";
export default function (isDebug: boolean) {
  const t = {
    create: (programId: string, memberId: string, body: any) =>
      axios
        .post(`/programs/${programId}/members/${memberId}/accrual`, body)
        .then(response => response.data)
        .catch(err => Promise.reject(handlerError(err, isDebug)))
  };
  return t;
}
