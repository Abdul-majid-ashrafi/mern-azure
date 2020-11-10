import React, { Component } from 'react';
import { SupplierHomeComponent } from '../../components';
import { connect } from 'react-redux'

class SupplierHomeContainer extends Component {
    render() {
        return (
            <div>
                <SupplierHomeComponent
                    status={this.props.status}
                    orderStatusDetails={this.props.orderStatusDetails}
                />
            </div>
        )
    }
}

const mapStateToProps = (props) => {
    return {
        status: props.auth.user.status,
        orderStatusDetails: props.supplierKitchens.orderStatusDetails,
    }
};
export default connect(mapStateToProps, {})(SupplierHomeContainer);
