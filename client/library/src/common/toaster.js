import { toast } from 'react-toastify';

const toastError = (message) => {
	toast.error(message, {
		position: 'top-right',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};

export { toastError };
