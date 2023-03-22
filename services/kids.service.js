import * as HttpService from './http.service';
import {
  ADD_KID,
  CREATE_PAYMENT_GATEWAY_ORDER,
  GET_KID_DETAILS,
  UPDATE_KID_DETAILS,
  ADD_MONEY_AND_PLACE_ORDER
} from './url.service';

export const addKid = (kidDetails) => {
  return HttpService.postWithAuth(ADD_KID, kidDetails);
};

export const createPaymentGatewayOrder = (parentId, kidId, amount) => {
  return HttpService.postWithAuth(CREATE_PAYMENT_GATEWAY_ORDER(parentId, kidId), {amount});
};

export const getKidDetails = (parentId, kidId, token) => {
  return HttpService.getWithAuth(GET_KID_DETAILS(parentId, kidId), token);
};

export const updateKid = (kidId, details) => {
  return HttpService.putWithAuth(UPDATE_KID_DETAILS(kidId), details);
};

export const addMoneyandPlaceOrder = (parentId, kidId, amount) => {
  return HttpService.postWithAuth(ADD_MONEY_AND_PLACE_ORDER(parentId, kidId), {amount});
};