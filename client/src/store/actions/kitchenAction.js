import { httpRequst } from "../../config";
import { types } from "../types";
import {
    sweetalert,
    setStorage,
    removeStorage,
    getStorage,
    setOrderStatusDetails,
    screenLockDisable,
    screenLockEnable,
} from "../../shared";
import history from "../../history";

// none authurized request
export const fetchKitchens = () => (dispatch) => {
    dispatch({ type: types.GET_KITCHENS_START });
    // start type for spining on ui
    httpRequst
        .get("/universal/getKitchens", { timeout: 70000 })
        // send headers
        .then((response) => {
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    sweetalert("error", response.data.reason || response.data.message);
                    dispatch({ type: types.GET_KITCHENS_FAILED });
                } else {
                    // fetchKitchens success
                    const kitchens = response.data;
                    console.log(kitchens);
                    const menus = [];
                    const allKitchensMenu = {
                        daily: [],
                        weekly: {
                            deals: [],
                        },
                        frozen: {
                            items: [],
                        },
                        occasion: {
                            items: [],
                        },
                        cake: {
                            items: [],
                        },
                    };
                    for (let i = 0; i < kitchens.length; i++) {
                        const kitchen = kitchens[i];
                        menus.push(kitchen.menu);
                    }

                    for (let j = 0; j < menus.length; j++) {
                        const menu = menus[j];
                        const kitchen = kitchens[j];
                        if (menu.cake.items) {
                            let items = menu.cake.items;
                            for (let k = 0; k < menu.cake.items.length; k++) {
                                items[k]["businessName"] = kitchen.business;
                                items[k]["mode"] = kitchen.mode;
                                items[k]["email"] = kitchen.email;
                                items[k]["address"] = `${kitchen.address ? kitchen.address + ", " : ""}${kitchen.address_line_2 !== "" ? kitchen.address_line_2 + ", " : ""}${kitchen.Suburb ? kitchen.Suburb + ", " : ""} ${kitchen.state ? kitchen.state : ""}`;
                            }
                            allKitchensMenu.cake.items = [...allKitchensMenu.cake.items, ...items];
                        }
                        if (menu.frozen.items) {
                            let items = menu.frozen.items;
                            for (let k = 0; k < menu.frozen.items.length; k++) {
                                items[k]["businessName"] = kitchen.business;
                                items[k]["mode"] = kitchen.mode;
                                items[k]["email"] = kitchen.email;
                                items[k]["address"] = `${kitchen.address ? kitchen.address + ", " : ""}${kitchen.address_line_2 !== "" ? kitchen.address_line_2 + ", " : ""}${kitchen.Suburb ? kitchen.Suburb + ", " : ""} ${kitchen.state ? kitchen.state : ""}`;
                            }
                            allKitchensMenu.frozen.items = [
                                ...allKitchensMenu.frozen.items,
                                ...items,
                            ];
                        }
                        if (menu.weekly.deals) {
                            let deals = menu.weekly.deals;
                            for (let k = 0; k < menu.weekly.deals.length; k++) {
                                deals[k]["businessName"] = kitchen.business;
                                deals[k]["supplier"] = kitchen._id;
                                deals[k]["mode"] = kitchen.mode;
                                deals[k]["email"] = kitchen.email;
                                deals[k]["address"] = `${kitchen.address ? kitchen.address + ", " : ""}${kitchen.address_line_2 !== "" ? kitchen.address_line_2 + ", " : ""}${kitchen.Suburb ? kitchen.Suburb + ", " : ""} ${kitchen.state ? kitchen.state : ""}`;
                            }
                            allKitchensMenu.weekly.deals = [
                                ...allKitchensMenu.weekly.deals,
                                ...deals,
                            ];
                        }
                        if (menu.occasion.items) {
                            let items = menu.occasion.items;
                            for (let k = 0; k < menu.occasion.items.length; k++) {
                                items[k]["businessName"] = kitchen.business;
                                items[k]["mode"] = kitchen.mode;
                                items[k]["email"] = kitchen.email;
                                items[k]["address"] = `${kitchen.address ? kitchen.address + ", " : ""}${kitchen.address_line_2 !== "" ? kitchen.address_line_2 + ", " : ""}${kitchen.Suburb ? kitchen.Suburb + ", " : ""} ${kitchen.state ? kitchen.state : ""}`;
                            }
                            allKitchensMenu.occasion.items = [
                                ...allKitchensMenu.occasion.items,
                                ...items,
                            ];
                        }
                        if (Object.keys(menu.daily).length) {
                            let items = menu.daily;
                            Object.keys(menu.daily).map((day) => {
                                items[day]["supplierID"] = menu.supplier;
                                items[day]["mode"] = kitchen.mode;
                                items[day]["email"] = kitchen.email;
                                items[day]["businessName"] = kitchen.business;
                                items[day]["address"] = `${kitchen.address ? kitchen.address + ", " : ""}${kitchen.address_line_2 !== "" ? kitchen.address_line_2 + ", " : ""}${kitchen.Suburb ? kitchen.Suburb + ", " : ""} ${kitchen.state ? kitchen.state : ""}`;
                            });
                            allKitchensMenu.daily = [...allKitchensMenu.daily, items];
                        }
                    }

                    dispatch({
                        type: types.GET_KITCHENS_SUCCESS,
                        kitchens,
                        menus,
                        allKitchensMenu,
                    });
                }
            } else {
                // fetchKitchens failed
                dispatch({ type: types.GET_KITCHENS_FAILED });
                sweetalert("error", "Something went wrong");
            }
        })
        .catch((error) => {
            // fetchKitchens failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
            dispatch({ type: types.GET_KITCHENS_FAILED });
        });
};

