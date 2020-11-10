import React from 'react'

export default function UpdateItem(props) {
    const category = props.selectedItems.category;
    return (
        <div className='container'>
            {(category) ?
                <form onSubmit={props.onUpdateItem}>
                    <div className="row pl-3 pr-4 pb-4">
                        {/* for title  */}
                        <div className="col-md-4 input">
                            <label><h5> Title</h5></label>
                            <input onChange={props.onChangeUpdateItemsHandler} maxLength="17" value={props.selectedItems.title} name='title' type="text" className="form-control" />
                        </div>
                        <div className="col-md-4 input">
                            <label><h5> Tags Words</h5></label>
                            <input onChange={props.onChangeUpdateItemsHandler} value={props.selectedItems.tags_keywords} name='tags_keywords' type="text" className="form-control" />
                        </div>
                        {category === "occasion"
                            ? <div className="col-md-4 input">
                                <label><h5>Serving</h5></label>
                                <input onChange={props.onChangeUpdateItemsHandler} value={props.selectedItems.serving} name='serving' type="number" min="0" className="form-control" />
                            </div> : null}
                        <div className="col-md-4 input">
                            <label><h5>Price</h5></label>
                            <input name='price' value={props.selectedItems.price} onChange={props.onChangeUpdateItemsHandler} type="number" min="0" className="form-control" />
                        </div>
                        <div className="col-md-4 input">
                            <label><h5>Description</h5></label>
                            <input onChange={props.onChangeUpdateItemsHandler} value={props.selectedItems.description} name='description' type="text" className="form-control" />
                        </div>
                        <div className="col-md-4 input">
                            <label><h5>Image</h5></label>
                            <input onChange={props.imageHandler} type="file" name='image' className="form-control" />
                        </div>
                        {category === "frozen" || category === "cake"
                            ? <div className="col-md-4 input" >
                                <label><h5>Weight</h5></label>
                                <input onChange={props.onChangeUpdateItemsHandler} value={props.selectedItems.weight} name='weight' type="number" min="0" className="form-control" />
                                <div className="input-group-append">
                                    <span className="input-group-text">{category === "frozen" ? 'Dozen' : 'Pound'}</span>
                                </div>
                            </div> : null}
                        {/* <div className='col-md-4 input'>
                        <label><h5> Pickup Time From</h5></label>
                        <input onChange={props.onChangeUpdateItemsHandler} value={props.selectedItems.pickuptime_from} name='pickuptime_from' type="time" className="form-control" />
                        </div>
                        <div className="col-md-4 input">
                        <label><h5>Pickup Time To</h5></label>
                        <input onChange={props.onChangeUpdateItemsHandler} value={props.selectedItems.pickuptime_to} name='pickuptime_to' type="time" className="form-control" />
                    </div> */}
                        <div className='col-md-12 input'>
                            <div className='text-center'>
                                {props.submitButton}
                            </div>
                        </div>
                    </div>
                </form>
                : null}
        </div>
    )
}
