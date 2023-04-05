import { initPostForm } from './utils/post-form';
import { postApi } from './api/postApi';
import { IMAGE_SOURCE } from './constant/constant';
import toastify from './utils/toastify';

function removeUneseFiels(formData) {
	const payload = { ...formData };
	if (payload['image-source'] === IMAGE_SOURCE.PICSUM) {
		delete payload.image;
	} else {
		delete payload.imageUrl;
	}

	delete payload['image-source'];

	if (!payload.id) delete payload.id;

	return payload;
}

function jsonToFormData(jsonObject) {
	const formData = new FormData();

	for (const key in jsonObject) {
		formData.set(key, jsonObject[key]);
	}

	return formData;
}

async function handelSubmitForm(formValues) {
	try {
		const payload = removeUneseFiels(formValues);
		const formData = jsonToFormData(payload);

		const currentData = formValues.id
			? await postApi.updateFormData(formData)
			: await postApi.addFormData(formData);

		toastify.success('Save post Successfully!');
		setTimeout(() => {
			window.location.assign(`detail-post.html?id=${currentData.id}`);
		}, 2000);
	} catch (erorr) {
		toastify.error(`Error: ${erorr.message}`);
	}
}

(async () => {
	try {
		const url = new URL(window.location);

		const searchParams = url.searchParams;

		const postId = searchParams.get('id');

		const defaultParam = postId
			? await postApi.getById(postId)
			: {
					title: '',
					author: '',
					description: '',
					imageUrl: '',
			  };

		initPostForm({
			idForm: 'postForm',
			defaultParam,
			onSubmit: async (formData) => {
				await handelSubmitForm(formData);
			},
		});
	} catch (error) {
		console.log('Error Message: ', error);
	}
})();
