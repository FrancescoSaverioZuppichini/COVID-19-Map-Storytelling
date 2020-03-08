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
import moment from 'moment'
import csv from 'csvtojson'
import { aggregateAll, aggregateRegion } from './utils.js'
import CovidDataInfo from './CovidDataInfo'
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

function HazardButton({ theme, onClick, isInFullMap }) {
	const icon = isInFullMap ?  '/text_fields-24px.svg' : '/biohazard.png' 
	return (
		<button id="hazardButton" onClick={onClick} className="">
			<img src={icon} />
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

const transitions = {
	break: () => TRANSITION_EVENTS.BREAK,
	ease: easeCubic
}

const initialViewState = {
	longitude: 15.38585,
	latitude: 26.68114,
	zoom: 2,
	pitch: 0,
	bearing: 0
}

const WORLD_COORDINATE = {
	latitude: 15.38585,
	longitude: 26.68114
}

export default class App extends Component {
	state = {
		currentChapter: config.chapters[0],
		viewState: initialViewState,
		isFlyingFromFullMap: false,
		isInFullMap: true, // used to know where we hare in the full map mode
		date: moment("01-02-2020", 'DD-MM-YYYY'),
		data: [],
		totalCovidData: {},
		countryCovidData: {},
		geoCountries: []
	}

	componentDidMount() {
		const geoDatas = [axios.get('/countries-small.geojson'), axios.get('/china-provinces.geojson')]

		Promise.all(geoDatas)
			.then((data) => {
				const countries = data[0].data
				let china = data[1].data
				// china data as name as `NAME`, to be coherent with
				// countries data we include the `.name` field
				china.features = china.features.map((el) => {
					el.properties.name = el.properties.NAME
					return el
				})

				const contriesAndChina = {
					type: countries.type,
					features: [...countries.features, ...china.features]
				}
				return contriesAndChina
			})
			.then((geoCountries) => this.setState({ geoCountries }))
		// axios.get('/china-provinces.geojson').then(({ data }) => this.setState({ geoCountries: data }))
		this.getDataFromDate(this.state.date)
	}

	extractDateFromChapter = ({ text }) => {
		const firstLine = text.split('\n')[0]
		const date = moment(firstLine, 'DD-MM-YYYY')
		return date
	}

	setChapterLocation = (chapter) => {
		// if we are scrolling up we want to keep the previos animation duration
		const weAreGoingBack = this.state.currentChapter.id > chapter.id
		let duration = weAreGoingBack ? this.state.currentChapter.duration : chapter.duration
		// set new date only if we have one
		const date = chapter.date === undefined ? this.state.date : chapter.date
		this.setState({
			currentChapter: chapter,
			date: date,
			isInFullMap: false,
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

	getChapterGeoLayer({ countries }) {
		let data = []
		if (countries && this.state.geoCountries.features) {
			const features = this.state.geoCountries.features.filter((d) => countries.includes(d.properties.name))
			data = { type: this.state.geoCountries.type, features }
		}

		const layer = new GeoJsonLayer({
			id: 'geojson-layer',
			data: data,
			pickable: true,
			filled: true,
			extruded: true,
			lineWidthScale: 20,
			lineWidthMinPixels: 2,
			getFillColor: [155, 0, 0, 100],
			getRadius: 100,
			getLineWidth: 1,
			getElevation: 30
		})

		return layer
	}

	getCovidGeoLayer() {
		let data = this.state.geoCountries

		// console.log(`Total infected = ${totalInfected}`)

		const findDataForGeoRegion = (d) =>
			this.state.data.find(
				(el) => el['Province/State'] == d.properties.name || el['Country/Region'] == d.properties.name
			)

		const getName = (d ) => {
			const province = d['Province/State']
			const country = d['Country/Region']
			
			return `${province != '' ? province + ' ': ''}${country}`

		}
		const layer = new GeoJsonLayer({
			id: 'geojson-layer',
			data: data,
			pickable: true,
			filled: true,
			extruded: true,
			lineWidthScale: 20,
			lineWidthMinPixels: 2,
			getFillColor: (d) => {
				// base color is transparent
				let colour = [0, 0, 0, 0]
				const covisData = findDataForGeoRegion(d)
				if (covisData) {
					if (covisData.Confirmed > 0) {
						const ratio = Number(covisData.Confirmed) / (this.state.totalCovidData.Confirmed / 100)
						colour = [255 * ratio, 0, 0, 100]
					}
				}
				return colour
			},
			getRadius: 100,
			getLineWidth: 1,
			getElevation: 30,
			onHover: ({ object, x, y }) => {
				if (object) {
					const covisData = findDataForGeoRegion(object)
					if (covisData) {
						const countryCovidData = {
							Confirmed: Number(covisData.Confirmed),
							Deaths: Number(covisData.Deaths),
							Recovered: Number(covisData.Recovered),
							name: getName(covisData)
						}
						// console.log(countryCovidData)
						this.setState({ countryCovidData })
					}
				}
				//   const tooltip = object.properties.name || object.properties.station;
				/* Update tooltip
				   http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
				*/
			}
		})

		return layer
	}

	getDataFromDate(date) {
		/***
		 * This function gets the data from a github repo using the current date and returns a list of objects.
		 *  Be awere, the format must be MM-DD-YYYY. We are using moment.js to properly parse the date.
		 */
		const dateFormat = date.format('MM-DD-YYYY')
		const DATA_URL = '/api/v1/data/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/'
		const url = `${DATA_URL}${dateFormat}.csv`
		const csvParser = csv()

		return axios
			.get(url)
			.then(({ data }) => data)
			.then((data) => csvParser.fromString(data))
			.then((data) => aggregateRegion(data, 'US'))
			.then((data) => {
				console.log('new data', data)
				const totalCovidData = aggregateAll(data)
				this.setState({ data, totalCovidData })
			})
	}

	mapOnLoad = () => {
		const scroller = scrollama()

		scroller
			.setup({
				step: '.step',
				offset: 0.5,
				progress: true
			})
			.onStepEnter(async (response) => {
				// TODO this should go inside a method like loadChapter
				// we want to find out chapter and then move to it
				let chapter = config.chapters.find((chap) => chap.id === response.element.id)
				// TODO would be nice to preload the text or show some loading content on the card
				const { data } = await axios.get(`/stories/${chapter.id}.md`)
				// update chapter obj
				chapter.text = data
				chapter.date = this.extractDateFromChapter(chapter)
				// if we have a new location we want to move to it
				if (chapter.location) {
					this.setChapterLocation(chapter)
				} else {
					this.setState({
						currentChapter: chapter,
						isInFullMap: false
					})
				}
			})
			.onStepExit(() => { })
	}

	onHazardButton = () => {
		/***
		 * Hazard button switch between full map view and the chapters view
		 */
		if (!this.state.isInFullMap) {
			// display the whole world (a whole newwww worllldd)
			const viewState = {
				...WORLD_COORDINATE,
				zoom: 2,
				...{
					transitionEasing: transitions['ease'],
					transitionDuration: 2000,
					transitionInterpolator: new FlyToInterpolator()
				}
			}
			// wait to get the data and set set the state
			this.getDataFromDate(this.state.date)
				.then(() => this.setState({ viewState, isFlyingFromFullMap: false, isInFullMap: true, }))

		} else {
			// TODO we should also ask and get the text/process the data!!
			// go back to the current chapter location
			this.setState({ isFlyingFromFullMap: true, isInFullMap: false })
			this.setChapterLocation(this.state.currentChapter)
		}
	}

	onViewStateChange = ({ viewState }) => {
		this.setState({ viewState })
	}

	mapStyle = () => {
		/***
		 * This function returns the style used by DECK.gl. 
		 * When we are not in full map we need to set the z-index to -1 in onder
		 * to disable the map controller.
		 */
		const zIndex = this.state.isInFullMap ? 99 : -1
		return {
			zIndex,
			position: 'fixed'
		}
	}

	render() {
		const geoLayer = this.state.isInFullMap
			? this.getCovidGeoLayer()
			: this.getChapterGeoLayer(this.state.currentChapter)

		return (
			<div>
				<Title {...config} />
				<DeckGL
					viewState={this.state.viewState}
					onViewStateChange={this.onViewStateChange}
					controller={MapController}
					layers={[geoLayer]}
					style={this.mapStyle()}
				>
					<StaticMap
						mapStyle="mapbox://styles/zuppif/ck7dq0q6x1hwo1inu7n734ou1"
						mapboxApiAccessToken={config.accessToken}
						onLoad={this.mapOnLoad}
					>
						{this.state.currentChapter.marker && !this.state.isInFullMap ? (
							<Marker {...this.state.currentChapter.marker}>
								<img src="https://i.imgur.com/MK4NUzI.png" />
							</Marker>
						) : (
								''
							)}
					</StaticMap>
				</DeckGL>
				{this.state.isInFullMap ? <CovidDataInfo total={this.state.totalCovidData}
					country={this.state.countryCovidData} date={this.state.date} /> : ''}
				<Chapters {...config} currentChapterID={this.state.currentChapter.id} />
				<HazardButton theme={config.theme} onClick={this.onHazardButton} isInFullMap={this.state.isInFullMap} />
				<Footer />
			</div>
		)
	}
}
