import React from 'react';
import headingBorder from '../../../images/horizontalLine.png';
import Scrollbars from 'react-custom-scrollbars';

const SubAdminDetailsComponent = (props) => {
    return (
        <div>
            <section id="profile-container">
                <div className="container px-5">
                    <div className="row">
                        <div className='col-md-3'></div>
                        <div className='col-md-6 text-center'>
                            <p className="form-heading"><b>Sub Admin</b> Profile</p>
                            <img alt='' src={headingBorder} className="img-fluid" />
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-5 col-6 pr-5 text-right mt-3">
                            <span className="w150 display pt-5" style={{ position: "absolute", top: "10%", left: "39%" }}>
                                <p>Full Name </p>
                                <h3 className="text-center mt-4">{props.selectedSubAdmin.full_name}</h3>
                            </span>
                        </div>
                        <div className="col-md-7 col-12 pl-5 border-left details-column">
                            <Scrollbars style={{ height: "58vh", width: "100%" }} className="profile-scrollbar" >
                                <p>EMAIL :</p>
                                <h4>{props.selectedSubAdmin.email}</h4>
                                <p>MOBILE :</p>
                                <h4>{props.selectedSubAdmin.mobile_number}</h4>
                                <p>ADDRESS :</p>
                                <h4>{props.selectedSubAdmin.address}</h4>
                                <p>Status :</p>
                                <h4>{props.selectedSubAdmin.status}</h4>
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default SubAdminDetailsComponent;