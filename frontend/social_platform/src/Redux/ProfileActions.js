// Redux Actions - Kullanıcı profili için aksiyon
export const getUserProfileAction = (userId) => async (dispatch) => {
    dispatch({ type: GET_PROFILE_REQUEST });
    try {
        const { data } = await axios.get(`${API_BASE_URL}/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,  // Kullanıcı JWT'sini header'a ekle
            },
        });
        dispatch({ type: GET_PROFILE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_PROFILE_FAILURE, payload: error });
    }
};