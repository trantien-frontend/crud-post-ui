import { postApi } from './api/postApi';
import { initPagination, renderPagination } from './utils/pagination';

import { renderPostList, initSearchPost } from './utils';

async function handleFilterChange(filterName, filterValue) {
	try {
		const url = new URL(window.location);
		const searchParams = url.searchParams;

		if (filterName === 'title_like') searchParams.set('_page', 1);

		searchParams.set(filterName, filterValue);

		history.pushState({}, '', url);

		const { data, pagination } = await postApi.getAll(url.searchParams);

		renderPostList('lastest-post-list', data);
		renderPagination('post-pagination', pagination);

		initPagination({
			idElement: 'post-pagination',
			onChange: (value) => handleFilterChange('_page', value),
		});
	} catch (error) {
		console.log('message', error);
	}
}

(async () => {
	const url = new URL(window.location);

	const searchParams = url.searchParams;

	if (!searchParams.get('_page')) searchParams.set('_page', 1);
	if (!searchParams.get('_limit')) searchParams.set('_limit', 9);

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
		onChange: (value) => handleFilterChange('_page', value),
	});

	initSearchPost({
		idElement: 'search-post',
		defaultParams: searchParams,
		onChange: (value) => {
			handleFilterChange('title_like', value);
		},
	});
})();
