import _ from 'lodash';
import { AuthAction, AuthActionTypes } from '../actions/authActions';
import { Reducer } from 'redux';
export interface AuthState {
    isAuth: boolean;
}

const initialState = {
    isAuth: false,
};

export const authReducer: Reducer<AuthState, AuthAction> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case AuthActionTypes.SET_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        default:
            return state;
    }
};
