import React, { Component } from 'react';
import { SubAdminDetailsComponent } from '../../../components';
import { connect } from 'react-redux';
// import history from '../../../history';


class SubAdminDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    // componentDidMount() {
    //     if (!this.props.selectedSubAdmin.is_online) {
    //         history.goBack();
    //     }
    // }

    render() {
        return (
            <div>
                <SubAdminDetailsComponent
                    selectedSubAdmin={this.props.selectedSubAdmin}
                />
            </div>
        );
    }
}

const mapStateToProps = (props) => {
    return {
        selectedSubAdmin: props.admin.selectedSubAdmin
    };
};
export default connect(mapStateToProps, {})(SubAdminDetailsContainer);
