import React from 'react';
import './supplierRegistration.css';
import headingBorder from '../../images/horizontalLine.png';
import Scrollbars from 'react-custom-scrollbars';
// import { addressFinder } from '../../store/actions';

const SupplierRegComponent = (props) => {
    // const formItemLayout = {
    //     labelCol: { span: 5 },
    //     wrapperCol: { span: 15 },
    // };
    return (
        <section id="supplierRegForm">
            <div className='container px-5 mt-5'>
                <Scrollbars style={{ height: "60vh" }} className="reg-scroll">
                    <div className='row pr-3 pb-3'>
                        <div className='col-md-3'></div>
                        <div className='col-md-6 text-center'>
                            <p className="form-heading"><b>Kitchen</b> Registration</p>
                            <img alt='' src={headingBorder} className="img-fluid" />
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="search-toggle text-center display mt-3">
                                <div className="custom-control custom-switch">
                                    <label id="abn" className="toggleLabel1 toggleColor">ABN</label>
                                    <input type="checkbox" className="custom-control-input" onChange={props.onChangeABNSelection} id="customSwitch2" />
                                    <label id="nonabn" className={`custom-control-label toggleLabel2`} htmlFor="customSwitch2">Non ABN</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-12">
                            <div style={{ display: props.abnSelection === '' ? 'none' : props.abnSelection === "Non-ABN" ? "none" : 'block' }}>
                                {/* <form onSubmit={props.onFinishABN} method="POST" enctype="multipart/form-data"> */}
                                <form onSubmit={props.onFinishABN} autoComplete='off'>
                                    <div className="row px-3">
                                        <div className="col-md-4 input">
                                            <h5>ABN Number <span className="required">*</span>
                                                <div className="spinner-border text-primary supplier-reg-loader" style={props.ABNFlag ? { display: "inline-block" } : { display: "none" }} role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </h5>
                                            <input type="text" onChange={props.onChangeABNDetails} value={props.ABN_number} name="ABN_number" onBlur={props.ABN_numberEntered} className="form-control" required />
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>Entity Name</h5>
                                            <input type="text" disabled name="entity_name" className="form-control" defaultValue={props.entity_name} />
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>ABN Status</h5>
                                            <input type="text" disabled name="ABN_status" className="form-control" defaultValue={props.ABN_status} />
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>Entity Type</h5>
                                            <input type="text" disabled name="entity_type" className="form-control" defaultValue={props.entity_type} />
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>Good And Services Tax</h5>
                                            <input type="text" disabled name="GST" className="form-control" defaultValue={props.GST} />
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>Main Business Location</h5>
                                            <input type="text" disabled name="MBL" className="form-control" defaultValue={props.MBL} />
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>Business Name <span className="required">*</span></h5>
                                            <div className="form-group">
                                                {/* <select className="custom-select form-control" name="business"  onChange={props.onChangeBussiness} onChange={props.onChangeABNDetails} required> */}
                                                <select className="custom-select form-control" name="business" onChange={props.onChangeABNDetails} required>
                                                    {props.dictbusiness.map((business) => <option key={business.value} value={business.value}>{business.value}</option>)}
                                                </select>
                                                <div className="invalid-feedback">Example invalid custom select feedback</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>Latitude</h5>
                                            <input type="text" disabled name="lat" value={props.location.coordinates[1]} className="form-control" />
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>Longitude</h5>
                                            <input type="text" disabled name="long" value={props.location.coordinates[0]} className="form-control" />
                                        </div>
                                        <div className="row col-md-12">
                                            <div className="col-md-6 input">
                                                <h5>Image</h5>
                                                <div className="custom-file">
                                                    <input type="file" onChange={(e) => props.imageHandler(e, "abn_image")} id="abn_image" name="abn_image" className="custom-file-input" />
                                                    <label className="custom-file-label form-control" htmlFor="abn_image"></label>
                                                </div>
                                            </div>
                                            <div className='col-md-6 input'>
                                                <h5 className='mb-5'>Payment Mode</h5>
                                                <div className=' form-check-inline mt-3'>
                                                    <input className="form-check-input" onChange={props.abnPaymentcheckBoxHandler} name='paymentMode' value="Cash On Delivery" type="checkbox" id="abnCashOnDelivery" />
                                                    <label className='form-check-label myInput' htmlFor="abnCashOnDelivery">Cash On Delivery</label>
                                                </div>
                                                <div className='form-check-inline mt-3'>
                                                    <input className="form-check-input" onChange={props.abnPaymentcheckBoxHandler} name='paymentMode' value="Bank Transfer" type="checkbox" id="abnBankTransfer" />
                                                    <label className='form-check-label myInput' htmlFor="abnBankTransfer">Bank Transfer</label>
                                                </div>
                                            </div>
                                        </div>
                                        {props.abnBankTransferFlag ? <div className="col-md-6 input">
                                            <h5>Bank Name</h5>
                                            <input type="text" required onChange={props.abnAccountDetailInputHandler} name="bank_name" id="bankName" className="form-control" />
                                        </div> : null}
                                        {props.abnBankTransferFlag ? <div className="col-md-6 input">
                                            <h5>A/C Title</h5>
                                            <input type="text" required onChange={props.abnAccountDetailInputHandler} name="account_title" id="account_title" className="form-control" />
                                        </div> : null}
                                        {props.abnBankTransferFlag ? <div className="col-md-6 input">
                                            <h5>Account Number</h5>
                                            <input type="text" required onChange={props.abnAccountDetailInputHandler} name="account_number" id="account_number" className="form-control" />
                                        </div> : null}
                                        {props.abnBankTransferFlag ? <div className="col-md-6 input">
                                            <h5>BSB</h5>
                                            <input type="text" required onChange={props.abnAccountDetailInputHandler} name="bsb" id="bsb" className="form-control" />
                                        </div> : null}
                                        <div className="col-md-12 text-left mt-5">
                                            <div className="custom-control custom-switch">
                                                <label id="verifiedAdd" className="toggleLabel1 toggleColor">Verified Address</label>
                                                <input type="checkbox" name="isAddressVerifiedBool" className="custom-control-input" onChange={props.onChangeAddressSelectionABN} id="customSwitch4" />
                                                <label id="nonVerifiedAdd" className={`custom-control-label toggleLabel2`} htmlFor="customSwitch4">Non Verified Address</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12" style={{ display: props.addresseselectionABN === "Verified-Address" ? 'block' : "none" }} >
                                            <div className="row">
                                                <div className="col-md-4 input autocomplete">
                                                    <h5>Address
                                                    <div className="spinner-border text-primary supplier-reg-loader" style={props.isAddressVerifying ? { display: "inline-block" } : { display: "none" }} role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </h5>
                                                    <input type="text" name="address" id="addressFinder" onChange={props.autoComplete} className="form-control" />
                                                </div>
                                                <div className="col-md-4 input">
                                                    <h5>Address Line 2</h5>
                                                    <input type="text" name="address_line_2" value={props.verifiedAddress ? Object.keys(props.verifiedAddress).length && props.verifiedAddress.address.address_line_2 ? props.verifiedAddress.address.address_line_2 : '' : ''} disabled className="form-control" />
                                                </div>
                                                <div className="col-md-4 input">
                                                    <h5>Suburb</h5>
                                                    <input type="text" name="Suburb" value={props.verifiedAddress ? Object.keys(props.verifiedAddress).length ? props.verifiedAddress.address.locality_name : '' : ''} disabled className="form-control" />
                                                </div>
                                                <div className="col-md-4 input">
                                                    <h5>State</h5>
                                                    <input type="text" value={props.verifiedAddress ? Object.keys(props.verifiedAddress).length ? props.verifiedAddress.address.state_territory : '' : ''} name="state" disabled className="form-control" />
                                                </div>
                                                <div className="col-md-4 input">
                                                    <h5>Postal Code</h5>
                                                    <input type="text" value={props.verifiedAddress ? Object.keys(props.verifiedAddress).length ? props.verifiedAddress.address.postcode : '' : ''} name="postal_code" disabled className="form-control" />
                                                </div>
                                                <div className="col-md-4 input">
                                                    <h5>Mode</h5>
                                                    <div className=' form-check-inline mt-3'>
                                                        <input className="form-check-input" onChange={props.modecheckBoxHandler} name='days' value="Pickup" type="checkbox" id="Pickup" />
                                                        <label className='form-check-label myInput' htmlFor="Pickup">Pickup</label>
                                                    </div>
                                                    <div className='form-check-inline mt-3'>
                                                        <input className="form-check-input" onChange={props.modecheckBoxHandler} name='days' value="delivery" type="checkbox" id="Delivery" />
                                                        <label className='form-check-label myInput' htmlFor="Delivery">Delivery</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12" style={{ display: props.addresseselectionABN === "Non-Verified-Address" ? "block" : 'none' }} >
                                            <div className="row">
                                                <div className="col-md-4 input">
                                                    <h5>Address</h5>
                                                    <input type="text" onChange={props.onChangeABNDetails} name="address" className="form-control" />
                                                </div>
                                                <div className="col-md-4 input">
                                                    <h5>Address Line 2</h5>
                                                    <input type="text" onChange={props.onChangeABNDetails} name="address_line_2" className="form-control" />
                                                </div>
                                                <div className="col-md-4 input">
                                                    <h5>Suburb</h5>
                                                    <input type="text" onChange={props.onChangeABNDetails} name="Suburb" className="form-control" />
                                                </div>
                                                <div className="col-md-4 input">
                                                    <h5>State</h5>
                                                    <input type="text" onChange={props.onChangeABNDetails} name="state" className="form-control" />
                                                </div>
                                                <div className="col-md-4 input">
                                                    <h5>Postal Code</h5>
                                                    <input type="text" onChange={props.onChangeABNDetails} name="postal_code" className="form-control" />
                                                </div>
                                                <div className="col-md-4 input">
                                                    <h5>Mode</h5>
                                                    <div className=' form-check-inline mt-3'>
                                                        <input className="form-check-input mt-3" onChange={props.modecheckBoxHandler} name='days' value="Pickup" type="checkbox" id="abnPickup" />
                                                        <label className='form-check-label myInput' htmlFor="abnPickup">Pickup</label>
                                                    </div>
                                                    <div className='form-check-inline mt-3'>
                                                        <input className="form-check-input mt-3" onChange={props.modecheckBoxHandler} name='days' value="delivery" type="checkbox" id="abnDilivery" />
                                                        <label className='form-check-label myInput' htmlFor="abnDilivery">Delivery</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>Passport</h5>
                                            <div className="custom-file">
                                                <input type="file" id="passport_images" name="passport_images" className="custom-file-input" onChange={props.passportImageHandler} />
                                                <label className="custom-file-label form-control" htmlFor="passport_images"></label>
                                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>Driving License</h5>
                                            <div className="custom-file">
                                                <input type="file" id="drivinglicense_images" name="drivinglicense_images" className="custom-file-input" onChange={props.drivingImageHandler} />
                                                <label className="custom-file-label form-control" htmlFor="drivinglicense_images"></label>
                                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 input">
                                            <h5>Any Utility Bill</h5>
                                            <div className="custom-file">
                                                <input type="file" id="any_utility_bill_images" name="any_utility_bill_images" className="custom-file-input" onChange={props.billImageHandler} />
                                                <label className="custom-file-label form-control" htmlFor="any_utility_bill_images"></label>
                                                <div className="invalid-feedback">Example invalid custom file feedback</div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 text-center mt-3 mb-3 ">
                                            {props.userStatus ? <p>Please Contact Admin For Account Activation</p>
                                                : <button type="submit" className="continue-button background-color">Continue <span className="icon icon-arrow-long"></span></button>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="row px-3" style={{ display: props.abnSelection === "Non-ABN" ? "" : "none" }} >
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="search-toggle text-center display mt-3">
                                        <div className="custom-control custom-switch">
                                            <label id="verifiedAddNonABN" className="toggleLabel1 toggleColor">Verified Address</label>
                                            <input type="checkbox" className="custom-control-input" onChange={props.onChangeAddressSelection} id="customSwitch3" />
                                            <label id="nonVerifiedAddNonABN" className={`custom-control-label toggleLabel2`} htmlFor="customSwitch3">Non Verified Address</label>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-12" style={{ display: props.addresseselection === '' ? 'none' : props.addresseselection === "Non-Verified-Address" ? "none" : 'block' }} >
                                    <form onSubmit={props.onFinishVerifiedAddress} autoComplete='off'>
                                        <div className="row px-3">
                                            <div className="col-md-4 input">
                                                <h5>Business Name <span className="required">*</span></h5>
                                                <input type="text" onChange={props.onChangeNonABNVerifiedAddress} name="business" id="BusinessName" className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Address</h5>
                                                <input type="text" id="addressFinder2" onChange={props.autoComplete} name="address" className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Address Line 2</h5>
                                                <input type="text" value={props.verifiedAddress ? Object.keys(props.verifiedAddress).length && props.verifiedAddress.address.address_line_2 ? props.verifiedAddress.address.address_line_2 : '' : ''} name="address_line_2" id="address_line_2" disabled className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Suburb</h5>
                                                <input type="text" value={props.verifiedAddress ? Object.keys(props.verifiedAddress).length ? props.verifiedAddress.address.locality_name : '' : ''} name="Suburb" id="Suburb" disabled className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Latitude</h5>
                                                <input type="text" disabled name="lat" value={props.location.coordinates[1]} className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Longitude</h5>
                                                <input type="text" disabled name="long" value={props.location.coordinates[0]} className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>State</h5>
                                                <input type="text" value={props.verifiedAddress ? Object.keys(props.verifiedAddress).length ? props.verifiedAddress.address.state_territory : '' : ''} name="state" id="state" disabled className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Postal Code</h5>
                                                <input type="text" value={props.verifiedAddress ? Object.keys(props.verifiedAddress).length ? props.verifiedAddress.address.postcode : '' : ''} name="postal_code" id="postal_code" disabled className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Mode</h5>
                                                <div className=' form-check-inline mt-3'>
                                                    <input className="form-check-input" onChange={props.modecheckBoxHandler} name='days' value="Pickup" type="checkbox" id="varideidPickup" />
                                                    <label className='form-check-label myInput' htmlFor="varideidPickup">Pickup</label>
                                                </div>
                                                <div className='form-check-inline mt-3'>
                                                    <input className="form-check-input" onChange={props.modecheckBoxHandler} name='days' value="delivery" type="checkbox" id="verifiedDilivery" />
                                                    <label className='form-check-label myInput' htmlFor="verifiedDilivery">Delivery</label>
                                                </div>
                                            </div>
                                            <div className="row col-md-12">
                                                <div className="col-md-6 input">
                                                    <h5>Image</h5>
                                                    <div className="custom-file">
                                                        <input type="file" onChange={(e) => props.imageHandler(e, "varified_add_image")} id="abn_image" name="abn_image" className="custom-file-input" />
                                                        <label className="custom-file-label form-control" htmlFor="abn_image"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 input">
                                                    <h5>Payment Mode</h5>
                                                    <div className=' form-check-inline mt-3'>
                                                        <input className="form-check-input" onChange={props.varifedAddressPaymentcheckBoxHandler} name='paymentMode' value="Cash On Delivery" type="checkbox" id="nonVarifedAddCashOnDelivery" />
                                                        <label className='form-check-label myInput' htmlFor="nonVarifedAddCashOnDelivery">Cash On Delivery</label>
                                                    </div>
                                                    <div className='form-check-inline mt-3'>
                                                        <input className="form-check-input" onChange={props.varifedAddressPaymentcheckBoxHandler} name='paymentMode' value="Bank Transfer" type="checkbox" id="nonVarifedAddBankTransfer" />
                                                        <label className='form-check-label myInput' htmlFor="nonVarifedAddBankTransfer">Bank Transfer</label>
                                                    </div>
                                                </div>
                                            </div>
                                            {props.varfiedAddBankTransferFlag ? <div className="col-md-6 input">
                                                <h5>Bank Name</h5>
                                                <input type="text" required onChange={props.varifiedAccountDetailInputHandler} name="bank_name" id="bankName" className="form-control" />
                                            </div> : null}
                                            {props.varfiedAddBankTransferFlag ? <div className="col-md-6 input">
                                                <h5>A/C Title</h5>
                                                <input type="text" required onChange={props.varifiedAccountDetailInputHandler} name="account_title" id="account_title" className="form-control" />
                                            </div> : null}
                                            {props.varfiedAddBankTransferFlag ? <div className="col-md-6 input">
                                                <h5>Account Number</h5>
                                                <input type="text" required onChange={props.varifiedAccountDetailInputHandler} name="account_number" id="account_number" className="form-control" />
                                            </div> : null}
                                            {props.varfiedAddBankTransferFlag ? <div className="col-md-6 input">
                                                <h5>BSB</h5>
                                                <input type="text" required onChange={props.varifiedAccountDetailInputHandler} name="bsb" id="bsb" className="form-control" />
                                            </div> : null}
                                            <div className="col-md-4 input">
                                                <h5>Passport</h5>
                                                <div className="custom-file">
                                                    <input type="file" onChange={props.passportImageHandler} id="passport_images" name="passport_images" className="custom-file-input" />
                                                    <label className="custom-file-label form-control" htmlFor="passport_images"></label>
                                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Driving License</h5>
                                                <div className="custom-file">
                                                    <input type="file" onChange={props.drivingImageHandler} id="drivinglicense_images" name="drivinglicense_images" className="custom-file-input" />
                                                    <label className="custom-file-label form-control" htmlFor="drivinglicense_images"></label>
                                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Any Utility Bill</h5>
                                                <div className="custom-file">
                                                    <input type="file" onChange={props.billImageHandler} id="any_utility_bill_images" name="any_utility_bill_images" className="custom-file-input" />
                                                    <label className="custom-file-label form-control" htmlFor="any_utility_bill_images"></label>
                                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 text-center mt-3 mb-3 ">
                                                {props.userStatus ? <p>Please Contact Admin For Account Activation</p>
                                                    : <button type="submit" className="continue-button background-color">Continue <span className="icon icon-arrow-long"></span></button>}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-12" style={{ display: props.addresseselection !== "Non-Verified-Address" ? "none" : 'block' }} >
                                    <form onSubmit={props.onFinishNonVerifiedAddress}>
                                        <div className="row px-3">
                                            <div className="col-md-4 input">
                                                <h5>Business Name <span className="required">*</span></h5>
                                                <input type="text" onChange={props.onChangeNonABNNonVerifiedaddress} name="business" id="BusinessName" className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Non-Verified Address</h5>
                                                <input type="text" onChange={props.onChangeNonABNNonVerifiedaddress} name="address" id="address" className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Address Line 2</h5>
                                                <input type="text" onChange={props.onChangeNonABNNonVerifiedaddress} name="address_line_2" id="address_line_2" className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Suburb</h5>
                                                <input type="text" onChange={props.onChangeNonABNNonVerifiedaddress} name="Suburb" id="Suburb" className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Latitude</h5>
                                                <input type="text" disabled name="lat" value={props.location.coordinates[1]} className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Longitude</h5>
                                                <input type="text" disabled name="long" value={props.location.coordinates[0]} className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>State</h5>
                                                <input type="text" onChange={props.onChangeNonABNNonVerifiedaddress} name="state" id="state" className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Postal Code</h5>
                                                <input type="number" min="0" onChange={props.onChangeNonABNNonVerifiedaddress} name="postal_code" id="postal_code" className="form-control" />
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Mode</h5>
                                                <div className=' form-check-inline mt-3'>
                                                    <input className="form-check-input" onChange={props.modecheckBoxHandler} name='days' value="Pickup" type="checkbox" id="nonverifiedPickup" />
                                                    <label className='form-check-label myInput' htmlFor="nonverifiedPickup">Pickup</label>
                                                </div>
                                                <div className='form-check-inline mt-3'>
                                                    <input className="form-check-input" onChange={props.modecheckBoxHandler} name='days' value="delivery" type="checkbox" id="nonvarifiedDilivery" />
                                                    <label className='form-check-label myInput' htmlFor="nonvarifiedDilivery">Delivery</label>
                                                </div>
                                            </div>
                                            <div className="row col-md-12">
                                                <div className="col-md-6 input">
                                                    <h5>Image</h5>
                                                    <div className="custom-file">
                                                        <input type="file" onChange={(e) => props.imageHandler(e, "non_varified_add_image")} id="abn_image" name="abn_image" className="custom-file-input" />
                                                        <label className="custom-file-label form-control" htmlFor="abn_image"></label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 input">
                                                    <h5>Payment Mode</h5>
                                                    <div className=' form-check-inline mt-3'>
                                                        <input className="form-check-input" onChange={props.nonVarifedPaymentcheckBoxHandler} name='paymentMode' value="Cash On Delivery" type="checkbox" id="cashOnDelivery" />
                                                        <label className='form-check-label myInput' htmlFor="cashOnDelivery">Cash On Delivery</label>
                                                    </div>
                                                    <div className='form-check-inline mt-3'>
                                                        <input className="form-check-input" onChange={props.nonVarifedPaymentcheckBoxHandler} name='paymentMode' value="Bank Transfer" type="checkbox" id="bankTransfer" />
                                                        <label className='form-check-label myInput' htmlFor="bankTransfer">Bank Transfer</label>
                                                    </div>
                                                </div>
                                            </div>
                                            {props.nonVarifiedaddBankTransferFlag ? <div className="col-md-6 input">
                                                <h5>Bank Name</h5>
                                                <input type="text" required onChange={props.nonVarifiedAccountDetailInputHandler} name="bank_name" id="bankName" className="form-control" />
                                            </div> : null}
                                            {props.nonVarifiedaddBankTransferFlag ? <div className="col-md-6 input">
                                                <h5>A/C Title</h5>
                                                <input type="text" required onChange={props.nonVarifiedAccountDetailInputHandler} name="account_title" id="account_title" className="form-control" />
                                            </div> : null}
                                            {props.nonVarifiedaddBankTransferFlag ? <div className="col-md-6 input">
                                                <h5>Account Number</h5>
                                                <input type="text" required onChange={props.nonVarifiedAccountDetailInputHandler} name="account_number" id="account_number" className="form-control" />
                                            </div> : null}
                                            {props.nonVarifiedaddBankTransferFlag ? <div className="col-md-6 input">
                                                <h5>BSB</h5>
                                                <input type="text" required onChange={props.nonVarifiedAccountDetailInputHandler} name="bsb" id="bsb" className="form-control" />
                                            </div> : null}
                                            <div className="col-md-4 input">
                                                <h5>Passport</h5>
                                                <div className="custom-file">
                                                    <input type="file" onChange={props.passportImageHandler} id="passport_images" name="passport_images" className="custom-file-input" />
                                                    <label className="custom-file-label form-control" htmlFor="validatedCustomFile"></label>
                                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Driving License</h5>
                                                <div className="custom-file">
                                                    <input type="file" onChange={props.drivingImageHandler} id="drivinglicense_images" name="drivinglicense_images" className="custom-file-input" />
                                                    <label className="custom-file-label form-control" htmlFor="drivinglicense_images"></label>
                                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 input">
                                                <h5>Any Utility Bill</h5>
                                                <div className="custom-file">
                                                    <input type="file" onChange={props.billImageHandler} id="any_utility_bill_images" name="any_utility_bill_images" className="custom-file-input" />
                                                    <label className="custom-file-label form-control" htmlFor="any_utility_bill_images"></label>
                                                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 text-center mt-3 mb-3 ">
                                                {(props.isLoading) ? "prosecing....."
                                                    : props.userStatus ? <p>Please Contact Admin For Account Activation</p>
                                                        : <button type="submit" className="continue-button background-color">Continue <span className="icon icon-arrow-long"></span></button>}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            </div>
        </section >
    );
};
export default SupplierRegComponent;