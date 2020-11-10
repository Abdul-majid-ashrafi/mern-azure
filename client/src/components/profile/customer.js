import React from 'react';
import profileImage from '../../images/profile-image.png';
import headingBorder from '../../images/horizontalLine.png';
import Scrollbars from 'react-custom-scrollbars';

function CustomerComponent(props) {
    return (
        <section id="profile-container">
            <div className="container px-5">
                <div className="row">
                    <div className='col-md-3'></div>
                    <div className='col-md-6 col-6 text-center'>
                        <p className="form-heading"><b>Customer</b> Profile</p>
                        <img alt='' src={headingBorder} className="img-fluid" />
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-5 col-6 pr-5 text-right mt-3">
                        <span className="w150">
                            <div>
                                <img alt='' src={props.change_image ? props.change_image : props.user.image ? `https://drive.google.com/thumbnail?id=${props.user.image}` : profileImage} className="profile-img-size" />
                                <div style={{ height: "0px", overflow: "hidden" }}>
                                    <input type="file" onChange={props.imageHandler} id="fileInput" name="fileInput" />
                                </div>
                                <button className="update_image_icon" onClick={props.chooseFile}>
                                    <i className="fas fa-plus "  ></i>
                                </button>
                            </div>
                            <h3 className="text-center mt-4">{props.user.full_name.toUpperCase()}</h3>
                            {props.change_image
                                ? <button onClick={() => props.updateUser(props.user.type, props.user.image)} className=' update-button col-md-12 mb-3'>Update Profile</button>
                                : null}
                        </span>
                    </div>
                    <div className="col-md-7 col-12 pl-5 border-left details-column">
                        <Scrollbars style={{ height: "43vh", width: "100%" }} className="profile-scrollbar" >
                            <p>EMAIL :</p>
                            <h4>{props.user.email}</h4>
                            <p>MOBILE :</p>
                            <h4>{props.user.mobile_number}</h4>
                            <p>ADDRESS :</p>
                            <h4>{props.user.address}</h4>
                            <p>CITY :</p>
                            <h4>{props.user.city}</h4>
                            <p>STATE :</p>
                            <h4>{props.user.state}</h4>
                            <p>COUNTRY :</p>
                            <h4>{props.user.country}</h4>
                            <p>POSTAL CODE :</p>
                            <h4>{props.user.postal_code}</h4>
                            <p>STATUS :</p>
                            <h4>{props.user.status}</h4>
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
    );
}

export default CustomerComponent;