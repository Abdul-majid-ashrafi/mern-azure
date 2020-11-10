import React from 'react';
import profileImage from '../../../images/profile-image.png';
import headingBorder from '../../../images/horizontalLine.png';
import Scrollbars from 'react-custom-scrollbars';

const CustomerDetailsComponent = (props) => {
    return (

        <section id="profile-container">
            <div className="container px-5">
                <div className="row">
                    <div className='col-md-3'></div>
                    <div className='col-md-6 text-center'>
                        <p className="form-heading"><b>Customer</b> Profile</p>
                        <img alt='' src={headingBorder} className="img-fluid" />
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-5 col-6 pr-5 text-right mt-3">
                        <span className="w150 display">
                            <img alt='' src={props.singleUserData.image ? props.singleUserData.image : profileImage} className=" profile-img-size" />
                            <h3 className="text-center mt-4">{props.singleUserData.full_name.toUpperCase()}</h3>
                        </span>
                    </div>
                    <div className="col-md-7 col-12 pl-5 border-left details-column">
                        <Scrollbars style={{ height: "58vh", width: "100%" }} className="profile-scrollbar" >
                            <div className="w150 w-100 float-left text-center display-none">
                                <img alt='' src={profileImage} className=" profile-img-size" />
                                <h3 className="text-center mt-4">{props.singleUserData.full_name && props.singleUserData.full_name.toUpperCase()}</h3>
                            </div>
                            <p>EMAIL :</p>
                            <h4>{props.singleUserData.email}</h4>
                            <p>MOBILE :</p>
                            <h4>{props.singleUserData.mobile_number}</h4>
                            <p>ADDRESS :</p>
                            <h4>{props.singleUserData.address}</h4>
                            <p>CITY :</p>
                            <h4>{props.singleUserData.city}</h4>
                            <p>STATE :</p>
                            <h4>{props.singleUserData.state}</h4>
                            <p>COUNTRY :</p>
                            <h4>{props.singleUserData.country}</h4>
                            <p>POSTAL CODE :</p>
                            <h4>{props.singleUserData.postal_code}</h4>
                            <p>STATUS :</p>
                            <h4>{props.singleUserData.status}</h4>
                        </Scrollbars>
                    </div>
                </div>
                {/* <h1 style={{textAlign : 'center'}}>Customer Profile</h1>
        <h2>Full NAME : {props.user.full_name}</h2>
        <h2>Mobile Number : {props.user.mobile_number}</h2>
        <h2>Email : {props.user.email}</h2>
        <h2>Address : {props.user.address}</h2>
        <h2>City : {props.user.city}</h2>
        <h2>Country : {props.user.country}</h2>
        <h2>Postal Code : {props.user.postal_code}</h2>
        <h2>State : {props.user.state}</h2>
        <h2>Status : {props.user.status}</h2> */}
            </div>
        </section>
        // <div>
        //     {( props.singleUserData) ? <div>
        //         <h1 style={{ textAlign: 'center' }}>Customer Details</h1>
        //         <h2>Full NAME : {props.singleUserData.full_name}</h2>
        //         <h2>Mobile Number : {props.singleUserData.mobile_number}</h2>
        //         <h2>Email : {props.singleUserData.email}</h2>
        //         <h2>Address : {props.singleUserData.address}</h2>
        //         <h2>City : {props.singleUserData.city}</h2>
        //         <h2>Country : {props.singleUserData.country}</h2>
        //         <h2>Postal Code : {props.singleUserData.postal_code}</h2>
        //         <h2>State : {props.singleUserData.state}</h2>
        //         <h2>Status : {props.singleUserData.status}</h2>
        //     </div> : history.push('/list')}
        // </div>
    )
}
export default CustomerDetailsComponent;