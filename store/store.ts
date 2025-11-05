import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { rateSlice } from "./reducers/rateSlice";
import { rawgApi } from "./services/rawgApi";

const rootReducer = combineReducers({
    rateSlice: rateSlice.reducer,
    [rawgApi.reducerPath]: rawgApi.reducer
})

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(rawgApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]