import React, { Component } from 'react';

import '../../style/css/mobileFilterAndOrder.css';
import MobileFilterButton from "./MobileFilterButton";

export default class MobileFilterAndOrder extends Component {

    constructor() {
        super();

        this.state = {}

    }

    render() {

        return (
            <div className='mobileFilterAndOrderContainer'>

                <MobileFilterButton title='Filtreaza' body='Aplica filtre' onClick={() => this.props.onClick('filter')}/>
                <MobileFilterButton title='Ordoneaza dupa' body={this.props.orderByValue === 'data_limita' ? 'Data limita' : 'Data publicare'} onClick={() => this.props.onClick('order')}/>
                <MobileFilterButton title='Sortare' body={this.props.sort_type === 'asc' ? 'Crescatoare' : 'Descrescatoare'} onClick={() => this.props.onClick('sort')}/>

                {
    /*                this.props.donationsList &&

                    this.props.donationsList.map(function (donation, i, donations) {

                        if (i < donations.length )
                            return <DonationBlock donation={donation}/>
                    })*/
                }


            </div>
        )

    }

}
