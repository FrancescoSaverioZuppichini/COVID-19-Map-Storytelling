# COVID-19-Map-Storytelling

A story told by maps
*By a Francesco Saverio Zuppichini and Riccardo Pisoni*

We decided to tell the story of the new pandemic known as *coronavirus* (COVID-19) using maps. At any time you can press the button on the downright with the hazard icon to see all the cases on the story's date in the world.

**Behind each number there is a person**, remember it.

## Acknowledge

## Getting started
To start the app you need to start the server

```
cd ./server
npm install 
npm start
```

The server will start on port `8080`. To change it:

```
PORT=3000 npm start
```

Now, the server will listen on port `3000`

## Contribution guideline

Each chapter is contained in `./server/public/chapters`. Each chapter as a unique `id`, this id is linked to the map in the `./app/config.js` file. To specify the position, duration and countries highlighted you need to update this file. For example, to create a new chapter, e.g. chapter 100, we first have to create a `2.md` inside `./server/public/chapters`. If we want to have a date, the date must be present in the first line with `DD-MM-YYYY` format. For example, `100.md` may look like:

```
01-06-2020 
## Corona Virus stops
```

The date parsed by the app is the first of June. This is used to get the data from that date and display them when the downright button is clicked.

To add a position you need to edit `./app/config.js`, adding in the `chapters` array a new entry with the following format:

```
//config.js

...

chapters : [
    id: '100', 
    // if no location is provided the map will not move
    location: {
        longitude: 114.275273,
        latitude: 30.66588,
        zoom: 15,
        pitch: 15,
        bearing: 0
    },
    // you can show a marker
    marker: {
        longitude: 114.28039,
        latitude: 30.66877
    },
    // duration of the fly animation in ms
    duration: 3000,
    // array of countries that will be highlited in red
    countries: [ 'China']
]
```

## TODO 
- [ ] Deploy
- [ ] Show all the correct countries names
- [ ] Finish writing @Riccardo
- [ ] Motivations @Riccardo
- [ ] Acknowledge @Riccardo