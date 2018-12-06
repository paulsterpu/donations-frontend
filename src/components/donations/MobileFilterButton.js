import React, { Component } from 'react';

import '../../style/css/MobileFilterButton.css';

export default class MobileFilterButton extends Component {

    constructor() {
        super();

        this.state = {}

    }

    render() {

        return (
            <div className='mobileFilterButtonContainer' onClick={this.props.onClick}>

                <p className='mobileFilterButtonTitle'>{this.props.title}</p>
                <p className='mobileFilterButtonBody'>{this.props.body}</p>

            </div>
        )

    }

}
