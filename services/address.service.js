import * as HttpService from './http.service';
import {
  ADD_ADDRESS_URL,
  DELETE_ADDRESS_URL,
  GET_ALL_ADDRESS_URL,
} from './url.service';

export const getAllAddress = () => {
  return HttpService.getWithAuthWithToken(GET_ALL_ADDRESS_URL());
};

export const addNewAddress = (objAddress) => {
  return HttpService.postWithAuth(ADD_ADDRESS_URL(), { ...objAddress });
};

// delete cart by product id
export const deleteAddressById = (addressId) => {
  return HttpService.deleteWithAuth(DELETE_ADDRESS_URL(addressId));
};


// export const addProductToCart = (product_id, qty) => {
//   return HttpService.putWithAuth(ADD_TO_CART(), { product_id, qty });
// };