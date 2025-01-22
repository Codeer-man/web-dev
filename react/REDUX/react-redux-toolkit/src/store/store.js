import {configureStore} from "@reduxjs/toolkit"
import  counterReducer  from "../features/counter/CounterSlice"

export const Store = configureStore({
    reducer: {
        counter: counterReducer
    },
})