import React, { useState } from 'react';
import { post } from 'axios';
import useInput from '../hooks/useInput';

function CustomerAdd() {
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
		formData.append('name', name);
		formData.append('createday', createday);
		formData.append('genre', genre);
		formData.append('author', author);
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
		});
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.value);
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<h1>웹툰 추가</h1>
			웹툰 이미지 : <input type="file" name="file" file={file} value={filename} onChange={handleFileChange} />
			웹툰명 : <input type="text" name="name" value={name.value} onChange={name.onChange} />
			생년월일 : <input type="text" name="createday" value={createday.value} onChange={createday.onChange} />
			장르 : <input type="text" name="genre" value={genre.value} onChange={genre.onChange} />
			작가명 : <input type="text" name="author" value={author.value} onChange={author.onChange} />
			<button type="submit">추가하기</button>
		</form>
	);
}

export default CustomerAdd;
