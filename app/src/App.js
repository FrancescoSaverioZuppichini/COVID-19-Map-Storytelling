import React, { Component } from 'react'
import Header from './Header'
import Story  from './Story'
import config from './config.js';
export default class App extends Component {
    render() {
        return (
            <div>
                {/* <Header/> */}
                <Story {...config}/>
            </div>
        )
    }
}
