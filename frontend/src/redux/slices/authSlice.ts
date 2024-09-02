import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
} from '@reduxjs/toolkit';
import { IError, ILogin, IManager } from '../../interfaces';
import { authService } from '../../services';
import axios from 'axios';

interface IState {
    isLoading: boolean;
    error: IError;
    manager: IManager;
}

const initialState: IState = {
    isLoading: false,
    error: null,
    manager: null,
};

const login = createAsyncThunk<
    IManager,
    { loginData: ILogin },
    { rejectValue: IError }
>('authSlice/login', async ({ loginData }, { rejectWithValue }) => {
    try {
        return await authService.login(loginData);
    } catch (err) {
        let errorMsg = 'An unexpected error occurred';
        let statusCode = 500;

        if (axios.isAxiosError(err)) {
            errorMsg = err.response?.data?.messages[0] || errorMsg;
            statusCode = err.response?.data?.statusCode || 500;
        } else {
            const error = err as Error;
            errorMsg = error.message;
        }
        return rejectWithValue({ message: errorMsg, statusCode });
    }
});
const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.manager = action.payload;
            })
            .addMatcher(isPending(login), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isRejected(login), (state, action) => {
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

const authActions = { ...actions, login };

export { authReducer, authActions, authSlice };
