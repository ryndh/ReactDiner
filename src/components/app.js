import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Breakfast from './breakfast';
import Lunch from './lunch';
import Dinner from './dinner';
import Drinks from './drinks';
import Home from './home';

export default class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entireMenu: [
        ['Burger', 4.50, 'dnr'],
        ['Fries', 2.00, 'dnr'],
        ['Steak', 10.00, 'dnr'],
        ['Salad', 7.00, 'dnr'],
        ['Vegetable Side', 3.00, 'dnr'],
        ['Salmon', 9.00, 'dnr'],
        ['Pancakes', 4.50, 'bft'],
        ['Waffles', 4.50, 'bft'],
        ['Bacon', 2.00, 'bft'],
        ['Oatmeal', 3.00, 'bft'],
        ['Fruit Cup', 3.00, 'lch'],
        ['PB & J Sandwich', 4.50, 'lch'],
        ['Turkey Sandwich', 4.00, 'lch'],
        ['Lunch Salad', 6.00, 'lch'],
        ['Fruit Cup', 3.00, 'lch'],
        ['Soda', 1.50, 'drk'],
        ['Juice', 2.00, 'drk'],
        ['Chocolate Milk', 2.00, 'drk'],
        ['Smoothie', 2.50, 'drk'],
      ],
      userCart: [],
      userTotal: 0,
      showModal: false,
    }
  }



  onDragOver = (e) => {
    e.preventDefault()
  }


  onDrop = e => {
    let id = e.dataTransfer.getData('id')
    let userItem = this.state.entireMenu.filter((item) => item[0] == id)
    let realItem = [...userItem.pop(), (this.state.userCart.length + 1)]
    let updatedList = [...this.state.userCart, realItem]
    let updatedTotal = this.state.userTotal + realItem[1]
    console.log(realItem)

    this.setState({
      userCart: updatedList,
      userTotal: updatedTotal,
    })
  }


  reset = () => {
    this.setState({
      userCart: [],
      userTotal: 0,
    })
  }

  remover = menuItem => {
    let newUserCart = this.state.userCart.filter((item) => item != menuItem)
    let updatedTotal = this.state.userTotal - menuItem[1]
    this.setState({
      userCart: newUserCart,
      userTotal: updatedTotal,
    })
  }

  closeOut = () => {
    this.setState({ showModal: false })
  }

  render() {

    return (
      <div className='restaurant'>
        <div className={this.state.showModal ? 'checkout-modal-show' : 'checkout-modal-hidden'} onClick={this.closeOut}>
          <div className='inner-modal'>
            <div>Your total is: ${this.state.userTotal.toFixed(2)}</div>
            <div className='close'>x</div>
          </div>
        </div>
        <div className='menu-header'>
          <Link className='link home-link' to='/'>Welcome!</Link>
          <Link className='link' to='/breakfast'>Breakfast</Link>
          <Link className='link' to='/lunch'>Lunch</Link>
          <Link className='link' to='/dinner'>Dinner</Link>
          <Link className='link' to='/drinks'>Drinks</Link>
        </div>
        <div className='menu-container-wrap'>
          <Route exact path='/' component={Home} />
          <Route path='/breakfast' render={()=> <Breakfast menu={this.state.entireMenu.filter((item) => item[2] == 'bft')}/>} />
          <Route path='/lunch' render={()=> <Lunch menu={this.state.entireMenu.filter((item) => item[2] == 'lch')}/>} />
          <Route path='/dinner' render={()=> <Dinner menu={this.state.entireMenu.filter((item) => item[2] == 'dnr')}/>} />
          <Route path='/drinks' render={()=> <Drinks menu={this.state.entireMenu.filter((item) => item[2] == 'drk')}/>} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.setState({ showModal: true })
          }}
          className='user-cart-container'>
          <div className='user-cart'
            onDragOver={this.onDragOver}
            onDrop={this.onDrop}>
            <h1 className='order-heading'>Order</h1>
            <div className='drop-here'>{this.state.userCart.length > 0 ? null : 'Drag Items Here'}</div>
            {this.state.userCart.map((userMenuItem, index) => {
              return (
                <div
                  className={`user-cart-item ${userMenuItem[2]} ${this.state.showModal ? 'leave': ''}`}
                  key={index}>
                  <p>{userMenuItem[0]} -- {parseFloat(userMenuItem[1]).toFixed(2)}</p>
                  <i className="far fa-times-circle" onClick={() => this.remover(userMenuItem)}></i>
                </div>
              )
            })}
          </div>

          <div className='buttons'>
            <button type='submit'>Checkout</button>
            <div className='menu-total'>Current Total: ${this.state.userTotal.toFixed(2)}</div>
            <button onClick={this.reset} type='reset'>Reset Order</button>
          </div>
        </form>
      </div>

    );
  }
}
