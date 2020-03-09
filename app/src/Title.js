
import React from 'react'
const ReactMarkdown = require("react-markdown")


export default function Title({ header, theme }) {
	return (
		<div>
			{header && (
				<div id="header" className={theme}>
					<ReactMarkdown source={header}/>
				</div>
			)}
		</div>
	)
}