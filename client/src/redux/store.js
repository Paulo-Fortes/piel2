import {combineReducers, configureStore} from '@reduxjs/toolkit';

import product from './slices/product';
import cart from './slices/cart';
import user from './slices/user';
import order from './slices/order';
import admin from './slices/admin';

const reducer = combineReducers({
    product,
    cart,
    user,
    order,
    admin,
});

export default configureStore({ reducer});

/* REDUX MEJORA LA COMUNICACIÓN ENTRE FRONT-client- Y EL BACKEND -server- */
/* SE DIVIDE EN: STORE, SLICE (UPDATES) Y ACTIONS */