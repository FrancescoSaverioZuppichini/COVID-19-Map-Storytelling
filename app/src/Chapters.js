import React from 'react'
import Chapter from './Chapter'

export default function Chapters({ chapters, theme, currentChapterID, covidData }) {
	return (
		<div id="story">
			<div id="features">
				{chapters.map((chapter, idx) => (
					<Chapter key={idx} theme={theme} {...chapter} 
					currentChapterID={currentChapterID}
					covidData={covidData}/>
				))}
			</div>
		</div>
	)
}