import React from 'react';

export default function WeeklyForm(props) {
    const dropDownOptions = ['Saturday', 'Sunday',];
    const daysDropDown = dropDownOptions.map((items, index) => {
        return <option key={index}>{items}</option>;
    });
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
                        <select defaultValue='non' onChange={props.inputHandler} id='mode' placeholder='Mode' name="mode" className='className=" custom-select form-control'>
                            <option value='pickup'>Pickup</option>
                            <option value='delivery'>Delivery</option>
                            <option value='non' style={{ display: 'none' }}></option>
                        </select>
                    </div>
                    <div className='col-md-4 input'>
                        <label htmlFor="pickuptime_from"><h5> Time From<span className="required">*</span></h5></label>
                        <div className='row' style={{ marginTop: '-45px' }}>
                            <div className='col-md-6 input pr-0'>
                                <select defaultValue='default' placeholder='day' className="form-control" id="pickuptime_from_day" name="pickuptime_from_day" onChange={props.inputHandler}>
                                    {daysDropDown}
                                    <option style={{ display: 'none' }} value='default'></option>
                                </select>
                            </div>
                            <div className='col-md-6 input pl-0'>
                                <input onChange={props.inputHandler} required name='pickuptime_from' type="time" className="form-control" id="pickuptime_from" />
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 input'>
                        <label htmlFor="pickuptime_to"><h5>Time To<span className="required">*</span></h5></label>
                        <div className='row' style={{ marginTop: '-45px' }}>
                            <div className='col-md-6 input pr-0'>
                                <select defaultValue='default' placeholder='day' className="form-control" id='pickuptime_to_day' name="pickuptime_to_day" onChange={props.inputHandler}>
                                    {daysDropDown}
                                    <option style={{ display: 'none' }} value='default'></option>
                                </select>
                            </div>
                            <div className="col-md-6  input pl-0">
                                <input onChange={props.inputHandler} required name='pickuptime_to' type="time" className="form-control" id="pickuptime_to" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 input">
                        <label htmlFor="description"><h5>Description</h5></label>
                        <input onChange={props.inputHandler} type="text" name='description' className="form-control" id="description" />
                    </div>
                    {/* for items  */}
                    <div className="col-md-12 input" required>
                        <label htmlFor="items"><h5>Items<span className="required">*</span></h5></label>
                        {(props.isMenuItemFetching || props.isLoading) ?
                            <div>
                                <div className='form-check form-check-inline'>
                                    <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                                        Fetching...
                                        </div>
                            </div>
                            : <div className='checkbox-align'>
                                <div className="row" id='allItems'>
                                    {props.items.map((item, index) => {
                                        return (
                                            (item.status && item.category === "daily / weekly")
                                                ? <div className="col-md-3" key={index}>
                                                    <div className='form-check form-check-inline items_checkbox'>
                                                        <input className="form-check-input" onChange={props.checkBoxHandler} name='item' value={item.title} type="checkbox" id={item._id} />
                                                        <label className='form-check-label myInput' htmlFor={item._id}>{item.title}</label>
                                                    </div>
                                                </div>
                                                : null
                                        );
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                    <div className='col-md-12 input'>
                        <div className='text-center display'>
                            {props.submitButton}
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
}
