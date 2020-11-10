import React from 'react';
import '../menu.css';
import Scrollbars from 'react-custom-scrollbars';
import ItemsForm from './itemsForm';
import UpdateItem from '../form/updateItem';
import iconPlus from '../../../images/icons/circle-plus.png';
// import placeholderimg from "../../../images/placeholder-images/placeholder-item.png";
import { NavigationBar } from '../../';
import { connect } from 'react-redux';
import { SupplierHomeContainer } from '../../../containers';

const ItemsMenuComponent = (props) => {
    function capitalizeFirstLetter(string) {
        const arrayString = typeof string;
        let newObject = [];
        if (arrayString === 'object') {
            for (let i = 0; i < string.length; i++) {
                const element = string[i];
                newObject.push(element.charAt(0).toUpperCase() + element.slice(1));
            }
            return newObject;
        } else {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
    const submitButton = (props.isMenuItemCreating || props.isSetDailyMenuItem)
        ? <div className='form-check form-check-inline'>
            <button type="submit" className="continue-button background-color modal-button">
                <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                         Creating...
             </button>
        </div>
        : <button type="submit" className="createItemCloseModal continue-button background-color modal-button">Create</button>;

    const UpdateButton = (props.isMenuItemUpdate)
        ? <div className='form-check form-check-inline'>
            <button type="submit" className="continue-button background-color modal-button">
                <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                     Updating...
         </button>
        </div>
        : <button type="submit" className="updateItemCloseModal continue-button background-color modal-button">Update</button>;
    const [, setIsHover] = React.useState(false);
    const [, setKey] = React.useState(false);

    const renderDailyItems = props.items.map((val, idx) => {
        return (
            <React.Fragment key={idx}>
                <div className="col-lg-4 singleColumn col-md-6 col-6">
                    <div onMouseEnter={() => { setIsHover(true); setKey(idx); }} onMouseLeave={() => { setIsHover(false); setKey(false); }} className="kitchenHomeCard">
                        <div className="hoverList">
                            <img alt='item' src={`https://drive.google.com/thumbnail?id=${val.image}`} className="img-fluid img-responsive" />
                            {/* <img alt='item' src={`https://drive.google.com/uc?export=view&id=${val.image}`} className="img-fluid img-responsive" /> */}
                            {/* <img alt='item' src={val.image ? `https://drive.google.com/thumbnail?id=${val.image}` : placeholderimg} className="img-fluid img-responsive" /> */}
                            {/* <img alt='' src="https://avatars3.githubusercontent.com/u/10865465?s=460&u=4e178a930a7d269bd04416112e6581dc85ab22d4&v=4" className="img-fluid" /> */}
                            <div className={` items-list`}>
                                <Scrollbars className="scrollbar" style={{ minHeight: '200px', maxHeight: '200px' }}>                             {
                                    <table className="table table-borderless hover-table color-red-second" style={{ color: "black" }}>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td>Price</td>
                                                <td className="text-right">${val.price}</td>
                                            </tr>
                                            <tr>
                                                <td>Category</td>
                                                <td className="text-right">{capitalizeFirstLetter(val.category)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="pb-0">Description</td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="desc-style">{val.description}</td>
                                            </tr>
                                            {val.category === 'occasion' ? <tr>
                                                <td> Serving</td>
                                                <td className="text-right">{val.serving}</td>
                                            </tr> : null}
                                            {val.category === "frozen" || val.category === "cake" ? <tr>
                                                < td >Weight</td>
                                                <td className="text-right">{val.weight}</td>
                                            </tr> : null}
                                            {/* <tr>
                                                <td colSpan='2' className='text-center'>Pick Up Time</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    colSpan='2'
                                                    className='text-center'>
                                                    <span style={{ color: '#d70f64' }}>{val.pickuptime_from}</span>
                                                      &nbsp; To &nbsp;
                                                    <span style={{ color: '#d70f64' }}>{val.pickuptime_to}</span>
                                                </td>
                                            </tr> */}
                                            <tr>
                                                <td>Tags</td>
                                                <td className="text-right">{capitalizeFirstLetter(val.tags_keywords).map((tag, idx) => <span style={{ marginLeft: '10px' }} key={idx}>{tag}</span>)}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">
                                                    <div className="search-toggle text-center mt-3">
                                                        {(props.isMenuItemActivation && props.selectedItemId === val._id)
                                                            ?
                                                            <div className='form-check form-check-inline'>
                                                                <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                                                             Processing...
                                                        </div>
                                                            : <div className="custom-control custom-switch">
                                                                <label id={`active${val._id}`} className={`toggleLabel1 ${val.status ? "toggleColor" : ""}`}>Active</label>
                                                                <input type="checkbox" className="custom-control-input" checked={val.status ? false : true} onChange={() => props.onchangeSelctionToggle(val._id, val.status)} id={val._id} />
                                                                <label id={`deactive${val._id}`} className={`custom-control-label toggleLabel2 ${!val.status ? "toggleColor" : ""}`} htmlFor={val._id}>Inactive</label>
                                                            </div>}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                }
                                </Scrollbars>
                                {/* </div> */}
                            </div>
                            <div className="cardOverlay row ml-0" style={{ bottom: 1 }}>
                                <div className="col-md-7 col-7 text" style={{ padding: "8px 0px 0px 10px" }}>
                                    <span>{val.title.toUpperCase()}</span>
                                    <div>${val.price}</div>
                                </div>
                                <div className="col-md-5 pl-0 col-5 text-right pr-2 pt-custom py-3" style={{ padding: "0px 0px 0px 10px" }} >
                                    {(props.type === 'supplier')
                                        ? <div className='btn-alignment' >
                                            {(props.isRemoveItem && val._id === props.selecteRemoveItems)
                                                ? <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                                                : <button onClick={() => props.removeItems(val._id, val.image)}>Remove</button>}
                                            <button onClick={() => props.onSelectItems(val)} data-toggle="modal" data-target="#itemUpdate">Update</button>

                                        </div>
                                        : <button onClick={props.onOrder}>Order Now </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                {/* update item modal  */}
                < div className="modal" id="itemUpdate" >
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ width: '1200px', right: '65%', background: '#f7f7f7' }}>
                            {/* <!-- Modal body --> */}
                            <div className="modal-body">
                                <Scrollbars className="modalScroll" style={{ height: "75vh" }}>
                                    <UpdateItem
                                        onChangeUpdateItemsHandler={props.onChangeUpdateItemsHandler}
                                        onUpdateItem={props.onUpdateItem}
                                        selectedItems={props.selectedItems}
                                        isMenuItemUpdate={props.isMenuItemUpdate}
                                        imageHandler={props.imageHandler}
                                        submitButton={UpdateButton}
                                    />
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </div >
            </React.Fragment >
        );
    });

    return (
        <div className=''>
            {props.user.type === "supplier" ? <SupplierHomeContainer /> : <NavigationBar />}
            {/* <button type="button" style={{ marginLeft: '47px' }} className="btn background-color color_white" data-toggle="modal" data-target="#myModal">
                Deals +
            </button> */}
            <div className="container px-5">

                {/* <!-- The Modal --> */}
                <div className="modal" id="createItem" >
                    <div className="modal-dialog">
                        <div className="modal-content" style={{ width: '1200px', right: '65%', background: '#f7f7f7' }}>
                            {/* <!-- Modal body --> */}
                            <div className="modal-body">
                                <Scrollbars className="modalScroll" style={{ height: "70vh" }}>
                                    <ItemsForm
                                        addItem={props.addItem}
                                        inputHandler={props.inputHandler}
                                        imageHandler={props.imageHandler}
                                        categorySelection={props.categorySelection}
                                        timeHandlerForItems={props.timeHandlerForItems}
                                        selectedCategory={props.selectedCategory}
                                        uomSelection={props.uomSelection}
                                        daySelection={props.daySelection}
                                        submitButton={submitButton}
                                    />
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <a href='/#' data-toggle="modal" className="my-1" data-target="#createItem">
                            <img src={iconPlus} alt="" className="addItems" />
                        </a>
                    </div>
                </div>
                <div id="itemcontainer" className="mobile-background"  >
                    {(props.isMenuItemFetching)
                        ? <div className="text-center loader-alignment" style={{ top: '54%' }}>
                            <div className='form-check form-check-inline'>
                                <span style={{ width: '3rem', height: "3rem" }} className='spinner-border myInput text-primary spinner-border-sm'></span>
                            </div>
                        </div>
                        : <div>
                            {/* <h2>Items</h2> */}
                            <Scrollbars style={{ height: "60vh" }} className="menu-scroll-height" id='itemsDays'>
                                <div className='row px-5 mt-2vh pb-4'>
                                    {renderDailyItems}
                                </div>
                            </Scrollbars>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    };
};

export default connect(mapStateToProps, null)(ItemsMenuComponent);