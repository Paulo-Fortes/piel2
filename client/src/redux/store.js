import {combineReducers, configureStore} from '@reduxjs/toolkit';

import product from './slices/product';
import cart from './slices/cart';

const reducer = combineReducers({
    product,
    cart,
});

export default configureStore({ reducer});

/* REDUX MEJORA LA COMUNICACIÓN ENTRE FRONT-client- Y EL BACKEND -server- */
/* SE DIVIDE EN: STORE, SLICE (UPDATES) Y ACTIONS */