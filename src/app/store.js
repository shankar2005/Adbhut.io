import { configureStore } from '@reduxjs/toolkit'
import apis from '../features/apis/apis'
import viewModeSlice from '../features/view/viewModeSlice'

const store = configureStore({
    reducer: {
        [apis.reducerPath]: apis.reducer,
        viewMode: viewModeSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apis.middleware),
})

export default store