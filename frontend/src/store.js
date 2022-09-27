// import { combineReducers, applyMiddleware } from "redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailstReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailstReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
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
