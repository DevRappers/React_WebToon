import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: 10,
		overflowX: 'auto'
	},
	table: {
		minWidth: 1080
	},
	progress: {
		margin: 20
	}
});

function App({ classes }) {
	const [ customers, setCustomers ] = useState();
	const [ completed, setCompleted ] = useState(0);

	const callApi = async () => {
		const response = await axios.get('/api/webtoons');
		setCustomers(response.data);
	};

	const progress = () => {
		setCompleted((prev) => (prev >= 100 ? 0 : prev + 1));
	};

	useEffect(() => {
		setInterval(progress, 20);
		callApi();
	}, []);

	const stateRefresh = () => {
		setCustomers();
		setCompleted(0);
		callApi();
	};

	return (
		<div>
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>번호</TableCell>
							<TableCell>이미지</TableCell>
							<TableCell>제목</TableCell>
							<TableCell>생성일</TableCell>
							<TableCell>장르</TableCell>
							<TableCell>작가명</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{customers ? (
							customers.map((c) => {
								return (
									<Customer
										key={c.id}
										id={c.id}
										image={c.image}
										name={c.name}
										birthday={c.createday}
										gender={c.genre}
										job={c.author}
									/>
								);
							})
						) : (
							<TableRow>
								<TableCell colSpan="6" align="center">
									<CircularProgress
										className={classes.progress}
										variant="determinate"
										value={completed}
									/>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</Paper>
			<CustomerAdd stateRefresh={stateRefresh} />
		</div>
	);
}

export default withStyles(styles)(App);
