import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DailyMenuComponent } from '../../../components';
import {
    setDailyItems,
    setDailyDeals,
    removeDailyMenu,
    removeDeal,
    removeMenuItem,
    updateMenuDeal,
    setMenuLocally,
    getAKitchenWithMenu,
    orderDispatchedDailyItem,
    dispatchDealOrders,
    dispatchOrdersLocal,
    setImageInDrive,
    updateImageForItems,
    updateDailyMenu,
    removeMenuLocally
} from '../../../store/actions';
import { getStorage, sweetalert, setStorage, generateOrderId } from '../../../shared';

export class DailyMenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dailyMenuSelection: 'items',
            itemsDay: '',
            SelectedUpdateItems: {},
            updatedItems: {
                pickuptime_from: '',
                pickuptime_to: '',
                serving: 0,
            },
            selectedRemoveDealId: '',
            itemsRef: [], // items ids
            items: [],
            time: {
                pickuptime_from: '',
                pickuptime_to: '',
            },
            order: {
                days: [],
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
            },
            days: [],
            deal: {
                title: '',
                items: [],
                tags_keywords: '',
                image: '',
                serving: 0,
                pickuptime_from: '',
                pickuptime_to: '',
                price: 0,
                description: '',
                discount: 0,
                mode: '',
            },
            image: '',
            selectedDealImage: '',
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
                description: '',
                discount: '',
            },
            fieldNamesOfUpdatedDeal: [],
            orders: {
                monday: {
                    items: [],
                    deals: []
                },
                tuesday: {
                    items: [],
                    deals: []
                },
                wednesday: {
                    items: [],
                    deals: []
                },
                thursday: {
                    items: [],
                    deals: []
                },
                friday: {
                    items: [],
                    deals: []
                },
                saturday: {
                    items: [],
                    deals: []
                },
                sunday: {
                    items: [],
                    deals: []
                },
            },
            dailyItemsMenuKitchens: [],
            dailyDealsMenuKitchens: [],
            dailyItemsImage: '',
        };
    }

    static getDerivedStateFromProps(props, state) {
        const isMenuBaseKitchen = false;
        const supplierId = getStorage('sid');
        if (props.searchBase !== 'kitchen' && props.type !== "supplier" && supplierId) {
            props.removeMenuLocally();
        }

        let isGetAKitchen = state.isGetAKitchen;
        if (!props.menu.supplier && supplierId && props.userID && !props.isMenuFetching && !isGetAKitchen) {
            // get a menu by api
            const token = getStorage('token');
            const obj = {
                Authorization: `Bearer ${token}`,
                userid: props.userID,
                supplierId
            };
            props.getAKitchenWithMenu(obj);
            isGetAKitchen = true;
        }

        if (props.type !== "supplier" && !props.menu.supplier && !supplierId && !isMenuBaseKitchen) {
            // if any menu not selected
            const dailyMenuItems = [];
            const dailyMenuDeals = [];
            for (let i = 0; i < props.kitchens.length; i++) {
                const kitchen = props.kitchens[i];
                const dailyMenu = kitchen.menu.daily;
                for (const day in dailyMenu) {
                    if (dailyMenu.hasOwnProperty(day)) {
                        const element = dailyMenu[day];
                        if (element.items && element.items.length) {
                            dailyMenuItems.push(kitchen);
                            break;
                        }
                    }
                }
                for (const day in dailyMenu) {
                    if (dailyMenu.hasOwnProperty(day)) {
                        const element = dailyMenu[day];
                        if (element.deals && element.deals.length) {
                            dailyMenuDeals.push(kitchen);
                            break;
                        }
                    }
                }
            }
            dailyMenuItems.sort(function (a, b) {
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
            dailyMenuDeals.sort(function (a, b) {
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
            return { dailyItemsMenuKitchens: dailyMenuItems, dailyDealsMenuKitchens: dailyMenuDeals, isGetAKitchen: isGetAKitchen };
        }
        return false;
    }

    handleChange = e => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        let name = e.target.name; // days name like monday ftiday
        if (e.target.checked) {
            this.setState({
                order: {
                    ...this.state.order,
                    [e.target.name]: [...this.state.order[name], e.target.value]
                }
            });
        } else {
            this.setState({
                order: {
                    ...this.state.order,
                    [e.target.name]: this.state.order[name].filter(val => val !== e.target.value)
                }
            });
        }
    };

    onOrderForItems = (itemOrder, day, times, serving) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }

        const selectedKitchen = this.props.selectedKitchen;
        const user = this.props.user;
        let address = "";
        let mode = "";
        let kname = "";
        let supplierEmail = "";
        let items = [];
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
            items = itemOrder;
        } else {
            if (itemOrder.mode[0] === "pickup") {
                address = itemOrder.address;
            } else {
                address = `${user.address ? user.address + ", " : ""}${user.city ? user.city + ", " : ""
                    }${user.state ? user.state + ", " : ""}${user.country ? user.country + "" : ""
                    }`;
            }
            mode = itemOrder.mode[0];
            kname = itemOrder.businessName;
            supplierEmail = itemOrder.email;
            items = itemOrder.items;
        }

        let itemId = [];
        let amount = 0;
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            itemId.push(element._id);
            amount = amount + element.price;
        }

        const sid = getStorage("sid");

        const obj = {
            orderId: generateOrderId(),
            menuType: 'daily',
            pickupTime: `${times.pickuptime_from} to ${times.pickuptime_to}`,
            kitchenName: kname,
            customerName: user.full_name,
            userid: this.props.userID,
            supplierId: sid ? sid : itemOrder.supplierID,
            itemids: itemId,
            price: amount,
            count: 1,
            day,
            serving,
            mode: mode,
            address: address,
            description: itemOrder.description,
            email: user.email,
            itemOrder,
            kitchenEmail: supplierEmail
        };
        console.log(obj);
        this.props.dispatchOrdersLocal(obj, amount);

    };

    onOrderForDeals = (e, deal, dailyMenu) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }

        const selectedKitchen = this.props.selectedKitchen;
        const user = this.props.user;
        let address = "";
        let mode = "";
        let kname = "";
        let supplierEmail = "";
        let items = [];
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
            if (dailyMenu.mode[0] === "pickup") {
                address = dailyMenu.address;
            } else {
                address = `${user.address ? user.address + ", " : ""}${user.city ? user.city + ", " : ""
                    }${user.state ? user.state + ", " : ""}${user.country ? user.country + "" : ""
                    }`;
            }
            mode = dailyMenu.mode[0];
            kname = dailyMenu.businessName;
            supplierEmail = dailyMenu.email;
        }
        // let id = deal._id
        let pickupTime = deal.pickuptime_from;
        let sid = getStorage("sid");

        // let amount = 0
        const obj = {
            orderId: generateOrderId(),
            dealid: deal._id,
            menuType: 'daily',
            pickupTime: pickupTime,
            kitchenName: kname,
            customerName: this.props.user.full_name,
            userid: this.props.userID,
            supplierId: sid ? sid : dailyMenu.supplierID,
            day: e.target.id,
            price: deal.price,
            serving: deal.serving,
            description: deal.description,
            mode: mode,
            address: address,
            deal,
            email: user.email,
            kitchenEmail: supplierEmail
        };
        console.log(deal);
        console.log(obj);
        console.log(dailyMenu);
        this.props.dispatchOrdersLocal(obj, deal.price);
    };

    daySelection = (value) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        this.setState({ itemsDay: value.target.value });
    };

    timeForCreateItems = (value) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        this.setState({
            time: {
                ...this.state.time,
                [value.target.name]: value.target.value
            }
        });
    };

    onSelectionInDaily = (e) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        let checkbox = document.getElementById('customSwitch2');
        let deals = document.getElementById('items');
        let items = document.getElementById('deals');
        if (checkbox.checked) {
            items.classList.add("toggleColor");
            deals.classList.remove("toggleColor");
            this.setState({
                dailyMenuSelection: "deals"
            });
        }
        else {
            this.setState({
                dailyMenuSelection: "items"
            });
            deals.classList.add("toggleColor");
            items.classList.remove("toggleColor");
        }
        this.setState({ items: [], days: [] });
    };

    onCreateItems = (value) => {
        value.preventDefault();
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        let values = {};
        if (this.state.time.pickuptime_from && this.state.time.pickuptime_to && this.state.servings) {
            values = {
                'day': this.state.itemsDay,
                'serving': parseInt(this.state.servings),
                'items': this.state.items,
                'time': this.state.time,
            };
        } else if (this.state.servings) {
            values = {
                'day': this.state.itemsDay,
                'items': this.state.items,
                'serving': parseInt(this.state.servings),
            };
        } else if (this.state.time.pickuptime_from || this.state.time.pickuptime_to) {
            sweetalert('error', 'Fill Input Fields');
        } else if (this.state.time.pickuptime_from && this.state.time.pickuptime_to) {
            values = {
                'day': this.state.itemsDay,
                'items': this.state.items,
                'time': this.state.time,
            };
        } else {
            values = {
                'day': this.state.itemsDay,
                'items': this.state.items,
            };
        }
        if (this.state.dailyItemsImage) {
            values.image = this.state.dailyItemsImage;
        }
        if (!values.day || !values.items.length) {
            return;
        }
        values.items = this.state.itemsRef;
        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID
        };
        const FormData = require("form-data");
        let obj = new FormData();
        obj.append("file", this.state.dailyItemsImage);
        obj.append("category", "Daily Items");
        console.log(values);
        let itemsObj = {};
        Object.entries(values).map(x => {
            itemsObj = {
                ...itemsObj,
                [x[0]]: typeof (x[1]) === "string" ? x[1].toLowerCase() : x[1]
            };
        });
        // console.log(itemsObj)
        this.props.setImageInDrive(obj, headers, itemsObj, "daily Items", this.itemsformClearAfterSubmit);
        // this.props.setDailyItems(headers, values, this.itemsformClearAfterSubmit);
        // setTimeout(() => {
        //     this.clearState();
        // }, 100);
    };

    itemsformClearAfterSubmit = () => {
        // for input fields 
        const inputsId = ['day', 'pickuptime_to', 'pickuptime_from', 'servings'];
        for (let i = 0; i < inputsId.length; i++) {
            const currentId = inputsId[i];
            const currentInput = document.getElementById(currentId);
            currentInput.value = '';
        }
        // for items 
        const allItems = document.getElementById('itemsMenu');
        const selectedItems = allItems.getElementsByTagName('input');
        for (let i = 0; i < selectedItems.length; i++) {
            const element = selectedItems[i];
            element.checked = false;
        }
    };

    onchangeServingForItems = (value) => {
        this.setState({ [value.target.name]: value.target.value });
    };

    clearState() {
        this.setState({
            itemsRef: [],
            deal: {
                title: '',
                items: [],
                tags_keywords: '',
                image: '',
                serving: 0,
                pickuptime_from: '',
                pickuptime_to: '',
                price: 0,
                discount: 0,
                description: '',
            },
            image: '',
            selectedDeal: {
                allItems: [], // its not include in a DEAL
                title: '',
                items: [],
                tags_keywords: '',
                image: '',
                serving: '',
                pickuptime_from: '',
                pickuptime_to: '',
                price: '',
                discount: 0,
                description: '',
            },
            fieldNamesOfUpdatedDeal: [],
            updatedItems: {},
            SelectedUpdateItems: {},
        });
    }

    // for deals 
    checkBoxHandler = (values) => { // for select items in create 
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
        let price = 0;
        // we need to send ids of items which is selected for daily items menu now we are are getting ids into items by title
        for (let j = 0; j < this.state.items.length; j++) {
            const title = this.state.items[j];
            for (let i = 0; i < this.props.items.length; i++) {
                const item = this.props.items[i];
                if (title === item.title) {
                    price += item.price;
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
            }, itemsRef, price
        });
    }

    dayCheckBoxHandler = (values) => { // for day selection in create deal
        // only for deal
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        const newDay = values.target.value.toLowerCase();
        let days = this.state.days;
        const existingDay = days.indexOf(newDay);
        if (existingDay !== -1) {
            days.splice(existingDay, 1);
            // days = days;
        } else {
            days = days.concat(newDay);
        }
        this.setState({ days });
    };

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
                },
                dailyItemsImage: env.target.files[0]
            });
            // }
        } else {
            sweetalert('error', 'Image is to large');
            this.setState({ image: '' });
        }
    };

    onCreateDeal = (value) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        value.preventDefault();
        let dealObject = {
            days: this.state.days,
            deal: this.state.deal,
        };
        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID
        };
        const FormData = require("form-data");
        let obj = new FormData();
        obj.append("file", this.state.deal.image);
        obj.append("category", "Daily Deal");
        if (this.state.deal.image === "") {
            dealObject = {
                ...dealObject,
                deal: {
                    ...dealObject.deal,
                    image: "1atfO_newKvpG9VaRZlZStHmj5WyNxQf4"
                }
            };
            this.props.setDailyDeals(headers, dealObject, this.formClearAfterSubmit);
        }
        else {
            this.props.setImageInDrive(obj, headers, dealObject, "daily deal", this.formClearAfterSubmit);
        }
        setTimeout(() => {
            this.clearState();
        }, 10);
    };

    formClearAfterSubmit = () => {
        // deal form 
        // for input fields 
        const inputsId = ['title', 'image', 'discount', 'mode', 'description', 'tags_keywords', 'price', 'servings', 'pickuptime_to', 'pickuptime_from'];
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
        // for days  
        const allDays = document.getElementById('allDays');
        const selectedDays = allDays.getElementsByTagName('input');
        for (let i = 0; i < selectedDays.length; i++) {
            const element = selectedDays[i];
            element.checked = false;
        }
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
        setTimeout(() => {
            this.clearState();
        }, 100);
    };

    removeDailyMenu = (day, image) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID,
            day: day,
        };
        this.props.removeDailyMenu(headers, image);
    };

    onSelectDeal = (value, dealid, imageID) => {
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
        this.setState({ selectedDeal: value, selectedDealImage: imageID, selectedDealId: dealid, fieldNamesOfUpdatedDeal: [] });
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

    onUpdateDeal = (value) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        value.preventDefault();
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
        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID,
            dealid: this.state.selectedDealId,
        };
        if (obj.image) {
            image = obj.image;
            obj = {
                image: this.state.selectedDealImage
            };
            const FormData = require("form-data");
            let formObj = new FormData();
            formObj.append("file", image);
            formObj.append("fileid", obj.image);
            if (obj.image === "1atfO_newKvpG9VaRZlZStHmj5WyNxQf4") {
                formObj.append("category", "Daily Deal");
                this.props.setImageInDrive(formObj, headers, obj, "deal update");
            } else {
                this.props.updateImageForItems(formObj);
            }
        }
        if (obj.image !== "1atfO_newKvpG9VaRZlZStHmj5WyNxQf4") {
            this.props.updateMenuDeal(headers, obj);
        }
        // const model = document.getElementsByClassName("updateItemCloseModal");
    };

    authForOrder = (type, loginWithRedirect) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        if (type) {
            setStorage("type", type);
            loginWithRedirect();
        }
    };

    isProcessingSomethingAboutMenu() {
        const { isRemoveDeal, isMenuItemFetching, isRemoveItem, isSetDailyMenuItem, isSetDailyMenuDeal, isRemoveDailyMenu, isOrderDispatching, isKitchensFetching, isMenuFetching } = this.props;
        if (isRemoveDeal || isMenuItemFetching || isRemoveItem || isSetDailyMenuItem || isSetDailyMenuDeal || isRemoveDailyMenu || isOrderDispatching || isKitchensFetching || isMenuFetching) {
            sweetalert("info", "Please wait, already in process");
            return true;
        } else {
            return false;
        }
    }

    updateItems = (value, day) => {
        const selectedItemsId = [];
        this.setState({ SelectedUpdateItems: {} });
        value.allItems = this.props.items;
        for (let i = 0; i < value.allItems.length; i++) {
            const item = value.allItems[i];
            item.selected = false;
        }
        for (let i = 0; i < value.items.length; i++) {
            const selectedDealItem = value.items[i];
            selectedItemsId.push(selectedDealItem._id);
            for (let j = 0; j < value.allItems.length; j++) {
                let item = value.allItems[j];
                if (selectedDealItem._id === item._id) {
                    item['selected'] = true;
                    break;
                }
            }
        }
        this.setState({ SelectedUpdateItems: value, SelectUpdateItems: value, selectedItemsId, selectedDay: day });
    };

    inputForUpdateItems = (value) => {
        if (this.isProcessingSomethingAboutMenu()) {
            return;
        }
        if (value.target.name === 'serving') {
            this.setState({
                ...this.state.SelectedUpdateItems,
                SelectedUpdateItems: {
                    ...this.state.SelectedUpdateItems,
                    [value.target.name]: parseInt(value.target.value)
                }
            });
        } else if (value.target.name === 'image') {
            this.setState({
                updateImageItemsImage: value.target.files[0]
            });
        }
        else {
            this.setState({
                ...this.state.SelectedUpdateItems,
                SelectedUpdateItems: {
                    ...this.state.SelectedUpdateItems,
                    [value.target.name]: value.target.value
                }
            });

        }
    };

    updateItemsCheckBoxHandler = (evn) => {
        const id = evn.target.id;
        let itemIds = this.state.selectedItemsId;
        const existingItem = itemIds.indexOf(id);
        if (existingItem === -1) {
            itemIds.push(id);
        } else {
            itemIds.splice(existingItem, 1);
        }
        // first I am false all selected item beacuse we are manage in second statement 
        for (let i = 0; i < this.props.items.length; i++) {
            const item = this.props.items[i];
            item.selected = false;
        }
        for (let i = 0; i < itemIds.length; i++) {
            const itemid = itemIds[i];
            for (let j = 0; j < this.props.items.length; j++) {
                let item = this.props.items[j];
                if (itemid === item._id) {
                    item['selected'] = true;
                    break;
                }
            }
        }
        this.setState({ selectedItemsId: itemIds });
    };

    onUpdateItems = (value) => {
        value.preventDefault();
        const token = getStorage('token');
        const headers = {
            Authorization: `Bearer ${token}`,
            userid: this.props.userID,
        };
        const updateItems = {
            day: this.state.selectedDay,
            userid: this.props.userID,
            itemids: this.state.selectedItemsId,
            pickuptime_from: this.state.SelectedUpdateItems.pickuptime_from,
            pickuptime_to: this.state.SelectedUpdateItems.pickuptime_to,
            serving: this.state.SelectedUpdateItems.serving,
            image: this.state.updateImageItemsImage,
        };
        if ((updateItems.itemids.length) !== (this.state.SelectUpdateItems.items.length) || updateItems.image || updateItems.pickuptime_from !== this.state.SelectUpdateItems.pickuptime_from || updateItems.serving !== this.state.SelectUpdateItems.serving || updateItems.pickuptime_to !== this.state.SelectUpdateItems.pickuptime_to) {
            if (updateItems.image) {
                const FormData = require("form-data");
                let formObj = new FormData();
                formObj.append("file", updateItems.image);
                formObj.append("fileid", this.state.SelectedUpdateItems.image);
                this.props.updateImageForItems(formObj, headers, updateItems, 'updateDailyItems');
            } else {
                this.props.updateDailyMenu(headers, updateItems);
            }
        }
    };

    viewKitchen = (kitchen) => {
        this.props.setMenuLocally(kitchen);
    };

    render() {
        return (
            <div>
                <DailyMenuComponent
                    onSelectionInDaily={this.onSelectionInDaily.bind(this)}
                    daySelection={this.daySelection.bind(this)}
                    onchangeServingForItems={this.onchangeServingForItems.bind(this)}
                    inputHandler={this.inputHandler.bind(this)}
                    imageHandler={this.imageHandler.bind(this)}
                    updateItems={this.updateItems.bind(this)}
                    checkBoxHandler={this.checkBoxHandler.bind(this)}
                    dayCheckBoxHandler={this.dayCheckBoxHandler.bind(this)}
                    onCreateItems={this.onCreateItems.bind(this)}
                    onSelectDeal={this.onSelectDeal.bind(this)}
                    onChangeUpdateDealHandler={this.onChangeUpdateDealHandler.bind(this)}
                    selectItemscheckBoxHandler={this.selectItemscheckBoxHandler.bind(this)}
                    onUpdateDeal={this.onUpdateDeal.bind(this)}
                    authForOrder={this.authForOrder.bind(this)}
                    onUpdateItems={this.onUpdateItems.bind(this)}
                    inputForUpdateItems={this.inputForUpdateItems.bind(this)}
                    updateItemsCheckBoxHandler={this.updateItemsCheckBoxHandler.bind(this)}
                    selectedDeal={this.state.selectedDeal}
                    SelectedUpdateItems={this.state.SelectedUpdateItems}
                    // price={this.state.price}
                    onCreateDeal={this.onCreateDeal.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                    dailyMenuSelection={this.state.dailyMenuSelection}
                    selectedRemoveDealId={this.state.selectedRemoveDealId}
                    days={this.state.days}
                    dailyItemsMenuKitchens={this.state.dailyItemsMenuKitchens}
                    dailyDealsMenuKitchens={this.state.dailyDealsMenuKitchens}
                    items={this.props.items}
                    daily={this.props.daily}
                    onOrderForItems={this.onOrderForItems.bind(this)}
                    onOrderForDeals={this.onOrderForDeals.bind(this)}
                    viewKitchen={this.viewKitchen.bind(this)}
                    removeDeal={this.removeDeal.bind(this)}
                    timeForCreateItems={this.timeForCreateItems.bind(this)}
                    removeDailyMenu={this.removeDailyMenu.bind(this)}
                    isRemoveDeal={this.props.isRemoveDeal}
                    isRemoveDailyMenu={this.props.isRemoveDailyMenu}
                    isMenuItemFetching={this.props.isMenuItemFetching}
                    isMenuFetching={this.props.isMenuFetching}
                    isKitchensFetching={this.props.isKitchensFetching}
                    isSetDailyMenuItem={this.props.isSetDailyMenuItem}
                    isSetDailyMenuDeal={this.props.isSetDailyMenuDeal}
                    isOrderDispatching={this.props.isOrderDispatching}
                    isLoading={this.props.isLoading}
                    isUpdateDeal={this.props.isUpdateDeal}
                    isUpdateDailyItems={this.props.isUpdateDailyItems}
                    type={this.props.type}
                    searchBase={this.props.searchBase}
                    allKitchensMenu={this.props.allKitchensMenu}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ menu, auth, supplierKitchens }) => {
    return {
        userID: auth.user._id,
        user: auth.user,
        isLoading: auth.isLoading,
        items: menu.items,
        menu: menu.menu,
        isUpdateDailyItems: menu.isUpdateDailyItems,
        daily: menu.menu.daily,
        type: auth.user.type,
        isRemoveItem: menu.isRemoveItem,
        isRemoveDeal: menu.isRemoveDeal,
        isRemoveDailyMenu: menu.isRemoveDailyMenu,
        isUpdateDeal: menu.isUpdateDeal,
        isMenuItemFetching: menu.isMenuItemFetching,
        isMenuFetching: menu.isMenuFetching,
        isSetDailyMenuItem: menu.isSetDailyMenuItem,
        isSetDailyMenuDeal: menu.isSetDailyMenuDeal,
        orders: supplierKitchens.orders,
        isKitchensFetching: supplierKitchens.isKitchensFetching,
        kitchens: supplierKitchens.kitchens,
        menus: supplierKitchens.menus,
        isOrderDispatching: supplierKitchens.isOrderDispatching,
        draftOrders: supplierKitchens.draftOrders,
        allKitchensMenu: supplierKitchens.allKitchensMenu,
        searchBase: supplierKitchens.searchBase,
        selectedKitchen: supplierKitchens.selectedKitchen
    };
};

export default connect(mapStateToProps, {
    removeDailyMenu,
    getAKitchenWithMenu,
    setDailyItems,
    setMenuLocally,
    setDailyDeals,
    removeDeal,
    removeMenuItem,
    updateMenuDeal,
    orderDispatchedDailyItem,
    dispatchDealOrders,
    dispatchOrdersLocal,
    setImageInDrive,
    updateImageForItems,
    updateDailyMenu,
    removeMenuLocally
})(DailyMenuContainer);