import DeckGL, { TRANSITION_EVENTS } from 'deck.gl'
import { easeCubic } from 'd3-ease'


export function aggregateAll(data) {
    let aggregated = {
        Confirmed: 0, Deaths: 0, Recovered: 0
    }

    for (let el of data) {
        aggregated.Confirmed += Number(el.Confirmed)
        aggregated.Deaths += Number(el.Deaths)
        aggregated.Recovered += Number(el.Recovered)

    }

    return aggregated
}

export function aggregateRegion(data, region) {
    let covisData = { Confirmed: 0, Deaths: 0, Recovered: 0 }

    for (let el of data) {
        if (el['Country/Region'] === region) {
            covisData.Confirmed += Number(el.Confirmed)
            covisData.Deaths += Number(el.Deaths)
            covisData.Recovered += Number(el.Recovered)
        }
    }

    covisData['Country/Region'] = region

    return [covisData, ...data]
}

export const transitions = {
	break: () => TRANSITION_EVENTS.BREAK,
	ease: easeCubic
}

export const WORLD_COORDINATE = {
	latitude: 15.38585,
	longitude: 26.68114
}