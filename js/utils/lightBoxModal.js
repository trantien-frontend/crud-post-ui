import { getOverlayBackground } from './common';

function showLightBoxModal(modal) {
	if (!modal) return;

	modal.classList.add('show-modal');
	const overlay = getOverlayBackground();
	overlay.classList.add('show-overlay');
}

function hideLightBoxModal(modal) {
	if (!modal) return;

	const buttonHideModal = getOverlayBackground();
	buttonHideModal.addEventListener('click', () => {
		modal.classList.remove('show-modal');
		buttonHideModal.classList.remove('show-overlay');
	});
}

export function lightBox({
	idModal,
	dataIdBoxImage,
	dataIdButtonPrev,
	dataIdButtonNext,
}) {
	const modal = document.getElementById(idModal);
	if (!modal) return;

	const imageModal = modal.querySelector(dataIdBoxImage);
	const buttonPrev = modal.querySelector(dataIdButtonPrev);
	const buttonNext = modal.querySelector(dataIdButtonNext);

	if (!imageModal && !buttonNext && !buttonPrev) return;

	let currentIndex = 0;
	let listImage = [];

	function showImageAtIndex(index) {
		imageModal.src = listImage[index].src;
	}

	window.addEventListener('click', (e) => {
		const button = e.target;

		if (button.tagName !== 'IMG' || button.dataset.album !== 'lightBox') return;

		showLightBoxModal(modal);
		hideLightBoxModal(modal);

		listImage = [...document.querySelectorAll('[data-album = lightBox]')];
		currentIndex = listImage.findIndex((image) => image === button);

		showImageAtIndex(currentIndex);
	});

	buttonNext.addEventListener('click', () => {
		currentIndex = (currentIndex + 1) % listImage.length;
		showImageAtIndex(currentIndex);
	});

	buttonPrev.addEventListener('click', () => {
		currentIndex = (listImage.length - (currentIndex - 1)) % listImage.length;
		showImageAtIndex(currentIndex);
	});
}
