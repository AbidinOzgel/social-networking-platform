    import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";


    //tarayici hatalarinin engellenmesi icin ilk durumlarda default degerlerin verilmesi gerekiyor
    //bunun icin javadaki enum yapisina benzer yapi kuruldu
    const initialState={
        jwt:null,
        error:null,
        loading:false,
        user:null
    }

    export const authReducer=(state=initialState,action)=>{

        switch (action.type) {
            case LOGIN_REQUEST:
            case REGISTER_REQUEST:
            case GET_PROFILE_REQUEST    :    
                return {...state,loading:true,error:null}

            case GET_PROFILE_SUCCESS:
                return {...state,user:action.payload,error:null,loading:false}   
                
            case LOGIN_SUCCESS :
            case REGISTER_SUCCESS:
                return {...state,jwt:action.payload, loading:false,error:null}
            
            case LOGIN_FAILURE:
            case REGISTER_FAILURE:
                return {...state,loading:false,error:action.payload}
                case UPDATE_PROFILE_SUCCESS:
                    return {
                    ...state,
                    user: action.payload,  // Backend'den gelen kullanıcı verisi
                    };
                case UPDATE_PROFILE_FAILURE:
                    return {
                    ...state,
                    error: action.payload,
                    };
            
        
            default:

                return state;
        }
    }