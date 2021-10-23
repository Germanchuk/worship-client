import { Card, CardActions, CardHeader, Button, IconButton } from '@material-ui/core';
import { ArrowForward, Edit, Add } from '@material-ui/icons';
import { Box } from '@material-ui/system';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosApiInstance from '../../axios';

export default function HomePage() {

	const [songs, setSongs] = useState([]);

	useEffect(() => {
		console.log(songs);
	}, [songs]);

	useEffect(() => {

		axiosApiInstance.get('/songs')
			.then((res) => {
				setSongs(res.data);
			})
			.catch(err => {
				console.log(err);

			})

	}, []);

	return (
		<>
			<Box mb={1}>
				<Card>
					<CardHeader
						title="Додати"
						action={
							<IconButton component={Link} to="/add-song">
								<Add />
							</IconButton>
						}
					/>
				</Card>
			</Box>
			{songs.length !== 0 ? songs.map((song, index) => (
				<Box key={song._id} mb={1}>
					<Card>
						<CardHeader
							title={song?.name || 'no name'}
						/>
						<CardActions>
							<Box justifyContent="space-between" display="flex" width="100%">
								<Button variant="outlined" component={Link} to={`/edit/${song._id}`}>
									<Edit />
								</Button>
								<Button variant="contained" component={Link} to={`/songs/${song._id}`}>
									<ArrowForward />
								</Button>
							</Box>
						</CardActions>
					</Card>
				</Box>
			))
				: 'no songs (('
			}
		</>
	)
}
