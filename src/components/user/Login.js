/* Signup page */

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import InputField from './subComponents/InputField.js';
import PasswordTooltipWarning from './subComponents/PasswordTooltipWarning.js';

import '../../style/css/register.css'
import '../../style/css/login.css'
import '../../style/css/header.css'

import {login, resendActivationEmail} from '../../actions';
import {Redirect} from "react-router-dom";

class Login extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errorEmail: false,
            errorPassword: false,
            redirect: false
        }
    }

    componentWillReceiveProps(newProps) {

        if (newProps.user.loginSuccess)
            this.setState({redirect: true});
    }

    updateData = (field, value) => {
        this.setState({[field]: value}, () => {

            if (field === 'password')
                this.validatePassword();
        });

    };

    validateEmail = () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let rez = !re.test(String(this.state.email).toLowerCase());

        this.setState({errorEmail: rez});

        return rez;
    };

    validatePassword = () => {

        let rez = this.state.password.length < 6;

        this.setState({errorPassword: rez});

        return rez;
    };

    submitData = () => {

        console.log('Data to be submited: ');
        console.log(this.state);

        let invalidEmail = this.validateEmail();
        let invalidPassword = this.validatePassword();

        if (invalidEmail || invalidPassword)
            console.log('invalid data...');
        else
            this.props.login({
                email: this.state.email,
                password: this.state.password
            })
    };

    render() {

        if (this.state.redirect)
            return <Redirect to='/'/>;

        return (
            <div className='mainContainer'>
                <h1 className='containerTitle'>Donații</h1>

                {

                    <div className='formContainer'>
                        <h2 className="formTitle1">Bine ai venit!</h2>
                        <p className='formTitle2'>Intra in contul tau</p>

                        <InputField
                            label='Email'
                            type='text'
                            warningMessage={'Email invalid'}
                            fieldName='email'
                            error={this.state.errorEmail}
                            updateData={this.updateData}
                            onBlur={this.validateEmail}
                        />

                        <InputField
                            label='Parola'
                            type='password'
                            fieldName='password'
                            warningMessage='Parola trebuie sa contina minimum 6 caractere.'
                            error={this.state.errorPassword}
                            updateData={this.updateData}
                            onBlur={this.validatePassword}
                        />


                        <div className='loginErrorContainer'>

                            {
                                this.props.user.accountNotActivated &&

                                    <div>

                                        <p className='loginErrorMessage'>
                                            Contul dumneavoastra nu a fost activat
                                        </p>

                                        <p className='registerSuccessMessage resendActivationEmail' onClick={() => this.props.resendActivationEmail(this.state.email)}>
                                            Retrimite email de activare
                                        </p>

                                        {
                                            this.props.user.resendActivationEmailSuccess &&
                                            <p className='registerSuccessMessage resendActivationEmailSuccess'>
                                                Un email de activare a fost trimis!
                                            </p>
                                        }

                                    </div>
                            }

                            {
                                this.props.user.invalidCredentials &&

                                <p className='loginErrorMessage'>
                                    Email/Parola gresite
                                </p>
                            }

                        </div>

                        <button className='submitButton' onClick={this.submitData}>
                            <span className='submitButtonMessage'>Continua</span>
                        </button>

                    </div>

                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {user: state.user};
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            login: login,
            resendActivationEmail: resendActivationEmail
        },
        dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
