import React from 'react'

export default function HazardButton({ theme, onClick, isInFullMap }) {
	const icon = isInFullMap ?  '/text_fields-24px.svg' : '/biohazard.png' 
	return (
		<button id="hazardButton" onClick={onClick} className="">
			<img src={icon} />
		</button>
	)
}