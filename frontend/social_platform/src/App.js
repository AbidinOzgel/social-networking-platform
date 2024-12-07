import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/Authentication/HomePage/HomePage';
import Message from './pages/Authentication/Message/Message';
import { getProfileAction } from './Redux/Authent/auth.action';

function App() {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();


  let jwt = auth.jwt;

  useEffect(() => {
   
    const storedJwt = localStorage.getItem("jwt");
    if (storedJwt && !jwt) {
      jwt = storedJwt;
      dispatch({ type: "LOGIN_SUCCESS", payload: jwt }); 
    }

    if (jwt) {
      dispatch(getProfileAction(jwt));
    }
  }, [dispatch, jwt]); 

  return (
    <div className="">
      <Routes>
      

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />    
        <Route path='/*' element={auth.user ? <HomePage /> : <Authentication />} />
        <Route path='/message' element={<Message />} />
        <Route path='/*' element={<Authentication />} />
       
        
      </Routes>
    </div>
  );
}

export default App;
