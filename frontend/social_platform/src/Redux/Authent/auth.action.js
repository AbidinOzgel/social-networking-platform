import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./auth.actionType";


export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);
        if (data.token) {
            localStorage.setItem("jwt", data.token); 
            dispatch({ type: LOGIN_SUCCESS, payload: data.token });  
            
        }
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error });
    }
};


export const RegisterUserAction=(loginData)=>async(dispatch)=>
    {
    
        dispatch({type:LOGIN_REQUEST})
        try {
            
            const {data}=await axios.post(`${API_BASE_URL}/auth/signup`,loginData.data);
            if(data.token){
                localStorage.setItem("jwt",data.token)
            }
            console.log("kayit",data)
            dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
    
        } catch (error) {
            
            dispatch({type:LOGIN_FAILURE,payload:error})
        }
    }

    export const getProfileAction = (jwt) => async (dispatch) => {
        dispatch({ type: GET_PROFILE_REQUEST });
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
                headers: {
                    Authorization: `Bearer ${jwt}`  
                },
            });
            dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
            console.log("get profile ",data)
        } catch (error) {
            dispatch({ type: GET_PROFILE_FAILURE, payload: error });
        }
    };
    
    export const updateProfileAction = (profileData) => async (dispatch, getState) => {
        try {
            const { auth } = getState();
            const response = await axios.put(`${API_BASE_URL}/api/users`, profileData, {
                headers: {
                    Authorization: `Bearer ${auth.jwt}`, 
                },
            });
    
            dispatch({
                type: 'UPDATE_PROFILE_SUCCESS',
                payload: response.data,  
            });
        } catch (error) {
            dispatch({
                type: 'UPDATE_PROFILE_FAILURE',
                payload: error.message,
            });
        }
    };

    export const sendPasswordResetEmail = (email) => async (dispatch) => {
        try {
          await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
          return Promise.resolve(); 
        } catch (error) {
          return Promise.reject(error.response.data.message || "Bir hata oluştu.");
        }
      };
      
      // forgot password den acilacak. eger emailde linke tiklanirsa bu sayfa acilacak
      export const resetPassword = (newPassword, token) => async (dispatch) => {
        try {
          await axios.post(`${API_BASE_URL}/auth/reset-password`, { password: newPassword, token });
          return Promise.resolve(); 
        } catch (error) {
          return Promise.reject(error.response.data.message || "Bir hata oluştu.");
        }
      };
    