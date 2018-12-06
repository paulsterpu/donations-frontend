export default function reducer(
    state={
        donations: [],
        donationsCount: 0,
        currentPage: 1,
        donationsPerPage: 20
    }, action) {

    switch (action.type) {
        case "FETCH_DONATIONS": {

            return {
                ...state,
                donations: action.payload.donations
            }
        }
        case "FETCH_DONATIONS_COUNT": {

            return {
                ...state,
                donationsCount: action.payload.donationsCount
            }
        }
        case "UPDATE_CURRENT_PAGE": {

            return {
                ...state,
                currentPage: action.payload.currentPage
            }
        }
    }

    return state;
}