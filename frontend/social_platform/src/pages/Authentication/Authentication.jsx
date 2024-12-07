import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";


const Authentication = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50">
    <div className="relative flex-1">
     
      <img
        className="h-full w-full object-cover transition-transform duration-700 ease-in-out hover:scale-110 hover:brightness-90"
        src="https://cdn.culture.ru/images/e7737535-576d-5719-a277-2e8ce1e50cf2"
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none"></div>
      <h1 className="absolute bottom-10 left-10 text-4xl font-bold text-white drop-shadow-lg">
        Hayallerini Paylaş!
      </h1>
    </div>
  
   
    <div className="flex flex-col justify-center items-center flex-1 bg-white relative z-10">
      <div className="relative p-10 bg-white rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500 ease-in-out">
        
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 opacity-90 blur-sm shadow-lg"></div>
        
       
        <div className="relative z-10 p-6 bg-white rounded-xl shadow-xl transform perspective-500 hover:scale-110">
          <div className="flex flex-col items-center mb-5 space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">Sosyal Medya</h1>
            <p className="text-center text-gray-600">
              İlham alın, ilham verin, hayallerinizi paylaşın ve diğerleriyle birlikte büyüyün.
            </p>
          </div>
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Authentication;
