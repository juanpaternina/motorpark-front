import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'absolute',
		right: 30,
		bottom: 30,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	button: {
		marginRight: theme.spacing(1),
	},
}));

const type = [
	{
		value: 'Carro',
		label: 'Carro',
	},
	{
		value: 'Moto',
		label: 'Moto',
	},
	{
		value: 'Camion',
		label: 'Camion',
	},
];

const models = [
	{
		value: 'Mazda',
		label: 'Mazda',
	},
	{
		value: 'Chevrolet',
		label: 'Chevrolet',
	},
	{
		value: 'Audi',
		label: 'Audi',
	},
	{
		value: 'BMW',
		label: 'BMW',
	},
];

export default function Dashboard () {
	const classes = useStyles();

	const [ values, setValues ] = React.useState({
		plate: '',
		userId: '',
		userFullName: '',
		vehicleType: '',
		vehicleBrand: '',
		vehicleModel: '',
		location: '',
	});

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const resetForm = () => {
		setValues({
			plate: '',
			userId: '',
			userFullName: '',
			vehicleType: '',
			vehicleBrand: '',
			vehicleModel: '',
			location: '',
		});
	};

	const save = async () => {
		let error = false;
		for (var property in values) {
			if (values.hasOwnProperty(property)) {
				if (values[property] === '') {
					error = true;
				}
			}
		}

		if (!error) {
			const response = await axios.post('http://localhost:5000/car', values);
			console.log(response);
			alert('El vehiculo ha sido ingresado correctamente');
			window.location.href = '/';
		}
		else {
			alert('Debes ingresar todos los datos para continuar');
		}
	};

	return (
		<div>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<form className={classes.container} noValidate autoComplete='off'>
						<TextField
							id='standard-name'
							label='Placa'
							className={classes.textField}
							value={values.plate}
							onChange={handleChange('plate')}
							margin='normal'
						/>
						<TextField
							id='standard-name'
							label='Cédula del Propietario'
							className={classes.textField}
							value={values.userId}
							onChange={handleChange('userId')}
							margin='normal'
						/>
						<TextField
							id='standard-name'
							label='Nombre del Propietario'
							className={classes.textField}
							value={values.userFullName}
							onChange={handleChange('userFullName')}
							margin='normal'
						/>
						<TextField
							id='standard-name'
							value={values.location}
							onChange={handleChange('location')}
							label='Ubicación'
							className={classes.textField}
							margin='normal'
						/>
						<TextField
							id='standard-select-currency'
							select
							label='Tipo de vehiculo'
							value={values.vehicleType}
							onChange={handleChange('vehicleType')}
							className={classes.textField}
							SelectProps={{
								MenuProps: {
									className: classes.menu,
								},
							}}
							margin='normal'
						>
							{type.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							id='standard-select-currency'
							select
							label='Marca del vehiculo'
							value={values.vehicleBrand}
							onChange={handleChange('vehicleBrand')}
							className={classes.textField}
							SelectProps={{
								MenuProps: {
									className: classes.menu,
								},
							}}
							margin='normal'
						>
							{models.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>

						<TextField
							id='standard-name'
							value={values.vehicleModel}
							onChange={handleChange('vehicleModel')}
							label='Módelo del vehiculo'
							className={classes.textField}
							margin='normal'
						/>
						{/* <label htmlFor='contained-button-file'>
							<Button
								variant='contained'
								style={{ marginTop: 25 }}
								color='secondary'
								component='span'
								className={classes.button}
							>
								FOTO DEL VEHICULO
							</Button>
						</label> */}
					</form>
				</Grid>
			</Grid>
			<Grid container direction='column' justify='flex-start' alignItems='flex-end'>
				<Grid item xs={12}>
					<Button variant='contained' className={classes.button} onClick={() => resetForm()}>
						LIMPIAR FORMULARIO
					</Button>
					<Button variant='contained' color='primary' className={classes.button} onClick={() => save()}>
						REALIZAR INGRESO
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}
