export default function reducer(
    state={
        expired: false,
        fulfilled: false,
        unfulfilled: false,
        available: false,
        orderByValue: 'Data limita',
        sort_type: 'Sortare ascendenta',
        showMobileFilterPanel: false,
        filterContent: '',   //'filter' or 'order' or 'sort' inside the mobile panel filter,
        resetFiltersAndOrderSuccessfully: false
    }, action) {

    switch (action.type) {
        case "SHOW_FILTER_PANEL": {

            return {
                ...state,
                showMobileFilterPanel: action.payload.showMobileFilterPanel,
                filterContent: action.payload.filterContent
            }
        }
        case "SET_FILTERS": {

            return {
                ...state,
                expired: action.payload.expired,
                available: action.payload.available,
                fulfilled: action.payload.fulfilled,
                unfulfilled: action.payload.unfulfilled
            }
        }
        case "SET_ORDER_BY": {

            return {
                ...state,
                orderByValue: action.payload.orderByValue
            }
        }
        case "SET_SORT_BY": {

            return {
                ...state,
                sort_type: action.payload.sort_type
            }
        }
        case "RESET_FILTERS_AND_ORDER": {

            return {
                ...state,
                expired: false,
                available: false,
                fulfilled: false,
                unfulfilled: false,
                orderByValue: 'Data limita',
                sort_type: 'Sortare ascendenta',
                resetFiltersAndOrderSuccessfully: true
            }
        }
        case "UPDATE_FILTER_STATE": {

            return {
                ...state,
                [action.payload.field]: action.payload.value
            }
        }
    }

    return state;
}