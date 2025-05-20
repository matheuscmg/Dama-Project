import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/authReducer";
import companySlice from "./reducers/companyReducer";
import userSlice from "./reducers/userReducer"
import projectSlice from"./reducers/projectMomentReducer"


const store = configureStore({
    reducer:{
        auth:authSlice,
        company:companySlice,
        user:userSlice,
        project:projectSlice,
    }
});


export default store;