import React from 'react';
import { NavigationBar } from '../..';
import { CustomerContainer, SupplierContainer, TransactionContainer } from '../../../containers'
import AdminBoxesContainer from '../../../containers/header/adminBoxes';

const UsersListComponent = (props) => {
    return (
        <React.Fragment>
            <AdminBoxesContainer />
            <NavigationBar />
            <div className="container px-5 mt-3">
                <div className="bs-example">
                    <ul className="nav nav-tabs noBorder">
                        <li className="nav-item">
                            <a href="#customerList" className="order-nav-link active" data-toggle="tab">Customer List</a>
                        </li>
                        <li className="nav-item">
                            <a href="#supplierList" className="order-nav-link" data-toggle="tab">Kitchens List</a>
                        </li>
                        <li className="nav-item">
                            <a href="#transactionList" className="order-nav-link" data-toggle="tab">Transaction List</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="customerList">
                            <CustomerContainer />
                        </div>
                        <div className="tab-pane fade show" id="supplierList">
                            <SupplierContainer />
                        </div>
                        <div className="tab-pane fade show" id="transactionList">
                            <TransactionContainer />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default UsersListComponent;