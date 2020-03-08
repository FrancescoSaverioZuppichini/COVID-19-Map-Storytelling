import React from 'react'
import Chapter from './Chapter'

export default function Chapters({ chapters, theme, currentChapterID }) {
	return (
		<div id="story">
			<div id="features">
				{chapters.map((chapter) => (
					<Chapter key={chapter.id} theme={theme} {...chapter} currentChapterID={currentChapterID} />
				))}
			</div>
		</div>
	)
}