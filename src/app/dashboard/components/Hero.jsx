"use client"
import React from 'react'

const Dashboard = () => {
  return (
    <div className='bg-gray-400 min-h-screen'>
      <div className='flex flex-row min-h-screen'>
        <div className='bg-gray-600 text-gray-300 w-[250px] p-5 flex flex-col'>
          <div>
            <h1 className='text-4xl font-extrabold text-teal-300'>Hire AI</h1>
            <p className='text-lg text-teal-300'>AI Powered Recruitment</p>
          </div>
          <div className='flex flex-col mt-20'>
            <a href='/dashboard' className='text-2xl font-extrabold bg-gray-500 rounded-2xl p-3 text-gray-300 mb-5'>Dashboard</a>
            <a href='/dashboard/peoplegpt' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mb-5'>PeopleGPT</a>
            <a href='/dashboard/resumeparser' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300'>Resume Parser</a>
          </div>
        </div>
        
        <div className='flex-1 flex flex-col bg-gray-700'>
          <div className='flex flex-row justify-between items-center px-5 py-4 border-b border-gray-200'>
            <h1 className='text-2xl md:text-4xl font-extrabold text-gray-300'>Dashboard Overview</h1>
            <button className='text-lg md:text-xl font-extrabold text-gray-300 bg-gray-600 p-3 rounded-2xl'>
              SignOut
            </button>
          </div>
          <div className='flex-1 overflow-y-auto bg-gray-700'>
            <div className='p-5 md:p-10 lg:p-12'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-5 mb-10'>
                <div className='text-gray-300 font-bold flex flex-col bg-gray-600 rounded-2xl p-6 md:p-8 gap-5'>
                  <h1 className='text-xl md:text-lg lg:text-xl border-white'>Total Candidates</h1>
                  <p className='text-2xl md:text-3xl font-bold'>150</p>
                </div>
                <div className='text-gray-300 font-bold flex flex-col bg-gray-600 rounded-2xl p-6 md:p-10 gap-5'>
                  <h1 className='text-xl md:text-lg lg:text-xl border-white'>Open Positions</h1>
                  <p className='text-2xl md:text-3xl font-bold'>5000</p>
                </div>
                <div className='text-gray-300 font-bold flex flex-col bg-gray-600 rounded-2xl p-6 md:p-10 gap-5'>
                  <h1 className='text-xl md:text-lg lg:text-xl border-white'>Active Campaigns</h1>
                  <p className='text-2xl md:text-3xl font-bold'>25</p>
                </div>
              </div>
              
              <div className='flex flex-col gap-3'>
                <h1 className='text-gray-300 text-2xl md:text-4xl font-extrabold border-gray-600 border-b-2'>Recent Activity</h1>
                <div className='bg-gray-600 w-full mt-3 rounded-2xl'>
                  <div className='text-gray-300 p-5 font-extrabold text-sm md:text-lg'>
                    <ul className='flex flex-col gap-6'>
                      <div className='flex flex-col sm:flex-row gap-3'>
                        <p className='text-gray-600 text-xs md:text-sm bg-gray-300 rounded-2xl p-3 whitespace-nowrap'>5 minutes ago</p>
                        <li className='border-b-2 border-white pb-2'>New candidate Sarah Chen matched for Senior ML Engineer position</li>
                      </div>
                      <div className='flex flex-col sm:flex-row gap-3'>
                        <p className='text-gray-600 text-xs md:text-sm bg-gray-300 rounded-2xl p-3 whitespace-nowrap'>7 minutes ago</p>
                        <li className='border-b-2 border-white pb-2'>Resume parsing completed for 5 new candidates</li>
                      </div>
                      <div className='flex flex-col sm:flex-row gap-3'>
                        <p className='text-gray-600 text-xs md:text-sm bg-gray-300 rounded-2xl p-3 whitespace-nowrap'>10 minutes ago</p>
                        <li className='border-b-2 border-white pb-2'>Outreach campaign "Frontend Developer Drive" sent to 25 candidates</li>
                      </div>
                    </ul>
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

export default Dashboard