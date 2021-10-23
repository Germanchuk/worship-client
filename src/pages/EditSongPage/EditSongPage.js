import { Button, Grid } from '@material-ui/core';
import { Box } from '@material-ui/system';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import axiosApiInstance from '../../axios';
import MyTextField from '../../components/MyTextField/MyTextField';
import { stringToEls } from '../../helpers/stringToEls';

export default function EditSongPage() {

	const { id } = useParams();
	const history = useHistory();
	const { handleSubmit, formState: { errors }, control, reset } = useForm();
	const [isMulti, setIsMulti] = useState(false);

	const submitWithData = (data) => {
		if (isMulti) {
			data.elements = stringToEls(data.elements);
		}

		axiosApiInstance.patch(`/songs/${id}`, data)
			.then(res => {
				console.log(res)
				history.push(`/songs/${res.data._id}`)
			})
			.catch(err => {
				console.log(err.message);
			})

	}

	useEffect(() => {

		axiosApiInstance.get(`/songs/${id}`)
			.then((res) => {
				if (res.data.elements.length === 0) {
					setIsMulti(true);
				}
				reset(res.data)
			})
			.catch(err => {
				console.log(err);
			})

	}, [id, reset])

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
							Edit
						</Button>
					</Box>
				</Grid>
			</Grid>
			{isMulti &&
				<Grid container>
					<Grid item xs={12}>
						<MyTextField
							control={control}
							label="Text"
							name="elements"
							required={false}
							multiline
						/>
					</Grid>
				</Grid>
			}
		</form>
	)
}
