import React from "react"


export default function CovidDataInfo({ total = {}, country = {}, date }) {
  return (
    <div id='covidDataInfo' className="card light">
      <div>
        <p>Cases on {date.format('DD-MM-YYYY')}</p>
        <p>{country.name}</p>
        {/* <h1>{total.Confirmed}</h1> */}
        <div>
          <div className='flex baseline text-row'>
            <p>Confirmed:</p><h2>{country.Confirmed}</h2>
          </div>
          <div className='flex baseline text-row'>
            <p>Deaths:</p><h3>{country.Deaths}</h3>
          </div>
          <div className='flex baseline text-row'>
          <p>Recovered:</p><h3>{country.Recovered}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

