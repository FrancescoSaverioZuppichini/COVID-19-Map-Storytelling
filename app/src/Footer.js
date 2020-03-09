import React from "react"

export default function Footer({ footer, theme }) {
	return (
		<div>
			{footer && (
				<div id="footer" className={theme}>
					<p>{footer}</p>
				</div>
			)}
		</div>
	)
}