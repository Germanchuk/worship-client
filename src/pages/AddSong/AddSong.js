import { Button, Grid, Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import MyTextField from '../../components/MyTextField/MyTextField';
import axiosApiInstance from '../../axios';
import { useHistory } from "react-router-dom";

export default function AddSong() {

	const [value, setValue] = useState('');
	const { handleSubmit, formState: { errors }, control, reset } = useForm();
	const history = useHistory();

	// useEffect(() => {
	// 	console.log(value.split("\n"))
	// }, [value])

	const submitWithData = (data) => {

		axiosApiInstance.post('/songs', data)
			.then(res => {
				console.log(res.data._id)
				history.push(`/edit/${res.data._id}`)
			})
			.catch(err => {
				console.log(err.message);
			})

	}

	return (
		<form
			onSubmit={handleSubmit(submitWithData)}
		>
			<Grid container spacing={2} mb={2}>
				<Grid item xs={12}>
					<MyTextField
						control={control}
						label="Song name"
						name="name"
					/>
				</Grid>
			</Grid>
			<Grid container spacing={2} mb={3}>
				<Grid item xs={4}>
					<MyTextField
						control={control}
						label="BPM"
						name="bpm"
						required={false}
						type="number"
					/>
				</Grid>
				<Grid item xs={4}>
					<MyTextField
						control={control}
						label="KEY"
						name="key"
						required={false}
					/>
				</Grid>
				<Grid item xs={4} height="100%">
					<Box display="flex" justifyContent="center" alignItems="center">
						<Button
							variant="contained"
							type="submit"
							size="large"
						>
							Create
						</Button>
					</Box>
				</Grid>
			</Grid>
		</form>
	)
}
