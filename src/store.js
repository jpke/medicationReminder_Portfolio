/**
 * @summary store.js is the store which holds the reducer and dispatches
 * the actions when called upon.
 *
 * @require redux, redux-thunk
 */
// import redux from 'redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducer/medication';
console.log("store running")

let store = createStore(reducers.gameReducer, applyMiddleware(thunk));
module.exports = store;
//
