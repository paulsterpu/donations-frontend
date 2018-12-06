import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {fetchUserDetails} from "../../actions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import "../../style/css/myAccount.css";
import AccountData from "./AccountData";

class MyAccount extends Component {

    constructor() {
        super();

        this.state = {
            selectedEntry: "Contul meu",
            userDetails: {}
        }
    }

    componentWillMount() {
        this.props.fetchUserDetails();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.user && newProps.user.userDetails) {
            this.setState({userDetails: newProps.user.userDetails});
        }
    }

    validateDate = () => {

        if (!this.state.userDetails.nume || this.state.userDetails.nume.length < 4) {

            return false;
        }

        if (!this.state.userDetails.telefon || this.state.userDetails.telefon.length < 4) {

            return false;
        }


        return true;

    };

    submitData = (e) => {
        e.preventDefault();

        if (this.validateDate) {

        }
    };

    render() {

        return (
            <div className="myAccountContainer">
                <div className="myAccountEntriesContainer">
                    <ul className="myAccountEntries">
                        {
                            [
                                "Ofertele mele",
                                "Cererile mele",
                                "Aplicatiile mele",
                                "Contul meu"
                            ].map(function (entry) {
                                return <li className="myAccountEntry">
                                    {entry}
                                </li>
                            })
                        }
                    </ul>
                </div>

                <div className="myAccountContentContainer">
                    <p className="myAccountEntryTitle">{this.state.selectedEntry}</p>

                    <div className="myAccountContent">
                        {
                            this.state.selectedEntry === "Contul meu" && this.myAccount()
                        }
                        {
                            this.state.selectedEntry === "Contul meu" && this.myAddress()
                        }
                    </div>
                </div>

            </div>
        )

    }

    myAccount = () => {
        return (
            <AccountData
                user={this.state.userDetails}
                updateData={(field, value) => this.setState({userDetails: Object.assign({}, this.state.userDetails, {[field]: value})})}
                submitData={this.submitData}
            />
        )
    };

    myAddress = () => {

        return <div>

        </div>
    };

}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserDetails: fetchUserDetails
    }, dispatch);
}


export default withRouter(connect(mapStateToProps, matchDispatchToProps)(MyAccount));