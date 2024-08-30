import { createSlice } from '@reduxjs/toolkit'
import { IManager } from '../../interfaces'

interface IState {
    isLoading: boolean
    error: Error | null
    manager: IManager
}

const initialState: IState = {
    isLoading: false,
    error: null,
    manager: null,
}
const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {},
})

const { actions, reducer: authReducer } = authSlice

const authActions = { ...actions }

export { authReducer, authActions, authSlice }
