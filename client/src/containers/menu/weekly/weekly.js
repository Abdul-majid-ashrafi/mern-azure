import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WeeklyMenuComponent, NavigationBar } from '../../../components';
import { setWeeklyDeals, removeDeal, updateMenuDeal, orderDispatchedDailyItem, setMenuLocally, getAKitchenWithMenu, dispatchDealOrders, dispatchOrdersLocal, setImageInDrive, updateImageForItems, removeMenuLocally } from '../../../store/actions';
import { getStorage, setStorage, sweetalert, NoRecordFound, generateOrderId } from '../../../shared';
import { SupplierHomeContainer } from '../..';

export class WeeklyMenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsRef: [],
            weeklyMenuKitchens: [],
            items: [],
            image: '',
            // pickuptime_to_day: '',
            // pickuptime_from_day: '',
            selectedRemoveDealId: '',
            time: {},
            selectedDealId: '',
            selectedDeal: {
                allItems: [], // its not include in a DEAL
                title: '',
                items: [],
                tags_keywords: '',
                image: '',
                serving: '',
                pickuptime_from: '',
                pickuptime_to: '',
                mode: '',
                price: '',
                discount: '',
            },
            fieldNamesOfUpdatedDeal: [],
            deal: {
                title: '',
                items: [],
                tags_keywords: '',
                image: '',
                discription: '',
                serving: 0,
                mode: '',
                pickuptime_from: '',
                pickuptime_to: '',
                price: 0,
                discount: 0,
            },
        };
    }

    static getDerivedStateFromProps(props, state) {
        const supplierId = getStorage('sid');
        if (props.searchBase !== 'kitchen' && props.type !== "supplier" && supplierId) {
            props.removeMenuLocally();
        }
        let isGetAKitchen = state.isGetAKitchen;
        if (!props.menu.supplier && supplierId && props.userID && !props.isMenuFetching && !isGetAKitchen) {
            // get menu by api
            const token = getStorage('token');
            const obj = {
                Authorization: `Bearer ${token}`,
                userid: props.userID,
                supplierId
            };
            props.getAKitchenWithMenu(obj);
            isGetAKitchen = true;
        }
        if (props.type !== "supplier" && !props.menu.supplier && !supplierId) {
            const weeklyMenu = [];
            for (let i = 0; i < props.kitchens.length; i++) {
                const kitchen = props.kitchens[i];
                if (kitchen.menu.weekly.deals.length) {
                    weeklyMenu.push(kitchen);
                }
            }
            weeklyMenu.sort(function (a, b) {
                if (b.featured || a.featured) {
                    return b.featured - a.featured;
                }
                if (b.menu.rating.avg < a.menu.rating.avg) {
                    return -1;
                }
                if (b.menu.rating.avg > a.menu.rating.avg) {
                    return 1;
                }

            });
            return { weeklyMenuKitchens: weeklyMenu, isGetAKitchen: isGetAKitchen };
        }
        return false;
    }

    inputHandler = (env) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        if (env.target.name === 'serving' || env.target.name === 'price' || env.target.name === 'discount') {
            this.setState({
                ...this.state,
                deal: {
                    ...this.state.deal,
                    [env.target.name]: parseInt(env.target.value)
                }
            });
        } else if (env.target.name === 'tags_keywords') {
            this.setState({
                ...this.state.deal,
                deal: {
                    ...this.state.deal,
                    [env.target.name]: env.target.value.toLowerCase().split(",")
                }
            });
        } else {
            this.setState({
                ...this.state.deal,
                deal: {
                    ...this.state.deal,
                    [env.target.name]: env.target.value
                }
            });
        }

    };

    imageHandler = (env) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        if (env.target.files[0] && env.target.files[0].size <= 5000000) {
            // let files = env.target.files;
            // let reader = new FileReader();
            // reader.readAsDataURL(files[0]);
            const index = this.state.fieldNamesOfUpdatedDeal.indexOf('image');
            // reader.onload = (e) => {
            this.setState({
                ...this.state,
                ...this.state.selectedDeal,
                selectedDeal: {
                    ...this.state.selectedDeal,
                    image: env.target.files[0]
                },
                fieldNamesOfUpdatedDeal: index === -1 ? [
                    ...this.state.fieldNamesOfUpdatedDeal,
                    "image"
                ] : this.state.fieldNamesOfUpdatedDeal,
                ...this.state.deal,
                deal: {
                    ...this.state.deal,
                    image: env.target.files[0]
                }
            });
            // }
        } else {
            sweetalert('error', 'Image not Selected');
            this.setState({ image: '' });
        }
    };

    onCreateDeal = (value) => {
        value.preventDefault();
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        if ((this.state.deal.items.length) && (this.state.deal.image)) {
            const createDeal = {
                title: this.state.deal.title,
                items: this.state.deal.items,
                tags_keywords: this.state.deal.tags_keywords,
                image: this.state.deal.image,
                serving: this.state.deal.serving,
                mode: this.state.deal.mode,
                pickuptime_from: this.state.deal.pickuptime_from_day + ', ' + this.state.deal.pickuptime_from,
                pickuptime_to: this.state.deal.pickuptime_to_day + ', ' + this.state.deal.pickuptime_to,
                price: this.state.deal.price,
                discount: this.state.deal.discount,
                description: this.state.deal.description,
            };
            const dealObject = {
                deal: createDeal,
            };
            const token = getStorage('token');
            const headers = {
                Authorization: `Bearer ${token}`,
                userid: this.props.userID
            };
            const FormData = require("form-data");
            let obj = new FormData();
            obj.append("file", createDeal.image);
            obj.append("category", "Weekly Deal");
            this.props.setImageInDrive(obj, headers, dealObject, "weekly deal", this.formClearAfterSubmit);

            // this.props.setWeeklyDeals(headers, dealObject);
        } else {
            sweetalert('error', 'Fill Input Fields');
        }
    };

    formClearAfterSubmit = () => {
        // for input fields 
        const inputsId = ['title', 'image', 'discount', 'mode', 'description', 'tags_keywords', 'price', 'servings', 'pickuptime_to_day', 'pickuptime_from_day', 'pickuptime_to', 'pickuptime_from'];
        for (let i = 0; i < inputsId.length; i++) {
            const currentId = inputsId[i];
            const currentInput = document.getElementById(currentId);
            currentInput.value = '';
        }
        // for items 
        const allItems = document.getElementById('allItems');
        const selectedItems = allItems.getElementsByTagName('input');
        for (let i = 0; i < selectedItems.length; i++) {
            const element = selectedItems[i];
            element.checked = false;
        }
    };

    checkBoxHandler = (values) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        const newItem = values.target.value;
        let items = this.state.items;
        const existingItem = items.indexOf(newItem);
        if (existingItem !== -1) {
            items.splice(existingItem, 1);
            // items = items;
        } else {
            items = items.concat(newItem);
        }
        // items array
        this.setState({ items });
        setTimeout(() => {
            this.setPriceAndItemsRef();
        }, 10);
    };

    setPriceAndItemsRef() {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        const itemsRef = [];
        // let price = 0;
        // we need to send ids of items which is selected for daily items menu now we are are getting ids into items by title
        for (let j = 0; j < this.state.items.length; j++) {
            const title = this.state.items[j];
            for (let i = 0; i < this.props.items.length; i++) {
                const item = this.props.items[i];
                if (title === item.title) {
                    // price += item.price
                    itemsRef.push(item._id);
                    break;
                }
            }
        }
        this.setState({
            ...this.state,
            deal: {
                ...this.state.deal,
                items: itemsRef
            }, itemsRef
        });
    }

    onOrder = deal => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }

        const selectedKitchen = this.props.selectedKitchen;
        const user = this.props.user;
        let address = "";
        let mode = "";
        let kname = "";
        let supplierEmail = "";
        if (this.props.searchBase === "kitchen") {
            if (this.props.selectedKitchen.mode[0] === "pickup") {
                address = `${selectedKitchen.address ? selectedKitchen.address + ", " : ""
                    }${selectedKitchen.address_line_2 !== ""
                        ? selectedKitchen.address_line_2 + ", "
                        : ""
                    }${selectedKitchen.Suburb ? selectedKitchen.Suburb + ", " : ""} ${selectedKitchen.state ? selectedKitchen.state : ""
                    }`;
            } else {
                address = `${user.address ? user.address + ", " : ""}${user.city ? user.city + ", " : ""
                    }${user.state ? user.state + ", " : ""}${user.country ? user.country + "" : ""
                    }`;
            }
            mode = selectedKitchen.mode[0];
            kname = getStorage("kname");
            supplierEmail = selectedKitchen.email;
        } else {
            if (deal.mode[0] === "pickup") {
                address = deal.address;
            } else {
                address = `${user.address ? user.address + ", " : ""}${user.city ? user.city + ", " : ""
                    }${user.state ? user.state + ", " : ""}${user.country ? user.country + "" : ""
                    }`;
            }
            mode = deal.mode[0];
            kname = deal.businessName;
            supplierEmail = deal.email;
        }



        let id = deal._id;
        const currentdealId = [];
        let pickupTime = '';
        let amount = 0;
        const weekluMenu = this.props.searchBase === "kitchen" ? this.props.weekly.deals : this.props.allKitchensMenu.weekly.deals;
        for (let i = 0; i < weekluMenu.length; i++) {
            const element = weekluMenu[i];
            if (element._id === id) {
                currentdealId.push(element._id);
                amount = amount + element.price;
                pickupTime = element.pickuptime_from;
            }
        }
        let sid = getStorage("sid");
        const obj = {
            orderId: generateOrderId(),
            dealid: id,
            menuType: 'weekly',
            pickupTime: deal.pickuptime_from,
            kitchenName: kname,
            customerName: this.props.user.full_name,
            userid: this.props.userID,
            supplierId: sid ? sid : deal.supplier,
            price: amount,
            count: 1,
            serving: deal.serving,
            description: deal.description,
            mode: mode,
            deal,
            address: address,
            email: user.email,
            kitchenEmail: supplierEmail
        };
        console.log(obj);
        this.props.dispatchOrdersLocal(obj, amount);
    };

    onSelectDeal = (value, dealId, imageID) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        // this loop works for remove selected property if already exist
        for (let i = 0; i < this.props.items.length; i++) {
            const item = this.props.items[i];
            delete item.selected;
        }
        value.allItems = this.props.items;
        for (let i = 0; i < value.items.length; i++) {
            const selectedDealItem = value.items[i];
            for (let j = 0; j < value.allItems.length; j++) {
                let item = value.allItems[j];
                if (selectedDealItem._id === item._id) {
                    item['selected'] = true;
                    break;
                }
            }
        }
        this.setState({ selectedDeal: value, selectedDealImage: imageID, selectedDealId: dealId, fieldNamesOfUpdatedDeal: [] });
    };

    onChangeUpdateDealHandler = (value) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        const index = this.state.fieldNamesOfUpdatedDeal.indexOf(value.target.name);
        this.setState({
            ...this.state,
            selectedDeal: {
                ...this.state.selectedDeal,
                [value.target.name]: value.target.value
            },
            fieldNamesOfUpdatedDeal: index === -1 ? [
                ...this.state.fieldNamesOfUpdatedDeal,
                value.target.name
            ] : this.state.fieldNamesOfUpdatedDeal
        });

    };

    onUpdateDeal = (value) => {
        value.preventDefault();
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        let obj = {};
        const fields = this.state.fieldNamesOfUpdatedDeal;
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            if (field === "tags_keywords" && this.state.selectedDeal[field]) {
                obj[field] = this.state.selectedDeal[field].toLowerCase().split(",");
            } else if (field === "serving" || field === "price" || field === 'discount') {
                obj[field] = parseInt(this.state.selectedDeal[field]);
            } else if (field === 'items') {
                obj[field] = this.state.selectedDeal.allItems;
            } else {
                obj[field] = this.state.selectedDeal[field];
            }
        }
        const items = [];
        if (obj.items && obj.items.length) {
            for (let i = 0; i < obj.items.length; i++) {
                const item = obj.items[i];
                if (item.selected) {
                    items.push(item._id);
                    // obj.items.splice(i, 1);
                }
            }
            obj.items = items;
        }

        let image = "";
        if (obj.image) {
            image = obj.image;
            obj = {
                image: this.state.selectedDealImage
            };
            const FormData = require("form-data");
            let formObj = new FormData();
            formObj.append("file", image);
            formObj.append("fileid", obj.image);
            this.props.updateImageForItems(formObj);

        }

        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID,
            dealid: this.state.selectedDealId,
        };
        this.props.updateMenuDeal(headers, obj);
    };

    selectItemscheckBoxHandler = (evn) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        const itemsIndex = this.state.fieldNamesOfUpdatedDeal.indexOf('items');
        const newItem = evn.target.value;
        // let items = this.state.selectedDeal.items; // already selected item which is select on creation time
        let allItems = this.state.selectedDeal.allItems;

        const index = allItems.findIndex((obj => {
            return (obj._id === newItem && obj.selected);
            // find exist item if already selected
        }));
        const idx = allItems.findIndex((obj => {
            return (obj._id === newItem && !obj.selected);
            // find exist item if not selected
        }));
        if (index !== -1) {
            delete allItems[index].selected;
            allItems.splice(index, 1, allItems[index]);
        } else {
            allItems[idx].selected = true;
            allItems.splice(idx, 1, allItems[idx]);
        }
        this.setState({
            ...this.state,
            fieldNamesOfUpdatedDeal: itemsIndex === -1 ? [
                ...this.state.fieldNamesOfUpdatedDeal,
                'items'
            ] : this.state.fieldNamesOfUpdatedDeal,
            selectedDeal: {
                ...this.state.selectedDeal,
                allItems
            }
        });

    };

    removeDeal = (value, imageID) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        this.setState({ selectedRemoveDealId: value });
        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID,
            dealid: value,
        };
        this.props.removeDeal(headers, imageID);
    };

    authForOrder = (type, loginWithRedirect) => {
        if (type) {
            setStorage("type", type);
            loginWithRedirect();
        }
    };

    viewKitchen = (kitchen) => {
        this.props.setMenuLocally(kitchen);
    };

    isProcessingSomethingAboutMenu() {
        const { isSetWeeklyMenuDeal, isMenuItemFetching, isRemoveDeal, isUpdateDeal } = this.props;
        if (isSetWeeklyMenuDeal || isMenuItemFetching || isRemoveDeal || isUpdateDeal) {
            sweetalert("info", "Please wait, already in process");
            return true;
        } else {
            return false;
        }
    }

    render() {
        let isRenderNoRecord = false;
        if (this.props.type !== "supplier") {
            if (!this.props.weekly.deals.length && !this.state.weeklyMenuKitchens.length) {
                isRenderNoRecord = true;
            }
        }
        return (
            <div>
                {this.props.type === "supplier" ? <SupplierHomeContainer /> : <NavigationBar />}
                {(this.props.isMenuItemFetching || this.props.isKitchensFetching || this.props.isMenuFetching)
                    ? <div style={{ position: 'absolute', top: '55%' }} className="text-center loader-alignment">
                        <span style={{ width: '3rem', height: "3rem" }} className='spinner-border myInput text-primary spinner-border-sm'></span>
                    </div>
                    : (!isRenderNoRecord) ?
                        <WeeklyMenuComponent
                            // daySelection={this.daySelection.bind(this)}
                            // timeHandlerForDeals={this.timeHandlerForDeals.bind(this)}
                            onCreateDeal={this.onCreateDeal.bind(this)}
                            inputHandler={this.inputHandler.bind(this)}
                            onChangeUpdateDealHandler={this.onChangeUpdateDealHandler.bind(this)}
                            imageHandler={this.imageHandler.bind(this)}
                            removeDeal={this.removeDeal.bind(this)}
                            checkBoxHandler={this.checkBoxHandler.bind(this)}
                            authForOrder={this.authForOrder.bind(this)}
                            onSelectDeal={this.onSelectDeal.bind(this)}
                            selectItemscheckBoxHandler={this.selectItemscheckBoxHandler.bind(this)}
                            onUpdateDeal={this.onUpdateDeal.bind(this)}
                            isMenuItemFetching={this.props.isMenuItemFetching}
                            isSetWeeklyMenuDeal={this.props.isSetWeeklyMenuDeal}
                            isLoading={this.props.isLoading}
                            items={this.props.items}
                            weekly={this.props.weekly}
                            type={this.props.type}
                            isRemoveDeal={this.props.isRemoveDeal}
                            isUpdateDeal={this.props.isUpdateDeal}
                            isMenuFetching={this.props.isMenuFetching}
                            isKitchensFetching={this.props.isKitchensFetching}
                            selectedRemoveDealId={this.state.selectedRemoveDealId}
                            weeklyMenuKitchens={this.state.weeklyMenuKitchens}
                            selectedDeal={this.state.selectedDeal}
                            onOrder={this.onOrder.bind(this)}
                            viewKitchen={this.viewKitchen.bind(this)}
                            searchBase={this.props.searchBase}
                            allKitchensMenu={this.props.allKitchensMenu}
                        />
                        : <NoRecordFound />}
            </div>
        );
    }
}

