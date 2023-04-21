import * as HttpService from './http.service';
import {
  ADD_TO_CART,
  CREATE_ORDER,
  DELETE_CART_BY_PRODUCT_ID_URL,
  GET_ALL_CART_PRODUCTS_URL,
  GET_ALL_PRODUCTS_URL,
  GET_PRODUCT_BY_ID_URL,
  VERIFY_PAYMENT,
} from './url.service';

// export const addKid = (kidDetails) => {
//   return HttpService.postWithAuth(ADD_KID, kidDetails);
// };

// export const createPaymentGatewayOrder = (parentId, kidId, amount) => {
//   return HttpService.postWithAuth(CREATE_PAYMENT_GATEWAY_ORDER(parentId, kidId), {amount});
// };

// export const getKidDetails = (parentId, kidId, token) => {
//   return HttpService.getWithAuth(GET_KID_DETAILS(parentId, kidId), token);
// };

// export const updateKid = (kidId, details) => {
//   return HttpService.putWithAuth(UPDATE_KID_DETAILS(kidId), details);
// };

// export const addMoneyandPlaceOrder = (parentId, kidId, amount) => {
//   return HttpService.postWithAuth(ADD_MONEY_AND_PLACE_ORDER(parentId, kidId), {amount});
// };

export const getAllProducts = () => {
  return HttpService.getWithOutAuth(GET_ALL_PRODUCTS_URL());
};

export const getProductById = (productId) => {
  return HttpService.getWithOutAuth(GET_PRODUCT_BY_ID_URL(productId));
};

// cart
export const addProductToCart = (product_id, qty) => {
  return HttpService.putWithAuth(ADD_TO_CART(), { product_id, qty });
};

export const getAllCartProduct = (token) => {
  return HttpService.getWithAuthWithToken(GET_ALL_CART_PRODUCTS_URL(), token);
};

// delete cart by product id
export const deleteCartProductById = (productId) => {
  return HttpService.deleteWithAuth(DELETE_CART_BY_PRODUCT_ID_URL(productId));
};
//

export const orderGenerate = ({ address_id, payment_method, shipping_cost, discount }) => {
  return HttpService.putWithAuth(CREATE_ORDER(), {
    address_id,
    payment_method,
    shipping_cost,
    discount,
  });
};
export const verifyPayment = (data) => {
  return HttpService.postWithAuth(VERIFY_PAYMENT(), data);
};
