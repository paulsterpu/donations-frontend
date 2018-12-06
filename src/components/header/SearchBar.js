import React, { Component } from 'react';

export default class SearchBar extends Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {

        return (

            <div className='cuzIEappliesSpaceBetweenOnMyLeftArrow'>
                <div className="leftArrow"/>

                <div className="searchContainer">

                    <div className="innerContainer">
                        <input type="text" className="searchInput" placeholder='Ce vrei sa cauti?'/>
                    </div>

                    <button className='searchButton' onClick={() => window.alert('WOOO')}>
                        <div className='overlay'/>
                    </button>

                </div>

            </div>
        )

    }

}