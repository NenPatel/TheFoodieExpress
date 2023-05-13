import React, { useState } from 'react'
import axios from "axios";
import { data } from 'autoprefixer';

const baseURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";


const Receipe = () => {
    const [fact, setFact] = useState({})
    const [term,setTerm] = useState('')
    const fetchData = () => {
        axios.get(baseURL+term).then((response) => {
            setFact(response.data);
          });
          console.log(fact.meals);
          setTerm("")
    }
  return (
    <>
        <div className='mx-auto'>
            {/* <label>Enter keyword</label> */}
            <input type="text" placeholder='Enter keyword' className='pl-2 m-auto h-8' name='keyword' value={term} onChange={(event) => setTerm(event.target.value)} />
            <button className=" bg-indigo-500 hover:bg-indigo-700 m-auto focus:bg-indigo-700 text-white rounded-lg px-3 py-1 mx-3 font-semibold" onClick={fetchData}>Search</button>
        </div>
        <br/>
        {/* <ul> */}
            {fact.meals && fact.meals.map((val,id) =>  {
                return (
                    <div key={id}>
                    <li className='text-violet-900 font-bold'>{val.strMeal}
                    <p className='text-black font-normal'>{val.strInstructions}</p>
                    </li>
                    <br/>
                    </div>
                );
            })
            }
        {/* </ul> */}
    </>
  )
}

export default Receipe