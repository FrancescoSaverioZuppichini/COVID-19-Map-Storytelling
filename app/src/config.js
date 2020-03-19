const WUHAN = {
	longitude: 113.82730,
	latitude: 30.57516,
	zoom: 9
}

const WORLD = {
	longitude: 9.86052,
	latitude: 27.91264,
	zoom: 2.2
}

const CHINA = {
	longitude: 101.30385,
	latitude: 34.05125,
	zoom: 5
}

const YOKOHAMA = {
	longitude: 139.56233,
	latitude: 35.43110,
	zoom: 11
}

const VANCOUVER = {
	longitude: -123.26327,
	latitude: 49.26480,
	zoom: 11

}

var config = {
	style: 'mapbox://styles/mapbox/dark-v10',
	accessToken: 'pk.eyJ1IjoienVwcGlmIiwiYSI6ImNqdm96Z3d2ejFibG80OXZuZWdwMWgyemwifQ.aFnHrPBYUqnYcK2jAwzAZA',
	showMarkers: true,
	theme: 'light',
	alignment: 'left',
	header: `# COVID-19 A story told by maps
*By a [Francesco Saverio Zuppichini](https://www.linkedin.com/in/francesco-saverio-zuppichini-94659a150/) and [Riccardo Pisoni](https://www.linkedin.com/in/riccardo-pisoni/)*

We decided to tell the story of the new pandemic known as *corona virus* using maps. When the data is available, you can click the button on the downright with the hazard icon to see all the cases on the story's date in the worldwide. To start reading, just scroll down.

**Behind each number there is a person**, remember it.
	`,
	title: 'COVID-19',
	subtitle: 'A story told by maps',
	byline: 'By a Francesco Saverio Zuppichini and Riccardo Pisoni',
	footer: 'COVMap story',
	chapters: [
		{

			name: '0',
			location: {
				longitude: 102.63073,
				latitude: 35.53723,
				zoom: 3,
				pitch: 0,
				bearing: 0
			},
			countries: ['China'],
		},
		{

			date: "31-12-2019",
			name: '0',
			location: {
				longitude: 114.301859,
				latitude: 30.592357,
				zoom: 10,
				pitch: 60,
				bearing: 0
			},
			duration: 4000,
		},
		{

			date: "02-01-2020",
			name: '0',
			location: {
				longitude: 114.275273,
				latitude: 30.66588,
				zoom: 15,
				pitch: 15,
				bearing: 0
			},
			marker: {
				longitude: 114.28039,
				latitude: 30.66877
			}
		},
		{

			date: "22-01-2020",
			name: '0',
			location: {
				longitude: 9.86052,
				latitude: 27.91264,
				zoom: 2.2,
				pitch: 0,
				bearing: 0
			},
			duration: 4000,
			countries: ['China', 'Hong Kong', 'Taiwan', 'United States of America', 'Japan', 'Thailand', 'South Korea']
		},

		{

			date: "22-01-2020",
			name: '1',
			location: {
				longitude: 114.258286,
				latitude: 30.617847,
				zoom: 14,
				pitch: 30,
				bearing: 0
			},
			marker: {
				longitude: 114.261636,
				latitude: 30.617810,
			},
		},
		{

			date: '27-01-2020',
			name: '0',
			location: {
				longitude: 104.68358,
				latitude: 33.21781,
				zoom: 4,
				pitch: 30,
				bearing: 0
			},
			duration: 3000,
		},
		{

			date: '27-01-2020',
			name: '1',
			location: {
				longitude: -117.60365,
				latitude: 34.05862,
				zoom: 12,
				pitch: 0,
				bearing: 0
			},
			marker: {
				longitude: -117.60365,
				latitude: 34.05862,
			},
			duration: 5000,
		},
		{

			name: 'how-it-kills',
			slide: true,
		},
		{

			date: '29-01-2020',
			name: '0',
			location: {
				longitude: 114.275273,
				latitude: 30.66588,
				zoom: 6,
				pitch: 45,
				bearing: 0
			},
			duration: 2000,
		},
		{

			date: '29-01-2020',
			name: '1',
			location: {
				longitude: 7.33942,
				latitude: 50.81065,
				zoom: 5,
				pitch: 30,
				bearing: 0
			},
			duration: 3000,
			countries: ['Germany']
		},
		{

			date: '30-01-2020',
			name: '0',
			location: {
				longitude: 9.86052,
				latitude: 27.91264,
				zoom: 2.5,
				pitch: 0,
				bearing: 0
			},
			duration: 3000,
		},
		{
			date: ' 31-01-2020',
			name: '0',
			location: {
				longitude: 7.33942,
				latitude: 50.81065,
				zoom: 6,
				pitch: 30,
				bearing: 0
			},
			countries: ['Germany']
		},
		{
			date: '02-02-2020',
			name: '0',
			location: {
				longitude: 119.20476,
				latitude: 10.76389,
				zoom: 5,
				pitch: 0,
				bearing: 0
			},
			duration: 3000,
			countries: ['Philippines']
		},
		{
			date: "03-02-2020",
			name: '0',
			location: {
				longitude: 9.86052,
				latitude: 27.91264,
				zoom: 3,
				pitch: 0,
				bearing: 0
			},
			duration: 1000
		},
		{
			date: '04-02-2020',
			name: '0',
			location: {
				...YOKOHAMA
			},
			duration: 4000
		},
		{
			date: '04-02-2020',
			name: '1',
			location: {
				longitude: -107.68517,
				latitude: 38.67691,
				zoom: 3,
				pitch: 0,
				bearing: 0
			},
			duration: 3000,
			countries: ['US']
		},
		{
			date: '05-02-2020',
			name: '0',
			location: {
				longitude: -107.68517,
				latitude: 38.67691,
				zoom: 4,
				pitch: 0,
				bearing: 0
			},
			duration: 3000
		},
		{
			date: '06-02-2020',
			name: '0',
			location: {
				longitude: 102.63073,
				latitude: 35.53723,
				zoom: 3,
				pitch: 0,
				bearing: 0
			},
		},
		{
			date: '07-02-2020',
			name: '0',
			location: {
				longitude: 113.49339,
				latitude: 30.66588,
				zoom: 6,
				pitch: 30,
				bearing: 0
			},
		},
		{

			date: '07-02-2020',
			name: '1',
			location: {
				longitude: -114.95366,
				latitude: 55.91607,
				zoom: 3.8,
				pitch: 0,
				bearing: 0
			},
			countries: ['Canada']
		},
		{
			date: '10-02-2020',
			name: '0',
			location: {
				...WORLD,
				pitch: 0
			}
		},
		{
			date: '11-02-2020',
			name: '0',
			location: {
				...WORLD,
				zoom: 2.5
			},
		},
		{
			date: '11-02-2020',
			name: '1',
			location: {
				longitude: -117.52474,
				latitude: 32.73788,
				zoom: 9
			},
			duration: 2000
		},
		{
			date: '12-02-2020',
			name: '0',
			location: {
				...WORLD,
				zoom: 2.5
			},
		},
		{
			date: '13-02-2020',
			name: '0',
			location: {
				...WORLD,
				zoom: 2.1
			},
		},
		{
			name: 'sleep',
			slide: true
		},
		{
			date: '14-02-2020',
			name: '0',
			location: {
				...CHINA,
			},
		},
		{
			date: '15-02-2020',
			name: '0',
			location: {
				...WORLD,
				zoom: 2
			},
		},
		{
			date: '16-02-2020',
			name: '0',
			location: {
				...YOKOHAMA
			},
			duration: 3000
		},
		{
			date: '17-02-2020',
			name: '0',
			location: {
				...CHINA,
				zoom: 5.5
			},
			duration: 2000
		},
		{
			date: '17-02-2020',
			name: '1',
			location: {
				...WORLD,
			},
			duration: 2000
		},
		{
			name: 'fake_news',
			slide: true
		},
		{
			date: '18-02-2020',
			name: '0',
			location: {
				...YOKOHAMA
			},
			duration: 2000
		},
		{
			date: '18-02-2020',
			name: '1',
			location: {
				...CHINA,
				zoom: 5
			},
			duration: 2000
		},
		{
			date: '19-02-2020',
			name: '0',
			location: {
				...VANCOUVER
			},
			duration: 3000
		},
		{
			date: '19-02-2020',
			name: '1',
			location: {
				...WUHAN,
				pitch: 30
			},
			duration: 2000
		},
		{
			date: '19-02-2020',
			name: '2',
			location: {
				longitude: 50.82968, // iran
				latitude: 34.64190,
				pitch: 30,
				zoom: 12
			},
			duration: 3000
		},
		{
			date: '20-02-2020',
			name: '0',
			location: {
				longitude: 135.76208, // japan
				latitude: 36.16785,
				pitch: 0,
				zoom: 6.5
			},
			duration: 2000

		},

			{
			date: '21-02-2020',
			name: '0',
			location: {
				...CHINA,
				pitch: 30,
				zoom: 5
			},
			duration: 1000

		},
	]
}

// https://demos.mapbox.com/location-helper/

export default config
