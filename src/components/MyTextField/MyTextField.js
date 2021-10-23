import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField } from '@material-ui/core'



function MyTextField({
	control,
	label,
	name = 'text_field_name',
	disabled = false,
	required = true,
	type,
	multiline = false,
	rows = 6,
}) {
	return (

		<Controller
			label={label}
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<TextField {...field}
					error={fieldState.error && Object.keys(fieldState.error).length !== 0}
					disabled={disabled}
					fullWidth
					label={label}
					variant="outlined"
					type={type}
					InputLabelProps={{ shrink: field.value ? true : false }}
					multiline={multiline}
					rows={rows}
				/>
			)}
			rules={{
				required,
			}}
		/>

	)
}

export default MyTextField
