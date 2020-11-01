import { toastError } from './toaster.js'

export const handleError = (err) => {
    if (err.response) {
        toastError(err.response.data.message);
    } else if (err.request) {
        toastError('Ooops, something went wrong!');
    } else {
        toastError('Ooops, something went wrong!');
    }
}
