import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubAdminAuthComponent } from '../../components';
import history from '../../history';
import { adminLogin } from '../../store/actions';

class SubAdminAuthContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                email: "",
                password: ""
            }
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isAdminExist && props.isAdminProcessed) {
            history.push("/");
        }
        return false;
    }

    inputHadler = (value) => {
        this.setState({
            user: {
                ...this.state.user,
                [value.target.name]: value.target.value
            }
        });
    };

    onLogin = (e) => {
        e.preventDefault();
        if (this.state.user.email && this.state.user.password) {
            console.log(this.state.user);
            this.props.adminLogin(this.state.user);
        }
    };

    render() {
        return (
            <div>
                <SubAdminAuthComponent
                    inputHadler={this.inputHadler.bind(this)}
                    onLogin={this.onLogin.bind(this)}
                />
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    return {
        isAdminExist: props.admin.isAdminExist,
        isAdminProcessed: props.admin.isAdminProcessed,
    };
};


export default connect(mapStateToProps, { adminLogin })(SubAdminAuthContainer);
