import React from "react"
const ReactMarkdown = require("react-markdown")

const alignments = {
  left: "lefty",
  center: "centered",
  right: "righty"
}

export default function Chapter({
  id,
  theme,
  text,
  currentChapterID,
  slide = false,
  alignment = "left",
  date = ""
}) {
  // old school class conditioning
  let classList = id === currentChapterID ? "step active" : "step"
  // if slide the want to also apply the theme to color the overall background
  classList += slide ? ` slide` : ""
  classList += ` ${alignments[alignment]}`

  return (
    <div id={id} className={classList}>
      <div className={theme}>
        <p>{date}</p>
        <ReactMarkdown source={text} />
      </div>
    </div>
  )
}
