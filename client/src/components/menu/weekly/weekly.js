import React, { useState } from 'react';
import WeeklyForm from './weeklyForm';
// import kitchen3 from '../../../images/kitchen3.jpg';
import Scrollbars from 'react-custom-scrollbars';
import iconPlus from '../../../images/icons/circle-plus.png';
import placeholderimg from "../../../images/placeholder-images/placeholder-weekly.png";
import UpdateDealForm from '../form/updateDeal';
import kitchen1 from '../../../images/placeholder-images/placeholder-kitchen.png';
import { connect } from 'react-redux';
import { useAuth0 } from '../../../contexts/auth0-context';
import { KitchenName } from '../../navigationBar';
import StarRating from '../form/starRating';
import ReactStars from 'react-rating-stars-component';

function WeeklyMenuComponent(props) {
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
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    const weeklyDealsForMenu = props.searchBase === 'kitchen' ? props.weekly.deals : props.allKitchensMenu.weekly.deals;
    const [isHover, setIsHover] = useState(false);
    const [, setKey] = useState();
    const deals = weeklyDealsForMenu;
    const weeklyDeals = deals.length ? deals.map((val, idx1) => {
        return (
            (val.serving && val.status) || props.type === "supplier" ? <React.Fragment key={idx1}>
                {props.type === "customer" ? <StarRating dealid={val._id} modalID={val._id} sid={val.supplier} /> : null}
                <div className="col-lg-4 col-md-6 singleColumn itemsCardMargin col-6 mt-3">
                    <div onMouseEnter={() => { setIsHover(true); setKey(idx1); }} onMouseLeave={() => { setIsHover(false); setKey(false); }} className="kitchenHomeCard">
                        {val.discount ? <div className="bestDeals text-center">
                            <p>${val.discount}</p><p>OFF</p>
                        </div> : ""}
                        <div className="hoverList">
                            <img alt='' src={val.image ? `https://drive.google.com/thumbnail?id=${val.image}` : placeholderimg} className="img-fluid img-responsive" />
                            <div data-toggle="modal" data-target={`#starRating${val._id}`} className="ratings">
                                <ReactStars
                                    edit={false}
                                    isHalf={true}
                                    count={5}
                                    value={val.rating && val.rating.avg ? val.rating.avg : 0}
                                    size={20}
                                />
                            </div>
                            <div className={`items-list`} >
                                <Scrollbars className="scrollbar" style={{ minHeight: '35vh', maxHeight: '36vh' }}>                             {
                                    <table className="table table-borderless hover-table color-red-second" style={{ color: "black" }}>
                                        <thead></thead>
                                        <tbody>
                                            {val.items.map((val, idx2) => {
                                                const title = val.title.split(" ");
                                                return (
                                                    <React.Fragment key={idx2}>
                                                        <tr>
                                                            <td colSpan="2">
                                                                {title.map((val, idx3) => {
                                                                    return <span key={idx3} style={{ fontWeight: idx3 === 0 ? "normal" : "bold" }}>{val} </span>;
                                                                })}
                                                            </td>
                                                            <td style={{ color: "#d70f64", position: "absolute", right: '4px' }} className="text-right font-weight-bold">{val.price ? `$${val.price}` : ''}</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2" className="paddingCol" style={{ color: "gray", }}> {val.description ? val.description : ''}
                                                                <div className="separator"></div>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                );
                                            })}
                                            <tr>
                                                <td>Serving</td>
                                                <td className="text-right">{val.serving}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">Description</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style={{ color: "gray", width: "0", display: "flex" }}>{val.description ? val.description : ''}</td>
                                            </tr>
                                            {val.mode ? <tr>
                                                <td>Mode</td>
                                                <td className="text-right">{capitalizeFirstLetter(val.mode)}</td>
                                            </tr> : null}
                                            <tr>
                                                <td colSpan='2' className='text-center'>Pick Up Time</td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{ fontSize: '13px' }}
                                                    colSpan='2'
                                                    className='text-center'>
                                                    <span style={{ color: '#d70f64' }}>{val.pickuptime_from}</span>
                                                     &nbsp; To &nbsp;
                                                    <span style={{ color: '#d70f64' }}>{val.pickuptime_to}</span>
                                                </td>
                                            </tr>
                                            {(props.type === 'supplier')
                                                ? <tr>
                                                    <td>Tag Keywords</td>
                                                    <td className="text-right">{capitalizeFirstLetter(val.tags_keywords).map((tag, idx) => <span style={{ marginLeft: '10px' }} key={idx}>{tag}</span>)}</td>
                                                    {/* <td className="text-right">{val.tags_keywords ? val.tags_keywords.map((val, idx3) => {
                                                        return (
                                                            <React.Fragment key={idx3}>
                                                                {val}
                                                                <br />
                                                            </React.Fragment>
                                                        )
                                                    }) : ''}</td> */}
                                                </tr> : null}
                                        </tbody>
                                    </table>
                                }
                                </Scrollbars>
                            </div>
                            {/* </div> */}
                            <div className="cardOverlay row ml-0" style={{ bottom: (isHover) ? "auto" : 1 }}>
                                <div className="col-md-7 col-7 col text" style={{ padding: "8px 0px 0px 10px" }}>
                                    <span>{val.title.toUpperCase()}</span>
                                    <div>${val.price}</div>
                                </div>
                                <div className="col-md-5 col-5 pl-3 text-right pr-2 pt-custom py-3" style={{ padding: "0px 0px 0px 10px" }} >
                                    {(props.type === 'supplier')
                                        ? <div className='btn-alignment' >
                                            {(props.isRemoveDeal) && (props.selectedRemoveDealId === val._id)
                                                ? <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                                                : <button onClick={() => props.removeDeal(val._id, val.image)}>Remove</button>}
                                            <button onClick={() => props.onSelectDeal(val, val._id, val.image)} data-toggle="modal" data-target="#updateWeeklyDeal">Update</button>

                                        </div>
                                        : <button onClick={isAuthenticated ? () => props.onOrder(val) : () => props.authForOrder("customer", loginWithRedirect)} id={val._id}>Order Now </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment> : null
        );
    }) : props.weeklyMenuKitchens.map((kitchen, index) => {
        const business = kitchen.business.split(" ");
        return <div key={index} className="col-lg-4 col-md-6 col-6 kitchenCardMargin mt-3">
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
    });

    const submitButton = (props.isSetWeeklyMenuDeal) ?
        <div className='form-check form-check-inline'>
            <button type="submit" className="continue-button background-color">
                <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                                     Creating...
            </button>
        </div>
        :
        <button type="submit" className="createWeeklyDealsCloseModal continue-button background-color">Create</button>;

    return (
        <div className='container px-5' >
            {/* <button type="button" style={{ marginLeft: '47px' }} className="btn background-color color_white" data-toggle="modal" data-target="#myModal">
                Deals +
                     </button> */}
            {(props.type === 'supplier') ?
                <div className="row">
                    <div className="col-md-12 col-12">
                        <a data-toggle="modal" href='/#' className="my-1" data-target="#myModal">
                            <img src={iconPlus} alt="" className="addItems" />
                        </a>
                    </div>
                </div> : null}
            {/* <!-- The Modal --> */}
            <div className="modal" id="myModal" >
                <div className="modal-dialog">
                    <div className="modal-content" style={{ width: '1200px', right: '65%', background: '#f7f7f7' }}>
                        {/* <!-- Modal body --> */}
                        <div className="modal-body">
                            <Scrollbars className="modalScroll" style={{ height: "75vh" }}>
                                <WeeklyForm
                                    onCreateDeal={props.onCreateDeal}
                                    daySelection={props.daySelection}
                                    inputHandler={props.inputHandler}
                                    timeHandlerForDeals={props.timeHandlerForDeals}
                                    imageHandler={props.imageHandler}
                                    isMenuItemFetching={props.isMenuItemFetching}
                                    isLoading={props.isLoading}
                                    checkBoxHandler={props.checkBoxHandler}
                                    items={props.items}
                                    submitButton={submitButton}
                                />
                            </Scrollbars>
                        </div>
                    </div>
                </div>
            </div>
            {/* render weekly deals */}
            {(props.isMenuItemFetching || props.isKitchensFetching || props.isMenuFetching)
                ? <div className="text-center loader-alignment" style={{ top: '54%' }}>
                    <div className='form-check form-check-inline'>
                        <span style={{ width: '3rem', height: "3rem" }} className='margin-top spinner-border myInput text-primary spinner-border-sm'></span>
                    </div>
                </div>
                :
                <div>
                    <Scrollbars style={{ height: "60vh" }} className="menu-scroll-height mobile-background" id='itemsDays'>
                        <KitchenName />
                        <div className='row mt-3 mx-0 cardMargin'>
                            {weeklyDeals}
                            {/* update deal modal  */}
                            <div className="modal" id="updateWeeklyDeal" >
                                <div className="modal-dialog">
                                    <div className="modal-content" style={{ width: '1200px', right: '65%', background: '#f7f7f7' }}>
                                        {/* <!-- Modal Header --> */}
                                        <div className="modal-header">
                                            <h4 className="modal-title">Create Items</h4>
                                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                                        </div>
                                        {/* <!-- Modal body --> */}
                                        <div className="modal-body">
                                            <Scrollbars className="modalScroll" style={{ height: "75vh" }}>
                                                <UpdateDealForm
                                                    onChangeUpdateDealHandler={props.onChangeUpdateDealHandler}
                                                    onUpdateDeal={props.onUpdateDeal}
                                                    imageHandler={props.imageHandler}
                                                    isLoading={props.isLoading}
                                                    isMenuItemFetching={props.isMenuItemFetching}
                                                    items={props.items}
                                                    selectedDeal={props.selectedDeal}
                                                    isUpdateDeal={props.isUpdateDeal}
                                                    selectItemscheckBoxHandler={props.selectItemscheckBoxHandler}

                                                />
                                            </Scrollbars>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Scrollbars>
                </div>
            }
        </div >
    );
}


const mapStateToProps = ({ auth }) => {
    return {
        user: auth.user
    };
};

export default connect(mapStateToProps, null)(WeeklyMenuComponent);