const mapStateToProps = ({ menu, auth, supplierKitchens }) => {
    return {
        userID: auth.user._id,
        user: auth.user,
        isLoading: auth.isLoading, // user loading
        menu: menu.menu,
        weekly: menu.menu.weekly,
        items: menu.items,
        type: auth.user.type,
        isMenuItemFetching: menu.isMenuItemFetching,
        isUpdateDeal: menu.isUpdateDeal,
        isRemoveDeal: menu.isRemoveDeal,
        isSetWeeklyMenuDeal: menu.isSetWeeklyMenuDeal,
        orders: supplierKitchens.orders,
        isKitchensFetching: supplierKitchens.isKitchensFetching,
        isMenuFetching: menu.isMenuFetching,
        kitchens: supplierKitchens.kitchens,
        allKitchensMenu: supplierKitchens.allKitchensMenu,
        searchBase: supplierKitchens.searchBase,
        selectedKitchen: supplierKitchens.selectedKitchen,
    };
};

export default connect(mapStateToProps, {
    setWeeklyDeals,
    removeDeal,
    setMenuLocally,
    updateMenuDeal,
    orderDispatchedDailyItem,
    getAKitchenWithMenu,
    dispatchDealOrders,
    dispatchOrdersLocal,
    setImageInDrive,
    updateImageForItems,
    removeMenuLocally
})(WeeklyMenuContainer);
