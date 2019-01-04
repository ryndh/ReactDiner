import React, { Component } from 'react'

export default class Breakfast extends Component {
    constructor(props) {
        super(props)

        this.state = {
            menu: this.props.menu            
        }
    }
    onDragStart = (e, item) => {
        e.dataTransfer.setData('id', item);
    }

    render() {
        return (
            <div className='menu-container breakfast'>
                <h3 className='menu-heading'>Menu</h3>
                {this.state.menu.map((menuItem, index) => {
                    return (
                        <div
                            draggable
                            onDragStart={(e) => this.onDragStart(e, menuItem[0])}
                            className='menu-item bft'
                            key={index}>
                            <p>{menuItem[0]} -- {parseFloat(menuItem[1]).toFixed(2)}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}