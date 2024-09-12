import { IError, IOrder, IPaginationRes, IQuery } from '../../interfaces';
import {
    createAsyncThunk,
    createSlice,
    isFulfilled,
    isPending,
    isRejected,
} from '@reduxjs/toolkit';
import { orderService } from '../../services';
import { handleAsyncThunkError } from '../../utils';

interface IState {
    isLoading: boolean;
    error: IError;
    orders: IPaginationRes<IOrder>;
}
const initialState: IState = {
    isLoading: false,
    error: null,
    orders: null,
};

const getAll = createAsyncThunk<
    IPaginationRes<IOrder>,
    { query?: IQuery },
    { rejectValue: IError }
>('orderSlice/getAll', async ({ query }, { rejectWithValue }) => {
    try {
        const { data } = await orderService.getAll(query);
        return data;
    } catch (err) {
        return rejectWithValue(handleAsyncThunkError(err));
    }
});
const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addMatcher(isPending(getAll), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isRejected(getAll), (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addMatcher(isFulfilled(getAll), (state) => {
                state.isLoading = false;
                state.error = null;
            }),
});

const { actions, reducer: orderReducer } = orderSlice;

const orderActions = { ...actions, getAll };

export { orderActions, orderSlice, orderReducer };
