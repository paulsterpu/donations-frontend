import React, { Component } from 'react';

import '../../style/css/filterField.css';

export default class FilterField extends Component {

    constructor() {
        super();

        this.state = {
            checked: false
        }
    }

    componentWillReceiveProps(newProps) {

        if (newProps.reset) {

            console.log('setting filter to false ...');

            this.props.acknowledgeReset();
            this.setState({checked: false})
        }
    }

    render() {
        return (
            <div className='filterFieldContainer'>
                <label className='filterFieldLabel'>
                    <input
                        type='checkbox'
                        className='checkboxx'
                        onChange={(event) => {
                            this.props.setFilter(this.props.name, event.target.checked);
                            this.setState({checked: !this.state.checked})
                        }}
                        checked={this.state.checked}
                    />
                    <span>{this.props.name}</span>
                </label>
            </div>
        )
    }
}