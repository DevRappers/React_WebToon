import React from 'react';

function CustomerDelete({ stateRefresh, id }) {
	const deleteWebtoon = (id) => {
		const url = '/api/webtoons/' + id;
		fetch(url, {
			method: 'DELETE'
		});
		stateRefresh();
	};
	return (
		<button
			onClick={(e) => {
				deleteWebtoon(id);
			}}
		>
			삭제
		</button>
	);
}

export default CustomerDelete;
