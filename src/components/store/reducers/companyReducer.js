

import { createSlice } from "@reduxjs/toolkit";
import axios,{DAMA_URL} from "../../axios/axiosLaravelConfig";



const companySlice = createSlice({
  name: "Company",
  initialState: {
    companyData: JSON.parse(sessionStorage.getItem("companyData")) || null
  },
  reducers: {
    aboutCompletCompany: (state, action) => {
      state.companyData = action.payload;
      sessionStorage.setItem("companyData", JSON.stringify(action.payload));
      console.log(state.companyData);
    }
  }
});

export const { aboutCompletCompany } = companySlice.actions;
export default companySlice.reducer;

// export const initializeCompanyData = () => {
//   return (dispatch, getState) => {
//     const token = getState().categorias.token;

//     axios
//       .get(`${DAMA_URL}/api/organization/about`, {
//         headers: {
//           Accept: "application/json",
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`
//         }
//       })
//       .then((response) => {
//         dispatch(aboutCompletCompany(response.data));
//       })
//       .catch((error) => {
//         console.error("Erro na requisição:", error);
//       });
//   };
// };
/*

import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "Company",
  initialState: {
    companyData: JSON.parse(sessionStorage.getItem("companyData")) || null
  },
  reducers: {
    aboutCompletCompany: (state, action) => {
      state.companyData = action.payload;
      sessionStorage.setItem("companyData", JSON.stringify(action.payload));
      console.log(state.companyData);
    }
  }
});

export const { aboutCompletCompany } = companySlice.actions;
export default companySlice.reducer;

*/