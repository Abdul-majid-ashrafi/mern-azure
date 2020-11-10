import React from 'react'

export default function UpdateDealForm(props) {
    return (
        <div className='container'>
            <form onSubmit={props.onUpdateDeal}>
                <div className="row pl-3 pr-4 pb-4">
                    {/* for title  */}
                    <div className="col-md-4 input">
                        <label><h5> Title</h5></label>
                        <input onChange={props.onChangeUpdateDealHandler} maxLength="17" value={props.selectedDeal.title} name='title' type="text" className="form-control" />
                    </div>
                    <div className="col-md-4 input">
                        <label><h5> Tags Words</h5></label>
                        <input onChange={props.onChangeUpdateDealHandler} name='tags_keywords' value={props.selectedDeal.tags_keywords} type="text" className="form-control" />
                    </div>
                    <div className="col-md-4 input">
                        <label><h5>Serving</h5></label>
                        <input onChange={props.onChangeUpdateDealHandler} name='serving' value={props.selectedDeal.serving} type="number" min="0" className="form-control" />
                    </div>
                    <div className="col-md-4 input">
                        <label><h5>Price</h5></label>
                        <input name='price' onChange={props.onChangeUpdateDealHandler} value={props.selectedDeal.price} type="number" min="0" className="form-control" />
                    </div>
                    <div className="col-md-4 input">
                        <label><h5>Discount</h5></label>
                        <input onChange={props.onChangeUpdateDealHandler} name='discount' value={props.selectedDeal.discount} type="number" min="0" className="form-control" />
                    </div>
                    <div className="col-md-4 input">
                        <label><h5>Image</h5></label>
                        <input onChange={props.imageHandler} type="file" name='image' className="form-control" />
                    </div>
                    {/* <div className='col-md-4 input'>
                        <label><h5> Pickup Time From</h5></label>
                        <input onChange={props.onChangeUpdateDealHandler} name='pickuptime_from' value={props.selectedDeal.pickuptime_from} type="time" className="form-control" />
                    </div>
                    <div className="col-md-4 input">
                        <label><h5>Pickup Time To</h5></label>
                        <input onChange={props.onChangeUpdateDealHandler} name='pickuptime_to' value={props.selectedDeal.pickuptime_to} type="time" className="form-control" />
                    </div> */}
                    {/* for items  */}
                    <div className="col-md-12 input">
                        <label><h5>Items</h5></label>
                        {(props.isMenuItemFetching || props.isLoading)
                            ? <div>
                                <div className='form-check form-check-inline'>
                                    <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                                    Fetching...
                                    </div>
                            </div>
                            : <div className='checkbox-align'>
                                <div className="row" style={{ width: '100%' }}>
                                    {props.selectedDeal.allItems.map((items, indx) => {
                                        return (
                                            (items.status)
                                                ? <div className="col-md-3" key={indx}>
                                                    <div className='form-check form-check-inline items_checkbox'>
                                                        <input className="form-check-input" checked={items.selected ? true : false} onChange={props.selectItemscheckBoxHandler} value={items._id} name='items' type="checkbox" />
                                                        <label className='form-check-label myInput'>{items.title}</label>
                                                    </div>
                                                </div> : ''
                                        )
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                    <div className='col-md-12 input'>
                        <div className='text-center display'>

                            {props.isUpdateDeal
                                ? <div className='form-check form-check-inline'>
                                    <button type="submit" className="continue-button background-color modal-button">
                                        <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                                             Updating...
                                 </button>
                                </div>
                                : <button type="submit" className="updateDealCloseModal continue-button background-color modal-button">Update</button>
                            }
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
