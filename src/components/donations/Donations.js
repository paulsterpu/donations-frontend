import React, { Component } from 'react';
import {connect} from "react-redux";
import bindActionCreators from "redux/src/bindActionCreators";

import DonationsList from './DonationsList';
import Filter from './Filter';
import Order from './Order';
import MobileFilterAndOrder from './MobileFilterAndOrder';

import filters from '../../config/filters.js';

import '../../style/css/donations.css'
import '../../style/css/pagination.css';

import {getDonations, getDonationsCount, updateCurrentPage, showOrHideMobileFilterPanel, setOrderBy, setSortBy, setFilters, updateFilterState} from '../../actions';
import {Col, Row} from "react-bootstrap";
import NextPage from "./NextPage";
import PreviousPage from "./PreviousPage";
import PageButton from "./PageButton";

class Donations extends Component {

    constructor() {
        super();

        this.state = {
            filtersAndOrderReset: false
        }

    }

    componentWillMount() {

        this.props.getDonations({
                expired: this.props.filter.expired,
                available: this.props.filter.available,
                fulfilled: this.props.filter.fulfilled,
                unfulfilled: this.props.filter.unfulfilled,
                offset: 0,
                limit: this.props.donations.donationsPerPage
            }, this.props.filter.orderByValue === 'Data publicare' ? 'data_publicare' : 'data_limita',
            this.props.filter.sort_type === 'Sortare ascendenta' ? 'asc' : 'desc');

    }

    componentWillReceiveProps(newProps) {

        if (newProps.filter && newProps.filter.resetFiltersAndOrderSuccessfully) {
            this.setState({filtersAndOrderReset: true});
            this.props.updateFilterState('resetFiltersAndOrderSuccessfully', false)
        }
    }

    updateFilters = (filterName, value) => {

        if (filterName === 'Expirate')
            filterName = 'expired';
        else if (filterName === 'Valabile')
            filterName = 'available';
        else if (filterName ===  'Neindeplinite')
            filterName = 'unfulfilled';
        else if (filterName === 'Indeplinite')
            filterName = 'fulfilled';

        let obj = Object.assign(
            {
                expired: this.props.filter.expired,
                available: this.props.filter.available,
                fulfilled: this.props.filter.fulfilled,
                unfulfilled: this.props.filter.unfulfilled
            },
            {
                [filterName]: value
            }
        );

        this.props.setFilters(obj);

        this.props.getDonations({
                expired: obj.expired,
                available: obj.available,
                fulfilled: obj.fulfilled,
                unfulfilled: obj.unfulfilled,
                offset: 0,
                limit: this.props.donations.donationsPerPage
            }, this.props.filter.orderByValue === 'Data publicare' ? 'data_publicare' : 'data_limita',
            this.props.filter.sort_type === 'Sortare ascendenta' ? 'asc' : 'desc');

        this.props.updateCurrentPage(1);

    };

    showMobileFilterPanel = (content) => {
    //content = 'filter' or 'order' or 'sort'
        this.props.showOrHideMobileFilterPanel(true, content);

    };

    setOrderBy = (value, label) => {

        label === 'order' ? this.props.setOrderBy(value) : this.props.setSortBy(value);

        let orderByValue = label === 'order' ? value : this.props.filter.orderByValue;
        let sort_type = label === 'sort' ? value : this.props.filter.sort_type;

        this.props.getDonations({
                expired: this.props.filter.expired,
                available: this.props.filter.available,
                fulfilled: this.props.filter.fulfilled,
                unfulfilled: this.props.filter.unfulfilled,
                offset: 0,
                limit: this.props.donations.donationsPerPage
            }, orderByValue === 'Data publicare' ? 'data_publicare' : 'data_limita',
            sort_type === 'Sortare ascendenta' ? 'asc' : ' desc');

        this.props.updateCurrentPage(1);

    };

    updateCurrentPage = (currentPage) => {

        this.props.getDonations({
                expired: this.props.filter.expired,
                available: this.props.filter.available,
                fulfilled: this.props.filter.fulfilled,
                unfulfilled: this.props.filter.unfulfilled,
                offset: (currentPage - 1) * this.props.donations.donationsPerPage,
                limit: this.props.donations.donationsPerPage
            }, this.props.filter.orderByValue === 'Data publicare' ? 'data_publicare' : 'data_limita',
            this.props.filter.sort_type === 'Sortare ascendenta' ? 'asc' : 'desc');

        this.props.updateCurrentPage(currentPage);
    };

