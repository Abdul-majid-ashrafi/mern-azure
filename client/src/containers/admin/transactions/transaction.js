import React, { Component } from 'react'
import { connect } from 'react-redux'
import TransactionsComponent from '../../../components/admin/transactions/transaction'
import { getSingleOrder } from '../../../store/actions';

export class TransactionContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             orders : []
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.orders !== prevState.orders){
            return {orders : nextProps.orders}
        }
        return null;
    }
    
    render() {
        return (
            <div>
                <TransactionsComponent orders={this.state.orders} getSingleOrder={this.props.getSingleOrder} singleOrder={this.props.singleOrder} />
            </div>
        )
    }
}

const mapStateToProps = ({supplierKitchens}) => {
    return {
        orders : supplierKitchens.orders,
        singleOrder: supplierKitchens.singleOrder
    }
}

export default connect(mapStateToProps, { getSingleOrder })(TransactionContainer)
