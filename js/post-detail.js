import { postApi } from './api/postApi';
import { lightBox, setTextContent } from './utils';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function renderPostDetail(post) {
	if (!post) return;

	const postDetail = document.getElementById('postDetail');
	if (!postDetail) return;

	const heroImage = document.getElementById('postHeroImage');

	if (heroImage) {
		heroImage.src = post.imageUrl;

		heroImage.addEventListener('error', (e) => {
			const URL_IMAGE = 'https://picsum.photos/id/345/5000/3333';
			heroImage.src = URL_IMAGE;
		});
	}

	setTextContent(postDetail, '#post-detail-title', post.title);
	setTextContent(postDetail, '#post-detail-author', `${post.author} - `);
	setTextContent(
		postDetail,
		'#post-detail-timeSpan',
		`${dayjs(post.updatedAt).format('DD/MM/YYYY')}`
	);
	setTextContent(postDetail, '#post-detail-dsc', post.description);

	const editPost = document.getElementById('redirectEditPage');

	if (editPost) {
		editPost.innerHTML =
			' <i class="fa-solid fa-pen-to-square"></i>  Edit Post';

		editPost.href = `add-edit-post.html?id=${post.id}`;
	}
}

(async () => {
	try {
		const url = new URL(window.location);

		const searchParams = url.searchParams;

		if (!searchParams.get('id')) alert('not found');

		const idPost = searchParams.get('id');

		const post = await postApi.getById(idPost);

		lightBox({
			idModal: 'lightBox',
			dataIdBoxImage: '[data-id=lightBoxImage]',
			dataIdButtonPrev: '[data-id=lightBox-Prev]',
			dataIdButtonNext: '[data-id=lightBox-Next]',
		});

		renderPostDetail(post);
	} catch (error) {
		console.log('message: ', error);
	}
})();

/**
 * Next :
 * index : 0 - 1
 * Button : 1 - 2
 *
 * 0 : index : 0 + 1 % 2 = 1;
 * 1 : index : 1 + 1 % 2 = 0;
 *
 * prev :
 * 0: 2 - (0-1) % 2 =  1
 * 1:  2 - (1 - 1) % 2 = 0

 */
