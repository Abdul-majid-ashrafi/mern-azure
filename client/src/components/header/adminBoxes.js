import React from 'react';
// import { NavigationBar } from '..'

const AdminBoxComponent = (props) => {

    let obj = props.orderStatusDetails;
    const totalCustomer = props.customers.length || 0;
    const totalSupplier = props.suppliers.length || 0;
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
            <div className="row admin-boxes">
                <div className="col-md-3 col-6 p-0 pl-3">
                    <div className="box text-center">
                        <p>Total Kitchens</p>
                        <p className="figures" style={{ color: "#11c15c" }}>{totalSupplier}</p>
                    </div>
                </div>
                <div className="col-md-3 col-6 p-0 pl-2">
                    <div className="box text-center">
                        <p>Total Customers</p>
                        <p className="figures" style={{ color: "#d70f64" }}>{totalCustomer}</p>
                    </div>
                </div>
                <div className="col-md-3 col-6 p-0 pl-2">
                    <div className="box text-center">
                        <p>Total Orders</p>
                        <p className="figures" style={{ color: "#f5ba1b" }}>{props.totalorders ? props.totalorders : obj.orderRecieved ? obj.orderRecieved : "0"}</p>
                    </div>
                </div>
                <div className="col-md-3 col-6 p-0 pl-2 pr-3">
                    <div className="box text-center">
                        <p>Total Transactions</p>
                        <p className="figures" style={{ color: "#11c15c" }}>${obj.earningRecieved
                            ? obj.earningRecieved < 999 ? obj.earningRecieved :
                                obj.earningRecieved > 999 && obj.earningRecieved < 99999 ? kFormater(obj.earningRecieved) :
                                    obj.earningRecieved > 99999 && obj.earningRecieved < 999999 ? mFormater(obj.earningRecieved) :
                                        obj.earningRecieved > 999999 && obj.earningRecieved < 9999999 ? bFormater(obj.earningRecieved) :
                                            obj.earningRecieved > 9999999 && obj.earningRecieved < 99999999 ? tFormater(obj.earningRecieved) : 0 : 0}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBoxComponent;
