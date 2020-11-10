import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInprogressOrder, getCanceledOrder, getCompletedOrder } from '../../store/actions';

class RenderOrdersTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredOrders: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        let filteredOrders = [];
        filteredOrders = props.orders.filter((x) => x.order_status === props.statusType && (props.category !== "" ? x.menu_type === props.category : true) && (props.fromDate !== "" ? x.createdOn.substring(0, 10) >= props.fromDate : true) && (props.toDate !== "" ? x.createdOn.substring(0, 10) <= props.toDate : true));
        if (props.statusType === 'In Progress') {
            props.getInprogressOrder(filteredOrders);
        } else if (props.statusType === 'Canceled') {
            props.getCanceledOrder(filteredOrders);
        } else if (props.statusType === 'Completed') {
            props.getCompletedOrder(filteredOrders);
        }
        return { filteredOrders };
    }

    render() {
        return (
            this.state.filteredOrders.length ? this.state.filteredOrders.map((value, index) => {
                return (
                    <tr key={index}>
                        <td>{value.order_id}</td>
                        <td>{value.menu_type} </td>
                        <td>{!value.delivery ? "Pickup" : "Delivery"}</td>
                        <td>{value.pickuptime}</td>
                        <td>{value.payment_status}</td>
                        {value.order_status === "In Progress" ? <td><div className="form-group">
                            <select className="custom-select" name="" id={`order_status${value._id}`} onChange={() => this.props.changeStatus(value._id, value)} style={{ width: "120px", marginTop: "10px" }} defaultValue={value.order_status}>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed" >Completed</option>
                                <option value="Canceled" >Cancelled</option>
                            </select>
                        </div></td> :
                            <td>{value.order_status}</td>}
                        <td style={{ width: "10px" }}>{value.kitchen_name}</td>
                        <td className="action-icons">
                            <a
                                href='/#'
                                data-toggle="modal"
                                data-target="#orderDetailsModal"
                                onClick={() => this.props.viewDetails(value)}
                            >
                                <i className="fa fa-info-circle" aria-hidden="true"></i>
                            </a>
                        </td>

                    </tr>
                );
            }) : <tr><td colSpan="8" className="text-center">No Orders Yet</td></tr>
        );
    }
}
const mapStateToProps = ({ supplierKitchens, auth }) => {
    return {
        orders: supplierKitchens.orders,
        singleOrder: supplierKitchens.singleOrder,
        userID: auth.user._id,
        type: auth.user.type,
    };
};
export default connect(mapStateToProps, { getInprogressOrder, getCanceledOrder, getCompletedOrder })(RenderOrdersTable);
