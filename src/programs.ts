import axios from "axios";
import { handlerError } from "./helpers/handler_error";
export default function programs(isDebug: boolean) {
    const t = {
        getPrograms: async () => {
            return axios
                .get("/programs")
                .then(function (response) {
                    return response.data;
                })
                .catch(err => Promise.reject(handlerError(err, isDebug)));
        }
    };

    return t;
}
