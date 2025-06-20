"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React, { useDeferredValue, useEffect, useState } from 'react'

const Dashboard = () => {

  const { data:session, status } = useSession()
  const [resumeUp, setResumeUp] = useState("0") // Set default value
  const [loading, setLoading] = useState(false)
  const [runningCamp, setRunningCamp] = useState("0") // Initialize with "0"
  const [totalCan, setTotalCan] = useState("0")

  useEffect(() => {
    const registerUser = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch(`https://hire-ai-backend-wcrk.onrender.com/api/users/register`, {
            method: "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              "name" : session.user.name,
              "email" : session.user.email
            })
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('User registered successfully:', data);
        } catch (error) {
          console.error('Error registering user:', error);
        }
      }
    };

    const getData = async() => {
      // Only fetch if we have a valid session and email
      if (status === "authenticated" && session?.user?.email) {
        setLoading(true)
        
        try{
          // Fetch resumes data
          const resumeRes = await fetch(`https://hire-ai-backend-wcrk.onrender.com/api/v1/analytics/users/${session.user.email}/resumes_uploaded`, {
            headers : {
              "Content-type" : "application/json"
            }
          })
          
          if (!resumeRes.ok) {
            throw new Error(`HTTP error! status: ${resumeRes.status}`);
          }
          
          const resumeData = await resumeRes.json()
          console.log('Resume data:', resumeData)
          
          // Handle different response formats for resumes
          if (typeof resumeData === 'number') {
            setResumeUp(resumeData.toString())
          } else if (resumeData.count !== undefined) {
            setResumeUp(resumeData.count.toString())
          } else if (resumeData.resumes_uploaded !== undefined) {
            setResumeUp(resumeData.resumes_uploaded.toString())
          } else {
            setResumeUp("0")
          }

          // Fetch campaigns data
          const campaignRes = await fetch(`https://hire-ai-backend-wcrk.onrender.com/api/v1/analytics/users/${session.user.email}/campaigns`, {
            headers : {
              "Content-type" : "application/json"
            }
          })
          
          if (!campaignRes.ok) {
            throw new Error(`HTTP error! status: ${campaignRes.status}`);
          }
          
          const campaignData = await campaignRes.json()
          console.log('Campaign data:', campaignData)
          
          // Handle campaign data - assuming it's an array like you showed
          if (Array.isArray(campaignData)) {
            setRunningCamp(campaignData.length.toString())
          } else if (typeof campaignData === 'number') {
            setRunningCamp(campaignData.toString())
          } else if (campaignData.count !== undefined) {
            setRunningCamp(campaignData.count.toString())
          } else {
            setRunningCamp("0")
          }

          const totalCandidatesReq = await fetch(`https://hire-ai-backend-wcrk.onrender.com/api/v1/analytics/users/${session.user.email}/candidates/summary`)
          const totalCandidatesRes = await totalCandidatesReq.json()
          setTotalCan(totalCandidatesRes.total_candidates)

        }
        catch(err){
          console.error('Error fetching data:', err)
          setResumeUp("0") // Set fallback values
          setRunningCamp("0")
        } finally {
          setLoading(false)
        }
      }
    }

    registerUser();
    getData(); // This will only run when session is authenticated

  }, [status, session?.user?.email]); // Add session.user.email as dependency


  if (status === "loading") {
          return (
              <div className='h-screen flex text-3xl'>
                  <h1>Loading...</h1>
              </div>
          )
      }
  
  if (status === "unauthenticated") {
      signIn()
  }

  if (status === "authenticated") {
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
            <a href='/dashboard/generatequestions' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mt-5'>Ai Questions</a>
            <a href='/dashboard/outreach' className='text-2xl font-extrabold bg-gray-700 rounded-2xl p-3 text-gray-300 mt-5'>Outreach</a>
          </div>
        </div>
        
        <div className='flex-1 flex flex-col bg-gray-700'>
          <div className='flex flex-row justify-between items-center px-5 py-4 border-b border-gray-200'>
            <h1 className='text-2xl md:text-4xl font-extrabold text-gray-300'>Dashboard Overview</h1>
            <h1 className='text-lg md:text-xl font-extrabold text-gray-600 bg-gray-300 rounded-lg p-1'>Welcome {session.user.name.split(" ")[0]}!👋</h1>
            <button onClick={() => {signOut()}} className='text-lg md:text-xl font-extrabold text-gray-300 bg-gray-600 p-3 rounded-2xl hover:translate-y-1 transition duration-300 active:translate-y-0.5'>
              SignOut
            </button>
          </div>
          <div className='flex-1 overflow-y-auto bg-gray-700'>
            <div className='p-5 md:p-10 lg:p-12'>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-5 mb-10'>
                <div className='text-gray-300 font-bold flex flex-col bg-gray-600 rounded-2xl p-6 md:p-8 gap-5'>
                  <h1 className='text-xl md:text-lg lg:text-xl border-white'>Candidates</h1>
                  <p className='text-2xl md:text-3xl font-bold'>{loading ? "Loading..." : totalCan}</p>
                </div>
                <div className='text-gray-300 font-bold flex flex-col bg-gray-600 rounded-2xl p-6 md:p-10 gap-5'>
                  <h1 className='text-xl md:text-lg lg:text-xl border-white'>Resumes Uploaded</h1>
                  <p className='text-2xl md:text-3xl font-bold'>
                    {loading ? "Loading..." : resumeUp}
                  </p>
                </div>
                <div className='text-gray-300 font-bold flex flex-col bg-gray-600 rounded-2xl p-6 md:p-10 gap-5'>
                  <h1 className='text-xl md:text-lg lg:text-xl border-white'>Campaigns Running</h1>
                  <p className='text-2xl md:text-3xl font-bold'>
                    {loading ? "Loading..." : runningCamp}
                  </p>
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
}

export default Dashboard