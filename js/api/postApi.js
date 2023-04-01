import axiosClient from './axiosClient';

export const postApi = {
	getAll(params) {
		const url = '/posts';
		return axiosClient.get(url, { params });
	},

	getById(id) {
		const url = `/post/${id}`;
		return axiosClient.get(url);
	},

	addPost(data) {
		const url = '/post';
		return axiosClient.post(url, data);
	},

	updatePost(data) {
		const url = `post/${data.id}`;
		return axiosClient.patch(url, data);
	},
};
