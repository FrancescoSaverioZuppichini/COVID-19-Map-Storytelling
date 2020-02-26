import React from 'react'

const alignments = {
    left: 'lefty',
    center: 'centered',
    right: 'righty'
}

export default function Chapter({ id, theme, title, image, description, currentChapterID, slide = false, alignment = 'left' }) {

    let classList = id === currentChapterID ? "step active" : "step";
    classList += slide ? ' slide' : ''
    classList += ` ${alignments[alignment]} + ${theme}`
    return (
        <div id={id} className={classList}>
            <div>
                {title &&
                    <h3 className="title">{title}</h3>
                }
                {image &&
                    <img src={image} alt={title}></img>
                }
                {description &&
                    <p>{description}</p>
                }
            </div>
        </div>
    )
}
