import { types } from '../types';
import { getStorage, setStorage, sweetalert } from '../../shared';

let initialState = {
    isKitchenRequestHasBeenFetched: false,
    isKitchensFetching: false,
    isOrderDispatching: false,
    isSearchKitchen: false,
    kitchens: [], // kitchens actual are suppliers
    menus: [],  //all  kitchens menus
    allKitchensMenu: {
        daily: {
            monday: {
                deals: []
            },
            tuesday: {
                deals: []
            },
            wednesday: {
                deals: []
            },
            thursday: {
                deals: []
            },
            friday: {
                deals: []
            },
            saturday: {
                deals: []
            },
            sunday: {
                deals: []
            }
        },
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
    },
    defaultAllKitchenMenu: {},
    defaultKitchens: [],
    defaultMenus: [],
    orders: [],
    isOrderFetching: false,
    singleOrder: {},
    isStatusUpdating: false,
    draftOrders: [],
    orderStatusDetails: {},
    selectedKitchen: {},
    isRating: false,
    searchBase: 'kitchen',
    isSearchResultClear: true,
    inProgressOrder: [],
    completeOrder: [],
    canceledOrder: [],
    inProgressOrderforAdmin: [],
    completeOrderforAdmin: [],
    canceledOrderForAdmin: [],
    kName: "",
    kId: ""
};

