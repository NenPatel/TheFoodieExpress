import React, { useState } from 'react'
// import { getDatabase } from "firebase/database";
import { getDatabase, ref, set } from "firebase/database";

const Contact = () => {

  const [data,setData] = useState({
    name:"",
    email:"",
    message:""
  })
  const db = getDatabase();
  const handleChange = (event) => {
    let newMess = {[event.target.name]: event.target.value}
    setData({...data,...newMess})
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    set(ref(db, 'info/' + Math.floor((Math.random() * 100000) + 1)), {
      username: data.name,
      email: data.email,
      message : data.message
    });
    alert("Data Submitted")
    setData({name:"" , email:"" , message:""})
  }

  return (
    <>
        <div>
      <section className="text-gray-700 body-font relative">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Lets Connect and share your Thoughts and any Suggestions.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name" 
                    value={data.name}
                    onChange={(event) => handleChange(event)}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email" 
                    value={data.email}
                    onChange={(event) => handleChange(event)}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message" 
                    value={data.message}
                    onChange={(event) => handleChange(event)}
                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button onClick={handleSubmit} className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Submit
                </button>
              </div>
             
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default Contact