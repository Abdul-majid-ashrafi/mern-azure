import React from 'react';
// import SupplierNavigationBar from '../navigationBar/supplierNav'
// import Pagination from '../pagination/pagination'
import { NavigationBar } from '..';
import { SupplierBoxesContainer } from '../../containers';

function SupplierHomeComponent(props) {
    return (
        <React.Fragment>
            <SupplierBoxesContainer orderStatusDetails={props.orderStatusDetails} />
            {props.status === "active"
                ? <NavigationBar />
                : <h1 style={{ textAlign: 'center', fontSize: '26px', margin: '40px' }}>Please Contact Admin</h1>
            }
        </React.Fragment>
    );
}
export default SupplierHomeComponent;