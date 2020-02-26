import React, { Component } from 'react'
import './App.css';
import config from './config.js'
import DeckGL, { MapController, FlyToInterpolator, TRANSITION_EVENTS } from 'deck.gl'
import { StaticMap } from 'react-map-gl'
import scrollama from 'scrollama'
import Chapter from './Chapter'
import { easeCubic } from 'd3-ease'

const layerTypes = {
	fill: ['fill-opacity'],
	line: ['line-opacity'],
	circle: ['circle-opacity', 'circle-stroke-opacity'],
	symbol: ['icon-opacity', 'text-opacity'],
	raster: ['raster-opacity'],
	'fill-extrusion': ['fill-extrusion-opacity']
}


function Title({ title, subtitle, byline, theme }) {
	return (
		<div>
			{config.title && (
				<div id="header" className={theme}>
					<h1>{config.title}</h1>
					{config.subtitle && <h2>{config.subtitle}</h2>}
					{config.byline && <p>{config.byline}</p>}
				</div>
			)}
		</div>
	)
}

function Intro() {
	return (
		<div></div>
	)
}

function Chapters({ chapters, theme, alignment, currentChapterID }) {
	return (
		<div>
			<div id="features">
				{chapters.map((chapter) => (
					<Chapter key={chapter.id}
						theme={theme}
						{...chapter}
						currentChapterID={currentChapterID} />
				))}
			</div>
		</div>
	)
}

function Footer({ footer, theme }) {
	return (
		<div >
			{footer && (
				<div id="footer" className={theme}>
					<p>{footer}</p>
				</div>
			)}
		</div>
	)
}

const initialViewState = {
	longitude: 15.38585,
	latitude: 26.68114,
	zoom: 2,
	pitch: 0,
	bearing: 0
}

export default class App extends Component {
	state = {
		currentChapter: config.chapters[0],
		viewState: initialViewState,
		interact: true
	}

	mapOnLoad = () => {
		// map our transitions function to a string for easy access
		const transitions = {
			break: () => TRANSITION_EVENTS.BREAK,
			ease: easeCubic
		}

		const scroller = scrollama()

		scroller
			.setup({
				step: '.step',
				offset: 0.5,
				progress: true
			})
			.onStepEnter((response) => {
				// we want to find out chapter and then move to it
				const chapter = config.chapters.find((chap) => chap.id === response.element.id)
				if (chapter.location) {
					this.setState({
						currentChapter: chapter,
						interact: false,
						viewState: {
							...chapter.location,
							...{
								transitionEasing: transitions[chapter.transition || 'ease'], // TODO we should check if we are going backwards or towards
								transitionDuration: chapter.duration || 1000,
								transitionInterpolator: new FlyToInterpolator()
							}
						}
					})
				} else {
					this.setState({
						currentChapter: chapter
					})
				}

			})
			.onStepExit((response) => {

			})
	}

	onViewStateChange = ({ viewState }) => {
		this.setState({ viewState })
	}

	render() {
		const theme = config.theme
		const style = this.state.isInIntro ? { position: 'fixed' } : {  zIndex: -1, position: 'fixed' }
		console.log(style)
		return (
			<div>
				<Title {...config} />
				<Intro />
				<DeckGL
					viewState={this.state.viewState}
					onViewStateChange={this.onViewStateChange}
					controller={MapController}
					style={style}
				>
					<StaticMap
						mapStyle='mapbox://styles/mapbox/dark-v9'
						mapboxApiAccessToken={config.accessToken}
						onLoad={this.mapOnLoad} />
				</DeckGL>

				<Chapters {...config} currentChapterID={this.state.currentChapter.id} />
				<Footer />
			</div>
		)
	}
}
