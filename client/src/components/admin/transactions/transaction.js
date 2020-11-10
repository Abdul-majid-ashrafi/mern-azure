import React, { useState, useEffect } from 'react';
// import Pagination from '../../pagination/pagination';
import Scrollbars from 'react-custom-scrollbars';
import AdminHeaderComponent from '../adminHeader/AdminHeader';
import RenderOrdersTable from './renderOrdersTable';

const TransactionsComponent = (props) => {

    const [category, setCategory] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const viewDetails = (items) => {
        props.getSingleOrder(items);
    };

    // let orders = props.orders.filter((x) => x.order_status === "Completed");
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

    // useEffect(() => {
    //     if (window.innerHeight >= 1024 && window.innerWidth >= 768) {
    //         setOrdersPerPage(8);
    //     }
    //     if (window.innerHeight >= 1366 && window.innerWidth >= 1024) {
    //         setOrdersPerPage(14);
    //     }
    // }, [])

    // const [currentPage, setCurrentPage] = useState(1);
    // const [ordersPerPage, setOrdersPerPage] = useState(4);

    // const indexOfLastOrder = currentPage * ordersPerPage;
    // const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    // const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // const paginate = pageNumber => setCurrentPage(pageNumber);
    let order = props.singleOrder;
    return (
        <React.Fragment>
            <AdminHeaderComponent />
            {/* <div className='container'>
            <React.Fragment> */}
            <div className="container px-5 mt-3">
                <div className="row supplier_filters">
                    <div className="col-md-4 col-sm-4 col-4 mt-0 input">
                        <label htmlFor="day">
                            <h5>Select Menu : <span className="required">*</span></h5>
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
                        }} name='date_from' type="date" className="form-control" id="date_from" />
                    </div>
                    <div className="col-md-4 col-sm-4 col-4 mt-0 input">
                        <label htmlFor="pickuptime_to"><h5>To (Date)</h5></label>
                        <input onChange={(e) => {
                            setToDate(e.target.value);
                        }} name='date_to' type="date" className="form-control" id="date_to" />
                    </div>
                </div>
                <div className="bs-example">
                    <ul className="nav nav-tabs noBorder">
                        {/* <li className="nav-item">
                            <a href="#draftOrders" className="order-nav-link active" data-toggle="tab">Draft</a>
                        </li> */}
                        <li className="nav-item">
                            <a href="#pendingOrders" className="order-nav-link active" data-toggle="tab">In Progress</a>
                        </li>
                        <li className="nav-item">
                            <a href="#completedOrders" className="order-nav-link" data-toggle="tab">Completed</a>
                        </li>
                        <li className="nav-item">
                            <a href="#canceledOrders" className="order-nav-link" data-toggle="tab">Canceled</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="pendingOrders">
                            <div className="overflow-x-scroll">
                                <Scrollbars style={{ height: "45vh" }} className="supplier-order-table-scroll">
                                    <table className="table table-striped table-hover border-radius-table admin-grid">
                                        <thead>
                                            <tr>
                                                <td>Order ID</td>
                                                <td style={{ width: "100px" }}>Mode</td>
                                                <td>Order Status</td>
                                                <td>Kitchen</td>
                                                <td style={{ width: "90px" }}>Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.orders.filter(x => x.order_status === "In Progress").length ?
                                                <RenderOrdersTable
                                                    statusType="In Progress"
                                                    category={category}
                                                    fromDate={fromDate}
                                                    viewDetails={viewDetails}
                                                    toDate={toDate}
                                                />
                                                :
                                                <tr>
                                                    <td colSpan="5" className="text-center p-3">No List Found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </Scrollbars>
                            </div>
                        </div>
                        <div className="tab-pane fade show" id="completedOrders">
                            <div className="overflow-x-scroll">
                                <Scrollbars style={{ height: "45vh" }} className="supplier-order-table-scroll">
                                    <table className="table table-striped table-hover border-radius-table admin-grid">
                                        <thead>
                                            <tr>
                                                <td>Order ID</td>
                                                <td style={{ width: "100px" }}>Mode</td>
                                                <td>Order Status</td>
                                                <td>Kitchen</td>
                                                <td style={{ width: "90px" }}>Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.orders.filter(x => x.order_status === "Completed").length ?
                                                <RenderOrdersTable statusType="Completed"
                                                    category={category}
                                                    fromDate={fromDate}
                                                    viewDetails={viewDetails}
                                                    toDate={toDate}
                                                />
                                                :
                                                <tr>
                                                    <td colSpan="5" className="text-center p-3">No List Found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </Scrollbars>
                            </div>
                        </div>
                        <div className="tab-pane fade show" id="canceledOrders">
                            <div className="overflow-x-scroll">
                                <Scrollbars style={{ height: "45vh" }} className="supplier-order-table-scroll">
                                    <table className="table table-striped table-hover border-radius-table admin-grid">
                                        <thead>
                                            <tr>
                                                <td>Order ID</td>
                                                <td style={{ width: "100px" }}>Mode</td>
                                                <td>Order Status</td>
                                                <td>Kitchen</td>
                                                <td style={{ width: "90px" }}>Actions</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {props.orders.filter(x => x.order_status === "Canceled").length ?
                                                <RenderOrdersTable
                                                    statusType="Canceled"
                                                    category={category}
                                                    fromDate={fromDate}
                                                    viewDetails={viewDetails}
                                                    toDate={toDate}
                                                />
                                                :
                                                <tr>
                                                    <td colSpan="5" className="text-center p-3">No List Found</td>
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
            {/* </React.Fragment> */}
            <div className="modal fade" id="orderDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{ display: "inline-flex" }}>
                            <h5 className="modal-title">Order Details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Scrollbars style={{ height: "70vh" }} >
                                {order !== {} ? <div className="container-fluid">
                                    <div className='row pb-3'>
                                        <div className="col-md-4 pb-1 pt-2">
                                            <h5>Order ID</h5>
                                            <p>{order.order_id}</p>
                                        </div>
                                        <div className="col-md-4 pb-1 pt-2">
                                            <h5>Menu Type</h5>
                                            <p>{order.menu_type}</p>
                                        </div>
                                        <div className="col-md-4 pb-1 pt-2">
                                            <h5>Kitchen Name</h5>
                                            <p>{order.kitchen_name}</p>
                                        </div>
                                        {order.deal ? <div className="col-md-4 pb-1 pt-2">
                                            <h5>Deal Name</h5>
                                            <p>{order.deal.title}</p>
                                        </div> : null}
                                        {order.day ? <div className="col-md-4 pb-1 pt-2">
                                            <h5>Day</h5>
                                            <p>{order.day}</p>
                                        </div> : null}
                                        <div className="col-md-4 pb-1 pt-2">
                                            <h5>Price</h5>
                                            <p>${order.price}</p>
                                        </div>
                                        <div className="col-md-4 pb-1 pt-2">
                                            <h5>Mode</h5>
                                            <p>{order.delivery ? "Delivery" : "Pickup"}</p>
                                        </div>
                                        <div className="col-md-4 pb-1 pt-2">
                                            <h5>Order Status</h5>
                                            <p>{order.order_status}</p>
                                        </div>
                                        <div className="col-md-4 pb-1 pt-2">
                                            <h5>Payment Status</h5>
                                            <p>{order.payment_status}</p>
                                        </div>
                                        <div className="col-md-4 pb-1 pt-2">
                                            <h5>Time & Day</h5>
                                            <p>{order.pickuptime}</p>
                                        </div>
                                        {order.items ? order.items.length ? <div className="col-md-12 pb-1 pt-2">
                                            <h2>Items</h2>
                                            <table className="table">
                                                <thead></thead>
                                                <tbody>
                                                    {order.items.map((val, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td style={{ verticalAlign: "middle" }}>{val.title}</td>
                                                                <td> <img src={`https://drive.google.com/uc?export=view&id=${val.image}`} alt="item" width="100px" height="100px" className="float-right" /></td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div> : null : null}
                                        {order.deal ? order.deal.items.length ? <div className="col-md-12 pb-1 pt-2">
                                            <h2>Items</h2>
                                            <table className="table">
                                                <thead></thead>
                                                <tbody>
                                                    {order.deal.items.map((val, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td style={{ verticalAlign: "middle" }}>{val.title}</td>
                                                                <td> <img src={`https://drive.google.com/uc?export=view&id=${val.image}`} alt="item" width="100px" height="100px" className="float-right" /></td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div> : null : null}

                                    </div>
                                </div> : null}
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TransactionsComponent;
