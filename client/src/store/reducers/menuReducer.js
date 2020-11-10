import { removeMenuItem } from '../../shared';
import { types } from '../types';

const defultMenu = {
    daily: {},
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
    },
}

let initialState = {
    isMenuItemFetching: false,
    isMenuItemCreating: false,
    isSetDailyMenuItem: false,
    isSetDailyMenuDeal: false,
    isSetWeeklyMenuDeal: false,
    isMenuFetching: false,
    isMenuItemActivation: false,
    isMenuItemUpdate: false,
    isRemoveItem: false,
    isRemoveDeal: false,
    isUpdateDeal: false,
    isImageUploading: false,
    isUpdateDailyItems: false,
    imageID: '',
    searchBase: '',
    // isMenuModalOff: false,
    menu: defultMenu,
    items: [],
    isImageUpdating: false
}

function menuReducer(menu = initialState, action) {
    switch (action.type) {
        // for create menu items
        case types.SET_MENU_ITEMS_START:
            return { ...menu, isMenuItemCreating: true };
        case types.SET_MENU_ITEMS_SUCCESS:
            // there we are managing item by category, for showing real time  
            const items = menu.items;
            items.unshift(action.item);
            if (action.item.category === "frozen") {
                menu.menu.frozen.items.unshift(action.item);
            } else if (action.item.category === "occasion") {
                menu.menu.occasion.items.unshift(action.item);
            } else if (action.item.category === "cake") {
                menu.menu.cake.items.unshift(action.item);
            }
            return { ...menu, isMenuItemCreating: false, items: items, menu: menu.menu };
        case types.SET_MENU_ITEMS_FAILED:
            return { ...menu, isMenuItemCreating: false };

        // for get menu items
        case types.GET_MENU_ITEMS_START:
            return { ...menu, isMenuItemFetching: true };
        case types.GET_MENU_ITEMS_SUCCESS:
            return { ...menu, isMenuItemFetching: false, items: action.items };
        case types.GET_MENU_ITEMS_FAILED:
            return { ...menu, isMenuItemFetching: false };

        // for set daily menu items
        case types.SET_DAILY_MENU_ITEMS_START:
            return { ...menu, isSetDailyMenuItem: true };
        case types.SET_DAILY_MENU_ITEMS_SUCCESS:
            return { ...menu, isSetDailyMenuItem: false };
        case types.SET_DAILY_MENU_ITEMS_FAILED:
            return { ...menu, isSetDailyMenuItem: false };

        case types.UPDATE_DAILY_MENU_ITEMS_START:
            return { ...menu, isUpdateDailyItems: true };
        case types.UPDATE_DAILY_MENU_ITEMS_SUCCESS:
            return { ...menu, isUpdateDailyItems: false };
        case types.UPDATE_DAILY_MENU_ITEMS_FAILED:
            return { ...menu, isUpdateDailyItems: false };

        // for set daily menu deals
        case types.SET_DAILY_MENU_DEALS_START:
            return { ...menu, isSetDailyMenuDeal: true };
        case types.SET_DAILY_MENU_DEALS_SUCCESS:
            return { ...menu, isSetDailyMenuDeal: false };
        case types.SET_DAILY_MENU_DEALS_FAILED:
            return { ...menu, isSetDailyMenuDeal: false };

        // for set weekly menu deals
        case types.SET_WEEKLY_MENU_DEALS_START:
            return { ...menu, isSetWeeklyMenuDeal: true };
        case types.SET_WEEKLY_MENU_DEALS_SUCCESS:
            return { ...menu, isSetWeeklyMenuDeal: false };
        case types.SET_WEEKLY_MENU_DEALS_FAILED:
            return { ...menu, isSetWeeklyMenuDeal: false };

        // for get menu
        case types.GET_MENU_START:
            return { ...menu, isMenuFetching: true };
        case types.GET_MENU_SUCCESS:
            return { ...menu, isMenuFetching: false, menu: action.menu || defultMenu };
        case types.GET_MENU_FAILED:
            return { ...menu, isMenuFetching: false, menu: defultMenu };

        // for activation menu items
        case types.SET_ACTIVATION_MENU_ITEM_START:
            return { ...menu, isMenuItemActivation: true };
        case types.SET_ACTIVATION_MENU_ITEM_SUCCESS:
            const index = menu.items.findIndex((obj => obj._id === action.item._id));
            return { ...menu, isMenuItemActivation: false, ...menu.items.splice(index, 1, action.item), };
        case types.SET_ACTIVATION_MENU_ITEM_FAILED:
            return { ...menu, isMenuItemActivation: false };

        // for updateMenuItem
        case types.UPDATE_MENU_ITEM_START:
            return { ...menu, isMenuItemUpdate: true };
        case types.UPDATE_MENU_ITEM_SUCCESS:
            // update item in menu items by idx
            menu.items.find((obj, i) => {
                if (obj._id === action.item._id) {
                    menu.items[i] = action.item;
                    return true; // stop searching
                }
                return false
            });
            //here I am updating frozrn or occasion or cake in menu items by idx
            if (action.item.category === "frozen") {
                menu.menu.frozen.items.find((obj, i) => {
                    if (obj._id === action.item._id) {
                        menu.menu.frozen.items[i] = action.item;
                        return true; // stop searching
                    }
                    return false;
                });
            } else if (action.item.category === "occasion") {
                menu.menu.occasion.items.find((obj, i) => {
                    if (obj._id === action.item._id) {
                        menu.menu.occasion.items[i] = action.item;
                        return true; // stop searching
                    }
                    return false;
                });
            } else if (action.item.category === "cake") {
                menu.menu.cake.items.find((obj, i) => {
                    if (obj._id === action.item._id) {
                        menu.menu.cake.items[i] = action.item;
                        return true; // stop searching
                    }
                    return false;
                });
            }
            return { ...menu, isMenuItemUpdate: false, menu: menu.menu, items: menu.items };
        // return { ...menu, isMenuItemUpdate: false, ...menu.items.splice(idx, 1, action.item) };
        case types.UPDATE_MENU_ITEM_FAILED:
            return { ...menu, isMenuItemUpdate: false };

        // for removeMenuItem
        case types.REMOVE_MENU_ITEM_START:
            return { ...menu, isRemoveItem: true };
        case types.REMOVE_MENU_ITEM_SUCCESS:
            // remove item in menu items by itemid
            // here I am updating frozrn or occasion or cake in menu items by itemid
            let updatedMenu = removeMenuItem(menu, action.itemid);
            return { ...menu, isRemoveItem: false, menu: updatedMenu.menu, items: updatedMenu.items };

        case types.REMOVE_MENU_ITEM_FAILED:
            return { ...menu, isRemoveItem: false };

        // for removeDailyMenu
        case types.REMOVE_DAILY_MENU_START:
            return { ...menu, isRemoveDailyMenu: true };
        case types.REMOVE_DAILY_MENU_SUCCESS:
            return { ...menu, isRemoveDailyMenu: false };
        case types.REMOVE_DAILY_MENU_FAILED:
            return { ...menu, isRemoveDailyMenu: false };

        // for removeDeal
        case types.REMOVE_MENU_DEAL_START:
            return { ...menu, isRemoveDeal: true };
        case types.REMOVE_MENU_DEAL_SUCCESS:
            return { ...menu, isRemoveDeal: false };
        case types.REMOVE_MENU_DEAL_FAILED:
            return { ...menu, isRemoveDeal: false };

        // for updateDeal
        case types.UPDATE_MENU_DEAL_START:
            return { ...menu, isUpdateDeal: true };
        case types.UPDATE_MENU_DEAL_SUCCESS:
            return { ...menu, isUpdateDeal: false };
        case types.UPDATE_MENU_DEAL_FAILED:
            return { ...menu, isUpdateDeal: false };

        // for uploading image in drive
        case types.UPLOAD_IMAGE_IN_DRIVE_START:
            return { ...menu, isImageUploading: true }
        case types.UPLOAD_IMAGE_IN_DRIVE_SUCCESS:
            return { ...menu, isImageUploading: false, imageID: action.id }
        case types.UPLOAD_IMAGE_IN_DRIVE_FAILED:
            return { ...menu, isImageUploading: false }

        

        case types.UPDATE_IMAGE_IN_DRIVE_START:
            return { ...menu, isImageUpdating: true }
        case types.UPDATE_IMAGE_IN_DRIVE_SUCCESS:
            return { ...menu, isImageUpdating: false }
        case types.UPDATE_IMAGE_IN_DRIVE_FAILED:
            return { ...menu, isImageUpdating: false }

        // // for menu
        // case types.SET_MENU_START:
        //     return { ...menu, isMenuProcessing: true };
        // case types.SET_MENU_SUCCESS:
        //     return { ...menu, isMenuProcessing: false, isMenuModalOff: true, menu: action.menu };
        // case types.SET_MENU_FAILED:
        //     return { ...menu, isMenuProcessing: false };

        // // only for modal
        // case types.SET_MENU_MODAL_OFF:
        //     return { ...menu, isMenuModalOff: false };
        default:
            return menu;
    }
}

export default menuReducer;