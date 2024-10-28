import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
} from '@reduxjs/toolkit';

import { IError, ILogin, IManager } from '../../interfaces';
import { authService } from '../../services';
import { handleAsyncThunkError } from '../../utils';

interface IState {
    isLoading: boolean;
    error: IError;
    manager: IManager;
    isAuthenticated: boolean;
}

const initialState: IState = {
    isLoading: false,
    error: null,
    manager: null,
    isAuthenticated: null,
};

const login = createAsyncThunk<
    IManager,
    { loginData: ILogin },
    { rejectValue: IError }
>('authSlice/login', async ({ loginData }, { rejectWithValue }) => {
    try {
        return await authService.login(loginData);
    } catch (err) {
        return rejectWithValue(handleAsyncThunkError(err));
    }
});

const getMe = createAsyncThunk<IManager, void, { rejectValue: IError }>(
    'authSlice/getMe',
    async (_, { rejectWithValue }) => {
        try {
            return await authService.getMe();
        } catch (err) {
            return rejectWithValue(handleAsyncThunkError(err));
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        isAuthenticated: (state) => {
            const access = authService.getAccessToken();
            access
                ? (state.isAuthenticated = true)
                : (state.isAuthenticated = false);
        },
    },
    extraReducers: (builder) =>
        builder
            .addMatcher(isFulfilled(login, getMe), (state, action) => {
                state.manager = action.payload;
            })
            .addMatcher(isPending(login), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isRejected(login, getMe), (state, action) => {
                state.isLoading = false;
                state.error = {
                    message: action.payload.message,
                    statusCode: action.payload.statusCode,
                };
            })
            .addMatcher(isFulfilled(login), (state) => {
                state.isLoading = false;
                state.error = null;
            }),
});

const { actions, reducer: authReducer } = authSlice;

const authActions = { ...actions, login, getMe };

export { authReducer, authActions, authSlice };
