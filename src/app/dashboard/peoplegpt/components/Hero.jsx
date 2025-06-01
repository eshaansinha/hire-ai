"use client"
import React, { useEffect, useState } from 'react'

const Hero = () => {

  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])

  const retrivePeople = async() => {
    const response = await fetch("https://hire-ai-backend-wcrk.onrender.com/api/peoplegpt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: searchQuery,    // sending the user's search query
      max_results: 10        // limit to 10 results (adjust as needed)
    }),
  });
    const data = await response.json()

    setResults(data.results)
    // alert(JSON.stringify(data))
  }

  return (
    <div className='bg-gray-400 min-h-screen'>
      <div className='flex flex-row min-h-screen'>
        <div className='bg-gray-600 text-gray-300 w-[250px] p-5 flex flex-col'>
          <div>
            <h1 className='text-4xl font-extrabold text-teal-300'>Hire AI</h1>
            <p className='text-lg text-teal-300'>AI Powered Recruitment</p>
          </div>
          <div className='flex flex-col mt-20'>
            <a href='/dashboard' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mb-5'>Dashboard</a>
            <a href='/dashboard/peoplegpt' className='text-2xl font-extrabold bg-gray-500 rounded-2xl p-3 text-gray-300 mb-5'>PeopleGPT</a>
            <a href='/dashboard/resumeparser' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300'>Resume Parser</a>
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
                <input placeholder='Search 🔎' value={searchQuery} onChange = {(e) => {setSearchQuery(e.target.value)}} className='bg-white text-black text-lg font-bold rounded-2xl p-3 w-[720px]'></input>
                <button onClick={() => {retrivePeople()}} className='ml-5 text-lg font-bold text-gray-700 bg-gray-300 p-2 rounded-2xl hover:translate-y-0.5 transition duration-300 active:translate-y-1'>Search</button>
              </div>
              <div className='mt-10'>
                <h1 className='text-4xl text-gray-300 font-extrabold'>Search Results</h1>
                <div className='grid grid-cols-3 mt-10 gap-3'>
        {results.length > 0 ? (
          results.map((item, index) => (
            <div key={index} className='bg-gray-300 text-gray-700 rounded-2xl p-3 font-bold'>
              <h1 className='text-2xl bg-gray-700 text-gray-300 text-center rounded-2xl p-2 mb-3'>{item.candidate.name}</h1>
              <p className='mb-2'>Location : {item.candidate.location || 'N/A'}</p>
              <p className='mb-2'>Experience : {item.candidate.experience_years} years</p>
              <p className='mb-2'>Email : {item.candidate.email || 'N/A'}</p>
              <p className='mb-2'>Phone : {item.candidate.phone || 'N/A'}</p>
              <p className='mb-2'>Resume : {item.candidate.resume_filename || 'N/A'}</p>
              <p>Skills : {item.candidate.skills.join(', ')}</p>
              <p>Match Score : {item.match_score}%</p>
            </div>
          ))
        ) : (
          <p className='text-gray-400'>Loading/Waiting for results...</p>
        )}
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