import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export const splideSlide = {
	default(selector) {
		new Splide(`.${selector}`, {
			type: 'loop',
		}).mount();
	},
};
