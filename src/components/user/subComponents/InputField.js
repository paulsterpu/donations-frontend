import React, { Component } from 'react';

import warning from '../../../images/warning.JPG';

import '../../../style/css/inputField.css';

export default class InputField extends Component {

    constructor() {
        super();

        this.state = {

        }
    }

    render() {

        return (
            <div className='formField'>

                <p className='labelInput'>{this.props.label}</p>

                <div className='inputContainer' style={this.props.error ? {borderColor: '#c00'} : {}}>
                    <input
                        type={this.props.type}
                        name={this.props.type}
                        className='id1'
                        onChange={(event) => this.props.updateData(this.props.fieldName, event.target.value)}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                    />
                    {
                        this.props.error && <img src={warning} className='warningLogo'/>
                    }
                </div>

                {
                    this.props.error && <p className='labelWarningMessage'>{this.props.warningMessage}</p>
                }

            </div>
        )


    }

}