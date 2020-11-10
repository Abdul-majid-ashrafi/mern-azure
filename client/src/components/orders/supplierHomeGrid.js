import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { setOrderStatus, getSingleOrder, getInprogressOrder, getCanceledOrder, getCompletedOrder } from '../../store/actions';
import { getStorage } from '../../shared';
import placeholderimg from "../../images/placeholder-images/placeholder-item.png";
import RenderOrdersTable from './supplierOrders';

const SupplierHomeGridComponent = (props) => {
    function getMonday() {
        let d = new Date();
        let date = new Date();
        var day = d.getDay(),
            diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        let fullDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + new Date(d.setDate(diff)).getDate();
        return fullDate;
    }
    function getUpcomingSunday() {
        const date = new Date();
        const today = date.getDate();
        const dayOfTheWeek = date.getDay();
        const newDate = date.setDate(today - dayOfTheWeek + 7);
        let fullDate = `${date.getFullYear()}-${date.getMonth() + 1}-${new Date(newDate).getDate()}`;
        return fullDate;
    }
    const [category, setCategory] = useState("");
    const [fromDate, setFromDate] = useState(getMonday());
    const [toDate, setToDate] = useState(getUpcomingSunday());
    const changeStatus = (id, value) => {
        let orderStatus = document.getElementById(`order_status${id}`).value;
        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: props.userID,
            orderid: id,
            orderstatus: orderStatus.toLowerCase(),
            type: props.type,
        };
        props.setOrderStatus(headers, value, props.userEamil);
    };

    const viewDetails = (items) => {
        props.getSingleOrder(items);
    };
    let orders = props.orders;
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


    const handleCategoryChange = (env) => {
        setCategory(env.target.value);
        if (!env.target.value) {
            setFromDate("");
            setToDate("");
        }
    };

    let order = props.singleOrder;
    return (
        <div className="container px-5">
            <div className="modal fade" id="orderDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className='modal-content' style={{ backgroundColor: "transparent", border: 0 }}>
                        {/* <div className='modal-header' style={{ display: "inline-flex" }}>
              <h5 className='modal-title'>Order Details</h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div> */}
                        <div className='modal-body'>

                            {order !== {} ? (
                                <div className='container-fluid'>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="bs-example" style={{ position: "relative", zIndex: 20, marginBottom: "9px" }}>
                                                <ul className="nav nav-tabs noBorder">
                                                    <li className="nav-item">
                                                        <a href="#orderDetails" className="order-nav-link order-details-nav active" data-toggle="tab">ORDER DETAILS</a>
                                                    </li>
                                                    {props.type === "supplier" && <li className="nav-item">
                                                        <a href="#customerDetails" className="order-nav-link order-details-nav" data-toggle="tab">CUSTOMER DETAILS</a>
                                                    </li>}
                                                    {props.type === "customer" && <li className="nav-item">
                                                        <a href="#kitchenDetails" className="order-nav-link order-details-nav" data-toggle="tab">KITCHEN DETAILS</a>
                                                    </li>}
                                                </ul>
                                                <i className="fas fa-times order-modal-close-button" data-dismiss='modal' aria-label='Close'></i>
                                            </div>
                                            <Scrollbars style={{ height: "70vh", backgroundColor: "white" }}>
                                                <div className="tab-content p-4">
                                                    <div className="tab-pane fade show active" id="orderDetails">
                                                        <div className='row pb-3'>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Order ID</h5>
                                                                <p>{order.order_id}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Menu Type</h5>
                                                                <p>{order.menu_type}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Kitchen Name</h5>
                                                                <p>{order.kitchen_name}</p>
                                                            </div>
                                                            {order.deal ? (
                                                                <div className='col-md-4 pb-1 pt-2'>
                                                                    <h5>Deal Name</h5>
                                                                    <p>{order.deal.title}</p>
                                                                </div>
                                                            ) : null}
                                                            {order.day ? <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Day</h5>
                                                                <p>{order.day}</p>
                                                            </div> : null}
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Price</h5>
                                                                <p>${order.price}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Mode</h5>
                                                                <p>{order.delivery ? "Delivery" : "Pickup"}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Order Status</h5>
                                                                <p>{order.order_status}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Payment Status</h5>
                                                                <p>{order.payment_status}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>{order.day ? "Time" : "Time & Day"}</h5>
                                                                <p>{order.pickuptime}</p>
                                                            </div>
                                                            {order.items ? (
                                                                order.items.length ? (
                                                                    <div className='col-md-12 pb-1 pt-2'>
                                                                        <h2>Items</h2>
                                                                        <table className='table'>
                                                                            <thead></thead>
                                                                            <tbody>
                                                                                {order.items.map((val, index) => {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td style={{ verticalAlign: "middle" }}>
                                                                                                {val.title}
                                                                                            </td>
                                                                                            <td>
                                                                                                {" "}
                                                                                                <img
                                                                                                    alt=''
                                                                                                    src={
                                                                                                        val.image
                                                                                                            ? `https://drive.google.com/uc?export=view&id=${val.image}`
                                                                                                            : placeholderimg
                                                                                                    }
                                                                                                    width='100px'
                                                                                                    height='100px'
                                                                                                    className='float-right'
                                                                                                />
                                                                                            </td>
                                                                                        </tr>
                                                                                    );
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                ) : null
                                                            ) : null}
                                                            {order.deal ? (
                                                                order.deal.items.length ? (
                                                                    <div className='col-md-12 pb-1 pt-2'>
                                                                        <h2>Items</h2>
                                                                        <table className='table'>
                                                                            <thead></thead>
                                                                            <tbody>
                                                                                {order.deal.items.map((val, index) => {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td style={{ verticalAlign: "middle" }}>
                                                                                                {val.title}
                                                                                            </td>
                                                                                            <td>
                                                                                                {" "}
                                                                                                <img
                                                                                                    alt=''
                                                                                                    src={val.image}
                                                                                                    width='100px'
                                                                                                    height='100px'
                                                                                                    className='float-right'
                                                                                                />
                                                                                            </td>
                                                                                        </tr>
                                                                                    );
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                ) : null
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="customerDetails">
                                                        {order.customer && <div className='row pb-3'>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Full Name</h5>
                                                                <p>{order.customer.full_name}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Email</h5>
                                                                <p>{order.customer.email}</p>
                                                            </div>
                                                            {order.customer.mobile_number !== "" && <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Mobile No.</h5>
                                                                <p>{order.customer.mobile_number}</p>
                                                            </div>}
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Address</h5>
                                                                <p>{order.customer.address}</p>
                                                            </div>
                                                            {order.customer.address_line_2 && order.customer.address_line_2 !== "" && <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Address Line 2</h5>
                                                                <p>{order.customer.address_line_2}</p>
                                                            </div>}
                                                            {order.customer.city !== "" && <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>City</h5>
                                                                <p>{order.customer.city}</p>
                                                            </div>}
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>State</h5>
                                                                <p>{order.customer.state}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Country</h5>
                                                                <p>{order.customer.country}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Postal Code</h5>
                                                                <p>{order.customer.postal_code}</p>
                                                            </div>
                                                        </div>
                                                        }
                                                    </div>
                                                    <div className="tab-pane fade" id="kitchenDetails">
                                                        {order.supplier && <div className='row pb-3'>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Kitchen Name</h5>
                                                                <p>{order.supplier.business}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Email</h5>
                                                                <p>{order.supplier.email}</p>
                                                            </div>
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Address</h5>
                                                                <p>{order.supplier.address}</p>
                                                            </div>
                                                            {order.supplier.address_line_2 !== "" && <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Address Line 2</h5>
                                                                <p>{order.supplier.address_line_2}</p>
                                                            </div>}
                                                            {order.supplier.Suburb !== "" && <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>Suburb</h5>
                                                                <p>{order.supplier.Suburb}</p>
                                                            </div>}
                                                            <div className='col-md-4 pb-1 pt-2'>
                                                                <h5>State</h5>
                                                                <p>{order.supplier.state}</p>
                                                            </div>
                                                        </div>
                                                        }
                                                    </div>
                                                </div>
                                            </Scrollbars>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                        </div>
                    </div>
                </div>
            </div>
            <div className="row supplier_filters">
                <div className="col-md-4 col-sm-4 col-4 mt-0 input">
                    <label htmlFor="day">
                        <h5>Select Menu :<span className="required">*</span></h5>
                    </label>
                    <div className="form-group">
                        <select defaultValue={category} className="custom-select form-control" id='day' name="selectedDay" onChange={handleCategoryChange} required>
                            <option value=''>All</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="frozen">Frozen</option>
                            <option value="occasion">Occasion</option>
                            <option value="cake">Cake</option>
                        </select>
                        <div className="invalid-feedback">Example invalid custom select feedback</div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-4 col-4 mt-0 input">
                    <label htmlFor="pickuptime_from"><h5>From (Date)</h5></label>
                    <input onChange={(e) => {
                        setFromDate(e.target.value);
                    }} name='date_from' type="date" value={fromDate} className="form-control" id="date_from" />
                </div>
                <div className="col-md-4 col-sm-4 col-4 mt-0 input">
                    <label htmlFor="pickuptime_to"><h5>To (Date)</h5></label>
                    <input onChange={(e) => {
                        setToDate(e.target.value);
                    }} name='date_to' type="date" value={toDate} className="form-control" id="date_to" />
                </div>
            </div>

            <div className="bs-example">
                <ul className="nav nav-tabs noBorder">
                    <li className="nav-item">
                        <a href="#orderInProgress" className="order-nav-link active" data-toggle="tab">ORDER IN PROGRESS</a>
                    </li>
                    <li className="nav-item">
                        <a href="#ordersCompleted" className="order-nav-link" data-toggle="tab">ORDER COMPLETED</a>
                    </li>
                    <li className="nav-item">
                        <a href="#ordersCancelled" className="order-nav-link" data-toggle="tab">ORDER CANCELLED</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active" id="orderInProgress">
                        <div className='row pr-3 pb-3 pr-0'>
                            <div className="col-md-12 pr-0">
                                <div className="overflow-x-scroll">
                                    <Scrollbars style={{ height: "45vh" }} className="supplier-order-table-scroll">
                                        <table className="table table-striped table-hover border-radius-table">
                                            <thead>
                                                <tr style={{ fontSize: "14px" }}>
                                                    <td>Order ID</td>
                                                    <td>Menu</td>
                                                    <td>Mode</td>
                                                    <td>Day Time</td>
                                                    <td>Payment Status</td>
                                                    <td>Order Status</td>
                                                    <td>Kitchen</td>
                                                    <td>Actions</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orders.filter((x) => x.order_status === "In Progress").length
                                                        ?
                                                        <RenderOrdersTable
                                                            statusType="In Progress"
                                                            category={category}
                                                            fromDate={fromDate}
                                                            viewDetails={viewDetails}
                                                            toDate={toDate}
                                                            changeStatus={changeStatus}
                                                        />
                                                        :
                                                        <tr>
                                                            <td className="text-center" colSpan="8">
                                                                No Orders Yet
                                                            </td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="tab-pane fade" id="ordersCancelled">
                        <div className='row pr-3 pb-3 pr-0'>
                            <div className="col-md-12 pr-0">
                                <div className="overflow-x-scroll">
                                    <Scrollbars style={{ height: "45vh" }} className="supplier-order-table-scroll">
                                        <table className="table table-striped table-hover border-radius-table">
                                            <thead>
                                                <tr>
                                                    <td>Order ID</td>
                                                    <td>Menu</td>
                                                    <td>Mode</td>
                                                    <td>Day Time</td>
                                                    <td>Payment Status</td>
                                                    <td>Order Status</td>
                                                    <td>Kitchen</td>
                                                    <td>Actions</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orders.filter((x) => x.order_status === "Canceled").length
                                                        ?
                                                        <RenderOrdersTable
                                                            statusType="Canceled"
                                                            category={category}
                                                            fromDate={fromDate}
                                                            viewDetails={viewDetails}
                                                            changeStatus={changeStatus}
                                                            toDate={toDate}
                                                        />
                                                        :
                                                        <tr>
                                                            <td className="text-center" colSpan="8">
                                                                No Orders Yet
                                                            </td>
                                                        </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="tab-pane fade" id="ordersCompleted">
                        <div className='row pr-3 pb-3 pr-0'>
                            <div className="col-md-12 pr-0">
                                <div className="overflow-x-scroll">
                                    <Scrollbars style={{ height: "45vh" }} className="supplier-order-table-scroll">
                                        <table className="table table-striped table-hover border-radius-table">
                                            <thead>
                                                <tr>
                                                    <td>Order ID</td>
                                                    <td>Menu</td>
                                                    <td>Mode</td>
                                                    <td>Day Time</td>
                                                    <td>Payment Status</td>
                                                    <td>Order Status</td>
                                                    <td>Kitchen</td>
                                                    <td>Actions</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    orders.filter((x) => x.order_status === "Completed").length
                                                        ?
                                                        <RenderOrdersTable
                                                            statusType="Completed"
                                                            changeStatus={changeStatus}
                                                            viewDetails={viewDetails}
                                                            category={category}
                                                            fromDate={fromDate}
                                                            toDate={toDate}
                                                        />
                                                        :
                                                        <tr>
                                                            <td className="text-center" colSpan="8">
                                                                No Orders Yet
                                                            </td>
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
            </div>

        </div>
    );
};
const mapStateToProps = ({ supplierKitchens, auth }) => {
    return {
        orders: supplierKitchens.orders,
        singleOrder: supplierKitchens.singleOrder,
        userID: auth.user._id,
        userEamil: auth.user.email,
        type: auth.user.type,
    };
};
export default connect(mapStateToProps, { setOrderStatus, getSingleOrder, getInprogressOrder, getCanceledOrder, getCompletedOrder })(SupplierHomeGridComponent);