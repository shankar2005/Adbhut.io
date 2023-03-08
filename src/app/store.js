import { configureStore } from '@reduxjs/toolkit'
import apis from '../features/apis/apis'

const store = configureStore({
    reducer: {
        [apis.reducerPath]: apis.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apis.middleware),
})

export default store