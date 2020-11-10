import React from 'react';
import profileImage from '../../../images/profile-image.png';
import Scrollbars from 'react-custom-scrollbars';
import headingBorder from '../../../images/horizontalLine.png';
import ReactStars from 'react-rating-stars-component';

const SupplierDetailsComponent = (props) => {
    const selected_user = props.selectedSupplier;
    console.log(selected_user);
    return (
        <section id="profile-container">
            <div className="container px-5">
                <div className="row">
                    <div className='col-md-3'></div>
                    <div className='col-md-6 col-12 text-center'>
                        <p className="form-heading"><b>Kitchen</b> Profile</p>
                        <img alt='' src={headingBorder} className="img-fluid" />
                    </div>
                    <div className="col-md-3"></div>
                    <div style={{ display: "flex" }} className='col-md-12 justify-content-center'>
                        {selected_user.menu && selected_user.menu.rating ? <ReactStars
                            edit={false}
                            isHalf={true}
                            count={5}
                            value={selected_user.menu.rating.avg ? selected_user.menu.rating.avg : 0}
                            size={30}
                        /> : null}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5 pr-5 col-5 text-right mt-3">
                        <span className="w150 display">
                            <img alt='' src={selected_user.image ? `https://drive.google.com/thumbnail?id=${selected_user.image}` : profileImage} className=" profile-img-size" />
                            <h3 className="text-center mt-4">{selected_user.entity_name && selected_user.entity_name.toUpperCase()}</h3>
                        </span>
                        {props.isFeatured
                            ? <div className="text-center loader-alignment" style={{ position: "absolute", top: "77%", left: "58%" }}>
                                <span style={{ width: '2rem', height: "2rem" }} className='spinner-border myInput text-primary spinner-border-sm'></span>
                            </div>
                            : selected_user.featured
                                ? <button className="update-button col-md-6 mb-3 mr-3" onClick={() => props.isUnFeatured(selected_user)}>Un Featured</button>
                                : <button className="update-button col-md-6 mb-3 mr-3" onClick={() => props.featured(selected_user)}>Featured</button>
                        }
                    </div>
                    <div className="col-md-7 pl-5 col-7 border-left details-column">
                        <Scrollbars style={{ height: "58vh", width: "100%" }} className="adminPanel-profile-scrollbar" >
                            <div className="w150 w-100 float-left text-center display-none">
                                <img alt='' src={profileImage} className=" profile-img-size" />
                                <h3 className="text-center mt-4">{selected_user.entity_name && selected_user.entity_name.toUpperCase()}</h3>
                            </div>
                            <p>ABD NUMBER :</p>
                            <h4>{selected_user.ABN_number}</h4>
                            <p>ABN STATUS :</p>
                            <h4>{selected_user.ABN_status}</h4>
                            <p>GST :</p>
                            <h4>{selected_user.GST}</h4>
                            <p>MAIN BUSINESS LOCATION :</p>
                            <h4>{selected_user.MBL}</h4>
                            <p>ADDRESS :</p>
                            <h4>{selected_user.address}</h4>
                            <p>EMAIL :</p>
                            <h4>{selected_user.email}</h4>
                            <p>Bussines :</p>
                            <h4>{selected_user.business}</h4>
                            <p>POSTAL CODE :</p>
                            <h4>{selected_user.postal_code}</h4>
                            {/* {selected_user.business ?
                                <div>
                                    <h3>Business</h3>
                                    <p>NAME</p>
                                    <h4>{selected_user.business.name}</h4>
                                    <p>REGISTRATION DATE</p>
                                    <h4>{selected_user.business.registration_date}</h4>
                                    <p>RENEWAL DATE</p>
                                    <h4>{selected_user.business.renewal_date}</h4>
                                    <p>STATUS</p>
                                    <h4>{selected_user.business.status}</h4>
                                </div>
                                : ""} */}
                            <p>ENTITY TYPE :</p>
                            <h4>{selected_user.entity_type}</h4>
                            <p>STATUS :</p>
                            <h4>{selected_user.status}</h4>
                            {(selected_user.passport_image) ? <div>
                                <p> Passport Image : </p>
                                <img alt='' src={`https://drive.google.com/thumbnail?id=${selected_user.passport_image}`} />
                            </div> : ''}
                            {(selected_user.drivinglicense_image) ? <div>
                                <p> Driving License Image : </p>
                                <img alt='' src={`https://drive.google.com/thumbnail?id=${selected_user.drivinglicense_image}`} />
                            </div> : ''}
                            {(selected_user.any_utility_bill_image) ? <div>
                                <p> Any Utility Bill Image : </p>
                                <img alt='' src={`https://drive.google.com/thumbnail?id=${selected_user.any_utility_bill_image}`} />
                            </div> : ''}
                        </Scrollbars>
                    </div>

                </div>
            </div>
        </section>
        //     <h1 style={{ textAlign: "center" }}>Supplier Profile</h1>
        //             {/* <img src='' */ }
        // <h2>ABN Number : {selected_user.ABN_number}</h2>
        //     <h2>ABN Status : {selected_user.ABN_status}</h2>
        //     <h2>GST : {selected_user.GST}</h2>
        //     <h2>Main Bussines Location : {selected_user.MBL}</h2>
        //     <h2>address : {selected_user.address}</h2>
        //             {
        //     selected_user.business ?
        //         <h2>
        //             Bussiness :
        //                     <ul>
        //                 <li>Name : {selected_user.business.name} </li>
        //                 <li>
        //                     Registration Date : {selected_user.business.registration_date}{" "}
        //                 </li>
        //                 <li>Renewal Date : {selected_user.business.renewal_date} </li>
        //                 <li>Status : {selected_user.business.status} </li>
        //             </ul>
        //         </h2>
        //         : ""
        // }
        // <h2>email : {selected_user.email}</h2>
        //     <h2>entity Name : {props.singleUserData.entity_name}</h2>
        //     <h2>entity Type : {props.singleUserData.entity_type}</h2>
        //             {/* <h2>Is Verified Address : {props.singleUserData.is_verified_address}</h2> */ }
        // {/* <h2>Is Approved By Admin : {props.singleUserData.is_approved_by_admin}</h2> */ }
        // <h2>Status : {props.singleUserData.status}</h2>
        // {
        //     (props.singleUserData.passport_image) ? <div>
        //         <h1> Passport Image : </h1>
        //         <img src={props.singleUserData.passport_image} alt='' />
        //     </div> : ''
        // }
        // {
        //     (props.singleUserData.drivinglicense_image) ? <div>
        //         <h1> Driving License Image : </h1>
        //         <img alt="" src={props.singleUserData.drivinglicense_image} />
        //     </div> : ''
        // }
        // {
        //     (props.singleUserData.any_utility_bill_image) ? <div>
        //         <h1> Any Utility Bill Image : </h1>
        //         <img alt="" src={props.singleUserData.any_utility_bill_image} />
        //     </div> : ''
        // }
        //         </div >
        //     </div >
    );
};
export default SupplierDetailsComponent;