import React, { Component } from 'react';

import UpArrow from './UpArrow';
import DownArrow from './DownArrow';
import FilterField from './FilterField';

import '../../style/css/filter.css';

export default class Filter extends Component {

    constructor() {
        super();

        this.state = {
            expanded: false,
        }

    }

    render() {

        return <div className={this.props.mobile ? 'mobileFilterContainer' : 'filterContainer'}>

            <div className='filterHeader' onClick={() => this.setState({expanded: !this.state.expanded})}>
                <p className='filterTitle'>{this.props.title}</p>

                {
                    this.state.expanded ?

                    <DownArrow/> :

                    <UpArrow/>
                }
            </div>

            <div className={this.state.expanded ? 'filterBody' : 'contractedFilterBody'}>
                {
                    this.props.fields &&

                    this.props.fields.map(function (field) {
                        return <FilterField name={field} setFilter={this.props.setFilter} reset={this.props.reset} acknowledgeReset={this.props.acknowledgeReset}/>
                    }.bind(this))
                }
            </div>
        </div>

    }

}
