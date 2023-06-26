import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export const toastify = {
	success(message) {
		Toastify({
			text: message,
			duration: 3000,
			newWindow: true,
			close: true,
			gravity: 'top', // `top` or `bottom`
			position: 'right', // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			style: {
				background: '#198754',
			},
		}).showToast();
	},
	error(message) {
		Toastify({
			text: message,
			duration: 3000,
			newWindow: true,
			close: true,
			gravity: 'top', // `top` or `bottom`
			position: 'right', // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			style: {
				background: '#dc3545',
			},
		}).showToast();
	},
};
