import React from 'react';

export default function ItemsForm(props) {
    return (
        <div className='container'>
            <form id='itemsForm' onSubmit={props.addItem}>
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
                        <label><h5>Select Category :<span className="required">*</span></h5></label>
                        <div className="form-group">
                            <select defaultValue='default' className="custom-select form-control" name="category" id='category' onChange={props.categorySelection} required>
                                <option>Daily / Weekly</option>
                                <option>Frozen</option>
                                <option>Cake</option>
                                <option>Occasion</option>
                                <option style={{ display: 'none' }} disabled value='default'></option>
                            </select>
                            <div className="invalid-feedback">Example invalid custom select feedback</div>
                        </div>
                    </div>
                    {(props.selectedCategory === 'Frozen' || props.selectedCategory === 'Cake')
                        ? < div className='col-md-8 input' >
                            <label htmlFor="Weight"><h5>Weight<span className="required">*</span></h5></label>
                            {/* <div className='row' style={{ display: 'flex', bottom: '0%', position: 'absolute' }}> */}
                            <div className='row'>
                                <div className='col-md-6 '>
                                    <input name='weight' placeholder='Weight' onChange={props.inputHandler} type="number" min="0" required className="form-control" id="weight" />
                                </div>
                                <div className='col-md-6'>
                                    <input name='uom' value={props.selectedCategory === 'Cake' ? 'Pound' : 'DOZEN'} disabled className="form-control" id="uom" />
                                </div>
                            </div>
                        </div> : ""}
                    <div className="col-md-4 input">
                        <label htmlFor="price"><h5>Price<span className="required">*</span></h5></label>
                        <input name='price' onChange={props.inputHandler} type="number" min="0" required className="form-control" id="price" />
                    </div>
                    {(props.selectedCategory === 'Occasion')
                        ? <div className="col-md-4 input">
                            <label htmlFor="servings"><h5>Serving</h5></label>
                            <input onChange={props.inputHandler} name='servings' type="number" min="0" className="form-control" id="servings" />
                        </div> : ''}
                    <div className="col-md-4 input">
                        <label htmlFor="image"><h5>Image</h5></label>
                        <input onChange={props.imageHandler} type="file" name='image' className="form-control" id="image" />
                    </div>
                    <div className={`input ${(props.selectedCategory === 'Occasion') ? "col-md-12" : (props.selectedCategory === 'Frozen' || props.selectedCategory === 'Cake') ? "col-md-8" : "col-md-4"}`}>
                        <label htmlFor="description"><h5>Description<span className="required">*</span></h5></label>
                        <input onChange={props.inputHandler} required name='description' type="text" className="form-control" id="description" />
                    </div>
                    {/* {props.selectedCategory === "Daily / Weekly" ? <div className='col-md-12'>
                        <div className='text-center'>
                            <p style={{ color: '#d70f64', position:'absolute', top:'10px' }}><span style={{ color: 'black' }}>Note : </span>This items only show in daily menu and weekly menu</p>
                        </div>
                    </div> : null} */}
                    <div className='col-md-12 input'>
                        <div className='text-center'>
                            {props.submitButton}
                        </div>
                    </div>
                </div>
            </form >
        </div >
    );
}
