import React, { useState } from 'react';
import { post } from 'axios';
import useInput from '../hooks/useInput';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	hidden: {
		display: 'none'
	}
});

function CustomerAdd({ stateRefresh, classes }) {
	const [ open, setOpen ] = useState(false);
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

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickClose = () => {
		setOpen(false);
		setFile(null);
		setFilename('');
		name.setValue('');
		createday.setValue('');
		genre.setValue('');
		author.setValue('');
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
		setOpen(false);
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		setFilename(e.target.value);
	};

	return (
		<div>
			<Button variant="contained" color="primary" onClick={handleClickOpen}>
				웹툰 추가하기
			</Button>
			<Dialog open={open} onClose={handleClickClose}>
				<DialogTitle>웹툰추가</DialogTitle>
				<DialogContent>
					<input
						className={classes.hidden}
						accept="image/*"
						id="raised-button-file"
						type="file"
						file={file}
						value={filename}
						onChange={handleFileChange}
					/>
					<label htmlFor="raised-button-file">
						<Button varient="contained" color="primary" component="span" name="file">
							{filename === '' ? '웹툰 이미지 선택' : filename}
						</Button>
					</label>
					<br />
					<TextField label="이름" type="text" name="name" value={name.value} onChange={name.onChange} />
					<br />
					<TextField
						label="시작일"
						type="text"
						name="createday"
						value={createday.value}
						onChange={createday.onChange}
					/>
					<br />
					<TextField label="장르" type="text" name="genre" value={genre.value} onChange={genre.onChange} />
					<br />
					<TextField label="작가명" type="text" name="author" value={author.value} onChange={author.onChange} />
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="primary" onClick={handleFormSubmit}>
						추가
					</Button>
					<Button variant="outlined" color="primary" onClick={handleClickClose}>
						닫기
					</Button>
				</DialogActions>
			</Dialog>
		</div>
		// <form onSubmit={handleFormSubmit}>
		// 	<h1>웹툰 추가</h1>
		// 	웹툰 이미지 : <input type="file" name="file" file={file} value={filename} onChange={handleFileChange} />
		// 	<br />
		// 	웹툰명 : <input type="text" name="name" value={name.value} onChange={name.onChange} />
		// 	<br />
		// 	게시일 : <input type="text" name="createday" value={createday.value} onChange={createday.onChange} />
		// 	<br />
		// 	장르 : <input type="text" name="genre" value={genre.value} onChange={genre.onChange} />
		// 	<br />
		// 	작가명 : <input type="text" name="author" value={author.value} onChange={author.onChange} />
		// 	<br />
		// 	<button type="submit">추가하기</button>
		// </form>
	);
}

export default withStyles(styles)(CustomerAdd);
