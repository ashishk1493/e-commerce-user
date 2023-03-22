import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import { getAuth } from 'services/identity.service';
import { getAllAddress } from 'services/address.service';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  userBillAddressList: [],
};

const slice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET Adress
    setAddressList(state, action) {
      state.isLoading = false;
      state.userBillAddressList = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setAddressList
} = slice.actions;

// ----------------------------------------------------------------------

export function getAllAddressSlice() {

  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getAllAddress();
      console.log(response, "response");
      dispatch(slice.actions.setAddressList(response.data.data.rows));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}