/**
 * @summary store.js is the store which holds the reducer and dispatches
 * the actions when called upon.
 *
 * @require redux, redux-thunk
 */
// import redux from 'redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers/reducer';
console.log("store running")

let store = createStore(reducers.reducer, applyMiddleware(thunk));
module.exports = store;
//
