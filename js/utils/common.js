export function setTextContent(parentElement, selector, text) {
	const element = parentElement.querySelector(selector);
	element.textContent = text;
}

export function setBackground(parentElement, selector, imageUrl) {
	const element = parentElement.querySelector(selector);
	element.src = imageUrl;
}

export function trunCase(text) {
	if (typeof text !== 'string' || text.length < 100) return text;
	return `${text.slice(0, 100)}…`;
}

export function getOverlayBackground() {
	const overlayBackground = document.querySelector('.overlay');
	return overlayBackground;
}

export function setInputValue(parentElement, selector, valueInput) {
	const element = parentElement.querySelector(selector);
	element.value = valueInput;
}

export function randomNumber(number) {
	if (!Number.isFinite(number)) return;
	return Math.floor(Math.random() * number);
}
