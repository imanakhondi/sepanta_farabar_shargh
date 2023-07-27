import { User } from "../../http/entities/User";
import utils from "../../utils/Utils";
import * as userTypes from "./userTaypes";

const user = new User();

function fetchUserRequest() {
  return {
    type: userTypes.FETCH_LOGIN_USER_REQUEST,
  };
}

function fetchUserSuccess(user) {
  return {
    type: userTypes.FETCH_LOGIN_USER_SUCCESS,
    payload: user,
  };
}

function fetchUserFailure(error) {
  return {
    type: userTypes.FETCH_LOGIN_USER_FAILURE,
    payload: error,
  };
}

function fetchAuth(user) {
  return {
    type: userTypes.FETCH_AUTH_ACTION,
    payload: user,
  };
}

export function fetchLoginAction(data) {
  return async function (dispatch) {
    dispatch(fetchUserRequest());
    const response = await user.loginUser(data);
    if (response !== null) {
      dispatch(fetchUserSuccess(response));
      utils.setLSVariable("user", JSON.stringify(response.data.item));
      return;
    }
    dispatch(fetchUserFailure(response.errorMasage));
  };
}

export const fetchAuthAction = () => (data) => {
  return async function (dispatch) {
    dispatch(fetchUserRequest());
    const response = await user.fetchUser(data);
    if (response !== null) {
      if (utils.isJsonString(response.data) && response.data._result === "1") {
        utils.setLSVariable("user", JSON.stringify(response.data.item));
        dispatch(fetchAuth(response.data.item));
      }
    }
    dispatch(fetchUserFailure(response.errorMasage));
  };
};
