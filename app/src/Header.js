import React, { Component } from 'react'
import './Header.css'
export default class Header extends Component {
    render() {
        return (
            <div id='app-header' style={{zIndex: 99}}>
                <h1>COVIS-19</h1>
                <h4><i>"coronavirus"</i></h4>
            </div>
        )
    }
}
