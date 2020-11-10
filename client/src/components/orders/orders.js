import React, { useState, useEffect } from "react";
import headingBorder from '../../images/horizontalLine.png';
import Scrollbars from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { getSingleOrder, setOrdersInLocalStorage, dispatchDealOrders, orderDispatchedDailyItem, deleteOrderLocal, orderDispatchedItem, changeQuantityExistingOrderInList } from '../../store/actions';
import { getStorage, sweetalert } from '../../shared';
import placeholderimg from "../../images/placeholder-images/placeholder-item.png";
import { Popconfirm } from 'antd';
import Pagination from '../pagination/pagination'

const OrdersComponent = (props) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageInProgress, setCurrentPageInProgress] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const [currentPageCancelled, setCurrentPageCancelled] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(7);
  // const [ordersInProgressLength, setOrdersInProgressLength] = useState(0);
  // const [ordersCompletedLength, setOrdersCompletedLength] = useState(0);
  // const [ordersCancelledLength, setOrdersCancelledLength] = useState(0);
  // const [ordersPerPage, setOrdersPerPage] = useState(7);
  // const [ordersPerPage, setOrdersPerPage] = useState(7);

  let indexOfLastOrder = currentPage * ordersPerPage;
  let indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  let currentOrders = []
  let ordersInProgress = []
  let ordersCompleted = []
  let ordersCancelled = []
  let ordersInProgressLength = props.orders.filter((x) => x.order_status === "In Progress") && props.orders.filter((x) => x.order_status === "In Progress").length ? props.orders.filter((x) => x.order_status === "In Progress").length : 0
  let ordersCompletedLength = props.orders.filter((x) => x.order_status === "Completed") && props.orders.filter((x) => x.order_status === "Completed").length ? props.orders.filter((x) => x.order_status === "Completed").length : 0
  let ordersCancelledLength = props.orders.filter((x) => x.order_status === "Canceled") && props.orders.filter((x) => x.order_status === "Canceled").length ? props.orders.filter((x) => x.order_status === "Canceled").length : 0
  // const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const paginate2 = pageNumber => setCurrentPageInProgress(pageNumber);
  const paginate3 = pageNumber => setCurrentPageCompleted(pageNumber);
  const paginate4 = pageNumber => setCurrentPageCancelled(pageNumber);

  // const [orders, setOrders] = useState([])

  const [pickupTime, setPickupTime] = useState("");
  const [pickupDate, setPickupDate] = useState("");

  useEffect(() => {
    // setOrders(props.draftOrders)
  }, [props.draftOrders]);

  const viewDetails = (items) => {
    props.getSingleOrder(items);
  };

  const setDate = (e) => {
    const newDate = new Date();
    // console.log(newDate.getDate() < new Date(e.target.value).getDate());
    if (newDate.getFullYear() === new Date(e.target.value).getFullYear()) {
      setPickupDate("");
      if (newDate.getMonth() < new Date(e.target.value).getMonth()) {
        setPickupDate(e.target.value);
      } else if (newDate.getMonth() === new Date(e.target.value).getMonth()) {
        if (newDate.getDate() < new Date(e.target.value).getDate()) {
          setPickupDate(e.target.value);
        } else {
          sweetalert("info", "Date Incorrect");
        }
      } else {
        sweetalert("info", "Date Incorrect");
      }
    } else {
      sweetalert("info", "Date Incorrect");
    }
    // if (
    //   newDate.getFullYear() === new Date(e.target.value).getFullYear()
    //   && newDate.getMonth() < new Date(e.target.value).getMonth()
    // ) {
    //   console.log(newDate.getFullYear());
    //   console.log(new Date(e.target.value).getFullYear());
    //   alert("ok");
    // }
    // setPickupDate(e.target.value);
  };

  const setTime = (e) => {
    setPickupTime(e.target.value);
  };

  const RenderOrdersTable = ({ statusType }) => {
    let filteredOrders = props.orders.filter((x) => x.order_status === statusType);
    if (statusType === "In Progress") {
      indexOfLastOrder = currentPageInProgress * ordersPerPage;
      indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
      ordersInProgress = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
      ordersInProgressLength = filteredOrders.length
      filteredOrders = ordersInProgress
    } else if (statusType === "Completed") {
      indexOfLastOrder = currentPageCompleted * ordersPerPage;
      indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
      ordersCompleted = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
      ordersCompletedLength = filteredOrders.length
      console.log(ordersCompletedLength)
      filteredOrders = ordersCompleted
    } else if (statusType === "Canceled") {
      indexOfLastOrder = currentPageCancelled * ordersPerPage;
      indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
      ordersCancelled = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
      ordersCancelledLength = filteredOrders.length
      filteredOrders = ordersCancelled
    }
    return filteredOrders.map((value, index) => {
      return (
        <tr key={index}>
          <td>{value.order_id}</td>
          <td>{value.menu_type} </td>
          <td>{!value.delivery ? "Pickup" : "Delivery"}</td>
          <td>{value.pickuptime}</td>
          {/* <td>{value.order_status}</td> */}
          {/* <td>{value.payment_status}</td> */}
          <td>{value.kitchen_name}</td>
          <td>${value.price}</td>
          <td>{value.quantity}</td>
          <td>
            <a
              href='/#'
              data-toggle="modal"
              data-target="#orderDetailsModal"
              onClick={() => viewDetails(value, index)}
            >
              <i
                className="fa fa-info-circle"
                data-toggle="modal"
                data-target="#orderDetailsModal"
                onClick={() => viewDetails(value, index)}
                aria-hidden="true"
                style={{
                  fontSize: "20px",
                  margin: "0px 6px",
                  color: "black"
                }}></i>
            </a>
          </td>

        </tr>
      );
    });
  };

  const confirmDealOrders = (obj, idx) => {
    const token = getStorage('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      userid: props.userID,
      type: props.type
    };
    props.dispatchDealOrders(obj, headers, idx, props.userEmail, obj.orderId);
  };

  const removeUnConfirmItem = (idx) => {
    props.deleteOrderLocal(idx);
  };

  const confirmItemsDailyOrders = (obj, idx) => {
    const token = getStorage('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      userid: props.userID,
      type: props.type
    };
    obj.idx = idx;
    props.orderDispatchedDailyItem(obj, headers, props.userEmail, obj.orderId);
  };

  const confirmItemsOrders = (obj, idx) => {
    const token = getStorage('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      userid: props.userID,
      type: props.type,
    };
    obj = {
      ...obj,
      pickupTime: `${pickupTime} ${pickupDate}`,
      idx
    };
    if (pickupTime !== "" && pickupDate !== "") {
      props.orderDispatchedItem(obj, headers, props.userEmail, obj.orderId);
    } else {
      sweetalert("error", "Please fill out date and time");
    }
    // props.orderDispatchedItem(obj, headers);
  };

  const changeQuantityExistingOrder = (idx, operator) => {
    props.changeQuantityExistingOrderInList(idx, operator);
  };

  const draftOrdersConform = (items, idx, func) => {
    func(items, idx);
  };

  const draftOrdersCancel = () => {
    sweetalert('info', "order will remain in draft orders.");
  };

  let draftOrdersLocal = getStorage("draftOrders") || [];
  console.log(draftOrdersLocal)
  let draftOrders = draftOrdersLocal.length !== 0 ? JSON.parse(draftOrdersLocal) !== "[]" ? JSON.parse(draftOrdersLocal) : [] : []
  const RenderUnconfirmedOrders = () => {
    currentOrders = draftOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    return (currentOrders !== "[]" && currentOrders.length ?
      currentOrders.map((items, idx) => {
        return <tr key={idx}>
          <td>{items.orderId}</td>
          <td>{items.menuType}</td>
          <td>{items.mode}</td>
          <td>{items.pickupTime ? items.pickupTime : items.pickuptime_from && items.pickuptime_to ? items.pickuptime_from : <div style={{ display: "flex" }}><input onChange={setTime} value={pickupTime} style={{ fontSize: "11px" }} type="time" id="pickupTime" /> <input onChange={setDate} value={pickupDate} style={{ fontSize: "11px", width: "110px" }} type="date" id="pickupDate" /></div>}</td>
          {/* <td>Draft</td> */}
          <td>{items.kitchenName}</td>
          <td>${items.totalPrice ? items.totalPrice : items.price}</td>
          <td style={(items.menuType !== "daily" && items.menuType !== "weekly") ? { paddingLeft: "0", textAlign: "center", paddingRight: "0" } : {}}>{(items.menuType !== "daily" && items.menuType !== "weekly") ? (<React.Fragment><button id="decrement" onClick={() => changeQuantityExistingOrder(idx, "-", items.price, items.orderId)}>-</button> {items.count} <button id="increment" onClick={() => changeQuantityExistingOrder(idx, "+", items.price, items.orderId)}>+</button></React.Fragment>) : items.count}</td>
          {/* <td className="action-icons">
            <a
              href='/#'
              data-toggle="modal"
              data-target="#draftOrderDetailsModal"
              onClick={() => viewDetails(items)}
            >
              <i className="fa fa-info-circle" aria-hidden="true"></i>
            </a>
          </td> */}
          <td style={{ width: "115px" }}>
            <i
              className="fa fa-info-circle"
              data-toggle="modal"
              data-target="#draftOrderDetailsModal"
              onClick={() => viewDetails(items)}
              style={{
                fontSize: "20px",
                margin: "0px 5px"
              }}
              aria-hidden="true"
            ></i>
            <Popconfirm
              title="Are you sure? Order once confirmed cannot be cancelled by you"
              onConfirm={() => draftOrdersConform(items, idx, items.itemids ? items.itemids.length ? items.pickupTime ? confirmItemsDailyOrders : confirmItemsOrders : '' : confirmDealOrders)}
              onCancel={draftOrdersCancel}
              okText="Yes"
              cancelText="No"
            >
              <i className="fa fa-check-circle action-icons-order" style={{ cursor: "pointer" }} aria-hidden="true"></i>
              {/* <i onClick={items.itemids ? items.itemids.length ? items.pickupTime ? () => confirmItemsDailyOrders(items, idx) : () => confirmItemsOrders(items, idx) : '' : () => confirmDealOrders(items, idx)} className="fa fa-check-circle action-icons-order" style={{ cursor: "pointer" }} aria-hidden="true"></i> */}
            </Popconfirm>
            <i onClick={() => removeUnConfirmItem(idx)} className="fa fa-remove action-icons-order" aria-hidden="true"></i>
          </td>

        </tr >;
      })
      :
      <tr className="text-center">
        <td colSpan="9">No Orders Yet</td>
      </tr>
    );

  };

  let order = props.singleOrder;

  return (
    <div className='container px-5'>
      <div
        className='modal fade'
        id='draftOrderDetailsModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modelTitleId'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header' style={{ display: "inline-flex" }}>
              <h5 className='modal-title'>Order Details</h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <Scrollbars style={{ height: "70vh" }}>
                {order !== {} ? (
                  <div className='container-fluid'>
                    <div className='row pb-3'>
                      <div className='col-md-4 pb-1 pt-2'>
                        <h5>Order ID</h5>
                        <p>{order.orderId}</p>
                      </div>
                      <div className='col-md-4 pb-1 pt-2'>
                        <h5>Menu Type</h5>
                        <p>{order.menuType}</p>
                      </div>
                      <div className='col-md-4 pb-1 pt-2'>
                        <h5>Kitchen Name</h5>
                        <p>{order.kitchenName}</p>
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
                        <p>Draft Order</p>
                      </div>
                      {order.pickupTime ? <div className='col-md-4 pb-1 pt-2'>
                        <h5>{order.day ? "Time" : "Time & Day"}</h5>
                        <p>{order.pickupTime}</p>
                      </div> : null}
                      {order.selectedItem ? <div className='col-md-12 pb-1 pt-2'>
                        <h2>Item</h2>
                        <table className='table'>
                          <thead></thead>
                          <tbody>
                            <tr>
                              <td style={{ verticalAlign: "middle" }}>{order.selectedItem.title}</td>
                              <td>
                                {" "}
                                <img
                                  alt=''
                                  src={
                                    order.selectedItem.image
                                      ? `https://drive.google.com/uc?export=view&id=${order.selectedItem.image}`
                                      : placeholderimg
                                  }
                                  width='100px'
                                  height='100px'
                                  className='float-right'
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div> : null}
                      {order.itemOrder ? (
                        order.itemOrder.length ? (
                          <div className='col-md-12 pb-1 pt-2'>
                            <h2>Items</h2>
                            <table className='table'>
                              <thead></thead>
                              <tbody>
                                {order.itemOrder.map((val, index) => {
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
                ) : null}
              </Scrollbars>

            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='orderDetailsModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='modelTitleId'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
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
      <div className='row pb-3'>
        <div className='col-md-4'></div>
        <div className='col-md-4 text-center'>
          <p className="form-heading" style={{ color: "black", fontSize: "25px" }}><b>My Orders</b> List</p>
          <img alt='' src={headingBorder} className="img-fluid" />
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-12">
          <div className="container px-5">
            <div className="bs-example">
              <ul className="nav nav-tabs noBorder">
                <li className="nav-item">
                  <a href="#draftOrders" onClick={() => setCurrentPage(1)} className="order-nav-link active" data-toggle="tab">DRAFT ORDER</a>
                </li>
                <li className="nav-item">
                  <a href="#orderInProgress" onClick={() => setCurrentPageInProgress(1)} className="order-nav-link" data-toggle="tab">ORDER IN PROGRESS</a>
                </li>
                <li className="nav-item">
                  <a href="#ordersCompleted" onClick={() => setCurrentPageCompleted(1)} className="order-nav-link" data-toggle="tab">ORDER COMPLETED</a>
                </li>
                <li className="nav-item">
                  <a href="#ordersCancelled" onClick={() => setCurrentPageCancelled(1)} className="order-nav-link" data-toggle="tab">ORDER CANCELLED</a>
                </li>
              </ul>
            </div>

            <div className="tab-content">
              <div className="tab-pane fade show active" id="draftOrders">
                <div className='row pr-3 pb-3 pr-0'>
                  <div className="col-md-12 pr-0">
                    <div className="overflow-x-scroll">
                      {/* <Scrollbars style={{ height: "50vh" }} className="order-table-scroll"> */}
                      <table className="table table-striped table-hover border-radius-table">
                        <thead>
                          <tr>
                            <td>Order ID</td>
                            <td>Menu</td>
                            <td>Mode</td>
                            <td>Day Time</td>
                            {/* <td>Order Status</td> */}
                            <td>Kitchen</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            {/* <td>Details</td> */}
                            <td>Actions</td>
                          </tr>
                        </thead>
                        <tbody>
                          <RenderUnconfirmedOrders />
                        </tbody>
                      </table>
                      <Pagination ordersPerPage={ordersPerPage} currentPage={currentPage} totalOrders={draftOrders.length} paginate={paginate} />
                      {/* <Pagination ordersPerPage={ordersPerPage} currentPage={currentPage} totalOrders={draftOrdersLocal.length !== 0 ? JSON.parse(draftOrdersLocal) !== "[]" ? draftOrdersLocal : [] : []} paginate={paginate} /> */}
                      {/* </Scrollbars> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="orderInProgress">
                <div className='row pr-3 pb-3 pr-0'>
                  <div className="col-md-12 pr-0">
                    <div className="overflow-x-scroll">
                      {/* <Scrollbars style={{ height: "50vh" }} className="order-table-scroll"> */}
                      <table className="table table-striped table-hover border-radius-table">
                        <thead>
                          <tr>
                            <td>Order ID</td>
                            <td>Menu</td>
                            <td>Mode</td>
                            <td>Day Time</td>
                            {/* <td>Order Status</td> */}
                            {/* <td>Payment Status</td> */}
                            <td>Kitchen</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Actions</td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            props.orders.filter((x) => x.order_status === "In Progress").length
                              ?
                              <RenderOrdersTable statusType="In Progress" />
                              :
                              <tr>
                                <td className="text-center" colSpan="8">
                                  No Orders Yet
                                                            </td>
                              </tr>
                          }
                        </tbody>
                      </table>
                      <Pagination ordersPerPage={ordersPerPage} currentPage={currentPageInProgress} totalOrders={ordersInProgressLength} paginate={paginate2} />
                      {/* </Scrollbars> */}
                    </div>
                  </div>
                </div>

              </div>
              <div className="tab-pane fade" id="ordersCancelled">
                <div className='row pr-3 pb-3 pr-0'>
                  <div className="col-md-12 pr-0">
                    <div className="overflow-x-scroll">
                      {/* <Scrollbars style={{ height: "50vh" }} className="order-table-scroll"> */}
                      <table className="table table-striped table-hover border-radius-table">
                        <thead>
                          <tr>
                            <td>Order ID</td>
                            <td>Menu</td>
                            <td>Mode</td>
                            <td>Day Time</td>
                            {/* <td>Order Status</td> */}
                            {/* <td>Payment Status</td> */}
                            <td>Kitchen</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Actions</td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            props.orders.filter((x) => x.order_status === "Canceled").length
                              ?
                              <RenderOrdersTable statusType="Canceled" />
                              :
                              <tr>
                                <td className="text-center" colSpan="8">
                                  No Orders Yet
                                                            </td>
                              </tr>
                          }
                        </tbody>
                      </table>
                      <Pagination ordersPerPage={ordersPerPage} currentPage={currentPageCancelled} totalOrders={ordersCancelledLength} paginate={paginate4} />
                      {/* </Scrollbars> */}
                    </div>
                  </div>
                </div>

              </div>
              <div className="tab-pane fade" id="ordersCompleted">
                <div className='row pr-3 pb-3 pr-0'>
                  <div className="col-md-12 pr-0">
                    <div className="overflow-x-scroll">
                      {/* <Scrollbars style={{ height: "50vh" }} className="order-table-scroll"> */}
                      <table className="table table-striped table-hover border-radius-table">
                        <thead>
                          <tr>
                            <td>Order ID</td>
                            <td>Menu</td>
                            <td>Mode</td>
                            <td>Day Time</td>
                            {/* <td>Order Status</td> */}
                            {/* <td>Payment Status</td> */}
                            <td>Kitchen</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Actions</td>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            props.orders.filter((x) => x.order_status === "Completed").length
                              ?
                              <RenderOrdersTable statusType="Completed" />
                              :
                              <tr>
                                <td className="text-center" colSpan="8">
                                  No Orders Yet
                                                            </td>
                              </tr>
                          }
                        </tbody>
                      </table>
                      <Pagination ordersPerPage={ordersPerPage} currentPage={currentPageCompleted} totalOrders={ordersCompletedLength} paginate={paginate3} />
                      {/* </Scrollbars> */}
                    </div>
                  </div>
                </div>

              </div>

              <div className='tab-content'>
                {/* <div className='tab-pane fade show active' id='draftOrders'>
                  <div className='row pr-3 pb-3 pr-0'>
                    <div className='col-md-12 pr-0'>
                      <div className='overflow-x-scroll'>
                        <Scrollbars
                          style={{ height: "50vh" }}
                          className='order-table-scroll'
                        >
                          <table className='table table-striped table-hover border-radius-table'>
                            <thead>
                              <tr>
                                <td>Order ID</td>
                                <td>Menu</td>
                                <td>Day Time</td>
                                <td>Order Status</td>
                                <td>Kitchen</td>
                                <td>Price</td>
                                <td>Quantity</td>
                                <td>Actions</td>
                              </tr>
                            </thead>
                            <tbody>
                              <RenderUnconfirmedOrders />
                            </tbody>
                          </table>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className='tab-pane fade' id='orderInProgress'>
                  <div className='row pr-3 pb-3 pr-0'>
                    <div className='col-md-12 pr-0'>
                      <div className='overflow-x-scroll'>
                        <Scrollbars
                          style={{ height: "50vh" }}
                          className='order-table-scroll'
                        >
                          <table className='table table-striped table-hover border-radius-table'>
                            <thead>
                              <tr>
                                <td>Order ID</td>
                                <td>Menu</td>
                                <td>Mode</td>
                                <td>Day Time</td>
                                <td>Order Status</td>
                                <td>Payment Status</td>
                                <td>Kitchen</td>
                                <td>Actions</td>
                              </tr>
                            </thead>
                            <tbody>
                              {props.orders.filter(
                                (x) => x.order_status === "In Progress"
                              ).length ? (
                                  <RenderOrdersTable statusType='In Progress' />
                                ) : (
                                  <tr>
                                    <td className='text-center' colSpan='8'>
                                      No Orders Yet
                                  </td>
                                  </tr>
                                )}
                            </tbody>
                          </table>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='tab-pane fade' id='ordersCancelled'>
                  <div className='row pr-3 pb-3 pr-0'>
                    <div className='col-md-12 pr-0'>
                      <div className='overflow-x-scroll'>
                        <Scrollbars
                          style={{ height: "50vh" }}
                          className='order-table-scroll'
                        >
                          <table className='table table-striped table-hover border-radius-table'>
                            <thead>
                              <tr>
                                <td>Order ID</td>
                                <td>Menu</td>
                                <td>Mode</td>
                                <td>Day Time</td>
                                <td>Order Status</td>
                                <td>Payment Status</td>
                                <td>Kitchen</td>
                                <td>Actions</td>
                              </tr>
                            </thead>
                            <tbody>
                              {props.orders.filter(
                                (x) => x.order_status === "Canceled"
                              ).length ? (
                                  <RenderOrdersTable statusType='Canceled' />
                                ) : (
                                  <tr>
                                    <td className='text-center' colSpan='8'>
                                      No Orders Yet
                                  </td>
                                  </tr>
                                )}
                            </tbody>
                          </table>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='tab-pane fade' id='ordersCompleted'>
                  <div className='row pr-3 pb-3 pr-0'>
                    <div className='col-md-12 pr-0'>
                      <div className='overflow-x-scroll'>
                        <Scrollbars
                          style={{ height: "50vh" }}
                          className='order-table-scroll'
                        >
                          <table className='table table-striped table-hover border-radius-table'>
                            <thead>
                              <tr>
                                <td>Order ID</td>
                                <td>Menu</td>
                                <td>Mode</td>
                                <td>Day Time</td>
                                <td>Order Status</td>
                                <td>Payment Status</td>
                                <td>Kitchen</td>
                                <td>Actions</td>
                              </tr>
                            </thead>
                            <tbody>
                              {props.orders.filter(
                                (x) => x.order_status === "Completed"
                              ).length ? (
                                  <RenderOrdersTable statusType='Completed' />
                                ) : (
                                  <tr>
                                    <td className='text-center' colSpan='8'>
                                      No Orders Yet
                                  </td>
                                  </tr>
                                )}
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
        </div>
      </div>
    </div >

  );
};

const mapStateToProps = ({ supplierKitchens, auth }) => {
  return {
    orders: supplierKitchens.orders,
    singleOrder: supplierKitchens.singleOrder,
    draftOrders: supplierKitchens.draftOrders,
    userID: auth.user._id,
    userEmail: auth.user.email,
    type: auth.user.type,
  };
};

export default connect(mapStateToProps, { getSingleOrder, setOrdersInLocalStorage, dispatchDealOrders, orderDispatchedDailyItem, deleteOrderLocal, orderDispatchedItem, changeQuantityExistingOrderInList })(OrdersComponent);
