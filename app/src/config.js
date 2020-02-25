var config = {
    style: 'mapbox://styles/mapbox/dark-v10',
    accessToken: 'pk.eyJ1IjoienVwcGlmIiwiYSI6ImNqdm96Z3d2ejFibG80OXZuZWdwMWgyemwifQ.aFnHrPBYUqnYcK2jAwzAZA',
    showMarkers: true,
    theme: 'light',
    alignment: 'left',
    // title: 'COVIS-19',
    // subtitle: 'A story told by maps',
    // byline: 'By a Francesco Saverio Zuppichini',
    footer: 'Source: source citations, etc.',
    chapters: [
        {
            id: 'chap0',
            title: 'Display Title',
            image: './path/to/image/source.png',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            location: {
                center: [114.301859, 30.592357],
                zoom: 10,
                pitch: 60,
                bearing: 0
            },
            onChapterEnter: [
                // {
                //     layer: 'layer-name',
                //     opacity: 1
                // }
            ],
            onChapterExit: [
                // {
                //     layer: 'layer-name',
                //     opacity: 0
                // }
            ]
        },
        {
            id: 'chap1',
            title: 'Second Title',
            image: './path/to/image/source.png',
            description: 'Copy these sections to add to your story.',
            location: {
                center: [-77.020636, 38.886900],
                zoom: 13.5,
                pitch: 60,
                bearing: -43.2
            },
            onChapterEnter: [],
            onChapterExit: []
        }
    ]
};

export default config;