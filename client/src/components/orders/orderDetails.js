import React from 'react'
import { connect } from 'react-redux'
import headingBorder from '../../images/horizontalLine.png';
import placeholderimg from "../../images/placeholder-images/placeholder-item.png";

const OrderDetails = (props) => {
    let order = props.singleOrder
    return (
        <div className="container px-5">
            <div className='row pb-3'>
                <div className='col-md-4'></div>
                <div className='col-md-4 text-center'>
                    <p className="form-heading" style={{ color: "black", fontSize: "25px" }}><b>Order's</b> Details</p>
                    <img alt='' src={headingBorder} className="img-fluid" />
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h3>Order ID</h3>
                    <p>{order._id}</p>
                </div>
                <div className="col-md-4">
                    <h3>Menu Type</h3>
                    <p>{order.menu_type}</p>
                </div>
                <div className="col-md-4">
                    <h3>Kitchen Name</h3>
                    <p>{order.kitchen_name}</p>
                </div>
                {order.day ? <div className="col-md-4">
                    <h3>Day</h3>
                    <p>{order.day}</p>
                </div> : null}
                <div className="col-md-4">
                    <h3>Price</h3>
                    <p>${order.price}</p>
                </div>
                <div className="col-md-4">
                    <h3>Mode</h3>
                    <p>{order.delivery ? "Delivery" : "Pickup"}</p>
                </div>
                <div className="col-md-4">
                    <h3>Order Status</h3>
                    <p>{order.order_status}</p>
                </div>
                <div className="col-md-4">
                    <h3>Payment Status</h3>
                    <p>{order.payment_status}</p>
                </div>
                <div className="col-md-4">
                    <h3>Time & Day</h3>
                    <p>{order.pickuptime}</p>
                </div>
                <div className="col-md-12">
                    <h2>Items</h2>
                    {order.items.map((val, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-md-6">
                                    <p>{val.title}</p>
                                </div>
                                <div className="col-md-6">
                                    <img alt='test' src={val.image ? `https://drive.google.com/uc?export=view&id=${val.image}` : placeholderimg} width="100px" height="100px" className="float-right" />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ supplierKitchens }) => {
    return {
        singleOrder: supplierKitchens.singleOrder
    }
}
export default connect(mapStateToProps, null)(OrderDetails)
