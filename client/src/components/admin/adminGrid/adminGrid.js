import React, { useEffect } from 'react';
import '../style.css';
import AdminHeaderComponent from '../adminHeader/AdminHeader';
import Scrollbars from 'react-custom-scrollbars';
import iconPlus from '../../../images/icons/circle-plus.png';
import headingBorder from '../../../images/horizontalLine.png';



const AdminGridComponent = (props) => {

    useEffect(() => {
        let li = document.getElementsByClassName('order-nav-link');
        for (let i = 0, j = 1; i < li.length; i++, j++) {
            if (li[i].classList.contains("active")) {
                let j = i - 1;
                if (j < 0) {
                } else {
                    li[j].classList.add('border-none');
                }
            } else {
            }
        }

    });

    const TableBody = ({ statusType }) => {
        let filteredList = props.subAdmins.filter(x => x.status === statusType);
        return filteredList.map((items, index) => {
            return <tr key={index} className='customer-table-body'>
                <td data-label="full_name" style={{ wordWrap: "anywhere" }}>{items.full_name}</td>
                <td data-label="email" style={{ wordWrap: "anywhere" }}>{items.email}</td>
                <td data-label="mobile_number" style={{ wordWrap: "anywhere" }}>{items.mobile_number}</td>
                <td data-label="address" style={{ wordWrap: "anywhere" }}>{items.address}</td>
                <td data-label="Activation" style={{ wordWrap: "anywhere" }}>
                    {(props.isSubAdminActivating && props.subAdminID === items._id)
                        ? <div className="d-flex justify-content-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        : <button onClick={() => props.adminActivation(items._id, items.status === 'inactive' ? "active" : "inactive")} className={items.status === 'inactive' ? 'btn btn-primary' : 'btn btn-danger'}>
                            {items.status === 'inactive' ? 'Active' : 'inActive'}
                        </button>}
                </td>
                <td>
                    <i onClick={() => props.viewDetails(items)} className='fa fa-id-card-o' style={{ fontSize: "30px", cursor: "pointer" }} aria-hidden='true'></i>
                </td>
            </tr>;
        });
    };
    return (
        <React.Fragment>
            <AdminHeaderComponent />
            {(props.isSubAdminFetching) ?
                <div className="text-center loader-alignment" style={{ top: '55%' }}>
                    <div className='form-check form-check-inline'>
                        <span style={{ width: '3rem', height: "3rem" }} className='spinner-border myInput text-primary spinner-border-sm'></span>
                    </div>
                </div>
                :
                <React.Fragment>
                    <div className="container px-5 mt-3">
                        <div className="row">
                            <div className="col-md-12">
                                <a href='/#' data-toggle="modal" className="my-1" data-target="#createAdmin">
                                    <img src={iconPlus} alt="" className="addAdmin" />
                                </a>
                            </div>
                        </div>
                        <div className="modal" id="createAdmin" >
                            <div className="modal-dialog">
                                <div className="modal-content" style={{ width: '1200px', right: '65%', margin: "8vh auto", background: '#f7f7f7' }}>
                                    {/* <!-- Modal body --> */}
                                    <div className="modal-body">
                                        <div className='container'>
                                            <form id='adminForm' method="POST" onSubmit={props.createAdmin}>
                                                <div className="row pl-5 pr-5 ">
                                                    <div className='col-md-3'></div>
                                                    <div className='col-md-12 text-center'>
                                                        <p className="form-heading" style={{ marginTop: "17px" }}><b>Sub Admin</b> Registration</p>
                                                        <img src={headingBorder} alt='' className="img-fluid" />
                                                    </div>
                                                    <div className="col-md-6 input">
                                                        <label htmlFor="full_name"><h5> Full Name<span className="required">*</span></h5></label>
                                                        <input onChange={props.handleChange} required name='full_name' type="text" className="form-control" id="full_name" />
                                                    </div>
                                                    <div className="col-md-6 input">
                                                        <label htmlFor="email"><h5> Email<span className="required">*</span></h5></label>
                                                        <input onChange={props.handleChange} required name='email' type="email" className="form-control" id="email" />
                                                    </div>
                                                    <div className="col-md-6 input">
                                                        <label htmlFor="mobile_number"><h5> Mobile Number<span className="required">*</span></h5></label>
                                                        <input required type="number" min="0" onChange={props.handleChange} name="mobile_number" id="mobile_number" className="form-control" />
                                                    </div>
                                                    <div className="col-md-6 input">
                                                        <label htmlFor="password"><h5> Password<span className="required">*</span></h5></label>
                                                        <input required type="password" onChange={props.handleChange} name="password" id="password" className="form-control" />
                                                    </div>
                                                    <div className="col-md-12 input">
                                                        <label htmlFor="address"><h5> Address<span className="required">*</span></h5></label>
                                                        <input onChange={props.handleChange} required name='address' type="text" className="form-control" id="address" />
                                                    </div>
                                                    <div className="col-md-12 text-center mt-3 mb-3 ">
                                                        <button type="submit" className="continue-button background-color">Create Admin <span className="icon icon-arrow-long"></span></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        <div className="bs-example">
                            <ul className="nav nav-tabs noBorder">
                                <li className="nav-item">
                                    <a href="#activeAdmin" className="order-nav-link active" data-toggle="tab">Active</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#inactiveAdmin" className="order-nav-link" data-toggle="tab">inactive</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="activeAdmin">
                                    <div className="overflow-x-scroll">
                                        <Scrollbars style={{ height: "45vh" }} className="supplier-order-table-scroll">
                                            <table className="table table-striped table-hover border-radius-table admin-grid">
                                                <thead>
                                                    <tr>
                                                        <td>Full Name</td>
                                                        <td>Email</td>
                                                        <td>Phone</td>
                                                        <td>Address</td>
                                                        <td>Activation</td>
                                                        <td>Details</td>
                                                        {/* <td style={{ width: "100px" }}>Details</td> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.subAdmins.filter(x => x.status === "active").length ?
                                                        <TableBody statusType="active" />
                                                        :
                                                        <tr>
                                                            <td colSpan="6" className="text-center p-3">No List Found</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </Scrollbars>
                                    </div>
                                </div>
                                <div className="tab-pane fade show" id="inactiveAdmin">
                                    <div className="overflow-x-scroll">
                                        <Scrollbars style={{ height: "45vh" }} className="supplier-order-table-scroll">
                                            <table className="table table-striped table-hover border-radius-table admin-grid">
                                                <thead>
                                                    <tr>
                                                        <td>Full Name</td>
                                                        <td>Email</td>
                                                        <td>Phone</td>
                                                        <td>Address</td>
                                                        <td>Activation</td>
                                                        <td>Details</td>
                                                        {/* <td style={{ width: "100px" }}>Details</td> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.subAdmins.filter(x => x.status === "inactive").length ?
                                                        <TableBody statusType="inactive" />
                                                        :
                                                        <tr>
                                                            <td colSpan="6" className="text-center p-3">No List Found</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </Scrollbars>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>

            }
        </React.Fragment >
    );
};
export default AdminGridComponent;