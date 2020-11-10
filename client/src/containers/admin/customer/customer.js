import React, { Component } from "react";
import { CustomerListComponent } from "../../../components";
import { SingleUserData, customerActivation } from "../../../store/actions";
import { getStorage } from "../../../shared";
import { connect } from "react-redux";
import history from "../../../history";

class CustomerContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetched: false,
      customerid: "",
    };
  }

  doActivation(status, customer) {
    this.setState({ customerid: customer._id });
    const token = getStorage("token");
    const type = getStorage("type");
    const obj = {
      Authorization: `Bearer ${token}`,
      adminid: this.props.user._id || this.props.activeAdmin._id,
      status,
      userid: customer._id,
      type: "customer",
      name: customer.full_name,
      email: customer.email,
      admin_type : type,
    };
    this.props.customerActivation(obj);
  }

  viewDetails = (props) => {
    this.props.SingleUserData(props);
    history.push("/customerdetail");
  };

  render() {
    return (
      <div>
        <CustomerListComponent
          doActivation={this.doActivation.bind(this)}
          viewDetails={this.viewDetails.bind(this)}
          isLoading={this.props.isLoading}
          isActivation={this.props.isActivation}
          customers={this.props.customers}
          customerid={this.state.customerid}
          columns={this.state.columns}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ customers, auth, admin }) => {
  return {
    isLoading: customers.isLoading,
    customers: customers.customers,
    isActivation: customers.isActivation,
    activeAdmin: admin.activeAdmin,
    user: auth.user,
  };
};
export default connect(mapStateToProps, { SingleUserData, customerActivation })(
  CustomerContainer
);