function kitchenReducer(kitchen = initialState, action) {
    switch (action.type) {
        // for fetch kitchen
        case types.GET_KITCHENS_START:
            return { ...kitchen, isKitchensFetching: true };
        case types.GET_KITCHENS_SUCCESS:
            return { ...kitchen, isKitchensFetching: false, isKitchenRequestHasBeenFetched: true, kitchens: action.kitchens, menus: action.menus, allKitchensMenu: action.allKitchensMenu, defaultKitchens: action.kitchens, defaultMenus: action.menus, defaultAllKitchenMenu: action.allKitchensMenu };
        case types.GET_KITCHENS_FAILED:
            return { ...kitchen, isKitchensFetching: false, isKitchenRequestHasBeenFetched: true };

        // for dispatche order item
        case types.ORDER_DISPATCH_START:
            return { ...kitchen, isOrderDispatching: true };
        case types.ORDER_DISPATCH_SUCCESS:
            let currentOrder = JSON.parse(getStorage("draftOrders"));
            currentOrder.splice(action.idx, 1);
            setStorage("draftOrders", JSON.stringify(currentOrder));
            return { ...kitchen, isOrderDispatching: false, draftOrders: [].concat(currentOrder) };
        case types.ORDER_DISPATCH_FAILED:
            return { ...kitchen, isOrderDispatching: false };

        // for dispatching deal order
        case types.DEAL_ORDER_DISPATCH_START:
            return { ...kitchen, isOrderDispatching: true };
        case types.DEAL_ORDER_DISPATCH_SUCCESS:
            let currentDealOrder = JSON.parse(getStorage("draftOrders"));
            currentDealOrder.splice(action.idx, 1);
            setStorage("draftOrders", JSON.stringify(currentDealOrder));
            return { ...kitchen, isOrderDispatching: false, draftOrders: [].concat(currentDealOrder) };
        case types.DEAL_ORDER_DISPATCH_FAILED:
            return { ...kitchen, isOrderDispatching: false };

        // for getting orders list from db
        case types.GET_ORDERS_START:
            return { ...kitchen, isOrderFetching: true };
        case types.GET_ORDERS_SUCCESS:
            return { ...kitchen, isOrderFetching: false, orders: action.orders, orderStatusDetails: action.orderStatusDetails };
        case types.GET_SUPPLIER_FAILED:
            return { ...kitchen, isOrderFetching: false };

        // get single order data
        case types.GET_SINGLE_ORDER_DATA:
            return { ...kitchen, singleOrder: action.payload };

        // for setting order status 
        case types.SET_ORDER_STATUS_START:
            return { ...kitchen, isStatusUpdating: true };
        case types.SET_ORDER_STATUS_SUCCESS:
            return { ...kitchen, isStatusUpdating: false };
        case types.SET_ORDER_STATUS_FAILED:
            return { ...kitchen, isStatusUpdating: false };

        // for dispatching draftOrders
        case types.ORDER_DISPATCH_LOCAL:
            const itemIdx = kitchen.draftOrders.findIndex((obj => {
                return (JSON.stringify(obj.itemids) === JSON.stringify(action.payload.itemids));
            }));
            const dealidx = kitchen.draftOrders.findIndex((obj => { return obj.dealid === action.payload.dealid; }));
            let unconfirmedOrder = kitchen.draftOrders;
            if (action.payload.dealid) {
                if (dealidx === -1) {
                    action.payload.count = 1;
                    unconfirmedOrder = [action.payload, ...unconfirmedOrder];
                    sweetalert('success', 'Added to Order List');
                } else {
                    if ((unconfirmedOrder[dealidx].count) < unconfirmedOrder[dealidx].serving) {
                        unconfirmedOrder[dealidx].count += 1;
                        unconfirmedOrder[dealidx].price += action.amount;
                        sweetalert('success', 'Added to Order List');
                    } else {
                        sweetalert('error', `You can't do order more than ${unconfirmedOrder[dealidx].serving}`);
                    }
                }
            } else {
                if (itemIdx !== -1) {
                    if ((unconfirmedOrder[itemIdx].count) < unconfirmedOrder[itemIdx].serving) {
                        unconfirmedOrder[itemIdx].count += 1;
                        unconfirmedOrder[itemIdx].price += action.amount;
                        sweetalert('success', 'Added to Order List');
                    } else if (unconfirmedOrder[itemIdx].menuType !== "daily" && unconfirmedOrder[itemIdx].menuType !== "weekly") {
                        unconfirmedOrder[itemIdx].count += 1;
                        unconfirmedOrder[itemIdx].price += action.amount;
                        sweetalert('success', 'Added to Order List');
                    } else {
                        sweetalert('error', `You can't do order more than ${unconfirmedOrder[itemIdx].serving}`);
                    }
                } else {
                    action.payload.count = 1;
                    unconfirmedOrder = [action.payload, ...unconfirmedOrder];
                    sweetalert('success', 'Added to Order List');
                }
            }
            setStorage("draftOrders", JSON.stringify(unconfirmedOrder));
            // let drafts = getStorage("draftOrder s")
            return { ...kitchen, draftOrders: unconfirmedOrder };

        case types.GET_SELECTED_KITCHEN_SUCCESS:
            return { ...kitchen, selectedKitchen: action.kitchen || {}, kName: action.kitchen.business, kId: action.kitchen._id };

        case types.DELETE_ORDER_LOCAL:
            let localDraft = JSON.parse(getStorage("draftOrders"));
            localDraft.splice(action.idx, 1);
            setStorage("draftOrders", JSON.stringify(localDraft));
            return { ...kitchen, draftOrders: localDraft };

        case types.CHANGE_QUANTITY_EXISTING_ORDER:
            const data2 = JSON.parse(getStorage("draftOrders"));
            if (action.operator === "+") {
                data2[action.idx].count += 1;
            } else if (action.operator === "-" && data2[action.idx].count !== 1) {
                data2[action.idx].count -= 1;
            }
            data2[action.idx].totalPrice = data2[action.idx].price * data2[action.idx].count;
            setStorage("draftOrders", JSON.stringify(data2));
            return { ...kitchen, draftOrders: [].concat(data2) };

        case types.ORDER_DISPATCH_LOCAL_STORAGE:
            return { ...kitchen, draftOrders: action.payload };

        case types.SET_KITCHEN_RATINGS_START:
            return { ...kitchen, isRating: true };
        case types.SET_KITCHEN_RATINGS_SUCCESS:
            return { ...kitchen, isRating: false };
        case types.SET_KITCHEN_RATINGS_FAILED:
            return { ...kitchen, isRating: false };

        case types.GET_ALL_KITCHENS_MENU_START:
            return { ...kitchen, isMenuFetching: true };
        case types.GET_ALL_KITCHENS_MENU_SUCCESS:
            return { ...kitchen, isMenuFetching: false, searchBase: action.searchBase };
        case types.GET_ALL_KITCHENS_MENU_FAILED:
            return { ...kitchen, isMenuFetching: false };

        case types.SEARCH_KITCHEN_START:
            return { ...kitchen, isSearchKitchen: true };
        case types.SEARCH_KITCHEN_SUCCESS:
            return { ...kitchen, isSearchKitchen: false, isSearchResultClear: false, kitchens: action.kitchens, menus: action.menus, allKitchensMenu: action.allKitchensMenu, };
        case types.SEARCH_KITCHEN_FAILED:
            return { ...kitchen, isSearchKitchen: false };

        case types.CLEAR_SEARCH_KITCHEN_SUCCESS:
            return { ...kitchen, isSearchResultClear: true, kitchens: kitchen.defaultKitchens, meuns: kitchen.defaultMenus, allKitchensMenu: kitchen.defaultAllKitchenMenu };

        case types.GET_IN_PROGRESS_ORDER:
            return { ...kitchen, inProgressOrder: action.payload };
        case types.GET_COMPLETE_ORDER:
            return { ...kitchen, completeOrder: action.payload };
        case types.GET_CANCELED_ORDER:
            return { ...kitchen, canceledOrder: action.payload };

        case types.GET_IN_PROGRESS_ORDER_FOR_ADMIN:
            return { ...kitchen, inProgressOrderforAdmin: action.orders };
        case types.GET_COMPLETE_ORDER_FOR_ADMIN:
            return { ...kitchen, completeOrderforAdmin: action.orders };
        case types.GET_CANCELED_ORDER_FOR_ADMIN:
            return { ...kitchen, canceledOrderForAdmin: action.orders };

        case types.REMOVE_SELECTED_KITCHEN_SUCCESS:
            return { ...kitchen, kName: "", kId: "" };


        default:
            return kitchen;
    }
}

export default kitchenReducer;