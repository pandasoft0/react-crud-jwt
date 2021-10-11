import api from '../api';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../store';
import setAuthToken from '../utils/setAuthToken';
import { AxiosResponse } from 'axios';
import history from '../history';


export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;
export enum AuthActionTypes {
    SET_AUTH = 'SET_AUTH',
}

// LOGIN

interface LoginSuccess {
    type: AuthActionTypes.SET_AUTH;
    payload: boolean;
}

export interface Auth {
    error: any;
    status: string;
    token: string;
    refreshToken: string;
}

export const checkAuth = (): ThunkResult<void> => async dispatch => {
    try {
        const response: AxiosResponse<Boolean> = await api.post('/api/auth/check');
        if (response) {
            handleLoginSuccess(dispatch, true);
        }
    } catch (e) {
        var refreshToken = localStorage.getItem('x-refresh-token');
        try {
            const response: AxiosResponse<string> = await api.post('/api/auth/token', { refreshToken });
            setAuthToken(response.data);
            handleLoginSuccess(dispatch, true);
        } catch (e) {
            // var refreshToken = localStorage.getItem('x-refresh-token');
            // try {
            //     const response: AxiosResponse<Boolean> = await api.post('/api/auth/logout', { refreshToken });
            //     if (response) {
            //         localStorage.clear();
            //         dispatch({
            //             type: AuthActionTypes.SET_AUTH,
            //             payload: false
            //         });
            //         history.push('/login');
            //     }
            // } catch (e) {
            //     // console.log(e);
            // }
        }
    }
}

export const logout = (): ThunkResult<void> => async dispatch => {
    var refreshToken = localStorage.getItem('x-refresh-token');
    try {
        const response: AxiosResponse<Boolean> = await api.post('/api/auth/logout', { refreshToken });
        if (response) {
            localStorage.clear();
            dispatch({
                type: AuthActionTypes.SET_AUTH,
                payload: false
            });
            history.push('/login');
        }
    } catch (e) {
        console.log(e);
    }
}

export const login = (userData: Object): ThunkResult<void> => async dispatch => {
    try {
        const response: AxiosResponse<Auth> = await api.post('/api/auth', userData);

        if (response.data.status) {
            setAuthToken(response.data.token);
            localStorage.setItem('x-refresh-token', response.data.refreshToken);
            handleLoginSuccess(dispatch, true);
            history.push('/profile');
        } else {
            alert(response.data.error);
            return;
        }
    } catch (e) {
        console.log(e);
    }
};

export const handleLoginSuccess = (
    dispatch: Dispatch<LoginSuccess>,
    isauth: boolean
) => {
    dispatch({
        type: AuthActionTypes.SET_AUTH,
        payload: isauth
    });
};

export type AuthAction =
    | LoginSuccess