import React, { useState } from 'react'
import './style.css'
import CardEditor from '../CardEditor/CardEditor'
import { Collapse, IconButton } from '@material-ui/core';
import { Clear, KeyboardArrowDown, MoreVert, Remove } from '@material-ui/icons';
import BasicMenu from '../Menu/Menu';

// {strings.map(str => (
// 	getTypography(str.string, str.type)
// ))}

export default function ElementCard({
	strings,
	provided,
}) {

	const [edit, setEdit] = useState(false);
	const [start, updateStart] = useState('');
	const [end, updateEnd] = useState('');


	return (
		<div className="card" ref={provided.innerRef} {...provided.draggableProps}>
			<div className="card--content">
				<div className="card--header">
					<p className="title">
						{strings[0].type === 'title' ? strings[0].string : 'no title'}
					</p>
					{!edit ?
						<IconButton onClick={() => setEdit(true)}>
							<KeyboardArrowDown />
						</IconButton>
						:
						<IconButton onClick={() => setEdit(false)}>
							<Clear />
						</IconButton>
					}
				</div>
				<Collapse in={edit}>
					<CardEditor
						start={start}
						end={end}
						updateStart={updateStart}
						updateEnd={updateEnd}
					/>
				</Collapse>
				<div className="card--text">
					{strings.map(({ string, type }, index) => (
						(index === 0 && type === 'title') ? null :
							<p className={type}>{string}</p>
					))}
				</div>
			</div>
			<div className="card--dynamic" {...provided.dragHandleProps}>

			</div>
		</div >
	)
}

function getTypography(str, type) {
	switch (type) {

		case 'text':
			return <p className="">{str}</p>

		case 'title':
			return <p className="">{str}</p>

		case 'chords':
			return <p className="">{str}</p>

	}
}