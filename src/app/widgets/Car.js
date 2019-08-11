import React from 'react';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	card: {
		maxWidth: 345,
	},
	media: {
		height: 240,
	},
});

const Car = ({ data, retirar, cancel }) => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardMedia className={classes.media} image='/images/mazda-3-azul.jpg' />
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{data.brand} {data.model}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='div'>
						<div>Propietario: {data.userFullName}</div>
						<div>Identificación: {data.userId}</div>
						<div>Fecha de ingreso: {moment(data.entryHour).format('YYYY-MM-DD')}</div>
						<div>Hora de ingreso: {moment(data.entryHour).format('HH:MM a')}</div>
						<div>Ubicación: {data.location}</div>
						<div>Placas: {data.plates}</div>
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size='small' color='primary' onClick={cancel}>
					CANCELAR INGRESO
				</Button>
				<Button size='small' color='primary' onClick={retirar}>
					RETIRAR VEHICULO
				</Button>
			</CardActions>
		</Card>
	);
};

export default Car;
