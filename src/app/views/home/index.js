import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Car from '../../widgets/Car';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'absolute',
		right: 30,
		bottom: 30,
	},
}));

export default function Dashboard () {
	const classes = useStyles();
	const [ cars, setCars ] = useState([]);

	async function getCars () {
		const cars = await axios.get('http://localhost:5000/car');
		setCars(cars.data.response);
	}

	async function queryCars (event) {
		const terms = event.target.value;
		const cars = await axios.get(`http://localhost:5000/car/${terms}`);
		setCars(cars.data.response);
	}

	async function retirar (data) {
		await axios.get(`http://localhost:5000/car/retire/${data._id}`);
		alert('El vehiculo ha sido retirado del parqueadero');
		getCars();
	}

	async function cancel (data) {
		await axios.get(`http://localhost:5000/car/delete/${data._id}`);
		alert('El registro ha sido eliminado');
		getCars();
	}

	useEffect(() => {
		getCars();
	}, []);

	return (
		<div>
			<Grid item xs={12}>
				<TextField
					id='standard-full-width'
					label='Buscar'
					style={{ margin: 8 }}
					placeholder='Escribe una placa Por ej. ABC123'
					fullWidth
					onChange={(event) => queryCars(event)}
					margin='normal'
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</Grid>
			<Grid container spacing={3}>
				{cars.length === 0 && <h5>No existe ningùn registro</h5>}
				{cars.map((car, index) => {
					return (
						<Grid key={index} item xs={12} md={4} lg={3}>
							<Car data={car} retirar={() => retirar(car)} cancel={() => cancel(car)} />
						</Grid>
					);
				})}
			</Grid>
			<Fab
				color='primary'
				variant='extended'
				aria-label='add'
				className={classes.fab}
				onClick={() => (window.location.href = '/add')}
			>
				<AddIcon />
				INGRESAR
			</Fab>
		</div>
	);
}
