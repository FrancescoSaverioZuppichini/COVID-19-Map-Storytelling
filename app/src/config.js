var config = {
	style: 'mapbox://styles/mapbox/dark-v10',
	accessToken: 'pk.eyJ1IjoienVwcGlmIiwiYSI6ImNqdm96Z3d2ejFibG80OXZuZWdwMWgyemwifQ.aFnHrPBYUqnYcK2jAwzAZA',
	showMarkers: true,
	theme: 'light',
	alignment: 'left',
	header: `# COVID-19
## A story told by maps
*By a Francesco Saverio Zuppichini and Riccardo Pisoni*

We decided to tell the story of the new pandemic known as *corona virus* (COVID-19) using maps. At any time you can press the button on the down right with the hazard icon to see all the cases on the story's date in the world.

**Behind each number there is a person**, remember it.
	`,
	title: 'COVID-19',
	subtitle: 'A story told by maps',
	byline: 'By a Francesco Saverio Zuppichini and Riccardo Pisoni',
	footer: 'Source: source citations, etc.',
	chapters: [
		{
			id: 0,
			name: '0',
			location: {
				longitude: 102.63073,
				latitude: 35.53723,
				zoom: 3,
				pitch: 0,
				bearing: 0
			},
			countries: [ 'China' ],
		},
		{
			id: 1,
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
			id: 2,
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
			id: 3,
			date: "22-01-2020",
			name: '0',
			location: {
				longitude:  9.86052,
				latitude: 27.91264 ,
				zoom: 2.2,
				pitch: 0,
				bearing: 0
            },
            duration: 4000,
			countries: [ 'China', 'Hong Kong', 'Taiwan', 'United States of America', 'Japan', 'Thailand', 'South Korea']
        },
        
        {
			id: 4,
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
				longitude:  114.261636,
				latitude: 30.617810,
			},
		},
		{
			id: 5,
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
			id: 6,
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
			id: 7,
			name: 'first-patients',
			slide: true
        },
        {
			id: 8,
			date: '29-01-2020',
			name: '0',
			location: {
				longitude:  114.275273,
				latitude: 30.66588,
				zoom: 6,
				pitch: 45,
				bearing: 0
			},
			duration: 2000,
        },
        {
			id: 9,
			date: '29-01-2020',
			name: '1',
			location: {
				longitude:   7.33942,
				latitude: 50.81065,
				zoom: 5,
				pitch: 30,
				bearing: 0
			},
            duration: 3000,
            countries: [ 'Germany']
        },
        {
			id: 10,
			date: ' 31-01-2020',
			name: '0',
			location: {
				longitude:   7.33942,
				latitude: 50.81065,
				zoom: 6,
				pitch: 30,
				bearing: 0
			},
            countries: [ 'Germany']
		},
		{
			id: 11,
			date: '02-02-2020',
			name: '0',
			location: {
				longitude:  119.20476,
				latitude: 10.76389,
				zoom: 5,
				pitch: 0,
				bearing: 0
			},
			duration: 3000,
			countries: ['Philippines']
		},
		{
			id: 12,
			location: {
				longitude:  9.86052,
				latitude: 27.91264 ,
				zoom: 3,
				pitch: 0,
				bearing: 0
			},
			duration: 1000
		},
		{
			id: 13,
			location: {
				longitude: 139.56233,
				latitude: 35.43110 ,
				zoom: 11,
				pitch: 0,
				bearing: 0
			},
			duration: 4000
		},
		{
			id: 14,
			location: {
				longitude:  -107.68517,
				latitude: 38.67691 ,
				zoom: 3,
				pitch: 0,
				bearing: 0
			},
			duration: 3000,
			countries: [ 'US' ]
		},
		{
			id: 15,
			location: {
				longitude:  -107.68517,
				latitude: 38.67691 ,
				zoom: 4,
				pitch: 0,
				bearing: 0
			},
			duration: 3000
		},
		{
			id: 16,
			location: {
				longitude: 102.63073,
				latitude: 35.53723,
				zoom: 3,
				pitch: 0,
				bearing: 0
			},
		},
		{
			id: 17,
			location: {
				longitude: 113.49339,
				latitude: 30.66588,
				zoom: 6,
				pitch: 30,
				bearing: 0
			},
		},
		{
			id: 18,
			location: {
				longitude:  -114.95366,
				latitude: 55.91607,
				zoom: 3.8,
				pitch: 0,
				bearing: 0
			},
			countries: [ 'Canada' ]

		},
	]
}

// https://demos.mapbox.com/location-helper/

export default config
