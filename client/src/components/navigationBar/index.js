import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStorage, removeStorage, setStorage, sweetalert } from '../../shared';
import { removeMenuLocally, clearSearchResults } from '../../store/actions';

let dailyMenu = "";


export const KitchenName = () => {
    let sid = getStorage('sid');
    let kname = getStorage('kname');

    return <React.Fragment>{sid && kname ? <div className="kitchen-position1 text-center">
        <a data-toggle="modal" data-target="#supplierDetails" href='/#'>
            <h2 style={kname.split(' ').length === 1 ? { marginTop: "0.85rem" } : {}}>{kname.split(' ').map((items, idx) => {
                return <span key={idx}>{items} </span>;
            })}</h2>
        </a>
    </div> : ""}
    </React.Fragment>;
};

class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "",
            kName: '',
            kId: '',
            sub_admin: '',
        };
    }

    static getDerivedStateFromProps(props, state) {
        let isDailyDealsAvailable = false;
        let isDailyItemsAvailable = false;
        let isWeeklyAvailable = false;
        let isOccasionAvailable = false;
        let isFrozenAvailable = false;
        let isCakeAvailable = false;
        let kName = "";
        kName = props.kName;
        let kId = "";
        kId = props.kId;
        removeStorage("route");
        // we are hide and show nevigate bar item by menu
        if (props.selectedKitchen && props.selectedKitchen.menu) {
            const menu = props.selectedKitchen.menu;
            const daily = menu.daily;
            for (const day in daily) {
                if (daily.hasOwnProperty(day)) {
                    dailyMenu = daily[day];
                    if (dailyMenu !== undefined && dailyMenu.deals && dailyMenu.deals.length) {
                        isDailyDealsAvailable = true;
                    }
                    if (dailyMenu !== undefined && dailyMenu.items && dailyMenu.items.length) {
                        isDailyItemsAvailable = true;
                    }
                }
            }
            if (menu.cake.items.length) {
                // allow cake
                isCakeAvailable = true;
                setStorage("route", "/cakes");
            }
            if (menu.occasion.items.length) {
                // allow occasion
                isOccasionAvailable = true;
                setStorage("route", "/ocassions");
            }
            if (menu.frozen.items.length) {
                // allow frozen
                isFrozenAvailable = true;
                setStorage("route", "/frozen");
            }
            if (menu.weekly.deals.length) {
                // allow Weekly
                isWeeklyAvailable = true;
                setStorage("route", "/weekly");
            }
            if (isDailyDealsAvailable || isDailyItemsAvailable) {
                setStorage("route", "/daily");
            }
        } else {
            isWeeklyAvailable = true;
            isOccasionAvailable = true;
            isFrozenAvailable = true;
            isCakeAvailable = true;
            isDailyItemsAvailable = true;
            isDailyDealsAvailable = true;
        }
        if (!isWeeklyAvailable && !isOccasionAvailable && !isFrozenAvailable && !isCakeAvailable && !isDailyDealsAvailable && !isDailyItemsAvailable) {
            //   remove selected menu from redux if all properties are false
            props.removeMenuLocally();
            sweetalert('error', 'Items Not Available In This Kitchen Yet');
        }
        return { kId, kName, sub_admin: props.sub_admin, type: props.type, isWeeklyAvailable, isOccasionAvailable, isFrozenAvailable, isCakeAvailable, isDailyItemsAvailable, isDailyDealsAvailable };
    }

    componentDidMount() {
        // let location  = useLocation();
        if (window.location.pathname === "/" && this.props.type !== "supplier") {
            this.props.removeMenuLocally();
        }
        let li = document.getElementsByClassName('nav-link');
        for (let i = 0, j = 1; i < li.length; i++, j++) {
            if (li[i].classList.contains("active")) {
                li[i].innerHTML += "<hr align='center' width='20px' color='white' />";
                let j = i - 1;
                if (j < 0) {
                } else {
                    li[j].classList.add('border-none');
                }
            } else {
            }
        }
    }

    render() {
        let supplierId = this.state.kId || getStorage("sid");
        let kname = this.state.kName || getStorage("kname");
        console.log("this.state.kName", this.state.kName);
        console.log("getStorage(kname)", getStorage("kname"));
        return (
            <React.Fragment>
                <nav className="container px-5 text-center">
                    {supplierId && kname ? <div className="kitchen-position">
                        <a data-toggle="modal" data-target="#supplierDetails" href='/#'>
                            <h2 style={kname.split(' ').length === 1 ? { marginTop: "0.85rem" } : {}}>{kname.split(' ').map((items, idx) => {
                                return <span key={idx}>{items} </span>;
                            })}</h2>
                        </a>
                    </div> : ""}

                    {(this.state.type === "admin" || this.state.sub_admin === "sub_admin") ?
                        <ul className="nav nav-pills nav-stacked">
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-link">Customers</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to="/kitchensList" className="nav-link">Kitchens</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact to="/ordersList" className="nav-link">Orders</NavLink>
                            </li>
                            {this.state.type === "admin" ? <li className="nav-item">
                                <NavLink exact to="/adminsList" className="nav-link">Admin</NavLink>
                            </li> : null}
                        </ul>
                        :
                        <ul className="nav nav-pills nav-stacked">
                            {(this.state.type === "supplier") ?
                                <li className="nav-item">
                                    <NavLink exact to="/" className="nav-link"> ORDER MANAGEMENT</NavLink>
                                </li>
                                : ""}
                            {(this.state.type === "supplier") ?
                                <li className="nav-item">
                                    <NavLink to="/items" className="nav-link"> ITEMS</NavLink>
                                </li>
                                : ""}

                            {(this.state.isDailyDealsAvailable || this.state.isDailyItemsAvailable) ?
                                <li className="nav-item">
                                    <NavLink to="/daily" className="nav-link">DAILY </NavLink>
                                </li>
                                : null}

                            {(this.state.isWeeklyAvailable) ?
                                <li className="nav-item">
                                    <NavLink to="/weekly" className="nav-link">WEEKLY </NavLink>
                                </li>
                                : null}
                            {(this.state.isFrozenAvailable) ?
                                <li className="nav-item">
                                    <NavLink to="/frozen" className="nav-link">FROZEN </NavLink>
                                </li>
                                : null}
                            {(this.state.isOccasionAvailable) ?
                                <li className="nav-item">
                                    <NavLink to="/ocassions" className="nav-link">OCCASION</NavLink>
                                </li>
                                : null}
                            {(this.state.isCakeAvailable) ?
                                <li className="nav-item">
                                    <NavLink to="/cakes" className="nav-link">CAKES</NavLink>
                                </li>
                                : null}
                        </ul>}
                </nav>
            </React.Fragment >
        );
    }
}

const mapStateToProps = ({ auth, supplierKitchens, admin }) => {
    return {
        type: auth.user.type,
        selectedKitchen: supplierKitchens.selectedKitchen,
        isSearchResultClear: supplierKitchens.isSearchResultClear,
        kName: supplierKitchens.kName,
        kId: supplierKitchens.kId,
        sub_admin: admin.activeAdmin.type,
    };
};

export default connect(mapStateToProps, { removeMenuLocally, clearSearchResults })(NavigationBar);
