import { types } from '../types';
import { sweetalert, screenLockEnable, screenLockDisable, setStorage } from '../../shared';
import { httpRequst } from '../../config';
import Password from 'antd/lib/input/Password';

export const totalOrdersForAdmin = (statusType, orders) => (dispatch) => {
    if (statusType === 'In Progress') {     //for inprogress orderss
        dispatch({ type: types.GET_IN_PROGRESS_ORDER_FOR_ADMIN, orders });
    } else if (statusType === 'Canceled') {     //for cancelled orderss    
        dispatch({ type: types.GET_CANCELED_ORDER_FOR_ADMIN, orders });
    } else if (statusType === 'Completed') { //for completed orderss
        dispatch({ type: types.GET_COMPLETE_ORDER_FOR_ADMIN, orders });
    }
};

export const fetchSubAdmins = (payload) => (dispatch) => {
    dispatch({ type: types.GET_SUB_ADMIN_START }); // start type for spining on ui
    // payload = {
    // userid : admin id
    // status : active / inactive
    // type : customer
    // Authorization: token
    // }
    httpRequst.get("/admin/fetchUser", { headers: payload })  // send headers
        .then((response) => {
            if (response.data) {
                if (response.data.code) {  // if response have code its mean got an error
                    sweetalert("error", response.data.message);
                    dispatch({ type: types.GET_SUB_ADMIN_FAILED });
                } else {  // fetchUser success
                    const subAdmins = response.data;
                    dispatch({ type: types.GET_SUB_ADMIN_SUCCESS, subAdmins });
                }
            } else {  // fetchUser failed
                dispatch({ type: types.GET_SUB_ADMIN_FAILED });
                sweetalert("error", "Something went wrong");
            }
        })
        .catch((error) => {   // fetchUser failed
            sweetalert("error", error.message ? error.message : "Prosess Failed");
            dispatch({ type: types.GET_SUB_ADMIN_FAILED });
        });
};

export const setSubAdmin = (payload, token) => (dispatch) => {
    screenLockEnable(); // lock screen
    dispatch({ type: types.SET_SUB_ADMIN_START }); // start type for spining on ui
    // send payload=body user data
    // send token in headers
    httpRequst.post("/user/create", payload, { headers: { Authorization: `Bearer ${token}` }, }) // send headers
        .then((response) => {
            console.log(response);
            screenLockDisable();
            if (response.data) {
                if (response.data.code) {  // if response have code its mean got an error
                    sweetalert("error", response.data.reason || response.data.message);
                    dispatch({ type: types.SET_SUB_ADMIN_FAILED });
                } else {  // setSubAdmin success
                    const subAdmins = response.data;
                    dispatch({ type: types.SET_SUB_ADMIN_SUCCESS, subAdmins });
                    const model = document.getElementById("createAdmin");
                    model.setAttribute("data-dismiss", "modal");
                    model.click();
                    model.removeAttribute("data-dismiss");
                    sweetalert("success", "Sub Admin Create Succefully");
                }
            } else {  // setSubAdmin failed
                dispatch({ type: types.SET_SUB_ADMIN_FAILED });
                sweetalert("error", "Something went wrong");
            }
        })
        .catch((error) => {   // setSubAdmin failed
            screenLockDisable();
            sweetalert("error", error.message ? error.message : "Prosess Failed");
            dispatch({ type: types.SET_SUB_ADMIN_FAILED });
        });
};

export const subAdminActivation = (headers) => (dispatch) => {
    dispatch({ type: types.SET_ACTIVATION_SUB_ADMIN_START });  // start type for spining on ui
    // const headers = {
    //     userid,
    //     adminid,
    //     Authorization,
    //     status,
    //     type,
    // };
    httpRequst.get("/admin/useractivation", { headers })  // send headers
        .then((response) => {
            if (response.data) {
                if (response.data.code) {  // if response have code its mean got an error
                    sweetalert("error", response.data.message);
                    dispatch({ type: types.SET_ACTIVATION_SUB_ADMIN_FAILED });
                } else {  // subAdminActivation success
                    const subAdmin = response.data;
                    dispatch({ type: types.SET_ACTIVATION_SUB_ADMIN_SUCCESS, subAdmin });
                    if (subAdmin.status === 'active') {
                        sweetalert("success", "Sub Admin Active Succefully");
                    } else {
                        sweetalert("success", "Sub Admin Deactive Succefully");
                    }
                }
            } else {  // subAdminActivation failed
                dispatch({ type: types.SET_ACTIVATION_SUB_ADMIN_FAILED });
                sweetalert("error", "Something went wrong");
            }
        })
        .catch((error) => { // subAdminActivation failed
            dispatch({ type: types.SET_ACTIVATION_SUB_ADMIN_FAILED });
            sweetalert("error", error.message ? error.message : "Prosess Failed");
        });
};

export const selectedSubAdminData = (payload) => (dispatch) => {
    dispatch({ type: types.SELECTED_SUB_ADMIN_DATA, payload });
};

export const adminLogin = (payload) => (dispatch) => {
    screenLockEnable();
    dispatch({ type: types.ADMIN_LOGIN_START });  // start type for spining on ui
    //  payload = {
    //    email: hamza@gmail.com,
    //    Password: hamza123
    // };
    httpRequst.post("/admin/auth", payload) // send body
        .then((response) => {
            screenLockDisable();
            console.log(response);
            if (response.data) {
                if (response.data.code) {  // if response have code its mean got an error
                    sweetalert("error", response.data.message);
                    dispatch({ type: types.ADMIN_LOGIN_FAILED });
                } else {  // adminLogin success
                    sweetalert("success", response.data.message);
                    const activeAdmin = response.data.user;
                    setStorage("type", response.data.user.type);
                    setStorage("token", response.data.token);
                    dispatch({ type: types.ADMIN_LOGIN_SUCCESS, activeAdmin });
                }
            } else {  // adminLogin failed
                dispatch({ type: types.ADMIN_LOGIN_FAILED });
                sweetalert("error", "Something went wrong");
            }
        })
        .catch((error) => { // adminLogin failed
            screenLockDisable();
            dispatch({ type: types.ADMIN_LOGIN_FAILED });
            sweetalert("error", error.message ? error.message : "Prosess Failed");
        });
};