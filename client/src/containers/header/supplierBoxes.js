import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SupplierBoxComponent } from '../../components';

class SupplierBoxesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ordersFlag: false,
            orders: {
                earningRecieved: 0,
                earningPending: 0,
                earningTotal: 0,
                canceledOrder: 0,
                completeOrder: 0,
                inProgressOrder: 0,
                totalOrder: 0
            }
        };
    }

    static getDerivedStateFromProps(props, state) {
        let earningRecieved = 0;
        let earningPending = 0;
        for (let i = 0; i < props.completeOrder.length; i++) {
            const order = props.completeOrder[i];
            earningRecieved += order.price;
        }
        for (let i = 0; i < props.inProgressOrder.length; i++) {
            const order = props.inProgressOrder[i];
            earningPending += order.price;
        }
        let ordersFlag = false;
        for (const key in state.orders) {
            if (state.orders.hasOwnProperty(key)) {
                const element = state.orders[key];
                if (element) {
                    ordersFlag = true;
                }
            }
        }
        return {
            ordersFlag,
            orders: {
                earningRecieved,
                earningPending,
                earningTotal: earningRecieved + earningPending,
                canceledOrder: props.canceledOrder.length,
                completeOrder: props.completeOrder.length,
                inProgressOrder: props.inProgressOrder.length,
                totalOrder: props.inProgressOrder.length + props.completeOrder.length + props.canceledOrder.length,
            }
        };
    }
    render() {
        return (
            <div>
                <SupplierBoxComponent
                    orderStatusDetails={this.props.orderStatusDetails}
                    orders={this.state.orders}
                    ordersFlag={this.state.ordersFlag}
                />
            </div>
        );
    }
}


const mapStateToProps = (props) => {
    return {
        orderStatusDetails: props.supplierKitchens.orderStatusDetails,
        canceledOrder: props.supplierKitchens.canceledOrder,
        completeOrder: props.supplierKitchens.completeOrder,
        inProgressOrder: props.supplierKitchens.inProgressOrder
    };
};
export default connect(mapStateToProps, {})(SupplierBoxesContainer);
