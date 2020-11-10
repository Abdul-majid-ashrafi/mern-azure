import React from "react";
// import { Button } from "antd";
import { Link } from "react-router-dom";
import profileImage from '../../images/profile-image.png';
import headingBorder from '../../images/horizontalLine.png';
import Scrollbars from 'react-custom-scrollbars';
import ReactStars from 'react-rating-stars-component';

function SupplierComponent(props) {
    const user = props.auth.user;
    const isMenu = (user.menu) ? true : false;
    return (
        <section id="profile-container">
            <div className="container px-5">
                <div className="row">
                    <div className='col-md-3'></div>
                    <div className='col-md-6 col-12 text-center'>
                        <p className="form-heading"><b>Kitchen</b> Profile</p>
                        <img alt='' src={headingBorder} className="img-fluid" />
                    </div>
                    <div style={{ display: "flex" }} className='col-md-12 justify-content-center'>
                        <ReactStars
                            edit={false}
                            isHalf={true}
                            count={5}
                            value={user.menu.rating.avg ? user.menu.rating.avg : 0}
                            size={30}
                        />
                    </div>
                    <div className="col-md-3"></div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-3 text-right menu-button pr-4">
                        {(isMenu) ? <Link to="/"><button>Menu</button></Link> : ""}
                    </div>
                    <div className="col-md-5 pr-5 col-5 text-right mt-3">
                        <span className="w150 display">
                            {user && user.image
                                ? <div>
                                    <img alt='' src={props.change_image ? props.change_image : `https://drive.google.com/thumbnail?id=${user.image}`} className="profile-img-size" />
                                    <div style={{ height: "0px", overflow: "hidden" }}>
                                        <input type="file" onChange={props.imageHandler} id="fileInput" name="fileInput" />
                                    </div>
                                    <button className="update_image_icon" onClick={props.chooseFile}>
                                        <i className="fas fa-plus "  ></i>
                                    </button>
                                </div> : null
                            }
                            <h3 className="text-center mt-4">{user.entity_name && user.entity_name.toUpperCase()}</h3>
                            {props.mood.length || props.change_image
                                ? <button onClick={() => props.updateUser(user.type, user.image)} className=' update-button col-md-12 mb-3'>Update Profile</button>
                                : null}
                        </span>
                    </div>
                    <div className="col-md-7 pl-5 col-7 border-left details-column">

                        <Scrollbars style={{ height: "43vh", width: "100%" }} className="profile-scrollbar" >
                            <div className="w150 w-100 float-left display-none">
                                <img alt='' src={profileImage} className=" profile-img-size" />
                                <h3 className="text-center mt-4">{user.entity_name && user.entity_name.toUpperCase()}</h3>
                            </div>
                            {user.ABN_number ? <div>
                                <p>ABD NUMBER :</p>
                                <h4>{user.ABN_number}</h4>
                            </div> : null}
                            {user.ABN_status ? <div>
                                <p>ABN STATUS :</p>
                                <h4>{user.ABN_status}</h4>
                            </div> : null}
                            {user.GST ? <div>
                                <p>GST :</p>
                                <h4>{user.GST}</h4>
                            </div> : null}
                            {user.MBL ? <div>
                                <p>MAIN BUSINESS LOCATION :</p>
                                <h4>{user.MBL}</h4>
                            </div> : null}
                            <p>Mood</p>
                            <div className='' style={{ display: 'flex', justifyContent: 'center' }}>
                                <h4><div className='col-md-3'>
                                    <div className='form-check form-check-inline'>
                                        <input className="form-check-input" onChange={props.checkBoxHandler} name='days' value="Pickup" type="checkbox" id="Pickup" />
                                        <label className='form-check-label myInput' htmlFor="Pickup">Pickup</label>
                                    </div>
                                </div></h4>
                                <h4> <div className='col-md-3'>
                                    <div className='form-check form-check-inline'>
                                        <input className="form-check-input" onChange={props.checkBoxHandler} name='days' value="Delivery" type="checkbox" id="Dilivery" />
                                        <label className='form-check-label myInput' htmlFor="Dilivery">Delivery</label>
                                    </div>
                                </div></h4>
                            </div>
                            {user.address ? <div>
                                <p>ADDRESS :</p>
                                <h4>{user.address}</h4>
                            </div> : null}
                            {user.email ? <div>
                                <p>EMAIL :</p>
                                <h4>{user.email}</h4>
                            </div> : null}
                            {user.postal_code ? <div>
                                <p>POSTAL CODE :</p>
                                <h4>{user.postal_code}</h4>
                            </div> : null}
                            {user.business ? <div>
                                <p>BUSINESS :</p>
                                <h4>{user.business}</h4>
                            </div> : null}
                            {user.entity_type ? <div>
                                <p>ENTITY TYPE :</p>
                                <h4>{user.entity_type}</h4>
                            </div> : null}
                            {user.status ? <div>
                                <p>STATUS :</p>
                                <h4>{user.status}</h4>
                            </div> : null}
                            {(user.passport_image) ? <div>
                                <p> Passport Image : </p>
                                <img alt='' src={`https://drive.google.com/thumbnail?id=${user.passport_image}`} />
                            </div> : ''}
                            {(user.drivinglicense_image) ? <div>
                                <p> Driving License Image : </p>
                                <img alt='' src={`https://drive.google.com/thumbnail?id=${user.drivinglicense_image}`} />
                            </div> : ''}
                            {(user.any_utility_bill_image) ? <div>
                                <p> Any Utility Bill Image : </p>
                                <img alt='' src={`https://drive.google.com/thumbnail?id=${user.any_utility_bill_image}`} />
                            </div> : ''}
                        </Scrollbars>
                    </div>
                </div>


                {/* {(isMenu) ? <Link to="/menu">Menu</Link> : ""}
            <h1 style={{ textAlign: "center" }}>Supplier Profile</h1> */}
                {/* <img src='' */}
                {/* <h2>ABN Number : {user.ABN_number}</h2>
            <h2>ABN Status : {user.ABN_status}</h2>
            <h2>GST : {user.GST}</h2>
            <h2>Main Bussines Location : {user.MBL}</h2>
            <h2>address : {user.address}</h2> */}
                {/* {user.business ?
                <h2>
                    Bussiness :
            <ul>
                        <li>Name : {user.business.name} </li>
                        <li>
                            Registration Date : {user.business.registration_date}{" "}
                        </li>
                        <li>Renewal Date : {user.business.renewal_date} </li>
                        <li>Status : {user.business.status} </li>
                    </ul>
                </h2>
                : ""} */}
                {/* <h2>email : {user.email}</h2>
            <h2>entity Name : {user.entity_name}</h2>
            <h2>entity Type : {user.entity_type}</h2> */}
                {/* <h2>Is Verified Address : {user.is_verified_address}</h2> */}
                {/* <h2>Is Approved By Admin : {user.is_approved_by_admin}</h2> */}
                {/* <h2>Status : {user.status}</h2>
            {(user.passport_image) ? <div>
                <h1> Passport Image : </h1>
                <img src={user.passport_image} alt='' />
            </div> : ''}
            {(user.drivinglicense_image) ? <div>
                <h1> Driving License Image : </h1>
                <img alt="" src={user.drivinglicense_image} />
            </div> : ''}
            {(user.any_utility_bill_image) ? <div>
                <h1> Any Utility Bill Image : </h1>
                <img alt="" src={user.any_utility_bill_image} />
            </div> : ''} */}
            </div>
        </section>
    );
}

export default SupplierComponent;
