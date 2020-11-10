import React, { useState } from 'react';
import { NavigationBar } from '../../';
import Scrollbars from 'react-custom-scrollbars';
import DealsForm from './dealsForm';
import ItemsForm from './itemsForm';
import iconPlus from '../../../images/icons/circle-plus.png';
import placeholderimg from "../../../images/placeholder-images/placeholder-daily.png";
import placeholderimgDeal from "../../../images/placeholder-images/placeholder-deal.png";
import UpdateDealForm from "../form/updateDeal";
import { connect } from 'react-redux';
import { SupplierHomeContainer } from '../../../containers';
import kitchen1 from '../../../images/placeholder-images/placeholder-kitchen.png';
import { useAuth0 } from '../../../contexts/auth0-context';
import { KitchenName } from '../../navigationBar';
import StarRating from '../form/starRating';
import ReactStars from 'react-rating-stars-component';
import { getStorage, NoRecordFound, setStorage } from '../../../shared';
import UpdateDailyItems from '../form/updateDailyItems';


function DailyMenuComponent(props) {
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
    const [isHover, setIsHover] = useState(false);
    const [key, setKey] = useState(false);
    const renderDailyItems = (props.isMenuItemFetching || props.isMenuFetching || props.isKitchensFetching)
        ? <div className="text-center loader-alignment">
            <div className='form-check form-check-inline'>
                <span style={{ width: '3rem', height: "3rem" }} className='spinner-border myInput text-primary spinner-border-sm'></span>
            </div>
        </div>
        :
        props.searchBase === 'menu' ? props.allKitchensMenu.daily.length ? props.allKitchensMenu.daily.map((dailyMenu, idx) => {
            return (Object.keys(dailyMenu).length !== 0 ? Object.keys(dailyMenu).map((day, idx1) => {
                const daily = dailyMenu[day];
                const items = dailyMenu[day].items;
                const image = dailyMenu[day].image;
                const times = {
                    pickuptime_from: dailyMenu[day].pickuptime_from,
                    pickuptime_to: dailyMenu[day].pickuptime_to
                };
                const serving = dailyMenu[day].serving;
                return (
                    (serving) || props.type === 'supplier' ?
                        <React.Fragment key={idx1}>
                            {props.type === "customer" ? <StarRating day={day} modalID={`${day}${dailyMenu.supplierID}`} sid={dailyMenu.supplierID} /> : null}
                            {(items && items.length) ? <div className="col-lg-4 col-md-6 singleColumn itemsCardMargin col-6">
                                <div onMouseEnter={() => { setIsHover(true); setKey(idx1); }} onMouseLeave={() => { setIsHover(false); setKey(false); }} className="kitchenHomeCard">
                                    <div className="hoverList">
                                        <img alt='' src={image ? `https://drive.google.com/uc?export=view&id=${image}` : placeholderimg} className="img-fluid img-responsive" />
                                        <div data-toggle="modal" data-target={`#starRating${day}${dailyMenu.supplierID}`} className="ratings">
                                            <ReactStars
                                                edit={false}
                                                isHalf={true}
                                                count={5}
                                                value={daily.rating && daily.rating.avg ? daily.rating.avg : 0}
                                                size={20}
                                            />
                                        </div>
                                        <div className="items-list">
                                            <Scrollbars className="scrollbar" style={{ minHeight: '30vh' }}>
                                                <table className="table table-borderless hover-table color-red-second" style={{ color: "black" }}>
                                                    <thead></thead>
                                                    {items.map((val, idx2) => {
                                                        let title = val.title.split(" ");
                                                        return (
                                                            <tbody key={idx2}>
                                                                <tr>
                                                                    <td>
                                                                        {title.map((val, idx3) => {
                                                                            return <span key={idx3} style={{ fontWeight: idx3 === 0 ? "normal" : "bold" }}>{val} </span>;
                                                                        })}
                                                                    </td>
                                                                    <td style={{ color: "#d70f64" }} className="text-right font-weight-bold">{val.price ? `$${val.price}` : ''}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2" className="paddingCol" style={{ color: "gray", }}> {val.description ? val.description : ''}
                                                                        <div className="separator"></div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        );
                                                    })
                                                    }
                                                </table>
                                                {times.pickuptime_from && times.pickuptime_to
                                                    ? <div className='text-center'>
                                                        <div className="col-md-12">
                                                            <p colSpan='2' className='text-center mb-0'>Pick Up Time</p>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <p
                                                                className='text-center'>
                                                                <span style={{ color: '#d70f64' }}>{times.pickuptime_from}</span>
                                                 &nbsp; To &nbsp;
                                                <span style={{ color: '#d70f64' }}>{times.pickuptime_to}</span>
                                                            </p>
                                                        </div>
                                                    </div> : ''}
                                                {serving
                                                    ? <div className="col-md-12">
                                                        <span >Servings</span>
                                                        <span style={{ color: '#d70f64', marginLeft: '60%' }} className="text-right"> {serving} </span>
                                                    </div> : ''}
                                            </Scrollbars>
                                        </div>
                                        {/* </div> */}
                                        <div className="cardOverlay row ml-0" >
                                            <div className="col-md-7 col-7 text" style={{ padding: "8px 0 0 10px" }}>
                                                <span>{(items.length) ? day.toUpperCase() : ""} <b>MENU</b></span>
                                            </div>
                                            <div className="col-md-5 col-5 pl-0 text-right pr-2 pt-custom py-3" style={{ padding: "0px 0px 0px 10px" }}>
                                                {(props.type === 'supplier')
                                                    ? <div className="btn-alignment" >
                                                        <button onClick={() => props.removeDailyMenu(day)}>Remove</button>
                                                        <button onClick={() => props.updateItems(daily, day)} data-toggle="modal" data-target="#UpdateDailyItems">Update</button>
                                                    </div>
                                                    : <button onClick={isAuthenticated ? () => {
                                                        setStorage('sid', daily.supplierID);
                                                        setStorage('kname', daily.businessName);
                                                        props.onOrderForItems(daily, day, times, serving);
                                                    } : () => props.authForOrder("customer", loginWithRedirect)} name="items" id={day}>Order Now </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                            }
                        </React.Fragment>
                        : null
                );

            })
                :
                null
            );
        })
            :
            null
            :
            Object.keys(props.daily).length !== 0 ? Object.keys(props.daily).map((day, idx1) => {
                const daily = props.daily[day];
                const items = props.daily[day].items;
                const image = props.daily[day].image;
                const times = {
                    pickuptime_from: props.daily[day].pickuptime_from,
                    pickuptime_to: props.daily[day].pickuptime_to
                };
                let sid = getStorage("sid");
                const serving = props.daily[day].serving;
                return (
                    (serving) || props.type === 'supplier' ?
                        <React.Fragment key={idx1}>
                            {props.type === "customer" ? <StarRating day={day} modalID={`${day}${sid}`} /> : null}
                            {(items && items.length) ? <div className="col-lg-4 col-md-6 singleColumn itemsCardMargin col-6">
                                <div onMouseEnter={() => { setIsHover(true); setKey(idx1); }} onMouseLeave={() => { setIsHover(false); setKey(false); }} className="kitchenHomeCard">
                                    <div className="hoverList">
                                        <img alt='' src={image ? `https://drive.google.com/uc?export=view&id=${image}` : placeholderimg} className="img-fluid img-responsive" />
                                        <div data-toggle="modal" data-target={`#starRating${day}${sid}`} className="ratings">
                                            <ReactStars
                                                edit={false}
                                                isHalf={true}
                                                count={5}
                                                value={3.5}
                                                size={20}
                                            />
                                        </div>
                                        <div className={`items-list `}>
                                            <Scrollbars className="scrollbar" style={{ minHeight: '30vh' }}>
                                                <table className="table table-borderless hover-table color-red-second" style={{ color: "black" }}>
                                                    <thead></thead>
                                                    {items.map((val, idx2) => {
                                                        const title = val.title.split(" ");
                                                        return (
                                                            <tbody key={idx2}>
                                                                <tr>
                                                                    <td>
                                                                        {title.map((val, idx3) => {
                                                                            return <span key={idx3} style={{ fontWeight: idx3 === 0 ? "normal" : "bold" }}>{val} </span>;
                                                                        })}
                                                                    </td>
                                                                    <td style={{ color: "#d70f64" }} className="text-right font-weight-bold">{val.price ? `$${val.price}` : ''}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2" className="paddingCol" style={{ color: "gray", }}> {val.description ? val.description : ''}
                                                                        <div className="separator"></div>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        );
                                                    })}
                                                </table>
                                                {times.pickuptime_from && times.pickuptime_to
                                                    ? <div className='text-center'>
                                                        <div className="col-md-12">
                                                            <p colSpan='2' className='text-center mb-0'>Pick Up Time</p>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <p
                                                                className='text-center'>
                                                                <span style={{ color: '#d70f64' }}>{times.pickuptime_from}</span>
                                                 &nbsp; To &nbsp;
                                                <span style={{ color: '#d70f64' }}>{times.pickuptime_to}</span>
                                                            </p>
                                                        </div>
                                                    </div> : ''}
                                                {serving
                                                    ? <div className="col-md-12">
                                                        <span >Servings</span>
                                                        <span style={{ color: '#d70f64', marginLeft: '60%' }} className="text-right"> {serving} </span>
                                                    </div> : ''}
                                            </Scrollbars>

                                        </div>
                                        {/* </div> */}
                                        {/* <div className="col-md-5 col-5 pl-0 text-right pr-2 pt-custom py-3" style={{ padding: "0px 0px 0px 10px" }}>
                                        {(props.type === 'supplier')
                                            ? <div className="btn-alignment" >
                                                <button onClick={() => props.removeDailyMenu(day, daily.image)}>Remove</button>
                                                <button onClick={() => props.updateItems(daily, day)} data-toggle="modal" data-target="#UpdateDailyItems">Update</button>
                                            </div>
                                            : <button onClick={isAuthenticated ? () => props.onOrderForItems(items, day, times, serving) : () => props.authForOrder("customer", loginWithRedirect)} name="items" id={day}>Order Now </button>
                                        }
                                    </div> */}
                                        <div className="cardOverlay row ml-0" >
                                            <div className="col-md-7 col-7 text" style={{ padding: "8px 0 0 10px" }}>
                                                <span>{(items.length) ? day.toUpperCase() : ""} <b>MENU</b></span>
                                            </div>
                                            <div className="col-md-5 col-5 pl-0 text-right pr-2 pt-custom py-3" style={{ padding: "0px 0px 0px 10px" }}>
                                                {(props.type === 'supplier')
                                                    ? <div className="btn-alignment" >
                                                        <button onClick={() => props.removeDailyMenu(day, daily.image)}>Remove</button>
                                                        <button onClick={() => props.updateItems(daily, day)} data-toggle="modal" data-target="#UpdateDailyItems">Update</button>
                                                    </div>
                                                    : <button onClick={isAuthenticated ? () => props.onOrderForItems(items, day, times, serving) : () => props.authForOrder("customer", loginWithRedirect)} name="items" id={day}>Order Now </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : null
                            }
                        </React.Fragment>
                        : null
                );
            }) : props.type !== 'supplier' && props.dailyItemsMenuKitchens.length ? props.dailyItemsMenuKitchens.map((kitchen, index) => {
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
            }) : <NoRecordFound daily={true} />;

    const renderDailyDeals = (props.isMenuItemFetching || props.isMenuFetching || props.isKitchensFetching)
        ? <div className="text-center loader-alignment">
            <div className='form-check form-check-inline'>
                <span style={{ width: '3rem', height: "3rem" }} className='spinner-border myInput text-primary spinner-border-sm'></span>
            </div>
        </div>
        :
        props.searchBase === 'menu' ? props.allKitchensMenu.daily.length ? props.allKitchensMenu.daily.map((daily, idx) => {
            return (Object.keys(daily).length !== 0 ? Object.keys(daily).map((day, idx1) => {
                const dailyMenu = daily[day];
                const deals = daily[day].deals;
                return (
                    <React.Fragment key={idx1}>
                        {deals !== undefined ? deals.map((deal, idx) => {
                            return (
                                (deal.serving) || props.type === 'supplier' ?
                                    <React.Fragment key={idx}>
                                        {props.type === "customer" ? <StarRating dealid={deal._id} modalID={deal._id} sid={daily.supplierID} /> : null}
                                        < div className="col-lg-4 col-md-6 col-6 itemsCardMargin singleColumn">
                                            <div onMouseEnter={() => { setIsHover(true); setKey(idx1); }} onMouseLeave={() => { setIsHover(false); setKey(false); }} className="kitchenHomeCard">
                                                <div className="day-tag">{day.toUpperCase()}</div>
                                                <div className="hoverList">
                                                    <img alt='' src={deal.image ? `https://drive.google.com/uc?export=view&id=${deal.image}` : placeholderimgDeal} className="img-fluid img-responsive" />
                                                    <div data-toggle="modal" data-target={`#starRating${deal._id}`} className="ratings">
                                                        <ReactStars
                                                            edit={false}
                                                            isHalf={true}
                                                            count={5}
                                                            value={deal.rating && deal.rating.avg ? deal.rating.avg : 0}
                                                            size={20}
                                                        />
                                                    </div>
                                                    {deal.discount ? <div className="bestDeals text-center">
                                                        <p>${deal.discount}</p><p>OFF</p>
                                                    </div> : ""}
                                                    <div className={` items-list`}>
                                                        <Scrollbars className="scrollbar" style={{ minHeight: '30vh' }}>
                                                            <table className="table table-borderless hover-table color-red-second" style={{ color: "black" }}>
                                                                <thead></thead>
                                                                <tbody>
                                                                    {deal.items.map((item, idx2) => {
                                                                        const title = item.title.split(" ");
                                                                        return (
                                                                            <React.Fragment key={idx2}>
                                                                                <tr>
                                                                                    <td>
                                                                                        {title.map((val, idx3) => {
                                                                                            return <span key={idx3} style={{ fontWeight: idx3 === 0 ? "normal" : "bold" }}>{val} </span>;
                                                                                        })}
                                                                                    </td>
                                                                                    <td style={{ color: "#d70f64" }} className="text-right font-weight-bold">{item.price ? `$${item.price}` : ''}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td colSpan="2" className="paddingCol" style={{ color: "gray", }}> {item.description}
                                                                                        <div className="separator"></div>
                                                                                    </td>
                                                                                </tr>
                                                                            </React.Fragment>
                                                                        );
                                                                    })}
                                                                    {deal.mode ? <tr>
                                                                        <td style={{ color: "black" }}>Mode</td>
                                                                        <td className="text-right">{deal.mode.toUpperCase()}</td>
                                                                    </tr> : null}
                                                                    <tr>
                                                                        <td style={{ color: "black" }}>Serving</td>
                                                                        <td className="text-right">{deal.serving}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan='2' style={{ color: "black" }} className='text-center'>Pick Up Time</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            colSpan='2'
                                                                            className='text-center'>
                                                                            <span style={{ color: '#d70f64' }}>{deal.pickuptime_from}</span>
                                                                  &nbsp; To &nbsp;
                                                                 <span style={{ color: '#d70f64' }}>{deal.pickuptime_to}</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </Scrollbars>
                                                    </div>
                                                    {/* </div> */}
                                                    <div className="cardOverlay row ml-0">
                                                        <div className="col-md-7 col-7 col text" style={{ padding: "8px 0px 0px 10px" }}>
                                                            <span style={{ display: 'flex', flexWrap: 'wrap' }}>{deal.title.toUpperCase()}</span>
                                                            <div>${deal.price}</div>
                                                        </div>
                                                        <div className="col-md-5 col-5 pl-0 text-right pr-2 pt-custom py-3" style={{ padding: "0px 0px 0px 10px" }} >
                                                            {(props.type === 'supplier')
                                                                ? <div className='float-right' style={{ display: 'flex', marginLeft: '11px' }} >
                                                                    {(props.isRemoveDeal) && (props.selectedRemoveDealId === deal._id)
                                                                        ? <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                                                                        : <button onClick={() => props.removeDeal(deal._id, deal.image)} >Remove</button>}
                                                                    <button onClick={() => props.onSelectDeal(deal, deal._id, deal.image)} data-toggle="modal" data-target="#updateDailyDeal"  >Update</button>
                                                                </div>
                                                                :
                                                                <button onClick={isAuthenticated ? (e) => {
                                                                    props.onOrderForDeals(e, deal, dailyMenu);
                                                                } : () => props.authForOrder("customer", loginWithRedirect)} name="deals" id={day}>Order Now </button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                    : null
                            );
                        })
                            : null}
                    </React.Fragment>

                );

            })
                :
                null
            );
        })
            :
            null
            :
            Object.keys(props.daily).length !== 0 ? Object.keys(props.daily).map((day, idx1) => {
                const daily = props.daily[day];
                const deals = props.daily[day].deals;
                return (
                    <React.Fragment key={idx1}>
                        {deals === undefined ? null : deals.map((deal, idx) => {
                            return (
                                (deal.serving) || props.type === 'supplier' ?
                                    <React.Fragment key={idx}>
                                        {props.type === "customer" ? <StarRating dealid={deal._id} modalID={deal._id} /> : null}
                                        < div className="col-lg-4 col-md-6 col-6 itemsCardMargin singleColumn">
                                            <div onMouseEnter={() => { setIsHover(true); setKey(idx1); }} onMouseLeave={() => { setIsHover(false); setKey(false); }} className="kitchenHomeCard">
                                                <div className="day-tag">{day.toUpperCase()}</div>
                                                <div className="hoverList">
                                                    <img alt='' src={deal.image ? `https://drive.google.com/uc?export=view&id=${deal.image}` : placeholderimgDeal} className="img-fluid img-responsive" />
                                                    <div data-toggle="modal" data-target={`#starRating${deal._id}`} className="ratings">
                                                        <ReactStars
                                                            edit={false}
                                                            isHalf={true}
                                                            count={5}
                                                            value={deal.rating && deal.rating.avg ? deal.rating.avg : 0}
                                                            size={20}
                                                        />
                                                    </div>
                                                    {deal.discount ? <div className="bestDeals text-center">
                                                        <p>${deal.discount}</p><p>OFF</p>
                                                    </div> : ""}
                                                    <div className={` items-list`}>
                                                        <Scrollbars className="scrollbar" style={{ minHeight: '30vh' }}>                             {
                                                            <table className="table table-borderless hover-table color-red-second" style={{ color: "black" }}>
                                                                <thead></thead>
                                                                <tbody>
                                                                    {deal.items.map((item, idx2) => {
                                                                        const title = item.title.split(" ");
                                                                        return (
                                                                            <React.Fragment key={idx2}>
                                                                                <tr>
                                                                                    <td>
                                                                                        {title.map((val, idx3) => {
                                                                                            return <span key={idx3} style={{ fontWeight: idx3 === 0 ? "normal" : "bold" }}>{val} </span>;
                                                                                        })}
                                                                                    </td>
                                                                                    <td style={{ color: "#d70f64" }} className="text-right font-weight-bold">{item.price ? `$${item.price}` : ''}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td colSpan="2" className="paddingCol" style={{ color: "gray", }}> {item.description}
                                                                                        <div className="separator"></div>
                                                                                    </td>
                                                                                </tr>
                                                                            </React.Fragment>
                                                                        );
                                                                    })}
                                                                    {deal.mode ? <tr>
                                                                        <td style={{ color: "black" }}>Mode</td>
                                                                        <td className="text-right">{deal.mode.toUpperCase()}</td>
                                                                    </tr> : null}
                                                                    <tr>
                                                                        <td style={{ color: "black" }}>Serving</td>
                                                                        <td className="text-right">{deal.serving}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td colSpan='2' style={{ color: "black" }} className='text-center'>Pick Up Time</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td
                                                                            colSpan='2'
                                                                            className='text-center'>
                                                                            <span style={{ color: '#d70f64' }}>{deal.pickuptime_from}</span>
                                                                  &nbsp; To &nbsp;
                                                                 <span style={{ color: '#d70f64' }}>{deal.pickuptime_to}</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>}
                                                        </Scrollbars>
                                                        {/* </div> */}
                                                    </div>
                                                    <div className="cardOverlay row ml-0">
                                                        <div className="col-md-7 col-7 col text" style={{ padding: "8px 0px 0px 10px" }}>
                                                            <span style={{ display: 'flex', flexWrap: 'wrap' }}>{deal.title.toUpperCase()}</span>
                                                            <div>${deal.price}</div>
                                                        </div>
                                                        <div className="col-md-5 col-5 pl-0 text-right pr-2 pt-custom py-3" style={{ padding: "0px 0px 0px 10px" }} >
                                                            {(props.type === 'supplier')
                                                                ? <div className='float-right' style={{ display: 'flex', marginLeft: '11px' }} >
                                                                    {(props.isRemoveDeal) && (props.selectedRemoveDealId === deal._id)
                                                                        ? <span className='spinner-border myInput text-primary spinner-border-sm'></span>
                                                                        : <button onClick={() => props.removeDeal(deal._id, deal.image)} >Remove</button>}
                                                                    <button onClick={() => props.onSelectDeal(deal, deal._id, deal.image)} data-toggle="modal" data-target="#updateDailyDeal"  >Update</button>
                                                                </div>
                                                                :
                                                                <button onClick={isAuthenticated ? (e) => props.onOrderForDeals(e, deal, daily) : () => props.authForOrder("customer", loginWithRedirect)} name="deals" id={day}>Order Now </button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                    : null
                            );
                        })
                        }
                    </React.Fragment>
                );
            }) : props.type !== 'supplier' && props.dailyDealsMenuKitchens.length ? props.dailyDealsMenuKitchens.map((kitchen, index) => {
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
                                    <Scrollbars className="scrollbar" style={{ minHeight: '30vh' }}>                             {
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
            }) : <NoRecordFound daily={true} />;
    return (
        <div className='container px-5' >
            {/* <StarRating /> */}
            {props.user.type === "supplier" ? <SupplierHomeContainer /> : <NavigationBar />}
            <div className="row my-1">
                <div className="col-md-7 col-7 text-right">
                    <div className="search-toggle mt-1 ml-3">
                        {/* {(defaultCheck || props.type === 'supplier') ? */}
                        <div className="custom-control custom-switch">
                            <label id="items" className="toggleLabel1 toggleColor">Items</label>
                            <input type="checkbox" className="custom-control-input" onChange={props.onSelectionInDaily} id="customSwitch2" />
                            <label id="deals" className={`custom-control-label toggleLabel2`} htmlFor="customSwitch2">Deals</label>
                        </div>
                        {/* : null} */}
                    </div>
                </div>
                {(props.type === 'supplier') ?
                    <div className="col-md-5 col-5">
                        <a data-toggle="modal" href='/#' data-target="#myModal">
                            <img src={iconPlus} alt="" className="addItems" />
                        </a>
                    </div> : ""}
            </div>
            {props.dailyMenuSelection === 'deals' ?
                <div>
                    {/* <!-- The Modal --> */}
                    <div className="modal" id="myModal" >
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ width: '1200px', right: '65%', background: '#f7f7f7' }}>
                                {/* <!-- Modal body --> */}
                                <div className="modal-body">
                                    <Scrollbars className="modalScroll" style={{ height: "70vh" }}>
                                        <DealsForm
                                            isSetDailyMenuDeal={props.isSetDailyMenuDeal}
                                            onCreateDeal={props.onCreateDeal}
                                            inputHandler={props.inputHandler}
                                            dayCheckBoxHandler={props.dayCheckBoxHandler}
                                            isMenuItemFetching={props.isMenuItemFetching}
                                            isLoading={props.isLoading}
                                            items={props.items}
                                            checkBoxHandler={props.checkBoxHandler}
                                            imageHandler={props.imageHandler}
                                        />
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* update deal modal  */}
                    <div className="modal" id="updateDailyDeal" >
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ width: '1200px', right: '65%', background: '#f7f7f7' }}>
                                {/* <!-- Modal body --> */}
                                <div className="modal-body">
                                    <Scrollbars className="modalScroll" style={{ height: "60vh" }}>
                                        {(props.selectedDeal)
                                            ? <UpdateDealForm
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
                                            : ''}
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* render daily deals */}
                    <div>
                        <Scrollbars style={{ height: "57vh" }} className="menu-scroll-height mobile-background" id='itemsDays'>
                            <div className='row mx-0 mt-4 cardMargin'>
                                {renderDailyDeals}
                            </div>
                        </Scrollbars>
                    </div>
                </div>
                : <div>
                    {/* <button type="button" style={{ marginLeft: '47px' }} className="btn background-color col-md-4 col-6 mt-3 color_white" data-toggle="modal" data-target="#myModal">
                        <i className="fal fa-plus-circle"></i>
                    </button> */}

                    {/* <!-- The Modal --> */}
                    <div className="modal" id="myModal" >
                        <div className="modal-dialog">
                            <div className="modal-content container" style={{ width: '1200px', right: '65%', background: '#f7f7f7' }}>
                                {/* <!-- Modal body --> */}
                                <div className="modal-body">
                                    <Scrollbars className="modalScroll" style={{ height: "60vh" }}>
                                        <ItemsForm
                                            onCreateItems={props.onCreateItems}
                                            daySelection={props.daySelection}
                                            onchangeServingForItems={props.onchangeServingForItems}
                                            isMenuItemFetching={props.isMenuItemFetching}
                                            isLoading={props.isLoading}
                                            items={props.items}
                                            imageHandler={props.imageHandler}
                                            checkBoxHandler={props.checkBoxHandler}
                                            timeForCreateItems={props.timeForCreateItems}
                                        />
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* update items modal  */}
                    <div className="modal" id="UpdateDailyItems" >
                        <div className="modal-dialog">
                            <div className="modal-content" style={{ width: '1200px', right: '65%', background: '#f7f7f7' }}>
                                {/* <!-- Modal body --> */}
                                <div className="modal-body">
                                    <Scrollbars className="modalScroll" style={{ height: "60vh" }}>
                                        <UpdateDailyItems
                                            items={props.items}
                                            SelectedUpdateItems={props.SelectedUpdateItems}
                                            onUpdateItems={props.onUpdateItems}
                                            inputForUpdateItems={props.inputForUpdateItems}
                                            updateItemsCheckBoxHandler={props.updateItemsCheckBoxHandler}
                                            isUpdateDailyItems={props.isUpdateDailyItems}
                                        />
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* render daily items */}
                    <div>
                        <Scrollbars style={{ height: "57vh" }} className="menu-scroll-height mobile-background" id='itemsDays'>
                            <KitchenName />
                            <div className='row mt-4 mx-0 cardMargin'>
                                {renderDailyItems}
                            </div>
                        </Scrollbars>
                    </div>
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

export default connect(mapStateToProps, null)(DailyMenuComponent);