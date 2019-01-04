import React, { Component } from 'react'

export default class Drinks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menu: this.props.menu
        }
    }

    componentWillUnmount(){
        this.setState({leaving: true})
    }
    onDragStart = (e, item) => {
        e.dataTransfer.setData('id', item);
    }

    render() {
        return (
            <div className='menu-container drinks'>
                <h3 className='menu-heading'>Menu</h3>
                {this.state.menu.map((menuItem, index) => {
                    return (
                        <div
                            draggable
                            onDragStart={(e) => this.onDragStart(e, menuItem[0])}
                            className='menu-item drk'
                            key={index}>
                            <p>{menuItem[0]} -- {parseFloat(menuItem[1]).toFixed(2)}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}