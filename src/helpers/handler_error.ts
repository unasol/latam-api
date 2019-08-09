export const handlerError = (error: any, isdebug: boolean) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (isdebug) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        return error.response;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        if (isdebug)
            console.log(error.request);
        return error.request;
    } else {
        // Something happened in setting up the request that triggered an Error
        if (isdebug)
            console.log('Error', error.message);
        return error.message;
    }
}