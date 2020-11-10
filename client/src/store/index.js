import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
    authReducer,
    customerReducer,
    supplierReducer,
    menuReducer,
    kitchenReducer,
    adminReducer
} from './reducers';

export default createStore(combineReducers({
    auth: authReducer,
    customers: customerReducer,
    suppliers: supplierReducer,
    menu: menuReducer,
    supplierKitchens: kitchenReducer,
    admin : adminReducer
}), {}, applyMiddleware(thunk));