import React, { Component } from 'react';
import { CustomerDetailsComponent } from '../../../components'
import { connect } from 'react-redux';
import history from '../../../history'


class CustomerDetailsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        if (!this.props.singleUserData.is_online) {
            history.goBack();
        }
    }

    render() {
        return (
            <div>
                <CustomerDetailsComponent singleUserData={this.props.singleUserData} />
            </div>
        )
    }
}

const mapStateToProps = ({ customers }) => {
    return {
        isLoading: customers.isLoading,
        singleUserData: customers.singleUserData,
    }
}
export default connect(mapStateToProps, null)(CustomerDetailsContainer);
