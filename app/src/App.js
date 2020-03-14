import React, { Component } from 'react'
import './App.css'
import config from './config.js'
import DeckGL, { MapController, FlyToInterpolator } from 'deck.gl'
import { StaticMap } from 'react-map-gl'
import scrollama from 'scrollama'
import { GeoJsonLayer } from '@deck.gl/layers'
import axios from 'axios'
import { Marker } from 'react-map-gl'
import moment from 'moment'
import csv from 'csvtojson'
import { aggregateAll, aggregateRegion, transitions, WORLD_COORDINATE } from './utils.js'
import CovidDataInfo from './CovidDataInfo'
import Title from './Title'
import Chapters from './Chapters'
import HazardButton from './HazardButton'
import Footer from './Footer.js'

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
		isFlyingToFullMap: false,
		isFlyingFromFullMap: false,
		isInFullMap: false, // used to know where we hare in the full map mode
		date: config.chapters[0].date,
		data: [],
		totalCovidData: {},
		countryCovidData: {},
		geoCountries: []
	}

	componentDidMount() {
		
		// get all data as soon as the component is ready
		const geoDatas = [axios.get('/countries-small.geojson'), axios.get('/china-provinces.geojson')]

		Promise.all(geoDatas)
			.then((data) => {
				const countries = data[0].data
				let china = data[1].data
				// china data has the name as `NAME` field, to be coherent with
				// countries data we included the `.name` field
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

	}

	setChapterLocation = (chapter) => {
		/***
		 * This function sets the given chapter as current chapter. This implies updating the location and the date.
		 */
		// if we are scrolling up we want to keep the previos animation duration
		const weAreGoingBack = this.state.currentChapter.id > chapter.id
		let duration = weAreGoingBack ? this.state.currentChapter.duration : chapter.duration
		this.setState({
			currentChapter: chapter,
			date: chapter.date,
			isInFullMap: false,
			viewState: {
				...chapter.location,
				...{
					transitionEasing: transitions[chapter.transition || 'ease'],
					transitionDuration: duration || 1000,
					transitionInterpolator: new FlyToInterpolator()
				}
			}
		})
	}

	getChapterGeoLayer({ countries }) {
		/***
		 * This function return the geo layer for the chapter. If chapter.countries is not empty, 
		 * these countries will be highlighted.
		 */

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
		/**
		 * This function return the go layer for the covis data displayed when we are in full map view.
		 */
		const findDataForGeoRegion = (d) =>
			this.state.data.find(
				(el) => el['Province/State'] == d.properties.name || el['Country/Region'] == d.properties.name
			)

		const getName = (d) => {
			const province = d['Province/State']
			const country = d['Country/Region']

			return `${province != '' ? province + ' ' : ''}${country}`

		}
		const layer = new GeoJsonLayer({
			id: 'geojson-layer',
			data: this.state.geoCountries,
			pickable: true,
			stroked: true,
			filled: true,
			getFillColor: (d) => {
				// base color is transparent
				let colour = [0, 0, 0, 0]
				const covisData = findDataForGeoRegion(d)
				if (covisData) {
					if (covisData.Confirmed > 0) {
						// TODO logiritmic scale?
						const ratio = Number(covisData.Confirmed) / (this.state.totalCovidData.Confirmed / 150)
						colour = [255 * ratio, 0, 0, 100]
					}
				}
				return colour
			},
			getLineColor: [255, 255, 255, 255],
			onHover: ({ object, x, y }) => {
				if (object) {
					// store the current country stats
					const covisData = findDataForGeoRegion(object)
					// default is 0 cases for a country not in the covis data
					let countryCovidData = {
						Confirmed: 0, Deaths: 0, Recovered: 0, name: object.properties.name
					}
					if (covisData) {
						countryCovidData = {
							Confirmed: Number(covisData.Confirmed),
							Deaths: Number(covisData.Deaths),
							Recovered: Number(covisData.Recovered),
							name: getName(covisData)
						}
					}

					this.setState({ countryCovidData })

				}
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
				const totalCovidData = aggregateAll(data)
				this.setState({ data, totalCovidData })
			})
			.catch( e => console.error(e))
	}

	mapOnLoad = () => {
		/**
		 * This function is called when the map is loaded. Here we setup `scrollama` used to 
		 * update the chapters when we scroll down/up.
		 */
		const scroller = scrollama()

		scroller
			.setup({
				step: '.step',
				offset: 0.2,
				progress: true
			})
			.onStepEnter(async (response) => {
				console.log('diocane')
				// TODO this should go inside a method like loadChapter
				// we want to find out chapter and then move to it
				let chapter = config.chapters[response.element.id]
				// conver the date using moment
				chapter.date = chapter.date ? moment(chapter.date, 'DD-MM-YYYY') : undefined
				// parse the date
				const date = chapter.date ? chapter.date.format('DD-MM-YYYY') + '-' : ''
				const { data } = await axios.get(`/chapters/${date}${chapter.name}.md`)
				// update chapter obj
				chapter.text = data
				chapter.date = chapter.date ? moment(chapter.date, 'DD-MM-YYYY') : chapter.date
				// if we have a new location we want to move to it
				if (chapter.location) {
					this.setChapterLocation(chapter)
					if(chapter.date) this.getDataFromDate(chapter.date)

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
			// in order
			// 1) get the data using the date
			// 2) set the state to move the map 
			// 3) wait 2s (the duration time of the fly animation) to display the data
			this.setState({
				viewState,
				isFlyingToFullMap: true,
				isFlyingFromFullMap: false,
				isInFullMap: true,
			})
			setTimeout(() => this.setState({ isFlyingToFullMap: false }), 2000)

		} else {
			// TODO we should also ask and get the text/process the data!!
			// go back to the current chapter location
			this.setState({ isFlyingFromFullMap: true, isFlyingToFullMap: false, isInFullMap: false })
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
		const geoLayer = this.state.isInFullMap && !this.state.isFlyingToFullMap
			? this.getCovidGeoLayer()
			: this.getChapterGeoLayer(this.state.currentChapter)

		return (
			<div>
				{/* <Title {...config} /> */}
				{/* <DeckGL
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
				</DeckGL> */}
				{this.state.isInFullMap ? <CovidDataInfo total={this.state.totalCovidData}
					country={this.state.countryCovidData} date={this.state.date} /> : ''}
				<Chapters {...config} currentChapterID={this.state.currentChapter.id} covidData={this.state.totalCovidData} />
				{this.state.date && <HazardButton theme={config.theme} onClick={this.onHazardButton} isInFullMap={this.state.isInFullMap} />}
				<Footer />
			</div>
		)
	}
}
