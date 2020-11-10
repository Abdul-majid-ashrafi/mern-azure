import React from 'react'

function UpdateDailyItems(props) {
    const updateButton = props.isUpdateDailyItems
        ? <div className='form-check form-check-inline'>
            <button type="submit" className="continue-button background-color">
                <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                         Creating...
             </button>
        </div>
        :
        <button type="submit" className="UpdateDailyItems continue-button background-color">Update</button>

    return (
        <div className='container'>
            <form onSubmit={props.onUpdateItems}>
                <div className="row pl-3 pr-4 pb-4">
                    <div className='col-md-4 input'>
                        <label htmlFor="pickuptime_from"><h5> Pickup Time From</h5></label>
                        <input onChange={props.inputForUpdateItems} value={props.SelectedUpdateItems.pickuptime_from || ''} name='pickuptime_from' type="time" className="form-control" id="updateItemsPickuptime_from" />
                    </div>
                    <div className="col-md-4 input">
                        <label htmlFor="pickuptime_to"><h5>Pickup Time To</h5></label>
                        <input onChange={props.inputForUpdateItems} value={props.SelectedUpdateItems.pickuptime_to || ''} name='pickuptime_to' type="time" className="form-control" id="updateItemsPickuptime_to" />
                    </div>
                    <div className="col-md-4 input">
                        <label htmlFor="servings"><h5>Serving</h5></label>
                        <input onChange={props.inputForUpdateItems} value={props.SelectedUpdateItems.serving || ''} name='serving' type="number" min="0" className="form-control" id="updateItemsServings" />
                    </div>
                    <div className="col-md-3 input">
                        <label htmlFor="image"><h5>Image</h5></label>
                        <input type="file" onChange={props.inputForUpdateItems} name='image' className="form-control" id="updateItemsImage" />
                    </div>
                    <div className='col-md-12 input'>
                        <h5>Items</h5>
                        <div className="row" id='UpdateItemsMenu'>
                            {(props.isMenuItemFetching) ?
                                <div className='form-check form-check-inline'>
                                    <span className='spinner-border myInput text-primary spinner-border-sm'></span>Processing..
                                    </div>
                                :
                                <React.Fragment>
                                    {props.SelectedUpdateItems.allItems ? props.SelectedUpdateItems.allItems.map((item, index) => {
                                        return (
                                            (item.status && item.category === "daily / weekly")
                                                ? <div className='col-lg-3 col-md-4 col-sm-6 col-6' key={index} >
                                                    <div className="form-check-inline">
                                                        <input className="form-check-input" checked={item.selected ? true : false} onChange={props.updateItemsCheckBoxHandler} value={item.title} name='item' type="checkbox" id={item._id} />
                                                        <label className='form-check-label myInput' htmlFor={item._id}>{item.title}</label>
                                                    </div>
                                                </div> : ''
                                        )
                                    }) : null}
                                </React.Fragment>

                            }
                        </div>
                    </div>
                    <div className='col-md-12 input'>
                        <div className='text-center display'>
                            {updateButton}
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}
export default UpdateDailyItems;