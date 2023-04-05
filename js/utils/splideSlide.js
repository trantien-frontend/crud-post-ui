import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

const splideSlide = {
	default(selector) {
		new Splide(`.${selector}`, {
			type: 'loop',
		}).mount();
	},
};

export default splideSlide;
