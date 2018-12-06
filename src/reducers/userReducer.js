export default function reducer(state={}, action) {

    switch (action.type) {
        case "REGISTER": {

            return {
                ...state,
                registerSuccess: action.payload.registerSuccess,
                duplicateEmail: action.payload.duplicateEmail
            }
        }
        case "LOGIN": {

            return {
                ...state,
                loginSuccess: action.payload.loginSuccess,
                accountNotActivated: action.payload.accountNotActivated,
                invalidCredentials: action.payload.invalidCredentials
            }
        }
        case "RESEND_ACTIVATION_EMAIL": {
            return {
                ...state,
                resendActivationEmailSuccess: action.payload.resendActivationEmailSuccess
            }
        }
        case "LOGOUT": {

            return {
                ...state,
                logoutSuccess: action.payload.logoutSuccess
            }
        }
        case "USER_DETAILS": {

            return {
                ...state,
                userDetails: action.payload.userDetails
            }
        }
        case "UPDATE_USER_STATE": {

            return {
                ...state,
                [action.payload.field]: action.payload.value
            }
        }
    }

    return state;
}