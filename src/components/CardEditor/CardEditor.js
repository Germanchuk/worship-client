import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core'

export default function CardEditor({
	updateStart,
	updateEnd,
	start,
	end,
}) {
	return (
		<div style={{ paddingBottom: '8px' }}>
			<Grid container spacing={3}>
				<Grid item xs={3}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Start</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={start}
							label="Start"
							onChange={(e) => updateStart(e.target.value)}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={3}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">End</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={end}
							label="End"
							onChange={(e) => updateEnd(e.target.value)}
						>
							<MenuItem value={10}>Ten</MenuItem>
							<MenuItem value={20}>Twenty</MenuItem>
							<MenuItem value={30}>Thirty</MenuItem>
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</div>
	)
}
