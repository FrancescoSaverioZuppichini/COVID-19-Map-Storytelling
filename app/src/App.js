import React, { Component } from 'react'
// import Header from './Header'
// import Story  from './Story'
import config from './config.js';
// import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import DeckGL, { MapController, FlyToInterpolator, TRANSITION_EVENTS } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
// import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';
import scrollama from 'scrollama';
import Chapter from './Chapter'
import './Story.css';
import { easeCubic } from 'd3-ease';
import mapboxgl from 'mapbox-gl';

const layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity']
}

const alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty'
}

const transformRequest = (url) => {
    const hasQuery = url.indexOf("?") !== -1;
    const suffix = hasQuery ? "&pluginName=journalismScrollytelling" : "?pluginName=journalismScrollytelling";
    return {
        url: url + suffix
    }
}

const viewState = {
    longitude: 114.301859,
    latitude: 30.592357,
    zoom: 10,
    pitch: 60,
    bearing: 0,
}

// Data to be used by the LineLayer
const data = [{
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781]
}];
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentChapter: config.chapters[0],
            viewState: config.chapters[0].location
        };
    }

    // componentDidMount() {
    //     const mapStart = config.chapters[0].location;

    //     mapboxgl.accessToken = config.accessToken;

    //     const map = new mapboxgl.Map({
    //         container: this.mapContainer,
    //         style: config.style,
    //         center: mapStart.center,
    //         zoom: mapStart.zoom,
    //         pitch: mapStart.pitch,
    //         bearing: mapStart.bearing,
    //         transformRequest: transformRequest
    //     });

    //     const marker = new mapboxgl.Marker();
    //     if (config.showMarkers) {
    //         marker.setLngLat(mapStart.center).addTo(map);
    //     }

    //     function getLayerPaintType(layer) {
    //         var layerType = map.getLayer(layer).type;
    //         return layerTypes[layerType];
    //     }

    //     function setLayerOpacity(layer) {
    //         var paintProps = getLayerPaintType(layer.layer);
    //         paintProps.forEach(function(prop) {
    //             map.setPaintProperty(layer.layer, prop, layer.opacity);
    //         });
    //     }

    //     const setState = this.setState.bind(this);

    //     // instantiate the scrollama
    //     const scroller = scrollama();

    //     map.on('load', function () {

    //         // setup the instance, pass callback functions
    //         scroller
    //         .setup({
    //             step: '.step',
    //             offset: 0.5,
    //             progress: true
    //         })
    //         .onStepEnter(response => {
    //             const chapter = config.chapters.find(chap => chap.id === response.element.id);
    //             setState({currentChapter:chapter});
    //             map.flyTo(chapter.location);
    //             if (config.showMarkers) {
    //                 marker.setLngLat(chapter.location.center);
    //             }
    //             if (chapter.onChapterEnter.length > 0) {
    //                 chapter.onChapterEnter.forEach(setLayerOpacity);
    //             }
    //         })
    //         .onStepExit(response => {
    //             var chapter = config.chapters.find(chap => chap.id === response.element.id);
    //             if (chapter.onChapterExit.length > 0) {
    //                 chapter.onChapterExit.forEach(setLayerOpacity);
    //             }
    //         });
    //     });

    //     window.addEventListener('resize', scroller.resize);
    // }




    mapOnLoad = () => {
        const scroller = scrollama();
        scroller
            .setup({
                step: '.step',
                offset: 0.5,
                progress: true
            })
            .onStepEnter(response => {
                const chapter = config.chapters.find(chap => chap.id === response.element.id);
                this.setState({
                    currentChapter: chapter,
                    viewState: {
                        ...this.state.viewState,
                        ...chapter.location,
                        ...{
                            transitionEasing: easeCubic,
                            transitionDuration: 1000,
                            transitionInterpolator: new FlyToInterpolator(),
                        }
                    }
                })

            })
            .onStepExit(response => {
                var chapter = config.chapters.find(chap => chap.id === response.element.id);

            });
    }


    _onViewportChange = viewport => {
        console.log(viewport, 'wee')
        this.setState({ viewport });
    };


    _onViewStateChange({ viewState }) {
        console.log(this)
        this.setState({ viewState });
    }



    render() {
        const viewPort = { width: '100%', height: '100vh' }
        const theme = config.theme;
        const currentChapterID = this.state.currentChapter.id;
        console.log(this.state.viewState)
        return (
            <div>
                <DeckGL
                    viewState={this.state.viewState}
                    onViewStateChange={this._onViewStateChange}
                    controller={MapController}
                    style={{ zIndex: -1, position: 'fixed' }}

                >
                    {/* <Header/> */}
                    {/* <Story {...config}/> */}
                    <StaticMap
                        mapboxApiAccessToken='pk.eyJ1IjoienVwcGlmIiwiYSI6ImNqdm96Z3d2ejFibG80OXZuZWdwMWgyemwifQ.aFnHrPBYUqnYcK2jAwzAZA'
                        onLoad={this.mapOnLoad}
                    // width='100%'
                    // height='100%'
                    // style={{ position: 'fixed' }}
                    />
                </DeckGL>
                {/* <div ref={el => this.mapContainer = el} className="absolute top right left bottom" /> */}

                <div id="story">
                    {config.title &&
                        <div id="header" className={theme}>
                            <h1>{config.title}</h1>
                            {config.subtitle &&
                                <h2>{config.subtitle}</h2>
                            }
                            {config.byline &&
                                <p>{config.byline}</p>
                            }
                        </div>
                    }
                    <div id="features" className={alignments[config.alignment]}>
                        {
                            config.chapters.map(chapter =>
                                <Chapter key={chapter.id} theme={theme} {...chapter} currentChapterID={currentChapterID} />
                            )
                        }
                    </div>
                    {config.footer &&
                        <div id="footer" className={theme}>
                            <p>{config.footer}</p>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
