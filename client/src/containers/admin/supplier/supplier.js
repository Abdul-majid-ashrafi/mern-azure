import React, { Component } from "react";
import { SupplierListComponent } from "../../../components";
import { SelectedSupplier } from "../../../store/actions";
import { supplierActivation } from "../../../store/actions";
import { getStorage } from "../../../shared";
import { connect } from "react-redux";
import history from "../../../history";

class SupplierContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetched: false,
      supplierid: "",
    };
  }

  doActivation(status, supplier, statusType) {
    this.setState({ supplierid: supplier._id });
    const token = getStorage("token");
    const type = getStorage("type");
    const obj = {
      Authorization: `Bearer ${token}`,
      adminid: this.props.user._id || this.props.activeAdmin._id,
      status,
      userid: supplier._id,
      type: "supplier",
      name: supplier.business,
      email: supplier.email,
      statusType,
      admin_type : type,
    };

    this.props.supplierActivation(obj);
  }

  viewDetails = (props) => {
    this.props.SelectedSupplier(props);
    history.push("/supplierdetail");
  };

  statusSelection = (value) => {
    let status = value;
    if (status === "all") {
      status = "none";
    }

    if (this.props.user._id) {
      const token = getStorage("token");
      const obj = {
        Authorization: `Bearer ${token}`,
        userid: this.props.user._id,
        status: status,
        type: "supplier",
      };
      this.props.fetchSupplier(obj);
    }
  };

  render() {
    return (
      <div>
        <SupplierListComponent
          statusSelection={this.statusSelection.bind(this)}
          supplierid={this.state.supplierid}
          isActivation={this.props.isActivation}
          suppliers={this.props.suppliers}
          doActivation={this.doActivation.bind(this)}
          viewDetails={this.viewDetails.bind(this)}
          isSupplierLoad={this.props.isSupplierLoad}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ suppliers, auth, admin }) => {
  return {
    isActivation: suppliers.isActivation,
    isSupplierLoad: suppliers.isSupplierLoad,
    suppliers: suppliers.suppliers,
    user: auth.user,
    activeAdmin: admin.activeAdmin,
  };
};
export default connect(mapStateToProps, { supplierActivation, SelectedSupplier })(
  SupplierContainer
);
