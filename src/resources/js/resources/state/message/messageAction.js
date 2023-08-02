import * as messageTypes from "./messageTypes";

function setMessage(message, messageCode, messageError) {
    return {
        type: messageTypes.SET_MESSAGE_ACTION,
        payload: {
            message,
            messageCode,
            messageError,
        },
    };
}

function clearMessage() {
    return {
        type: messageTypes.CLEAR_MESSAGE_ACTION,
    };
}

export function setMessageAction(message, messageCode, messageError=null) {
    return function (dispatch) {
        dispatch(setMessage(message, messageCode, messageError));
    };
}

export function clearMessageAction() {
    return function (dispatch) {
        dispatch(clearMessage());
    };
}
