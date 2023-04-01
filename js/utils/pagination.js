function createPaginationButton(index, currentPage) {
	const button = document.createElement('li');
	button.setAttribute('class', 'list-post-pagination__item');
	button.setAttribute('data-page', index);

	if (index === currentPage) button.classList.add('disabled');

	const innerButton = document.createElement('a');
	innerButton.setAttribute('href', '#');
	innerButton.textContent = index;

	button.appendChild(innerButton);

	return button;
}

export function renderPagination(idElement, pagination) {
	if (!pagination) return;

	const postPagination = document.getElementById(idElement);

	if (!postPagination) return;

	const _page = pagination._page;
	const _limit = pagination._limit;
	const _totalRows = pagination._totalRows;

	const totalPage = Math.ceil(_totalRows / _limit);

	postPagination.dataset.page = _page;
	postPagination.dataset.totalPage = totalPage;

	const prevElement = postPagination.firstElementChild;
	const nextElement = postPagination.lastElementChild;

	if (_page <= 1) prevElement?.classList.add('disabled');
	else prevElement?.classList.remove('disabled');

	if (_page >= totalPage) nextElement?.classList.add('disabled');
	else nextElement?.classList.remove('disabled');

	// Clear List Button Pagination
	const listButton = postPagination.querySelectorAll('[data-page]');
	if (listButton.length !== 0) {
		listButton.forEach((button) => button.remove());
	}

	for (let index = totalPage; index >= 1; index--) {
		const buttonPagination = createPaginationButton(index, _page);
		postPagination.insertBefore(buttonPagination, postPagination.children[1]);
	}
}

export function initPagination({ idElement, onChange }) {
	const postPagination = document.getElementById(idElement);

	if (!postPagination) return;

	const prevButton = postPagination.firstElementChild;

	prevButton.addEventListener('click', (e) => {
		e.preventDefault();

		const _page = Number.parseFloat(postPagination.dataset.page);

		if (_page <= 1) return;

		onChange(_page - 1);
	});

	const nextButton = postPagination.lastElementChild;
	nextButton.addEventListener('click', (e) => {
		e.preventDefault();

		const _page = Number.parseFloat(postPagination.dataset.page);
		const _totalPage = Number.parseFloat(postPagination.dataset.totalPage);

		if (_page >= _totalPage) return;

		onChange(_page + 1);
	});

	const paginationPageButton = postPagination.querySelectorAll('[data-page]');
	paginationPageButton.forEach((button) => {
		button.addEventListener('click', function (e) {
			e.preventDefault();

			const _page = Number.parseFloat(postPagination.dataset.page);

			const currentPage = Number.parseFloat(this.dataset.page);

			if (_page === currentPage) return;

			onChange(currentPage);
		});
	});
}
