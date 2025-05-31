"use client"
import React from 'react'

const Hero = () => {
  return (
    <div className='bg-gray-400 min-h-screen'>
      <div className='flex flex-row min-h-screen'>
        <div className='bg-gray-600 text-gray-300 w-[250px] p-5 flex flex-col'>
          <div>
            <h1 className='text-4xl font-extrabold'>Hire AI</h1>
            <p className='text-lg'>AI Powered Recruitment</p>
          </div>
          <div className='flex flex-col mt-20'>
            <a href='/' className='text-2xl font-extrabold bg-gray-500 rounded-2xl p-3 text-gray-300 mb-5'>PeopleGPT</a>
            <a href='/' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300'>Resume Parser</a>
          </div>
        </div>
        
        <div className='flex-1 flex flex-col bg-gray-700'>
          <div className='flex flex-row justify-between items-center px-5 py-4 border-b border-gray-200'>
            <h1 className='text-2xl md:text-4xl font-extrabold text-gray-300'>PeopleGPT</h1>
            <button className='text-lg md:text-xl font-extrabold text-gray-300 bg-gray-600 p-3 rounded-2xl'>
              SignOut
            </button>
          </div>
          <div className='flex-1 overflow-y-auto bg-gray-700'>
            <div className='p-5 md:p-10 lg:p-12'>
              <div>
                <input placeholder='Search 🔎' className='bg-white text-black text-lg font-bold rounded-2xl p-3 w-[720px]'></input>
              </div>
              <div className='mt-10'>
                <h1 className='text-4xl text-gray-300 font-extrabold'>Search Results</h1>
                <div className='grid grid-cols-3 mt-10 gap-5'>
                  <div className='bg-gray-300 text-gray-700 rounded-2xl p-5 font-bold'>
                    <h1 className='text-3xl bg-gray-700 text-gray-300 text-center rounded-2xl p-2 mb-3'>Eshaan</h1>
                    <p className='mb-2'>College : MIT</p>
                    <p className='mb-2'>Degree : BTECH</p>
                    <p>Skills : Python, C, SQL, C#, Git, MongoDB, Js</p>
                  </div>
                  <div className='bg-gray-300 text-gray-700 rounded-2xl p-5 font-bold'>
                    <h1 className='text-3xl bg-gray-700 text-gray-300 text-center rounded-2xl p-2 mb-3'>Eshaan</h1>
                    <p className='mb-2'>College : MIT</p>
                    <p className='mb-2'>Degree : BTECH</p>
                    <p>Skills : Python, C, SQL, C#, Git, MongoDB, Js</p>
                  </div>
                  <div className='bg-gray-300 text-gray-700 rounded-2xl p-5 font-bold'>
                    <h1 className='text-3xl bg-gray-700 text-gray-300 text-center rounded-2xl p-2 mb-3'>Eshaan</h1>
                    <p className='mb-2'>College : MIT</p>
                    <p className='mb-2'>Degree : BTECH</p>
                    <p>Skills : Python, C, SQL, C#, Git, MongoDB, Js</p>
                  </div>

                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero