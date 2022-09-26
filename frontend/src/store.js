// import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailstReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducers = {
  productList: productListReducer,
  productDetails: productDetailstReducer,
  cart: cartReducer,
};

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer: reducers,
  preloadState: initialState,
  middleware: middleware,
});

let currentState = store.getState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.cart.cartItems !== currentState.cart.cartItems) {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(currentState.cart.cartItems)
    );
  }
});

export default store;