export const setMenuLocally = (kitchen) => (dispatch) => {
    // supplier id
    setStorage("sid", kitchen._id);
    // kitchen name
    setStorage("kname", kitchen.business);
    dispatch({ type: types.GET_MENU_SUCCESS, menu: kitchen.menu });
    dispatch({ type: types.GET_SELECTED_KITCHEN_SUCCESS, kitchen });
};

export const removeMenuLocally = () => (dispatch) => {
    dispatch({ type: types.REMOVE_SELECTED_KITCHEN_SUCCESS });
    dispatch({ type: types.GET_MENU_FAILED });
    removeStorage("sid");
    removeStorage("kname");
    // // kitchen name
};

export const getAKitchenWithMenu = (headers) => (dispatch) => {
    dispatch({ type: types.GET_MENU_START });
    // start type for spining on ui
    // headers = {
    //  userid : customer id,
    // Authorization: token
    // supplierid : suplier Id
    // }
    httpRequst
        .get("/universal/getAMenu", { headers })
        // send headers
        .then((response) => {
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    sweetalert("error", response.data.reason || response.data.message);
                    dispatch({ type: types.GET_MENU_FAILED });
                } else {
                    // getAKitchenWithMenu success
                    const kitchen = response.data;
                    if (!kitchen || !kitchen.menu) {
                        removeStorage("sid");
                    }
                    dispatch({ type: types.GET_SELECTED_KITCHEN_SUCCESS, kitchen });
                    dispatch({ type: types.GET_MENU_SUCCESS, menu: kitchen.menu });
                    // dispatch({type : types.GET_SELECTED_KITCHEN_SUCCESS})
                }
            } else {
                // getAKitchenWithMenu failed
                dispatch({ type: types.GET_MENU_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        })
        .catch((error) => {
            // getAKitchenWithMenu failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
            dispatch({ type: types.GET_MENU_FAILED });
        });
};

export const orderDispatchedDailyItem = (payload, headers, userEmail, orderId) => (dispatch) => {
    // lock screen
    screenLockEnable();
    // start type for spining on ui
    dispatch({ type: types.ORDER_DISPATCH_START });
    // headers = {
    //  userid : customer id,
    // Authorization: token
    // }
    const obj = {
        customerName: payload.customerName,
        kitchenName: payload.kitchenName,
        menuName: payload.menuType,
        menuDescription: "----",
        mode: payload.mode,
        dateTime: `${payload.pickupTime} ${payload.day}`,
        price: payload.price,
        address: payload.address,
    };
    httpRequst.post("/customer/orderdisptacheddailyitem", payload, { headers })
        // send headers
        .then((response) => {
            if (response.data) {
                if (response.data.code) {
                    screenLockDisable();
                    // if response have code its mean got an error
                    sweetalert("error", response.data.reason || response.data.message);
                    dispatch({ type: types.ORDER_DISPATCH_FAILED });
                } else {
                    // orderDispatchedDailyItem success
                    dispatch({ type: types.ORDER_DISPATCH_SUCCESS, idx: payload.idx });
                    sweetalert("success", response.data.message);
                    dispatch(getOrders(headers));
                    dispatch(sendCustomerOrderEmail({
                        ...obj,
                        kitchenEmail: payload.kitchenEmail,
                        email: payload.email,
                        orderId
                    }));
                    dispatch(sendKitchenOrderEmail({
                        ...obj, email: payload.kitchenEmail, customerEmail: userEmail,
                        orderId,
                    }));
                }
            } else {
                screenLockDisable();
                // orderDispatchedDailyItem failed
                dispatch({ type: types.ORDER_DISPATCH_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        })
        .catch((error) => {
            screenLockDisable();
            // orderDispatchedDailyItem failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
            dispatch({ type: types.ORDER_DISPATCH_FAILED });
        });
};

export const orderDispatchedItem = (payload, headers, userEmail, orderId) => (dispatch) => {
    //   screen lock
    screenLockEnable();
    // start type for spining on ui
    dispatch({ type: types.ORDER_DISPATCH_START });
    // headers = {
    //  userid : customer id,
    // Authorization: token
    // }

    const obj = {
        customerName: payload.customerName,
        kitchenName: payload.kitchenName,
        menuName: payload.menuType,
        menuDescription: payload.description,
        mode: payload.mode,
        dateTime: payload.pickupTime,
        price: payload.totalPrice,
        address: payload.address,
    };
    httpRequst.post("/customer/orderdisptacheditem", payload, { headers })
        // send headers
        .then((response) => {
            if (response.data) {
                if (response.data.code) {
                    screenLockDisable();
                    // if response have code its mean got an error
                    sweetalert("error", response.data.reason || response.data.message);
                    dispatch({ type: types.ORDER_DISPATCH_FAILED });
                } else {
                    // orderDispatchedItem success
                    dispatch({ type: types.ORDER_DISPATCH_SUCCESS, idx: payload.idx });
                    sweetalert("success", response.data.message);
                    dispatch(sendCustomerOrderEmail({
                        ...obj,
                        email: payload.email,
                        kitchenEmail: payload.kitchenEmail,
                        orderId,
                    }));
                    dispatch(sendKitchenOrderEmail({
                        ...obj,
                        email: payload.kitchenEmail,
                        customerEmail: userEmail,
                        orderId,
                    }));
                    dispatch(getOrders(headers));
                }
            } else {
                screenLockDisable();
                // orderDispatchedItem failed
                dispatch({ type: types.ORDER_DISPATCH_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        })
        .catch((error) => {
            screenLockDisable();
            // orderDispatchedItem failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
            dispatch({ type: types.ORDER_DISPATCH_FAILED });
        });
};

export const dispatchDealOrders = (payload, headers, idx, userEmail, orderId) => (dispatch) => {
    // screen lock
    screenLockEnable();
    // start type for spining on ui
    dispatch({ type: types.ORDER_DISPATCH_START });
    // headers = {
    //  userid : customer id,
    // Authorization: token
    // }
    const obj = {
        customerName: payload.customerName,
        kitchenName: payload.kitchenName,
        menuName: payload.menuType,
        menuDescription: payload.description,
        mode: payload.mode,
        dateTime: `${payload.pickupTime} ${payload.day}`,
        price: payload.price,
        address: payload.address,
    };
    httpRequst.post("/customer/orderdisptacheddeal", payload, { headers })
        // send headers
        .then((response) => {
            if (response.data) {
                if (response.data.code) {
                    screenLockDisable();
                    // if response have code its mean got an error
                    sweetalert("error", response.data.reason || response.data.message);
                    dispatch({ type: types.ORDER_DISPATCH_FAILED });
                } else {
                    // dispatchDealOrders success
                    dispatch({ type: types.DEAL_ORDER_DISPATCH_SUCCESS, idx });
                    dispatch(sendCustomerOrderEmail({ ...obj, email: payload.email, orderId, kitchenEmail: payload.kitchenEmail }));
                    dispatch(sendKitchenOrderEmail({ ...obj, email: payload.kitchenEmail, customerEmail: userEmail, orderId }));
                    sweetalert("success", response.data.message);
                    dispatch(getOrders(headers));
                }
            } else {
                screenLockDisable();
                // dispatchDealOrders failed
                dispatch({ type: types.ORDER_DISPATCH_FAILED });
                sweetalert("error", "Something went wrong");
            }
        })
        .catch((error) => {
            screenLockDisable();
            // dispatchDealOrders failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
            dispatch({ type: types.ORDER_DISPATCH_FAILED });
        });
};

export const sendCustomerOrderEmail = (payload) => (dispatch) => {
    const token = getStorage("token");
    httpRequst.post("/customer/sendorderplacementemail", payload, {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => {
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    sweetalert("error", response.data.reason || response.data.message);
                } else {
                    // sendOrderEmail success
                    sweetalert("success", response.data.message);
                }
            } else {
                // sendOrderEmail failed
                sweetalert("error", "Something went wrong");
            }
        })
        .catch((error) => {
            // sendOrderEmail failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
        });
};

export const sendKitchenOrderEmail = (payload) => (dispatch) => {
    const token = getStorage("token");
    httpRequst.post("/supplier/sendorderreceivingemail", payload, {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((response) => {
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    sweetalert("error", response.data.reason || response.data.message);
                } else {
                    // sendOrderEmail success
                    sweetalert("success", response.data.message);
                }
            } else {
                // sendOrderEmail failed
                sweetalert("error", "Something went wrong");
            }
        })
        .catch((error) => {
            // sendOrderEmail failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
        });
};

// export const removeUnConfirmItem = (idx) => (dispatch) => {
//     dispatch({ type: types.ORDER_DISPATCH_START });
//     dispatch({ type: types.ORDER_DISPATCH_SUCCESS, idx });
// }

export const getOrders = (headers) => (dispatch) => {
    // set dynamic api path
    console.log(headers);
    const getOrderAPI = headers.type === ("admin" || "sub_admin") ? "/admin/getorders" : "/universal/getorders";
    // lock screen
    const type = getStorage("type");
    if (type === "supplier") {
        // screenLockEnable()
    }
    // start type for spining on ui
    dispatch({ type: types.GET_ORDERS_START });
    // headers = {
    //  userid : customer id,
    // Authorization: token
    // type : customer/supplier
    // }
    httpRequst
        .get(getOrderAPI, { headers })
        // send headers
        .then((response) => {
            console.log(response);
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    sweetalert("error", response.data.reason || response.data.message);
                    dispatch({ type: types.GET_ORDERS_FAILED });
                } else {
                    // getOrders success
                    const orders = response.data;
                    const orderStatusDetails = setOrderStatusDetails(orders);
                    dispatch({
                        type: types.GET_ORDERS_SUCCESS,
                        orders,
                        orderStatusDetails,
                    });
                }
            } else {
                // getOrders failed
                dispatch({ type: types.GET_ORDERS_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        })
        .catch((error) => {
            screenLockDisable();
            // getOrders failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
            dispatch({ type: types.GET_ORDERS_FAILED });
        });
};

export const getSingleOrder = (payload) => (dispatch) => {
    dispatch({ type: types.GET_SINGLE_ORDER_DATA, payload });
};

export const setOrderStatus = (headers, value, kitchenEmail) => (dispatch) => {
    // lock screen
    screenLockEnable();
    // start type for spining on ui
    dispatch({ type: types.SET_ORDER_STATUS_START });
    // headers = {
    //  userid : customer id,
    // Authorization: token
    // menu id
    // }
    const obj = {
        customerId: value.customer,
        kitchenName: value.kitchen_name,
        kitchenEmail,
        orderId: value.order_id,
        orderStatus: headers.orderstatus,
        paymentStatus: value.payment_status
    };
    httpRequst.get('/supplier/ordercompleteorcancel', { headers })
        // send headers
        .then(response => {
            if (response.data) {
                if (response.data.code) {
                    screenLockDisable();
                    // if response have code its mean got an error
                    sweetalert('error', response.data.reason || response.data.message);
                    dispatch({ type: types.SET_ORDER_STATUS_FAILED });
                } else {
                    // setOrderStatus success
                    dispatch(getOrders(headers));
                    dispatch(sendCustomerOrderStatusEmailFromSupplier(obj));
                    dispatch({ type: types.SET_ORDER_STATUS_SUCCESS });
                    sweetalert('success', "Update Success");
                }
            } else {
                screenLockDisable();
                // setOrderStatus failed
                dispatch({ type: types.SET_ORDER_STATUS_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            screenLockDisable();
            // setOrderStatus failed
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
            dispatch({ type: types.SET_ORDER_STATUS_FAILED });
        });
};

export const getSelectedKitchen = () => (dispatch) => {
    let supplierId = getStorage("sid");
    dispatch({ type: types.GET_SELECTED_KITCHEN_START });
    dispatch({ type: types.GET_SELECTED_KITCHEN_SUCCESS, supplierId });
};

export const changeQuantityExistingOrderInList = (idx, operator) =>
    (dispatch) => {
        dispatch({ type: types.CHANGE_QUANTITY_EXISTING_ORDER, idx, operator });
    };

export const setOrdersInLocalStorage = () => (dispatch) => {
    let orders = getStorage("draftOrders");
    dispatch({
        type: types.ORDER_DISPATCH_LOCAL_STORAGE,
        payload: orders ? JSON.parse(orders) : [],
    });
};

// export const setDealRating = (headers) => (dispatch) => {
//     // screen lock
//     screenLockEnable();

//     dispatch({ type: types.SET_KITCHEN_RATINGS_START });
//     // headers = {
//     //  customerid : customer id,
//     //  Authorization: token,
//     //  supplierid : supplier Idx
//     //  rating : (1 to 5)
//     //  dealid
//     // }
//     httpRequst.post('/customer/dealrating', {}, { headers })
//         // send headers
//         .then(response => {
//             if (response.data) {
//                 screenLockDisable();
//                 if (response.data.code) {
//                     // if response have code its mean got an error
//                     sweetalert('error', response.data.reason || response.data.message);
//                     dispatch({ type: types.SET_KITCHEN_RATINGS_FAILED });
//                 } else {
//                     // setting kitchen rating success
//                     dispatch({ type: types.SET_KITCHEN_RATINGS_SUCCESS });
//                     sweetalert("success", response.data.message)
//                 }
//             } else {
//                 screenLockDisable();
//                 // setting kitchen rating failed
//                 dispatch({ type: types.SET_KITCHEN_RATINGS_FAILED });
//                 sweetalert('error', 'Something went wrong');
//             }
//         }).catch(error => {
//             screenLockDisable();
//             // setting kitchen rating failed
//             sweetalert('error', error.message ? error.message : 'Prosess Failed');
//             dispatch({ type: types.SET_KITCHEN_RATINGS_FAILED });
//         });
// }

export const setItemRating = (headers) => (dispatch) => {
    // screen lock
    screenLockEnable();

    dispatch({ type: types.SET_KITCHEN_RATINGS_START });
    // headers = {
    //  customerid : customer id,
    //  Authorization: token,
    //  supplierid : supplier Id
    //  rating : (1 to 5)
    //  itemid || dealid
    // }
    let api = "";
    if (headers.itemid) {
        api = "/customer/itemrating";
    } else if (headers.dealid) {
        api = "/customer/dealrating";
    } else if (headers.day) {
        api = "/customer/dailymenurating";
    }
    httpRequst
        .post(api, {}, { headers })
        // send headers
        .then((response) => {
            if (response.data) {
                screenLockDisable();
                if (response.data.code) {
                    // if response have code its mean got an error
                    sweetalert("error", response.data.reason || response.data.message);
                    dispatch({ type: types.SET_KITCHEN_RATINGS_FAILED });
                } else {
                    // setting kitchen rating success
                    dispatch({ type: types.SET_KITCHEN_RATINGS_SUCCESS });
                    sweetalert("success", response.data.message);
                }
            } else {
                screenLockDisable();
                // setting kitchen rating failed
                dispatch({ type: types.SET_KITCHEN_RATINGS_FAILED });
                sweetalert("error", "Something went wrong");
            }
        })
        .catch((error) => {
            screenLockDisable();
            // setting kitchen rating failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
            dispatch({ type: types.SET_KITCHEN_RATINGS_FAILED });
        });
};

export const getAllMenus = (payload) => (dispatch) => {
    dispatch({ type: types.GET_ALL_KITCHENS_MENU_START });
    dispatch({
        type: types.GET_ALL_KITCHENS_MENU_SUCCESS,
        searchBase: payload.searchBase,
    });
};

export const searchKitchen = (payload) => (dispatch) => {
    // payload = {
    //     "currentLocation" : {
    //         "long" : 67.073702,
    //         "lat" : 24.832924
    //     },
    //     "locationRange" : 0.5
    // }
    //   screen lock
    screenLockEnable();
    // start type for spining on ui
    dispatch({ type: types.SEARCH_KITCHEN_START });
    httpRequst.post('/universal/searchmenu', payload)
        // send headers
        .then(response => {
            screenLockDisable();
            console.log(response);
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    sweetalert('error', response.data.reason || response.data.message);
                    dispatch({ type: types.SEARCH_KITCHEN_FAILED });
                } else {
                    // searchKitchen success
                    dispatch(removeMenuLocally());
                    history.push('/');
                    const kitchens = response.data;
                    console.log(kitchens);
                    const menus = [];
                    const allKitchensMenu = {
                        daily: [],
                        weekly: {
                            deals: []
                        },
                        frozen: {
                            items: []
                        },
                        occasion: {
                            items: []
                        },
                        cake: {
                            items: []
                        }
                    };
                    for (let i = 0; i < kitchens.length; i++) {
                        const kitchen = kitchens[i];
                        menus.push(kitchen.menu);
                    }

                    for (let j = 0; j < menus.length; j++) {
                        const menu = menus[j];
                        const kitchen = kitchens[j];
                        if (menu.cake.items) {
                            let items = menu.cake.items;
                            for (let k = 0; k < menu.cake.items.length; k++) {
                                items[k]["businessName"] = kitchen.business;
                            }
                            allKitchensMenu.cake.items = [...allKitchensMenu.cake.items, ...items];

                        }
                        if (menu.frozen.items) {
                            let items = menu.frozen.items;
                            for (let k = 0; k < menu.frozen.items.length; k++) {
                                items[k]["businessName"] = kitchen.business;
                            }
                            allKitchensMenu.frozen.items = [...allKitchensMenu.frozen.items, ...items];
                        }
                        if (menu.weekly.deals) {
                            let deals = menu.weekly.deals;
                            for (let k = 0; k < menu.weekly.deals.length; k++) {
                                deals[k]["businessName"] = kitchen.business;
                                deals[k]["supplier"] = kitchen._id;
                            }
                            allKitchensMenu.weekly.deals = [...allKitchensMenu.weekly.deals, ...deals];
                        }
                        if (menu.occasion.items) {
                            let items = menu.occasion.items;
                            for (let k = 0; k < menu.occasion.items.length; k++) {
                                items[k]["businessName"] = kitchen.business;
                            }
                            allKitchensMenu.occasion.items = [...allKitchensMenu.occasion.items, ...items];
                        }
                        if (Object.keys(menu.daily).length) {
                            let items = menu.daily;
                            items['supplierID'] = menu.supplier;
                            items["businessName"] = kitchen.business;
                            allKitchensMenu.daily = [...allKitchensMenu.daily, items];
                        }
                    }
                    dispatch({ type: types.SEARCH_KITCHEN_SUCCESS, kitchens, menus, allKitchensMenu });
                    if (!kitchens.length) sweetalert("info", "Not Found");
                    dispatch({ type: types.SEARCH_KITCHEN_SUCCESS, kitchens, menus, allKitchensMenu, });
                    sweetalert("success", "Search API is in Progress");
                }
            } else {
                // searchKitchen failed
                dispatch({ type: types.SEARCH_KITCHEN_FAILED });
                sweetalert('error', 'Something went wrong');
            }
        })
        .catch((error) => {
            screenLockDisable();
            // searchKitchen failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
            dispatch({ type: types.SEARCH_KITCHEN_FAILED });
        });
};

export const clearSearchResults = (clearState) => (dispatch) => {
    dispatch({ type: types.CLEAR_SEARCH_KITCHEN_SUCCESS });
    sweetalert("success", "Search Results Clear");
    clearState();
    history.push("/");
};

export const getInprogressOrder = (payload) => (dispatch) => {
    dispatch({ type: types.GET_IN_PROGRESS_ORDER, payload });
};
export const getCompletedOrder = (payload) => (dispatch) => {
    dispatch({ type: types.GET_COMPLETE_ORDER, payload, });
};
export const getCanceledOrder = (payload) => (dispatch) => {
    dispatch({ type: types.GET_CANCELED_ORDER, payload, });
};


export const sendCustomerOrderStatusEmailFromSupplier = (payload) => (dispatch) => {
    // start type for spining on ui
    const token = getStorage("token");
    const headers = {
        Authorization: `Bearer ${token}`
    };
    console.log(payload);
    let api = "";
    if (payload.orderStatus === "completed") {
        api = "/customer/sendordercompletionemail";
    } else if (payload.orderStatus === "canceled") {
        api = "/customer/sendordercancellationemail";
    }
    httpRequst.post(api, payload, { headers })
        .then((response) => {
            console.log(response);
            if (response.data) {
                if (response.data.code) {
                    sweetalert("error", response.data.reason || response.data.message);
                } else {
                    // sendCustomerOrderStatusEmailFromSupplier success
                    sweetalert("success", response.data.message);
                }
            } else {
                // sendCustomerOrderStatusEmailFromSupplier failed
                sweetalert("error", "Something went wrong");
            }
        })
        .catch((error) => {
            // sendCustomerOrderStatusEmailFromSupplier failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
        });
};


export const dispatchOrdersLocal = (payload, amount) => (dispatch) => {
    dispatch({ type: types.ORDER_DISPATCH_LOCAL, payload, amount });
};

export const deleteOrderLocal = (idx) => (dispatch) => {
    dispatch({ type: types.DELETE_ORDER_LOCAL, idx });
};