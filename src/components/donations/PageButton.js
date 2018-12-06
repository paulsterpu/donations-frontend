import React, { Component } from 'react';

import '../../style/css/pagination.css';

export default class PageButton extends Component {

    constructor() {
        super();

        this.state = {
        }

    }

    render() {

        return (
            <div
                className={
                    this.props.breadcrumbs ? 'breadcrumbs' :
                    this.props.pageNumber === this.props.currentPage ? 'currentPageButton' : 'pageButtonContainer'
                }
                onClick={this.props.onClick}
            >
                <p>{this.props.pageNumber}</p>
            </div>
        )

    }

}
