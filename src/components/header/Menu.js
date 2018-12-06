import React, { Component } from 'react';

import '../../style/css/menu.css'

import backpack from '../../images/backpack.png';
import book from '../../images/book.png';
import car from '../../images/car.png';
import electronics from '../../images/electronics.png';
import food from '../../images/food.png';
import furniture from '../../images/furniture.png';
import help from '../../images/help.png';
import house from '../../images/house.png';
import jewlry from '../../images/jewlry.png';
import kid from '../../images/kid.png';
import sport from '../../images/sport.png';
import clothes from '../../images/clother.png';

export default class Menu extends Component {


    constructor() {
        super();

        this.state = {
            hoveredEntry: 'Carti'
        }
    }

    render() {

        console.log(this.props.showMenu);

       return (
            <div className={this.props.showMenu ? 'showMenuContainer' : (this.props.showMobileMenu ? 'showMobileMenuContainer' : 'hideMenuContainer')}>

                {
                    this.props.showMobileMenu &&

                    <div className='mobileMenuOverlay'/>
                }

                <div className='entriesContainer'>
                    <ul className='menuEntriesContainer'>
                    {
                        [
                            {
                                name: 'Carti',
                                icon: book,
                                backgroundImageClass: 'bookImageContainer'
                            },
                            {
                                name: 'Rechizite',
                                icon: backpack,
                                backgroundImageClass: 'bookImageContainer'
                            },
                            {
                                name: 'Haine',
                                icon: clothes,
                                backgroundImageClass: 'clothesBackground'
                            },
                            {
                                name: 'Mobila',
                                icon: furniture,
                                backgroundImageClass: 'bookImageContainer'
                            },
                            {
                                name: 'Casa si Gradina',
                                icon: house,
                                backgroundImageClass: 'bookImageContainer'
                            },
                            {
                                name: 'Electronice si Electrocasnice',
                                icon: electronics,
                                backgroundImageClass: 'bookImageContainer'
                            },
                            {
                                name: 'Alimente',
                                icon: food,
                                backgroundImageClass: 'bookImageContainer'
                            },
                            {
                                name: 'Ajutor munca fizica',
                                icon: help,
                                backgroundImageClass: 'bookImageContainer'
                            },
                            {
                                name: 'Automobile',
                                icon: car,
                                backgroundImageClass: 'bookImageContainer'
                            },
                            {
                                name: 'Articole sportive',
                                icon: sport,
                                backgroundImageClass: 'bookImageContainer'
                            },
                            {
                                name: 'Bijuterii',
                                icon: jewlry,
                                backgroundImageClass: 'bookImageContainer'
                            },
                            {
                                name: 'Pentru copii',
                                icon: kid,
                                backgroundImageClass: 'bookImageContainer'
                            }
                        ].map(function (entry) {

                            return (
                                <li className='entry' onMouseEnter={() => this.setState({backgroundImageClass: entry.backgroundImageClass})}>
                                    <img src={entry.icon} className='entryLogo'/>
                                    <span className='entryName'>
                                        {entry.name}
                                    </span>
                                </li>
                            )
                        }.bind(this))
                    }
                    </ul>
                </div>

                {
                    !this.props.showMobileMenu &&

                    <div className={'imagesContainer ' + this.state.backgroundImageClass}/>

                }
            </div>
       )

    }


}