import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import '../../style/css/applyButton.css';

import applyIcon from '../../images/blueDonation.jpg';

export default class ApplyButton extends Component {

    constructor() {
        super();

        this.state = {}

    }

    render() {

        return <button className='applyButton'>
            <img src={applyIcon} className='applyIcon'/>
            <p className='applyMessage'>Aplica</p>
        </button>

    }

}
