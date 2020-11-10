import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminBoxComponent } from '../../components';
export class AdminBoxesContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalorders: 0
        };
    }


    static getDerivedStateFromProps(props, state) {
        let totalorders = 0;
        totalorders = props.inProgressOrderforAdmin.length + props.completeOrderforAdmin.length + props.canceledOrderForAdmin.length;
        return { totalorders };
    }

    render() {
        return (
            <div>
                <AdminBoxComponent
                    orderStatusDetails={this.props.orderStatusDetails}
                    customers={this.props.customers}
                    totalorders={this.state.totalorders}
                    suppliers={this.props.suppliers}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ supplierKitchens, suppliers, customers }) => {
    return {
        orderStatusDetails: supplierKitchens.orderStatusDetails,
        suppliers: suppliers.suppliers,
        customers: customers.customers,
        inProgressOrderforAdmin: supplierKitchens.inProgressOrderforAdmin,
        completeOrderforAdmin: supplierKitchens.completeOrderforAdmin,
        canceledOrderForAdmin: supplierKitchens.canceledOrderForAdmin,
    };
};

export default connect(mapStateToProps, {})(AdminBoxesContainer);
