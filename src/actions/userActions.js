import config from '../config/dev.js';
import axios from "axios";

export function register(data) {

        return function(dispatch) {

            axios.post(config.api + '/register',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    console.log('register response: ');
                    console.log(response.data);

                    dispatch({type: "REGISTER", payload: {registerSuccess: true}})
                })
                .catch((error) => {
                    console.log("error register: ");
                    console.log(error.response.data);

                    if (error.response && error.response.data.error === 'mail already exists')
                        dispatch({type: "REGISTER", payload: {duplicateEmail: true}})
                });

        }

}

export function login(data) {

    return function(dispatch) {

        axios.post(config.api + '/login',
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log('login response: ');
                console.log(response.data);

                localStorage.setItem('user_id', response.data.id);
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('name', response.data.nume);

                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

                dispatch({type: "LOGIN", payload: {loginSuccess: true}})
            })
            .catch((error) => {
/*                console.log("error login: ");
                console.log(error.response.data);*/

                if ( error.response && error.response.data.error === 'Unauthorized')
                    dispatch({type: "LOGIN", payload: {invalidCredentials: true}});

                if (error.response && error.response.data.error === 'Your account has not been activated yet')
                    dispatch({type: "LOGIN", payload: {accountNotActivated: true}});

            });

    }

}

export function logout() {

    return function(dispatch) {

        axios.post(config.api + '/logout')
            .then((response) => {
                console.log('logout response: ');
                console.log(response.data);

                localStorage.removeItem('user_id');
                localStorage.removeItem('access_token');
                localStorage.removeItem('name');

                dispatch({type: "LOGOUT", payload: {logoutSuccess: true}})

                axios.defaults.headers.common['Authorization'] = null;
                /*if setting null does not remove `Authorization` header then try
                  delete axios.defaults.headers.common['Authorization'];
                */
            })
            .catch((error) => {
/*                console.log("error logout: ");
                console.log(error.response.data);*/


            });

    }

}

export function resendActivationEmail(email) {
    return function (dispatch) {

        axios.post(config.api + '/resend_activation', {email})
            .then((response) => {
                console.log('resend_activation response: ');
                console.log(response.data);

                dispatch({type: "RESEND_ACTIVATION_EMAIL", payload: {resendActivationEmailSuccess: true}});


            })
            .catch((error) => {
                console.log("resend_activation logout: ");
                console.log(error.response.data);
            });

    }
}

export function fetchUserDetails() {

    return function (dispatch) {

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

        axios.get(config.api + '/my_account_details')
            .then(response => {
/*                console.log("my account details response: ");
                console.log(response.data);*/

                dispatch({type: "USER_DETAILS", payload: {userDetails: response.data}})
            })
            .catch(error => {
                console.log("getting my_account_details error: ");
                console.log(error.response.data);
            })

    }

}

export function updateUserState(field, value) {

    return function (dispatch) {

        dispatch({type: "UPDATE_USER_STATE", payload: {field, value}})
    }
}

