import { types } from '../types';

let initialState = {
    subAdmins: [],
    activeAdmin: {},
    selectedSubAdmin: {},
    isLogin: false,
    isAdminExist: false,
    isAdminProcessed: false,
    isSubAdminFetching: false,
    isSubAdminCreating: false,
    isSubAdminActivating: false,
};

function adminReducer(admin = initialState, action) {
    switch (action.type) {
        // for get sub admins
        case types.GET_SUB_ADMIN_START:
            return { ...admin, isSubAdminFetching: true };
        case types.GET_SUB_ADMIN_SUCCESS:
            return { ...admin, subAdmins: action.subAdmins, isSubAdminFetching: false };
        case types.GET_SUB_ADMIN_FAILED:
            return { ...admin, isSubAdminFetching: false, };

        // for create sub admins
        case types.SET_SUB_ADMIN_START:
            return { ...admin, isSubAdminCreating: true };
        case types.SET_SUB_ADMIN_SUCCESS:
            let subAdmins = admin.subAdmins;
            subAdmins.push(action.subAdmins);
            return { ...admin, subAdmins, isSubAdminCreating: false };
        case types.SET_SUB_ADMIN_FAILED:
            return { ...admin, isSubAdminCreating: false };

        // for activation sub admins
        case types.SET_ACTIVATION_SUB_ADMIN_START:
            return { ...admin, isSubAdminActivating: true };
        case types.SET_ACTIVATION_SUB_ADMIN_SUCCESS:
            let admin_activation = admin.subAdmins;
            const index = admin_activation.findIndex((obj => obj._id === action.subAdmin._id));
            admin_activation.splice(index, 1, action.subAdmin);
            return { ...admin, subAdmins: admin_activation, isSubAdminActivating: false };
        case types.SET_ACTIVATION_SUB_ADMIN_FAILED:
            return { ...admin, isSubAdminActivating: false, };

        // for view sub admin detail from admin 
        case types.SELECTED_SUB_ADMIN_DATA:
            return { ...admin, selectedSubAdmin: action.payload };

        // for login admin 
        case types.ADMIN_LOGIN_START:
            return { ...admin, isLogin: false, isAdminExist: false, isAdminProcessed: false };
        case types.ADMIN_LOGIN_SUCCESS:
            return { ...admin, isLogin: true, isAdminExist: true, isAdminProcessed: true, activeAdmin: action.activeAdmin };
        case types.ADMIN_LOGIN_FAILED:
            return { ...admin, isLogin: false, isAdminExist: false, isAdminProcessed: false };

        default:
            return admin;
    }
}

export default adminReducer;