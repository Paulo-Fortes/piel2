import {combineReducers, configureStore} from '@reduxjs/toolkit';

import product from './slices/product';

const reducer = combineReducers({
    product,
});

export default configureStore({ reducer});

/* REDUX MEJORA LA COMUNICACIÓN ENTRE FRONT-client- Y EL BACKEND -server- */
/* SE DIVIDE EN: STORE, SLICE (UPDATES) Y ACTIONS */