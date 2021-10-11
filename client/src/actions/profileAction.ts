import posts from '../api';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../store';
import axios, { AxiosResponse } from 'axios';
import history from '../history';

export interface Profile {
    id: string;
    name: string;
}

export interface Profiles {
    [id: string]: Profile;
}

export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;
export enum ProfilesActionTypes {
    FETCH_POSTS = 'FETCH_POSTS',
    FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
    FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL',
    FETCH_POST = 'FETCH_POST',
    FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS',
    FETCH_POST_FAIL = 'FETCH_POST_FAIL',
    ADD_POST = 'ADD_POST',
    ADD_POST_SUCCESS = 'ADD_POST_SUCCESS',
    ADD_POST_FAIL = 'ADD_POST_FAIL',
    EDIT_POST = 'EDIT_POST',
    EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS',
    EDIT_POST_FAIL = 'EDIT_POST_FAIL',
    DELETE_POST = 'DELETE_POST',
    DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS',
    DELETE_POST_FAIL = 'DELETE_POST_FAIL'
}

// FETCH POSTS

interface FetchProfiles {
    type: ProfilesActionTypes.FETCH_POSTS;
}


interface FetchProfilesFail {
    type: ProfilesActionTypes.FETCH_POSTS_FAIL;
}

interface AxiosRequestConfig {
    headers: any;
}

export const fetchProfiles = () => {
    return new Promise<AxiosResponse<Profile[]>>((resolve, reject) => {    
    
        posts.post('/api/item/getItems')
            .then((res) => {
                console.log(res.data);
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    });
}

// ADD POST

interface AddProfile {
    type: ProfilesActionTypes.ADD_POST;
}

interface AddProfileSuccess {
    type: ProfilesActionTypes.ADD_POST_SUCCESS;
    payload: Profile;
}

interface AddProfileFail {
    type: ProfilesActionTypes.ADD_POST_FAIL;
}


export const addProfile = (name: string) => {
    return new Promise<string>((resolve, reject) => {    
    
        posts.post('/api/item/addItem', name)
            .then((res) => {
                console.log(res.data);
                console.log('dfdf');
                resolve(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    });
}


// EDIT POST

interface EditProfile {
    type: ProfilesActionTypes.EDIT_POST;
}

interface EditProfileSuccess {
    type: ProfilesActionTypes.EDIT_POST_SUCCESS;
    payload: Profile;
}

interface EditProfileFail {
    type: ProfilesActionTypes.EDIT_POST_FAIL;
}

export const editProfile = (id: string, name: string) => {
    return new Promise<boolean>((resolve, reject) => {    
    
        posts.post('/api/item/updateItem', {id, name})
            .then((res) => {
                console.log(res.data);
                resolve(true);
            })
            .catch(err => {
                console.log(err);
            })
    });
}


// DELETE POST

interface DeleteProfile {
    type: ProfilesActionTypes.DELETE_POST;
}

interface DeleteProfileSuccess {
    type: ProfilesActionTypes.DELETE_POST_SUCCESS;
    payload: number;
}

interface DeleteProfileFail {
    type: ProfilesActionTypes.DELETE_POST_FAIL;
}

export const deleteProfile = (id : string) => {

    return new Promise<boolean>((resolve, reject) => {        
        posts.post('/api/item/deleteItems', {id : id})
            .then((res) => {
                console.log(res.data);
                resolve(true);
            })
            .catch(err => {
                console.log(err);
            })
    });
}


export type ProfilesAction =
    | FetchProfiles
    | FetchProfilesFail
    | AddProfile
    | AddProfileSuccess
    | AddProfileFail
    | EditProfile
    | EditProfileSuccess
    | EditProfileFail
    | DeleteProfile
    | DeleteProfileSuccess
    | DeleteProfileFail;