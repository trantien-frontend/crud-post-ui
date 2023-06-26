import { IMAGE_SOURCE } from '../constant/constant.js';
import { randomNumber, setBackground, setInputValue } from './index.js';

import * as yup from 'yup';

function getPostSchema() {
	return yup.object().shape({
		title: yup
			.string()
			.required('Please not empty field')
			.test(
				'Check Value Field equal than more two character',
				'Please at least to words',
				(value) => {
					return (
						value.split(' ').filter((x) => !!x && x.length > 2).length >= 2
					);
				}
			),
		author: yup
			.string()
			.required('Field author is Emty')
			.test('at-least-to-words', 'at least to words', (value) => {
				return value.split(' ').filter((x) => !!x && x.length > 2).length >= 2;
			}),

		'image-source': yup
			.string()
			.oneOf([IMAGE_SOURCE.PICSUM, IMAGE_SOURCE.UPLOAD], 'Please select '),

		imageUrl: yup.string().when('image-source', {
			is: IMAGE_SOURCE.PICSUM,
			then: (value) =>
				value.required('Please random Background').url('Please field is a URL'),
		}),

		image: yup.mixed().when('image-source', {
			is: IMAGE_SOURCE.UPLOAD,
			then: (value) =>
				value
					.test('Check Uploaded Image', 'Please upload image', (file) => {
						return file?.name;
					})
					.test(
						'Check file size max 0.5mb',
						'Please select file <= 0.5mb',
						(file) => {
							const MAX_SIZE = 3 * 1024 * 1024;
							return file.size <= MAX_SIZE;
						}
					),
		}),
	});
}

function showImageSource(form, radioValue) {
	if (!radioValue) return;

	const imagesSource = [...form.querySelectorAll('[data-id=imageSource]')];
	if (imagesSource.length === 0) return;

	imagesSource.forEach((imageSource) => {
		const currentValue = imageSource.dataset.source;
		imageSource.hidden = !Boolean(currentValue === radioValue);
	});
}

function randomImage(form) {
	const buttonRandomImage = form.querySelector('#postForm-ChangeImage');
	if (!buttonRandomImage) return;

	buttonRandomImage.addEventListener('click', () => {
		const number = randomNumber(1000);
		const imageUrl = `https://picsum.photos/id/${number}/1368/400`;

		setInputValue(form, '#postForm-imageUrl', imageUrl);
		setBackground(document, '#postHeroImage', imageUrl);
	});
}

function initImageSource(form) {
	const listRadio = [...form.querySelectorAll('[name=image-source]')];
	if (listRadio.length === 0) return;

	listRadio.forEach((radioInput) => {
		radioInput.addEventListener('change', function () {
			showImageSource(form, this.value);
		});
	});
}

function getFormData(form) {
	const formData = new FormData(form);
	const formValue = {};

	for (const [key, value] of formData) {
		formValue[key] = value;
	}

	return formValue;
}

function setFieldError(form, name, errorMessage) {
	const inputField = form.querySelector(`input[name=${name}]`);
	if (!inputField) return;

	inputField.setCustomValidity(errorMessage);
	const invalid = inputField.parentElement.querySelector('.invalid-feedback');
	invalid.textContent = errorMessage;
}

async function validatePostForm(form, formData) {
	if (!formData) return;

	try {
		// reset Error
		const listFieldForm = ['title', 'author', 'imageUrl', 'image'];
		listFieldForm.forEach((filed) => {
			setFieldError(form, filed, '');
		});

		const schema = getPostSchema();

		await schema.validate(formData, { abortEarly: false });
	} catch (error) {
		const errors = {};

		if ((error.name = 'ValidationError' && Array.isArray(error.inner))) {
			for (const validationError of error.inner) {
				const name = validationError.path;

				if (errors[name]) continue;

				errors[name] = validationError.message;
				setFieldError(form, name, errors[name]);
			}
		}
	}

	// validate
	const isValidate = form.checkValidity();
	if (!isValidate) form.classList.add('was-validated');
	return isValidate;
}

async function validateFiledForm(form, fieldValue, fieldName) {
	try {
		const listFieldForm = ['title', 'author'];
		listFieldForm.forEach((filed) => {
			setFieldError(form, filed, '');
		});

		const schema = getPostSchema();

		await schema.validateAt(fieldName, fieldValue);
	} catch (error) {
		const message = error.message;
		setFieldError(form, fieldName, message);
	}

	const inputCurrent = form.querySelector(`input[name = ${fieldName}]`);
	if (inputCurrent) {
		const formGroup = inputCurrent.parentElement;
		formGroup.classList.add('was-validated');
	}
}

function initChangefield(form) {
	const listField = ['title', 'author'];

	listField.forEach((fieldName) => {
		const inputField = form.querySelector(`input[name=${fieldName}]`);
		if (inputField) {
			inputField.addEventListener('input', function (e) {
				validateFiledForm(form, { [fieldName]: e.target.value }, fieldName);
			});
		}
	});
}

function initChangeUpload(form) {
	const inputFile = form.querySelector('input[name=image]');
	if (!inputFile) return;

	inputFile.addEventListener('change', (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const creatUrlImage = URL.createObjectURL(file);
		setBackground(document, '#postHeroImage', creatUrlImage);

		validateFiledForm(
			form,
			{
				'image-source': IMAGE_SOURCE.UPLOAD,
				image: file,
			},
			'image'
		);
	});
}

function showButtonLoading(form) {
	const buttonSubmit = form.querySelector('[data-id=postForm-submit]');
	if (!buttonSubmit) return;

	buttonSubmit.disabled = true;
	buttonSubmit.textContent = 'Saving...';
}

function hideButtonLoading(form) {
	const buttonSubmit = form.querySelector('[data-id=postForm-submit]');
	if (!buttonSubmit) return;

	buttonSubmit.disabled = false;
	buttonSubmit.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save';
}

let isSubmiting = false;

export function initPostForm({ idForm, defaultParam, onSubmit }) {
	if (!defaultParam) return;

	const form = document.getElementById(idForm);
	if (!form) return;

	const heroImage = document.getElementById('postHeroImage');

	if (heroImage) {
		heroImage.src = defaultParam.imageUrl;
		heroImage.addEventListener('error', function () {
			const URL_IMAGE = 'https://picsum.photos/id/345/5000/3333';
			this.url = this.url;
		});
	}

	setInputValue(form, '#postForm-title', defaultParam.title);
	setInputValue(form, '#postForm-author', defaultParam.author);
	setInputValue(form, '#postForm-description', defaultParam.description);
	setInputValue(form, '#postForm-imageUrl', defaultParam.imageUrl);

	initImageSource(form);
	randomImage(form);
	initChangefield(form);
	initChangeUpload(form);

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		showButtonLoading(form);
		if (isSubmiting) return;
		isSubmiting = true;

		const formData = getFormData(form);
		formData.id = defaultParam.id;

		const isValidateForm = await validatePostForm(form, formData);

		if (isValidateForm) {
			await onSubmit(formData);
			console.log(isValidateForm);
		}

		isSubmiting = false;
		hideButtonLoading(form);
	});
}
