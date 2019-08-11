import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Home from '../src/app/views/home';
import Form from '../src/app/views/form';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		backgroundColor: '#f5fcff',
	},
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	fab: {
		position: 'absolute',
		right: 30,
		bottom: 30,
	},
}));

function AppRouter () {
	const classes = useStyles();
	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline />
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />
					<Container maxWidth='lg' className={classes.container}>
						<Route path='/' exact component={Home} />
						<Route path='/add/' component={Form} />
					</Container>
				</main>
			</div>
		</Router>
	);
}

export default AppRouter;
