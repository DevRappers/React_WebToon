import React, { useState } from 'react';
import { post } from 'axios';
import useInput from '../hooks/useInput';

function CustomerAdd({ stateRefresh }) {
	const [ file, setFile ] = useState(null);
	const [ filename, setFilename ] = useState('');
	const name = useInput('');
	const createday = useInput('');
	const genre = useInput('');
	const author = useInput('');

	const addCustomer = () => {
		const url = '/api/webtoons';
		const formData = new FormData();
		formData.append('image', file);
		formData.append('name', name.value);
		formData.append('createday', createday.value);
		formData.append('genre', genre.value);
		formData.append('author', author.value);
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		};
		return post(url, formData, config);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		addCustomer().then((response) => {
			console.log(response.data);
			stateRefresh();
		});
		setFile(null);
		setFilename('');
		name.setValue('');
		createday.setValue('');
		genre.setValue('');
		author.setValue('');
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.value);
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<h1>웹툰 추가</h1>
			웹툰 이미지 : <input type="file" name="file" file={file} value={filename} onChange={handleFileChange} />
			<br />
			웹툰명 : <input type="text" name="name" value={name.value} onChange={name.onChange} />
			<br />
			게시일 : <input type="text" name="createday" value={createday.value} onChange={createday.onChange} />
			<br />
			장르 : <input type="text" name="genre" value={genre.value} onChange={genre.onChange} />
			<br />
			작가명 : <input type="text" name="author" value={author.value} onChange={author.onChange} />
			<br />
			<button type="submit">추가하기</button>
		</form>
	);
}

export default CustomerAdd;
