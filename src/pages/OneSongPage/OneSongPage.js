import { Grid, Typography, Box, Alert } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router'
import axiosApiInstance from '../../axios';
import ElementCard from '../../components/ElementCard/ElementCard';
import { Snackbar } from '@material-ui/core';
import './style.css';


export default function OneSongPage() {

	const { id } = useParams();
	const [song, setSong] = useState(null);
	const [open, setOpen] = useState(false);
	const vertical = 'bottom';
	const horizontal = 'center';

	useEffect(() => {

		axiosApiInstance.get(`/songs/${id}`)
			.then((res) => {
				setSong(res.data);
			})
			.catch(err => {
				console.log(err);
			})

	}, [id])

	function handleOnDragEnd(result) {
		if (!result.destination) return;
		console.log(result)
		const items = Array.from(song.elements);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		console.log(items)
		setSong(song => {
			return {
				name: song.name,
				key: song.key,
				bpm: song.bpm,
				elements: items,
			}
		})
	}

	const [isInitialMount, setIsInitialMount] = useState(0);

	useEffect(() => {
		if (isInitialMount < 2) {
			setIsInitialMount(prev => prev + 1);
		} else {
			axiosApiInstance.patch(`/songs/${id}`, song)
				.then(res => {
					console.log(res)
					setOpen(true)
				})
				.catch(err => {
					console.log(err.message);
				})
		}
	}, [song]);

	return (
		<>
			{song ?
				<>
					<Box mb={2}>
						<Typography variant="h3" align="center">{song.name}</Typography>
						<Grid container spacing={4} justifyContent="center">
							<Grid item>
								<Typography>BPM: {song.bpm}</Typography>
							</Grid>
							<Grid item>
								<Typography>KEY: {song.key}</Typography>
							</Grid>
						</Grid>
					</Box>
					<DragDropContext onDragEnd={handleOnDragEnd}>
						<Droppable droppableId="characters">
							{(provided) => (
								<div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
									{song.elements.map(({ _id, strings }, index) => {
										return (
											<Draggable key={_id} draggableId={_id} index={index}>
												{(provided) => (

													<ElementCard
														provided={provided}
														strings={strings}
													/>

												)}
											</Draggable>
										);
									})}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
					<Snackbar
						open={open}
						autoHideDuration={1000}
						onClose={() => setOpen(false)}
						key={vertical + horizontal}
						anchorOrigin={{ vertical, horizontal }}
					>
						<Alert severity="success">
							Saved!
						</Alert>
					</Snackbar>
				</>
				: 'song loading or 404'
			}
		</>
	)
}
