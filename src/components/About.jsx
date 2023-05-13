import React from 'react'
import Logo from "../img/fi1.png";

const About = () => {
  return (
    <>
      <div className='md:text-center   lg:flex gap-10 mt-10 p-6'>
        <div className='flex-1 mx-5 mb-6 mt-5'>
          <h1 className='text-5xl font-bold mb-5 '>About Us</h1>
          <p className='text-xl text-justify'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
          eaque fugit distinctio est nam voluptatum architecto, porro iusto
          deserunt recusandae ipsa minus eos ssnt, dolores illo repellat facere
          suscisppit!</p>
        </div>
        <div className='flex-1 mx-5'>
          <img src={Logo} alt='photo'  className='w-96' />
        </div>

      </div>

    </>
  )
}

export default About