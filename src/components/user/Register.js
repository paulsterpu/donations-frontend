/* Signup page */

import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import InputField from './subComponents/InputField.js';
import PasswordTooltipWarning from './subComponents/PasswordTooltipWarning.js';

import '../../style/css/register.css'
import '../../style/css/header.css'

import {register} from '../../actions';

class Register extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            phone: '',
            passwordScore: 0,
            passwordHasDigit: false,
            passwordHasUpperCaseVariation: false,
            passwordHasSpecialCharacter: false,
            passwordHasEnoughLength: false,
            errorEmail: false,
            errorName: false,
            errorPhone: false,
            errorPassword: false,
            errorConfirmPassword: false,
            passwordInputFocused: false
        }
    }

    passwordStrengthCalculator = (password) => {

        if (password.length <= 1) {
            this.setState({
                passwordScore: 0,
                passwordHasDigit: false,
                passwordHasUpperCaseVariation: false,
                passwordHasSpecialCharacter: false,
                passwordHasEnoughLength: false
            });

            return;
        }

        //has digit
        if (/\d/.test(password)  && !this.state.passwordHasDigit) {
            this.setState({passwordScore: this.state.passwordScore + 25, passwordHasDigit: true}, this.validatePassword);
            console.log('1')
        }
        else if (!/\d/.test(password) && this.state.passwordHasDigit) {
            this.setState({passwordScore: this.state.passwordScore - 25, passwordHasDigit: false}, this.validatePassword);
            console.log('not 1')
        }

        //has special character
        if (/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) && !this.state.passwordHasSpecialCharacter) {
            this.setState({passwordScore: this.state.passwordScore + 25, passwordHasSpecialCharacter: true}, this.validatePassword);
            console.log('2')
        }
        else if (!/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) && this.state.passwordHasSpecialCharacter) {
            this.setState({passwordScore: this.state.passwordScore - 25, passwordHasSpecialCharacter: false}, this.validatePassword);
            console.log('not 2')
        }

        //has upperCase lowerCase variation
        if ( password.length > 1 && password !== password.toLowerCase() && password !== password.toUpperCase() && !this.state.passwordHasUpperCaseVariation) {
            this.setState({passwordScore: this.state.passwordScore + 25, passwordHasUpperCaseVariation: true}, this.validatePassword);
            console.log('3')
        }
        else if (this.state.passwordHasUpperCaseVariation) {
            this.setState({passwordScore: this.state.passwordScore - 25, passwordHasUpperCaseVariation: false}, this.validatePassword);
            console.log('not 3')
        }

        //is at least 6 characters long
        if (password.length >= 6 && !this.state.passwordHasEnoughLength) {
            this.setState({passwordScore: this.state.passwordScore + 25, passwordHasEnoughLength: true}, this.validatePassword);
            console.log('4')
        }
        else if (password.length < 6 && this.state.passwordHasEnoughLength) {
            this.setState({passwordScore: this.state.passwordScore - 25, passwordHasEnoughLength: false}, this.validatePassword);
            console.log('not 4')
        }
    };

    updateData = (field, value) => {

        this.setState({[field]: value}, () => {
            if (field === 'password')
                this.passwordStrengthCalculator(value);

            if (field === 'confirmPassword')
                this.validateConfirmPassword();
        });

    };

    validateEmail = () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let rez = !re.test(String(this.state.email).toLowerCase());

        this.setState({errorEmail: rez});

        return rez;
    };

    validateName = () => {

        let rez = this.state.name.length < 4;

        this.setState({errorName: rez});

        return rez;
    };

    validatePhone = () => {

        let rez = this.state.phone.length < 4;

        this.setState({errorPhone: rez});

        return rez;
    };

    validatePassword = () => {

        let rez = !(this.state.passwordHasEnoughLength && (this.state.passwordHasDigit || this.state.passwordHasUpperCaseVariation || this.state.passwordHasSpecialCharacter));

        this.setState({errorPassword: rez, passwordInputFocused: false});

        return rez;
    };

    validateConfirmPassword = () => {

        let rez = this.state.password !== this.state.confirmPassword;

        this.setState({errorConfirmPassword: rez});

        return rez;
    };

    submitData = () => {

        console.log('Data to be submited: ');
        console.log(this.state);

        let invalidEmail = this.validateEmail();
        let invalidName = this.validateName();
        let invalidPassword = this.validatePassword();
        let invalidConfirmPassword = this.validateConfirmPassword();

        if (invalidEmail || invalidName || invalidPassword || invalidConfirmPassword)
            console.log('invalid data...');
        else
            this.props.register({
                email: this.state.email,
                password: this.state.password,
                nume: this.state.name,
                telefon: this.state.phone
            })
    };

    render() {

        return (
            <div className='mainContainer'>
                <h1 className='containerTitle'>Donații</h1>

                {

                    !this.props.user.registerSuccess &&

                    <div className='formContainer'>
                        <h2 className="formTitle1">Bine ai venit!</h2>
                        <p className='formTitle2'>Hai sa iti cream un cont nou!</p>

                        <InputField
                            label='Email'
                            type='text'
                            warningMessage={this.state.errorEmail ? 'Email invalid' : 'Acest email este deja folosit'}
                            fieldName='email'
                            error={this.state.errorEmail ? this.state.errorEmail : this.props.user.duplicateEmail }
                            updateData={this.updateData}
                            onBlur={this.validateEmail}
                        />
                        <InputField
                            label='Introdu numele si prenumele'
                            fieldName='name'
                            type='text'
                            warningMessage='Camp obligatoriu'
                            error={this.state.errorName}
                            updateData={this.updateData}
                            onBlur={this.validateName}
                        />

                        <InputField
                            label='Telefon'
                            fieldName='phone'
                            type='text'
                            warningMessage='Camp obligatoriu'
                            error={this.state.errorPhone}
                            updateData={this.updateData}
                            onBlur={this.validatePhone}
                        />

                        <div className='registerPasswordContainer'>
                            <InputField
                                label='Alege o parola'
                                type='password'
                                fieldName='password'
                                warningMessage='Parola trebuie sa contina minimum 6 caractere.'
                                error={this.state.errorPassword}
                                updateData={this.updateData}
                                onBlur={this.validatePassword}
                                onFocus={() => this.setState({passwordInputFocused: true})}
                            />

                            {
                                this.state.passwordInputFocused && <PasswordTooltipWarning complexity={this.state.passwordScore}/>
                            }

                        </div>

                        <InputField
                            label='Confirma parola'
                            type='password'
                            fieldName='confirmPassword'
                            warningMessage='Parolele nu se potrivesc'
                            error={this.state.errorConfirmPassword}
                            updateData={this.updateData}

                            onBlur={this.validateConfirmPassword}
                        />

                        <button className='submitButton' onClick={this.submitData}>
                            <span className='submitButtonMessage'>Continua</span>
                        </button>

                    </div>

                }

                {
                    this.props.user.registerSuccess &&

                    <div className='registerSuccess'>
                        <h1 className='containerTitle'>Cont creat cu success</h1>

                        <p className='registerSuccessMessage'>
                            Un email de activare a fost trimis la adresa de email!
                        </p>
                        <p className='registerSuccessMessage'>
                            Daca nu activezi contul nu il vei putea folosi!
                        </p>
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
    return bindActionCreators({register: register}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Register);
