import React, { Component } from 'react'

export default class Home extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='home-wrap'>
                <div className='home'>
                    <h1 className='home-heading'>Welcome to the Diner!</h1>
                    <p>Feel free to browse our menus and place your order to the right! When you're ready, press the checkout button to finish!</p></div>
            </div>
        )
    }
}