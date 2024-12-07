import axios from "axios";
import { api, API_BASE_URL } from "../../config/api";
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS } from "./post.actionType";

export const createPostAction = (postdata) => async (dispatch, getState) => {
    dispatch({ type: CREATE_POST_REQUEST });

    try {
        const { data } = await api.post('api/posts', postdata);
        dispatch({ type: CREATE_POST_SUCCESS, payload: data });
        
       
        const { auth } = getState(); 
        
        console.log("Gönderi oluşturuldu:", data);
        console.log("Gönderiyi oluşturan kullanıcı:", auth.user); 

    } catch (error) {
        console.log("Gönderi oluşturma hatası:", error);
        dispatch({ type: CREATE_POST_FAILURE, payload: error });
    }
};


export const getAllPostAction=()=>async(dispatch)=>{

    dispatch({type:GET_ALL_POST_REQUEST})

    try {
        const {data}=await api.get('api/posts');  
        dispatch({type:GET_ALL_POST_SUCCESS,payload:data});
        console.log("gonderi  ALMA verileri ",data)
    } catch (error) {

        console.log(error);
        dispatch({type:GET_ALL_POST_FAILURE,payload:error})
        
    }

}

export const getUsersPostAction=(userId)=>async(dispatch)=>{

    dispatch({type:GET_USERS_POST_REQUEST})

    try {
        const {data}=await api.get(`/posts/user/${userId}`);  
        dispatch({type:GET_USERS_POST_SUCCESS,payload:data});
        console.log("gonderinin useri ",data)
    } catch (error) {

        console.log(error);
        dispatch({type:GET_USERS_POST_FAILURE,payload:error})
        
    }

};

export const likePostAction=(postId)=>async(dispatch)=>{

    dispatch({type:LIKE_POST_REQUEST})

    try {
        const {data}=await api.put(`/api/posts/like/${postId}`);  
        dispatch({type:LIKE_POST_SUCCESS,payload:data});
        console.log("begenilen gonderinin verileri ",data)
    } catch (error) {

        console.log(error);
        dispatch({type:LIKE_POST_FAILURE,payload:error})
        
    }

};

export const createCommentAction = (requestData) => async (dispatch, getState) => {
    dispatch({ type:CREATE_COMMENT_REQUEST});

    try {
        const { data } = await api.post(`/api/comments/post/${requestData.postId}`,requestData.data);
        dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
        
       
        const { auth } = getState(); 
        
        console.log("yorum oluşturuldu:", data);
        console.log("yorumu oluşturan kullanıcı:", auth.user); 

    } catch (error) {
        console.log("yorum oluşturma hatası:", error);
        dispatch({ type: CREATE_COMMENT_FAILURE, payload: error });
    }
};

export const getPostsByUserId = (userId) => async (dispatch) => {
    dispatch({ type: GET_USERS_POST_REQUEST });
    try {
      const { data } = await axios.get(`${API_BASE_URL}/posts/user/${userId}`);
      dispatch({ type: GET_USERS_POST_SUCCESS, payload: data }); // Yalnızca o kullanıcının gönderilerini Redux'a aktarıyoruz
    } catch (error) {
      dispatch({ type: GET_USERS_POST_FAILURE, payload: error.message });
    }
  };
  
