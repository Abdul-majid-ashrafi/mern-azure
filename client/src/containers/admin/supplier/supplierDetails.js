import React, { Component } from 'react';
import { SupplierDetailsComponent } from '../../../components';
import { connect } from "react-redux";
import history from '../../../history';
import { supplierFeatured } from '../../../store/actions';
import { getStorage } from '../../../shared';

class SupplierDetailsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSupplier: {}
        };
    }


    static getDerivedStateFromProps(props, state) {
        if (!props.selectedSupplier.is_online) {
            history.goBack();
        }
        let selectedSupplier = props.selectedSupplier;
        return { selectedSupplier };
    }
    componentDidMount() {
        if (!this.state.selectedSupplier.is_online) {
            history.goBack();
        }
    }

    isFeatured = (user) => {
        // console.log(user);
        const token = getStorage("token");
        const obj = {
            Authorization: `Bearer ${token}`,
            userid: user._id,
            featured: true,
            adminid: this.props.adminid
        };
        this.props.supplierFeatured(obj);
    };
    isUnFeatured = (user) => {
        const token = getStorage("token");
        const obj = {
            Authorization: `Bearer ${token}`,
            userid: user._id,
            featured: false,
            adminid: this.props.adminid
        };
        this.props.supplierFeatured(obj);
    };

    render() {
        // console.log(this.props.selectedSupplier);
        return (
            <div>
                <SupplierDetailsComponent
                    singleUserData={this.props.singleUserData}
                    isFeatured={this.props.isFeatured}
                    selectedSupplier={this.state.selectedSupplier}
                    featured={this.isFeatured.bind(this)}
                    isUnFeatured={this.isUnFeatured.bind(this)}
                />
            </div>
        );
    }
}
const mapStateToProps = ({ auth, suppliers }) => {
    return {
        adminid: auth.user._id,
        isFeatured: suppliers.isFeatured,
        selectedSupplier: suppliers.selectedSupplier,
    };
};
export default connect(mapStateToProps, { supplierFeatured })(SupplierDetailsContainer);

