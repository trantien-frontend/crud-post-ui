export function setTextContent(parentElement, selector, text) {
	const element = parentElement.querySelector(selector);
	element.textContent = text;
}

export function setBackground(parentElement, selector, imageUrl) {
	const element = parentElement.querySelector(selector);
	element.style.backgroundImage = `url('${imageUrl}')`;
}

export function trunCase(text) {
	if (typeof text !== 'string' || text.length < 100) return;
	return `${text.slice(0, 100)}…`;
}

export function getOverlayBackground() {
	const overlayBackground = document.querySelector('.overlay');
	return overlayBackground;
}
