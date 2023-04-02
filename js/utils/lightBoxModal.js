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
	const modal = document.getElementById('lightBox');
	if (!modal) return;

	const imageModal = modal.querySelector('[data-id="lightBoxImage"]');
	const buttonPrev = modal.querySelector('[data-id=lightBox-Prev]');
	const buttonNext = modal.querySelector('[data-id=lightBox-Next]');

	if (!imageModal && !buttonNext && !buttonPrev) return;

	function showImageAtIndex(index, listImage) {
		imageModal.src = listImage[index].src;
	}

	window.addEventListener('click', (e) => {
		const button = e.target;

		if (button.tagName !== 'IMG' || button.dataset.album !== 'lightBox') return;

		showLightBoxModal(modal);
		hideLightBoxModal(modal);

		let listImage = [...document.querySelectorAll('[data-album = lightBox]')];

		let currentIndexImage = listImage.findIndex((image) => image === button);

		showImageAtIndex(currentIndexImage, listImage);

		buttonNext.addEventListener('click', () => {
			currentIndexImage = (currentIndexImage + 1) % listImage.length;
			showImageAtIndex(currentIndexImage, listImage);
		});

		buttonPrev.addEventListener('click', () => {
			currentIndexImage =
				(listImage.length - (currentIndexImage - 1)) % listImage.length;
			showImageAtIndex(currentIndexImage, listImage);
		});
	});
}
