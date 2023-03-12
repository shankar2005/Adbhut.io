import { configureStore } from '@reduxjs/toolkit'
import apis from '../features/apis/apis'
import authSlice from '../features/auth/authSlice'
import filterSlice from '../features/filter/filterSlice'
import projectSlice from '../features/project/projectSlice'
import viewModeSlice from '../features/view/viewModeSlice'

const store = configureStore({
    reducer: {
        [apis.reducerPath]: apis.reducer,
        viewMode: viewModeSlice,
        auth: authSlice,
        project: projectSlice,
        filter: filterSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apis.middleware),
})

export default store