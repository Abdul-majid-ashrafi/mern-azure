import React, { Component } from 'react'
import { OrdersComponent } from '../../components'

export class OrdersContainer extends Component {
    render() {
        return (
            <React.Fragment>
                <OrdersComponent />
            </React.Fragment>
        )
    }
}

export default OrdersContainer
