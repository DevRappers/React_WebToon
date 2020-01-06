import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

function Customer({ id, image, name, birthday, gender, job, stateRefresh }) {
	return (
		<TableRow>
			<TableCell>{id}</TableCell>
			<TableCell>
				<img src={image} alt="profile" width={60} height={60} />
			</TableCell>
			<TableCell>{name}</TableCell>
			<TableCell>{birthday}</TableCell>
			<TableCell>{gender}</TableCell>
			<TableCell>{job}</TableCell>
			<TableCell>
				<CustomerDelete id={id} stateRefresh={stateRefresh} />
			</TableCell>
		</TableRow>
	);
}
export default Customer;
