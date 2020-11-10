import React from 'react'

function ItemsForm(props) {
    const submitButton = (props.isSetDailyMenuItem) ?
        <div className='form-check form-check-inline'>
            <button type="submit" className="continue-button background-color">
                <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                             Creating...
                 </button>
        </div>
        :
        <button type="submit" className="createDailyItemCloseModal createDailyDealCloseModal continue-button background-color">Create</button>

    return (
        <div className='container'>
            <form onSubmit={props.onCreateItems}>
                <div className="row pl-3 pr-4 pb-4">
                    <div className="col-md-12 input text-center display" >
                        <h5>Select Day : <span className="required">*</span></h5>
                        <div className="form-group">
                            <select defaultValue='default' style={{ width: '50%' }} className="custom-select form-control" id='day' name="selectedDay" onChange={props.daySelection} required>
                                <option>Monday</option>
                                <option>Tuesday</option>
                                <option>Wednesday</option>
                                <option>Thursday</option>
                                <option>Friday</option>
                                {/* <option>Saturday</option>
                                <option>Sunday</option> */}
                                <option style={{ display: 'none' }} disabled value='default'></option>
                            </select>
                            <div className="invalid-feedback">Example invalid custom select feedback</div>
                        </div>
                    </div>
                    <div className='col-md-3 input'>
                        <label htmlFor="pickuptime_from"><h5> Pickup Time From</h5></label>
                        <input onChange={props.timeForCreateItems} name='pickuptime_from' type="time" className="form-control" id="pickuptime_from" />
                    </div>
                    <div className="col-md-3 input">
                        <label htmlFor="pickuptime_to"><h5>Pickup Time To</h5></label>
                        <input onChange={props.timeForCreateItems} name='pickuptime_to' type="time" className="form-control" id="pickuptime_to" />
                    </div>
                    <div className="col-md-3 input">
                        <label htmlFor="servings"><h5>Serving</h5></label>
                        <input onChange={props.onchangeServingForItems} name='servings' min="0" type="number" className="form-control" id="servings" />
                    </div>
                    <div className="col-md-3 input">
                        <label htmlFor="image"><h5>Image</h5></label>
                        <input type="file" onChange={props.imageHandler} name='image' className="form-control" id="image" />
                    </div>
                    <div className='col-md-12 input'>
                        <h5>Items</h5>
                        <div className="row" id='itemsMenu'>
                            {(props.isMenuItemFetching) ?
                                <div className='form-check form-check-inline'>
                                    <span className='spinner-border myInput text-primary spinner-border-sm'></span>Processing..
                                    </div>
                                :
                                <React.Fragment>
                                    {/* // <div className='checkbox-align'> */}
                                    {props.items.map((item, index) => {
                                        return (
                                            (item.status && item.category === "daily / weekly")
                                                ? <div className='col-lg-3 col-md-4 col-sm-6 col-6' key={index} >
                                                    <div className="form-check-inline">
                                                        <input className="form-check-input" onChange={props.checkBoxHandler} name='item' value={item.title} type="checkbox" id={item._id} />
                                                        <label className='form-check-label myInput' htmlFor={item._id}>{item.title}</label>
                                                    </div>
                                                </div> : ''
                                        )
                                    })}
                                    {/* </div> */}
                                </React.Fragment>

                            }
                        </div>
                    </div>
                    <div className='col-md-12 input'>
                        <div className='text-center display'>
                            {submitButton}
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
export default ItemsForm;