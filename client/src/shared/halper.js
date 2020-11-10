import history from "../history";

export const setOrderStatusDetails = (orders) => {
    const obj = {
        earningRecieved: 0,
        earningPending: 0,
        earningTotal: 0,
        orderInProgress: 0,
        orderRecieved: orders.length,
        orderPicked: 0,
    };
    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        // obj.earningTotal += order.price;
        if (order.order_status === "In Progress") {
            obj.earningPending += order.price;
            obj.orderInProgress += 1;
        } else if (order.order_status === "Completed") {
            obj.earningRecieved += order.price;
            obj.orderPicked += 1;
        }

        if (order.order_status === "In Progress" || order.order_status === "Completed") {
            obj.earningTotal += order.price;
        }
    }
    return obj;
};

export const screenLockEnableOfflineMood = () => {
    // lock screen only for offline
    const lockScreen = document.getElementById("lock-screen-on-offline");
    lockScreen.style.display = "block";
};

export const screenLockDisableOfflineMood = () => {
    // unlock screen only for offline
    const lockScreen = document.getElementById("lock-screen-on-offline");
    lockScreen.style.display = "none";
};

export const screenLockEnable = () => {
    // lock screen
    const lockScreen = document.getElementById("lock-screen");
    lockScreen.style.display = "block";
};

export const screenLockDisable = () => {
    // unlock screen
    const lockScreen = document.getElementById("lock-screen");
    lockScreen.style.display = "none";
};

export const removeMenuItem = (menu, itemid) => {
    let category = "";
    for (let i = 0; i < menu.items.length; i++) {
        const item = menu.items[i];
        if (item._id === itemid) {
            category = item.category;
            menu.items.splice(i, 1);
            break;
        }
    }
    for (let i = 0; i < menu.menu[category].items.length; i++) {
        const item = menu.menu[category].items[i];
        if (item._id === itemid) {
            menu.menu[category].items.splice(i, 1);
            break;
        }
    }

    return menu;
};

export const generateOrderId = () => {
    return 'KK-xxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r && 0x3 || 0x8);
        return v.toString(16);
    });
};

export const isPageNotFound = () => {
    const pathName = history.location.pathname;
    if (pathName === "/" || pathName === "/weekly" || pathName === "/profile" ||
        pathName === "/customerdetail" || pathName === "/supplierdetail" || pathName === "/subadmindetail"
        || pathName === "/items" || pathName === "/daily" || pathName === "/weekly"
        || pathName === "/frozen" || pathName === "/ocassions" || pathName === "/cakes"
        || pathName === "/supplierHome" || pathName === "/orders" || pathName === "/adminsList"
        || pathName === "/orders/details" || pathName === "/admin" || pathName === "/kitchensList"
        || pathName === "/ordersList") {
        return false;
    } else {
        return true;
    }
};