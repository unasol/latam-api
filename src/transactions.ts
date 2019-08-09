import axios from "axios";
import { handlerError } from "./helpers/handler_error";

export default function (isDebug: boolean) {
  const t = {
    show: (programId: string, memberId: string, year: string) =>
      axios
        .get(
          `/programs/${programId}/members/${memberId}/transactions?year=${year}`
        )
        .then(response => response.data)
        .catch(err => Promise.reject(handlerError(err, isDebug)))
  }
  return t;
}
