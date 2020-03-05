import React, { Component } from 'react'
import './App.css'
import config from './config.js'
import DeckGL, { MapController, FlyToInterpolator, TRANSITION_EVENTS } from 'deck.gl'
import { StaticMap } from 'react-map-gl'
import scrollama from 'scrollama'
import Chapter from './Chapter'
import { easeCubic } from 'd3-ease'
import { GeoJsonLayer } from '@deck.gl/layers'
import axios from 'axios'
import { Marker } from 'react-map-gl'
// import { ThemeProvider } from 'emotion-theming'
// import theme from '@rebass/preset'
// import { Button } from 'rebass'

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
	return <div />
}

function Chapters({ chapters, theme, currentChapterID }) {
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

function HazardButton({ theme, onClick }) {
	return (
		<button id="hazardButton" onClick={onClick} className="">
			<img src="/biohazard.png" />
		</button>
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
		interact: true,
		geoCountries: []
	}

	componentDidMount() {
		axios.get('/countries-small.geojson').then(({ data }) => this.setState({ geoCountries: data }))
	}

	setChapter = (chapter) => {
		const transitions = {
			break: () => TRANSITION_EVENTS.BREAK,
			ease: easeCubic
		}
		// if we are scrolling up we want to keep the previos animation duration
		const weAreGoingBack = this.state.currentChapter.id > chapter.id
		let duration = weAreGoingBack ? this.state.currentChapter.duration : chapter.duration

		this.setState({
			currentChapter: chapter,
			viewState: {
				...chapter.location,
				...{
					transitionEasing: transitions[chapter.transition || 'ease'], // TODO we should check if we are going backwards or towards
					transitionDuration: duration || 1000,
					transitionInterpolator: new FlyToInterpolator()
				}
			}
		})
	}

	mapOnLoad = () => {
		// map our transitions function to a string for easy access
		

		const scroller = scrollama()

		scroller
			.setup({
				step: '.step',
				offset: 0.5,
				progress: true
			})
			.onStepEnter(async (response) => {
				// we want to find out chapter and then move to it
				let chapter = config.chapters.find((chap) => chap.id === response.element.id)
				// TODO would be nice to preload the text or show some loading content on the card
				const { data } = await axios.get(`/stories/${chapter.id}.md`)
				chapter.text = data
				if (chapter.location) {
					this.setChapter(chapter)
				} else {
					this.setState({
						currentChapter: chapter
					})
				}
			})
			.onStepExit(() => {
			})
	}

	onViewStateChange = ({ viewState }) => {
		this.setState({ viewState })
	}
	// TODO need to proxy!
	// async getDataFromDate(date){
	// 	const DATA_URL = 'https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_daily_reports/'
	// 	const url = `${DATA_URL}${date}.csv`

	// 	const {data} = await axios.get(url)
	// 	console.log(data)
	// }

	getGeoLayer(countries) {
		let data = []
		if (countries && this.state.geoCountries.features) {
			const features = this.state.geoCountries.features.filter((d) => countries.includes(d.properties.name))
			data = { type: this.state.geoCountries.type, features }
		}

		const layer = new GeoJsonLayer({
			id: 'geojson-layer',
			data: data,
			pickable: true,
			stroked: false,
			filled: true,
			extruded: true,
			lineWidthScale: 20,
			lineWidthMinPixels: 2,
			getFillColor: (d) => [155, 0, 0, 50],
			// getLineColor: d => [255, 0, 0, 255],
			getRadius: 100,
			getLineWidth: 1,
			getElevation: 30,
			onHover: ({ object, x, y }) => {
				console.log(object)
				//   const tooltip = object.properties.name || object.properties.station;
				/* Update tooltip
				   http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
				*/
			}
		})

		return layer
	}

	onHazardButton = () => { }

	render() {
		const style = { zIndex: -1, position: 'fixed' }
		return (
			<div>
				<Title {...config} />
				<DeckGL
					viewState={this.state.viewState}
					onViewStateChange={this.onViewStateChange}
					controller={MapController}
					layers={[this.getGeoLayer(this.state.currentChapter.countries)]}
					style={style}
				>
					<StaticMap
						mapStyle="mapbox://styles/zuppif/ck7dq0q6x1hwo1inu7n734ou1"
						mapboxApiAccessToken={config.accessToken}
						onLoad={this.mapOnLoad}
					>
						{this.state.currentChapter.marker ? (
							<Marker {...this.state.currentChapter.marker}>
								<img src="https://i.imgur.com/MK4NUzI.png" />
							</Marker>
						) : (
								''
							)}
					</StaticMap>
				</DeckGL>

				<Chapters {...config} currentChapterID={this.state.currentChapter.id} />
				<HazardButton theme={config.theme} onClick={this.onHazardButton} />
				<Footer />
			</div>
			// )}
			// </ThemeProvider>
		)
	}
}
