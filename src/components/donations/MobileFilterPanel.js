import React, { Component } from 'react';

import '../../style/css/mobileFilterPanel.css';
import filters from "../../config/filters";
import Filter from "./Filter";

export default class MobileFilterPanel extends Component {

    constructor() {
        super();

        this.state = {
        }

    }

    render() {

        console.log('filterContent: ', this.props.filterContent)

        return <div className={!this.props.panelShow ? 'hiddenMobileFilterPanelContainer' : 'mobileFilterPanelContainer'}>

            <h3 onClick={this.props.hidePanel}>X</h3>

            <div className='mobileFiltersContainer'>
                {
                    this.props.filterContent === 'filter' &&

                    filters.map( function (filter) {
                        return <Filter
                            title={filter.title}
                            fields={filter.fields}
                            setFilter={(filterName, value) => this.props.updateFilters(filterName, value)}
                            mobile={true}
                        />
                    }.bind(this))
                }

                {
                    this.props.filterContent === 'order' &&

                    <div onChange={(event) => this.props.setOrderBy(event.target.value)}>
                        <div>
                            <input type='radio' name='order' value='Data publicare' checked={this.props.orderBy === 'Data publicare'}/>
                            <span>Data publicare</span>
                        </div>

                        <div>
                            <input type='radio' name='order' value='Data limita' checked={this.props.orderBy === 'Data limita'}/>
                            <span>Data limita</span>
                        </div>
                    </div>

                }

                {
                    this.props.filterContent === 'sort' &&

                    <div onChange={(event) => this.props.setSortBy(event.target.value)}>
                        <div>
                            <input type='radio' name='sort' value='Sortare ascendenta' checked={this.props.sort_type === 'Sortare ascendenta'}/>
                            <span>Sortare ascendenta</span>
                        </div>

                        <div>
                            <input type='radio' name='sort' value='Sortare descendenta' checked={this.props.sort_type === 'Sortare descendenta'}/>
                            <span>Sortare descendenta</span>
                        </div>
                    </div>

                }

            </div>
        </div>

    }

}
