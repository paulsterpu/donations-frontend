import React, { Component } from 'react';

import '../../style/css/pagination.css';

export default class PreviousPage extends Component {

    constructor() {
        super();

        this.state = {
        }

    }

    render() {

        return (
            <div
                className={this.props.inactive ? 'previousPageContainer inactiveButtonPageNumber' : 'previousPageContainer'}
                onClick={this.props.onClick}
            >
                Pagina precedenta
            </div>
        )

    }

}
