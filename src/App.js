import React from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/styles';

const customers = [
	{
		id: 1,
		image: 'https://placeimg.com/64/64/1',
		name: '이재준',
		birthday: '980326',
		gender: '남자',
		job: 'developer'
	},
	{
		id: 2,
		image: 'https://placeimg.com/64/64/2',
		name: '테스트유저',
		birthday: '910208',
		gender: '여자',
		job: '디자이너'
	},
	{
		id: 3,
		image: 'https://placeimg.com/64/64/3',
		name: '이재영',
		birthday: '950815',
		gender: '남자',
		job: '직장인'
	}
];

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: 10,
		overflowX: 'auto'
	},
	table: {
		minWidth: 1080
	}
});

function App({ classes }) {
	return (
		<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>번호</TableCell>
						<TableCell>이미지</TableCell>
						<TableCell>이름</TableCell>
						<TableCell>생년월일</TableCell>
						<TableCell>성별</TableCell>
						<TableCell>직업</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{customers.map((c) => {
						return (
							<Customer
								key={c.id}
								id={c.id}
								image={c.image}
								name={c.name}
								birthday={c.name}
								gender={c.gender}
								job={c.job}
							/>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}

export default withStyles(styles)(App);
