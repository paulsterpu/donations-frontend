import React, { Component } from 'react';

import '../../../style/css/PasswordTooltipWarning.css';

export default class PasswordTooltipWarning extends Component {

    constructor() {
        super();

        this.state = {
        }
    }

    render() {

        console.log('complexity inside tooltip: ', this.props.complexity);

        return (
            <div className='passwordWarningBox'>
                <div className='passwordTooltipLeftArrow'>
                    <div className='innerTriangle'/>
                </div>

                <div className='complexityContainer'>
                    <span className='passwordWarningBoxTitle'>Complexitate</span>

                    <div className='complexityLevelsContainer'>
                        <div className='complexityLevel1' style={this.props.complexity >= 25 ? {backgroundColor: 'red'} : {}}/>
                        <div className='complexityLevel2' style={this.props.complexity >= 50 ? {backgroundColor: 'orange'} : {}}/>
                        <div className='complexityLevel3' style={this.props.complexity >= 75 ? {backgroundColor: 'yellow'} : {}}/>
                        <div className='complexityLevel4' style={this.props.complexity === 100 ? {backgroundColor: 'green'} : {}}/>
                    </div>
                </div>

                <p className='passwordWarningBoxBody'>
                    Parola trebuie sa contina minimum 6 caractere si cel putin o variatie: majuscula sau minuscula, cifra, caracter special: ? ! @
                </p>
            </div>
        )


    }

}