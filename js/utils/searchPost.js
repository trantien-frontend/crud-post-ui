function debounce(callback, duration) {
	let idTimeOut = null;

	return function (filterValue) {
		if (idTimeOut) {
			clearTimeout(idTimeOut);
		}

		idTimeOut = setTimeout(() => {
			callback(filterValue);
		}, duration);
	};
}

export function initSearchPost({ idElement, defaultParams, onChange }) {
	const inputSearch = document.getElementById(idElement);

	if (!inputSearch) return;

	if (defaultParams && defaultParams.get('title_like')) {
		const defaultValue = defaultParams.get('title_like');
		inputSearch.value = defaultValue;
		onChange(defaultValue);
	}

	const debouceSearch = debounce(onChange, 500);

	inputSearch.addEventListener('input', (e) => {
		const value = e.target.value;
		debouceSearch(value);
	});
}
