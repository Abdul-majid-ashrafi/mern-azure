import React from 'react';
// import { NavigationBar } from '..'

const SupplierBoxComponent = (props) => {
    const orders = props.orders;
    const obj = props.orderStatusDetails;
    let kFormater = (num) => {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num);
    };
    let mFormater = (num) => {
        return Math.abs(num) > 99999 ? Math.sign(num) * ((Math.abs(num) / 100000).toFixed(1)) + 'M' : Math.sign(num) * Math.abs(num);
    };
    let bFormater = (num) => {
        return Math.abs(num) > 999999 ? Math.sign(num) * ((Math.abs(num) / 1000000).toFixed(1)) + 'B' : Math.sign(num) * Math.abs(num);
    };
    let tFormater = (num) => {
        return Math.abs(num) > 9999999 ? Math.sign(num) * ((Math.abs(num) / 10000000).toFixed(1)) + 'T' : Math.sign(num) * Math.abs(num);
    };
    return (
        <div className="container px-5">
            <div className="row supplier-boxes">
                <div className="col-md-2 col-4 p-0 pl-3">
                    <div className="box text-center">
                        <p>Total Orders</p>
                        <p className="figures" style={{ color: "#11c15c" }}>{
                            props.ordersFlag ?
                                orders.totalOrder < 999 ? orders.totalOrder :
                                    orders.totalOrder > 999 && orders.totalOrder < 99999 ? kFormater(orders.totalOrder) :
                                        orders.totalOrder > 99999 && orders.totalOrder < 999999 ? mFormater(orders.totalOrder) :
                                            orders.totalOrder > 999999 && orders.totalOrder < 9999999 ? bFormater(orders.totalOrder) :
                                                orders.totalOrder > 9999999 && orders.totalOrder < 99999999 ? tFormater(orders.totalOrder) : 0
                                : obj.orderRecieved < 999 ? obj.orderRecieved :
                                    obj.orderRecieved > 999 && obj.orderRecieved < 99999 ? kFormater(obj.orderRecieved) :
                                        obj.orderRecieved > 99999 && obj.orderRecieved < 999999 ? mFormater(obj.orderRecieved) :
                                            obj.orderRecieved > 999999 && obj.orderRecieved < 9999999 ? bFormater(obj.orderRecieved) :
                                                obj.orderRecieved > 9999999 && obj.orderRecieved < 99999999 ? tFormater(obj.orderRecieved) : 0
                            // orders.totalOrder || obj.orderRecieved || 0
                        }</p>
                    </div>
                </div>
                <div className="col-md-2 col-4 p-0 pl-2">
                    <div className="box text-center">
                        <p>Orders Completed</p>
                        <p className="figures" style={{ color: "#d70f64" }}>{
                            props.ordersFlag ?
                                orders.completeOrder < 999 ? orders.completeOrder :
                                    orders.completeOrder > 999 && orders.completeOrder < 99999 ? kFormater(orders.completeOrder) :
                                        orders.completeOrder > 99999 && orders.completeOrder < 999999 ? mFormater(orders.completeOrder) :
                                            orders.completeOrder > 999999 && orders.completeOrder < 9999999 ? bFormater(orders.completeOrder) :
                                                orders.completeOrder > 9999999 && orders.completeOrder < 99999999 ? tFormater(orders.completeOrder) : 0
                                : obj.orderPicked < 999 ? obj.orderPicked :
                                    obj.orderPicked > 999 && obj.orderPicked < 99999 ? kFormater(obj.orderPicked) :
                                        obj.orderPicked > 99999 && obj.orderPicked < 999999 ? mFormater(obj.orderPicked) :
                                            obj.orderPicked > 999999 && obj.orderPicked < 9999999 ? bFormater(obj.orderPicked) :
                                                obj.orderPicked > 9999999 && obj.orderPicked < 99999999 ? tFormater(obj.orderPicked) : 0
                            // orders.completeOrder || obj.orderPicked || 0
                        }</p>
                    </div>
                </div>
                <div className="col-md-2 col-4 p-0 pl-2">
                    <div className="box text-center">
                        <p>Orders In Progress</p>
                        <p className="figures" style={{ color: "#f5ba1b" }}>{
                            props.ordersFlag ?
                                orders.inProgressOrder < 999 ? orders.inProgressOrder :
                                    orders.inProgressOrder > 999 && orders.inProgressOrder < 99999 ? kFormater(orders.inProgressOrder) :
                                        orders.inProgressOrder > 99999 && orders.inProgressOrder < 999999 ? mFormater(orders.inProgressOrder) :
                                            orders.inProgressOrder > 999999 && orders.inProgressOrder < 9999999 ? bFormater(orders.inProgressOrder) :
                                                orders.inProgressOrder > 9999999 && orders.inProgressOrder < 99999999 ? tFormater(orders.inProgressOrder) : 0
                                : obj.orderInProgress < 999 ? obj.orderInProgress :
                                    obj.orderInProgress > 999 && obj.orderInProgress < 99999 ? kFormater(obj.orderInProgress) :
                                        obj.orderInProgress > 99999 && obj.orderInProgress < 999999 ? mFormater(obj.orderInProgress) :
                                            obj.orderInProgress > 999999 && obj.orderInProgress < 9999999 ? bFormater(obj.orderInProgress) :
                                                obj.orderInProgress > 9999999 && obj.orderInProgress < 99999999 ? tFormater(obj.orderInProgress) : 0
                            // orders.inProgressOrder || obj.orderInProgress || 0
                        }</p>
                    </div>
                </div>
                <div className="col-md-2 col-4 p-0 pl-2">
                    <div className="box text-center">
                        <p>Total Earnings</p>
                        <p className="figures" style={{ color: "#11c15c" }}>${
                            props.ordersFlag ?
                                orders.earningTotal < 999 ? orders.earningTotal :
                                    orders.earningTotal > 999 && orders.earningTotal < 99999 ? kFormater(orders.earningTotal) :
                                        orders.earningTotal > 99999 && orders.earningTotal < 999999 ? mFormater(orders.earningTotal) :
                                            orders.earningTotal > 999999 && orders.earningTotal < 9999999 ? bFormater(orders.earningTotal) :
                                                orders.earningTotal > 9999999 && orders.earningTotal < 99999999 ? tFormater(orders.earningTotal) : 0
                                : obj.earningTotal < 999 ? obj.earningTotal :
                                    obj.earningTotal > 999 && obj.earningTotal < 99999 ? kFormater(obj.earningTotal) :
                                        obj.earningTotal > 99999 && obj.earningTotal < 999999 ? mFormater(obj.earningTotal) :
                                            obj.earningTotal > 999999 && obj.earningTotal < 9999999 ? bFormater(obj.earningTotal) :
                                                obj.earningTotal > 9999999 && obj.earningTotal < 99999999 ? tFormater(obj.earningTotal) : 0
                            // orders.earningTotal || obj.earningTotal || 0
                        }</p>
                    </div>
                </div>
                <div className="col-md-2 col-4 p-0 pl-2">
                    <div className="box text-center">
                        <p>Received Earnings</p>
                        <p className="figures" style={{ color: "#d70f64" }}>${
                            props.ordersFlag ?
                                orders.earningRecieved < 999 ? orders.earningRecieved :
                                    orders.earningRecieved > 999 && orders.earningRecieved < 99999 ? kFormater(orders.earningRecieved) :
                                        orders.earningRecieved > 99999 && orders.earningRecieved < 999999 ? mFormater(orders.earningRecieved) :
                                            orders.earningRecieved > 999999 && orders.earningRecieved < 9999999 ? bFormater(orders.earningRecieved) :
                                                orders.earningRecieved > 9999999 && orders.earningRecieved < 99999999 ? tFormater(orders.earningRecieved) : 0
                                : obj.earningRecieved < 999 ? obj.earningRecieved :
                                    obj.earningRecieved > 999 && obj.earningRecieved < 99999 ? kFormater(obj.earningRecieved) :
                                        obj.earningRecieved > 99999 && obj.earningRecieved < 999999 ? mFormater(obj.earningRecieved) :
                                            obj.earningRecieved > 999999 && obj.earningRecieved < 9999999 ? bFormater(obj.earningRecieved) :
                                                obj.earningRecieved > 9999999 && obj.earningRecieved < 99999999 ? tFormater(obj.earningRecieved) : 0
                            // orders.earningRecieved || obj.earningRecieved || 0
                        }</p>
                    </div>
                </div>
                <div className="col-md-2 col-4 p-0 pl-2 pr-3">
                    <div className="box text-center">
                        <p>Pending Earnings</p>
                        <p className="figures" style={{ color: "#f5ba1b" }}>${
                            props.ordersFlag ?
                                orders.earningPending < 999 ? orders.earningPending :
                                    orders.earningPending > 999 && orders.earningPending < 99999 ? kFormater(orders.earningPending) :
                                        orders.earningPending > 99999 && orders.earningPending < 999999 ? mFormater(orders.earningPending) :
                                            orders.earningPending > 999999 && orders.earningPending < 9999999 ? bFormater(orders.earningPending) :
                                                orders.earningPending > 9999999 && orders.earningPending < 99999999 ? tFormater(orders.earningPending) : 0
                                : obj.earningPending < 999 ? obj.earningPending :
                                    obj.earningPending > 999 && obj.earningPending < 99999 ? kFormater(obj.earningPending) :
                                        obj.earningPending > 99999 && obj.earningPending < 999999 ? mFormater(obj.earningPending) :
                                            obj.earningPending > 999999 && obj.earningPending < 9999999 ? bFormater(obj.earningPending) :
                                                obj.earningPending > 9999999 && obj.earningPending < 99999999 ? tFormater(obj.earningPending) : 0
                            // orders.earningPending || obj.earningPending || 0
                        }</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupplierBoxComponent;
