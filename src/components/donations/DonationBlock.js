import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import ApplyButton from './ApplyButton';

import '../../style/css/donationBlock.css';

export default class DonationBlock extends Component {

    constructor() {
        super();

        this.state = {}

    }

    render() {

        return (
            <div className='donationBlockContainer'>

                <img src='http://localhost/storage/cat.png' className='donationImage'/>
                <p className='donationTitle'><Link to='#'>{this.props.donation ? this.props.donation.titlu : ''}</Link></p>

                <p className='dueDateDonationLabel'>Publicat la: {this.props.donation ? this.props.donation.data_publicare : ''}</p>

                <p className='dueDateDonationLabel'>Expira la: {this.props.donation ? this.props.donation.data_limita : ''}</p>

                <p className={this.props.donation && this.props.donation.fulfilled ? 'fulfilledDonation' : 'unfulfilledDonation'}>
                    {this.props.donation && this.props.donation.fulfilled ? 'Indeplinita' : 'In asteptare'}
                </p>

                <ApplyButton/>
            </div>
        )

    }

}