    render() {

        console.log('donations count: ', this.props.donations.donationsCount);
        console.log('current page: ', this.props.donations.currentPage);

        return (
            <div className='donationsContainer'>

                <MobileFilterAndOrder
                    orderByValue={this.props.filter ? this.props.filter.orderByValue : ''}
                    sort_type={this.props.filter ? this.props.filter.sort_type : ''}
                    onClick={(content) => this.showMobileFilterPanel(content)}
                />

                <Order
                    setOrderBy={(value) => this.setOrderBy(value, 'order')}
                    setSortBy={(value) => this.setOrderBy(value, 'sort')}
                    reset={this.state.filtersAndOrderReset}
                    acknowledgeReset={() => this.setState({filtersAndOrderReset: false})}
                />

                <div className='donationsBodyContainer'>

                    <div className='filtersContainer'>
                        {
                            filters.map( function (filter) {
                                return <Filter
                                    title={filter.title}
                                    fields={filter.fields}
                                    setFilter={(filterName, value) => this.updateFilters(filterName, value)}
                                    reset={this.state.filtersAndOrderReset}
                                    acknowledgeReset={() => this.setState({filtersAndOrderReset: false})}
                                />
                            }.bind(this))
                        }
                    </div>

                    <DonationsList donationsList={this.props.donations ? this.props.donations.donations : []}/>
                </div>

                <div className='paginationContainer'>

                    {
                        this.props.donations &&

                        <div className='paginationRow'>

                            <div className='firstPaginationCol'>
                                <span>{(this.props.donations.currentPage - 1) * this.props.donations.donationsPerPage + 1}
                                    -
                                    {
                                        /*(this.props.donations.currentPage - 1) * this.props.donations.donationsPerPage +*/
                                        (this.props.donations.donationsCount <= this.props.donations.currentPage * this.props.donations.donationsPerPage) ?
                                            (this.props.donations.donationsCount) :
                                            (this.props.donations.currentPage * this.props.donations.donationsPerPage)
                                    } { ' ' }
                                    din {this.props.donations.donationsCount} donatii
                                </span>
                            </div>

                            <div className='secondPaginationCol'>
                                <PreviousPage
                                    inactive={this.props.donations.currentPage === 1}
                                    onClick={() => this.props.donations.currentPage > 1 && this.updateCurrentPage(this.props.donations.currentPage - 1)}
                                />

                                {/* first page is always displayed; last page is displayed only if number of pages >=2 */}

                                <PageButton
                                    pageNumber={1}
                                    currentPage={this.props.donations.currentPage}
                                    onClick={() => this.updateCurrentPage(1)}
                                />

                                {/* the breadcrumbs are displayed after the first page and before the last page*/}

                                {
                                    this.props.donations.currentPage >= 5 &&
                                    <PageButton
                                        pageNumber={'...'}
                                        breadcrumbs={true}
                                    />

                                }

                                {/* every page button is followed by and follows 2 other buttons*/}

                                {
                                    this.props.donations.currentPage >= 4 &&
                                    <PageButton
                                        pageNumber={this.props.donations.currentPage - 2}
                                        currentPage={this.props.donations.currentPage}
                                        onClick={() =>this.updateCurrentPage(this.props.donations.currentPage - 2)}
                                    />
                                }

                                {
                                    this.props.donations.currentPage >= 3 &&
                                    <PageButton
                                        pageNumber={this.props.donations.currentPage - 1}
                                        currentPage={this.props.donations.currentPage}
                                        onClick={() =>this.updateCurrentPage(this.props.donations.currentPage - 1)}
                                    />
                                }

                                {
                                    //current page, that is not the first or the last page, and if there are more than 2 pages

                                    this.props.donations.currentPage > 1 &&
                                    this.props.donations.currentPage < Math.ceil(this.props.donations.donationsCount / this.props.donations.donationsPerPage) &&
                                    Math.ceil(this.props.donations.donationsCount / this.props.donations.donationsPerPage) > 2 &&
                                    <PageButton
                                        pageNumber={this.props.donations.currentPage}
                                        currentPage={this.props.donations.currentPage}
                                    />
                                }

                                {
                                    this.props.donations.currentPage <=  Math.ceil(this.props.donations.donationsCount / this.props.donations.donationsPerPage) - 2 &&
                                    <PageButton
                                        pageNumber={this.props.donations.currentPage + 1}
                                        onClick={() =>this.updateCurrentPage(this.props.donations.currentPage + 1)}
                                        currentPage={this.props.donations.currentPage}
                                    />
                                }

                                {
                                    this.props.donations.currentPage <=  Math.ceil(this.props.donations.donationsCount / this.props.donations.donationsPerPage) - 3 &&
                                    <PageButton
                                        pageNumber={this.props.donations.currentPage + 2 }
                                        currentPage={this.props.donations.currentPage}
                                        onClick={() => this.updateCurrentPage(this.props.donations.currentPage + 2)}
                                    />
                                }

                                {
                                    this.props.donations.currentPage <= Math.ceil(this.props.donations.donationsCount / this.props.donations.donationsPerPage) - 4 &&
                                    <PageButton
                                        pageNumber={'...'}
                                        breadcrumbs={true}
                                    />

                                }

                                {
                                    //last page

                                    Math.ceil(this.props.donations.donationsCount / this.props.donations.donationsPerPage) >= 2 &&

                                    <PageButton
                                        pageNumber={Math.ceil(this.props.donations.donationsCount / this.props.donations.donationsPerPage)}
                                        currentPage={this.props.donations.currentPage}
                                        onClick={() => this.updateCurrentPage(Math.ceil(this.props.donations.donationsCount / this.props.donations.donationsPerPage))}
                                    />
                                }

                                <NextPage
                                    inactive={this.props.donations.donationsCount <= this.props.donations.currentPage * this.props.donations.donationsPerPage}
                                    onClick={() => this.props.donations.currentPage < Math.ceil(this.props.donations.donationsCount / this.props.donations.donationsPerPage) && this.updateCurrentPage(this.props.donations.currentPage + 1)}
                                />
                            </div>

                        </div>
                    }

                </div>

            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        donations: state.donations,
        filter: state.filter
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getDonations: getDonations,
        getDonationsCount: getDonationsCount,
        showOrHideMobileFilterPanel: showOrHideMobileFilterPanel,
        setOrderBy: setOrderBy,
        setSortBy: setSortBy,
        setFilters: setFilters,
        updateFilterState: updateFilterState,
        updateCurrentPage: updateCurrentPage
    }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Donations);