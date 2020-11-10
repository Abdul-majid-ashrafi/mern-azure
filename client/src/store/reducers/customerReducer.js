import { types } from '../types';

let initialState = {
    isLoading: false,
    customers: [],
    allCountiries: [],
    allCountryState: [],
    allCountryCities: [],
    singleUserData: {},
    isActivation: false,
    isCityFetch: false,
    isStateFetch: false,
    isCountryFetch: false,
}

function customerReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CUSTOMER_START:
            return { ...state, isLoading: true };
        case types.GET_CUSTOMER_SUCCESS:
            return { ...state, isLoading: false, customers: action.customers };
        case types.GET_CUSTOMER_FAILED:
            return { ...state, isLoading: false };

        case types.SET_ACTIVATION_CUSTOMER_START:
            return { ...state, isActivation: true };
        case types.SET_ACTIVATION_CUSTOMER_SUCCESS:
            const customers = state.customers
            const index = customers.findIndex((obj => obj._id === action.customers._id));
            customers.splice(index, 1, action.customers)
            return { ...state, isActivation: false, customers: customers };
        case types.SET_ACTIVATION_CUSTOMER_FAILED:
            return { ...state, isActivation: false };

        case types.SET_SINGLE_USERS_DATA:
            return { ...state, singleUserData: action.payload };

        case types.GET_COUNTRIES_START:
            return { ...state, isCountryFetch: true };
        case types.GET_COUNTRIES_SUCCESS:
            return { ...state, isCountryFetch: false, allCountiries: action.allCountiries };
        case types.GET_COUNTRIES_FAILED:
            return { ...state, isCountryFetch: false };

        case types.GET_STATE_START:
            return { ...state, isStateFetch: true };
        case types.GET_STATE_SUCCESS:
            return { ...state, isStateFetch: false, allCountryState: action.allCountryState };
        case types.GET_STATE_FAILED:
            return { ...state, isStateFetch: false };

        case types.GET_CITY_START:
            return { ...state, isCityFetch: true };
        case types.GET_CITY_SUCCESS:
            return { ...state, isCityFetch: false, allCountryCities: action.allCountryCities };
        case types.GET_CITY_FAILED:
            return { ...state, isCityFetch: false };

        default:
            return state;
    }
}

export default customerReducer;