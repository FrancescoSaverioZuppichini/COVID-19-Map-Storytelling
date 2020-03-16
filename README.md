# COVID-19-Map-Storytelling

https://covid-19-story.herokuapp.com/

A story told by maps
*By a Francesco Saverio Zuppichini and Riccardo Pisoni*

![alt](app.gif)

We decided to tell the story of the new pandemic known as *corona virus* using maps. When the data is available, you can click the button on the downright with the hazard icon to see all the cases on the story's date in the worldwide. To start reading, just scroll down.

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

Contributions must be submitted using pull requests. 

### Adding a chapter
Each chapter is contained in ./server/public/chapters. They are named in the following convention `<DD-MM-YYY-NAME>.md`. This naming is totally made for simplicity so we are able to immediately identify which file we have to change for a date. 

To link the chapters to the app you need to edit `./app/config.js` by adding a js-object (json) in the `chapters` list. This object must contain a field named `date` and a field `name`, used to distinguish between chapters on the same date. They are used to look for the file in the server. For example, let's create a file for `01-06-2020`.  Create a file named `01-06-2020-0.md` in the `./server/public/chapters/` folder. Then the text should look something similar to:

```
//config.js

...

chapters : [
    date: '01-06-2020', 
    name: '0',
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
- [ ] Finish writing @Riccardo @Francesco
- [x] Deploy
- [x] Show all the correct countries names
- [x] Acknowledge @Riccardo
