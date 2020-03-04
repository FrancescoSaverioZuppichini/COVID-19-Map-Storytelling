var config = {
	style: 'mapbox://styles/mapbox/dark-v10',
	accessToken: 'pk.eyJ1IjoienVwcGlmIiwiYSI6ImNqdm96Z3d2ejFibG80OXZuZWdwMWgyemwifQ.aFnHrPBYUqnYcK2jAwzAZA',
	showMarkers: true,
	theme: 'light',
	alignment: 'left',
	title: 'COVID-19',
	subtitle: 'A story told by maps',
	byline: 'By a Francesco Saverio Zuppichini and Riccardo Pisoni',
	footer: 'Source: source citations, etc.',
	chapters: [
		{
			id: '0', // file name
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
			id: '1',
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
			id: '2',
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
			id: '3',
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
			id: '4',
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
			id: '5',
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
			id: '6',
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
			id: '7',
			slide: true
        },
        {
			id: '8',
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
			id: '9',
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
			id: '10',
			location: {
				longitude:   7.33942,
				latitude: 50.81065,
				zoom: 6,
				pitch: 30,
				bearing: 0
			},
            countries: [ 'Germany']
		},

	]
}

export default config
