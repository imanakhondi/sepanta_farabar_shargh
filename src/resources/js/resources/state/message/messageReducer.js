import * as actions from "./messageTypes";

const initialState = {
    message: null,
    messageError: null,
    messageCode: 0,
};

const messageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.SET_MESSAGE_ACTION:
            return {
                message: payload.message,
                messageError: payload.messageError,
                messageCode: payload.messageCode,
            };

        case actions.CLEAR_MESSAGE_ACTION:
            return { message: null, messageError: null, messageCode: 0 };
        default:
            return state;
    }
};

export default messageReducer;
