import React, { Component } from 'react';

import DonationBlock from './DonationBlock.js';

import '../../style/css/donationsList.css';

export default class DonationsList extends Component {

    constructor() {
        super();

        this.state = {}

    }

    render() {

        return <div className='donationsListContainer'>
            {
                this.props.donationsList &&

                this.props.donationsList.map(function (donation, i, donations) {

                    if (i < donations.length )
                        return <DonationBlock donation={donation}/>
                })
            }


        </div>

    }

}
