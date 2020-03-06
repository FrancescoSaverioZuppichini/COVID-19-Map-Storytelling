import React from "react"
const ReactMarkdown = require("react-markdown")

const alignments = {
  left: "lefty",
  center: "centered",
  right: "righty"
}

function DummyText() {
  return (<div className="chapter-dummy">
    <div className="chapter_date-dummy" />
    <div className="chapter_title-dummy" />
    <div className="chapter_text-dummy" />
    <div className="chapter_text-dummy" />
    <div className="chapter_text-dummy" />

  </div>)
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
        {text ? <ReactMarkdown source={text} /> : <DummyText />}
      </div>
    </div>
  )
}
