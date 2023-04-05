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

	if (_page === 1) {
		const end = _page + 2;

		for (let index = end; index >= _page; index--) {
			const buttonPagination = createPaginationButton(index, _page);
			postPagination.insertBefore(buttonPagination, postPagination.children[1]);
		}

		return;
	}

	if (_page === totalPage) {
		const start = totalPage - 2;

		for (let index = totalPage; index >= start; index--) {
			const buttonPagination = createPaginationButton(index, _page);
			postPagination.insertBefore(buttonPagination, postPagination.children[1]);
		}

		return;
	}

	const start = _page - 1;
	const end = _page + 1;

	for (let index = end; index >= start; index--) {
		const buttonPagination = createPaginationButton(index, _page);
		postPagination.insertBefore(buttonPagination, postPagination.children[1]);
	}
}

let isPagination = false;

export function initPagination({ idElement, defautParams, onChange }) {
	const postPagination = document.getElementById(idElement);

	if (!postPagination) return;

	const prevButton = postPagination.firstElementChild;

	prevButton.addEventListener('click', async (e) => {
		e.preventDefault();

		prevButton.classList.add('disabled');

		if (isPagination) return;
		isPagination = true;

		const _page = Number.parseFloat(postPagination.dataset.page);

		if (_page > 1) await onChange(_page - 1);

		isPagination = false;
	});

	const nextButton = postPagination.lastElementChild;
	nextButton.addEventListener('click', async (e) => {
		e.preventDefault();

		nextButton.classList.add('disabled');

		if (isPagination) return;
		isPagination = true;

		const _page = Number.parseFloat(postPagination.dataset.page);
		const _totalPage = Number.parseFloat(postPagination.dataset.totalPage);

		if (_page < _totalPage) await onChange(_page + 1);

		isPagination = false;
	});

	const paginationPageButton = postPagination.querySelectorAll('[data-page]');
	paginationPageButton.forEach((button) => {
		button.addEventListener('click', async function (e) {
			e.preventDefault();

			this.classList.add('disabled');

			if (isPagination) return;
			isPagination = true;

			const _page = Number.parseFloat(postPagination.dataset.page);

			const currentPage = Number.parseFloat(this.dataset.page);

			if (_page === currentPage) return;

			await onChange(currentPage);
			isPagination = false;
		});
	});
}
