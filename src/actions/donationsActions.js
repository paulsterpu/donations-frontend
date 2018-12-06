import config from '../config/dev.js';
import axios from "axios";

export function getDonations(filter = {}, order, sort_type) {

    let table;

    if (localStorage.getItem('donationsType') === 'offers')
        table = 'donation_offers';
    else
        table = 'donation_requests';

    return function(dispatch) {
        axios.get(config.api + '/donations' + '?table=' + table + '&expired='
            + filter.expired + '&available=' + filter.available + '&fulfilled='
            + filter.fulfilled + '&unfulfilled=' + filter.unfulfilled
            + '&order_by=' + order + '&sort_type=' + sort_type
            + '&offset=' + filter.offset + '&limit=' + filter.limit
        )
            .then((response) => {
                console.log('getDonations response: ');
                console.log(response.data);

                dispatch({type: "FETCH_DONATIONS", payload: {fetch_donations: true, donations: response.data}});
                dispatch(getDonationsCount(filter, order, sort_type));

            })
            .catch((error) => {

            });
    }
}

export function getDonationsCount(filter = {}, order, sort_type) {

    let table;

    if (localStorage.getItem('donationsType') === 'offers')
        table = 'donation_offers';
    else
        table = 'donation_requests';

    return function (dispatch) {

        axios.get(config.api + '/donations_count' + '?table=' + table + '&expired='
            + filter.expired + '&available=' + filter.available + '&fulfilled=' + filter.fulfilled + '&unfulfilled=' + filter.unfulfilled
            + '&order_by=' + order + '&sort_type=' + sort_type
        )
            .then((response) => {

                console.log('getDonationsCount response: ');
                console.log(response.data);

                dispatch({type: "FETCH_DONATIONS_COUNT", payload: {fetch_donations_count: true, donationsCount: response.data}});

            })
            .catch((error) => {

            });
    }
}

export function updateCurrentPage(currentPage) {

    return function (dispatch) {

        dispatch({type: "UPDATE_CURRENT_PAGE", payload: {currentPage}})
    }
}