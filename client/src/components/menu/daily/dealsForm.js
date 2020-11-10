import React from 'react'

function DealsForm(props) {
    const submitButton = (props.isSetDailyMenuDeal) ?
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
            <form onSubmit={props.onCreateDeal}>
                <div className="row pl-3 pr-4 pb-4">
                    {/* for title  */}
                    <div className="col-md-4 input">
                        <label htmlFor="title"><h5> Title<span className="required">*</span></h5></label>
                        <input onChange={props.inputHandler} maxLength="17" required name='title' type="text" className="form-control" id="title" />
                    </div>
                    <div className="col-md-4 input">
                        <label htmlFor="tags_keywords"><h5> Tags Words<span className="required">*</span></h5></label>
                        <input onChange={props.inputHandler} required name='tags_keywords' type="text" className="form-control" id="tags_keywords" />
                    </div>
                    <div className="col-md-4 input">
                        <label htmlFor="servings"><h5>Serving<span className="required">*</span></h5></label>
                        <input onChange={props.inputHandler} required name='serving' type="number" min="0" className="form-control" id="servings" />
                    </div>
                    <div className="col-md-4 input">
                        <label htmlFor="price"><h5>Price<span className="required">*</span></h5></label>
                        <input required name='price' onChange={props.inputHandler} type="number" min="0" className="form-control" id="price" />
                    </div>
                    <div className="col-md-4 input">
                        <label htmlFor="discount"><h5>Discount<span className="required">*</span></h5></label>
                        <input onChange={props.inputHandler} required name='discount' type="number" min="0" className="form-control" id="discount" />
                    </div>
                    <div className="col-md-4 input">
                        <label htmlFor="image"><h5>Image</h5></label>
                        <input onChange={props.imageHandler} type="file" name='image' className="form-control" id="image" />
                    </div>
                    <div className='col-md-4 input'>
                        <label htmlFor="mode"><h5> Mode</h5></label>
                        <select defaultValue='non' id='mode' onChange={props.inputHandler} placeholder='Mode' name="mode" className='className=" custom-select form-control'>
                            <option value='pickup'>Pickup</option>
                            <option value='delivery'>Delivery</option>
                            <option value='non' style={{ display: 'none' }}></option>
                        </select>
                    </div>
                    <div className='col-md-4 input'>
                        <label htmlFor="pickuptime_from"><h5> Time From<span className="required">*</span></h5></label>
                        <input onChange={props.inputHandler} required name='pickuptime_from' type="time" className="form-control" id="pickuptime_from" />
                    </div>
                    <div className="col-md-4 input">
                        <label htmlFor="pickuptime_to"><h5>Time To<span className="required">*</span></h5></label>
                        <input onChange={props.inputHandler} required name='pickuptime_to' type="time" className="form-control" id="pickuptime_to" />
                    </div>
                    <div className="col-md-12 input">
                        <label htmlFor="Description"><h5>Description<span className="required">*</span></h5></label>
                        <input onChange={props.inputHandler} required name='description' type="text" className="form-control" id="description" />
                    </div>
                    {/* for days  */}
                    <div className="col-md-12 input" required>
                        <label htmlFor="items"><h5>Days<span className="required">*</span></h5> </label>
                        <div className='row' id='allDays'>
                            <div className='col-md-2'>
                                <div className='form-check form-check-inline'>
                                    <input className="form-check-input" onChange={props.dayCheckBoxHandler} name='days' value="Monday" type="checkbox" id="Monday" />
                                    <label className='form-check-label myInput' htmlFor="Monday">Monday</label>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div className='form-check form-check-inline'>
                                    <input className="form-check-input" onChange={props.dayCheckBoxHandler} name='days' value="Tuesday" type="checkbox" id="Tuesday" />
                                    <label className='form-check-label myInput' htmlFor="Tuesday">Tuesday</label>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div className='form-check form-check-inline'>
                                    <input className="form-check-input" onChange={props.dayCheckBoxHandler} name='days' value="Wednesday" type="checkbox" id="Wednesday" />
                                    <label className='form-check-label myInput' htmlFor="Wednesday">Wednesday</label>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div className='form-check form-check-inline'>
                                    <input className="form-check-input" onChange={props.dayCheckBoxHandler} name='days' value="Thursday" type="checkbox" id="Thursday" />
                                    <label className='form-check-label myInput' htmlFor="Thursday">Thursday</label>
                                </div>
                            </div>
                            <div className='col-md-2'>
                                <div className='form-check form-check-inline'>
                                    <input className="form-check-input" onChange={props.dayCheckBoxHandler} name='days' value="Friday" type="checkbox" id="Friday" />
                                    <label className='form-check-label myInput' htmlFor="Friday">Friday</label>
                                </div>
                            </div>
                            {/* <div className='col-md-3'>
                                <div className='form-check form-check-inline'>
                                    <input className="form-check-input" onChange={props.dayCheckBoxHandler} name='days' value="Saturday" type="checkbox" id="Saturday" />
                                    <label className='form-check-label myInput' htmlFor="Saturday">Saturday</label>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-check form-check-inline'>
                                    <input className="form-check-input" onChange={props.dayCheckBoxHandler} name='days' value="Sunday" type="checkbox" id="Sunday" />
                                    <label className='form-check-label myInput' htmlFor="Sunday">Sunday</label>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* for items  */}
                    <div className="col-md-12 input" required>
                        <label htmlFor="items"><h5>Items<span className="required">*</span></h5></label>
                        {(props.isMenuItemFetching || props.isLoading) ?
                            <div>
                                <div className='form-check form-check-inline'>
                                    <span className='spinner-border myInput text-primary spinner-border-sm'></span>Processing..
                                        </div>
                            </div>
                            : <div className="row" id='allItems'>
                                {props.items.map((item, index) => {
                                    return (
                                        (item.status && item.category === "daily / weekly")
                                            ? <div className='col-md-3' key={index}>
                                                <div className='form-check form-check-inline'>
                                                    <input className="form-check-input" onChange={props.checkBoxHandler} name='item' value={item.title} type="checkbox" id={item._id} />
                                                    <label className='form-check-label myInput' htmlFor={item._id}>{item.title}</label>
                                                </div>
                                            </div> : ''
                                    )
                                })}
                            </div>
                        }
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
export default DealsForm;