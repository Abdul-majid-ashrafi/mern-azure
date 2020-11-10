import React from 'react';
import '../menu.css';
import Scrollbars from 'react-custom-scrollbars';
import UpdateItem from '../form/updateItem';
import placeholderimg from "../../../images/placeholder-images/placeholder-occassion.png";
import { connect } from 'react-redux';
import { useAuth0 } from '../../../contexts/auth0-context';
import kitchen1 from '../../../images/placeholder-images/placeholder-kitchen.png';
// import { SupplierHomeContainer } from '../../../containers';
import { KitchenName } from '../../navigationBar';
import StarRating from '../form/starRating';
import ReactStars from 'react-rating-stars-component';


const OcassionsMenuComponent = (props) => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const occasionItems = props.searchBase === 'kitchen' ? props.occasion.items : props.allKitchensMenu.occasion.items;
    const submitButton = (props.isMenuItemUpdate || props.isSetDailyMenuItem) ?
        <div className='form-check form-check-inline'>
            <button type="submit" className="continue-button background-color">
                <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                 Updating...
     </button>
        </div>
        :
        <button type="submit" className="updateItemCloseModal continue-button background-color">Update</button>;
    const [isHover, setIsHover] = React.useState(false);
    const [, setKey] = React.useState(false);
    function capitalizeFirstLetter(string) {
        if (string) {
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
    }
    return (
        <div className='container'>
            <Scrollbars style={{ height: "60vh" }} className="menu-without-add-btn  mobile-background" id='itemsDays'>
                <KitchenName />
                {(props.isMenuItemFetching || props.isKitchensFetching || props.isMenuFetching)
                    ? <div className="text-center loader-alignment">
                        <div className='form-check form-check-inline'>
                            <span style={{ width: '3rem', height: "3rem" }} className='spinner-border myInput text-primary spinner-border-sm'></span>
                        </div>
                    </div>
                    : <div className='row mt-2 mx-0 cardMargin'>

                        {occasionItems.length ? occasionItems.map((items, index) => {
                            return <React.Fragment key={index}>
                                {props.type === "customer" ? <StarRating itemid={items._id} modalID={items._id} sid={items.supplier} /> : null}
                                <div className="col-lg-4 col-md-6 singleColumn itemsCardMargin col-6 mt-3">
                                    <div onMouseEnter={() => { setIsHover(true); setKey(index); }} onMouseLeave={() => { setIsHover(false); setKey(false); }} className="kitchenHomeCard hoverList">
                                        <div className="hoverList">
                                            <img alt='' src={items.image ? `https://drive.google.com/thumbnail?id=${items.image}` : placeholderimg} className="img-fluid img-responsive" />
                                            <div data-toggle="modal" data-target={`#starRating${items._id}`} className="ratings">
                                                <ReactStars
                                                    edit={false}
                                                    isHalf={true}
                                                    count={5}
                                                    value={items.rating && items.rating.avg ? items.rating.avg : 0}
                                                    size={20}
                                                />
                                            </div>
                                            <div className={`items-list`}>
                                                <Scrollbars className="scrollbar" style={{ minHeight: '22vh', maxHeight: '22vh' }}>
                                                    <table className="table table-borderless hover-table color-red-second" style={{ color: "black" }}>
                                                        <thead></thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Price</td>
                                                                <td className="text-right">${items.price}</td>
                                                            </tr>
                                                            {props.type === 'supplier' ? < tr >
                                                                <td>Category</td>
                                                                <td className="text-right">{capitalizeFirstLetter(items.category)}</td>
                                                            </tr> : null}
                                                            <tr>
                                                                <td>Serving</td>
                                                                <td className="text-right">{items.serving}</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2} className="pb-0">Description</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan={2} className="desc-style">{capitalizeFirstLetter(items.description)}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td colSpan='2' className='text-center'>Pick Up Time</td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    colSpan='2'
                                                                    className='text-center'>
                                                                    <span style={{ color: '#d70f64' }}>{items.pickuptime_from}</span>
                                                                    &nbsp; To &nbsp;
                                                                     <span style={{ color: '#d70f64' }}>{items.pickuptime_to}</span>
                                                                </td>
                                                            </tr> */}
                                                            {(props.type === 'supplier')
                                                                ? <tr>
                                                                    <td>Tags</td>
                                                                    <td className="text-right">{capitalizeFirstLetter(items.tags_keywords).map((tag, idx) => <span style={{ marginLeft: '10px' }} key={idx}>{tag}</span>)}</td>
                                                                </tr> : null}
                                                        </tbody>
                                                    </table>
                                                </Scrollbars>
                                            </div>
                                            {/* </div> */}
                                            <div className="cardOverlay row ml-0" style={{ bottom: (isHover) ? "auto" : 1 }}>
                                                <div className="col-md-7 col-7 text" style={{ padding: "8px 0px 0px 10px" }}>
                                                    <span>{items.title.toUpperCase()}</span>
                                                    <div>${items.price}</div>
                                                </div>
                                                <div className="col-md-5 col-5 pl-3 text-right pr-2 pt-custom py-3" style={{ padding: "0px 0px 0px 10px" }} >
                                                    {(props.type === 'supplier')
                                                        ? <div className='btn-alignment' >
                                                            {(props.isRemoveItem && items._id === props.selecteRemoveItems)
                                                                ? <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                                                                : <button onClick={() => props.removeItems(items._id, items.image)}>Remove</button>}
                                                            <button onClick={() => props.onSelectItems(items)} data-toggle="modal" data-target="#ocassionUpdate">Update</button>
                                                        </div>
                                                        :
                                                        <button onClick={isAuthenticated ? () => props.onOrder(items) : () => props.authForOrder("customer", loginWithRedirect)}>Order Now </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* update item modal  */}
                                <div className="modal" id="ocassionUpdate" >
                                    <div className="modal-dialog">
                                        <div className="modal-content" style={{ width: '1200px', right: '65%', background: '#f7f7f7' }}>
                                            {/* <!-- Modal body --> */}
                                            <div className="modal-body">
                                                <Scrollbars className="modalScroll" style={{ height: "75vh" }}>
                                                    <UpdateItem
                                                        onUpdateItem={props.onUpdateItem}
                                                        selectedItems={props.selectedItems}
                                                        imageHandler={props.imageHandler}
                                                        onChangeUpdateItemsHandler={props.onChangeUpdateItemsHandler}
                                                        submitButton={submitButton}
                                                    />
                                                </Scrollbars>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>;
                        }) : props.ocassionsMenuKitchens.map((kitchen, index) => {
                            const business = kitchen.business.split(" ");
                            return <div key={index} className="col-lg-4 col-md-6 kitchenCardMargin col-6 mt-3">
                                <div onMouseEnter={() => { setIsHover(true); setKey(index); }} onMouseLeave={() => { setIsHover(false); setKey(false); }} className="kitchenHomeCard hoverList">
                                    <div className="kitchenHomeCard">
                                        <div className="hoverList">
                                            <img alt='' src={kitchen1} className="img-fluid img-responsive" />
                                            <div className="ratings">
                                                <ReactStars
                                                    edit={false}
                                                    isHalf={true}
                                                    count={5}
                                                    value={kitchen.menu.rating.avg ? kitchen.menu.rating.avg : 0}
                                                    size={20}
                                                />
                                            </div>
                                            <div className="bestDeals">
                                                <p>BEST</p> <p>DEAL</p>
                                            </div>
                                            <div className={`items-list`}>
                                                <Scrollbars className="scrollbar" style={{ minHeight: '22vh', maxHeight: '22vh' }}>                             {
                                                    <table className="table table-borderless hover-table color-red-second" style={{ color: "black" }}>
                                                        <thead></thead>
                                                        <tbody>
                                                            <tr>
                                                                <td colSpan={2} className="text-center" style={{ color: '#d70f64' }}>{kitchen.ABN_number && kitchen.ABN_status === "Active" ? 'ABN Verified' : 'Non ABN '}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Suburb :</td>
                                                                <td className="text-right">{kitchen.Suburb ? kitchen.Suburb.toUpperCase() : ''}</td>
                                                            </tr>
                                                            {kitchen.payment_mode ? <tr>
                                                                <td colSpan={2} className="pb-0">Payment Mode :</td>
                                                            </tr> : null}
                                                            {kitchen.payment_mode ? <tr>
                                                                <td colSpan={2} style={{ color: '#d70f64' }}>{
                                                                    kitchen.payment_mode.map((mode, idx) => { return <span className='mx-2' key={idx}>{capitalizeFirstLetter(mode)}</span>; })}</td>
                                                            </tr> : null}
                                                            {kitchen.mode ? <tr>
                                                                <td colSpan={2} className="pb-0">Mode :</td>
                                                            </tr> : null}
                                                            {kitchen.mode ? <tr>
                                                                <td colSpan={2} style={{ color: '#d70f64' }} >{
                                                                    kitchen.mode.map((mode, idx) => { return <span className='ml-5' key={idx}>{capitalizeFirstLetter(mode)}</span>; })}</td>
                                                            </tr> : null}
                                                        </tbody>
                                                    </table>
                                                }
                                                </Scrollbars>
                                            </div>
                                            <div className="cardOverlay ml-0 row">
                                                <div className="col-md-8 col-6 text">
                                                    <span>{business.map((val, idx3) => {
                                                        return <span key={idx3} style={{ fontWeight: idx3 === 0 ? "normal" : "bold" }}>{val.toUpperCase()} </span>;
                                                    })}</span>
                                                </div>
                                                <div className="col-md-4 col-6 pl-3 pr-0 pt-custom">
                                                    {/* <Link> */}
                                                    <button onClick={() => props.viewKitchen(kitchen)}>VIEW DETAILS</button>
                                                    {/* </Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>;
                        })}
                    </div>
                }
            </Scrollbars>
        </div>
    );
};

const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    };
};

export default connect(mapStateToProps, null)(OcassionsMenuComponent);