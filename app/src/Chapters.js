import React from 'react'
import Chapter from './Chapter'

export default function Chapters({ chapters, theme, currentChapterID, covidData }) {
	return (
		<div id="story">
			<div id="features">
				{chapters.map((chapter) => (
					<Chapter key={chapter.id} theme={theme} {...chapter} currentChapterID={currentChapterID} covidData={covidData}/>
				))}
			</div>
		</div>
	)
}