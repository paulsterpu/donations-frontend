//value = false for hide and true for show

export function showOrHideMobileFilterPanel(value, content) {

    return function(dispatch) {
        dispatch({
            type: "SHOW_FILTER_PANEL",
            payload: {
                showMobileFilterPanel: value,
                filterContent: content
        }})
    }
}

export function setFilters(filters) {

    return function(dispatch) {
        dispatch({
            type: "SET_FILTERS",
            payload: {
                expired: filters.expired,
                available: filters.available,
                fulfilled: filters.fulfilled,
                unfulfilled: filters.unfulfilled
            }
        })
    }
}

export function setOrderBy(value) {

    return function(dispatch) {
        dispatch({type: "SET_ORDER_BY", payload: {orderByValue: value}})
    }
}

export function setSortBy(value) {

    return function(dispatch) {
        dispatch({type: "SET_SORT_BY", payload: {sort_type: value}})
    }
}

export function resetFiltersAndOrder() {

    return function (dispatch) {
        dispatch({type: "RESET_FILTERS_AND_ORDER"});
    }
}

export function updateFilterState(field, value) {

    return function (dispatch) {

        dispatch({type: "UPDATE_FILTER_STATE", payload: {field, value}})
    }
}