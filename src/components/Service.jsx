import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../img/r3.png";

const Service = () => {
  const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center flex-col'>
      <div className='text-center mb-5'>
        <h1 className='font-bold text-4xl m-5'>Services</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vestibulum  ipsum dolor sit amet, consectetur adipiscing velit nec lectus dapibus, eu venenatis  ipsum dolor sit amet, consectetur adipiscing  est tristique. Integer ac metus a dolor tempor fringilla. Maecenas vel odio ut arcu auctor dignissim suscipit quis libero. Praesent sed metus ac arcu tincidunt tristique. Nulla elit sapien, sagittis non blandit eu, mattis.</p>
      </div>
      <div className=''>
        <img src={Logo} className="w-96 " alt="photo" />
      </div>
      <div>
        <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" onClick={() => navigate("/receipe")}>Find Receipes </button>
      </div>
    </div>
  )
}

export default Service