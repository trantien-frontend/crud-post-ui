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

	const menuButton = postCardElement.querySelector('[data-id=menu]');

	postCard.addEventListener('click', (e) => {
		const target = e.target;
		if (menuButton && menuButton.contains(target)) return;
		window.location.assign(`detail-post.html?id=${postCard.dataset.id}`);
	});

	const editButton = postCard.querySelector('[data-id=edit]');
	if (editButton) {
		editButton.addEventListener('click', () => {
			window.location.assign(`add-edit-post.html?id=${postCard.dataset.id}`);
		});
	}

	const removeButton = postCard.querySelector('[data-id=remove]');

	if (removeButton) {
		removeButton.addEventListener('click', () => {
			showDeleteModal(postItem);
		});
	}

	return postCardElement;
}

function showDeleteModal(post) {
	const modal = document.querySelector('.delete-modal');
	const overlayBackground = document.querySelector('.overlay');

	if (!modal && !overlayBackground) return;

	modal.classList.add('show');
	overlayBackground.classList.add('show-overlay');

	const buttonConfirmDelete = modal.querySelector('[data-id=confirmDelete]');
	if (buttonConfirmDelete) {
		buttonConfirmDelete.addEventListener('click', function () {
			dispatchDeletePost(this, post, modal);
		});
	}

	const listButtonCloseModal = modal.querySelectorAll('[data-id=closeModal]');
	listButtonCloseModal.forEach((button) => {
		button.addEventListener('click', () => hideModal(modal, overlayBackground));
	});
}

function dispatchDeletePost(element, post, modal) {
	const customeEvent = new CustomEvent('post-remove', {
		bubbles: true,
		detail: {
			post,
			modal,
			overlay: document.querySelector('.overlay'),
		},
	});

	element.dispatchEvent(customeEvent);
}
function hideModal(modal, overlay) {
	modal.classList.remove('show');
	overlay.classList.remove('show-overlay');
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
