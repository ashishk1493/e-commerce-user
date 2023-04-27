import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import { getAuth, setAuth } from 'services/identity.service';
import { login_user_service } from 'services/user.service';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  objUserDetails: {},
};

const slice = createSlice({
  name: 'userInfo',
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
    setUserDetails(state, action) {
      state.isLoading = false;
      state.objUserDetails = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { setUserDetails } = slice.actions;

// ----------------------------------------------------------------------

export function login_user_slice(email, password) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await login_user_service(email, password);
      if (response.data.success) {
        dispatch(slice.actions.setUserDetails(response.data));
      } else {
        dispatch(slice.actions.setUserDetails(response.data.data));
      }
      setAuth({ token: response.data.data.accessToken });
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
