import { types } from '../types';

let initialState = {
    isSupplierLoad: false,
    isInactiveSupplierLoad: false,
    isActiveSupplierLoad: false,
    isActivation: false,
    isFeatured: false,

    suppliers: [],
    selectedSupplier: {},
    activeSuppliers: [],
    inactiveSuppliers: [],
};

function supplierReducer(state = initialState, action) {
    switch (action.type) {
        // all suppliers
        case types.GET_SUPPLIER_START:
            return { ...state, isSupplierLoad: true };
        case types.GET_SUPPLIER_SUCCESS:
            return { ...state, isSupplierLoad: false, suppliers: action.suppliers };
        case types.GET_SUPPLIER_FAILED:
            return { ...state, isSupplierLoad: false };

        // featured;
        case types.SET_FEATURED_SUPPLIER_START:
            return { ...state, isFeatured: true };
        case types.SET_FEATURED_SUPPLIER_SUCCESS:
            const indexOfSupplier = state.suppliers.findIndex((obj => obj._id === action.supplier._id));
            return {
                ...state,
                isFeatured: false,
                selectedSupplier: action.supplier,
                ...state.suppliers.splice(indexOfSupplier, 1, action.supplier),
            };
        case types.SET_FEATURED_SUPPLIER_FAILED:
            return { ...state, isFeatured: false };

        case types.SET_SELECTED_SUPPLIER:
            return { ...state, selectedSupplier: action.payload };

        // inactive 
        case types.GET_INACTIVE_SUPPLIER_START:
            return { ...state, isInactiveSupplierLoad: true };
        case types.GET_INACTIVE_SUPPLIER_SUCCESS:
            return { ...state, isInactiveSupplierLoad: false, inactiveSuppliers: action.inactiveSuppliers };
        case types.GET_INACTIVE_SUPPLIER_FAILED:
            return { ...state, isInactiveSupplierLoad: false };

        // active 
        case types.GET_ACTIVE_SUPPLIER_START:
            return { ...state, isActiveSupplierLoad: true };
        case types.GET_ACTIVE_SUPPLIER_SUCCESS:
            return { ...state, isActiveSupplierLoad: false, activeSuppliers: action.activeSuppliers };
        case types.GET_ACTIVE_SUPPLIER_FAILED:
            return { ...state, isActiveSupplierLoad: false };


        // activation
        case types.SET_ACTIVATION_SUPPLIER_START:
            return { ...state, isActivation: true };

        case types.SET_ACTIVATION_SUPPLIER_SUCCESS:
            const index = state.suppliers.findIndex((obj => obj._id === action.supplier._id));
            const ASIdx = state.activeSuppliers.findIndex((obj => obj._id === action.supplier._id));
            const ISIdx = state.inactiveSuppliers.findIndex((obj => obj._id === action.supplier._id));


            // these funtionality works add and remove from ui
            if (action.supplier.status === "active") {
                // for active
                state.activeSuppliers.splice(0, 0, action.supplier);
                // for inactive
                state.inactiveSuppliers.splice(ISIdx, 1);
            } else if (action.supplier.status === "inactive") {
                // for inactive
                state.inactiveSuppliers.splice(0, 0, action.supplier);
                // for active
                state.activeSuppliers.splice(ASIdx, 1);
            }
            return {
                ...state, isActivation: false,
                ...state.suppliers.splice(index, 1, action.supplier),
                // ...state.activeSuppliers.splice(queryForActiveSupp),
                // ...state.inactiveSuppliers.splice(queryForInActiveSupp),
            };

        case types.SET_ACTIVATION_SUPPLIER_FAILED:
            return { ...state, isActivation: false };

        default:
            return state;
    }
}

export default supplierReducer;