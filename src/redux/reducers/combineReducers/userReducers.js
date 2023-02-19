/** @format */

import actions from '@redux/actions';
import { reducerDefault } from '@redux/common/reducers';

const initialState = {
  data: null,
  password: '',
  username: '',
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isSaveAccount: false,
};

const initProducts = {
  cart: [],
  order: [],
};

export const cart = (state = initProducts, action) => {
  switch (action.type) {
    case actions.ADD_PRODUCTS_LOCAL_TO_CART: {
      let title = action.product.title;
      let itemInCart = state?.cart?.find?.(product => product.title === title);
      if (itemInCart) {
        itemInCart.isQuantity++;
      } else {
        state?.cart?.push?.(action.product);
      }
      return { ...state };
    }
    case actions.INCREMENT_QUANTITY_PRODUCT_LOCAL_IN_CART: {
      let newCart = [...state.cart];
      let title = action.product.title;
      let itemIndexCart = state.cart.findIndex(product => product.title === title);
      if (itemIndexCart !== -1) {
        newCart[itemIndexCart].isQuantity += 1;
      }
      return { ...state, cart: newCart };
    }
    case actions.DECREMENT_QUANTITY_PRODUCT_LOCAL_IN_CART: {
      let newCart = [...state.cart];
      let title = action.product.title;
      let itemIndexCart = state.cart.findIndex(product => product.title === title);
      if (itemIndexCart !== -1) {
        if (newCart[itemIndexCart].isQuantity <= 1) {
          newCart.splice(itemIndexCart, 1);
        } else {
          newCart[itemIndexCart].isQuantity -= 1;
        }
      }
      return { ...state, cart: newCart };
    }
    case actions.REMOVE_PRODUCTS_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product.title !== action.product.title),
      };
    case actions.CREATE_NEW_ORDER_PRODUCTS_LOCAL:
      state.order.push(action.order);
      state.order = [...state.order];
      state.cart = [];
      return { ...state };
    case action.UNMOUNT_CART_LOCAL:
      state.cart = [];
      return { ...state };
    default:
      return state;
  }
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_USER_INFO:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case actions.LOGOUT_APP:
      return { ...state, accessToken: null, refreshToken: null };
    default:
      return state;
  }
};

export const login = (...props) => {
  return reducerDefault(...props, actions.LOGIN_APP);
};
// export const sendOTP = (...props) => {
//   return reducerDefault(...props, actions.SEND_OTP);
// };
// export const signUpUser = (...props) => {
//   return reducerDefault(...props, actions.SIGN_UP_USER);
// };

// export const checkPhone = (...props) => {
//   return reducerDefault(...props, actions.CHECK_PHONE);
// };

// export const logoutUser = (...props) => {
//   return reducerDefault(...props, actions.LOGOUT_USER);
// };

export const getOneUser = (...props) => {
  return reducerDefault(...props, actions.GET_ONE_USER);
};

// export const updateAvatar = (...props) => {
//   return reducerDefault(...props, actions.UPDATE_AVATAR);
// };

export const updateOneUser = (...props) => {
  return reducerDefault(...props, actions.UPDATE_ONE_USER);
};

// export const updatePass = (...props) => {
//   return reducerDefault(...props, actions.UPDATE_PASS);
// };
