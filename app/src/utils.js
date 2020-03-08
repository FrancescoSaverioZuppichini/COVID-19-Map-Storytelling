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
    // TODO should go in utils
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