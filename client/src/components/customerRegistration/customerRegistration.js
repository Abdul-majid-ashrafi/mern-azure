import React from 'react';
import './customerRegistration.css';
import headingBorder from '../../images/horizontalLine.png';
import Scrollbars from 'react-custom-scrollbars';
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function CustomerRegComponent(props) {
    return (
        <section id="supplierRegForm">
            <div className='container px-5 mt-5'>
                <Scrollbars style={{ height: "60vh" }} className="reg-scroll">
                    <div className='row pr-3 pb-3'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6 text-center'>
                            <p className="form-heading"><b>Customer</b> Registration</p>
                            <img src={headingBorder} alt='' className="img-fluid" />
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-12" >
                            <form onSubmit={props.onFormFinish} autoComplete="off">
                                <div className="row px-3">
                                    <div className="col-md-4 input">
                                        <h5>Full Name <span className="required">*</span></h5>
                                        <input required type="text" onChange={props.handleChange} name="full_name" id="full_name" className="form-control" defaultValue={props.customerDetails.full_name} />
                                    </div>
                                    <div className="col-md-4 input">
                                        <h5>Mobile Number<span className="required">*</span></h5>
                                        <input required type="number" min="0" onChange={props.handleChange} name="mobile_number" id="mobile_number" className="form-control" />
                                    </div>
                                    <div className="col-md-4 input">
                                        <h5>Email Address<span className="required">*</span></h5>
                                        <input required type="email" onChange={props.handleChange} name="email" id="email" className="form-control" disabled={(props.customerDetails.email) ? true : false} value={props.customerDetails.email} />
                                    </div>
                                    <div className="col-md-4 input">
                                        <h5>Country</h5>
                                        {/* <ReactSearchAutocomplete
                                            items={props.renderAllCountries}
                                            onSelect={props.handleOnSelectInCountry}
                                            onFocus={props.handleOnFocusInCuntry}
                                            autoFocus
                                        /> */}
                                        <select defaultValue='Australia' disabled className="custom-select form-control" name="Country" id='Country'>
                                            <option value='Australia'>Australia</option>
                                        </select>
                                    </div>
                                    {/* <div className="col-md-4 input">
                                        <h5>Country<span className="required">*</span></h5>
                                        <input required type="text" onChange={props.handleChange} name="country" id="country" className="form-control" />
                                    </div> */}
                                    {/* <div className="col-md-4 input">
                                        <h5>City<span className="required">*</span></h5>
                                        <input required type="text" onChange={props.handleChange} name="city" id="city" className="form-control" />
                                    </div> */}
                                    <div className="col-md-4 input">
                                        <h5>State
                                        <div className="spinner-border text-primary supplier-reg-loader" style={props.isStateFetch ? { display: "inline-block" } : { display: "none" }} role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </h5>
                                        <select defaultValue='null' onChange={props.handleOnSelectInState} className="custom-select form-control" name="state" id='state'>
                                            {props.allCountryState.map((state, idx) => {
                                                return <option key={idx}>{state.state_name}</option>;
                                            })}
                                            <option style={{ display: 'none' }} value='null'></option>
                                        </select>
                                        {/* <ReactSearchAutocomplete
                                            className='test'
                                            items={props.renderAllCountryState}
                                            onSelect={props.handleOnSelectInState}
                                            onFocus={props.handleOnFocusInState}
                                        /> */}
                                    </div>
                                    <div className="col-md-4 input">
                                        <h5>City
                                        <div className="spinner-border text-primary supplier-reg-loader" style={props.isCityFetch ? { display: "inline-block" } : { display: "none" }} role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </h5>
                                        <ReactSearchAutocomplete
                                            styling={
                                                {
                                                    height: "",
                                                    border: "",
                                                    borderRadius: "",
                                                    backgroundColor: "",
                                                    boxShadow: "",
                                                    hoverBackgroundColor: "",
                                                    color: "",
                                                    fontSize: "",
                                                    iconColor: "",
                                                    lineColor: "",
                                                    placeholderColor: "",
                                                    fontFamily: "",
                                                }
                                            }
                                            items={props.renderAllCountryCity}
                                            onSearch={props.handleOnSearchInCity}
                                            onSelect={props.handleOnSelectInCity}
                                            onFocus={props.handleOnFocusInCity}
                                        />
                                    </div>
                                    <div className="col-md-6 input">
                                        <h5>Suburb<span className="required">*</span></h5>
                                        <input required type="text" onChange={props.handleChange} name="Suburb" id="Suburb" className="form-control" />
                                    </div>
                                    <div className="col-md-6 input">
                                        <h5>Postal Code<span className="required">*</span></h5>
                                        <input required type="number" min="0" onChange={props.handleChange} name="postal_code" id="postal_code" className="form-control" />
                                    </div>
                                    <div className="col-md-6 input">
                                        <h5>Image</h5>
                                        <div className="custom-file">
                                            <input type="file" onChange={(e) => props.imageHandler(e, "abn_image")} id="abn_image" name="abn_image" className="custom-file-input" />
                                            <label className="custom-file-label form-control" htmlFor="abn_image"></label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 input">
                                        <h5>Address<span className="required">*</span></h5>
                                        <input required type="text" onChange={props.handleChange} name="address" id="address" className="form-control" />
                                    </div>
                                    <div className="col-md-12 text-center mt-3 mb-3 ">
                                        <button type="submit" className="continue-button background-color">Continue <span className="icon icon-arrow-long"></span></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        </section>
    );
}
export default CustomerRegComponent;