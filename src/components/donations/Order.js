import React, { Component } from 'react';

import DownArrow from './DownArrow';

import '../../style/css/order.css';

export default class Order extends Component {

    constructor() {
        super();

        this.state = {
            orderBy: 'Data limita',
            sortBy: 'Sortare ascendenta',
            expandedOrder: false,
            expandedSort: false
        }

    }

    componentWillReceiveProps(newProps) {

        if (newProps.reset) {
            this.setState({
                orderBy: 'Data limita',
                sortBy: 'Sortare ascendenta'
            });

            this.props.acknowledgeReset();
        }
    }

    setOrderBy = (value) => {
        this.setState({orderBy: value}, this.props.setOrderBy(value))
    };

    setSortBy = (value) => {
        this.setState({sortBy: value}, this.props.setSortBy(value))
    };

    render() {

        return (

            <div className='orderContainer'>
                <div className='orderInnerContainer'>

                    <div className='orderDropDownButton' onClick={() => this.setState({expandedOrder: !this.state.expandedOrder})}>

                        <span className='orderLabel'>{this.state.orderBy}</span>

                        <DownArrow/>

                        <ul className={this.state.expandedOrder ? 'expandedOrderContainerList' : 'contractedOrderContainerList'}>
                            <li
                                onClick={() => this.setOrderBy('Data publicare')}
                                className={this.state.orderBy === 'Data publicare' ? 'selectedOrderEntry' : ''}
                            >Data publicarii</li>

                            <li
                                onClick={() => this.setOrderBy('Data limita')}
                                className={this.state.orderBy === 'Data limita' ? 'selectedOrderEntry' : ''}
                            >Data limita</li>
                        </ul>

                    </div>

                    <div className='orderDropDownButton' onClick={() => this.setState({expandedSort: !this.state.expandedSort})}>

                        <span className='orderLabel'>{this.state.sortBy}</span>

                        <DownArrow/>

                        <ul className={this.state.expandedSort ? 'expandedOrderContainerList' : 'contractedOrderContainerList'}>
                            <li
                                onClick={() => this.setSortBy('Sortare ascendenta')}
                                className={this.state.sortBy === 'Sortare ascendenta' ? 'selectedOrderEntry' : ''}
                            >Sortare ascendenta</li>

                            <li
                                onClick={() => this.setSortBy('Sortare descendenta')}
                                className={this.state.sortBy === 'Sortare descendenta' ? 'selectedOrderEntry' : ''}
                            >Sortare descendenta</li>
                        </ul>

                    </div>

                </div>
            </div>
        );
    }


}
