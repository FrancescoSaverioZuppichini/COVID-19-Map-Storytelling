import React, { Component } from 'react'
// import Header from './Header'
// import Story  from './Story'
import config from './config.js'
// import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers'
import DeckGL, { MapController, FlyToInterpolator, TRANSITION_EVENTS } from 'deck.gl'
import { StaticMap } from 'react-map-gl'
// import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';
import scrollama from 'scrollama'
import Chapter from './Chapter'
import './Story.css'
import { easeCubic } from 'd3-ease'
import mapboxgl from 'mapbox-gl'

const layerTypes = {
	fill: [ 'fill-opacity' ],
	line: [ 'line-opacity' ],
	circle: [ 'circle-opacity', 'circle-stroke-opacity' ],
	symbol: [ 'icon-opacity', 'text-opacity' ],
	raster: [ 'raster-opacity' ],
	'fill-extrusion': [ 'fill-extrusion-opacity' ]
}

const alignments = {
	left: 'lefty',
	center: 'centered',
	right: 'righty'
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

function Chapters({ chapters, theme, alignment, currentChapterID }) {
	return (
		<div id="story">
			<div id="features" className={alignments[alignment]}>
				{chapters.map((chapter) => (
					<Chapter key={chapter.id} theme={theme} {...chapter} currentChapterID={currentChapterID} />
				))}
			</div>
		</div>
	)
}

function Footer({ footer, theme }) {
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

export default class App extends Component {
	state = {
		currentChapter: config.chapters[0],
		viewState: config.chapters[0].location
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
				this.setState({
					currentChapter: chapter,
					viewState: {
						...chapter.location,
						...{
							transitionEasing: transitions[chapter.transition || 'ease'], // TODO we should check if we are going backwards or towards
							transitionDuration: chapter.duration || 1000,
							transitionInterpolator: new FlyToInterpolator()
						}
					}
				})
			})
			.onStepExit((response) => {})
	}

	onViewStateChange = ({ viewState }) => {
		this.setState({ viewState })
	}

	render() {
		const theme = config.theme
		const currentChapterID = this.state.currentChapter.id
		console.log('wee')
		return (
			<div>
				<Title {...config} />
				<DeckGL
					viewState={this.state.viewState}
					onViewStateChange={this.onViewStateChange}
					controller={MapController}
					style={{ zIndex: -1, position: 'fixed' }} // we need to use the `MapController` but it will interfere with the scrolling, so we set the z-index to -1
				>
					<StaticMap mapboxApiAccessToken={config.accessToken} onLoad={this.mapOnLoad} />
				</DeckGL>
				<Chapters {...config}/>
				<Footer />
			</div>
		)
	}
}
