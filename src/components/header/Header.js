import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import SearchBar from './SearchBar';

import '../../style/css/header.css'
import Menu from "./Menu";

import burger from '../../images/burger.png';
import x from '../../images/x.png';

export default class Header extends Component {

    constructor() {
        super();

        this.state = {
            donationType: {
                offer: 0,
                request: 1
            },
            showMenu: false,
            showMobileMenu: false
        }

    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
    };

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);

        localStorage.getItem('donationsType') === 'offers' ? this.setState({donationType: {request: 0, offer: 1}}) : this.setState({donationType: {request: 1, offer: 0}});

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {

        console.log(this.state.width)

        return (
            <div className="headerMainContainer">

                <div className='headerInnerContainer'>

                    <img
                        src={this.state.showMobileMenu ? x : burger}
                        className='menuDropdownIcon'
                        onClick={() => this.setState({showMobileMenu: !this.state.showMobileMenu})}
                    />

                    {
                        this.state.showMobileMenu && this.state.width < 767 &&
                        <Menu showMobileMenu={this.state.showMobileMenu} />
                    }

                    <Link to='/' className='linkToHomePage'><h3 className='title'>Donații</h3></Link>

                    <SearchBar/>

                    {
                        (!this.state.showMobileMenu || this.state.width > 767) &&

                        <nav>
                            {
                               this.links()
                            }
                        </nav>

                    }
                </div>

                <div className='menuHeader'>

                    <div className='container1'>
                        <div className='categoriesDropdown' onMouseEnter={() => this.setState({showMenu: true})} onMouseLeave={() => this.setState({showMenu: false})}>

                            <img src={burger} className='categoriesDropdownIcon'/>

                            <span className='categoriesDropdownTitle'>
                                CATEGORII
                            </span>

                            <Menu showMenu={this.state.showMenu}/>

                        </div>

                    </div>

                </div>

            </div>
        )
    }

 links = () => {
  return  (
      <ul className='linksContainer'>
          <li>
              <div className='requestLogoContainer'/>

              <div className='menuDropdownContainer'>
                  {
                      this.donationDropdown()
                  }
              </div>

              <span className='navEntryMenu'>{this.state.donationType.offer ? 'Oferte' : 'Cereri'}</span>
              <span className="caret navEntryDropwdownArrow"/>
          </li>
          <li>
              <div className='userLogoContainer'/>

              <div className='menuDropdownContainer'>
                  {
                      localStorage.getItem('user_id') && this.authenticatedAccountDropdown()
                  }

                  {
                      !localStorage.getItem('user_id') && this.unauthenticatedAccountDropdown()
                  }

              </div>
              <span className='navEntryMenu myAccountEntryMenu'>Contul meu</span>
              <span className="caret navEntryDropwdownArrow"/>
          </li>
      </ul>
  )
};

 unauthenticatedAccountDropdown = () => {

    return (
        <div className='menuDropdown' id='myAccountDropdown'>
            <div className="topArrow"/>
            <div className='dropdownHeader'>
                <div className='dowpdownUserLogo'/>
                <span className='dropdownMessage'>Intra in contul tau sau creaza un cont nou</span>
            </div>

            <div className='dropdownFooter'>
                <Link to='/login' className='loginButton'>
                    <div className='overlay'/>
                    <div className='loginButtonLogo'/>
                    <span className='loginButtonMessage'>Intra in cont</span>
                </Link>

                <Link to='/register' className='newAccountButton'>Cont nou</Link>

            </div>
        </div>
    )

};

authenticatedAccountDropdown = () => {
    return (
        <div className='authenticatedAccountDropdown'>
            <div className="topArrow"/>

            <p className='helloAccountMessage'>Salut, {localStorage.getItem('name')}</p>

            <ul className='authenticatedAccountLinksList'>
                <li>
                    <Link to='/my_offers'>Ofertele mele</Link>
                </li>
                <li>
                    <Link to='/my_requests'>Cererile mele</Link>
                </li>
                <li>
                    <Link to='/my_applications'>Aplicatiile mele</Link>
                </li>
                <li>
                    <Link to='/my_account'>Contul meu</Link>
                </li>
                <li onClick={this.props.logout}>
                    <span className='logoutButton'>Log out</span>
                </li>
            </ul>

        </div>
    )
};

 donationDropdown = () => {

     return (
         <div className='menuDropdown' id='donationDropdown'>
             <div className="topArrow"/>
             <div className='dropdownHeader'>
                 <div className='dowpdownDonationLogo'/>
                 <span className='dropdownMessage'>Alege tipul de donatii pe care il cauti</span>
             </div>

             <div className='dropdownFooter donationDropdownFooter'>

                 <button
                     className={this.state.donationType.request ? 'donationChoiceButton donationChoiceButtonHover' : 'donationChoiceButton'}
                     //className='donationChoiceButton'
                     onClick={() => {
                         this.setState({donationType: {request: 1, offer: 0}});
                         localStorage.setItem('donationsType', 'requests');
                         this.props.getDonations();
                     }}
                 >
                     <span className='donationChoiceMessage'>Cereri</span>
                 </button>

                 <button
                     className={this.state.donationType.offer ? 'donationChoiceButton donationChoiceButtonHover' : 'donationChoiceButton'}
                     //className='donationChoiceButton'
                     onClick={() => {
                         this.setState({donationType: {request: 0, offer: 1}});
                         localStorage.setItem('donationsType', 'offers');
                         this.props.getDonations();
                     }}
                 >
                     <span className='donationChoiceMessage'>Oferte</span>
                 </button>

             </div>
         </div>
     )
 }

};