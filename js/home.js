import { postApi } from './api/postApi';

import {
	initPagination,
	renderPagination,
	initSearchPost,
	renderPostList,
	hideLoading,
	toastify,
	splideSlide,
} from './utils';

async function handleFilterChange(filterName, filterValue) {
	try {
		const url = new URL(window.location);
		const searchParams = url.searchParams;

		if (filterName === 'title_like') searchParams.set('_page', 1);

		if (filterName) searchParams.set(filterName, filterValue);

		history.pushState({}, '', url);

		const { data, pagination } = await postApi.getAll(url.searchParams);

		renderPostList('lastest-post-list', data);
		renderPagination('post-pagination', pagination);

		initPagination({
			idElement: 'post-pagination',
			onChange: (value) => handleFilterChange('_page', value),
		});
	} catch (error) {
		toastify.error(`${error}`);
	}
}

async function initRemovePost() {
	try {
		document.addEventListener('post-remove', async (e) => {
			const detail = e.detail;
			const post = detail.post;

			await postApi.remove(post.id);
			await handleFilterChange();

			detail.modal.classList.remove('show');
			detail.overlay.classList.remove('show-overlay');

			toastify.success('Delete post success');
		});
	} catch (error) {
		toastify.error(`${error}`);
	}
}

function initSlider() {
	splideSlide.default('splide');
}

(async () => {
	initSlider();

	const url = new URL(window.location);

	const searchParams = url.searchParams;

	if (!searchParams.get('_page')) searchParams.set('_page', 1);
	if (!searchParams.get('_limit')) searchParams.set('_limit', 6);

	const params = {
		_page: searchParams.get('_page'),
		_limit: searchParams.get('_limit'),
	};

	history.pushState({}, '', url);

	const { data, pagination } = await postApi.getAll(params);

	renderPostList('lastest-post-list', data);
	renderPagination('post-pagination', pagination);

	initPagination({
		idElement: 'post-pagination',
		defaultParams: searchParams,
		onChange: (value) => handleFilterChange('_page', value),
	});

	initSearchPost({
		idElement: 'search-post',
		defaultParams: searchParams,
		onChange: (value) => {
			handleFilterChange('title_like', value);
		},
	});

	initRemovePost();
	hideLoading();
})();
