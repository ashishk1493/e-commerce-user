import * as HttpService from './http.service';
import {
  LOGIN_USER_URL,
} from './url.service';

export const login_user_service = (email, password) => {
  return HttpService.postWithOutAuth(LOGIN_USER_URL(), { email, password });
};

// export const addProductToCart = (product_id, qty) => {
//   return HttpService.putWithAuth(ADD_TO_CART(), { product_id, qty });
// };