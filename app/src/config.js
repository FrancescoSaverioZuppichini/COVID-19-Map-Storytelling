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
			id: 'chap3',
			date: '01-22-2020',
			text: `
## Virus starts to spread outside China

First cases in Hong Kong, Macau, Taiwan, US, Japan, Thailand, South Korea
`,
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
			id: 'chap4',
            text: `
###  Huanan seafood wholesale market   

[Research article](https://onlinelibrary.wiley.com/doi/10.1002/jmv.25682) suggest the virus could have been spread from the wildlife animals at the Huanan seafood wholesale market. There, poultry, snake, bats, and other farm animals were also sold.

![alt](https://i.dailymail.co.uk/1s/2020/01/27/18/23944578-7935167-image-a-3_1580149848978.jpg)

![alt](https://i.dailymail.co.uk/1s/2020/01/27/18/23944296-7935167-image-a-5_1580149868513.jpg)


Yes, places like this one exist on hearth.
        `,
			location: {
				longitude: 114.258286,
				latitude: 30.617847,
				zoom: 14,
				pitch: 30,
				bearing: 0
            },
            marker: {
				longitude: 114.261505,
				latitude: 30.617792,
            },
            duration: 3000,
		},

		{
			id: 'chap5',
			text: ``,
			date: '',
			location: {
				longitude: 10.993596,
				latitude: 45.416064,
				zoom: 3,
				pitch: 60,
				bearing: 0
			}
		}
	]
}

export default config
