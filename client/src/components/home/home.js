import React, { useState } from 'react';
import history from "../../history";
import Scrollbars from 'react-custom-scrollbars';
import kitchen1 from '../../images/placeholder-images/placeholder-kitchen.png';
import { getStorage } from '../../shared';
import ReactStars from 'react-rating-stars-component';

function getRoute(kitchen, props) {
    props.viewKitchen(kitchen);
    setTimeout(() => {
        const routePath = getStorage("route");
        if (routePath)
            history.push(routePath);
    }, 100);
}
function HomeComponent(props) {
    const [, setIsHover] = useState(false);
    const [, setKey] = useState(false);
    // const type = props.user && props.user.type || ""
    // let profile = "";
    // if (type === "customer") {
    //     profile = <CustomerComponent user={props.user} />;
    // } else if (type === "supplier") {
    //     profile = <SupplierComponent user={props.user} />;
    // } else if (type === "admin") {
    //     profile = <Redirect to='/list' />;
    // }
    // const routePath = getStorage("route");
    // alert(routePath)
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
        <div>
            <section className="container" id="homeSection">
                <Scrollbars style={{ height: "60vh" }}>
                    {(props.isKitchensFetching)
                        ? <div className="text-center loader-alignment">
                            <div className='form-check form-check-inline'>
                                <span style={{ width: '3rem', height: "3rem" }} className='spinner-border myInput text-primary spinner-border-sm'></span>
                            </div>
                        </div>
                        : <div className="row mx-0 mt-4 cardMargin">
                            {props.kitchens.map((kitchen, index) => {
                                // console.log(kitchen);
                                const business = kitchen.business.split(" ");
                                return <div key={index} className="col-lg-4 col-md-6 kitchenCardMargin col-6">
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

                                                <div className="cardOverlay ml-0 row" style={{ bottom: "auto" }}>
                                                    <div className="col-md-8 col-6 text">
                                                        <span> {business.map((val, idx3) => {
                                                            return <span key={idx3} style={{ fontWeight: idx3 === 0 ? "normal" : "bold" }}>{val.toUpperCase()} </span>;
                                                        })}</span>
                                                    </div>
                                                    <div className="col-md-4 col-6 pl-3 pr-0 pt-custom">
                                                        {/* <Link> */}
                                                        <button onClick={() => getRoute(kitchen, props)}>VIEW DETAILS</button>
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
            </section>
        </div>
    );
}
export default HomeComponent;