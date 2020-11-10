import { httpRequst } from '../../config';
import { types } from '../types';
import { sweetalert, screenLockEnable, screenLockDisable } from '../../shared';
import { updateUser } from './index';

export const getMenu = (headers) => (dispatch) => {
    dispatch({ type: types.GET_MENU_START });
    // start type for spining on ui
    // headers = {
    //  userid : supplier id,
    // Authorization: token
    // }
    httpRequst.get('/supplier/menu', { headers })
        // send headers
        .then(response => {
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    sweetalert('error', response.data.reason || response.data.message);
                    dispatch({ type: types.GET_MENU_FAILED });
                } else {
                    // getMenu success
                    const menu = response.data;
                    dispatch({ type: types.GET_MENU_SUCCESS, menu: menu || [] });
                }
            } else {
                // getMenu failed
                dispatch({ type: types.GET_MENU_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // getMenu failed
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
            dispatch({ type: types.GET_MENU_FAILED });
        });
};

export const getMenuAgain = (headers) => (dispatch) => {
    // headers = {
    //     userid : supplier id,
    // Authorization: token
    // }
    httpRequst.get('/supplier/menu', { headers })
        // send headers
        .then(response => {
            if (response.data) {
                if (response.data.code) {
                    dispatch({ type: types.GET_MENU_FAILED });
                } else {
                    const menu = response.data;
                    dispatch({ type: types.GET_MENU_SUCCESS, menu });
                }
            } else {
                dispatch({ type: types.GET_MENU_FAILED });
            }
        }).catch(error => {
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
            dispatch({ type: types.GET_MENU_FAILED });
        });
};

export const getMenuItems = (headers) => (dispatch) => {
    dispatch({ type: types.GET_MENU_ITEMS_START });
    // start type for spining on ui
    // headers = {
    //     userid : supplier id,
    // Authorization: token
    // }
    httpRequst.get('/supplier/getAllItems', { headers })
        // send headers
        .then(response => {
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    sweetalert('error', response.data.reason || response.data.message);
                    dispatch({ type: types.GET_MENU_ITEMS_FAILED });
                } else {
                    // getMenuItems success
                    const items = response.data;
                    dispatch({ type: types.GET_MENU_ITEMS_SUCCESS, items });
                    // sweetalert('success', "Prosessing Completed");
                }
            } else {
                // getMenuItems failed
                dispatch({ type: types.GET_MENU_ITEMS_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // getMenuItems failed
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
            dispatch({ type: types.GET_MENU_ITEMS_FAILED });
        });
};

export const createMenuItem = (headers, payload, cleraState) => (dispatch) => {
    // close modal
    const model = document.getElementsByClassName("createItemCloseModal");
    model[0].setAttribute("data-dismiss", "modal");
    model[0].click();
    model[0].removeAttribute("data-dismiss");
    // lock screen
    screenLockEnable();
    console.log(payload);
    // start type for spining on ui
    dispatch({ type: types.SET_MENU_ITEMS_START });
    // headers = {
    //     userid : supplier id,
    // Authorization: token
    // }
    httpRequst.post('/supplier/addItem', payload, { headers })
        // send headers
        .then(response => {
            // unlock screen
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    dispatch({ type: types.SET_MENU_ITEMS_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    // createMenuItem success
                    const item = response.data;
                    dispatch({ type: types.SET_MENU_ITEMS_SUCCESS, item });
                    if (payload.category === "daily / weekly") {
                        sweetalert('success', "Item has been added successfully, please select the item in Daily or Weekly menu", 3);
                    } else if (payload.category === "frozen") {
                        sweetalert('success', "Frozen Menu has been published to customers", 3);
                    } else if (payload.category === "cake") {
                        sweetalert('success', "Cake Menu has been published to customers", 3);
                    } else if (payload.category === "occasion") {
                        sweetalert('success', "Occasion Menu has been published to customers", 3);
                    }
                    // for inputs filed clear after submit
                    if (payload.category === "frozen" || payload.category === "cake") {
                        const inputsId = ['title', 'image', 'tags_keywords', 'price', 'description', 'category', 'weight'];
                        for (let i = 0; i < inputsId.length; i++) {
                            const currentId = inputsId[i];
                            const currentInput = document.getElementById(currentId);
                            currentInput.value = '';
                        }
                    } else if (payload.category === 'occasion') {
                        const inputsId = ['title', 'image', 'tags_keywords', 'price', 'description', 'category', 'servings'];
                        for (let i = 0; i < inputsId.length; i++) {
                            const currentId = inputsId[i];
                            const currentInput = document.getElementById(currentId);
                            currentInput.value = '';
                        }
                    } else {
                        const inputsId = ['title', 'image', 'tags_keywords', 'price', 'description', 'category',];
                        for (let i = 0; i < inputsId.length; i++) {
                            const currentId = inputsId[i];
                            const currentInput = document.getElementById(currentId);
                            currentInput.value = '';
                        }
                    }
                    if (cleraState) {
                        cleraState();
                    }
                }
            } else {
                // createMenuItem failed 
                dispatch({ type: types.SET_MENU_ITEMS_FAILED });
                sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // unlock screen
            screenLockDisable();
            //createMenuItem failed
            dispatch({ type: types.SET_MENU_ITEMS_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const setDailyItems = (headers, payload, itemsformClearAfterSubmit) => (dispatch) => {
    // close modal

    // lock screen
    screenLockEnable();
    // for inputs filed clear after submit
    // start type for spining on ui
    dispatch({ type: types.SET_DAILY_MENU_ITEMS_START });
    // headers = {
    //     userid : supplier id,
    // Authorization: token
    // }
    httpRequst.post('/supplier/dailymenuitems', payload, { headers })
        // send headers
        .then(response => {
            // unlock screen
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    dispatch({ type: types.SET_DAILY_MENU_ITEMS_FAILED });
                    sweetalert('error', response.data.reason || response.data.message, 3);
                } else {
                    // setDailyItems success
                    dispatch(getMenuAgain({ Authorization: headers.Authorization, userid: headers.userid }));
                    dispatch({ type: types.SET_DAILY_MENU_ITEMS_SUCCESS });
                    // sweetalert('success', response.data.message);
                    sweetalert('success', "Daily Menu has been published to customers");
                    const model = document.getElementsByClassName("createDailyItemCloseModal");
                    model[0].setAttribute("data-dismiss", "modal");
                    model[0].click();
                    model[0].removeAttribute("data-dismiss");
                    itemsformClearAfterSubmit();
                }
            } else {
                // setDailyItems failed 
                dispatch({ type: types.SET_DAILY_MENU_ITEMS_FAILED });
                sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // unlock screen
            screenLockDisable();
            //setDailyItems failed
            dispatch({ type: types.SET_DAILY_MENU_ITEMS_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const setDailyDeals = (headers, payload, cleraState) => (dispatch) => {
    const model = document.getElementsByClassName("createDailyDealCloseModal");
    model[0].setAttribute("data-dismiss", "modal");
    model[0].click();
    model[0].removeAttribute("data-dismiss");
    // lock screen
    screenLockEnable();
    // for inputs filed clear after submit

    // start type for spining on ui
    dispatch({ type: types.SET_DAILY_MENU_DEALS_START });
    // headers = {
    //     userid : supplier id,
    // Authorization: token
    // }
    httpRequst.post('/supplier/dailymenudeals', payload, { headers })
        // send headers
        .then(response => {
            // unlock screen
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    dispatch({ type: types.SET_DAILY_MENU_DEALS_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    // setDailyDeals success
                    dispatch(getMenuAgain({ Authorization: headers.Authorization, userid: headers.userid }));
                    dispatch({ type: types.SET_DAILY_MENU_DEALS_SUCCESS });
                    sweetalert('success', "Daily Menu has been published to customers");
                    // sweetalert('success', response.data.message);
                    if (cleraState) {
                        cleraState();
                    }
                }
            } else {
                // setDailyDeals failed 
                dispatch({ type: types.SET_DAILY_MENU_DEALS_FAILED });
                sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // unlock screen
            screenLockDisable();
            //setDailyDeals failed
            dispatch({ type: types.SET_DAILY_MENU_DEALS_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const setWeeklyDeals = (headers, payload, cleraState) => (dispatch) => {
    // lock screen
    screenLockEnable();
    // start type for spining on ui
    dispatch({ type: types.SET_WEEKLY_MENU_DEALS_START });
    // headers = {
    //     userid : supplier id,
    // Authorization: token
    // }
    httpRequst.post('/supplier/weeklymenudeals', payload, { headers })
        // send headers
        .then(response => {
            console.log(response);
            // unlock screen
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    dispatch({ type: types.SET_WEEKLY_MENU_DEALS_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    // setWeeklyDeals success
                    dispatch(getMenuAgain({ Authorization: headers.Authorization, userid: headers.userid }));
                    dispatch({ type: types.SET_WEEKLY_MENU_DEALS_SUCCESS });
                    // for close modal 
                    const model = document.getElementsByClassName("createWeeklyDealsCloseModal");
                    model[0].setAttribute("data-dismiss", "modal");
                    model[0].click();
                    model[0].removeAttribute("data-dismiss");
                    sweetalert('success', "Weekly Menu has been published to customers");
                    // sweetalert('success', response.data.message);
                    if (cleraState) {
                        cleraState();
                    }
                }
            } else {
                // setWeeklyDeals failed 
                dispatch({ type: types.SET_WEEKLY_MENU_DEALS_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // unlock screen
            screenLockDisable();
            //setWeeklyDeals failed
            dispatch({ type: types.SET_WEEKLY_MENU_DEALS_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const menuItemActivation = (headers) => (dispatch) => {
    dispatch({ type: types.SET_ACTIVATION_MENU_ITEM_START });
    // start type for spining on ui
    // headers = {
    //     userid : supplier id,
    // Authorization: token,
    // itemid: 32r32
    // status : true/false
    // }
    httpRequst.get('/supplier/menuitemactivation', { headers })
        // send headers
        .then(response => {
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    dispatch({ type: types.SET_ACTIVATION_MENU_ITEM_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    // menuItemActivation success
                    const item = response.data;
                    dispatch({ type: types.SET_ACTIVATION_MENU_ITEM_SUCCESS, item });
                    sweetalert('success', (headers.status === false) ? "Successfully deactive" : "Successfully active");
                }
            } else {
                // menuItemActivation failed 
                dispatch({ type: types.SET_ACTIVATION_MENU_ITEM_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            //menuItemActivation failed
            dispatch({ type: types.SET_ACTIVATION_MENU_ITEM_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const updateMenuItem = (headers, payload) => (dispatch) => {
    // close modal
    const model = document.getElementsByClassName("updateItemCloseModal");
    model[0].setAttribute("data-dismiss", "modal");
    model[0].click();
    model[0].removeAttribute("data-dismiss");
    // lock screen
    screenLockEnable();
    // start type for spining on ui
    dispatch({ type: types.UPDATE_MENU_ITEM_START });
    // headers = {
    // Authorization :token,
    // userid: 2d324d23432d43ad,
    // itemid : cmk3ridji43of3f3
    // }
    httpRequst.post('/supplier/updatemenuitem', payload, { headers })
        // send headers
        .then(response => {
            // unlock screen
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    dispatch({ type: types.UPDATE_MENU_ITEM_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    const item = response.data;
                    dispatch({ type: types.UPDATE_MENU_ITEM_SUCCESS, item });
                    sweetalert('success', "Update item successfully");
                }
            } else {
                // updateMenuItem failed 
                dispatch({ type: types.UPDATE_MENU_ITEM_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // unlock screen
            screenLockDisable();
            //updateMenuItem failed
            dispatch({ type: types.UPDATE_MENU_ITEM_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const removeMenuItem = (headers, imageID) => (dispatch) => {
    dispatch({ type: types.REMOVE_MENU_ITEM_START });
    // start type for spining on ui
    // headers = {
    // Authorization:token, 
    // userid : 2d324d23432d43ad, 
    // itemid : cmk3ridji43of3f3
    // }
    // imageID = ""
    httpRequst.get('supplier/removemenuitem', { headers })
        // send headers
        .then(response => {
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    // removeMenuItem failed 
                    dispatch({ type: types.REMOVE_MENU_ITEM_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    // get menu again
                    dispatch(removeMenuItemImage(imageID));
                    dispatch({ type: types.REMOVE_MENU_ITEM_SUCCESS, itemid: headers.itemid });
                    sweetalert('success', response.data.message);
                }
            } else {
                // removeMenuItem failed 
                dispatch({ type: types.REMOVE_MENU_ITEM_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            //removeMenuItem failed
            dispatch({ type: types.REMOVE_MENU_ITEM_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const removeMenuItemImage = (imageID) => (dispatch) => {
    // imageID for deleting image from drive
    let headers = {
        fileid: imageID
    };

    dispatch({ type: types.REMOVE_MENU_ITEM_IMAGE_START });

    httpRequst.post('/deleteImage', {}, { headers })
        // send headers
        .then(response => {
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    // removeMenuItem failed 
                    dispatch({ type: types.REMOVE_MENU_ITEM_IMAGE_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    // get menu again
                    dispatch({ type: types.REMOVE_MENU_ITEM_IMAGE_SUCCESS });
                    sweetalert('success', response.data.message);
                }
            } else {
                // removeMenuItem failed 
                dispatch({ type: types.REMOVE_MENU_ITEM_IMAGE_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            //removeMenuItem failed
            dispatch({ type: types.REMOVE_MENU_ITEM_IMAGE_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const removeDailyMenu = (headers, image) => (dispatch) => {
    // lock screen
    screenLockEnable();
    // start type for spining on ui
    dispatch({ type: types.REMOVE_DAILY_MENU_START });
    // headers = {
    // Authorization:token, 
    // userid : 2d324d23432d43ad, 
    // day : monday
    // }
    httpRequst.get('supplier/removedailymenu', { headers })
        // send headers
        .then(response => {
            // unlock screen
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    // removeDailyMenu failed 
                    dispatch({ type: types.REMOVE_DAILY_MENU_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    // get menu again
                    dispatch(getMenuAgain({ Authorization: headers.Authorization, userid: headers.userid }));
                    dispatch({ type: types.REMOVE_DAILY_MENU_SUCCESS });
                    sweetalert('success', response.data.message);
                    if (image) {
                        dispatch(removeMenuItemImage(image));
                    }
                }
            } else {
                // removeDailyMenu failed 
                dispatch({ type: types.REMOVE_DAILY_MENU_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // unlock screen
            screenLockDisable();
            //removeDailyMenu failed
            dispatch({ type: types.REMOVE_DAILY_MENU_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const removeDeal = (headers, imageID) => (dispatch) => {
    dispatch({ type: types.REMOVE_MENU_DEAL_START });
    // start type for spining on ui
    // headers = {
    // Authorization:token, 
    // userid : 2d324d23432d43ad, 
    // dealid : cmk3ridji43of3f3
    // }

    // imageID = ""

    httpRequst.get('supplier/removedeal', { headers })
        // send headers
        .then(response => {
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    // removeDeal failed 
                    dispatch({ type: types.REMOVE_MENU_DEAL_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    // get menu again
                    dispatch(getMenuAgain({ Authorization: headers.Authorization, userid: headers.userid }));
                    dispatch(removeMenuItemImage(imageID));
                    dispatch({ type: types.REMOVE_MENU_DEAL_SUCCESS });
                    sweetalert('success', response.data.message);
                }
            } else {
                // removeDeal failed 
                dispatch({ type: types.REMOVE_MENU_DEAL_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            //removeDeal failed
            dispatch({ type: types.REMOVE_MENU_DEAL_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const updateMenuDeal = (headers, payload) => (dispatch) => {
    // close modal
    const model = document.getElementsByClassName("updateDealCloseModal");
    model[0].setAttribute("data-dismiss", "modal");
    model[0].click();
    model[0].removeAttribute("data-dismiss");
    // lock screen
    screenLockEnable();
    // start type for spining on ui
    dispatch({ type: types.UPDATE_MENU_DEAL_START });
    // headers = {
    // Authorization :token,
    // userid: 2d324d23432d43ad,
    // dealId : cmk3ridji43of3f3
    // }
    httpRequst.post('/supplier/updatemenudeal', payload, { headers })
        // send headers
        .then(response => {
            // unlock screen
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    dispatch({ type: types.UPDATE_MENU_DEAL_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    dispatch(getMenuAgain({ Authorization: headers.Authorization, userid: headers.userid }));
                    dispatch({ type: types.UPDATE_MENU_DEAL_SUCCESS });
                    sweetalert('success', response.data.message);
                }
            } else {
                // updateMenuDeal failed 
                dispatch({ type: types.UPDATE_MENU_DEAL_FAILED });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // unlock screen
            screenLockDisable();
            //updateMenuDeal failed
            dispatch({ type: types.UPDATE_MENU_DEAL_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const updateDailyMenu = (headers, payload) => (dispatch) => {
    // lock screen
    // start type for spining on ui
    screenLockEnable();
    dispatch({ type: types.UPDATE_DAILY_MENU_ITEMS_START });
    // headers = {
    //     userid : supplier id,
    // Authorization: token
    // }
    // const payload = {
    //     day:'monday',
    //     userid: supplier id,
    //     itemids: [sadsadsad],
    //     pickuptime_from: "",
    //     pickuptime_to: "",
    //     serving: 3,
    // }
    httpRequst.post('/supplier/updatedailymenu', payload, { headers })
        // send headers
        .then(response => {
            // unlock screen
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    dispatch({ type: types.UPDATE_DAILY_MENU_ITEMS_FAILED });
                    sweetalert('error', response.data.reason || response.data.message, 3);
                } else {
                    dispatch(getMenuAgain(headers));
                    // updateDailyMenu success
                    // const menu = response.data;
                    dispatch({ type: types.UPDATE_DAILY_MENU_ITEMS_SUCCESS });
                    sweetalert('success', response.data.message);
                    const model = document.getElementsByClassName("UpdateDailyItems");
                    model[0].setAttribute("data-dismiss", "modal");
                    model[0].click();
                    model[0].removeAttribute("data-dismiss");
                }
            } else {
                // updateDailyMenu failed 
                dispatch({ type: types.UPDATE_DAILY_MENU_ITEMS_FAILED });
                sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // unlock screen
            screenLockDisable();
            //updateDailyMenu failed
            dispatch({ type: types.UPDATE_DAILY_MENU_ITEMS_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const setImageInDrive = (payload, headers, itemsObject, type, cleraState) => (dispatch) => {
    // payload = FormData
    // file : File(image)
    // category

    // headers = {
    //     Authorization : 'bearer token'
    //     user id
    // }

    // type = "items , daily deal , weekly deal"

    // for creating items 
    // itemsObject = {'title', 'image', 'tags_keywords', 'price', 'description', 'category'}

    // for creating daily deal 
    // itemsObject = {'title', 'image', 'discount', 'tags_keywords', 'price', 'servings', 'pickuptime_to', 'pickuptime_from', itemsArray}

    // for creating weekly deal 
    // itemsObject = {'title', 'image', 'discount', 'tags_keywords', 'price', 'servings', itemsArray}

    // for updating profile image
    // itemsObject = { 'image' and/or 'mood' }

    screenLockEnable();

    dispatch({ type: types.UPLOAD_IMAGE_IN_DRIVE_START });

    // httpRequst({
    //     method: 'post',
    //     url: '/imageHandler',
    //     data: payload,
    //     headers: { 'Content-Type': 'multipart/form-data' }
    // })

    httpRequst.post('/uploadImage', payload)
        // send headers
        .then(response => {
            // unlock screen
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    dispatch({ type: types.UPLOAD_IMAGE_IN_DRIVE_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    const fileId = response.data.fileId;
                    const data = payload;
                    data.image = fileId;
                    dispatch({ type: types.UPLOAD_IMAGE_IN_DRIVE_SUCCESS, imageID: response.data.fileId });
                    sweetalert('success', response.data.message);
                    if (type === "items") {
                        itemsObject = { ...itemsObject, image: response.data.fileId };
                        dispatch(createMenuItem(headers, itemsObject, cleraState));
                    }
                    else if (type === "daily deal") {
                        itemsObject = { ...itemsObject, deal: { ...itemsObject.deal, image: response.data.fileId } };
                        dispatch(setDailyDeals(headers, itemsObject, cleraState));
                    } else if (type === "daily Items") {
                        itemsObject = {
                            ...itemsObject,
                            image: response.data.fileId
                        };
                        dispatch(setDailyItems(headers, itemsObject, cleraState));
                    } else if (type === "update") {
                        dispatch(updateMenuItem(headers, { image: data.image }));
                    } else if (type === 'updateWithData') {
                        let updateWithData = itemsObject;
                        updateWithData.image = data.image;
                        dispatch(updateMenuItem(headers, updateWithData));
                    } else if (type === "weekly deal") {
                        itemsObject = {
                            ...itemsObject,
                            deal: {
                                ...itemsObject.deal,
                                image: response.data.fileId
                            }
                        };
                        dispatch(setWeeklyDeals(headers, itemsObject, cleraState));
                    } else if (type === "supplier update") {
                        itemsObject = {
                            ...itemsObject,
                            image: response.data.fileId
                        };
                        dispatch(updateUser(itemsObject, headers));
                    } else if (type === "deal update") {
                        itemsObject = {
                            ...itemsObject,
                            image: response.data.fileId
                        };
                        dispatch(updateMenuDeal(headers, itemsObject));
                    } else if (type === "update item") {
                        itemsObject = {
                            ...itemsObject,
                            image: response.data.fileId
                        };
                        dispatch(updateMenuItem(headers, itemsObject));
                    }
                }

            } else {
                // image upload failed 
                dispatch({
                    type: types.UPLOAD_IMAGE_IN_DRIVE_FAILED
                });
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            // unlock screen
            screenLockDisable();
            //image upload failed
            dispatch({ type: types.UPLOAD_IMAGE_IN_DRIVE_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const updateImageForItems = (payload, headers, updateItems, type) => (dispatch) => {

    screenLockEnable();
    dispatch({ type: types.UPDATE_IMAGE_IN_DRIVE_START });
    httpRequst.post('/updateImage', payload)
        // send headers
        .then(response => {
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {
                    // if response have code its mean got an error
                    // removeMenuItem failed 
                    dispatch({ type: types.UPDATE_IMAGE_IN_DRIVE_FAILED });
                    sweetalert('error', response.data.reason || response.data.message);
                } else {
                    // get menu again
                    // dispatch(getMenuAgain({ Authorization: headers.Authorization, userid: headers.userid }));
                    dispatch({ type: types.UPDATE_IMAGE_IN_DRIVE_SUCCESS });
                    sweetalert('success', response.data.message);
                    if (type === 'updateDailyItems') {
                        dispatch(updateDailyMenu(headers, updateItems));
                    }
                    if (type === 'updateDailyItems') {
                        dispatch(updateDailyMenu(headers, updateItems));
                    }
                    if (type === 'Customer update' || type === "supplier update") {
                        if (updateItems.mode) {
                            const obj = { mode: updateItems.mode };
                            dispatch(updateUser(obj, headers));
                        }
                    }
                    sweetalert('success', "Image may take sometime to render");
                }
            } else {
                // removeMenuItem failed 
                dispatch({ type: types.UPDATE_IMAGE_IN_DRIVE_FAILED });
                sweetalert('error', response.data.reason || response.data.message);
                // sweetalert('error', 'Something went wrong');
            }
        }).catch(error => {
            //removeMenuItem failed
            screenLockDisable();
            dispatch({ type: types.UPDATE_IMAGE_IN_DRIVE_FAILED });
            sweetalert('error', error.message ? error.message : 'Prosess Failed');
        });
};

export const updateDefaultImageWithAnother = () => () => {

};

