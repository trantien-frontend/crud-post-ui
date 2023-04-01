export function setTextContent(parentElement, selector, text) {
	const element = parentElement.querySelector(selector);
	element.textContent = text;
}

export function setImageSource(parentElement, selector, imageUrl) {
	const element = parentElement.querySelector(selector);
	element.src = imageUrl;
}

export function trunCase(text) {
	if (typeof text !== 'string' || text.length < 100) return;
	return `${text.slice(0, 100)}…`;
}
