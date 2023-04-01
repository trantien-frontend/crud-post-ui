import dayjs from 'dayjs';
import { setTextContent, trunCase } from './common';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function createPostItem(postItem) {
	const postCardElement = document
		.getElementById('postItemTemplate')
		.content.cloneNode(true);

	if (!postCardElement) return;

	const URL_IMAGE = 'https://picsum.photos/id/345/5000/3333';

	const image = postCardElement.querySelector('[data-id="thumbnail"]');

	if (image) {
		image.src = postItem.imageUrl;
		image.addEventListener('error', function () {
			this.src = URL_IMAGE;
		});
	}

	setTextContent(postCardElement, '[data-id="title"]', postItem.title);

	setTextContent(
		postCardElement,
		'[data-id="description"]',
		postItem.descripton
	);

	setTextContent(
		postCardElement,
		'[data-id="author"]',
		`${postItem.author} - `
	);

	setTextContent(
		postCardElement,
		'[data-id="description"]',
		`${trunCase(postItem.description)}`
	);

	setTextContent(
		postCardElement,
		'[data-id="timeSpan"]',
		dayjs(postItem.updatedAt).fromNow()
	);

	// event

	const postCard = postCardElement.querySelector('.card');
	postCard.dataset.id = postItem.id;

	postCard.addEventListener('click', () => {
		window.location.assign(`detail-post.html?id=${postCard.dataset.id}`);
	});

	return postCardElement;
}

export function renderPostList(idSection, postList) {
	if (!Array.isArray(postList) && postList.length === 0) return;

	const lastestElement = document.getElementById(idSection);
	if (!lastestElement) return;

	lastestElement.textContent = '';

	postList.forEach((postItem) => {
		const postCard = createPostItem(postItem);
		lastestElement.appendChild(postCard);
	});
}
