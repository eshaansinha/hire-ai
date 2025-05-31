"use client"
import React from 'react'
import Image from 'next/image'
import Upload from "../../../../../public/Upload.gif"
import { ReactTyped } from 'react-typed'

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
            <a href='/dashboard' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mb-5'>Dashboard</a>
            <a href='/dashboard/peoplegpt' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mb-5'>PeopleGPT</a>
            <a href='/dashboard/resumeparser' className='text-2xl font-extrabold bg-gray-500 rounded-2xl p-3 text-gray-300'>Resume Parser</a>
          </div>
        </div>
        
        <div className='flex-1 flex flex-col bg-gray-700'>
          <div className='flex flex-row justify-between items-center px-5 py-4 border-b border-gray-200'>
            <h1 className='text-2xl md:text-4xl font-extrabold text-gray-300'>Resume Parser</h1>
            <button className='text-lg md:text-xl font-extrabold text-gray-300 bg-gray-600 p-3 rounded-2xl'>
              SignOut
            </button>
          </div>
          <div className='flex-1 overflow-y-auto bg-gray-700'>
            <div className='p-5 md:p-10 lg:p-12'>
                <div className='bg-gray-300 rounded-2xl ml-10 mr-10'>
                    <div className='flex flex-col justify-center gap-5 items-center p-10'>
                        <Image src={Upload} alt={"Uplaod Image"} width={150} height={100} className='rounded-2xl'/>
                        <h1 className='text-3xl text-gray-700 font-bold'>Click to upload resume</h1>
                        <p className='text-xl'>Supports PDF, DOC, DOCX</p>
                        <button className='bg-gray-700 text-gray-300 font-bold p-3 text-lg rounded-2xl'>Choose Files</button>
                    </div>
                </div>
                <div className='mt-10'>
                    <h1 className='text-gray-300 font-extrabold text-3xl'>Parsing Results:</h1>
                    <div className='bg-gray-300 mt-10 p-5 rounded-2xl'>
                        <ReactTyped typeSpeed={40} className="text-gray-700 bg-grey font-bold text-xl" strings={["Sample ->Eshaan Sinha, Skills : Coding, Experience : 5 years"]}/>
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