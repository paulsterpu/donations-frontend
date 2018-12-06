/*root component */

import React, { Component } from 'react';

import {Switch, Route, Router, withRouter, Redirect} from 'react-router-dom'

import Header from './header/Header';
import Footer from './footer/Footer';
import Home from './home/Home';
import MyAccount from './user/MyAccount';
import Donation from './donations/Donations';
import { Register, Login } from './user';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getDonations, setFilters, setOrderBy, setSortBy, showOrHideMobileFilterPanel, logout, updateUserState, resetFiltersAndOrder, updateCurrentPage} from "../actions";
import MobileFilterPanel from "./donations/MobileFilterPanel";

import filters from '../config/filters.js';

class App extends Component {

    constructor() {
        super();

        this.state = {
            divContainerStyle: {
                width: '100%',
                display: 'block'
            },
            redirect: false
        }
    }

    componentWillMount() {
        if (!localStorage.getItem('donationsType')) {
            localStorage.setItem('donationsType', 'offers');
        }

        //check if user has a valid token TODO
    }

    componentWillReceiveProps(newProps) {

        console.log('newProps: ', newProps);

        if (newProps.filter && newProps.filter.showMobileFilterPanel === false)
            this.setState({divContainerStyle: {width: '100%', display: 'block'}});

        if (newProps.filter && newProps.filter.showMobileFilterPanel === true)
            setTimeout(() => this.setState({divContainerStyle: {width: '100%', display: 'none'}}), 250);

        newProps.user && console.log('logoutSuccess: ', newProps.user.logoutSuccess);

        if (newProps.user && newProps.user.logoutSuccess) {
            this.setState({redirect: true});
            //update store after logout notification was received
            this.props.updateUserState('logoutSuccess', false);
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
                page: this.props.donations.currentPage,
                offset: 0,
                limit: this.props.donations.donationsPerPage
            }, this.props.filter.orderByValue === 'Data publicare' ? 'data_publicare' : 'data_limita',
            this.props.filter.sort_type === 'Sortare ascendenta' ? 'asc' : ' desc')

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
                page: this.props.donations.currentPage,
                offset: 0,
                limit: this.props.donations.donationsPerPage
            }, orderByValue === 'Data publicare' ? 'data_publicare' : 'data_limita',
            sort_type === 'Sortare ascendenta' ? 'asc' : ' desc')

    };

    //this function will fetch donations after the type of donations changed
    //it will fetch the donations with default filter, after which it will set the default filters inside the store
    getDonationsForHeader = () => {
        this.props.getDonations({
                expired: false,
                available: false,
                fulfilled: false,
                unfulfilled: false,
                offset: 0,
                limit: this.props.donations.donationsPerPage
            }, 'data_limita', 'asc');

        this.props.resetFiltersAndOrder();
        this.props.updateCurrentPage(1);
    };

    render() {

        if (this.state.redirect) {
            this.setState({redirect: false});
            return <Redirect to='/'/>;
        }

        return (
          <div style={{width: '100%', position: 'relative'}}>

              <MobileFilterPanel
                  updateFilters={(filterName, value) => this.updateFilters(filterName, value)}
                  setOrderBy={(value) => this.setOrderBy(value, 'order')}
                  setSortBy={(value) => this.setOrderBy(value, 'sort')}
                  hidePanel={() => this.props.showOrHideMobileFilterPanel(false)}
                  panelShow={this.props.filter.showMobileFilterPanel}
                  filterContent={this.props.filter.filterContent}
                  orderBy={this.props.filter.orderByValue}
                  sort_type={this.props.filter.sort_type}
              />

              <div style={this.state.divContainerStyle}>

                      <Header getDonations={this.getDonationsForHeader} logout={this.props.logout}/>

                      <Switch>
                          <Route exact path='/' component={Home}/>
                          <Route path='/register' component={Register}/>
                          <Route path='/login' component={Login}/>
                          <Route path='/donations' component={Donation}/>
                          <Route path='/my_account' component={MyAccount}/>
                      </Switch>

                     {/* <Footer/>*/}

              </div>
          </div>
        );
  }
}

function mapStateToProps(state) {
    return {
        donations: state.donations,
        filter: state.filter,
        user: state.user
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getDonations: getDonations,
        showOrHideMobileFilterPanel: showOrHideMobileFilterPanel,
        setOrderBy: setOrderBy,
        setSortBy: setSortBy,
        setFilters: setFilters,
        logout: logout,
        updateUserState,
        resetFiltersAndOrder: resetFiltersAndOrder,
        updateCurrentPage: updateCurrentPage
    }, dispatch);
}


export default withRouter(connect(mapStateToProps, matchDispatchToProps)(App));