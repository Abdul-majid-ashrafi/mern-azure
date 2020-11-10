import React, { Component } from 'react';
import { connect } from 'react-redux';
import { totalOrdersForAdmin } from '../../../store/actions';
class RenderOrdersTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredOrders: [],
        };
    }

    static getDerivedStateFromProps(props, state) {
        let filteredOrders = [];
        filteredOrders = props.orders.filter((x) => x.order_status === props.statusType && (props.category !== "" ? x.menu_type === props.category : true) && (props.fromDate !== "" ? x.createdOn.substring(0, 10) >= props.fromDate : true) && (props.toDate !== "" ? x.createdOn.substring(0, 10) <= props.toDate : true));
        props.totalOrdersForAdmin(props.statusType, filteredOrders);
        return { filteredOrders };
    }

    render() {
        return (
            this.state.filteredOrders.length ? this.state.filteredOrders.map((value, index) => {
                return (
                    <tr key={index}>
                        <td style={{ wordWrap: "anywhere" }}>{value.order_id}</td>
                        <td>{!value.delivery ? "Pickup" : "Delivery"}</td>
                        <td>{value.order_status}</td>
                        <td>{value.kitchen_name}</td>
                        <td className="action-icons text-center">
                            {/* <a
                            data-toggle="modal"
                            data-target="#orderDetailsModal"
                            onClick={() => viewDetails(value)}
                        > */}
                            <i
                                className="fa fa-info-circle"
                                data-toggle="modal"
                                data-target="#orderDetailsModal"
                                onClick={() => this.props.viewDetails(value)}
                                aria-hidden="true"
                                style={{ cursor: "pointer" }}
                            >

                            </i>
                            {/* </a> */}
                        </td>

                    </tr>
                );
            }) : <tr><td colSpan="8" className="text-center">No Orders Yet</td></tr>
        );
    }
}
const mapStateToProps = ({ supplierKitchens }) => {
    return {
        orders: supplierKitchens.orders,
    };
};
export default connect(mapStateToProps, { totalOrdersForAdmin })(RenderOrdersTable);
