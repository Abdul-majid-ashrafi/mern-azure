import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AdminGridComponent } from '../../../components';
import history from '../../../history';
import { getStorage } from '../../../shared';
import { setSubAdmin, subAdminActivation, selectedSubAdminData } from '../../../store/actions';


export class AdminGridContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admins: [],
            subAdmins: [],
            admin: {
                full_name: "",
                email: "",
                mobile_number: 0,
                password: "",
                address: "",
            }
        };
    }

    static getDerivedStateFromProps(props, state) {
        let subAdmins = [];
        subAdmins = props.subAdmins;
        return { subAdmins };
    }

    handleChange = e => {
        this.setState({
            admin: {
                ...this.state.admin,
                [e.target.name]: e.target.value
            }
        });
    };

    createAdmin = e => {
        e.preventDefault();
        const obj = { ...this.state.admin, type: "sub_admin" };
        const token = getStorage("token");
        this.props.setSubAdmin(obj, token);
    };

    adminActivation = (subAdminID, status) => {
        const token = getStorage("token");
        this.setState({ subAdminID });
        if (this.props.userid && subAdminID) {
            const headers = {
                userid: subAdminID,
                adminid: this.props.userid,
                Authorization: `Bearer ${token}`,
                status,
                type: "sub_admin",
            };
            this.props.subAdminActivation(headers);
        }
    };

    viewDetails = (props) => {
        this.props.selectedSubAdminData(props);
        history.push("/subadmindetail");
    };

    render() {
        return (
            <div>
                <AdminGridComponent
                    handleChange={this.handleChange.bind(this)}
                    createAdmin={this.createAdmin.bind(this)}
                    adminActivation={this.adminActivation.bind(this)}
                    viewDetails={this.viewDetails.bind(this)}
                    isSubAdminFetching={this.props.isSubAdminFetching}
                    isSubAdminActivating={this.props.isSubAdminActivating}
                    isAdminCreating={this.props.isAdminCreating}
                    subAdmins={this.state.subAdmins}
                    subAdminID={this.state.subAdminID}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ admin, auth }) => {
    return {
        userid: auth.user && auth.user._id,
        subAdmins: admin.subAdmins,
        isSubAdminCreating: admin.isSubAdminCreating,
        isSubAdminFetching: admin.isSubAdminFetching,
        isSubAdminActivating: admin.isSubAdminActivating
    };
};

export default connect(mapStateToProps, { setSubAdmin, subAdminActivation, selectedSubAdminData })(AdminGridContainer);
