"use client"
import React from 'react'
import { ReactTyped } from 'react-typed'

const Landing = () => {
  return (
    <div className='bg-gray-700 h-screen'>
        <div className='flex bg-gray-600 justify-between text-teal-300 p-5 pl-7 pr-7'>
            <h1 className='text-3xl font-extrabold'>Hire Ai</h1>
            <p className='italic text-xl font-bold'>Hire Quick, Hire Fast.</p>
        </div>
        <div className='m-30 flex flex-col justify-center gap-8 text-center items-center'>
            <h1 className='text-teal-300 text-8xl font-extrabold'>
                Hire Ai
            </h1>
            <p className='text-teal-300 text-2xl font-bold italic'>
                The only place you need to hire the best talent.
            </p>
            <p className='bg-gray-300 text-gray-700 p-3 text-lg italic font-extrabold rounded-lg'>Get access to <ReactTyped  className="underline" typeSpeed={50} backSpeed={50} loop strings={["PeopleGPT", "Resume Parser"]}/></p>
            <button className='bg-teal-300 text-gray-700 shadow-teal-200 shadow-md active:translate-y-1 hover:translate-y-0.5 transition duration-300 font-extrabold text-xl rounded-3xl p-3'><a href='/dashboard'>Start Now</a></button>
        </div>

    </div>
  )
}

export default Landing