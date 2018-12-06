import { combineReducers } from 'redux';

import user from './userReducer';
import donations from './donationsReducer';
import filter from './filterReducer';

export default combineReducers({
    user,
    donations,
    filter
})