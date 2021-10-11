import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import { errorsReducer, ErrorsState } from './reducers/errorsReducer';
// import { ErrorsAction } from './actions/errorsActions'

// import { postsReducer, PostsState } from './reducers/postsReducer';
// import { PostsAction } from './actions/postsActions';

import { authReducer, AuthState } from './reducers/authReducer';
import { AuthAction } from './actions/authActions'
 
export interface RootState {
    // readonly errors: ErrorsState;
    // readonly posts: PostsState;
    readonly auth: AuthState;
}

const rootReducer = combineReducers<RootState>({
    // errors: errorsReducer,
    // posts: postsReducer,
    auth: authReducer,
});

// export type RootActions = PostsAction | ErrorsAction | AuthAction; // | CommentsAction | etc.
export type RootActions =  AuthAction; // | CommentsAction | etc.

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions>)
    )
);
