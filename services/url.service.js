// eslint-disable-next-line no-undef
// const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
const ApiUrl = 'http://localhost:8080/api';

const UrlParamsReplace = (url, params = {}) => {
  let urlWithPrefix = `${ApiUrl}${url}`;
  if (params) {
    Object.keys(params).forEach((key) => (urlWithPrefix = urlWithPrefix.replace(`:${key}`, params[key])));
  }
  return urlWithPrefix;
};

//aws
export const GET_PRE_SIGNED_URL = UrlParamsReplace('/aws/get-pre-signed-url');
export const GET_UPLOAD_PRE_SIGNED_URL = UrlParamsReplace('/aws/get-upload-pre-signed-url');

export const CHECKSUBTRANSACTION_URL = (parentId, pgTransactionId) =>
  UrlParamsReplace('/parents/:parentId/checksubtransactions/:pgTransactionId', {
    parentId,
    pgTransactionId,
  });

// user auth
export const LOGIN_USER_URL = () => UrlParamsReplace('/auth/signin/user', {});

// products
export const GET_ALL_PRODUCTS_URL = (cat, gender, pricelt, pricegt) =>
  UrlParamsReplace('/user/all-new-products?cat=:cat&gender=:gender&pricelt=:pricelt&pricegt=:pricegt', {
    cat,
    gender,
    pricelt,
    pricegt,
  });
export const GET_PRODUCT_BY_ID_URL = (productId) => UrlParamsReplace('/user/new-product/:productId', { productId });
export const GET_ALL_CATEGORIES_URL = () => UrlParamsReplace('/user/all-categories', {});
export const ADD_TO_CART = () => UrlParamsReplace('/user/add-to-cart', {});
export const GET_ALL_CART_PRODUCTS_URL = () => UrlParamsReplace('/user/cart', {});
export const DELETE_CART_BY_PRODUCT_ID_URL = (productId) =>
  UrlParamsReplace('/user/delete-cart-product/:productId', { productId });

export const CREATE_ORDER = () => UrlParamsReplace('/user/place-order', {});
export const VERIFY_PAYMENT = () => UrlParamsReplace('/user/verify', {});

// address
export const GET_ALL_ADDRESS_URL = () => UrlParamsReplace('/user/all-addresses', {});
export const ADD_ADDRESS_URL = () => UrlParamsReplace('/user/add-address', {});
export const DELETE_ADDRESS_URL = (addressId) => UrlParamsReplace('/user/delete-address/:addressId', { addressId });
