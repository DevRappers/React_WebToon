import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function CustomerDelete({ stateRefresh, id }) {
	const [ open, setOpen ] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickClose = () => {
		setOpen(false);
	};

	const deleteWebtoon = (id) => {
		const url = '/api/webtoons/' + id;
		fetch(url, {
			method: 'DELETE'
		});
		stateRefresh();
	};
	return (
		<div>
			<Button variant="contained" color="secondary" onClick={handleClickOpen}>
				삭제
			</Button>
			<Dialog open={open} onClose={handleClickClose}>
				<DialogTitle onClose={handleClickClose}>삭제 경고</DialogTitle>
				<DialogContent>
					<Typography gutterBottom>선택한 웹툰 정보가 삭제됩니다.</Typography>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="primary" onClick={() => deleteWebtoon(id)}>
						삭제
					</Button>
					<Button variant="outlined" color="primary" onClick={handleClickClose}>
						닫기
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default CustomerDelete;
